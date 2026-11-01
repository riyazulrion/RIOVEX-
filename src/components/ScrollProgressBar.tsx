import React, { useEffect, useState } from 'react';
import { calculateScrollProgress } from '../utils/scrollProgress.ts';

export default function ScrollProgressBar() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let ticking = false;

    const updateScrollProgress = () => {
      const scrollY = window.scrollY;
      const scrollHeight = document.documentElement.scrollHeight;
      const innerHeight = window.innerHeight;
      const currentProgress = calculateScrollProgress(scrollY, scrollHeight, innerHeight);
      setProgress(currentProgress);
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateScrollProgress);
        ticking = true;
      }
    };

    // Calculate immediately on mount
    updateScrollProgress();

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  return (
    <div
      role="progressbar"
      aria-label="Scroll progress"
      aria-valuenow={Math.round(progress)}
      aria-valuemin={0}
      aria-valuemax={100}
      className="fixed top-0 left-0 right-0 h-[2.5px] z-50 pointer-events-none overflow-hidden"
    >
      <div
        className="h-full w-full bg-gradient-to-r from-[#16A34A] via-[#22C55E] to-[#4ADE80] shadow-[0_0_8px_rgba(34,197,94,0.7)] transition-transform duration-75 ease-out origin-left"
        style={{
          transform: `scaleX(${progress / 100})`,
          willChange: 'transform',
        }}
      />
    </div>
  );
}
