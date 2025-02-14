import React from 'react';
import { Clock, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';

import { Footer } from '../components/Footer';

export function PrivacyPolicy() {
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
            <Globe className="h-16 w-16 text-blue-400" />
          </div>
          <h1 className="text-5xl font-bold mb-6">Privacy Policy</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Your privacy is important to us. Below is our policy regarding the collection, use, and protection of your information.
          </p>
        </div>

        <div className="bg-white/5 rounded-xl border border-white/10 p-8 mb-16">
          <h2 className="text-3xl font-bold mb-6">Information We Collect</h2>
          <div className="space-y-4">
            <p className="text-gray-300">
              We collect minimal personal information such as email addresses for communication purposes. This information is only used for internal purposes and is never shared with third parties.
            </p>
            <p className="text-gray-300">
              We also use analytics to track usage patterns and improve the experience of our website.
            </p>
          </div>
        </div>

        <div className="bg-white/5 rounded-xl border border-white/10 p-8 mb-16">
          <h2 className="text-3xl font-bold mb-6">How We Protect Your Data</h2>
          <div className="space-y-4">
            <p className="text-gray-300">
              We use industry-standard security measures to protect your data and ensure it is not accessed or shared without your consent.
            </p>
          </div>
        </div>

        <Footer />
      </div>
    </div>
  );
}
