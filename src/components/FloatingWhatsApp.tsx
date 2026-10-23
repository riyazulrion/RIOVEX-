import React, { useState } from 'react';
import { MessageCircle } from 'lucide-react';

export default function FloatingWhatsApp() {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <aside
      aria-label="Quick contact"
      className="fixed bottom-6 right-6 z-40 flex items-center gap-3"
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      {/* Tooltip badge */}
      <div
        className={`hidden sm:flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 text-white text-xs font-bold border border-emerald-500/40 shadow-xl backdrop-blur-md transition-all duration-300 ${
          showTooltip
            ? 'opacity-100 translate-x-0'
            : 'opacity-0 translate-x-2 pointer-events-none'
        }`}
      >
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
        <span>Chat with Rion</span>
      </div>

      {/* Pulsing Floating Button */}
      <a
        href="https://wa.me/8801646206866"
        target="_blank"
        rel="noopener noreferrer"
        className="relative group w-14 h-14 rounded-full bg-[#25D366] hover:bg-[#20be5a] text-white flex items-center justify-center shadow-2xl shadow-emerald-500/50 transition-all transform hover:scale-110 active:scale-95 focus:outline-none focus:ring-4 focus:ring-emerald-400/40"
        aria-label="Chat on WhatsApp: 01646206866"
        title="Chat on WhatsApp: 01646206866"
      >
        {/* Pulsing wave ring */}
        <span className="absolute -inset-1 rounded-full bg-emerald-400/30 animate-ping pointer-events-none" />

        <MessageCircle className="w-7 h-7 fill-current relative z-10" />
      </a>
    </aside>
  );
}
