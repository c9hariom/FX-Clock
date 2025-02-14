import React, { useState } from 'react';
import { Clock, Globe, LineChart, Users, ChevronDown, ChevronUp } from 'lucide-react';
import { Link } from 'react-router-dom';

import { Footer } from '../components/Footer';

interface FAQItemProps {
  question: string;
  answer: string;
}

function FAQItem({ question, answer }: FAQItemProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-white/10 last:border-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-4 flex items-center justify-between text-left"
      >
        <span className="text-lg font-medium text-white">{question}</span>
        {isOpen ? (
          <ChevronUp className="h-5 w-5 text-blue-400" />
        ) : (
          <ChevronDown className="h-5 w-5 text-blue-400" />
        )}
      </button>
      {isOpen && (
        <div className="pb-4">
          <p className="text-gray-300">{answer}</p>
        </div>
      )}
    </div>
  );
}

export function About() {
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
              {/* <Link to="/about" className="text-gray-300 hover:text-white transition-colors">About</Link>
              <Link to="/contact" className="text-gray-300 hover:text-white transition-colors">Contact</Link> */}
            </div>
          </nav>

        </div>


        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-0">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center mb-4">
              <Globe className="h-16 w-16 text-blue-400" />
            </div>
            <h1 className="text-5xl font-bold mb-6">About FX Clock</h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Your essential companion for tracking global forex market hours and optimizing your trading schedule.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            <div className="bg-white/5 p-6 rounded-xl border border-white/10">
              <Clock className="h-12 w-12 text-blue-400 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Real-Time Updates</h3>
              <p className="text-gray-300">
                Stay synchronized with market hours across all major trading sessions.
              </p>
            </div>

            <div className="bg-white/5 p-6 rounded-xl border border-white/10">
              <Globe className="h-12 w-12 text-blue-400 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Global Coverage</h3>
              <p className="text-gray-300">
                Track Sydney, Tokyo, London, and New York trading sessions.
              </p>
            </div>

            <div className="bg-white/5 p-6 rounded-xl border border-white/10">
              <LineChart className="h-12 w-12 text-blue-400 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Market Liquidity</h3>
              <p className="text-gray-300">
                Monitor market liquidity levels during session overlaps.
              </p>
            </div>

            <div className="bg-white/5 p-6 rounded-xl border border-white/10">
              <Users className="h-12 w-12 text-blue-400 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Trading Tools</h3>
              <p className="text-gray-300">
                Access position calculators and other essential trading tools.
              </p>
            </div>
          </div>

          <div className="bg-white/5 rounded-xl border border-white/10 p-8 mb-16">
            <h2 className="text-3xl font-bold mb-6">Frequently Asked Questions</h2>
            <div className="space-y-2">
              <FAQItem
                question="What are forex market hours?"
                answer="Forex market hours are the time periods when different major financial centers around the world are open for trading. The main sessions are Sydney, Tokyo, London, and New York, with various overlaps creating periods of high liquidity."
              />
              <FAQItem
                question="Why is market liquidity important?"
                answer="Market liquidity affects the ease of entering and exiting trades, spread costs, and price volatility. Higher liquidity typically means better trading conditions with tighter spreads and more stable prices."
              />
              <FAQItem
                question="How does the position calculator work?"
                answer="Our position calculator helps determine the optimal trade size based on your account balance, risk tolerance, and stop loss level. It ensures you maintain consistent risk management across all your trades."
              />
              <FAQItem
                question="What are session overlaps?"
                answer="Session overlaps occur when two or more major forex markets are open simultaneously. These periods often see increased trading activity and can provide better trading opportunities due to higher liquidity."
              />
              <FAQItem
                question="How accurate is the market clock?"
                answer="Our market clock is synchronized with global time servers and automatically adjusts for daylight saving time changes. It provides real-time updates to ensure you always have accurate market session information."
              />
            </div>
          </div>

          <div className="bg-white/5 rounded-xl border border-white/10 p-8 mb-16">
            <h2 className="text-3xl font-bold mb-6">Why Choose FX Clock?</h2>
            <div className="space-y-4">
              <p className="text-gray-300">
                FX Clock is designed by traders, for traders. We understand the importance of timing in forex trading, which is why we've created a comprehensive tool that helps you stay on top of market hours and make informed trading decisions.
              </p>
              <p className="text-gray-300">
                Our platform provides accurate, real-time information about market sessions, helping you identify the most liquid trading hours and optimal times for executing your trades.
              </p>
            </div>
          </div>

          <div className="text-center">
            <h2 className="text-3xl font-bold mb-6">Contact Us</h2>
            <p className="text-gray-300 mb-4">
              Have questions or suggestions? We'd love to hear from you.
            </p>
            <a
              href="mailto:support@fxclock.com"
              className="inline-flex items-center px-6 py-3 bg-blue-500 hover:bg-blue-600 rounded-full text-white font-medium transition-colors"
            >
              Get in Touch
            </a>
          </div>
        </div>

        <Footer />
      </div>
    </div>
  );
}