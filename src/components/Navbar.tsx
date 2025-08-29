'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (path: string) => {
    return pathname === path;
  };

  return (
    <>
      {/* Main Navbar */}
      <nav className={`transition-all duration-500 ${
        isScrolled 
          ? 'bg-gradient-to-r from-gray-900/95 via-gray-800/90 to-gray-900/95 backdrop-blur-xl shadow-2xl border-b border-gray-700/50' 
          : 'bg-gradient-to-r from-gray-900/80 via-gray-800/70 to-gray-900/80 backdrop-blur-md border-b border-gray-700/30'
      }`}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <Link href="/" className="flex flex-col group">
              <span className="text-2xl font-bebas text-white font-bold tracking-wider group-hover:scale-105 transition-transform duration-300">
                MOOVI
              </span>
              <span className="text-xs font-poppins text-gray-300 tracking-wide">DATABASE</span>
            </Link>

            {/* Desktop Navigation Links */}
            <div className="hidden md:flex space-x-8">
              <Link
                href="/"
                className={`px-4 py-2 text-sm font-poppins font-medium transition-all duration-300 relative ${
                  isActive('/')
                    ? 'text-white'
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                Home
                {isActive('/') && (
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-red-500 rounded-full"></div>
                )}
              </Link>
              
              <Link
                href="/movies"
                className={`px-4 py-2 text-sm font-poppins font-medium transition-all duration-300 relative ${
                  isActive('/movies')
                    ? 'text-white'
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                Movies
                {isActive('/movies') && (
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-red-500 rounded-full"></div>
                )}
              </Link>
              
              <Link
                href="/series"
                className={`px-4 py-2 text-sm font-poppins font-medium transition-all duration-300 relative ${
                  isActive('/series')
                    ? 'text-white'
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                Series
                {isActive('/series') && (
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-red-500 rounded-full"></div>
                )}
              </Link>
            </div>

            {/* Right side icons */}
            <div className="flex items-center space-x-6">
              {/* Search Icon */}
              <Link href="/search" className="text-white hover:text-gray-300 transition-colors duration-300">
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </Link>

              {/* Mobile menu button */}
              <button 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden text-white hover:text-gray-300 transition-colors duration-300"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="md:hidden bg-gray-800/95 backdrop-blur-xl border-t border-gray-700/50 mt-2 rounded-lg overflow-hidden">
              <div className="px-4 py-4 space-y-2">
                <Link
                  href="/"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-poppins font-medium transition-all duration-300 ${
                    isActive('/')
                      ? 'text-white bg-red-600/20'
                      : 'text-gray-300 hover:text-white hover:bg-gray-700/50'
                  }`}
                >
                  Home
                  {isActive('/') && (
                    <div className="w-2 h-2 bg-red-500 rounded-full ml-auto"></div>
                  )}
                </Link>
                
                <Link
                  href="/movies"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-poppins font-medium transition-all duration-300 ${
                    isActive('/movies')
                      ? 'text-white bg-red-600/20'
                      : 'text-gray-300 hover:text-white hover:bg-gray-700/50'
                  }`}
                >
                  Movies
                  {isActive('/movies') && (
                    <div className="w-2 h-2 bg-red-500 rounded-full ml-auto"></div>
                  )}
                </Link>
                
                <Link
                  href="/series"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-poppins font-medium transition-all duration-300 ${
                    isActive('/series')
                      ? 'text-white bg-red-600/20'
                      : 'text-gray-300 hover:text-white hover:bg-gray-700/50'
                  }`}
                >
                  Series
                  {isActive('/series') && (
                    <div className="w-2 h-2 bg-red-500 rounded-full ml-auto"></div>
                  )}
                </Link>
              </div>
            </div>
          )}
        </div>
      </nav>
      

    </>
  );
} 