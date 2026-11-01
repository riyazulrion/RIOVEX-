import React, { useRef, useEffect, useState } from 'react';
import { Play, Volume2, VolumeX } from 'lucide-react';
import { WorkItem } from '../types/portfolio.ts';

interface Props {
  item: WorkItem;
  customMediaUrl?: string | null;
  className?: string;
  isModal?: boolean;
  isCardHovered?: boolean;
}

export default function WorkVisualRenderer({
  item,
  customMediaUrl,
  className = '',
  isModal = false,
  isCardHovered = false,
}: Props) {
  const mediaSrc = customMediaUrl || item.defaultImage;
  const isVideo =
    mediaSrc.startsWith('data:video') ||
    mediaSrc.endsWith('.mp4') ||
    mediaSrc.endsWith('.webm') ||
    item.tag === '[AI VIDEO]';

  const posterSrc = item.posterImage || (isVideo ? '/assets/aistudio/juice_commercial_poster.png' : undefined);

  const cardVideoRef = useRef<HTMLVideoElement>(null);
  const modalVideoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(true);

  // In card grid: play muted on hover, pause when hover ends
  useEffect(() => {
    if (isModal || !isVideo) return;
    const video = cardVideoRef.current;
    if (!video) return;

    if (isCardHovered) {
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {});
      }
    } else {
      video.pause();
      try {
        video.currentTime = 0;
      } catch {
        // Ignore if not seekable yet
      }
    }
  }, [isCardHovered, isModal, isVideo]);

  const toggleSound = () => {
    if (modalVideoRef.current) {
      const newMuted = !modalVideoRef.current.muted;
      modalVideoRef.current.muted = newMuted;
      setIsMuted(newMuted);
    } else {
      setIsMuted((prev) => !prev);
    }
  };

  if (isVideo) {
    if (isModal) {
      return (
        <div className={`relative w-full h-full flex flex-col items-center justify-center bg-[#0A0A0A] overflow-hidden ${className}`}>
          <video
            ref={modalVideoRef}
            src={mediaSrc}
            poster={posterSrc}
            controls
            autoPlay
            muted={isMuted}
            loop
            playsInline
            onVolumeChange={() => {
              if (modalVideoRef.current) {
                setIsMuted(modalVideoRef.current.muted);
              }
            }}
            className="w-auto h-auto max-w-full max-h-[75vh] object-contain mx-auto rounded-[2px]"
          />

          {/* Quick Sound Toggle & Player Meta overlay */}
          <div className="absolute top-3 right-3 z-20 flex items-center gap-2">
            <button
              type="button"
              onClick={toggleSound}
              className="font-mono text-[11px] font-bold tracking-[0.14em] uppercase px-3 py-1.5 bg-[#0A0A0A]/90 hover:bg-[#F2F2F2] text-[#F2F2F2] hover:text-[#0A0A0A] border border-[#2a2a2a] hover:border-[#F2F2F2] rounded-[2px] transition-all flex items-center gap-1.5 shadow-xl cursor-pointer"
              title={isMuted ? 'Click to unmute' : 'Click to mute'}
            >
              {isMuted ? (
                <>
                  <VolumeX className="w-3.5 h-3.5 text-[#8A8A8A]" />
                  <span>UNMUTE [ SOUND OFF ]</span>
                </>
              ) : (
                <>
                  <Volume2 className="w-3.5 h-3.5 text-[#22C55E]" />
                  <span>SOUND ON</span>
                </>
              )}
            </button>
          </div>
        </div>
      );
    }

    // Grid Card Preview
    return (
      <div className={`relative w-full h-full flex items-center justify-center bg-[#111111] overflow-hidden ${className}`}>
        <video
          ref={cardVideoRef}
          src={mediaSrc}
          poster={posterSrc}
          muted
          loop
          playsInline
          preload="metadata"
          className="w-auto h-auto max-w-full max-h-full object-contain select-none transition-transform duration-300"
        />

        {/* First frame play icon indicator on mobile and when not hovering */}
        <div
          className={`absolute inset-0 flex items-center justify-center pointer-events-none transition-opacity duration-200 ${
            isCardHovered ? 'opacity-0' : 'opacity-100'
          }`}
        >
          <div className="w-11 h-11 rounded-full bg-[#0A0A0A]/85 border border-[#333333] flex items-center justify-center text-[#22C55E] shadow-xl backdrop-blur-xs">
            <Play className="w-4 h-4 fill-current ml-0.5 text-[#22C55E]" />
          </div>
        </div>
      </div>
    );
  }

  // Image Card & Modal
  return (
    <div
      className={`relative w-full h-full flex items-center justify-center ${
        isModal ? 'bg-[#0A0A0A]' : 'bg-[#111111]'
      } overflow-hidden ${className}`}
    >
      <img
        src={mediaSrc}
        alt={item.title}
        className={`w-auto h-auto max-w-full object-contain select-none ${
          isModal
            ? 'max-h-[75vh]'
            : 'max-h-full transition-transform duration-300'
        }`}
        loading="lazy"
      />
    </div>
  );
}


