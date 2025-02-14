import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Activity } from 'lucide-react';
import { MarketCard } from './components/MarketCard';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { About } from './pages/About';
import { PositionCalculator } from './pages/PositionCalculator';
import { marketData, isMarketOpen, timeZones, getMarketHoursInTimezone, calculateLiquidity } from './utils/marketUtils';
import type { Market } from './types/market';
import { Contact } from './pages/Contact';
import { PrivacyPolicy } from './pages/PrivacyPolicy';
import { Disclaimer } from './pages/Disclaimer';
import { Reviews } from './pages/Reviews';
import { BeginnersGuide } from './pages/BeginnersGuide';
import CalendarPage from './pages/CalendarPage';

function Home() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [selectedTimeZone, setSelectedTimeZone] = useState('UTC');
  const [markets, setMarkets] = useState<Market[]>([]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const selectedTz = timeZones.find(tz => tz.value === selectedTimeZone);
    const offset = selectedTz?.offset || 0;

    const updatedMarkets = marketData.map(market => {
      const { openTime, closeTime } = getMarketHoursInTimezone(market.name, offset);
      return {
        ...market,
        openTime,
        closeTime,
        isOpen: isMarketOpen(market, currentTime)
      };
    });
    setMarkets(updatedMarkets);
  }, [currentTime, selectedTimeZone]);

  const selectedTz = timeZones.find(tz => tz.value === selectedTimeZone);
  const offset = selectedTz?.offset || 0;

  const displayTime = new Date();
  const utcTime = displayTime.getTime() + displayTime.getTimezoneOffset() * 60000;
  const targetTime = new Date(utcTime + (offset * 3600000));

  const formattedTime = targetTime.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false
  });

  const liquidity = calculateLiquidity(markets);

  const getLiquidityColor = (level: string) => {
    switch (level) {
      case 'Very High': return 'bg-green-500';
      case 'High': return 'bg-blue-500';
      case 'Medium': return 'bg-yellow-500';
      default: return 'bg-red-500';
    }
  };

  const getLiquidityWidth = (level: string) => {
    switch (level) {
      case 'Very High': return 'w-full';
      case 'High': return 'w-3/4';
      case 'Medium': return 'w-1/2';
      default: return 'w-1/4';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Header
          selectedTimeZone={selectedTimeZone}
          onTimeZoneChange={setSelectedTimeZone}
          currentTime={formattedTime}
        />

        <div className="mb-8">
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <Activity className="h-6 w-6 text-blue-400" />
                <h2 className="text-xl font-semibold text-white">Market Liquidity</h2>
              </div>
              <div className={`px-4 py-2 rounded-full ${getLiquidityColor(liquidity.level)} text-white font-medium`}>
                {liquidity.level}
              </div>
            </div>

            <div className="mt-4">
              <div className="w-full bg-gray-700 rounded-full h-4 overflow-hidden">
                <div
                  className={`h-full ${getLiquidityColor(liquidity.level)} ${getLiquidityWidth(liquidity.level)} transition-all duration-500 ease-in-out`}
                />
              </div>
              <div className="flex justify-between mt-2 text-sm text-gray-400">
                <span>Low</span>
                <span>Medium</span>
                <span>High</span>
                <span>Very High</span>
              </div>
            </div>

            <div className="mt-4 text-gray-300">
              <div className="flex flex-col space-y-2">
                <p className="font-medium">Active Markets:</p>
                {liquidity.openMarkets.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {liquidity.openMarkets.map(market => (
                      <span
                        key={market}
                        className="px-3 py-1 bg-white/10 rounded-full text-sm"
                      >
                        {market}
                      </span>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-400 italic">No markets currently open</p>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {markets.map((market) => (
            <MarketCard key={market.name} market={market} />
          ))}
        </div>

        <Footer />
      </div>
    </div>
  );
}


export default function App() {
  const [isPlaying, setIsPlaying] = useState(false); // Set to false initially
  const [currentIndex, setCurrentIndex] = useState(0);
  const [audio] = useState(() => {
    const bgAudio = new Audio();
    bgAudio.loop = false; // Disable looping to allow for random selection
    return bgAudio;
  });
  const [hasInteracted, setHasInteracted] = useState(false); // Track if the user interacted

  const audioFiles = [
    '/music/02.mp3',
    '/music/show.mp3',
    '/music/1.mp3',
    '/music/0.mp3',
    '/music/3.mp3',
    '/music/4.mp3',
    '/music/5.mp3',
    '/music/6.mp3',
    '/music/7.mp3',
  ];

  const playAudio = (index: number) => {
    const selectedFile = audioFiles[index];
    audio.src = selectedFile;
    audio.play().catch((error) => console.error('Audio playback error:', error));
    setIsPlaying(true);
  };

  const playNextTrack = () => {
    const nextIndex = (currentIndex + 1) % audioFiles.length;
    setCurrentIndex(nextIndex);
    playAudio(nextIndex);
  };

  const playPreviousTrack = () => {
    const prevIndex = (currentIndex - 1 + audioFiles.length) % audioFiles.length;
    setCurrentIndex(prevIndex);
    playAudio(prevIndex);
  };

  const togglePlayPause = () => {
    if (isPlaying) {
      audio.pause();
    } else {
      playAudio(currentIndex); // Start playing current track
    }
    setIsPlaying(!isPlaying); // Toggle play/pause state
  };

  useEffect(() => {
    const handleUserInteraction = () => {
      if (!hasInteracted) {
        console.log("User interaction detected");
        setHasInteracted(true); // Set flag to indicate user has interacted
        playAudio(currentIndex); // Play audio after interaction
      }
    };

    // Listen for user interaction events to trigger the first audio play
    window.addEventListener('click', handleUserInteraction);

    // Cleanup event listeners when component unmounts or dependencies change
    return () => {
      window.removeEventListener('click', handleUserInteraction);
    };
  }, [currentIndex, hasInteracted]); // Dependency on currentIndex and hasInteracted

  // Automatically play next track when current one ends
  useEffect(() => {
    const handleAudioEnd = () => {
      playNextTrack(); // Play next track when the current one finishes
    };

    audio.addEventListener('ended', handleAudioEnd);

    // Cleanup when component unmounts
    return () => {
      audio.removeEventListener('ended', handleAudioEnd);
    };
  }, [audio, currentIndex]); // Re-run the effect when the audio or currentIndex changes



  // const togglePlayPause = () => {
  //   setIsPlaying((prev) => !prev);
  // };

  return (
    <>
      <div
        className="fixed bottom-4 right-4 z-50 bg-brown-900 text-white p-3 rounded-full shadow-md flex items-center justify-center space-x-2 overflow-hidden"
      >
        {/* Equalizer Background Animation */}
        <div
          className={`absolute inset-0 bg-black bg-opacity-30 rounded-full ${isPlaying ? 'animate-pulse' : ''}`}
          style={{ zIndex: -1 }}
        ></div>

        {/* Previous Track Button */}
        <button
          onClick={playPreviousTrack}
          className="text-white hover:text-gray-300 relative z-10"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M14 6l-6 6 6 6"
            />
          </svg>
        </button>

        {/* Play/Pause Button */}
        <button
          onClick={togglePlayPause}
          className="text-white hover:text-gray-300 relative z-10"
        >
          {isPlaying ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              {/* Play Icon */}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 4h4v16H6zM14 4h4v16h-4z"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              {/* Pause Icon (two vertical lines) */}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 3v18l15-9-15-9z"
              />
            </svg>
          )}
        </button>

        {/* Next Track Button */}
        <button
          onClick={playNextTrack}
          className="text-white hover:text-gray-300 relative z-10"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10 6l6 6-6 6"
            />
          </svg>
        </button>
      </div>





      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/position-size-calculator" element={<PositionCalculator />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/disclaimer" element={<Disclaimer />} />
        <Route path="/reviews" element={<Reviews />} />
        <Route path="/guide" element={<BeginnersGuide />} />
        <Route path="/calendar" element={<CalendarPage />} />
      </Routes>
    </>
  );
}
