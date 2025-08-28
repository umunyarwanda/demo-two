'use client';

import Image from 'next/image';
import { useState } from 'react';
import { ITvSummaryDto } from '@/interfaces/movie.interface';
import { StarIcon } from '@heroicons/react/16/solid';

interface SeriesCardProps {
  series: ITvSummaryDto;
}

export default function SeriesCard({ series }: SeriesCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="relative group cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Poster */}
      <div className="relative overflow-hidden rounded-lg">
        <Image
          src={series.poster_path || '/placeholder-series.jpg'}
          alt={series.name}
          width={300}
          height={450}
          className={`w-full h-64 object-cover transition-transform duration-300 ${
            isHovered ? 'scale-110' : 'scale-100'
          }`}
        />
        
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/70 to-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        
        {/* Rating badge */}
        <div className="absolute top-2 right-2 bg-yellow-500 text-black px-2 py-1 rounded-full text-sm font-bold flex items-center gap-1">
          <StarIcon className="w-4 h-4" />
          <span>{series.vote_average.toFixed(1)}</span>
        </div>

        {/* Hover overlay with content */}
        <div className={`absolute inset-0 flex flex-col justify-end p-1.5 transition-all duration-300 ${
          isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}>
          <h3 className="text-lg font-semibold text-white mb-2 line-clamp-1">
            {series.name}
          </h3>
          <p className="text-sm text-gray-300 mb-3 line-clamp-2">
            {series.overview}
          </p>
          <div className="flex gap-2">
            <button className="flex-1 bg-white text-black font-semibold py-2 px-4 rounded flex items-center justify-center gap-2 hover:bg-gray-200 transition-colors">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
              </svg>
              Play
            </button>
            <button className="bg-gray-800 text-white p-2 rounded hover:bg-gray-700 transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </button>
          </div>
        </div>
      </div>
      
      {/* Title below poster (visible when not hovered) */}
      <div className={`mt-2 transition-opacity duration-300 ${isHovered ? 'opacity-0' : 'opacity-100'}`}>
        <h3 className="text-md font-medium text-white line-clamp-1">
          {series.name}
        </h3>
        <p className="text-sm text-gray-400">
          {new Date(series.first_air_date).getFullYear()}
        </p>
      </div>
    </div>
  );
} 