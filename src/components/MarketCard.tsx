import React from 'react';
import { Market } from '../types/market';
import { Clock, Sunrise, Sunset } from 'lucide-react';

interface MarketCardProps {
  market: Market;
}

export function MarketCard({ market }: MarketCardProps) {
  return (
    <div className={`
      relative overflow-hidden rounded-xl p-6 
      ${market.isOpen 
        ? 'bg-gradient-to-br from-green-500 via-green-600 to-green-700' 
        : 'bg-gradient-to-br from-slate-600 via-slate-700 to-slate-800'
      }
      transform transition-all duration-300 hover:scale-105
      shadow-lg border border-white/10
    `}>
      <div className="absolute -right-4 -top-4 opacity-10">
        <Clock size={120} className="rotate-12" />
      </div>
      <div className="relative z-10">
        <h3 className="text-3xl font-bold text-white mb-2">{market.name}</h3>
        <p className="text-white/80 mb-3 text-sm">{market.timezone}</p>
        <div className="space-y-3">
          <div className="flex items-center space-x-2 text-white/90">
            <Sunrise size={18} />
            <span>Opens: {market.openTime}</span>
          </div>
          <div className="flex items-center space-x-2 text-white/90">
            <Sunset size={18} />
            <span>Closes: {market.closeTime}</span>
          </div>
        </div>
        <div className="mt-4 flex justify-between items-center">
          <span className={`
            px-4 py-1.5 rounded-full text-sm font-medium
            ${market.isOpen 
              ? 'bg-green-400/30 text-white ring-1 ring-white/20' 
              : 'bg-slate-500/30 text-white/80 ring-1 ring-white/10'
            }
            transition-all duration-300
          `}>
            {market.isOpen ? 'Open' : 'Closed'}
          </span>
        </div>
      </div>
    </div>
  );
}