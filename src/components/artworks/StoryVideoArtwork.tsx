import React, { useState, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, Sparkles, Film } from 'lucide-react';

export default function StoryVideoArtwork() {
  const [isPlaying, setIsPlaying] = useState(true);
  const [activeScene, setActiveScene] = useState(0);
  const [isMuted, setIsMuted] = useState(false);

  const scenes = [
    {
      title: 'Act I: The Underdog',
      narration: '"They said I would never make it. Nobody believed a kid with zero dollars could build an empire."',
      theme: 'from-slate-900 via-indigo-950 to-blue-950',
      icon: '🌧️',
      subtitle: 'Starting from the street with one pair of shoes',
      badge: 'Adversity & Doubt',
    },
    {
      title: 'Act II: The Resell Hustle',
      narration: '"Late nights study sessions, camping for drops, studying market shifts. Every dollar was reinvested."',
      theme: 'from-indigo-950 via-purple-950 to-slate-900',
      icon: '📦',
      subtitle: 'Turning $50 into $5,000, then $500,000',
      badge: 'The Relentless Grind',
    },
    {
      title: 'Act III: The Billionaire Rise',
      narration: '"Today, the world watches. Vision, persistence, and unwavering belief turned doubt into an empire."',
      theme: 'from-purple-950 via-slate-900 to-amber-950',
      icon: '🏙️',
      subtitle: 'Top-floor headquarters overlooking the skyline',
      badge: 'Billionaire Reseller',
    },
  ];

  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setActiveScene((prev) => (prev + 1) % scenes.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [isPlaying]);

  const current = scenes[activeScene];

  return (
    <div className={`relative w-full h-full min-h-[360px] bg-gradient-to-br ${current.theme} text-white overflow-hidden flex flex-col justify-between p-6 select-none shadow-2xl border border-purple-500/30 rounded-2xl transition-all duration-1000`}>
      {/* Cinematic Film Grain & Scanlines */}
      <div className="absolute inset-0 bg-[radial-gradient(#a855f7_0.75px,transparent_0.75px)] [background-size:24px_24px] opacity-20 pointer-events-none" />
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-400 opacity-80" />

      {/* Top Header: Google Flow AI Badge & Scene Tracker */}
      <div className="relative z-10 flex flex-wrap justify-between items-center gap-2">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 text-[11px] font-bold tracking-wider uppercase bg-purple-600/30 text-purple-200 border border-purple-500/40 rounded-full backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-purple-400 animate-spin" style={{ animationDuration: '6s' }} />
            Google Flow AI Animated
          </span>
          <span className="text-xs font-semibold text-slate-300 bg-slate-900/60 px-2 py-0.5 rounded border border-slate-700/60">
            {activeScene + 1}/3
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setIsMuted(!isMuted);
            }}
            className="p-1.5 rounded-lg bg-slate-900/80 hover:bg-slate-800 text-slate-300 hover:text-white transition-colors border border-slate-700/50"
            title={isMuted ? 'Unmute' : 'Mute'}
            aria-label="Toggle mute"
          >
            {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
          </button>
          <span className="text-[10px] uppercase font-bold tracking-widest text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/30">
            AI Voiceover Synced
          </span>
        </div>
      </div>

      {/* Center Cinematic Scene Visual */}
      <div className="relative z-10 my-auto flex flex-col items-center justify-center text-center py-4">
        {/* Animated Glow Orb */}
        <div className="absolute w-44 h-44 rounded-full bg-purple-600/20 blur-3xl pointer-events-none animate-pulse" />

        {/* Scene Concept Card */}
        <div className="relative z-10 max-w-md w-full bg-slate-900/70 backdrop-blur-md p-5 rounded-2xl border border-white/10 shadow-2xl transition-all duration-500">
          <div className="flex justify-between items-center mb-2">
            <span className="text-2xl">{current.icon}</span>
            <span className="text-[10px] font-black uppercase tracking-wider text-purple-300 bg-purple-950/80 px-2 py-0.5 rounded border border-purple-700/50">
              {current.badge}
            </span>
          </div>

          <h5 className="text-lg font-black text-white tracking-wide uppercase font-heading">
            {current.title}
          </h5>
          <p className="text-xs text-slate-300 mt-1 font-medium">
            {current.subtitle}
          </p>

          {/* Voiceover waveform & Quote Box */}
          <div className="mt-3 p-3 bg-black/60 rounded-xl border border-purple-500/20 text-left">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[9px] font-bold uppercase tracking-wider text-purple-400 flex items-center gap-1">
                <Film className="w-2.5 h-2.5" /> Voiceover Narration:
              </span>
              {/* Animated audio wave bars */}
              <div className="flex items-center gap-1">
                {[4, 12, 8, 16, 6, 14, 9, 13, 5].map((height, i) => (
                  <span
                    key={i}
                    className={`w-0.5 rounded-full bg-purple-400 transition-all duration-300 ${
                      isPlaying && !isMuted ? 'animate-bounce' : 'opacity-40'
                    }`}
                    style={{
                      height: `${height}px`,
                      animationDelay: `${i * 120}ms`,
                    }}
                  />
                ))}
              </div>
            </div>
            <p className="text-xs italic text-slate-200 leading-relaxed font-sans">
              {current.narration}
            </p>
          </div>
        </div>
      </div>

      {/* Footer: Video Playback Controls & Timeline Scrubber */}
      <div className="relative z-10 flex flex-col gap-2 pt-2 border-t border-white/10">
        {/* Timeline bar with 3 segments */}
        <div className="grid grid-cols-3 gap-1.5 h-1.5 w-full bg-slate-900/80 rounded-full overflow-hidden p-0.5">
          {scenes.map((_, idx) => (
            <div
              key={idx}
              className={`h-full rounded-full transition-all duration-300 cursor-pointer ${
                idx === activeScene
                  ? 'bg-gradient-to-r from-purple-400 to-blue-400 shadow-sm'
                  : idx < activeScene
                  ? 'bg-purple-600/70'
                  : 'bg-slate-700/50'
              }`}
              onClick={(e) => {
                e.stopPropagation();
                setActiveScene(idx);
              }}
            />
          ))}
        </div>

        <div className="flex justify-between items-center text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setIsPlaying(!isPlaying);
              }}
              className="flex items-center gap-1.5 text-xs font-bold text-white bg-purple-600 hover:bg-purple-500 px-3 py-1.5 rounded-lg transition-colors shadow-lg shadow-purple-600/30"
              aria-label={isPlaying ? 'Pause preview' : 'Play preview'}
            >
              {isPlaying ? <Pause className="w-3 h-3 fill-current" /> : <Play className="w-3 h-3 fill-current" />}
              {isPlaying ? 'Pause' : 'Play'}
            </button>
            <span className="text-[11px] text-slate-300 font-medium hidden sm:inline">
              Google Flow Timeline
            </span>
          </div>

          <div className="flex items-center gap-1 text-[11px] text-purple-300">
            <span>Riyazul Hasan Rion</span>
            <span>• Director</span>
          </div>
        </div>
      </div>
    </div>
  );
}
