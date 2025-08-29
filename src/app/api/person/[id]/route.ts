import { NextRequest, NextResponse } from 'next/server';
import { TMDB_API_BASE_URL } from '@/utils/urls';

// Cache configuration
export const revalidate = 3600; // Revalidate every hour

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: personId } = await params;
    const apiToken = process.env.TMDB_API_ACCESS_TOKEN;

    if (!apiToken) {
      return NextResponse.json(
        { error: 'TMDB API token not configured' },
        { status: 500 }
      );
    }

    // Fetch person details with combined credits and images
    const response = await fetch(
      `${TMDB_API_BASE_URL}/person/${personId}?append_to_response=combined_credits,images,external_ids`,
      {
        headers: {
          'Authorization': `Bearer ${apiToken}`,
          'Content-Type': 'application/json',
        },
        next: { revalidate: 3600 }, // Cache for 1 hour
      }
    );

    if (!response.ok) {
      throw new Error(`TMDB API error: ${response.status}`);
    }

    const personData = await response.json();

    // Transform the data to match our interface with lower quality images
    const transformedPerson = {
      ...personData,
      // Use lower quality images for better performance
      profile_path: personData.profile_path 
        ? `https://image.tmdb.org/t/p/w185${personData.profile_path}`
        : null,
      // Transform images to include lower quality URLs
      images: {
        profiles: personData.images?.profiles?.slice(0, 10).map((img: any) => ({
          ...img,
          file_path: `https://image.tmdb.org/t/p/w185${img.file_path}`
        })) || []
      }
    };

    // Add cache headers
    const responseHeaders = new Headers();
    responseHeaders.set('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate=86400');
    responseHeaders.set('Content-Type', 'application/json');

    return new NextResponse(JSON.stringify(transformedPerson), {
      status: 200,
      headers: responseHeaders,
    });
  } catch (error) {
    console.error('Error fetching person details:', error);
    return NextResponse.json(
      { error: 'Failed to fetch person details' },
      { status: 500 }
    );
  }
} 