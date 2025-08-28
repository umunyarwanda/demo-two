import { NextRequest, NextResponse } from 'next/server';
import { TMDB_API_BASE_URL, TMDB_ENDPOINTS, TMDB_IMAGE_URL, TMDB_IMAGE_QUALITY } from '@/utils/urls';
import { IMovieSummaryDto } from '@/interfaces/movie.interface';

const TMDB_ACCESS_TOKEN = process.env.TMDB_API_ACCESS_TOKEN;

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = searchParams.get('page') || '1';

    const url = `${TMDB_API_BASE_URL}${TMDB_ENDPOINTS.POPULAR_MOVIES}?page=${page}`;
    
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
    const transformedResults = data.results.map((movie: IMovieSummaryDto) => ({
      ...movie,
      poster_path: movie.poster_path ? `${TMDB_IMAGE_URL}${TMDB_IMAGE_QUALITY.POSTER_SIZES.W_500}${movie.poster_path}` : null,
      backdrop_path: movie.backdrop_path ? `${TMDB_IMAGE_URL}${TMDB_IMAGE_QUALITY.BACKDROP_SIZES.W_1280}${movie.backdrop_path}` : null,
    }));

    return NextResponse.json({
      page: data.page,
      results: transformedResults,
      total_pages: data.total_pages,
      total_results: data.total_results,
    });

  } catch (error) {
    console.error('Error fetching popular movies:', error);
    return NextResponse.json(
      { error: 'Failed to fetch popular movies' },
      { status: 500 }
    );
  }
} 