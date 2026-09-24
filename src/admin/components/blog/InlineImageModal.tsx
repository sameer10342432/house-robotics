import React, { useState } from 'react';
import { X, Image as ImageIcon, AlignLeft, AlignCenter, AlignRight, Maximize2, FolderOpen, Upload } from 'lucide-react';
import { MediaLibraryModal } from './MediaLibraryModal';

interface InlineImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  onInsert: (data: {
    url: string;
    altText: string;
    caption: string;
    alignment: 'left' | 'center' | 'right' | 'full';
    widthPercent: number;
  }) => void;
}

export const InlineImageModal: React.FC<InlineImageModalProps> = ({
  isOpen,
  onClose,
  onInsert
}) => {
  const [url, setUrl] = useState('');
  const [altText, setAltText] = useState('');
  const [caption, setCaption] = useState('');
  const [alignment, setAlignment] = useState<'left' | 'center' | 'right' | 'full'>('center');
  const [widthPercent, setWidthPercent] = useState<number>(100);
  const [isMediaModalOpen, setIsMediaModalOpen] = useState(false);

  if (!isOpen) return null;

  const handleMediaSelect = (media: { url: string; altText: string; title?: string; caption?: string }) => {
    setUrl(media.url);
    if (!altText) setAltText(media.altText);
    if (media.caption && !caption) setCaption(media.caption);
    setIsMediaModalOpen(false);
  };

  const handleInsert = (e: React.FormEvent) => {
    e.preventDefault();
    if (!url.trim()) return;

    onInsert({
      url,
      altText: altText.trim() || 'House Robotics Article Illustration',
      caption: caption.trim(),
      alignment,
      widthPercent
    });

    // Reset
    setUrl('');
    setAltText('');
    setCaption('');
    setAlignment('center');
    setWidthPercent(100);
    onClose();
  };

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-900/60 backdrop-blur-xs">
        <div 
          className="w-full max-w-xl bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col border border-[#E9E7F2]"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="p-5 border-b border-[#E9E7F2] bg-[#FAF9FF] flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-violet-100 text-[#6D28D9] flex items-center justify-center">
                <ImageIcon className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-base font-bold text-neutral-900 font-['Space_Grotesk']">Insert Article Image</h3>
                <p className="text-[11px] text-neutral-500">Configure image alignment, responsive sizing, and SEO alt tags</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-white border border-[#E9E7F2] text-neutral-500 hover:text-neutral-900 flex items-center justify-center transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <form onSubmit={handleInsert} className="p-5 space-y-4">
            {/* Image Source Selection */}
            <div>
              <label className="text-[10px] font-bold text-neutral-600 uppercase tracking-wider block mb-1.5">
                Image Source *
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  required
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="https://... or /assets/..."
                  className="flex-1 px-3 py-2 rounded-xl border border-[#E9E7F2] text-xs text-neutral-900 focus:outline-none focus:border-[#6D28D9] bg-[#FAF9FF]"
                />
                <button
                  type="button"
                  onClick={() => setIsMediaModalOpen(true)}
                  className="btn-micro px-3.5 py-2 rounded-xl bg-[#6D28D9] hover:bg-[#5B21B6] text-white text-xs font-bold flex items-center gap-1.5 shrink-0 shadow-xs"
                >
                  <FolderOpen className="w-3.5 h-3.5" />
                  <span>Media Library</span>
                </button>
              </div>
            </div>

            {/* Preview if URL exists */}
            {url && (
              <div className="p-2 rounded-2xl border border-[#E9E7F2] bg-neutral-50 flex items-center justify-center max-h-36 overflow-hidden">
                <img
                  src={url}
                  alt={altText}
                  className="max-h-32 rounded-lg object-contain"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/assets/blog-ai-search.webp';
                  }}
                />
              </div>
            )}

            {/* Alt Text & Caption */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-[10px] font-bold text-neutral-600 uppercase tracking-wider block mb-1">
                  Alt Text * (SEO Mandatory)
                </label>
                <input
                  type="text"
                  required
                  value={altText}
                  onChange={(e) => setAltText(e.target.value)}
                  placeholder="Descriptive visual explanation..."
                  className="w-full px-3 py-1.5 rounded-xl border border-[#E9E7F2] text-xs text-neutral-900 focus:outline-none focus:border-[#6D28D9] bg-[#FAF9FF]"
                />
              </div>

              <div>
                <label className="text-[10px] font-bold text-neutral-600 uppercase tracking-wider block mb-1">
                  Visible Caption (Optional)
                </label>
                <input
                  type="text"
                  value={caption}
                  onChange={(e) => setCaption(e.target.value)}
                  placeholder="Figure 1.1: Architecture diagram..."
                  className="w-full px-3 py-1.5 rounded-xl border border-[#E9E7F2] text-xs text-neutral-900 focus:outline-none focus:border-[#6D28D9] bg-[#FAF9FF]"
                />
              </div>
            </div>

            {/* Alignment Options */}
            <div>
              <label className="text-[10px] font-bold text-neutral-600 uppercase tracking-wider block mb-1.5">
                Alignment
              </label>
              <div className="grid grid-cols-4 gap-2">
                {[
                  { id: 'left', label: 'Left Float', icon: AlignLeft },
                  { id: 'center', label: 'Center', icon: AlignCenter },
                  { id: 'right', label: 'Right Float', icon: AlignRight },
                  { id: 'full', label: 'Full Width', icon: Maximize2 }
                ].map((item) => {
                  const Icon = item.icon;
                  const isActive = alignment === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => {
                        setAlignment(item.id as any);
                        if (item.id === 'full') setWidthPercent(100);
                        else if (item.id === 'left' || item.id === 'right') setWidthPercent(50);
                      }}
                      className={`p-2.5 rounded-xl border flex flex-col items-center gap-1 transition-all text-xs font-semibold ${
                        isActive
                          ? 'border-[#6D28D9] bg-violet-50 text-[#6D28D9] shadow-xs'
                          : 'border-[#E9E7F2] text-neutral-600 hover:bg-[#FAF9FF]'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span className="text-[10px]">{item.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Sizing Slider */}
            <div>
              <div className="flex items-center justify-between text-xs font-semibold mb-1">
                <span className="text-[10px] font-bold text-neutral-600 uppercase tracking-wider">Image Width</span>
                <span className="text-neutral-900 font-mono text-xs">{widthPercent}%</span>
              </div>
              <input
                type="range"
                min="25"
                max="100"
                step="5"
                value={widthPercent}
                onChange={(e) => setWidthPercent(parseInt(e.target.value, 10))}
                className="w-full accent-[#6D28D9]"
              />
            </div>

            {/* Modal Actions */}
            <div className="pt-3 border-t border-[#E9E7F2] flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl border border-[#E9E7F2] text-xs font-semibold text-neutral-600 hover:bg-neutral-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={!url.trim()}
                className={`btn-micro px-5 py-2 rounded-xl bg-[#6D28D9] text-white text-xs font-bold shadow-xs hover:bg-[#5B21B6] ${
                  !url.trim() ? 'opacity-40 pointer-events-none' : ''
                }`}
              >
                Insert Image into Article
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Embedded Media Library for Image Inserter */}
      <MediaLibraryModal
        isOpen={isMediaModalOpen}
        onClose={() => setIsMediaModalOpen(false)}
        onSelect={handleMediaSelect}
        title="Select Image to Insert"
      />
    </>
  );
};
