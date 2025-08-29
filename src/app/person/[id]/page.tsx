'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import { ICastDetailDto } from '@/interfaces/cast.interface';
import { StarIcon, PlayIcon, PlusIcon, HeartIcon } from '@heroicons/react/24/solid';
import { TMDB_IMAGE_URL, TMDB_IMAGE_QUALITY } from '@/utils/urls';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// Movie Credits Carousel Component
function MovieCreditsCarousel({ credits }: { credits: any[] }) {
  const swiperRef = useRef<any>(null);
  const router = useRouter();

  if (credits.length === 0) {
    return (
      <div className="relative px-4">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bebas text-white tracking-wider">
            Movie Credits
          </h2>
        </div>
        <div className="text-center py-12">
          <p className="text-gray-400 font-poppins">No movie credits available yet.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative px-4">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-bebas text-white tracking-wider">
          Movie Credits
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
          delay: 6000,
          disableOnInteraction: false,
        }}
        loop={true}
        className="movie-credits-carousel"
      >
        {credits.slice(0, 20).map((credit) => (
          <SwiperSlide key={credit.id}>
            <div className="group cursor-pointer" onClick={() => {
              if (credit.media_type === 'movie') {
                router.push(`/movies/${credit.id}`);
              } else if (credit.media_type === 'tv') {
                router.push(`/series/${credit.id}`);
              }
            }}>
              <div className="relative overflow-hidden rounded-lg">
                <Image
                  src={credit.poster_path ? `${TMDB_IMAGE_URL}${TMDB_IMAGE_QUALITY.POSTER_SIZES.W_185}${credit.poster_path}` : '/placeholder-movie.jpg'}
                  alt={credit.title || credit.name}
                  width={300}
                  height={450}
                  className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300"></div>
                
                {/* Rating badge */}
                {credit.vote_average > 0 && (
                  <div className="absolute top-2 right-2 bg-yellow-500 text-black px-2 py-1 rounded-full text-sm font-bold flex items-center gap-1">
                    <StarIcon className="w-4 h-4" />
                    <span>{credit.vote_average.toFixed(1)}</span>
                  </div>
                )}
                
                {/* Character/Job badge */}
                <div className="absolute bottom-2 left-2 bg-blue-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                  {credit.character || credit.job}
                </div>
              </div>
              
              {/* Credit info */}
              <div className="mt-3">
                <h3 className="text-white font-semibold text-sm line-clamp-1 group-hover:text-blue-400 transition-colors">
                  {credit.title || credit.name}
                </h3>
                <p className="text-gray-400 text-xs">
                  {credit.release_date ? new Date(credit.release_date).getFullYear() : 
                   credit.first_air_date ? new Date(credit.first_air_date).getFullYear() : 'N/A'}
                </p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

// TV Credits Carousel Component
function TvCreditsCarousel({ credits }: { credits: any[] }) {
  const swiperRef = useRef<any>(null);
  const router = useRouter();

  if (credits.length === 0) {
    return (
      <div className="relative px-4">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bebas text-white tracking-wider">
            TV Credits
          </h2>
        </div>
        <div className="text-center py-12">
          <p className="text-gray-400 font-poppins">No TV credits available yet.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative px-4">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-bebas text-white tracking-wider">
          TV Credits
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
          delay: 7000,
          disableOnInteraction: false,
        }}
        loop={true}
        className="tv-credits-carousel"
      >
        {credits.slice(0, 20).map((credit) => (
          <SwiperSlide key={credit.id}>
            <div className="group cursor-pointer" onClick={() => router.push(`/series/${credit.id}`)}>
              <div className="relative overflow-hidden rounded-lg">
                <Image
                  src={credit.poster_path ? `${TMDB_IMAGE_URL}${TMDB_IMAGE_QUALITY.POSTER_SIZES.W_185}${credit.poster_path}` : '/placeholder-movie.jpg'}
                  alt={credit.name}
                  width={300}
                  height={450}
                  className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300"></div>
                
                {/* Rating badge */}
                {credit.vote_average > 0 && (
                  <div className="absolute top-2 right-2 bg-yellow-500 text-black px-2 py-1 rounded-full text-sm font-bold flex items-center gap-1">
                    <StarIcon className="w-4 h-4" />
                    <span>{credit.vote_average.toFixed(1)}</span>
                  </div>
                )}
                
                {/* Character/Job badge */}
                <div className="absolute bottom-2 left-2 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                  {credit.character || credit.job}
                </div>
              </div>
              
              {/* Credit info */}
              <div className="mt-3">
                <h3 className="text-white font-semibold text-sm line-clamp-1 group-hover:text-blue-400 transition-colors">
                  {credit.name}
                </h3>
                <p className="text-gray-400 text-xs">
                  {credit.first_air_date ? new Date(credit.first_air_date).getFullYear() : 'N/A'}
                </p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

// Photos Carousel Component
function PhotosCarousel({ photos }: { photos: any[] }) {
  const swiperRef = useRef<any>(null);

  if (photos.length === 0) {
    return (
      <div className="relative px-0">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bebas text-white tracking-wider">
            Photos
          </h2>
        </div>
        <div className="text-center py-12">
          <p className="text-gray-400 font-poppins">No photos available yet.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative px-0">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-bebas text-white tracking-wider">
          Photos
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
          delay: 8000,
          disableOnInteraction: false,
        }}
        loop={true}
        className="photos-carousel"
      >
        {photos.slice(0, 20).map((photo, index) => (
          <SwiperSlide key={index}>
            <div className="group cursor-pointer">
              <div className="relative overflow-hidden rounded-lg">
                <Image
                  src={`${TMDB_IMAGE_URL}${TMDB_IMAGE_QUALITY.PROFILE_SIZES.H_632}${photo.file_path}`}
                  alt={`Photo ${index + 1}`}
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

export default function PersonPage() {
  const params = useParams();
  const router = useRouter();
  const personId = params.id as string;
  
  const [person, setPerson] = useState<ICastDetailDto | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPerson = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/person/${personId}`);
        if (!response.ok) throw new Error('Failed to fetch person details');
        const data = await response.json();
        setPerson(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    if (personId) {
      fetchPerson();
    }
  }, [personId]);

  // Reset scroll position when personId changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [personId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-red-500 mx-auto mb-4"></div>
          <p className="text-white text-lg font-poppins">Loading person details...</p>
        </div>
      </div>
    );
  }

  if (error || !person) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="text-center">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bebas text-white mb-2">Oops!</h2>
          <p className="text-gray-400 font-poppins mb-4">{error || 'Person not found'}</p>
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

  // Filter credits by media type
  const movieCredits = person.combined_credits?.cast?.filter((credit: any) => credit.media_type === 'movie') || [];
  const tvCredits = person.combined_credits?.cast?.filter((credit: any) => credit.media_type === 'tv') || [];

  return (
    <div className="min-h-screen bg-black">
      {/* Hero Section */}
      <div className="relative h-screen">
        {/* Background Image */}
        <Image
          src={person.profile_path ? `${TMDB_IMAGE_URL}${TMDB_IMAGE_QUALITY.PROFILE_SIZES.H_632}${person.profile_path}` : '/placeholder-movie.jpg'}
          alt={person.name}
          fill
          className="object-cover"
          priority
        />
        
        {/* Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/80"></div>
        
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
              {/* Profile Image */}
              <div className="lg:col-span-4 xl:col-span-3">
                <div className="relative group">
                  <Image
                    src={person.profile_path ? `${TMDB_IMAGE_URL}${TMDB_IMAGE_QUALITY.PROFILE_SIZES.H_632}${person.profile_path}` : '/placeholder-movie.jpg'}
                    alt={person.name}
                    width={280}
                    height={420}
                    className="w-full max-w-xs mx-auto rounded-xl shadow-2xl transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-t from-black/20 to-transparent"></div>
                </div>
              </div>
              
              {/* Person Info */}
              <div className="lg:col-span-8 xl:col-span-9">
                {/* Name */}
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-cinzel font-semibold text-white mb-3 tracking-tight">
                  {person.name.toUpperCase()}
                </h1>
                
                {/* Also Known As */}
                {person.also_known_as && person.also_known_as.length > 0 && (
                  <p className="text-lg md:text-xl text-gray-300 mb-4 font-poppins">
                    Also known as: {person.also_known_as.slice(0, 3).join(', ')}
                    {person.also_known_as.length > 3 && '...'}
                  </p>
                )}
                
                {/* Metadata Bar */}
                <div className="flex flex-wrap items-center gap-4 mb-4 text-gray-300 font-poppins">
                  {person.birthday && (
                    <>
                      <div className="flex items-center gap-2 bg-blue-500/20 backdrop-blur-sm px-3 py-1 rounded-full border border-blue-500/30">
                        <span className="font-bold text-white text-lg">
                          {new Date(person.birthday).getFullYear()}
                        </span>
                      </div>
                      <span className="text-lg">•</span>
                    </>
                  )}
                  {person.place_of_birth && (
                    <>
                      <span className="text-lg">{person.place_of_birth}</span>
                      <span className="text-lg">•</span>
                    </>
                  )}
                  <div className="flex items-center gap-2 bg-yellow-500/20 backdrop-blur-sm px-3 py-1 rounded-full border border-yellow-500/30">
                    <StarIcon className="w-4 h-4 text-yellow-400" />
                    <span className="font-bold text-white text-sm">{person.popularity.toFixed(0)}</span>
                  </div>
                </div>
                
                {/* Biography */}
                {person.biography && (
                  <p className="text-base md:text-lg text-gray-300 mb-8 max-w-3xl font-poppins leading-relaxed line-clamp-4">
                    {person.biography}
                  </p>
                )}
                
                {/* Action Buttons */}
                <div className="flex flex-wrap gap-3">
                  {/* IMDb Button */}
                  {person.external_ids?.imdb_id && (
                    <a 
                      href={`https://www.imdb.com/name/${person.external_ids.imdb_id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group bg-gradient-to-r from-yellow-600 to-orange-600 text-black font-bold py-3 px-6 rounded-lg hover:from-yellow-700 hover:to-orange-700 transition-all duration-300 font-sora flex items-center gap-2 text-base shadow-lg hover:shadow-yellow-500/25 hover:scale-105"
                    >
                      <svg className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                      </svg>
                      IMDb
                    </a>
                  )}
                  
                  {/* Homepage Button */}
                  {person.homepage && (
                    <a 
                      href={person.homepage} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="group bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold py-3 px-6 rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-300 font-sora flex items-center gap-2 text-base shadow-lg hover:shadow-blue-500/25 hover:scale-105"
                    >
                      <svg className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                      Official Site
                    </a>
                  )}
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
              
              {/* Movie Credits Section */}
              <section>
                <MovieCreditsCarousel credits={movieCredits} />
              </section>

              {/* TV Credits Section */}
              <section>
                <TvCreditsCarousel credits={tvCredits} />
              </section>

            </div>

            {/* Right Column - Sidebar */}
            <div className="space-y-8">
              
              {/* Personal Details */}
              <section className="bg-gradient-to-br from-gray-900/80 via-gray-800/60 to-gray-900/80 rounded-xl p-6 border border-gray-700/50 shadow-xl backdrop-blur-sm">
                <h3 className="text-white font-semibold mb-4 font-poppins">Personal Details</h3>
                <div className="space-y-3 text-sm">
                  {person.birthday && (
                    <div className="flex justify-between">
                      <span className="text-gray-400">Birthday</span>
                      <span className="text-white">{new Date(person.birthday).toLocaleDateString()}</span>
                    </div>
                  )}
                  {person.deathday && (
                    <div className="flex justify-between">
                      <span className="text-gray-400">Death Date</span>
                      <span className="text-white">{new Date(person.deathday).toLocaleDateString()}</span>
                    </div>
                  )}
                  {person.place_of_birth && (
                    <div className="flex justify-between">
                      <span className="text-gray-400">Place of Birth</span>
                      <span className="text-white">{person.place_of_birth}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-gray-400">Known For</span>
                    <span className="text-white">{person.known_for_department}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Popularity</span>
                    <span className="text-white">{person.popularity.toFixed(0)}</span>
                  </div>
                </div>
              </section>

              {/* Social Media */}
              <section className="bg-gradient-to-br from-gray-900/80 via-gray-800/60 to-gray-900/80 rounded-xl p-6 border border-gray-700/50 shadow-xl backdrop-blur-sm">
                <h3 className="text-white font-semibold mb-4 font-poppins">Social Media</h3>
                <div className="space-y-3">
                  {person.external_ids?.facebook_id && (
                    <a
                      href={`https://www.facebook.com/${person.external_ids.facebook_id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 text-gray-300 hover:text-white transition-colors group"
                    >
                      <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center group-hover:bg-blue-700 transition-colors">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                        </svg>
                      </div>
                      <span className="font-poppins text-sm">Facebook</span>
                    </a>
                  )}
                  {person.external_ids?.twitter_id && (
                    <a
                      href={`https://twitter.com/${person.external_ids.twitter_id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 text-gray-300 hover:text-white transition-colors group"
                    >
                      <div className="w-8 h-8 bg-blue-400 rounded-full flex items-center justify-center group-hover:bg-blue-500 transition-colors">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                        </svg>
                      </div>
                      <span className="font-poppins text-sm">Twitter</span>
                    </a>
                  )}
                  {person.external_ids?.instagram_id && (
                    <a
                      href={`https://www.instagram.com/${person.external_ids.instagram_id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 text-gray-300 hover:text-white transition-colors group"
                    >
                      <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center group-hover:from-purple-600 group-hover:to-pink-600 transition-colors">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987 6.62 0 11.987-5.367 11.987-11.987C24.014 5.367 18.637.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.323-1.297C4.198 14.895 3.708 13.744 3.708 12.447s.49-2.448 1.297-3.323c.875-.807 2.026-1.297 3.323-1.297s2.448.49 3.323 1.297c.807.875 1.297 2.026 1.297 3.323s-.49 2.448-1.297 3.323c-.875.807-2.026 1.297-3.323 1.297s2.448.49 3.323 1.297c.807.875 1.297 2.026 1.297 3.323s-.49 2.448-1.297 3.323z"/>
                        </svg>
                      </div>
                      <span className="font-poppins text-sm">Instagram</span>
                    </a>
                  )}
                  {person.external_ids?.tiktok_id && (
                    <a
                      href={`https://www.tiktok.com/@${person.external_ids.tiktok_id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 text-gray-300 hover:text-white transition-colors group"
                    >
                      <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center group-hover:bg-gray-800 transition-colors">
                        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
                        </svg>
                      </div>
                      <span className="font-poppins text-sm">TikTok</span>
                    </a>
                  )}
                  {person.external_ids?.youtube_id && (
                    <a
                      href={`https://www.youtube.com/${person.external_ids.youtube_id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 text-gray-300 hover:text-white transition-colors group"
                    >
                      <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center group-hover:bg-red-700 transition-colors">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                        </svg>
                      </div>
                      <span className="font-poppins text-sm">YouTube</span>
                    </a>
                  )}
                  {(!person.external_ids?.facebook_id && !person.external_ids?.twitter_id && !person.external_ids?.instagram_id && !person.external_ids?.tiktok_id && !person.external_ids?.youtube_id) && (
                    <p className="text-gray-400 font-poppins text-sm text-center py-4">
                      No social media links available
                    </p>
                  )}
                </div>
              </section>

            </div>
          </div>
        </div>

        <div className="container mx-auto px-6 flex flex-col gap-8 mt-10">
          {/* Photos Section */}
          <section>
            <PhotosCarousel photos={person.images?.profiles || []} />
          </section>
        </div>
      </div>
    </div>
  );
} 