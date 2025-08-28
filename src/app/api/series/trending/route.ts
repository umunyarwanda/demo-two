import { NextRequest, NextResponse } from 'next/server';
import { TMDB_API_BASE_URL, TMDB_ENDPOINTS, TMDB_IMAGE_URL, TMDB_IMAGE_QUALITY } from '@/utils/urls';
import { ITvSummaryDto } from '@/interfaces/movie.interface';

const TMDB_ACCESS_TOKEN = process.env.TMDB_API_ACCESS_TOKEN;

// Cache configuration
export const revalidate = 1800; // Revalidate every 30 minutes

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const timeWindow = searchParams.get('time_window') || 'day'; // 'day' or 'week'
    const page = searchParams.get('page') || '1';

    const url = `${TMDB_API_BASE_URL}${TMDB_ENDPOINTS.TRENDING_TV}/${timeWindow}?page=${page}`;
    
    const response = await fetch(url, {
      headers: {
        'Authorization': `Bearer ${TMDB_ACCESS_TOKEN}`,
        'Content-Type': 'application/json',
      },
      next: { revalidate: 1800 }, // Cache for 30 minutes
    });

    if (!response.ok) {
      throw new Error(`TMDB API error: ${response.status}`);
    }

    const data = await response.json();
    
    // Transform the data to include lower quality image URLs for better performance
    const transformedResults = data.results.map((series: ITvSummaryDto) => ({
      ...series,
      poster_path: series.poster_path ? `${TMDB_IMAGE_URL}${TMDB_IMAGE_QUALITY.POSTER_SIZES.W_185}${series.poster_path}` : null,
      backdrop_path: series.backdrop_path ? `${TMDB_IMAGE_URL}${TMDB_IMAGE_QUALITY.BACKDROP_SIZES.W_780}${series.backdrop_path}` : null,
    }));

    // Add cache headers
    const responseHeaders = new Headers();
    responseHeaders.set('Cache-Control', 'public, s-maxage=1800, stale-while-revalidate=3600');
    responseHeaders.set('Content-Type', 'application/json');

    return new NextResponse(JSON.stringify({
      page: data.page,
      results: transformedResults,
      total_pages: data.total_pages,
      total_results: data.total_results,
    }), {
      status: 200,
      headers: responseHeaders,
    });

  } catch (error) {
    console.error('Error fetching trending series:', error);
    return NextResponse.json(
      { error: 'Failed to fetch trending series' },
      { status: 500 }
    );
  }
} 