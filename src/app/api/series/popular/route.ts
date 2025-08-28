import { NextRequest, NextResponse } from 'next/server';
import { TMDB_API_BASE_URL, TMDB_ENDPOINTS, TMDB_IMAGE_URL, TMDB_IMAGE_QUALITY } from '@/utils/urls';
import { ITvSummaryDto } from '@/interfaces/movie.interface';

const TMDB_ACCESS_TOKEN = process.env.TMDB_API_ACCESS_TOKEN;

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = searchParams.get('page') || '1';

    const url = `${TMDB_API_BASE_URL}${TMDB_ENDPOINTS.POPULAR_TV}?page=${page}`;
    
    const response = await fetch(url, {
      headers: {
        'Authorization': `Bearer ${TMDB_ACCESS_TOKEN}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`TMDB API error: ${response.status}`);
    }

    const data = await response.json();
    
    // Transform the data to include full image URLs
    const transformedResults = data.results.map((series: ITvSummaryDto) => ({
      ...series,
      poster_path: series.poster_path ? `${TMDB_IMAGE_URL}${TMDB_IMAGE_QUALITY.POSTER_SIZES.W_500}${series.poster_path}` : null,
      backdrop_path: series.backdrop_path ? `${TMDB_IMAGE_URL}${TMDB_IMAGE_QUALITY.BACKDROP_SIZES.W_1280}${series.backdrop_path}` : null,
    }));

    return NextResponse.json({
      page: data.page,
      results: transformedResults,
      total_pages: data.total_pages,
      total_results: data.total_results,
    });

  } catch (error) {
    console.error('Error fetching popular series:', error);
    return NextResponse.json(
      { error: 'Failed to fetch popular series' },
      { status: 500 }
    );
  }
} 