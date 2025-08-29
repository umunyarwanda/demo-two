'use client';

import { useState, useEffect } from 'react';
import MovieCard from '@/components/MovieCard';
import { IMovieSummaryDto } from '@/interfaces/movie.interface';

interface ApiResponse<T> {
  page: number;
  results: T[];
  total_pages: number;
  total_results: number;
}

export default function MoviesPage() {
  const [movies, setMovies] = useState<IMovieSummaryDto[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('');
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/movies/popular');
        if (!response.ok) throw new Error('Failed to fetch movies');
        const data: ApiResponse<IMovieSummaryDto> = await response.json();
        setMovies(data.results);
        setTotalPages(data.total_pages);
        setHasMore(data.page < data.total_pages);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  const loadMoreMovies = async () => {
    if (loadingMore || !hasMore) return;

    try {
      setLoadingMore(true);
      const nextPage = currentPage + 1;
      const response = await fetch(`/api/movies/popular?page=${nextPage}`);
      if (!response.ok) throw new Error('Failed to fetch more movies');
      const data: ApiResponse<IMovieSummaryDto> = await response.json();
      
      setMovies(prev => [...prev, ...data.results]);
      setCurrentPage(nextPage);
      setHasMore(nextPage < data.total_pages);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load more movies');
    } finally {
      setLoadingMore(false);
    }
  };

  // Reset pagination when search or filter changes
  useEffect(() => {
    if (searchTerm || selectedGenre) {
      setCurrentPage(1);
      setHasMore(true);
    }
  }, [searchTerm, selectedGenre]);

  // Get unique genres from movies
  const allGenres = Array.from(new Set(movies.flatMap(movie => 
    movie.genre_ids ? movie.genre_ids.map(id => id.toString()) : []
  ))).sort();

  // Filter movies based on search term and genre
  const filteredMovies = movies.filter(movie => {
    const matchesSearch = movie.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         movie.overview.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesGenre = selectedGenre === '' || 
                        (movie.genre_ids && movie.genre_ids.includes(parseInt(selectedGenre)));
    return matchesSearch && matchesGenre;
  });

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-red-500 mx-auto mb-4"></div>
          <p className="text-white text-lg font-poppins">Loading movies...</p>
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
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bebas text-white mb-4 tracking-wider">
            MOVIES
          </h1>
          <p className="text-lg text-gray-400 font-poppins">
            Discover the latest and greatest movies
          </p>
        </div>

        {/* Search and Filter */}
        <div className="mb-8 space-y-4 md:space-y-0 md:flex md:items-center md:justify-between">
          {/* Search */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search movies..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full md:w-80 px-4 py-3 pl-12 border border-gray-700 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent bg-gray-900 text-white placeholder-gray-400 font-poppins"
            />
            <svg
              className="absolute left-4 top-3.5 h-5 w-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>

          {/* Genre Filter */}
          <div className="flex items-center space-x-3">
            <label htmlFor="genre-filter" className="text-sm font-medium text-gray-300 font-sora">
              Genre:
            </label>
            <select
              id="genre-filter"
              value={selectedGenre}
              onChange={(e) => setSelectedGenre(e.target.value)}
              className="px-4 py-3 border border-gray-700 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent bg-gray-900 text-white font-poppins"
            >
              <option value="">All Genres</option>
              {allGenres.map((genre) => (
                <option key={genre} value={genre}>
                  {genre}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-400 font-poppins">
            Showing {filteredMovies.length} of {movies.length} movies
            {totalPages > 0 && (
              <span className="ml-2 text-gray-500">
                (Page {currentPage} of {totalPages})
              </span>
            )}
          </p>
        </div>

        {/* Movies Grid */}
        {filteredMovies.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
              {filteredMovies.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </div>
            
            {/* Load More Button */}
            {hasMore && !searchTerm && !selectedGenre && (
              <div className="text-center mt-12">
                <button
                  onClick={loadMoreMovies}
                  disabled={loadingMore}
                  className="bg-red-600 text-white px-8 py-3 rounded-lg hover:bg-red-700 disabled:bg-gray-600 disabled:cursor-not-allowed transition-colors font-sora flex items-center gap-2 mx-auto"
                >
                  {loadingMore ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      Loading...
                    </>
                  ) : (
                    <>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                      Load More Movies
                    </>
                  )}
                </button>
                {currentPage > 1 && (
                  <p className="text-gray-500 text-sm mt-2 font-poppins">
                    Loaded {currentPage} of {totalPages} pages
                  </p>
                )}
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-16">
            <div className="text-gray-500 text-6xl mb-4">🎬</div>
            <h3 className="text-xl font-semibold text-white mb-2 font-sora">
              No movies found
            </h3>
            <p className="text-gray-400 font-poppins">
              Try adjusting your search or filter criteria
            </p>
          </div>
        )}
      </div>
    </div>
  );
} 