'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import { IMovieDetailsDto } from '@/interfaces/movie.interface';
import { StarIcon, PlayIcon, PlusIcon, HeartIcon } from '@heroicons/react/24/solid';
import { TMDB_IMAGE_URL, TMDB_IMAGE_QUALITY } from '@/utils/urls';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// Recommendations Carousel Component
function RecommendationsCarousel({ recommendations }: { recommendations: any[] }) {
  const swiperRef = useRef<any>(null);

  if (recommendations.length === 0) {
    return (
      <div className="relative px-0">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bebas text-white tracking-wider">
            Recommendations
          </h2>
        </div>
        <div className="text-center py-12">
          <p className="text-gray-400 font-poppins">No recommendations available yet.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative px-0">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-bebas text-white tracking-wider">
          Recommendations
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
          delay: 10000,
          disableOnInteraction: false,
        }}
        loop={true}
        className="recommendations-carousel"
      >
        {recommendations.slice(0, 20).map((movie) => (
          <SwiperSlide key={movie.id}>
            <div className="group cursor-pointer" onClick={() => window.location.href = `/movies/${movie.id}`}>
              <div className="relative overflow-hidden rounded-lg">
                <Image
                  src={movie.poster_path ? `${TMDB_IMAGE_URL}${TMDB_IMAGE_QUALITY.POSTER_SIZES.W_185}${movie.poster_path}` : '/placeholder-movie.jpg'}
                  alt={movie.title}
                  width={300}
                  height={450}
                  className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300"></div>
                
                {/* Rating badge */}
                <div className="absolute top-2 right-2 bg-yellow-500 text-black px-2 py-1 rounded-full text-sm font-bold flex items-center gap-1">
                  <StarIcon className="w-4 h-4" />
                  <span>{movie.vote_average.toFixed(1)}</span>
                </div>
              </div>
              
              {/* Movie info */}
              <div className="mt-3">
                <h3 className="text-white font-semibold text-sm line-clamp-1 group-hover:text-blue-400 transition-colors">
                  {movie.title}
                </h3>
                <p className="text-gray-400 text-xs">
                  {movie.release_date ? new Date(movie.release_date).getFullYear() : 'N/A'}
                </p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

// Similar Movies Carousel Component
function SimilarMoviesCarousel({ similarMovies }: { similarMovies: any[] }) {
  const swiperRef = useRef<any>(null);
  const router = useRouter();

  if (similarMovies.length === 0) {
    return (
      <div className="relative px-0">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bebas text-white tracking-wider">
            Similar Movies
          </h2>
        </div>
        <div className="text-center py-12">
          <p className="text-gray-400 font-poppins">No similar movies available yet.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative px-0">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-bebas text-white tracking-wider">
          Similar Movies
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
          delay: 11000,
          disableOnInteraction: false,
        }}
        loop={true}
        className="similar-movies-carousel"
      >
        {similarMovies.slice(0, 20).map((movie) => (
          <SwiperSlide key={movie.id}>
            <div className="group cursor-pointer" onClick={() => window.location.href = `/movies/${movie.id}`}>
              <div className="relative overflow-hidden rounded-lg">
                <Image
                  src={movie.poster_path ? `${TMDB_IMAGE_URL}${TMDB_IMAGE_QUALITY.POSTER_SIZES.W_185}${movie.poster_path}` : '/placeholder-movie.jpg'}
                  alt={movie.title}
                  width={300}
                  height={450}
                  className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300"></div>
                
                {/* Rating badge */}
                <div className="absolute top-2 right-2 bg-yellow-500 text-black px-2 py-1 rounded-full text-sm font-bold flex items-center gap-1">
                  <StarIcon className="w-4 h-4" />
                  <span>{movie.vote_average.toFixed(1)}</span>
                </div>
              </div>
              
              {/* Movie info */}
              <div className="mt-3">
                <h3 className="text-white font-semibold text-sm line-clamp-1 group-hover:text-blue-400 transition-colors">
                  {movie.title}
                </h3>
                <p className="text-gray-400 text-xs">
                  {movie.release_date ? new Date(movie.release_date).getFullYear() : 'N/A'}
                </p>
              </div>
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
          Top Billed Cast
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
            <div className="group cursor-pointer">
              <div className="relative mb-3 overflow-hidden rounded-lg">
                {actor.profile_path ? (
                  <Image
                    src={`${TMDB_IMAGE_URL}${TMDB_IMAGE_QUALITY.PROFILE_SIZES.H_632}${actor.profile_path}`}
                    alt={actor.name}
                    width={200}
                    height={300}
                    className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                ) : (
                  <div className="w-full h-48 bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center">
                    <span className="text-white font-bold text-2xl">
                      {actor.name.charAt(0)}
                    </span>
                  </div>
                )}
              </div>
              <h3 className="text-white font-semibold text-sm mb-1 truncate">{actor.name}</h3>
              <p className="text-gray-400 text-xs truncate">"{actor.character}"</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

// Reviews Carousel Component
function ReviewsCarousel({ reviews, totalReviews }: { reviews: any[], totalReviews: number }) {
  const swiperRef = useRef<any>(null);

  if (reviews.length === 0) {
    return (
      <div className="relative px-4">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bebas text-white tracking-wider">
            Reviews
          </h2>
          <div className="flex gap-6">
            <button className="text-white border-b-2 border-red-500 pb-2 font-poppins text-sm">
              Reviews {totalReviews}
            </button>
            <button className="text-gray-400 hover:text-white transition-colors font-poppins text-sm">
              Discussions
            </button>
          </div>
        </div>
        <div className="text-center py-12">
          <p className="text-gray-400 font-poppins">No reviews available yet.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative px-4">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-bebas text-white tracking-wider">
          Reviews
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
            slidesPerView: 1,
          },
          1024: {
            slidesPerView: 2,
          },
          1280: {
            slidesPerView: 2,
          },
          1536: {
            slidesPerView: 3,
          },
        }}
        autoplay={{
          delay: 6000,
          disableOnInteraction: false,
        }}
        loop={true}
        className="reviews-carousel"
      >
        {reviews.slice(0, 10).map((review) => (
          <SwiperSlide key={review.id}>
            <div className="relative bg-gradient-to-br from-gray-900/80 via-gray-800/60 to-gray-900/80 rounded-xl p-6 border border-gray-700/50 h-full backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all duration-300 group">
              {/* Background Pattern */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-red-500/5 rounded-xl"></div>
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-yellow-400/10 to-orange-500/10 rounded-full blur-xl"></div>
              <div className="absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-br from-blue-400/10 to-purple-500/10 rounded-full blur-xl"></div>
              
              {/* Content */}
              <div className="relative z-10">
                <div className="flex items-start gap-4 mb-4">
                  <div className="relative">
                    <div className="w-14 h-14 bg-gradient-to-br from-red-500 via-purple-600 to-blue-600 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg">
                      <span className="text-white font-bold text-lg">
                        {review.author.charAt(0)}
                      </span>
                    </div>
                    {/* Rating Badge */}
                    {review.author_details.rating && (
                      <div className="absolute -top-2 -right-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-2 py-1 rounded-full text-xs font-bold shadow-lg">
                        ★{review.author_details.rating * 20}%
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-white font-bold font-poppins text-base truncate group-hover:text-blue-300 transition-colors">
                        A review by {review.author}
                      </h3>
                    </div>
                    <p className="text-gray-400 text-xs font-poppins">
                      Written by {review.author} on {new Date(review.created_at).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                
                {/* Quote Icon */}
                <div className="absolute top-4 right-4 text-gray-600/30 text-2xl">
                  "
                </div>
                
                <p className="text-gray-200 font-poppins text-sm leading-relaxed line-clamp-4 relative">
                  {review.content}
                </p>
                
                {/* Bottom Decoration */}
                <div className="mt-4 pt-4 border-t border-gray-700/50">
                  <div className="flex items-center gap-2 text-gray-500 text-xs">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                    <span>User Review</span>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      
      {totalReviews > 10 && (
        <div className="text-center mt-6">
          <button className="text-blue-400 hover:text-blue-300 font-poppins text-sm transition-colors">
            Read All Reviews ({totalReviews})
          </button>
        </div>
      )}
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

// Backdrops Carousel Component
function BackdropsCarousel({ backdrops }: { backdrops: any[] }) {
  const swiperRef = useRef<any>(null);

  if (backdrops.length === 0) {
    return (
      <div className="relative px-0">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bebas text-white tracking-wider">
            Backdrops
          </h2>
        </div>
        <div className="text-center py-12">
          <p className="text-gray-400 font-poppins">No backdrops available yet.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative px-0">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-bebas text-white tracking-wider">
          Backdrops
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
            slidesPerView: 3,
          },
        }}
        autoplay={{
          delay: 8000,
          disableOnInteraction: false,
        }}
        loop={true}
        className="backdrops-carousel"
      >
        {backdrops.slice(0, 15).map((backdrop, index) => (
          <SwiperSlide key={index}>
            <div className="group cursor-pointer">
              <div className="relative overflow-hidden rounded-lg">
                <Image
                  src={`${TMDB_IMAGE_URL}${TMDB_IMAGE_QUALITY.BACKDROP_SIZES.W_300}${backdrop.file_path}`}
                  alt={`Backdrop ${index + 1}`}
                  width={400}
                  height={225}
                  className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
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



export default function MoviePage() {
  const params = useParams();
  const router = useRouter();
  const movieId = params.id as string;
  
  const [movie, setMovie] = useState<IMovieDetailsDto | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/movies/${movieId}`);
        if (!response.ok) throw new Error('Failed to fetch movie details');
        const data = await response.json();
        setMovie(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    if (movieId) {
      fetchMovie();
    }
  }, [movieId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-red-500 mx-auto mb-4"></div>
          <p className="text-white text-lg font-poppins">Loading movie details...</p>
        </div>
      </div>
    );
  }

  if (error || !movie) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="text-center">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bebas text-white mb-2">Oops!</h2>
          <p className="text-gray-400 font-poppins mb-4">{error || 'Movie not found'}</p>
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
          src={movie.backdrop_path ? `${TMDB_IMAGE_URL}${TMDB_IMAGE_QUALITY.BACKDROP_SIZES.W_1280}${movie.backdrop_path}` : movie.poster_path ? `${TMDB_IMAGE_URL}${TMDB_IMAGE_QUALITY.POSTER_SIZES.W_780}${movie.poster_path}` : '/placeholder-movie.jpg'}
          alt={movie.title}
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
              {/* Poster */}
              <div className="lg:col-span-4 xl:col-span-3">
                <div className="relative group">
                  <Image
                    src={movie.poster_path ? `${TMDB_IMAGE_URL}${TMDB_IMAGE_QUALITY.POSTER_SIZES.W_500}${movie.poster_path}` : '/placeholder-movie.jpg'}
                    alt={movie.title}
                    width={280}
                    height={420}
                    className="w-full max-w-xs mx-auto rounded-xl shadow-2xl transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-t from-black/20 to-transparent"></div>
                </div>
              </div>
              
              {/* Movie Info */}
              <div className="lg:col-span-8 xl:col-span-9">
                {/* Title */}
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-cinzel font-semibold text-white mb-3 tracking-tight">
                  {movie.title.toUpperCase()}
                </h1>
                
                {/* Tagline */}
                {movie.tagline && (
                  <p className="text-lg md:text-xl text-gray-300 mb-4 font-poppins italic">
                    "{movie.tagline}"
                  </p>
                )}
                
                {/* Metadata Bar */}
                <div className="flex flex-wrap items-center gap-4 mb-4 text-gray-300 font-poppins">
                  <div className="flex items-center gap-2 bg-yellow-500/20 backdrop-blur-sm px-3 py-1 rounded-full border border-yellow-500/30">
                    <StarIcon className="w-5 h-5 text-yellow-400" />
                    <span className="font-bold text-white text-lg">{movie.vote_average.toFixed(1)}</span>
                  </div>
                  <span className="text-lg">•</span>
                  <span className="text-lg">{movie.release_date ? new Date(movie.release_date).getFullYear() : 'N/A'}</span>
                  <span className="text-lg">•</span>
                  <span className="text-lg">{movie.runtime ? `${Math.floor(movie.runtime / 60)}h ${movie.runtime % 60}m` : 'N/A'}</span>
                  <span className="text-lg">•</span>
                  <span className="bg-green-600/80 text-white px-3 py-1 rounded-full text-sm font-semibold backdrop-blur-sm border border-green-500/50">
                    {movie.status}
                  </span>
                </div>
                
                {/* Genres */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {movie.genres?.slice(0, 3).map((genre) => (
                    <span
                      key={genre.id}
                      className="bg-blue-600/30 text-white px-4 py-2 rounded-full text-sm font-semibold border border-blue-500/50 backdrop-blur-sm hover:bg-blue-600/50 transition-all duration-300 cursor-pointer"
                    >
                      {genre.name}
                    </span>
                  ))}
                </div>
                
                {/* Overview */}
                <p className="text-base md:text-lg text-gray-300 mb-8 max-w-3xl font-poppins leading-relaxed">
                  {movie.overview}
                </p>
                
                {/* Action Buttons */}
                <div className="flex flex-wrap gap-3">
                  {/* Watch Trailer Button */}
                  {movie.videos?.results && movie.videos.results.length > 0 && (
                    <button 
                      onClick={() => {
                        const trailer = movie.videos?.results?.find(video => 
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
                  
                  {/* Official Site Button */}
                  {movie.homepage && (
                    <a 
                      href={movie.homepage} 
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
                  
                  {/* IMDb Button */}
                  {movie.external_ids?.imdb_id && (
                    <a 
                      href={`https://www.imdb.com/title/${movie.external_ids.imdb_id}`}
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
              
              {/* Top Billed Cast Section */}
              <section>
                <CastCarousel cast={movie.credits?.cast || []} />
              </section>

              {/* Reviews Section */}
              <section>
                <ReviewsCarousel reviews={movie.reviews?.results || []} totalReviews={movie.reviews?.total_results || 0} />
              </section>

              {/* Social Media Section */}
              <section>
                <div className="relative px-4">
                  <div className="flex items-center justify-between mb-8">
                    <h2 className="text-3xl font-bebas text-white tracking-wider">
                      Social Media
                    </h2>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {movie.external_ids?.facebook_id && (
                      <a
                        href={`https://www.facebook.com/${movie.external_ids.facebook_id}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 border border-gray-800 hover:border-gray-700 transition-all duration-300 group hover:bg-gray-800/50"
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center group-hover:bg-blue-700 transition-colors">
                            <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                            </svg>
                          </div>
                          <div>
                            <h3 className="text-white font-semibold font-poppins group-hover:text-blue-300 transition-colors">Facebook</h3>
                            <p className="text-gray-400 text-sm font-poppins">Follow on Facebook</p>
                          </div>
                        </div>
                      </a>
                    )}
                    
                    {movie.external_ids?.twitter_id && (
                      <a
                        href={`https://twitter.com/${movie.external_ids.twitter_id}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 border border-gray-800 hover:border-gray-700 transition-all duration-300 group hover:bg-gray-800/50"
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-blue-400 rounded-full flex items-center justify-center group-hover:bg-blue-500 transition-colors">
                            <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                            </svg>
                          </div>
                          <div>
                            <h3 className="text-white font-semibold font-poppins group-hover:text-blue-300 transition-colors">Twitter</h3>
                            <p className="text-gray-400 text-sm font-poppins">Follow on Twitter</p>
                          </div>
                        </div>
                      </a>
                    )}
                    
                    {movie.external_ids?.instagram_id && (
                      <a
                        href={`https://www.instagram.com/${movie.external_ids.instagram_id}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 border border-gray-800 hover:border-gray-700 transition-all duration-300 group hover:bg-gray-800/50"
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center group-hover:from-purple-600 group-hover:to-pink-600 transition-colors">
                            <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987 6.62 0 11.987-5.367 11.987-11.987C24.014 5.367 18.637.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.323-1.297C4.198 14.895 3.708 13.744 3.708 12.447s.49-2.448 1.297-3.323c.875-.807 2.026-1.297 3.323-1.297s2.448.49 3.323 1.297c.807.875 1.297 2.026 1.297 3.323s-.49 2.448-1.297 3.323c-.875.807-2.026 1.297-3.323 1.297s2.448.49 3.323 1.297c.807.875 1.297 2.026 1.297 3.323s-.49 2.448-1.297 3.323z"/>
                            </svg>
                          </div>
                          <div>
                            <h3 className="text-white font-semibold font-poppins group-hover:text-purple-300 transition-colors">Instagram</h3>
                            <p className="text-gray-400 text-sm font-poppins">Follow on Instagram</p>
                          </div>
                        </div>
                      </a>
                    )}
                    
                    {movie.external_ids?.imdb_id && (
                      <a
                        href={`https://www.imdb.com/title/${movie.external_ids.imdb_id}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 border border-gray-800 hover:border-gray-700 transition-all duration-300 group hover:bg-gray-800/50"
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-yellow-600 rounded-full flex items-center justify-center group-hover:bg-yellow-700 transition-colors">
                            <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                            </svg>
                          </div>
                          <div>
                            <h3 className="text-white font-semibold font-poppins group-hover:text-yellow-300 transition-colors">IMDb</h3>
                            <p className="text-gray-400 text-sm font-poppins">View on IMDb</p>
                          </div>
                        </div>
                      </a>
                    )}
                    
                    {movie.homepage && (
                      <a
                        href={movie.homepage}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 border border-gray-800 hover:border-gray-700 transition-all duration-300 group hover:bg-gray-800/50"
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-gray-600 rounded-full flex items-center justify-center group-hover:bg-gray-700 transition-colors">
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                          </div>
                          <div>
                            <h3 className="text-white font-semibold font-poppins group-hover:text-gray-300 transition-colors">Official Site</h3>
                            <p className="text-gray-400 text-sm font-poppins">Visit Website</p>
                          </div>
                        </div>
                      </a>
                    )}
                    
                    {(!movie.external_ids?.facebook_id && !movie.external_ids?.twitter_id && !movie.external_ids?.instagram_id && !movie.external_ids?.imdb_id && !movie.homepage) && (
                      <div className="col-span-full text-center py-12">
                        <p className="text-gray-400 font-poppins">No social media links available</p>
                      </div>
                    )}
                  </div>
                </div>
              </section>

              
            </div>

            {/* Right Column - Sidebar */}
            <div className="space-y-8">
              
              {/* Production Companies Section */}
              <section className="bg-gray-900/30 rounded-lg p-6 border border-gray-800/50">
                <h3 className="text-white font-semibold mb-6 font-poppins">Production Companies</h3>
              <div className="space-y-4">
                  {movie.production_companies?.map((company: any, index: number) => (
                    <div key={index} className="flex items-center gap-3">
                      {company.logo_path ? (
                        <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center overflow-hidden">
                          <Image
                            src={`${TMDB_IMAGE_URL}${TMDB_IMAGE_QUALITY.LOGO_SIZES.W_92}${company.logo_path}`}
                            alt={company.name}
                            width={48}
                            height={48}
                            className="w-full h-full object-contain"
                          />
                        </div>
                      ) : (
                        <div className="w-12 h-12 bg-gray-700 rounded-lg flex items-center justify-center">
                          <span className="text-gray-400 text-xs font-bold text-center">
                            {company.name.split(' ').map((word: string) => word[0]).join('').slice(0, 2)}
                      </span>
                    </div>
                      )}
                      <div className="flex-1">
                        <p className="text-white font-poppins text-sm font-medium">{company.name}</p>
                        {company.origin_country && (
                          <p className="text-gray-400 font-poppins text-xs">{company.origin_country}</p>
                        )}
                      </div>
                  </div>
                ))}
                  {(!movie.production_companies || movie.production_companies.length === 0) && (
                    <p className="text-gray-400 font-poppins text-sm text-center py-4">
                      No production companies available
                    </p>
                  )}
                  </div>
              </section>

              {/* Social Media Section */}
              {/* <section className="bg-gray-900/30 rounded-lg p-6 border border-gray-800/50">
                <h3 className="text-white font-semibold mb-4 font-poppins">Social Media</h3>
                <div className="space-y-3">
                  {movie.external_ids?.facebook_id && (
                    <a
                      href={`https://www.facebook.com/${movie.external_ids.facebook_id}`}
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
                  {movie.external_ids?.twitter_id && (
                    <a
                      href={`https://twitter.com/${movie.external_ids.twitter_id}`}
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
                  {movie.external_ids?.instagram_id && (
                    <a
                      href={`https://www.instagram.com/${movie.external_ids.instagram_id}`}
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
                  {movie.external_ids?.imdb_id && (
                    <a
                      href={`https://www.imdb.com/title/${movie.external_ids.imdb_id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 text-gray-300 hover:text-white transition-colors group"
                    >
                      <div className="w-8 h-8 bg-yellow-600 rounded-full flex items-center justify-center group-hover:bg-yellow-700 transition-colors">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                        </svg>
                      </div>
                      <span className="font-poppins text-sm">IMDb</span>
                    </a>
                  )}
                  {movie.homepage && (
                    <a
                      href={movie.homepage}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 text-gray-300 hover:text-white transition-colors group"
                    >
                      <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center group-hover:bg-gray-700 transition-colors">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </div>
                      <span className="font-poppins text-sm">Official Site</span>
                    </a>
                  )}
                  {(!movie.external_ids?.facebook_id && !movie.external_ids?.twitter_id && !movie.external_ids?.instagram_id && !movie.external_ids?.imdb_id && !movie.homepage) && (
                    <p className="text-gray-400 font-poppins text-sm text-center py-4">
                      No social media links available
                    </p>
                  )}
                </div>
              </section> */}

              {/* Movie Details */}
              <section className="bg-gray-900/30 rounded-lg p-6 border border-gray-800/50">
                <h3 className="text-white font-semibold mb-4 font-poppins">Details</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Status</span>
                    <span className="text-white">{movie.status}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Original Language</span>
                    <span className="text-white">{movie.original_language?.toUpperCase()}</span>
                  </div>
                  {movie.budget > 0 && (
                    <div className="flex justify-between">
                      <span className="text-gray-400">Budget</span>
                      <span className="text-white">${(movie.budget / 1000000).toFixed(1)}M</span>
                  </div>
                )}
                  {movie.revenue > 0 && (
                    <div className="flex justify-between">
                      <span className="text-gray-400">Revenue</span>
                      <span className="text-white">${(movie.revenue / 1000000).toFixed(1)}M</span>
                  </div>
                )}
              </div>
              </section>

          {/* Keywords */}
              <section className="bg-gray-900/30 rounded-lg p-6 border border-gray-800/50">
                <h3 className="text-white font-semibold mb-4 font-poppins">Keywords</h3>
                <div className="flex flex-wrap gap-2">
                  {movie.keywords?.keywords?.slice(0, 15).map((keyword) => (
                  <span
                    key={keyword.id}
                      className="bg-gray-800 text-white px-3 py-1 rounded-full text-xs font-semibold hover:bg-gray-700 transition-colors cursor-pointer border border-gray-700"
                  >
                    {keyword.name}
                  </span>
                ))}
              </div>
              </section>
              </div>
            </div>
        </div>

        <div className="container mx-auto px-6 flex flex-col gap-8 mt-10">
          {/* Videos Section */}
          <section>
            <VideosCarousel videos={movie.videos?.results || []} />
          </section>

          {/* Backdrops Section */}
          <section>
            <BackdropsCarousel backdrops={movie.images?.backdrops || []} />
          </section>

          {/* Posters Section */}
          <section>
            <PostersCarousel posters={movie.images?.posters || []} />
          </section>

          {/* Recommendations Section */}
          <section>
            <RecommendationsCarousel recommendations={movie.recommendations?.results || []} />
          </section>

          {/* Similar Movies Section */}
          <section>
            <SimilarMoviesCarousel similarMovies={movie.similar?.results || []} />
          </section>
        </div>
      </div>
    </div>
  );
} 