'use client';

import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 border-t border-gray-700/50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Logo and Description */}
          <div className="md:col-span-2">
            <Link href="/" className="flex flex-col group mb-4">
              <span className="text-2xl font-bebas text-white font-bold tracking-wider group-hover:scale-105 transition-transform duration-300">
                MOOVI
              </span>
              <span className="text-xs font-poppins text-gray-300 tracking-wide">DATABASE</span>
            </Link>
            <p className="text-gray-400 font-poppins text-sm leading-relaxed max-w-md">
              Your ultimate destination for discovering movies and TV series. Browse through thousands of titles with ratings, reviews, and detailed information.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4 font-poppins">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-400 hover:text-white transition-colors font-poppins text-sm">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/movies" className="text-gray-400 hover:text-white transition-colors font-poppins text-sm">
                  Movies
                </Link>
              </li>
              <li>
                <Link href="/series" className="text-gray-400 hover:text-white transition-colors font-poppins text-sm">
                  TV Series
                </Link>
              </li>
              <li>
                <Link href="/search" className="text-gray-400 hover:text-white transition-colors font-poppins text-sm">
                  Search
                </Link>
              </li>
            </ul>
          </div>

          {/* Information */}
          <div>
            <h3 className="text-white font-semibold mb-4 font-poppins">Information</h3>
            <ul className="space-y-2">
              <li>
                <span className="text-gray-400 font-poppins text-sm">
                  Powered by TMDB
                </span>
              </li>
              <li>
                <a 
                  href="https://www.themoviedb.org/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors font-poppins text-sm"
                >
                  TMDB Website
                </a>
              </li>
              <li>
                <a 
                  href="https://www.themoviedb.org/documentation/api" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors font-poppins text-sm"
                >
                  API Documentation
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-700/50 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 font-poppins text-sm">
            © {currentYear} Moovi Database. All rights reserved.
          </p>
          <div className="flex items-center gap-4 mt-4 md:mt-0">
            <span className="text-gray-500 font-poppins text-xs">
              Made by{' '}
              <a 
                href="https://mugabo-demo.vercel.app/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300 transition-colors font-semibold"
              >
                Mugabo
              </a>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
} 