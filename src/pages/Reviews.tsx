import React from 'react';
import { Star, Clock, BarChart3, Activity } from 'lucide-react';
import { Link } from 'react-router-dom';

import { Footer } from '../components/Footer';

export function Reviews() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12 pt-8">
          <nav className="flex items-center justify-between mb-8">
            <Link to="/" className="flex items-center space-x-2">
              <Clock className="h-6 w-6 text-blue-400" />
              <span className="text-xl font-bold text-white">FX Clock</span>
            </Link>
            <div className="flex items-center space-x-6">
              <Link to="/position-size-calculator" className="text-gray-300 hover:text-white transition-colors">Position Size Calculator</Link>
            </div>
          </nav>
        </div>

        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-4">
            <Star className="h-16 w-16 text-yellow-400" />
          </div>
          <h1 className="text-5xl font-bold mb-6">User Reviews</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            See what our users have to say about FX Clock.
          </p>
        </div>

        <div className="bg-white/5 rounded-xl border border-white/10 p-8 mb-16">
          <h2 className="text-3xl font-bold mb-6">What Our Users Say</h2>
          <div className="space-y-6">
            <div className="p-4 bg-white/10 rounded-lg">
              <p className="text-gray-300 italic">“FX Clock has been a game-changer for my trading schedule. Highly recommended!”</p>
              <span className="block mt-2 text-yellow-400 font-bold">- Alex T.</span>
            </div>
            <div className="p-4 bg-white/10 rounded-lg">
              <p className="text-gray-300 italic">“I love the simplicity and accuracy of FX Clock. Makes trading across time zones so much easier.”</p>
              <span className="block mt-2 text-yellow-400 font-bold">- Sarah L.</span>
            </div>
            <div className="p-4 bg-white/10 rounded-lg">
              <p className="text-gray-300 italic">“A must-have tool for forex traders. The real-time updates are incredibly useful.”</p>
              <span className="block mt-2 text-yellow-400 font-bold">- James R.</span>
            </div>
          </div>
        </div>

        <div className="bg-white/5 rounded-xl border border-white/10 p-8 mb-16">
          <h2 className="text-3xl font-bold mb-6">Our Services</h2>
          <div className="space-y-4">
            <p className="text-gray-300 flex items-center">
              <Clock className="h-6 w-6 text-blue-400 mr-2" /> Market Hours: Track live forex market hours across different time zones.
            </p>
            <p className="text-gray-300 flex items-center">
              <Activity className="h-6 w-6 text-green-400 mr-2" /> Liquidity Meter: Monitor real-time liquidity conditions in the forex market.
            </p>
            <p className="text-gray-300 flex items-center">
              <BarChart3 className="h-6 w-6 text-yellow-400 mr-2" /> <Link to="/position-size-calculator" className="text-gray-300 hover:text-white transition-colors">Position Size Calculator</Link>: Calculate the ideal trade size based on risk management.
            </p>
          </div>
        </div>

        <div className="text-center text-gray-400 mb-8">
          <p>Developed by Hariom (@c9hariom on Instagram)</p>
        </div>

        <Footer />
      </div>
    </div>
  );
}