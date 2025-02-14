import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, Globe } from 'lucide-react';
import { TimeZoneSelector } from './TimeZoneSelector';

interface HeaderProps {
  selectedTimeZone: string;
  onTimeZoneChange: (timezone: string) => void;
  currentTime: string;
}

export function Header({ selectedTimeZone, onTimeZoneChange, currentTime }: HeaderProps) {
  return (
    <div className="mb-12 pt-8">
      <nav className="flex items-center justify-between mb-8">
        <Link to="/" className="flex items-center space-x-2">
          <Clock className="h-6 w-6 text-blue-400" />
          <span className="text-xl font-bold text-white">FX Clock</span>
        </Link>
        <div className="flex items-center space-x-6">
          <Link to="/position-size-calculator" className="text-gray-300 hover:text-white transition-colors">Position Size Calculator</Link>
          <Link to="/guide" className="text-gray-300 hover:text-white transition-colors">Guide</Link>
          <Link to="/calendar" className="text-gray-300 hover:text-white transition-colors">Calendar</Link>
        </div>
      </nav>
      
      <div className="text-center">
        <div className="flex items-center justify-center mb-4">
          <Globe className="h-16 w-16 text-blue-400" />
        </div>
        <h1 className="text-4xl font-bold text-white mb-8">
          Real-time Forex Market Hours
        </h1>
        
        <div className="inline-flex items-center space-x-4 bg-white/5 px-6 py-4 rounded-2xl border border-white/10">
          <Clock className="h-6 w-6 text-gray-300" />
          <TimeZoneSelector
            selectedTimeZone={selectedTimeZone}
            onTimeZoneChange={onTimeZoneChange}
          />
          <div className="text-2xl font-mono text-gray-200">
            {currentTime}
          </div>
        </div>
      </div>
    </div>
  );
}