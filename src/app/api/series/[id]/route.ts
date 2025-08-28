import { NextRequest, NextResponse } from 'next/server';
import { TMDB_API_BASE_URL } from '@/utils/urls';

// Cache configuration
export const revalidate = 3600; // Revalidate every hour

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: seriesId } = await params;
    const apiToken = process.env.TMDB_API_ACCESS_TOKEN;

    if (!apiToken) {
      return NextResponse.json(
        { error: 'TMDB API token not configured' },
        { status: 500 }
      );
    }

    // Fetch series details with credits, videos, and images
    const response = await fetch(
      `${TMDB_API_BASE_URL}/tv/${seriesId}?append_to_response=credits,videos,images,keywords,external_ids,reviews,recommendations,similar`,
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

    const seriesData = await response.json();

    // Transform the data to match our interface with lower quality images
    const transformedSeries = {
      ...seriesData,
      // Use lower quality images for better performance
      poster_path: seriesData.poster_path 
        ? `https://image.tmdb.org/t/p/w185${seriesData.poster_path}`
        : null,
      backdrop_path: seriesData.backdrop_path 
        ? `https://image.tmdb.org/t/p/w780${seriesData.backdrop_path}`
        : null,
      // Transform images to include lower quality URLs
      images: {
        backdrops: seriesData.images?.backdrops?.slice(0, 10).map((img: any) => ({
          ...img,
          file_path: `https://image.tmdb.org/t/p/w300${img.file_path}`
        })) || [],
        posters: seriesData.images?.posters?.slice(0, 10).map((img: any) => ({
          ...img,
          file_path: `https://image.tmdb.org/t/p/w185${img.file_path}`
        })) || []
      }
    };

    // Add cache headers
    const responseHeaders = new Headers();
    responseHeaders.set('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate=86400');
    responseHeaders.set('Content-Type', 'application/json');

    return new NextResponse(JSON.stringify(transformedSeries), {
      status: 200,
      headers: responseHeaders,
    });
  } catch (error) {
    console.error('Error fetching series details:', error);
    return NextResponse.json(
      { error: 'Failed to fetch series details' },
      { status: 500 }
    );
  }
} 