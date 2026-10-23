import React from 'react';

export default function SpriteArtwork() {
  return (
    <div className="relative w-full h-full min-h-[360px] bg-[#FAF5E8] text-slate-900 overflow-hidden flex flex-col justify-between p-6 select-none shadow-inner border border-emerald-900/10 rounded-2xl">
      {/* Background ambient lighting */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-400/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-yellow-300/25 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(#008B45_1px,transparent_1px)] [background-size:16px_16px] opacity-10 pointer-events-none" />

      {/* Header of the Canva Poster */}
      <div className="relative z-10 flex justify-between items-start">
        <div>
          <span className="inline-block px-2.5 py-1 text-[11px] font-black tracking-widest uppercase bg-emerald-700 text-white rounded shadow-sm">
            Canva Design • Ad Series
          </span>
          <h4 className="mt-2 text-2xl font-black tracking-tight text-emerald-950 uppercase leading-none">
            Born <span className="text-emerald-600">Fresh</span>
          </h4>
          <p className="text-xs font-semibold text-emerald-800 tracking-wide mt-1">100% Crisp Lemon-Lime Burst</p>
        </div>
        <div className="text-right">
          <span className="text-[10px] font-bold text-emerald-800/80 uppercase tracking-wider block">Est. 1961</span>
          <span className="text-xs font-black text-emerald-900">ICE COLD</span>
        </div>
      </div>

      {/* Main Visual Centerpiece: Can, Lime, Mint, Condensation */}
      <div className="relative z-10 my-auto flex items-center justify-center py-4">
        {/* Floating Mint Leaves Left */}
        <div className="absolute -left-2 top-8 w-14 h-14 rotate-[-25deg] filter drop-shadow-md transition-transform duration-500 hover:rotate-[-10deg]">
          <svg viewBox="0 0 100 100" className="w-full h-full text-emerald-600 fill-current">
            <path d="M10 50 Q 50 10 90 50 Q 50 90 10 50 Z" />
            <path d="M10 50 L 90 50" stroke="#064e3b" strokeWidth="3" fill="none" />
            <path d="M30 40 L 45 50 M 50 35 L 65 50 M 35 60 L 50 50" stroke="#064e3b" strokeWidth="2" fill="none" />
          </svg>
        </div>

        {/* Lime Slice Right Top */}
        <div className="absolute -right-3 top-2 w-16 h-16 rotate-[28deg] filter drop-shadow-lg transition-transform duration-500 hover:rotate-[45deg]">
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <circle cx="50" cy="50" r="46" fill="#84cc16" stroke="#4d7c0f" strokeWidth="3" />
            <circle cx="50" cy="50" r="41" fill="#fef08a" />
            <circle cx="50" cy="50" r="38" fill="#a3e635" />
            {/* Slices */}
            {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
              <line
                key={i}
                x1="50"
                y1="50"
                x2={50 + 36 * Math.cos((angle * Math.PI) / 180)}
                y2={50 + 36 * Math.sin((angle * Math.PI) / 180)}
                stroke="#fef08a"
                strokeWidth="2.5"
              />
            ))}
            <circle cx="50" cy="50" r="8" fill="#fef08a" />
          </svg>
        </div>

        {/* The 3D Sprite Can Illustration */}
        <div className="relative group/can">
          {/* Can Glow */}
          <div className="absolute -inset-2 bg-emerald-500/30 rounded-3xl blur-xl" />

          {/* Can Body */}
          <div className="relative w-32 h-52 bg-gradient-to-r from-emerald-600 via-emerald-500 to-emerald-700 rounded-[26px] shadow-2xl border-t-4 border-slate-300 flex flex-col items-center justify-between p-3 overflow-hidden">
            {/* Top rim metallic sheen */}
            <div className="w-24 h-3 bg-gradient-to-r from-slate-300 via-white to-slate-400 rounded-full shadow-inner opacity-90" />

            {/* Droplets overlay */}
            <div className="absolute inset-0 bg-[radial-gradient(#ffffff_1.5px,transparent_1.5px)] [background-size:12px_12px] opacity-40" />

            {/* Diagonal Brand Yellow Spark */}
            <div className="absolute -right-4 top-14 w-24 h-24 bg-yellow-400/80 rotate-45 rounded-xl blur-sm" />

            {/* Sprite Logo Graphics */}
            <div className="relative z-10 text-center my-auto">
              <span className="block text-[32px] font-black italic tracking-tighter text-white transform -rotate-12 drop-shadow-[0_2px_4px_rgba(0,0,0,0.4)]">
                Sprite
              </span>
              <div className="inline-flex items-center gap-1 bg-yellow-300 text-emerald-950 font-black text-[9px] px-2 py-0.5 rounded-full transform -rotate-6 shadow">
                <span>🍋 LIME & MINT</span>
              </div>
            </div>

            {/* Bottom metallic rim */}
            <div className="w-26 h-3 bg-gradient-to-r from-slate-400 via-white to-slate-400 rounded-full opacity-80" />
          </div>

          {/* Ice Cubes and Splash */}
          <div className="absolute -bottom-4 -left-4 w-10 h-10 bg-white/70 backdrop-blur-sm rounded-lg border border-white/80 rotate-12 shadow-md" />
          <div className="absolute -bottom-3 -right-2 w-8 h-8 bg-white/60 backdrop-blur-sm rounded-lg border border-white/80 -rotate-12 shadow" />
        </div>

        {/* Lime Slice Left Bottom */}
        <div className="absolute -left-3 bottom-1 w-12 h-12 rotate-[-15deg] filter drop-shadow">
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <circle cx="50" cy="50" r="46" fill="#65a30d" />
            <circle cx="50" cy="50" r="38" fill="#bef264" />
            {[0, 60, 120, 180, 240, 300].map((angle, i) => (
              <line
                key={i}
                x1="50"
                y1="50"
                x2={50 + 36 * Math.cos((angle * Math.PI) / 180)}
                y2={50 + 36 * Math.sin((angle * Math.PI) / 180)}
                stroke="#fef08a"
                strokeWidth="3"
              />
            ))}
          </svg>
        </div>
      </div>

      {/* Footer of the Canva Poster */}
      <div className="relative z-10 flex justify-between items-end border-t border-emerald-900/15 pt-3">
        <div>
          <span className="text-[10px] font-bold text-emerald-900/70 uppercase">Palette</span>
          <div className="flex gap-1.5 mt-1">
            <span className="w-3.5 h-3.5 rounded-full bg-[#008B45] border border-black/10" title="Sprite Green" />
            <span className="w-3.5 h-3.5 rounded-full bg-[#FACC15] border border-black/10" title="Sunburst Lime" />
            <span className="w-3.5 h-3.5 rounded-full bg-[#FAF5E8] border border-black/20" title="Cream Canvas" />
          </div>
        </div>
        <div className="text-right">
          <p className="text-[11px] font-extrabold text-emerald-900 tracking-tight">OBEY YOUR THIRST</p>
          <p className="text-[9px] font-semibold text-emerald-700">Created in Canva Pro by Riyazul</p>
        </div>
      </div>
    </div>
  );
}
