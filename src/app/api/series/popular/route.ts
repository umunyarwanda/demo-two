import { NextRequest, NextResponse } from 'next/server';
import { TMDB_API_BASE_URL, TMDB_IMAGE_URL } from '@/utils/urls';

// Cache configuration
export const revalidate = 3600; // Revalidate every hour

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = searchParams.get('page') || '1';

    const apiToken = process.env.TMDB_API_ACCESS_TOKEN;
    if (!apiToken) {
      return NextResponse.json(
        { error: 'TMDB API token not configured' },
        { status: 500 }
      );
    }

    const response = await fetch(
      `${TMDB_API_BASE_URL}/tv/popular?language=en-US&page=${page}`,
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

    const data = await response.json();

    // Transform the data to include full image URLs with lower quality for better performance
    const transformedResults = data.results.map((series: any) => ({
      ...series,
      backdrop_path: series.backdrop_path ? `${TMDB_IMAGE_URL}w780${series.backdrop_path}` : null,
      poster_path: series.poster_path ? `${TMDB_IMAGE_URL}w185${series.poster_path}` : null,
    }));

    // Add cache headers
    const responseHeaders = new Headers();
    responseHeaders.set('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate=86400');
    responseHeaders.set('Content-Type', 'application/json');

    return new NextResponse(JSON.stringify({
      ...data,
      results: transformedResults,
    }), {
      status: 200,
      headers: responseHeaders,
    });

  } catch (error) {
    console.error('Error fetching popular series:', error);
    return NextResponse.json(
      { error: 'Failed to fetch popular series' },
      { status: 500 }
    );
  }
} 