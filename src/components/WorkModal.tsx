import React, { useState, useRef, useEffect } from 'react';
import { X, Upload, RotateCcw, Link as LinkIcon } from 'lucide-react';
import { WorkItem } from '../types/portfolio.ts';
import WorkVisualRenderer from './WorkVisualRenderer.tsx';
import { saveMedia, clearSavedMedia } from '../utils/portfolioUtils.ts';
import { useLanguage } from '../context/LanguageContext.tsx';

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
  const { t } = useLanguage();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!item) return null;

  const mediaSrc = customMediaUrl || item.defaultImage;
  const isVideo =
    item.tag === '[AI VIDEO]' ||
    item.category === 'AI VIDEO' ||
    item.tag === '[এআই ভিডিও]' ||
    mediaSrc.endsWith('.mp4') ||
    mediaSrc.endsWith('.webm') ||
    mediaSrc.startsWith('data:video');

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 8 * 1024 * 1024) {
      onShowToast('File exceeds 8MB. Paste direct image URL recommended.');
    }

    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      saveMedia(item.id, result);
      onMediaUpdated(item.id, result);
      onShowToast(`${t.toast.updatedArtwork} "${item.title}".`);
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
    onShowToast(`${t.toast.appliedUrl} "${item.title}".`);
  };

  const handleResetMedia = () => {
    clearSavedMedia(item.id);
    onMediaUpdated(item.id, null);
    onShowToast(`${t.toast.resetArtwork} "${item.title}".`);
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
        className="relative w-full max-w-5xl bg-[#111111] border border-[#262626] rounded-[4px] shadow-2xl overflow-hidden my-auto animate-in fade-in duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Responsive Layout: Desktop 2 columns (Artwork Left, Details Right) */}
        <div className="flex flex-col lg:flex-row min-h-[500px]">
          {/* Left Column: Artwork Image */}
          <div className="relative flex-1 lg:w-[58%] bg-[#0A0A0A] p-4 sm:p-6 lg:p-8 flex items-center justify-center border-b lg:border-b-0 lg:border-r border-[#222222] min-h-[320px] sm:min-h-[440px] lg:min-h-[620px]">
            <div className="w-full h-full flex items-center justify-center">
              <WorkVisualRenderer item={item} customMediaUrl={customMediaUrl} isModal={true} />
            </div>
          </div>

          {/* Right Column: Title, tag, description, OPEN FULL SIZE button, replacement controls */}
          <div className="lg:w-[42%] bg-[#111111] p-6 sm:p-8 flex flex-col justify-between">
            <div>
              {/* Header: Tags & Close button */}
              <div className="flex items-center justify-between gap-3 pb-4 border-b border-[#222222]">
                <div className="flex items-center gap-2.5">
                  <span className="font-mono text-[11px] font-bold text-[#F2F2F2] bg-[#1a1a1a] border border-[#2a2a2a] px-2 py-0.5 rounded-[2px] tracking-[0.18em]">
                    {item.num}
                  </span>
                  <span className="font-mono text-[10px] text-[#8A8A8A] tracking-[0.18em] uppercase">
                    {item.tag} // {item.category}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={onClose}
                  className="p-1.5 text-[#8A8A8A] hover:text-[#F2F2F2] hover:bg-[#1a1a1a] rounded-[2px] transition-colors cursor-pointer"
                  aria-label={t.modal.close}
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Title in bold uppercase Space Grotesk */}
              <h3 className="font-heading text-2xl sm:text-3xl font-bold text-[#F2F2F2] uppercase tracking-[-0.04em] leading-[0.95] mt-5 mb-4">
                {item.title}
              </h3>

              {/* Small "OPEN FULL SIZE ↗" mono button */}
              <div className="mb-6">
                <a
                  href={mediaSrc}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 font-mono text-[11px] font-bold tracking-[0.14em] uppercase text-[#F2F2F2] hover:text-[#0A0A0A] bg-[#181818] hover:bg-[#F2F2F2] border border-[#2a2a2a] hover:border-[#F2F2F2] px-3.5 py-2 rounded-[2px] transition-all duration-150 cursor-pointer group"
                >
                  <span>{t.modal.openFullSize}</span>
                  <span className="text-xs transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">↗</span>
                </a>
              </div>

              {/* Description */}
              <div className="space-y-2 mb-6">
                <span className="font-mono text-[10px] text-[#666666] tracking-[0.18em] uppercase block">
                  {t.modal.projectBrief}
                </span>
                <p className="font-body text-[#A1A1A1] text-sm leading-[1.7]">
                  {item.description}
                </p>
              </div>

              {/* Metadata specs */}
              <div className="grid grid-cols-2 gap-3 p-3.5 bg-[#0D0D0D] border border-[#1F1F1F] rounded-[2px] mb-6 font-mono text-[11px]">
                <div>
                  <span className="text-[#666] block tracking-[0.14em] text-[10px] uppercase">
                    {isVideo ? t.modal.format : t.modal.aspectRatio}
                  </span>
                  <span className="text-[#F2F2F2] font-semibold tracking-wider">
                    {isVideo ? 'MP4 VIDEO' : 'ORIGINAL'}
                  </span>
                </div>
                <div>
                  <span className="text-[#666] block tracking-[0.14em] text-[10px] uppercase">
                    {t.modal.status}
                  </span>
                  <span className="text-[#22C55E] font-semibold tracking-wider flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#22C55E] inline-block animate-pulse"></span>
                    {t.modal.active}
                  </span>
                </div>
              </div>
            </div>

            {/* Bottom: Replace Artwork / Video Section */}
            <div className="pt-4 border-t border-[#1F1F1F]">
              <div className="p-3.5 rounded-[2px] bg-[#0E0E0E] border border-[#222222]">
                <div className="flex items-center justify-between mb-3">
                  <span className="font-mono text-[10px] font-bold tracking-[0.16em] uppercase text-[#8A8A8A] flex items-center gap-1.5">
                    <Upload className="w-3.5 h-3.5 text-[#22C55E]" />
                    <span>{isVideo ? t.modal.replaceVideo : t.modal.replaceArtwork}</span>
                  </span>

                  {customMediaUrl && (
                    <button
                      type="button"
                      onClick={handleResetMedia}
                      className="font-mono text-[10px] text-[#8A8A8A] hover:text-[#EF4444] flex items-center gap-1 transition-colors cursor-pointer"
                      title={isVideo ? t.modal.resetOriginalVideo : t.modal.resetOriginal}
                    >
                      <RotateCcw className="w-3 h-3" />
                      <span>RESET</span>
                    </button>
                  )}
                </div>

                {!isUrlMode ? (
                  <div className="space-y-2">
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleFileUpload}
                      accept={isVideo ? 'video/mp4,video/*' : 'image/*'}
                      className="hidden"
                      aria-label="Upload artwork or video file"
                    />

                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="w-full font-mono text-[11px] font-bold tracking-[0.12em] uppercase bg-[#181818] hover:bg-[#F2F2F2] text-[#F2F2F2] hover:text-[#0A0A0A] border border-[#2A2A2A] hover:border-[#F2F2F2] py-2.5 px-3 rounded-[2px] transition-all flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <Upload className="w-3.5 h-3.5" />
                      <span>{isVideo ? t.modal.replaceVideo : t.modal.replaceArtwork}</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setIsUrlMode(true)}
                      className="w-full font-mono text-[10px] text-[#666] hover:text-[#A1A1A1] transition-colors py-1 flex items-center justify-center gap-1.5 cursor-pointer uppercase tracking-wider"
                    >
                      <LinkIcon className="w-3 h-3" />
                      <span>{t.modal.pastePrompt}</span>
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleApplyUrl} className="space-y-2">
                    <input
                      type="url"
                      value={urlInput}
                      onChange={(e) => setUrlInput(e.target.value)}
                      placeholder={t.modal.urlPlaceholder}
                      className="w-full bg-[#141414] border border-[#2A2A2A] text-xs font-mono text-[#F2F2F2] px-3 py-2 rounded-[2px] focus:outline-none focus:border-[#F2F2F2]"
                    />
                    <div className="flex gap-2">
                      <button
                        type="submit"
                        className="flex-1 font-mono text-[11px] font-bold bg-[#F2F2F2] text-[#0A0A0A] py-1.5 rounded-[2px] transition-colors cursor-pointer"
                      >
                        {t.modal.applyUrl}
                      </button>
                      <button
                        type="button"
                        onClick={() => setIsUrlMode(false)}
                        className="font-mono text-[11px] text-[#8A8A8A] hover:text-[#F2F2F2] px-3 py-1.5 border border-[#2A2A2A] rounded-[2px] cursor-pointer"
                      >
                        CANCEL
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
