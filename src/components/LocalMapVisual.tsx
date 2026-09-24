import React, { useState } from 'react';
import { MapPin, Star, Navigation, Phone, CheckCircle2, Search, TrendingUp } from 'lucide-react';

export const LocalMapVisual: React.FC = () => {
  const [activePin, setActivePin] = useState<number>(0);

  const localRankings = [
    {
      id: 0,
      name: 'Your Business Location (Optimized)',
      rank: '#1',
      rating: 4.9,
      reviews: 184,
      category: 'Top Rated Agency & Service Hub',
      distance: '0.4 mi',
      status: 'Open · Closes 6 PM',
      highlight: '98% Positive Sentiment'
    },
    {
      id: 1,
      name: 'Competitor Alpha Corp',
      rank: '#2',
      rating: 4.2,
      reviews: 42,
      category: 'General Digital Services',
      distance: '1.2 mi',
      status: 'Open',
      highlight: 'Inconsistent Citations'
    },
    {
      id: 2,
      name: 'Competitor Beta Agency',
      rank: '#3',
      rating: 3.8,
      reviews: 19,
      category: 'Consulting Group',
      distance: '2.1 mi',
      status: 'Closes soon',
      highlight: 'Slow Response Times'
    }
  ];

  return (
    <div className="bg-white rounded-3xl border border-[#E9E7F2] shadow-[0_15px_40px_rgba(109,40,217,0.06)] overflow-hidden">
      {/* Header bar styled like Google Maps search */}
      <div className="p-4 sm:p-5 border-b border-[#E9E7F2] bg-[#FAF9FF] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3 w-full max-w-md">
          <div className="w-8 h-8 rounded-xl bg-violet-100 text-violet-700 flex items-center justify-center shrink-0">
            <Search className="w-4 h-4" />
          </div>
          <div className="w-full bg-white px-3.5 py-1.5 rounded-xl border border-[#E9E7F2] text-xs flex items-center justify-between shadow-xs">
            <span className="font-semibold text-neutral-800">"digital marketing agency near me"</span>
            <span className="text-[10px] text-violet-700 font-bold bg-violet-50 px-2 py-0.5 rounded-md">Local 3-Pack</span>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <span className="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 font-semibold border border-emerald-200">
            Map Grid Dominance: 92%
          </span>
        </div>
      </div>

      {/* Main Grid: Left List + Right Interactive Stylized Map */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-0">
        {/* Left Side: Local 3-Pack List */}
        <div className="md:col-span-6 p-4 sm:p-5 border-b md:border-b-0 md:border-r border-[#E9E7F2] space-y-3 bg-white">
          <div className="flex items-center justify-between text-xs text-neutral-500 font-medium">
            <span>Local 3-Pack Ranking Results</span>
            <span className="text-emerald-600 font-bold flex items-center">
              <TrendingUp className="w-3 h-3 mr-0.5" /> High Visibility
            </span>
          </div>

          <div className="space-y-2.5">
            {localRankings.map((item, idx) => (
              <div
                key={item.id}
                onClick={() => setActivePin(idx)}
                className={`p-3.5 rounded-2xl border text-xs cursor-pointer transition-all ${
                  activePin === idx
                    ? 'border-[#6D28D9] bg-[#FAF9FF] shadow-xs'
                    : 'border-[#E9E7F2] bg-white hover:bg-[#F8F7FF]'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <span className={`w-6 h-6 rounded-lg flex items-center justify-center font-extrabold text-xs ${
                      idx === 0 ? 'bg-[#6D28D9] text-white' : 'bg-neutral-100 text-neutral-600'
                    }`}>
                      {item.rank}
                    </span>
                    <h5 className="font-bold text-neutral-900 text-xs sm:text-sm">{item.name}</h5>
                  </div>
                  {idx === 0 && (
                    <span className="px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                      Your Brand
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-2 mt-1.5 text-[11px] text-neutral-600">
                  <span className="font-bold text-amber-500 flex items-center">
                    <Star className="w-3 h-3 fill-amber-400 mr-0.5" /> {item.rating}
                  </span>
                  <span>({item.reviews} reviews)</span>
                  <span>·</span>
                  <span>{item.category}</span>
                </div>

                <div className="flex items-center justify-between mt-2 pt-2 border-t border-neutral-100 text-[11px] text-neutral-500">
                  <span>{item.distance} · {item.status}</span>
                  <span className="font-medium text-violet-700">{item.highlight}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="p-3 bg-violet-50 rounded-xl border border-violet-100 text-[11px] text-violet-900 flex items-center justify-between">
            <span className="font-medium">Google Business Profile Health Check</span>
            <span className="font-bold text-emerald-700 flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> 100% Verified
            </span>
          </div>
        </div>

        {/* Right Side: Map Canvas Simulation */}
        <div className="md:col-span-6 p-4 sm:p-6 bg-[#F8F7FF] flex flex-col justify-between relative min-h-[300px]">
          {/* Stylized vector map background */}
          <div className="absolute inset-0 opacity-40 pointer-events-none p-4">
            <svg className="w-full h-full" viewBox="0 0 300 250">
              <line x1="0" y1="50" x2="300" y2="70" stroke="#CBD5E1" strokeWidth="6" />
              <line x1="0" y1="140" x2="300" y2="120" stroke="#CBD5E1" strokeWidth="8" />
              <line x1="120" y1="0" x2="160" y2="250" stroke="#CBD5E1" strokeWidth="6" />
              <line x1="60" y1="0" x2="70" y2="250" stroke="#E2E8F0" strokeWidth="3" />
              <line x1="220" y1="0" x2="240" y2="250" stroke="#E2E8F0" strokeWidth="4" />
              <rect x="30" y="80" width="50" height="40" rx="4" fill="#E2E8F0" />
              <rect x="180" y="40" width="70" height="50" rx="4" fill="#E2E8F0" />
              <rect x="180" y="150" width="60" height="60" rx="4" fill="#E2E8F0" />
            </svg>
          </div>

          {/* Interactive Map Pins */}
          <div className="relative z-10 w-full h-full flex flex-col justify-around py-4">
            {/* Pin 1: Target #1 Business */}
            <div 
              onClick={() => setActivePin(0)}
              className={`cursor-pointer transition-all transform hover:scale-105 ml-8 sm:ml-16 inline-flex items-center gap-2 p-2 rounded-2xl shadow-lg border ${
                activePin === 0 
                  ? 'bg-violet-700 text-white border-violet-800 ring-4 ring-violet-200' 
                  : 'bg-white text-neutral-800 border-[#E9E7F2]'
              }`}
            >
              <div className="w-6 h-6 rounded-full bg-white text-violet-700 flex items-center justify-center font-bold text-xs shrink-0">
                1
              </div>
              <div className="text-left pr-1">
                <div className="text-xs font-bold leading-tight">Your Business (#1)</div>
                <div className={`text-[10px] ${activePin === 0 ? 'text-violet-200' : 'text-neutral-500'}`}>Top Ranked Location</div>
              </div>
              <MapPin className="w-4 h-4 ml-auto text-cyan-300" />
            </div>

            {/* Pin 2 */}
            <div 
              onClick={() => setActivePin(1)}
              className={`cursor-pointer transition-all transform hover:scale-105 ml-28 sm:ml-36 inline-flex items-center gap-2 p-2 rounded-2xl shadow-md border ${
                activePin === 1 
                  ? 'bg-violet-700 text-white border-violet-800 ring-4 ring-violet-200' 
                  : 'bg-white text-neutral-700 border-[#E9E7F2]'
              }`}
            >
              <div className="w-5 h-5 rounded-full bg-neutral-200 text-neutral-700 flex items-center justify-center font-bold text-[11px] shrink-0">
                2
              </div>
              <div className="text-left pr-1">
                <div className="text-[11px] font-semibold leading-tight">Competitor Alpha</div>
              </div>
            </div>

            {/* Pin 3 */}
            <div 
              onClick={() => setActivePin(2)}
              className={`cursor-pointer transition-all transform hover:scale-105 ml-14 sm:ml-20 inline-flex items-center gap-2 p-2 rounded-2xl shadow-md border ${
                activePin === 2 
                  ? 'bg-violet-700 text-white border-violet-800 ring-4 ring-violet-200' 
                  : 'bg-white text-neutral-700 border-[#E9E7F2]'
              }`}
            >
              <div className="w-5 h-5 rounded-full bg-neutral-200 text-neutral-700 flex items-center justify-center font-bold text-[11px] shrink-0">
                3
              </div>
              <div className="text-left pr-1">
                <div className="text-[11px] font-semibold leading-tight">Competitor Beta</div>
              </div>
            </div>
          </div>

          {/* Action pills at bottom of map */}
          <div className="relative z-10 flex items-center justify-between bg-white/95 backdrop-blur-sm p-3 rounded-2xl border border-[#E9E7F2] text-xs shadow-xs">
            <div className="flex items-center gap-2 text-neutral-700">
              <Navigation className="w-4 h-4 text-violet-600" />
              <span className="font-semibold">Local Proximity Engine</span>
            </div>
            <div className="text-[11px] text-neutral-500 font-mono">Geo-Grid Radius: 15km</div>
          </div>
        </div>
      </div>
    </div>
  );
};
