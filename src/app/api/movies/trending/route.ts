import { NextRequest, NextResponse } from 'next/server';
import { TMDB_API_BASE_URL, TMDB_IMAGE_URL } from '@/utils/urls';

// Cache configuration
export const revalidate = 1800; // Revalidate every 30 minutes

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const timeWindow = searchParams.get('time_window') || 'day';

    const apiToken = process.env.TMDB_API_ACCESS_TOKEN;
    if (!apiToken) {
      return NextResponse.json(
        { error: 'TMDB API token not configured' },
        { status: 500 }
      );
    }

    const response = await fetch(
      `${TMDB_API_BASE_URL}/trending/movie/${timeWindow}?language=en-US`,
      {
        headers: {
          'Authorization': `Bearer ${apiToken}`,
          'Content-Type': 'application/json',
        },
        next: { revalidate: 1800 }, // Cache for 30 minutes
      }
    );

    if (!response.ok) {
      throw new Error(`TMDB API error: ${response.status}`);
    }

    const data = await response.json();

    // Transform the data to include full image URLs with lower quality for better performance
    const transformedResults = data.results.map((movie: any) => ({
      ...movie,
      backdrop_path: movie.backdrop_path ? `${TMDB_IMAGE_URL}w780${movie.backdrop_path}` : null,
      poster_path: movie.poster_path ? `${TMDB_IMAGE_URL}w185${movie.poster_path}` : null,
    }));

    // Add cache headers
    const responseHeaders = new Headers();
    responseHeaders.set('Cache-Control', 'public, s-maxage=1800, stale-while-revalidate=3600');
    responseHeaders.set('Content-Type', 'application/json');

    return new NextResponse(JSON.stringify({
      ...data,
      results: transformedResults,
    }), {
      status: 200,
      headers: responseHeaders,
    });

  } catch (error) {
    console.error('Error fetching trending movies:', error);
    return NextResponse.json(
      { error: 'Failed to fetch trending movies' },
      { status: 500 }
    );
  }
} 