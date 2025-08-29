'use client';

import Image from 'next/image';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ICast } from '@/interfaces/movie.interface';
import { TMDB_IMAGE_URL, TMDB_IMAGE_QUALITY } from '@/utils/urls';

interface CastCardProps {
  cast: ICast;
  showCharacter?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export default function CastCard({ cast, showCharacter = true, size = 'md' }: CastCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const router = useRouter();

  // Size configurations
  const sizeConfig = {
    sm: {
      image: 'h-32',
      text: 'text-xs',
      name: 'text-sm',
      character: 'text-xs'
    },
    md: {
      image: 'h-48',
      text: 'text-sm',
      name: 'text-sm',
      character: 'text-xs'
    },
    lg: {
      image: 'h-56',
      text: 'text-base',
      name: 'text-base',
      character: 'text-sm'
    }
  };

  const config = sizeConfig[size];

  return (
    <div 
      className="group cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => router.push(`/person/${cast.id}`)}
    >
      {/* Profile Image */}
      <div className="relative mb-3 overflow-hidden rounded-lg">
        {cast.profile_path ? (
          <Image
            src={`${TMDB_IMAGE_URL}${TMDB_IMAGE_QUALITY.PROFILE_SIZES.H_632}${cast.profile_path}`}
            alt={cast.name}
            width={200}
            height={300}
            className={`w-full ${config.image} object-cover transition-transform duration-300 group-hover:scale-110`}
          />
        ) : (
          <div className={`w-full ${config.image} bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center`}>
            <span className="text-white font-bold text-2xl">
              {cast.name.charAt(0)}
            </span>
          </div>
        )}
        
        {/* Hover overlay */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300"></div>
        
        {/* Popularity indicator (if available) */}
        {cast.popularity && cast.popularity > 10 && (
          <div className="absolute top-2 right-2 bg-yellow-500 text-black px-2 py-1 rounded-full text-xs font-bold">
            ★ {cast.popularity.toFixed(0)}
          </div>
        )}
      </div>
      
      {/* Cast Info */}
      <div className="text-center">
        <h3 className={`text-white font-semibold mb-1 truncate ${config.name} group-hover:text-blue-300 transition-colors`}>
          {cast.name}
        </h3>
        {showCharacter && cast.character && (
          <p className={`text-gray-400 truncate ${config.character}`}>
            "{cast.character}"
          </p>
        )}
        {cast.known_for_department && (
          <p className={`text-gray-500 truncate ${config.text}`}>
            {cast.known_for_department}
          </p>
        )}
      </div>
    </div>
  );
} 