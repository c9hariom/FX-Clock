import React, { useState } from 'react';
import { Calculator, DollarSign, Percent, HelpCircle, Globe, Clock } from 'lucide-react';
import { Footer } from '../components/Footer';
import { Link } from 'react-router-dom';

// Updated and reordered currency pairs with XAU/USD included
const CURRENCY_PAIRS = [
  'EUR/USD', 'XAU/USD', 'USD/JPY', 'GBP/USD', 'USD/CAD', 'AUD/USD', 'NZD/USD',
  'USD/CHF', 'EUR/GBP', 'EUR/JPY', 'GBP/JPY', 'EUR/CHF', 'GBP/CHF', 'EUR/CAD',
  'GBP/CAD', 'EUR/AUD', 'GBP/AUD', 'AUD/JPY', 'CAD/JPY', 'NZD/JPY', 'AUD/CAD',
  'AUD/NZD', 'AUD/CHF', 'EUR/NZD', 'GBP/NZD', 'USD/SGD', 'USD/HKD'
];

interface CalculatorInputProps {
  label: string;
  value: string | number;
  onChange: (value: string) => void;
  icon?: React.ReactNode;
  type?: string;
  min?: string;
  step?: string;
  suffix?: string;
}

function CalculatorInput({ label, value, onChange, icon, type = "number", min = "0", step = "0.01", suffix }: CalculatorInputProps) {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-300 mb-2">{label}</label>
      <div className="relative">
        {icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            {icon}
          </div>
        )}
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          min={min}
          step={step}
          className={`
            w-full bg-white/5 border border-white/10 rounded-lg
            ${icon ? 'pl-10' : 'pl-4'} pr-4 py-2
            text-white placeholder-gray-400
            focus:ring-2 focus:ring-blue-500 focus:border-transparent
            transition-all duration-200
          `}
        />
        {suffix && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-gray-400">
            {suffix}
          </div>
        )}
      </div>
    </div>
  );
}

export function PositionCalculator() {
  const [accountCurrency, setAccountCurrency] = useState('USD');
  const [pair, setPair] = useState('EUR/USD');
  const [accountSize, setAccountSize] = useState('10000');
  const [riskType, setRiskType] = useState('percentage'); // 'percentage' or 'money'
  const [riskPercent, setRiskPercent] = useState('1');
  const [riskMoney, setRiskMoney] = useState('100');
  const [entryPrice, setEntryPrice] = useState('1.0000');
  const [stopLoss, setStopLoss] = useState('0.9950');
  const [showFAQ, setShowFAQ] = useState(false);

  const calculatePosition = () => {
    const account = parseFloat(accountSize);
    const risk = riskType === 'percentage'
      ? (account * parseFloat(riskPercent) / 100)
      : parseFloat(riskMoney);
    const entry = parseFloat(entryPrice);
    const stop = parseFloat(stopLoss);

    // Determine pip value based on the currency pair
    const pipValue = pair.includes('JPY') || pair.includes('XAU/USD') ? 0.01 : 0.0001;
    const pips = Math.abs((entry - stop) / pipValue);

    // Calculate lot size
    let lotSize = 0;
    if (pair.includes('JPY') || pair.includes('XAU/USD')) {
      lotSize = risk / (pips * 100); // For JPY and XAU/USD pairs
    } else {
      lotSize = risk / (pips * 10); // For other pairs
    }

    return {
      riskAmount: risk.toFixed(2),
      pips: Math.round(pips),
      positionSize: lotSize.toFixed(2),
      standardLots: (lotSize / 100000).toFixed(3)
    };
  };

  const result = calculatePosition();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 pt-8">
          <nav className="flex items-center justify-between mb-8">
            <Link to="/" className="flex items-center space-x-2">
              <Clock className="h-6 w-6 text-blue-400" />
              <span className="text-xl font-bold text-white">FX Clock</span>
            </Link>
            <div className="flex items-center space-x-6">
              <Link to="/calendar" className="text-gray-300 hover:text-white transition-colors">Forex Event Calendar</Link>
            </div>
          </nav>

          <div className="text-center">
            <div className="flex items-center justify-center mb-4">
              <Globe className="h-16 w-16 text-blue-400" />
            </div>
            <h1 className="text-4xl font-bold text-white mb-4">
              Position Size Calculator
            </h1>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-0">
          <div className="text-center mb-8">
            <p className="text-gray-300">
              Calculate your optimal position size based on your risk management parameters
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
              <h2 className="text-xl font-semibold text-white mb-6 flex items-center">
                <Calculator className="h-5 w-5 mr-2 text-blue-400" />
                Input Parameters
              </h2>

              <div className="space-y-4">
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-300 mb-2">Account Currency</label>
                  <select
                    disabled
                    value={accountCurrency}
                    onChange={(e) => setAccountCurrency(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white"
                  >
                    {['USD', 'EUR', 'GBP', 'JPY', 'AUD', 'CAD', 'CHF', 'NZD'].map(currency => (
                      <option key={currency} value={currency} className="bg-gray-800">
                        {currency}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-300 mb-2">Currency Pair</label>
                  <select
                    value={pair}
                    onChange={(e) => setPair(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white"
                  >
                    {CURRENCY_PAIRS.map(p => (
                      <option key={p} value={p} className="bg-gray-800">
                        {p}
                      </option>
                    ))}
                  </select>
                </div>

                <CalculatorInput
                  label="Account Size"
                  value={accountSize}
                  onChange={setAccountSize}
                  icon={<DollarSign className="h-5 w-5 text-gray-400" />}
                  suffix={accountCurrency}
                />

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-300 mb-2">Risk Type</label>
                  <div className="grid grid-cols-2 gap-4">
                    <button
                      onClick={() => setRiskType('percentage')}
                      className={`px-4 py-2 rounded-lg border ${riskType === 'percentage'
                          ? 'bg-blue-500 border-blue-400 text-white'
                          : 'border-white/10 text-gray-300'
                        }`}
                    >
                      Percentage
                    </button>
                    <button
                      onClick={() => setRiskType('money')}
                      className={`px-4 py-2 rounded-lg border ${riskType === 'money'
                          ? 'bg-blue-500 border-blue-400 text-white'
                          : 'border-white/10 text-gray-300'
                        }`}
                    >
                      Fixed Amount
                    </button>
                  </div>
                </div>

                {riskType === 'percentage' ? (
                  <CalculatorInput
                    label="Risk Percentage"
                    value={riskPercent}
                    onChange={setRiskPercent}
                    icon={<Percent className="h-5 w-5 text-gray-400" />}
                    min="0.01"
                    max="100"
                    step="0.01"
                    suffix="%"
                  />
                ) : (
                  <CalculatorInput
                    label="Risk Amount"
                    value={riskMoney}
                    onChange={setRiskMoney}
                    icon={<DollarSign className="h-5 w-5 text-gray-400" />}
                    suffix={accountCurrency}
                  />
                )}

                <CalculatorInput
                  label="Entry Price"
                  value={entryPrice}
                  onChange={setEntryPrice}
                  step="0.0001"
                />

                <CalculatorInput
                  label="Stop Loss"
                  value={stopLoss}
                  onChange={setStopLoss}
                  step="0.0001"
                />
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
                <h2 className="text-xl font-semibold text-white mb-6">Results</h2>

                <div className="space-y-4">
                  <div className="p-4 bg-white/5 rounded-lg">
                    <div className="text-sm text-gray-400 mb-1">Risk Amount</div>
                    <div className="text-2xl font-bold text-white">
                      {accountCurrency} {result.riskAmount}
                    </div>
                  </div>

                  <div className="p-4 bg-white/5 rounded-lg">
                    <div className="text-sm text-gray-400 mb-1">Stop Loss Distance</div>
                    <div className="text-2xl font-bold text-white">
                      {result.pips} pips
                    </div>
                  </div>

                  <div className="p-4 bg-blue-500/20 rounded-lg border border-blue-500/30">
                    <div className="text-sm text-blue-300 mb-1">Recommended Position Size</div>
                    <div className="text-3xl font-bold text-white">
                      {result.positionSize} lots
                    </div>
                    <div className="text-sm text-gray-400 mt-1">
                      ({result.standardLots} standard lots)
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-white">Quick Guide</h3>
                  <button
                    onClick={() => setShowFAQ(!showFAQ)}
                    className="text-blue-400 hover:text-blue-300 transition-colors"
                  >
                    <HelpCircle className="h-5 w-5" />
                  </button>
                </div>
                <ul className="space-y-2 text-gray-300 text-sm">
                  <li>• Standard Lot = 100,000 units</li>
                  <li>• Mini Lot = 10,000 units</li>
                  <li>• Micro Lot = 1,000 units</li>
                  <li>• Position size is calculated to maintain your specified risk</li>
                </ul>
              </div>

              {showFAQ && (
                <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
                  <h3 className="text-lg font-semibold text-white mb-4">FAQ</h3>
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-blue-400 font-medium mb-2">What is position sizing?</h4>
                      <p className="text-gray-300 text-sm">Position sizing is a risk management technique that determines how many units of a currency pair you should trade based on your account size and risk tolerance.</p>
                    </div>
                    <div>
                      <h4 className="text-blue-400 font-medium mb-2">How is the position size calculated?</h4>
                      <p className="text-gray-300 text-sm">The position size is calculated by dividing your risk amount by the pip value and the number of pips to your stop loss.</p>
                    </div>
                    <div>
                      <h4 className="text-blue-400 font-medium mb-2">What's the difference between percentage and fixed risk?</h4>
                      <p className="text-gray-300 text-sm">Percentage risk calculates your risk amount as a percentage of your account size, while fixed risk allows you to specify an exact amount to risk on the trade.</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </div>
  );
}