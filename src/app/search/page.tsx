'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import { MagnifyingGlassIcon, FilmIcon, TvIcon } from '@heroicons/react/24/outline';
import { IGetSearchResultResDto } from '@/interfaces/getMovieData.interface';
import { IMovieSummaryDto, ITvSummaryDto } from '@/interfaces/movie.interface';

function SearchPageContent() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<IGetSearchResultResDto | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  
  const searchParams = useSearchParams();
  const router = useRouter();

  // Get initial search query from URL
  useEffect(() => {
    const query = searchParams.get('q');
    if (query) {
      setSearchQuery(query);
      performSearch(query, 1);
    }
  }, [searchParams]);

  const performSearch = async (query: string, page: number = 1) => {
    if (!query.trim()) return;

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/search?q=${encodeURIComponent(query)}&page=${page}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch search results');
      }

      const data: IGetSearchResultResDto = await response.json();
      setSearchResults(data);
      setCurrentPage(page);
    } catch (err) {
      setError('Failed to load search results. Please try again.');
      console.error('Search error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const handlePageChange = (newPage: number) => {
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}&page=${newPage}`);
    }
  };

  const handleItemClick = (item: IMovieSummaryDto | ITvSummaryDto) => {
    if (item.media_type === 'movie') {
      router.push(`/movies/${item.id}`);
    } else {
      router.push(`/series/${item.id}`);
    }
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).getFullYear();
  };

  const getTitle = (item: IMovieSummaryDto | ITvSummaryDto) => {
    if (item.media_type === 'movie') {
      return (item as IMovieSummaryDto).title;
    } else {
      return (item as ITvSummaryDto).name;
    }
  };

  const getReleaseDate = (item: IMovieSummaryDto | ITvSummaryDto) => {
    if (item.media_type === 'movie') {
      return (item as IMovieSummaryDto).release_date;
    } else {
      return (item as ITvSummaryDto).first_air_date;
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Search Header */}
      <div className="bg-gray-800/50 backdrop-blur-sm border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="max-w-2xl mx-auto">
            <h1 className="text-3xl font-bold text-center mb-8 font-cinzel">
              Search Movies & TV Shows
            </h1>
            
            <form onSubmit={handleSearch} className="relative">
              <div className="relative">
                <MagnifyingGlassIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 h-6 w-6 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search for movies, TV shows..."
                  className="w-full pl-12 pr-4 py-4 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent text-lg"
                />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-md transition-colors duration-200"
                >
                  Search
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Search Results */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {isLoading && (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500 mx-auto"></div>
            <p className="mt-4 text-gray-400">Searching...</p>
          </div>
        )}

        {error && (
          <div className="text-center py-12">
            <p className="text-red-400 text-lg">{error}</p>
          </div>
        )}

        {searchResults && !isLoading && (
          <div>
            {/* Results Header */}
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl font-semibold font-cinzel">
                  Search Results
                </h2>
                <p className="text-gray-400 mt-1">
                  Found {searchResults.total_results} results for "{searchQuery}"
                </p>
              </div>
            </div>

            {/* Results Grid */}
            {searchResults.results.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
                {searchResults.results.map((item) => (
                  <div
                    key={`${item.media_type}-${item.id}`}
                    onClick={() => handleItemClick(item)}
                    className="group cursor-pointer transform transition-all duration-300 hover:scale-105"
                  >
                    <div className="relative aspect-[2/3] rounded-lg overflow-hidden bg-gray-800">
                      {item.poster_path ? (
                        <Image
                          src={item.poster_path}
                          alt={getTitle(item)}
                          fill
                          className="object-cover group-hover:brightness-75 transition-all duration-300"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gray-800">
                          {item.media_type === 'movie' ? (
                            <FilmIcon className="h-12 w-12 text-gray-600" />
                          ) : (
                            <TvIcon className="h-12 w-12 text-gray-600" />
                          )}
                        </div>
                      )}
                      
                      {/* Media Type Badge */}
                      <div className="absolute top-2 left-2">
                        <span className={`px-2 py-1 rounded text-xs font-medium ${
                          item.media_type === 'movie' 
                            ? 'bg-blue-600 text-white' 
                            : 'bg-purple-600 text-white'
                        }`}>
                          {item.media_type === 'movie' ? 'Movie' : 'TV'}
                        </span>
                      </div>

                      {/* Rating Badge */}
                      {item.vote_average > 0 && (
                        <div className="absolute top-2 right-2">
                          <div className="bg-black/70 backdrop-blur-sm px-2 py-1 rounded text-xs font-medium">
                            ⭐ {item.vote_average.toFixed(1)}
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="mt-3">
                      <h3 className="font-semibold text-sm line-clamp-2 group-hover:text-red-400 transition-colors duration-200">
                        {getTitle(item)}
                      </h3>
                      <p className="text-gray-400 text-xs mt-1">
                        {formatDate(getReleaseDate(item))}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-400 text-lg">No results found for "{searchQuery}"</p>
                <p className="text-gray-500 text-sm mt-2">Try different keywords or check your spelling</p>
              </div>
            )}

            {/* Pagination */}
            {searchResults.total_pages > 1 && (
              <div className="flex justify-center items-center space-x-2 mt-12">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage <= 1}
                  className="px-4 py-2 bg-gray-700 hover:bg-gray-600 disabled:bg-gray-800 disabled:text-gray-500 rounded-md transition-colors duration-200"
                >
                  Previous
                </button>
                
                <span className="px-4 py-2 text-gray-400">
                  Page {currentPage} of {searchResults.total_pages}
                </span>
                
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage >= searchResults.total_pages}
                  className="px-4 py-2 bg-gray-700 hover:bg-gray-600 disabled:bg-gray-800 disabled:text-gray-500 rounded-md transition-colors duration-200"
                >
                  Next
                </button>
              </div>
            )}
          </div>
        )}

        {/* Initial State */}
        {!searchResults && !isLoading && !error && (
          <div className="text-center py-12">
            <MagnifyingGlassIcon className="h-16 w-16 text-gray-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-300 mb-2">
              Start Your Search
            </h3>
            <p className="text-gray-500">
              Search for your favorite movies and TV shows above
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

// Loading component for Suspense fallback
function SearchPageLoading() {
  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-red-500 mx-auto mb-4"></div>
        <p className="text-white text-lg font-poppins">Loading search page...</p>
      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<SearchPageLoading />}>
      <SearchPageContent />
    </Suspense>
  );
} 