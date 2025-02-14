import React from 'react';
import { timeZones } from '../utils/marketUtils';

interface TimeZoneSelectorProps {
  selectedTimeZone: string;
  onTimeZoneChange: (timeZone: string) => void;
}

export function TimeZoneSelector({ selectedTimeZone, onTimeZoneChange }: TimeZoneSelectorProps) {
  return (
    <div className="relative">
      <select
        value={selectedTimeZone}
        onChange={(e) => onTimeZoneChange(e.target.value)}
        className="
          appearance-none
          bg-white/5
          border border-white/10
          rounded-xl
          py-2 px-4
          pr-8
          text-gray-200
          focus:outline-none focus:ring-2 focus:ring-blue-500/50
          transition-all
          duration-200
          cursor-pointer
          backdrop-blur-sm
        "
      >
        {timeZones.map((tz) => (
          <option key={tz.value} value={tz.value} className="bg-gray-800 text-white">
            {tz.label}
          </option>
        ))}
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400">
        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
          <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
        </svg>
      </div>
    </div>
  );
}