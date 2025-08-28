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

    // Fetch trending movies and TV series in parallel with caching
    const [moviesResponse, seriesResponse] = await Promise.all([
      fetch(`${TMDB_API_BASE_URL}/trending/movie/${timeWindow}?language=en-US`, {
        headers: {
          'Authorization': `Bearer ${apiToken}`,
          'Content-Type': 'application/json',
        },
        next: { revalidate: 1800 }, // Cache for 30 minutes
      }),
      fetch(`${TMDB_API_BASE_URL}/trending/tv/${timeWindow}?language=en-US`, {
        headers: {
          'Authorization': `Bearer ${apiToken}`,
          'Content-Type': 'application/json',
        },
        next: { revalidate: 1800 }, // Cache for 30 minutes
      }),
    ]);

    if (!moviesResponse.ok || !seriesResponse.ok) {
      throw new Error('Failed to fetch trending data');
    }

    const moviesData = await moviesResponse.json();
    const seriesData = await seriesResponse.json();

    // Combine and interleave movies and TV series with lower quality images for better performance
    const movies = moviesData.results.map((movie: any) => ({
      ...movie,
      media_type: 'movie',
      backdrop_path: movie.backdrop_path ? `${TMDB_IMAGE_URL}w780${movie.backdrop_path}` : null,
      poster_path: movie.poster_path ? `${TMDB_IMAGE_URL}w185${movie.poster_path}` : null,
    }));

    const series = seriesData.results.map((series: any) => ({
      ...series,
      media_type: 'tv',
      backdrop_path: series.backdrop_path ? `${TMDB_IMAGE_URL}w780${series.backdrop_path}` : null,
      poster_path: series.poster_path ? `${TMDB_IMAGE_URL}w185${series.poster_path}` : null,
    }));

    // Interleave movies and TV series for better balance
    const combinedResults = [];
    const maxLength = Math.max(movies.length, series.length);
    
    for (let i = 0; i < maxLength; i++) {
      if (i < movies.length) {
        combinedResults.push(movies[i]);
      }
      if (i < series.length) {
        combinedResults.push(series[i]);
      }
    }

    // Add cache headers
    const responseHeaders = new Headers();
    responseHeaders.set('Cache-Control', 'public, s-maxage=1800, stale-while-revalidate=3600');
    responseHeaders.set('Content-Type', 'application/json');

    return new NextResponse(JSON.stringify({
      page: 1,
      results: combinedResults,
      total_pages: 1,
      total_results: combinedResults.length,
    }), {
      status: 200,
      headers: responseHeaders,
    });

  } catch (error) {
    console.error('Error fetching trending data:', error);
    return NextResponse.json(
      { error: 'Failed to fetch trending data' },
      { status: 500 }
    );
  }
} 