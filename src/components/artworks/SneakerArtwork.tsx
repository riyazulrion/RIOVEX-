import React, { useState } from 'react';

export default function SneakerArtwork() {
  const [activeModel, setActiveModel] = useState<'jordan4' | 'jordan1'>('jordan4');

  return (
    <div className="relative w-full h-full min-h-[360px] bg-[#0c0d17] text-white overflow-hidden flex flex-col justify-between p-6 select-none shadow-inner border border-purple-900/30 rounded-2xl">
      {/* Background neon ambient gradients */}
      <div className={`absolute top-0 right-0 w-72 h-72 rounded-full blur-[90px] pointer-events-none transition-colors duration-700 ${
        activeModel === 'jordan4' ? 'bg-purple-600/25' : 'bg-amber-600/25'
      }`} />
      <div className={`absolute bottom-0 left-0 w-72 h-72 rounded-full blur-[90px] pointer-events-none transition-colors duration-700 ${
        activeModel === 'jordan4' ? 'bg-blue-600/20' : 'bg-orange-500/20'
      }`} />

      {/* Cyber/Street Grid line accents */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f2338_1px,transparent_1px),linear-gradient(to_bottom,#1f2338_1px,transparent_1px)] bg-[size:28px_28px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-30 pointer-events-none" />

      {/* Top Bar: Model Switcher & Tag */}
      <div className="relative z-10 flex flex-wrap justify-between items-center gap-2">
        <div>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-[10px] font-bold tracking-widest uppercase bg-purple-500/20 text-purple-300 border border-purple-500/30 rounded-md">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Precise BG Cutout
          </span>
          <h4 className="mt-1 text-xl font-black tracking-tight uppercase leading-none">
            {activeModel === 'jordan4' ? (
              <>Air Jordan 4 <span className="text-purple-400">White & Black</span></>
            ) : (
              <>Air Jordan 1 <span className="text-amber-400">Desert Tan</span></>
            )}
          </h4>
        </div>

        {/* Model Toggle Buttons */}
        <div className="flex bg-slate-900/80 p-1 rounded-xl border border-slate-800 text-xs font-semibold backdrop-blur-md">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setActiveModel('jordan4');
            }}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              activeModel === 'jordan4'
                ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/40'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Jordan 4 (W/B)
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setActiveModel('jordan1');
            }}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              activeModel === 'jordan1'
                ? 'bg-amber-600 text-white shadow-lg shadow-amber-600/40'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Jordan 1 (Tan)
          </button>
        </div>
      </div>

      {/* Center Sneaker Graphic Render */}
      <div className="relative z-10 my-auto flex flex-col items-center justify-center py-6">
        {/* Background Typography Watermark */}
        <span className="absolute text-[80px] sm:text-[100px] font-black uppercase text-slate-800/30 tracking-tighter select-none pointer-events-none -translate-y-4">
          {activeModel === 'jordan4' ? 'RETRO 4' : 'JORDAN 1'}
        </span>

        {/* Sneaker Silhouette Illustration */}
        <div className="relative group/sneaker transform hover:scale-105 transition-transform duration-500 ease-out">
          {/* Studio Floor Drop Shadow */}
          <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 w-56 h-6 bg-black/60 rounded-full blur-md" />

          {/* Render Vector Sneaker */}
          {activeModel === 'jordan4' ? (
            <svg viewBox="0 0 320 180" className="w-64 sm:w-72 h-auto filter drop-shadow-[0_15px_25px_rgba(0,0,0,0.7)]">
              {/* Jordan 4 White/Black clean silhouette */}
              <defs>
                <linearGradient id="soleWhite" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#f8fafc" />
                  <stop offset="50%" stopColor="#e2e8f0" />
                  <stop offset="100%" stopColor="#cbd5e1" />
                </linearGradient>
                <linearGradient id="leatherWhite" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#ffffff" />
                  <stop offset="60%" stopColor="#f1f5f9" />
                  <stop offset="100%" stopColor="#e2e8f0" />
                </linearGradient>
              </defs>

              {/* Sole */}
              <path
                d="M 30 145 C 50 148, 120 148, 160 142 C 200 137, 260 145, 290 140 C 295 137, 290 125, 280 125 C 240 126, 180 122, 140 124 C 90 126, 40 128, 30 145 Z"
                fill="url(#soleWhite)"
                stroke="#0f172a"
                strokeWidth="2.5"
              />
              <path d="M 60 140 C 90 140, 140 138, 180 135" stroke="#0f172a" strokeWidth="4" />

              {/* Midsole Air Bubble Window */}
              <rect x="70" y="128" width="30" height="9" rx="3" fill="#020617" stroke="#38bdf8" strokeWidth="1.5" />
              <line x1="80" y1="128" x2="80" y2="137" stroke="#38bdf8" strokeWidth="1.5" />
              <line x1="90" y1="128" x2="90" y2="137" stroke="#38bdf8" strokeWidth="1.5" />

              {/* Upper Body Leather (Clean White) */}
              <path
                d="M 35 125 C 45 80, 80 50, 120 45 C 150 45, 175 70, 205 85 C 235 95, 275 105, 285 120 C 275 125, 230 125, 180 123 C 120 123, 50 124, 35 125 Z"
                fill="url(#leatherWhite)"
                stroke="#0f172a"
                strokeWidth="2.5"
              />

              {/* Black Heel Tab & Jumpman Area */}
              <path d="M 35 120 C 32 85, 48 50, 75 42 L 72 65 C 55 70, 42 90, 42 120 Z" fill="#0f172a" />
              <rect x="42" y="30" width="10" height="15" rx="2" fill="#0f172a" />

              {/* Iconic Jordan 4 Mesh Grid Panel */}
              <polygon points="120,72 165,82 155,108 115,100" fill="#0f172a" stroke="#cbd5e1" strokeWidth="1" />
              <line x1="120" y1="78" x2="155" y2="108" stroke="#cbd5e1" strokeWidth="1" strokeDasharray="2,2" />
              <line x1="135" y1="74" x2="140" y2="105" stroke="#cbd5e1" strokeWidth="1" strokeDasharray="2,2" />

              {/* Support Wing Triangular Plastic Strap (Black) */}
              <polygon points="105,62 125,60 145,95 130,98" fill="#1e293b" stroke="#0f172a" strokeWidth="2" />
              <circle cx="112" cy="65" r="3" fill="#cbd5e1" />
              <circle cx="120" cy="65" r="3" fill="#cbd5e1" />

              {/* Lacing System & Eyelets */}
              <path d="M 125 58 Q 160 70 195 86" stroke="#0f172a" strokeWidth="3" fill="none" />
              <path d="M 135 68 L 165 76" stroke="#334155" strokeWidth="2" />
              <path d="M 150 78 L 180 84" stroke="#334155" strokeWidth="2" />

              {/* Mudguard Overlay */}
              <path d="M 175 110 C 215 108, 260 115, 280 122 L 275 125 C 235 123, 190 120, 160 122 Z" fill="#334155" />
            </svg>
          ) : (
            <svg viewBox="0 0 320 180" className="w-64 sm:w-72 h-auto filter drop-shadow-[0_15px_25px_rgba(0,0,0,0.7)]">
              {/* Jordan 1 Desert Tan High clean silhouette */}
              <defs>
                <linearGradient id="tanGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#d4a373" />
                  <stop offset="50%" stopColor="#c68b59" />
                  <stop offset="100%" stopColor="#a06037" />
                </linearGradient>
                <linearGradient id="sailMidsole" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#fefae0" />
                  <stop offset="100%" stopColor="#faedcd" />
                </linearGradient>
              </defs>

              {/* Sole */}
              <path
                d="M 30 145 C 50 148, 120 148, 160 143 C 200 138, 260 145, 290 140 C 295 137, 290 126, 280 126 C 240 126, 180 123, 140 124 C 90 126, 40 128, 30 145 Z"
                fill="url(#sailMidsole)"
                stroke="#78350f"
                strokeWidth="2"
              />
              <path d="M 30 146 C 70 148, 220 147, 290 142" stroke="#a06037" strokeWidth="3" />

              {/* High Collar Ankle Collar (Tan Leather) */}
              <path d="M 40 122 C 38 70, 50 35, 95 30 C 115 30, 130 45, 145 65 L 125 110 C 90 115, 55 118, 40 122 Z" fill="url(#tanGrad)" stroke="#592d11" strokeWidth="2" />

              {/* White Quarter Panel Underlay */}
              <polygon points="95,65 175,85 160,123 90,120" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />

              {/* Iconic Nike Swoosh in Dark Mocha */}
              <path
                d="M 185 88 C 145 90, 105 105, 75 80 C 105 105, 140 112, 175 100 C 195 92, 220 86, 235 84 C 215 88, 195 89, 185 88 Z"
                fill="#291b15"
              />

              {/* Tan Toe Box & Mudguard */}
              <path
                d="M 185 110 C 215 95, 245 100, 265 110 C 280 118, 285 125, 280 126 C 255 126, 210 124, 170 123 Z"
                fill="url(#tanGrad)"
                stroke="#592d11"
                strokeWidth="2"
              />

              {/* Ankle Wings Badge */}
              <circle cx="80" cy="48" r="9" fill="#291b15" />
              <path d="M 74 48 L 86 48 M 76 45 L 84 45 M 76 51 L 84 51" stroke="#fefae0" strokeWidth="1" />
            </svg>
          )}

          {/* Color Palettes Callout */}
          <div className="flex items-center justify-center gap-2 mt-2">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Matched Tones:</span>
            {activeModel === 'jordan4' ? (
              <div className="flex gap-1.5">
                <span className="w-3 h-3 rounded-full bg-white border border-slate-600 shadow-sm" title="Pure White" />
                <span className="w-3 h-3 rounded-full bg-slate-900 border border-purple-500 shadow-sm" title="Matte Black" />
                <span className="w-3 h-3 rounded-full bg-slate-400 border border-slate-600 shadow-sm" title="Cement Grey" />
              </div>
            ) : (
              <div className="flex gap-1.5">
                <span className="w-3 h-3 rounded-full bg-[#d4a373] border border-amber-600 shadow-sm" title="Desert Tan" />
                <span className="w-3 h-3 rounded-full bg-[#fefae0] border border-slate-400 shadow-sm" title="Sail White" />
                <span className="w-3 h-3 rounded-full bg-[#291b15] border border-stone-800 shadow-sm" title="Deep Mocha" />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Footer Info of Sneaker Ad */}
      <div className="relative z-10 flex justify-between items-end border-t border-slate-800 pt-3 text-xs">
        <div>
          <span className="text-[10px] uppercase font-bold text-slate-500 block">Ad Composition</span>
          <span className="font-bold text-slate-200">Commercial Campaign Visual</span>
        </div>
        <div className="text-right">
          <span className="text-[10px] uppercase font-bold text-purple-400 block">Lighting & Shadows</span>
          <span className="font-semibold text-slate-300">Custom Ambient Match</span>
        </div>
      </div>
    </div>
  );
}
