import React, { useState, useRef, useEffect } from 'react';
import { X, Upload, RotateCcw, Link as LinkIcon } from 'lucide-react';
import { WorkItem } from '../types/portfolio.ts';
import WorkVisualRenderer from './WorkVisualRenderer.tsx';
import { saveMedia, clearSavedMedia } from '../utils/portfolioUtils.ts';

interface Props {
  item: WorkItem | null;
  customMediaUrl: string | null;
  onClose: () => void;
  onMediaUpdated: (itemId: string, newUrl: string | null) => void;
  onShowToast: (msg: string) => void;
}

export default function WorkModal({
  item,
  customMediaUrl,
  onClose,
  onMediaUpdated,
  onShowToast,
}: Props) {
  const [urlInput, setUrlInput] = useState('');
  const [isUrlMode, setIsUrlMode] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!item) return null;

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 8 * 1024 * 1024) {
      onShowToast('File exceeds 8MB. Paste direct image URL recommended.');
    }

    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      const success = saveMedia(item.id, result);
      if (success) {
        onMediaUpdated(item.id, result);
        onShowToast(`Updated artwork for "${item.title}".`);
      } else {
        onShowToast('Storage full. Please paste an image URL instead.');
      }
    };
    reader.readAsDataURL(file);
  };

  const handleApplyUrl = (e: React.FormEvent) => {
    e.preventDefault();
    if (!urlInput.trim()) return;
    saveMedia(item.id, urlInput.trim());
    onMediaUpdated(item.id, urlInput.trim());
    setUrlInput('');
    setIsUrlMode(false);
    onShowToast(`Applied custom URL for "${item.title}".`);
  };

  const handleResetMedia = () => {
    clearSavedMedia(item.id);
    onMediaUpdated(item.id, null);
    onShowToast(`Reset "${item.title}" to default artwork.`);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`${item.title} Preview`}
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/95 backdrop-blur-sm overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl bg-[#111111] border border-[#262626] rounded-[4px] shadow-2xl overflow-hidden my-auto animate-in fade-in duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#222222] bg-[#0E0E0E]">
          <div className="flex items-center gap-3">
            <span className="font-mono text-[11px] font-bold text-[#F2F2F2] bg-[#1a1a1a] border border-[#2a2a2a] px-2 py-0.5 rounded-[2px] tracking-[0.18em]">
              {item.num}
            </span>
            <div>
              <span className="font-mono text-[10px] text-[#8A8A8A] tracking-[0.18em] uppercase block">
                {item.tag} // {item.category}
              </span>
              <h3 className="font-heading text-lg sm:text-xl font-bold text-[#F2F2F2] uppercase tracking-[-0.04em]">
                {item.title}
              </h3>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 text-[#8A8A8A] hover:text-[#F2F2F2] hover:bg-[#1a1a1a] rounded-[2px] transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body: Large Visual */}
        <div className="p-6">
          <div className="max-h-[65vh] overflow-hidden rounded-[2px] border border-[#222222] bg-[#0A0A0A] flex items-center justify-center">
            <WorkVisualRenderer item={item} customMediaUrl={customMediaUrl} isModal={true} />
          </div>

          {/* Description & Metadata */}
          <div className="mt-5 space-y-4">
            <p className="font-body text-[#A1A1A1] text-sm leading-[1.7] max-w-2xl">
              {item.description}
            </p>

            {/* Replace Controls Bar */}
            <div className="p-4 rounded-[3px] bg-[#0E0E0E] border border-[#222222] mt-4">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div>
                  <h4 className="font-mono text-xs font-bold text-[#F2F2F2] tracking-[0.12em] uppercase">
                    REPLACE ARTWORK IMAGE
                  </h4>
                  <p className="font-mono text-[11px] text-[#666] tracking-[0.06em] mt-0.5">
                    Upload an image file or paste an image link to update this card.
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto font-mono text-xs">
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleFileUpload}
                  />

                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-4 py-2 font-bold tracking-[0.12em] uppercase bg-[#F2F2F2] text-[#0A0A0A] hover:bg-[#0A0A0A] hover:text-[#F2F2F2] border border-[#F2F2F2] rounded-[2px] transition-all cursor-pointer"
                  >
                    <Upload className="w-3.5 h-3.5" />
                    UPLOAD FILE
                  </button>

                  <button
                    type="button"
                    onClick={() => setIsUrlMode(!isUrlMode)}
                    className="inline-flex items-center justify-center gap-1.5 px-3 py-2 font-semibold tracking-[0.12em] uppercase bg-[#181818] hover:bg-[#222222] text-[#8A8A8A] hover:text-[#F2F2F2] border border-[#262626] rounded-[2px] transition-all cursor-pointer"
                  >
                    <LinkIcon className="w-3.5 h-3.5" />
                    {isUrlMode ? 'CANCEL' : 'PASTE URL'}
                  </button>

                  {customMediaUrl && (
                    <button
                      type="button"
                      onClick={handleResetMedia}
                      className="inline-flex items-center justify-center gap-1.5 px-3 py-2 font-semibold tracking-[0.12em] uppercase bg-transparent hover:bg-[#1f1414] text-[#888] hover:text-[#F2F2F2] border border-[#332222] rounded-[2px] transition-all cursor-pointer"
                      title="Reset back to default artwork"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      RESET
                    </button>
                  )}
                </div>
              </div>

              {/* Paste URL Input Drawer */}
              {isUrlMode && (
                <form onSubmit={handleApplyUrl} className="mt-3 flex gap-2 font-mono text-xs">
                  <input
                    type="url"
                    value={urlInput}
                    onChange={(e) => setUrlInput(e.target.value)}
                    placeholder="https://example.com/poster.png"
                    className="flex-1 px-3 py-2 bg-[#0A0A0A] border border-[#333333] rounded-[2px] text-[#F2F2F2] placeholder-[#555] focus:outline-none focus:border-[#F2F2F2]"
                    required
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 font-bold uppercase tracking-wider bg-[#F2F2F2] text-[#0A0A0A] hover:bg-[#0A0A0A] hover:text-[#F2F2F2] border border-[#F2F2F2] rounded-[2px] transition-colors cursor-pointer"
                  >
                    APPLY
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
