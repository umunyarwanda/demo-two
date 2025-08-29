'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import { ITvSeasonDetailsDto } from '@/interfaces/movie.interface';
import { StarIcon, PlayIcon, PlusIcon, HeartIcon } from '@heroicons/react/24/solid';
import { TMDB_IMAGE_URL, TMDB_IMAGE_QUALITY } from '@/utils/urls';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import CastCard from '@/components/CastCard';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// Episodes Carousel Component
function EpisodesCarousel({ episodes }: { episodes: any[] }) {
  const swiperRef = useRef<any>(null);

  if (episodes.length === 0) {
    return (
      <div className="relative px-4">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bebas text-white tracking-wider">
            Episodes
          </h2>
        </div>
        <div className="text-center py-12">
          <p className="text-gray-400 font-poppins">No episodes available yet.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative px-4">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-bebas text-white tracking-wider">
          Episodes
        </h2>
        
        {/* Custom Navigation Buttons */}
        <div className="flex gap-2">
          <button
            onClick={() => swiperRef.current?.slidePrev()}
            className="w-10 h-10 bg-gray-800/80 text-white rounded-full flex items-center justify-center hover:bg-gray-700/80 transition-colors backdrop-blur-sm"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={() => swiperRef.current?.slideNext()}
            className="w-10 h-10 bg-gray-800/80 text-white rounded-full flex items-center justify-center hover:bg-gray-700/80 transition-colors backdrop-blur-sm"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      <Swiper
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={24}
        slidesPerView={1}
        breakpoints={{
          640: {
            slidesPerView: 1,
          },
          768: {
            slidesPerView: 2,
          },
          1024: {
            slidesPerView: 3,
          },
          1280: {
            slidesPerView: 4,
          },
          1536: {
            slidesPerView: 5,
          },
        }}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        loop={true}
        className="episodes-carousel"
      >
        {episodes.map((episode) => (
          <SwiperSlide key={episode.id}>
            <div className="group cursor-pointer">
              <div className="relative mb-3 overflow-hidden rounded-lg">
                {episode.still_path ? (
                  <Image
                    src={`${TMDB_IMAGE_URL}${TMDB_IMAGE_QUALITY.BACKDROP_SIZES.W_300}${episode.still_path}`}
                    alt={episode.name}
                    width={400}
                    height={225}
                    className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                ) : (
                  <div className="w-full h-48 bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center">
                    <span className="text-white font-bold text-2xl">
                      E{episode.episode_number}
                    </span>
                  </div>
                )}
                
                {/* Episode number badge */}
                <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                  E{episode.episode_number}
                </div>
                
                {/* Runtime badge */}
                {episode.runtime && (
                  <div className="absolute top-2 right-2 bg-blue-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                    {episode.runtime}m
                  </div>
                )}
              </div>
              <h3 className="text-white font-semibold text-sm mb-1 line-clamp-2">{episode.name}</h3>
              <p className="text-gray-400 text-xs line-clamp-3 mb-2">
                {episode.overview || 'No overview available'}
              </p>
              {episode.air_date && (
                <p className="text-gray-500 text-xs">
                  {new Date(episode.air_date).toLocaleDateString()}
                </p>
              )}
              {episode.vote_average > 0 && (
                <div className="flex items-center gap-1 mt-1">
                  <StarIcon className="w-3 h-3 text-yellow-400" />
                  <span className="text-yellow-400 text-xs">{episode.vote_average.toFixed(1)}</span>
                </div>
              )}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

// Cast Carousel Component
function CastCarousel({ cast }: { cast: any[] }) {
  const swiperRef = useRef<any>(null);

  return (
    <div className="relative px-4">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-bebas text-white tracking-wider">
          Cast
        </h2>
        
        {/* Custom Navigation Buttons */}
        <div className="flex gap-2">
          <button
            onClick={() => swiperRef.current?.slidePrev()}
            className="w-10 h-10 bg-gray-800/80 text-white rounded-full flex items-center justify-center hover:bg-gray-700/80 transition-colors backdrop-blur-sm"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={() => swiperRef.current?.slideNext()}
            className="w-10 h-10 bg-gray-800/80 text-white rounded-full flex items-center justify-center hover:bg-gray-700/80 transition-colors backdrop-blur-sm"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      <Swiper
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={24}
        slidesPerView={1}
        breakpoints={{
          640: {
            slidesPerView: 2,
          },
          768: {
            slidesPerView: 3,
          },
          1024: {
            slidesPerView: 4,
          },
          1280: {
            slidesPerView: 5,
          },
          1536: {
            slidesPerView: 6,
          },
        }}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        loop={true}
        className="cast-carousel"
      >
        {cast.slice(0, 15).map((actor) => (
          <SwiperSlide key={actor.id}>
            <CastCard cast={actor} size="md" />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

// Videos Carousel Component
function VideosCarousel({ videos }: { videos: any[] }) {
  const swiperRef = useRef<any>(null);

  if (videos.length === 0) {
    return (
      <div className="relative px-4">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bebas text-white tracking-wider">
            Videos
          </h2>
        </div>
        <div className="text-center py-12">
          <p className="text-gray-400 font-poppins">No videos available yet.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative px-0">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-bebas text-white tracking-wider">
          Videos
        </h2>
        
        {/* Custom Navigation Buttons */}
        <div className="flex gap-2">
          <button
            onClick={() => swiperRef.current?.slidePrev()}
            className="w-10 h-10 bg-gray-800/80 text-white rounded-full flex items-center justify-center hover:bg-gray-700/80 transition-colors backdrop-blur-sm"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={() => swiperRef.current?.slideNext()}
            className="w-10 h-10 bg-gray-800/80 text-white rounded-full flex items-center justify-center hover:bg-gray-700/80 transition-colors backdrop-blur-sm"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      <Swiper
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={16}
        slidesPerView={1}
        breakpoints={{
          640: {
            slidesPerView: 1,
          },
          768: {
            slidesPerView: 2,
          },
          1024: {
            slidesPerView: 2,
          },
          1280: {
            slidesPerView: 3,
          },
          1536: {
            slidesPerView: 5,
          },
        }}
        autoplay={{
          delay: 7000,
          disableOnInteraction: false,
        }}
        loop={true}
        className="videos-carousel"
      >
        {videos.slice(0, 12).map((video) => (
          <SwiperSlide key={video.id}>
            <div className="group cursor-pointer" onClick={() => {
              if (video.site === 'YouTube') {
                window.open(`https://www.youtube.com/watch?v=${video.key}`, '_blank');
              }
            }}>
              <div className="relative overflow-hidden rounded-lg">
                {/* Video Cover Photo */}
                <div className="aspect-video relative overflow-hidden">
                  {video.site === 'YouTube' ? (
                    <Image
                      src={`https://i.ytimg.com/vi/${video.key}/hqdefault.jpg`}
                      alt={video.name}
                      width={320}
                      height={180}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
                      <svg className="w-16 h-16 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                      </svg>
                    </div>
                  )}
                  
                  {/* Play Button Overlay */}
                  <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg">
                      <svg className="w-8 h-8 text-black ml-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                </div>
                
                {/* Video Title */}
                <div className="mt-3">
                  <h3 className="text-white font-medium text-sm line-clamp-2 leading-tight">
                    {video.name}
                  </h3>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

// Posters Carousel Component
function PostersCarousel({ posters }: { posters: any[] }) {
  const swiperRef = useRef<any>(null);

  if (posters.length === 0) {
    return (
      <div className="relative px-0">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bebas text-white tracking-wider">
            Posters
          </h2>
        </div>
        <div className="text-center py-12">
          <p className="text-gray-400 font-poppins">No posters available yet.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative px-0">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-bebas text-white tracking-wider">
          Posters
        </h2>
        
        {/* Custom Navigation Buttons */}
        <div className="flex gap-2">
          <button
            onClick={() => swiperRef.current?.slidePrev()}
            className="w-10 h-10 bg-gray-800/80 text-white rounded-full flex items-center justify-center hover:bg-gray-700/80 transition-colors backdrop-blur-sm"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={() => swiperRef.current?.slideNext()}
            className="w-10 h-10 bg-gray-800/80 text-white rounded-full flex items-center justify-center hover:bg-gray-700/80 transition-colors backdrop-blur-sm"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      <Swiper
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={16}
        slidesPerView={1}
        breakpoints={{
          640: {
            slidesPerView: 2,
          },
          768: {
            slidesPerView: 3,
          },
          1024: {
            slidesPerView: 4,
          },
          1280: {
            slidesPerView: 5,
          },
          1536: {
            slidesPerView: 6,
          },
        }}
        autoplay={{
          delay: 9000,
          disableOnInteraction: false,
        }}
        loop={true}
        className="posters-carousel"
      >
        {posters.slice(0, 20).map((poster, index) => (
          <SwiperSlide key={index}>
            <div className="group cursor-pointer">
              <div className="relative overflow-hidden rounded-lg">
                <Image
                  src={`${TMDB_IMAGE_URL}${TMDB_IMAGE_QUALITY.POSTER_SIZES.W_185}${poster.file_path}`}
                  alt={`Poster ${index + 1}`}
                  width={300}
                  height={450}
                  className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300"></div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default function SeasonPage() {
  const params = useParams();
  const router = useRouter();
  const seriesId = params.id as string;
  const seasonNumber = params.seasonNumber as string;
  
  const [season, setSeason] = useState<ITvSeasonDetailsDto | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSeason = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/series/${seriesId}/seasons/${seasonNumber}`);
        if (!response.ok) throw new Error('Failed to fetch season details');
        const data = await response.json();
        setSeason(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    if (seriesId && seasonNumber) {
      fetchSeason();
    }
  }, [seriesId, seasonNumber]);

  // Reset scroll position when season changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [seriesId, seasonNumber]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-red-500 mx-auto mb-4"></div>
          <p className="text-white text-lg font-poppins">Loading season details...</p>
        </div>
      </div>
    );
  }

  if (error || !season) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="text-center">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bebas text-white mb-2">Oops!</h2>
          <p className="text-gray-400 font-poppins mb-4">{error || 'Season not found'}</p>
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
    <div className="min-h-screen bg-black">
      {/* Hero Section */}
      <div className="relative h-screen">
        {/* Background Image */}
        <Image
          src={season.poster_path ? `${TMDB_IMAGE_URL}${TMDB_IMAGE_QUALITY.POSTER_SIZES.W_780}${season.poster_path}` : '/placeholder-movie.jpg'}
          alt={season.name}
          fill
          className="object-cover"
          priority
        />
        
        {/* Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/60"></div>
        
        {/* Back Button */}
        <button
          onClick={() => router.back()}
          className="absolute top-6 left-6 z-30 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors backdrop-blur-sm border border-white/20"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        
        {/* Main Content */}
        <div className="relative z-10 h-full flex items-center">
          <div className="container mx-auto px-6">
            <div className="grid lg:grid-cols-12 gap-8 items-center">
              {/* Poster */}
              <div className="lg:col-span-4 xl:col-span-3">
                <div className="relative group">
                  <Image
                    src={season.poster_path ? `${TMDB_IMAGE_URL}${TMDB_IMAGE_QUALITY.POSTER_SIZES.W_500}${season.poster_path}` : '/placeholder-movie.jpg'}
                    alt={season.name}
                    width={280}
                    height={420}
                    className="w-full max-w-xs mx-auto rounded-xl shadow-2xl transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-t from-black/20 to-transparent"></div>
                </div>
              </div>
              
              {/* Season Info */}
              <div className="lg:col-span-8 xl:col-span-9">
                {/* Title */}
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-cinzel font-semibold text-white mb-3 tracking-tight">
                  {season.name.toUpperCase()}
                </h1>
                
                {/* Season Number */}
                <div className="flex items-center gap-4 mb-4 text-gray-300 font-poppins">
                  <div className="flex items-center gap-2 bg-blue-500/20 backdrop-blur-sm px-3 py-1 rounded-full border border-blue-500/30">
                    <span className="font-bold text-white text-lg">Season {season.season_number}</span>
                  </div>
                  <span className="text-lg">•</span>
                  <span className="text-lg">{season.episodes?.length || 0} Episodes</span>
                  <span className="text-lg">•</span>
                  <span className="text-lg">{season.air_date ? new Date(season.air_date).getFullYear() : 'TBA'}</span>
                  {season.vote_average > 0 && (
                    <>
                      <span className="text-lg">•</span>
                      <div className="flex items-center gap-2 bg-yellow-500/20 backdrop-blur-sm px-3 py-1 rounded-full border border-yellow-500/30">
                        <StarIcon className="w-4 h-4 text-yellow-400" />
                        <span className="font-bold text-white text-sm">{season.vote_average.toFixed(1)}</span>
                      </div>
                    </>
                  )}
                </div>
                
                {/* Overview */}
                {season.overview && (
                  <p className="text-base md:text-lg text-gray-300 mb-8 max-w-3xl font-poppins leading-relaxed">
                    {season.overview}
                  </p>
                )}
                
                {/* Action Buttons */}
                <div className="flex flex-wrap gap-3">
                  {/* Watch Trailer Button */}
                  {season.videos?.results && season.videos.results.length > 0 && (
                    <button 
                      onClick={() => {
                        const trailer = season.videos?.results?.find(video => 
                          video.type === 'Trailer' && video.site === 'YouTube'
                        );
                        if (trailer) {
                          window.open(`https://www.youtube.com/watch?v=${trailer.key}`, '_blank');
                        }
                      }}
                      className="group bg-gradient-to-r from-red-600 to-red-700 text-white font-bold py-3 px-6 rounded-lg hover:from-red-700 hover:to-red-800 transition-all duration-300 font-sora flex items-center gap-2 text-base shadow-lg hover:shadow-red-500/25 hover:scale-105"
                    >
                      <PlayIcon className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                      Watch Trailer
                    </button>
                  )}
                  
                  {/* Back to Series Button */}
                  <button 
                    onClick={() => router.push(`/series/${seriesId}`)}
                    className="group bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold py-3 px-6 rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-300 font-sora flex items-center gap-2 text-base shadow-lg hover:shadow-blue-500/25 hover:scale-105"
                  >
                    <svg className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    Back to Series
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Sections */}
      <div className="bg-black py-16">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Left Column - Main Content */}
            <div className="lg:col-span-2 space-y-12">
              
              {/* Episodes Section */}
              <section>
                <EpisodesCarousel episodes={season.episodes || []} />
              </section>

              {/* Cast Section */}
              <section>
                <CastCarousel cast={season.credits?.cast || []} />
              </section>

            </div>

            {/* Right Column - Sidebar */}
            <div className="space-y-8">
              
              {/* Season Details */}
              <section className="bg-gradient-to-br from-gray-900/80 via-gray-800/60 to-gray-900/80 rounded-xl p-6 border border-gray-700/50 shadow-xl backdrop-blur-sm">
                <h3 className="text-white font-semibold mb-4 font-poppins">Season Details</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Season Number</span>
                    <span className="text-white">{season.season_number}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Episodes</span>
                    <span className="text-white">{season.episodes?.length || 0}</span>
                  </div>
                  {season.air_date && (
                    <div className="flex justify-between">
                      <span className="text-gray-400">Air Date</span>
                      <span className="text-white">{new Date(season.air_date).toLocaleDateString()}</span>
                    </div>
                  )}
                  {season.vote_average > 0 && (
                    <div className="flex justify-between">
                      <span className="text-gray-400">Rating</span>
                      <span className="text-white">{season.vote_average.toFixed(1)}</span>
                    </div>
                  )}
                </div>
              </section>

            </div>
          </div>
        </div>

        <div className="container mx-auto px-6 flex flex-col gap-8 mt-10">
          {/* Videos Section */}
          <section>
            <VideosCarousel videos={season.videos?.results || []} />
          </section>

          {/* Posters Section */}
          <section>
            <PostersCarousel posters={season.images?.posters || []} />
          </section>
        </div>
      </div>
    </div>
  );
} 