'use client';

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import HeroSlider from "@/components/HeroSlider";
import MovieCarousel from "@/components/MovieCarousel";
import SeriesCarousel from "@/components/SeriesCarousel";
import { IMovieSummaryDto, ITvSummaryDto } from "@/interfaces/movie.interface";

interface ApiResponse<T> {
  page: number;
  results: T[];
  total_pages: number;
  total_results: number;
}

type TrendingItem = IMovieSummaryDto | ITvSummaryDto;

export default function Home() {
  const [trendingAll, setTrendingAll] = useState<TrendingItem[]>([]);
  const [trendingMovies, setTrendingMovies] = useState<IMovieSummaryDto[]>([]);
  const [trendingSeries, setTrendingSeries] = useState<ITvSummaryDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Fetch trending all, trending movies, and trending series in parallel
        const [allResponse, moviesResponse, seriesResponse] = await Promise.all([
          fetch('/api/trending/all?time_window=day'),
          fetch('/api/movies/trending?time_window=day'),
          fetch('/api/series/trending?time_window=day')
        ]);

        if (!allResponse.ok || !moviesResponse.ok || !seriesResponse.ok) {
          throw new Error('Failed to fetch data');
        }

        const allData: ApiResponse<TrendingItem> = await allResponse.json();
        const moviesData: ApiResponse<IMovieSummaryDto> = await moviesResponse.json();
        const seriesData: ApiResponse<ITvSummaryDto> = await seriesResponse.json();

        setTrendingAll(allData.results);
        setTrendingMovies(moviesData.results);
        setTrendingSeries(seriesData.results);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
  return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-red-500 mx-auto mb-4"></div>
          <p className="text-white text-lg font-poppins">Loading amazing content...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bebas text-white mb-2">Oops!</h2>
          <p className="text-gray-400 font-poppins mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700 transition-colors font-sora"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Hero Slider */}
      {trendingAll.length > 0 && (
        <HeroSlider items={trendingAll.slice(0, 10)} />
      )}

      {/* Trending Movies Carousel */}
      <section className="py-6 px-2">
        <div className="max-w-full mx-auto">
          <MovieCarousel movies={trendingMovies} title="TRENDING MOVIES" />
        </div>
      </section>

      {/* Trending Series Carousel */}
      <section className="py-6 px-2 bg-gradient-to-b from-transparent to-black/20">
        <div className="max-w-full mx-auto">
          <SeriesCarousel series={trendingSeries} title="TRENDING TV SERIES" />
        </div>
      </section>

      {/* Featured Series Hero - Show the top trending series */}
      {trendingSeries[0] && (
        <section className="relative py-16 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Content */}
              <div>
                <h2 className="text-4xl md:text-5xl font-cinzel text-white mb-4">
                  {trendingSeries[0].name}
                </h2>
                <div className="flex items-center gap-4 mb-4 font-poppins">
                  <div className="flex items-center gap-2">
                    <span className="text-yellow-400">⭐</span>
                    <span className="text-white font-semibold">{trendingSeries[0].vote_average.toFixed(1)}</span>
                  </div>
                  <span className="text-gray-300">•</span>
                  <span className="text-gray-300">{new Date(trendingSeries[0].first_air_date).getFullYear()}</span>
                  <span className="text-gray-300">•</span>
                  <span className="text-gray-300">TV Series</span>
                </div>
                <p className="text-lg text-gray-300 mb-8 line-clamp-4 font-poppins">
                  {trendingSeries[0].overview}
                </p>
                <div className="flex gap-4">
                  <button className="bg-blue-600 text-white font-bold py-3 px-8 rounded hover:bg-blue-700 transition-colors font-sora">
                    Watch Now
                  </button>
                  <button className="bg-gray-800 text-white font-bold py-3 px-8 rounded hover:bg-gray-700 transition-colors font-sora">
                    Add to List
                  </button>
                </div>
              </div>

              {/* Image */}
              <div className="relative">
                <div className="relative overflow-hidden rounded-lg">
          <Image
                    src={trendingSeries[0].poster_path ? trendingSeries[0].poster_path.replace('/w500', '/w185') : '/placeholder-series.jpg'}
                    alt={trendingSeries[0].name}
                    width={400}
                    height={400}
                    className="w-full h-[600px] object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
