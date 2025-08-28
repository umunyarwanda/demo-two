'use client';

import { useState, useEffect, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, EffectFade } from 'swiper/modules';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { IMovieSummaryDto, ITvSummaryDto } from '@/interfaces/movie.interface';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

type TrendingItem = IMovieSummaryDto | ITvSummaryDto;

interface HeroSliderProps {
  items: TrendingItem[];
}

export default function HeroSlider({ items }: HeroSliderProps) {
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);
  const swiperRef = useRef<any>(null);
  const router = useRouter();

  // Helper function to check if item is a movie
  const isMovie = (item: TrendingItem): item is IMovieSummaryDto => {
    return 'title' in item;
  };

  const handleMoreInfo = (item: TrendingItem) => {
    if (isMovie(item)) {
      router.push(`/movies/${item.id}`);
    } else {
      router.push(`/series/${item.id}`);
    }
  };

  return (
    <section className="relative h-screen">
      <Swiper
        ref={swiperRef}
        modules={[Navigation, Pagination, Autoplay, EffectFade]}
        effect="slide"
        // fadeEffect={{
        //   crossFade: true
        // }}
        spaceBetween={0}
        slidesPerView={1}
        loop={false}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
          el: '.hero-pagination',
        }}
        navigation={{
          nextEl: '.hero-next',
          prevEl: '.hero-prev',
        }}
        className="hero-swiper h-full"
        onSlideChange={(swiper) => {
          setActiveIndex(swiper.activeIndex);
          setIsAutoPlaying(false);
          setTimeout(() => setIsAutoPlaying(true), 10000);
        }}
        onSwiper={(swiper) => {
          setActiveIndex(swiper.activeIndex);
        }}
      >
        {items.slice(0, 10).map((item) => (
          <SwiperSlide key={item.id}>
            <div className="relative h-full">
              {/* Background Image */}
              <div className="absolute inset-0">
                <Image
                  src={item.backdrop_path || item.poster_path || '/placeholder-movie.jpg'}
                  alt={isMovie(item) ? item.title : item.name}
                  fill
                  className="object-cover"
                  priority
                  draggable={false}
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-black/40"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
              </div>

              {/* Hero Content */}
              <div className="relative z-10 flex items-center h-full">
                <div className="max-w-7xl px-4 sm:px-6 lg:px-28 w-full">
                  <div className="grid lg:grid-cols-3 gap-8 items-center">
                    {/* Poster */}
                    <div className="relative lg:col-span-1">
                      <div className="relative overflow-hidden rounded-lg shadow-2xl">
                        <Image
                          src={item.poster_path || '/placeholder-movie.jpg'}
                          alt={isMovie(item) ? item.title : item.name}
                          width={300}
                          height={450}
                          className="w-full max-w-xs h-auto object-cover"
                          draggable={false}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="lg:col-span-2">
                      {/* Title */}
                      <h1 className="text-4xl md:text-6xl lg:text-7xl font-bebas text-white mb-4 tracking-wider">
                        {isMovie(item) ? item.title.toUpperCase() : item.name.toUpperCase()}
                      </h1>
                      
                      {/* Rating and Year */}
                      <div className="flex items-center gap-4 mb-4 font-poppins">
                        <div className="flex items-center gap-2">
                          <span className="text-yellow-400">⭐</span>
                          <span className="text-white font-semibold">{item.vote_average.toFixed(1)}</span>
                        </div>
                        <span className="text-gray-300">•</span>
                        <span className="text-gray-300">
                          {isMovie(item) 
                            ? new Date(item.release_date).getFullYear()
                            : new Date(item.first_air_date).getFullYear()
                          }
                        </span>
                        <span className="text-gray-300">•</span>
                        <span className="text-gray-300">
                          {isMovie(item) ? 'Movie' : 'TV Series'}
                        </span>
                      </div>

                      {/* Description */}
                      <p className="text-lg text-gray-300 mb-8 line-clamp-3 font-poppins max-w-2xl">
                        {item.overview}
                      </p>

                      {/* Action Buttons */}
                      <div className="flex gap-4">
                        <button className="bg-white text-black font-bold py-3 px-8 rounded flex items-center gap-2 hover:bg-gray-200 transition-colors font-sora">
                          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                          </svg>
                          Play
                        </button>
                        <button 
                          onClick={() => handleMoreInfo(item)}
                          className="bg-gray-800/80 text-white font-bold py-3 px-8 rounded flex items-center gap-2 hover:bg-gray-700/80 transition-colors backdrop-blur-sm font-sora"
                        >
                          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          More Info
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Other Trending Items - Backdrop Thumbnails */}
      <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 z-20">
        <div className="flex gap-4">
          {items.slice(0, 10).map((item, index) => (
            <button
              key={item.id}
              onClick={() => {
                if (swiperRef.current && swiperRef.current.swiper) {
                  swiperRef.current.swiper.slideTo(index);
                }
                setIsAutoPlaying(false);
                setTimeout(() => setIsAutoPlaying(true), 10000);
              }}
              onMouseEnter={() => setIsAutoPlaying(false)}
              onMouseLeave={() => setIsAutoPlaying(true)}
              className={`relative w-40 h-24 rounded overflow-hidden transition-all duration-300 ${
                index === activeIndex 
                  ? 'ring-2 ring-white scale-110' 
                  : 'ring-1 ring-gray-600 hover:ring-white hover:scale-105'
              }`}
            >
              <Image
                src={item.backdrop_path || item.poster_path || '/placeholder-movie.jpg'}
                alt={isMovie(item) ? item.title : item.name}
                fill
                className="object-cover"
                draggable={false}
              />
              <div className={`absolute inset-0 transition-colors duration-300 ${
                index === activeIndex ? 'bg-white/20' : 'bg-black/40 hover:bg-black/20'
              }`}></div>
              
              {/* Play icon overlay */}
              <div className="absolute inset-0 flex items-center justify-center">
                <svg className="w-7 h-7 text-white opacity-80" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                </svg>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Custom Navigation Arrows */}
      <button className="hero-prev absolute left-4 top-1/2 transform -translate-y-1/2 z-20 bg-black/50 text-white p-3 rounded-full hover:bg-black/70 transition-colors">
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      
      <button className="hero-next absolute right-4 top-1/2 transform -translate-y-1/2 z-20 bg-black/50 text-white p-3 rounded-full hover:bg-black/70 transition-colors">
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Custom Pagination */}
      <div className="hero-pagination absolute bottom-6 left-1/2 transform -translate-x-1/2 z-20"></div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 z-20">
        <div className="flex flex-col items-center text-white/60">
          <span className="text-xs font-poppins mb-2">Scroll for more</span>
          <div className="w-px h-8 bg-white/30"></div>
        </div>
      </div>
    </section>
  );
} 