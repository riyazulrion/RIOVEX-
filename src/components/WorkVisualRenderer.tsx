import React from 'react';
import { WorkItem } from '../types/portfolio.ts';

interface Props {
  item: WorkItem;
  customMediaUrl?: string | null;
  className?: string;
  isModal?: boolean;
}

export default function WorkVisualRenderer({
  item,
  customMediaUrl,
  className = '',
  isModal = false,
}: Props) {
  const mediaSrc = customMediaUrl || item.defaultImage;
  const isVideo =
    mediaSrc.startsWith('data:video') ||
    mediaSrc.endsWith('.mp4') ||
    mediaSrc.endsWith('.webm');

  if (isVideo) {
    return (
      <div className={`relative w-full h-full min-h-[280px] flex items-center justify-center bg-[#050505] overflow-hidden ${className}`}>
        <video
          src={mediaSrc}
          controls={isModal}
          autoPlay={!isModal}
          muted={!isModal}
          loop
          playsInline
          className="w-full h-full object-contain max-h-[75vh]"
        />
      </div>
    );
  }

  return (
    <div className={`relative w-full h-full min-h-[280px] flex items-center justify-center bg-[#050505] overflow-hidden ${className}`}>
      <img
        src={mediaSrc}
        alt={item.title}
        className={`w-full h-full object-cover ${
          isModal ? 'max-h-[75vh] object-contain' : 'transition-transform duration-300'
        }`}
        loading="lazy"
      />
    </div>
  );
}
