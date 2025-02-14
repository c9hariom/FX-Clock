import React from 'react';
import { BookOpen, ShieldAlert, Compass, Users, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

import { Footer } from '../components/Footer';

export function BeginnersGuide() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12 pt-8">
          <nav className="flex items-center justify-between mb-8">
            <Link to="/" className="flex items-center space-x-2">
              <BookOpen className="h-6 w-6 text-blue-400" />
              <span className="text-xl font-bold text-white">FX Clock</span>
            </Link>
            <div className="flex items-center space-x-6">
              <Link to="/position-size-calculator" className="text-gray-300 hover:text-white transition-colors">Position Size Calculator</Link>
            </div>
          </nav>
        </div>

        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-4">
            <Compass className="h-16 w-16 text-yellow-400" />
          </div>
          <h1 className="text-5xl font-bold mb-6">Forex Trading for Beginners</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            A journey into forex trading, learning the essentials, avoiding scams, and developing your own strategy.
          </p>
        </div>

        <div className="bg-white/5 rounded-xl border border-white/10 p-8 mb-16">
          <h2 className="text-3xl font-bold mb-6">Table of Contents</h2>
          <ul className="list-disc list-inside text-gray-300 space-y-2">
            <li>Introduction to Forex Trading</li>
            <li>Why Trading is a Journey, Not a Shortcut</li>
            <li>Common Scams & How to Avoid Them</li>
            <li>Building Your Own Trading Strategy</li>
            <li>Psychological Aspects of Trading</li>
            <li>Risk Management & Capital Preservation</li>
            <li>Resources & Communities</li>
          </ul>
        </div>

        <div className="space-y-12">
          <section>
            <h2 className="text-3xl font-bold mb-4">Introduction to Forex Trading</h2>
            <p className="text-gray-300">
              Forex trading, also known as foreign exchange or FX trading, is the process of buying and selling currency pairs. It is the largest financial market in the world, operating 24 hours a day, five days a week. Unlike the stock market, forex does not have a centralized exchange and instead operates through a global network of banks, brokers, and financial institutions. 
            </p>
            <p className="text-gray-300">
              Traders participate in the forex market for various reasons, including speculation, hedging against currency risks, and international business transactions. Success in forex trading requires a solid understanding of market dynamics, risk management, and trading psychology.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold mb-4">Why Trading is a Journey, Not a Shortcut</h2>
            <p className="text-gray-300">
              Many beginners enter forex trading with the misconception that it is an easy way to get rich quickly. However, successful trading is a skill that takes time, dedication, and continuous learning. The journey of a trader involves developing strategies, understanding market patterns, and learning from both wins and losses.
            </p>
            <p className="text-gray-300">
              A trader should focus on long-term consistency rather than short-term gains. Keeping a trading journal, backtesting strategies, and refining trading techniques are crucial steps in becoming a proficient trader.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold mb-4">Common Scams & How to Avoid Them</h2>
            <p className="text-gray-300">
              The forex market is filled with scams that prey on inexperienced traders. Common scams include fake investment schemes, signal sellers promising unrealistic profits, and unregulated brokers that manipulate trades.
            </p>
            <p className="text-gray-300 flex items-center">
              <ShieldAlert className="h-6 w-6 text-red-400 mr-2" /> Avoid any trading program or educator that guarantees high returns with little or no risk.
            </p>
            <p className="text-gray-300 flex items-center">
              <ShieldAlert className="h-6 w-6 text-red-400 mr-2" /> Always verify broker regulations and reviews before depositing money.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold mb-4">Building Your Own Trading Strategy</h2>
            <p className="text-gray-300">
              There is no universal trading strategy that works for everyone. Each trader has different risk tolerance, trading goals, and market perspectives. The key is to develop a strategy based on thorough market research, historical price action, and personal trading style.
            </p>
            <p className="text-gray-300">
              Strategies can be fundamental-based (economic reports, interest rates, news events) or technical-based (chart patterns, indicators, price action). Combining both approaches can enhance decision-making.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold mb-4">Psychological Aspects of Trading</h2>
            <p className="text-gray-300">
              Trading psychology plays a crucial role in a trader’s success. Fear, greed, and overconfidence can lead to impulsive decisions and unnecessary risks. Developing emotional discipline and sticking to a trading plan can prevent costly mistakes.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold mb-4">Risk Management & Capital Preservation</h2>
            <p className="text-gray-300">
              Risk management is the foundation of successful trading. It involves setting stop-loss levels, using appropriate position sizing, and ensuring trades do not exceed acceptable risk levels. Managing risk effectively ensures long-term sustainability in forex trading.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold mb-4">Resources & Communities</h2>
            <p className="text-gray-300 flex items-center">
              <Users className="h-6 w-6 text-green-400 mr-2" /> Join reputable trading forums like Forex Factory or Babypips.
            </p>
          </section>
        </div>

        <div className="text-center text-gray-400 mt-16 mb-8">
          <p>Developed by Hariom (@c9hariom on Instagram)</p>
        </div>

        <Footer />
      </div>
    </div>
  );
}
