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
      {/* Test Mode Banner */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-yellow-500 to-orange-500 text-black font-bold py-2 px-4 text-center text-sm font-poppins shadow-lg">
        <div className="flex items-center justify-center gap-2">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          <span>🚧 TEST MODE - This website is still under development 🚧</span>
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
        </div>
      </div>

      {/* Main Navbar */}
      <nav className={`fixed top-10 left-0 right-0 z-40 transition-all duration-500 ${
        isScrolled 
          ? 'bg-black/95 backdrop-blur-xl shadow-2xl' 
          : 'bg-gray-900/80 backdrop-blur-md'
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

            {/* Right side icons and button */}
            <div className="flex items-center space-x-6">
              {/* Search Icon */}
              <Link href="/search" className="text-white hover:text-gray-300 transition-colors duration-300">
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </Link>

              {/* Sign In Button */}
              <button className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg text-sm font-poppins font-medium transition-all duration-300 transform hover:scale-105">
                Sign In
              </button>

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