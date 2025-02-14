import { Market } from '../types/market';

export const timeZones = [
  { label: 'UTC', value: 'UTC', offset: 0 },
  { label: 'India (IST)', value: 'IST', offset: 5.5 },
  { label: 'New York (EDT)', value: 'America/New_York', offset: -4 },
  { label: 'London (BST)', value: 'Europe/London', offset: 1 },
  { label: 'Tokyo (JST)', value: 'Asia/Tokyo', offset: 9 },
  { label: 'Sydney (AEST)', value: 'Australia/Sydney', offset: 10 },
];

export const marketData: Omit<Market, 'isOpen'>[] = [
  {
    name: 'Sydney',
    timezone: 'AEST (UTC+10)',
    openTime: '09:30',
    closeTime: '18:30',
  },
  {
    name: 'Tokyo',
    timezone: 'JST (UTC+9)',
    openTime: '11:30',
    closeTime: '20:30',
  },
  {
    name: 'London',
    timezone: 'BST (UTC+1)',
    openTime: '14:30',
    closeTime: '23:30',
  },
  {
    name: 'New York',
    timezone: 'EDT (UTC-4)',
    openTime: '03:30',
    closeTime: '12:30',
  },
];


export function isMarketOpen(market: Omit<Market, 'isOpen'>, currentTime: Date): boolean {
  const day = currentTime.getUTCDay();
  
  // Markets are closed on Saturday (6) and Sunday (0)
  if (day === 6 || day === 0) return false;
  
  // Get current time in UTC
  const currentHour = currentTime.getUTCHours();
  const currentMinute = currentTime.getUTCMinutes();
  
  // Get market hours in UTC
  const marketHours = getMarketHoursUTC(market.name);
  const { openHour, openMinute, closeHour, closeMinute } = marketHours;
  
  const currentTotalMinutes = currentHour * 60 + currentMinute;
  const openTotalMinutes = openHour * 60 + openMinute;
  const closeTotalMinutes = closeHour * 60 + closeMinute;
  
  if (openTotalMinutes < closeTotalMinutes) {
    return currentTotalMinutes >= openTotalMinutes && currentTotalMinutes < closeTotalMinutes;
  } else {
    // Handle cases where market crosses midnight UTC
    return currentTotalMinutes >= openTotalMinutes || currentTotalMinutes < closeTotalMinutes;
  }
}

export function getMarketHoursUTC(marketName: string) {
  switch (marketName) {
    case 'Sydney':
      return { openHour: 21, openMinute: 0, closeHour: 6, closeMinute: 0 }; // Standard time
    case 'Tokyo':
      return { openHour: 23, openMinute: 0, closeHour: 8, closeMinute: 0 }; // Standard time, no DST
    case 'London':
      return { openHour: 8, openMinute: 0, closeHour: 17, closeMinute: 0 }; // Standard time
    case 'New York':
      return { openHour: 13, openMinute: 0, closeHour: 22, closeMinute: 0 }; // Standard time
    default:
      return { openHour: 0, openMinute: 0, closeHour: 0, closeMinute: 0 }; // Default fallback
  }
}


export function convertUTCToTimezone(hour: number, minute: number, timezoneOffset: number): string {
  // Calculate total minutes in UTC
  let totalMinutes = hour * 60 + minute;

  // Add timezone offset (in minutes, including fractional offsets)
  const offsetMinutes = Math.round(timezoneOffset * 60); // Convert hours to minutes and handle fractional offsets
  totalMinutes += offsetMinutes;

  // Handle day wrap-around
  while (totalMinutes < 0) totalMinutes += 24 * 60; // Ensure positive minutes
  totalMinutes %= 24 * 60; // Keep within 24-hour range

  // Calculate the adjusted hour and minute
  const adjustedHour = Math.floor(totalMinutes / 60);
  const adjustedMinute = totalMinutes % 60;

  // Format the time in HH:mm
  return `${adjustedHour.toString().padStart(2, '0')}:${adjustedMinute.toString().padStart(2, '0')}`;
}


export function getMarketHoursInTimezone(marketName: string, timezoneOffset: number): { openTime: string; closeTime: string } {
  const utcHours = getMarketHoursUTC(marketName);
  return {
    openTime: convertUTCToTimezone(utcHours.openHour, utcHours.openMinute, timezoneOffset),
    closeTime: convertUTCToTimezone(utcHours.closeHour, utcHours.closeMinute, timezoneOffset)
  };
}

export function calculateLiquidity(markets: Market[]) {
  const openMarkets = markets.filter(market => market.isOpen).map(market => market.name);
  
  // Calculate liquidity level based on number of open markets and specific overlaps
  let level = 'Low';
  
  if (openMarkets.length === 0) {
    level = 'Low';
  } else if (openMarkets.length === 1) {
    level = 'Medium';
  } else if (openMarkets.length === 2) {
    // Check for high-liquidity overlaps
    if (
      (openMarkets.includes('London') && openMarkets.includes('New York')) ||
      (openMarkets.includes('Tokyo') && openMarkets.includes('London')) ||
      (openMarkets.includes('Tokyo') && openMarkets.includes('Sydney'))
    ) {
      level = 'Very High';
    } else {
      level = 'High';
    }
  } else {
    level = 'Very High';
  }

  return {
    level,
    openMarkets
  };
}