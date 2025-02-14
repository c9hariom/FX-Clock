import React from 'react';
import { Clock, Globe2, Waves, Instagram, Facebook } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Footer() {
  return (
    <footer className="relative mt-16 border-t border-white/10">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -inset-[10px] bg-gradient-to-r from-blue-500/10 to-purple-500/10 blur-3xl animate-pulse" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 py-12">
        {/* Footer Sections */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Market Hours */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Clock className="h-5 w-5 text-blue-400" />
              <h3 className="text-lg font-semibold text-white">Market Hours</h3>
            </div>
            <p className="text-gray-400">Real-time tracking of major forex trading sessions worldwide</p>
          </div>

          {/* Global Coverage */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Globe2 className="h-5 w-5 text-blue-400" />
              <h3 className="text-lg font-semibold text-white">Global Coverage</h3>
            </div>
            <p className="text-gray-400">Monitoring Sydney, Tokyo, London, and New York markets</p>
          </div>

          {/* Market Liquidity */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Waves className="h-5 w-5 text-blue-400" />
              <h3 className="text-lg font-semibold text-white">Market Liquidity</h3>
            </div>
            <p className="text-gray-400">Dynamic liquidity tracking during market overlaps</p>
          </div>
        </div>

        {/* Footer Links Section */}
        <div className="mt-12 pt-4 border-t border-white/10">
          <div className="text-center mb-4">
            <div className="flex justify-center space-x-6 mb-4">
              <Link to="/guide" className="text-gray-300 hover:text-white transition-colors">Forex Guide</Link>
              <Link to="/reviews" className="text-gray-300 hover:text-white transition-colors">Reviews</Link>
              <Link to="/about" className="text-gray-300 hover:text-white transition-colors">About</Link>
              <Link to="/contact" className="text-gray-300 hover:text-white transition-colors">Contact</Link>
              <Link to="/privacy-policy" className="text-gray-300 hover:text-white transition-colors">Privacy</Link>
              <Link to="/disclaimer" className="text-gray-300 hover:text-white transition-colors">Disclaimer</Link>
            </div>
            <hr className="border-white/20 mb-4" />
          </div>

          {/* Footer Bottom Section */}
          <div className="flex justify-between items-center">
            <div className="text-gray-400 text-sm">
              <p>© {new Date().getFullYear()} FXClock | @c9hariom</p>
            </div>
            <div className="flex space-x-6">
              <a href="https://www.instagram.com/c9hariom" target="_blank" rel="noopener noreferrer">
                <Instagram className="h-6 w-6 text-white hover:text-blue-500 transition-colors" />
              </a>
              <a href="https://www.facebook.com/c9hariom" target="_blank" rel="noopener noreferrer">
                <Facebook className="h-6 w-6 text-white hover:text-blue-500 transition-colors" />
              </a>
              <a href="https://x.com/c9hariom" target="_blank" rel="noopener noreferrer">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white hover:text-blue-500 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M23 3a10.7 10.7 0 0 1-3.13.86A4.48 4.48 0 0 0 22.46 2a9.12 9.12 0 0 1-2.89 1.1A4.48 4.48 0 0 0 16.72 1c-2.48 0-4.48 2.02-4.48 4.5 0 .35.04.7.12 1.02a12.69 12.69 0 0 1-9.2-4.7A4.48 4.48 0 0 0 3.29 7.5C3.29 8.5 3.85 9.35 4.75 9.88a4.38 4.38 0 0 1-2.02-.56v.06a4.48 4.48 0 0 0 3.6 4.42c-.57.15-1.19.22-1.81.22a3.6 3.6 0 0 1-.85-.08 4.48 4.48 0 0 0 4.2 3.13A9.09 9.09 0 0 1 1 18.92a12.61 12.61 0 0 0 6.84 2.01c8.21 0 12.71-6.73 12.71-12.54 0-.19 0-.38-.01-.57A9.05 9.05 0 0 0 23 3z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Google Analytics and Ads Script */}
      <script async src="https://www.googletagmanager.com/gtag/js?id=G-8H6306W08S"></script>
      <script>
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-8H6306W08S');
        `}
      </script>
    </footer>
  );
}
