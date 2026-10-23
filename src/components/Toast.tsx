import React, { useEffect } from 'react';
import { Check, X } from 'lucide-react';

interface Props {
  message: string | null;
  onClose: () => void;
}

export default function Toast({ message, onClose }: Props) {
  useEffect(() => {
    if (!message) return;
    const timer = setTimeout(() => {
      onClose();
    }, 2800);
    return () => clearTimeout(timer);
  }, [message, onClose]);

  if (!message) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-4 py-3 rounded-[2px] bg-[#111111] text-[#F2F2F2] border border-[#262626] shadow-xl font-mono text-xs uppercase tracking-wider animate-in fade-in duration-150"
    >
      <span className="w-1.5 h-1.5 rounded-full bg-[#22C55E]" />
      <span className="font-medium">{message}</span>
      <button
        type="button"
        onClick={onClose}
        className="p-1 text-[#666] hover:text-[#F2F2F2] transition-colors ml-2"
        aria-label="Dismiss notification"
      >
        <X className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}
