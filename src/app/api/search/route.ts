import { NextRequest, NextResponse } from 'next/server';
import { TMDB_API_BASE_URL, TMDB_IMAGE_URL } from '@/utils/urls';

// Cache configuration
export const revalidate = 1800; // Revalidate every 30 minutes

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q');
    const page = searchParams.get('page') || '1';
    const includeAdult = searchParams.get('include_adult') || 'false';
    const language = searchParams.get('language') || 'en-US';

    if (!query || query.trim() === '') {
      return NextResponse.json(
        { error: 'Search query is required' },
        { status: 400 }
      );
    }

    const apiToken = process.env.TMDB_API_ACCESS_TOKEN;
    if (!apiToken) {
      return NextResponse.json(
        { error: 'TMDB API token not configured' },
        { status: 500 }
      );
    }

    // Search for both movies and TV shows
    const url = `${TMDB_API_BASE_URL}/search/multi?query=${encodeURIComponent(query)}&include_adult=${includeAdult}&language=${language}&page=${page}`;
    
    const response = await fetch(url, {
      headers: {
        'Authorization': `Bearer ${apiToken}`,
        'Content-Type': 'application/json',
      },
      next: { revalidate: 1800 }, // Cache for 30 minutes
    });

    if (!response.ok) {
      throw new Error(`TMDB API error: ${response.status}`);
    }

    const data = await response.json();
    
    // Filter and transform results to only include movies and TV shows
    const transformedResults = data.results
      .filter((item: any) => item.media_type === 'movie' || item.media_type === 'tv')
      .map((item: any) => ({
        ...item,
        poster_path: item.poster_path ? `${TMDB_IMAGE_URL}w185${item.poster_path}` : null,
        backdrop_path: item.backdrop_path ? `${TMDB_IMAGE_URL}w780${item.backdrop_path}` : null,
      }));

    // Add cache headers
    const responseHeaders = new Headers();
    responseHeaders.set('Cache-Control', 'public, s-maxage=1800, stale-while-revalidate=3600');
    responseHeaders.set('Content-Type', 'application/json');

    return new NextResponse(JSON.stringify({
      page: data.page,
      results: transformedResults,
      total_pages: data.total_pages,
      total_results: transformedResults.length,
    }), {
      status: 200,
      headers: responseHeaders,
    });

  } catch (error) {
    console.error('Error performing search:', error);
    return NextResponse.json(
      { error: 'Failed to perform search' },
      { status: 500 }
    );
  }
} 