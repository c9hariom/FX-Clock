import React, { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment-timezone';
import { Footer } from '../components/Footer';
import { Link } from 'react-router-dom';
import { BookOpen } from 'lucide-react';

const CalendarPage = () => {
  const [events, setEvents] = useState([]);
  const [selectedTimeZone, setSelectedTimeZone] = useState('UTC');
  const [showAllCurrencies, setShowAllCurrencies] = useState(false);
  const [loading, setLoading] = useState(false); // Loading state for refresh
  const [lastRefreshedAt, setLastRefreshedAt] = useState(null); // Track last refresh time
  const [countdown, setCountdown] = useState(30); // Countdown timer

  // List of major currencies with their flag emojis
  const majorCurrencies = [
    { code: 'EUR', flag: '🇪🇺' },
    { code: 'USD', flag: '🇺🇸' },
    { code: 'GBP', flag: '🇬🇧' },
    { code: 'JPY', flag: '🇯🇵' },
    { code: 'AUD', flag: '🇦🇺' },
    { code: 'CAD', flag: '🇨🇦' },
    { code: 'CHF', flag: '🇨🇭' },
    { code: 'NZD', flag: '🇳🇿' },
  ];


  const currencyFlags = [
    { code: 'EUR', flag: '🇪🇺' }, // Euro
    { code: 'USD', flag: '🇺🇸' }, // US Dollar
    { code: 'GBP', flag: '🇬🇧' }, // British Pound
    { code: 'JPY', flag: '🇯🇵' }, // Japanese Yen
    { code: 'AUD', flag: '🇦🇺' }, // Australian Dollar
    { code: 'CAD', flag: '🇨🇦' }, // Canadian Dollar
    { code: 'CHF', flag: '🇨🇭' }, // Swiss Franc
    { code: 'NZD', flag: '🇳🇿' }, // New Zealand Dollar
    { code: 'SEK', flag: '🇸🇪' }, // Swedish Krona
    { code: 'NOK', flag: '🇳🇴' }, // Norwegian Krone
    { code: 'DKK', flag: '🇩🇰' }, // Danish Krone
    { code: 'ZAR', flag: '🇿🇦' }, // South African Rand
    { code: 'HKD', flag: '🇭🇰' }, // Hong Kong Dollar
    { code: 'SGD', flag: '🇸🇬' }, // Singapore Dollar
    { code: 'MXN', flag: '🇲🇽' }, // Mexican Peso
    { code: 'TRY', flag: '🇹🇷' }, // Turkish Lira
    { code: 'RUB', flag: '🇷🇺' }, // Russian Ruble
    { code: 'INR', flag: '🇮🇳' }, // Indian Rupee
    { code: 'CNY', flag: '🇨🇳' }, // Chinese Yuan
    { code: 'BRL', flag: '🇧🇷' }, // Brazilian Real
    { code: 'THB', flag: '🇹🇭' }, // Thai Baht
    { code: 'IDR', flag: '🇮🇩' }, // Indonesian Rupiah
    { code: 'MYR', flag: '🇲🇾' }, // Malaysian Ringgit
    { code: 'PHP', flag: '🇵🇭' }, // Philippine Peso
    { code: 'PLN', flag: '🇵🇱' }, // Polish Zloty
    { code: 'HUF', flag: '🇭🇺' }, // Hungarian Forint
    { code: 'CZK', flag: '🇨🇿' }, // Czech Koruna
    { code: 'ILS', flag: '🇮🇱' }, // Israeli Shekel
    { code: 'KRW', flag: '🇰🇷' }, // South Korean Won
  ];

  // Fetch events from the API
  const fetchEvents = async () => {
    setLoading(true); // Start loading
    const credentials = 'fxclock2:fx#clock&1919';
    const auth = btoa(credentials); // Use btoa for web

    try {
      const response = await axios.get('https://fx-api.fxclock.com/events', {
        headers: {
          Authorization: `Basic ${auth}`,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        timeout: 15000, // Increased timeout to 15 seconds
      });

      if (!response.data || !Array.isArray(response.data)) {
        throw new Error('Invalid or empty data received from server');
      }

      setEvents(response.data);
      setLastRefreshedAt(moment().format()); // Store last refreshed time in UTC
    } catch (error) {
      console.error("Error fetching events:", error);
    } finally {
      setLoading(false); // Stop loading
    }
  };

// Convert event time to selected time zone (API data is in GMT-5)
const convertTime = (time) => {
  // Parse the API time as GMT-5
  const apiTimeZone = 'Etc/GMT+5'; // API provides times in GMT-5
  const gmtTime = moment.tz(time, 'HH:mm', apiTimeZone);

  // Convert the time to the selected time zone
  return gmtTime.clone().tz(selectedTimeZone).format('YYYY-MM-DD HH:mm');
};


  // Filter events based on currency visibility
  const filteredEvents = showAllCurrencies
    ? events
    : events.filter((event) =>
      majorCurrencies.some((currency) => currency.code === event.Currency)
    );

  // Highlight impact levels
  const getImpactStyle = (impact) => {
    switch (impact) {
      case 'High':
        return 'bg-red-600 text-white font-bold';
      case 'Medium':
        return 'bg-yellow-400 text-black font-semibold';
      case 'Low':
        return 'bg-green-600 text-white font-normal';
      default:
        return 'bg-gray-500 text-white font-normal';
    }
  };

  // Generate a simple trend graph
  const generateTrendGraph = (actual, forecast, previous) => {
    const actualValue = parseFloat(actual) || 0;
    const forecastValue = parseFloat(forecast) || 0;
    const previousValue = parseFloat(previous) || 0;

    const trend = actualValue - forecastValue;
    const trendClass =
      trend > 0 ? 'text-green-500' : trend < 0 ? 'text-red-500' : 'text-yellow-500';

    return (
      <div className="flex items-center space-x-1">
        <span className={`text-sm ${trendClass}`}>
          {trend > 0 ? '▲' : trend < 0 ? '▼' : '→'}
        </span>
        <span className="text-xs text-gray-400">
          ({previousValue.toFixed(2)} → {forecastValue.toFixed(2)} →{' '}
          {actualValue.toFixed(2)})
        </span>
      </div>
    );
  };

  // Fetch events on component mount and set up auto-refresh
  useEffect(() => {
    fetchEvents(); // Initial fetch

    const intervalId = setInterval(() => {
      fetchEvents();
      setCountdown(30); // Reset countdown after refresh
    }, 30000); // Refresh every 30 seconds

    const countdownTimer = setInterval(() => {
      setCountdown((prevCountdown) => prevCountdown - 1); // Decrement countdown
    }, 1000);

    return () => {
      clearInterval(intervalId); // Cleanup interval on unmount
      clearInterval(countdownTimer); // Cleanup countdown timer
    };
  }, []);

// Format last refreshed time based on selected time zone
const getLastRefreshedTime = () => {
  if (!lastRefreshedAt) return 'N/A';

  // Parse the last refreshed time as UTC and convert to the selected time zone
  return moment(lastRefreshedAt).tz(selectedTimeZone).format('YYYY-MM-DD HH:mm:ss');
};

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mb-12 pt-8">
          <nav className="flex items-center justify-between mb-8">
            <Link to="/" className="flex items-center space-x-2">
              <BookOpen className="h-6 w-6 text-blue-400" />
              <span className="text-xl font-bold text-white">Forex Event Calander</span>
            </Link>
            <div className="flex items-center space-x-6">
              <Link to="/position-size-calculator" className="text-gray-300 hover:text-white transition-colors">Position Size Calculator</Link>
            </div>
          </nav>
        </div>

        {/* Header Section */}
        

        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-6">Real-time Forex Event Calendar</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Track important forex events, market impacts, and manage your trading schedule.
          </p>
        </div>

        <div className="flex justify-between items-center mb-8 text-gray-300 text-sm">
          <div>
            Last Refreshed At: {getLastRefreshedTime()}
            <br />
            Refreshing in: {countdown} seconds
          </div>
          <div>
            <label htmlFor="timezone" className="mr-4">
              Time Zone:
            </label>
            <select
              id="timezone"
              className="bg-gray-800 text-white p-2 rounded-md"
              value={selectedTimeZone}
              onChange={(e) => setSelectedTimeZone(e.target.value)}
            >
              <option value="UTC">UTC</option>
              <option value="Asia/Kolkata">IST</option>
              <option value="Europe/London">Europe/London</option>
              <option value="Asia/Tokyo">Asia/Tokyo</option>
              <option value="America/New_York">America/New_York</option>
            </select>
          </div>
          <div className="mb-8 flex justify-between items-center">
            <button
              className={`px-4 py-2 rounded-md ${showAllCurrencies ? 'bg-blue-600' : 'bg-gray-600'
                } text-white`}
              onClick={() => setShowAllCurrencies(!showAllCurrencies)}
            >
              {showAllCurrencies ? 'Show Major Currencies Only' : 'Show All Currencies'}
            </button>
          </div>
        </div>

        <div className="bg-white/5 rounded-xl border border-white/10 p-8 mb-16">
          <h2 className="text-3xl font-bold mb-6">Upcoming Events</h2>

          {/* Loader */}
          {loading && (
            <div className="flex justify-center items-center my-8">
              <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12 animate-spin"></div>
            </div>
          )}

          {/* Events List */}
          {!loading && (
            <div className="space-y-6">
              {filteredEvents.map((event, index) => {
                const eventTime = convertTime(event.Time);
                const impactStyle = getImpactStyle(event.Impact);
                const currencyFlag = majorCurrencies.find(
                  (currency) => currency.code === event.Currency
                )?.flag;

                return (
                  <div
                    key={index}
                    className="flex flex-col md:flex-row justify-between items-start md:items-center p-4 rounded-lg bg-gray-800 border border-gray-700"
                  >
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-white flex items-center">
                        {currencyFlag ? <span className="mr-2">{currencyFlag}</span> : currencyFlags.find(
                  (currency) => currency.code === event.Currency
                )?.flag }
                        {event.Event}
                      </h3>
                      <p className="text-gray-300">{event.Currency} | {eventTime}</p>
                      <div className="mt-2 flex items-center space-x-4">
                        <p className="text-sm text-gray-400">
                          <span className="font-bold">A:</span> {event.Actual || '-'}
                        </p>
                        <p className="text-sm text-gray-400">
                          <span className="font-bold">F:</span> {event.Forecast || '-'}
                        </p>
                        <p className="text-sm text-gray-400">
                          <span className="font-bold">P:</span> {event.Previous || '-'}
                        </p>
                      </div>
                      {generateTrendGraph(event.Actual, event.Forecast, event.Previous)}
                    </div>
                    <div className={`mt-4 md:mt-0 px-4 py-2 rounded-full ${impactStyle}`}>
                      <span>{event.Impact}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default CalendarPage;