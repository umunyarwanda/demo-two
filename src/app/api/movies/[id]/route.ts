import { NextRequest, NextResponse } from 'next/server';
import { TMDB_API_BASE_URL } from '@/utils/urls';

// Cache configuration
export const revalidate = 3600; // Revalidate every hour

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const movieId = params.id;
    const apiToken = process.env.TMDB_API_ACCESS_TOKEN;

    if (!apiToken) {
      return NextResponse.json(
        { error: 'TMDB API token not configured' },
        { status: 500 }
      );
    }

    // Fetch movie details with credits, videos, and images
    const response = await fetch(
      `${TMDB_API_BASE_URL}/movie/${movieId}?append_to_response=credits,videos,images,keywords,external_ids,reviews,recommendations,similar`,
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

    const movieData = await response.json();

    // Transform the data to match our interface with lower quality images
    const transformedMovie = {
      ...movieData,
      // Use lower quality images for better performance
      poster_path: movieData.poster_path 
        ? `https://image.tmdb.org/t/p/w185${movieData.poster_path}`
        : null,
      backdrop_path: movieData.backdrop_path 
        ? `https://image.tmdb.org/t/p/w780${movieData.backdrop_path}`
        : null,
      // Transform images to include lower quality URLs
      images: {
        backdrops: movieData.images?.backdrops?.slice(0, 10).map((img: any) => ({
          ...img,
          file_path: `https://image.tmdb.org/t/p/w300${img.file_path}`
        })) || [],
        posters: movieData.images?.posters?.slice(0, 10).map((img: any) => ({
          ...img,
          file_path: `https://image.tmdb.org/t/p/w185${img.file_path}`
        })) || []
      }
    };

    // Add cache headers
    const responseHeaders = new Headers();
    responseHeaders.set('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate=86400');
    responseHeaders.set('Content-Type', 'application/json');

    return new NextResponse(JSON.stringify(transformedMovie), {
      status: 200,
      headers: responseHeaders,
    });
  } catch (error) {
    console.error('Error fetching movie details:', error);
    return NextResponse.json(
      { error: 'Failed to fetch movie details' },
      { status: 500 }
    );
  }
} 