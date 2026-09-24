import React, { useState, useEffect } from 'react';
import { X, Link2, Search, ExternalLink, ArrowRight, Layers, FileText, Globe } from 'lucide-react';
import { adminGetInternalLinks } from '../../../utils/api';

interface LinkDestination {
  id: string;
  title: string;
  url: string;
  type: string; // 'Service Page' | 'Blog Article' | 'Site Page'
}

interface InternalLinkModalProps {
  isOpen: boolean;
  onClose: () => void;
  onInsert: (link: { url: string; text: string; openInNewTab: boolean }) => void;
  selectedText?: string;
}

export const InternalLinkModal: React.FC<InternalLinkModalProps> = ({
  isOpen,
  onClose,
  onInsert,
  selectedText = ''
}) => {
  const [destinations, setDestinations] = useState<LinkDestination[]>([]);
  const [search, setSearch] = useState('');
  const [selectedDest, setSelectedDest] = useState<LinkDestination | null>(null);
  const [linkText, setLinkText] = useState(selectedText);
  const [openInNewTab, setOpenInNewTab] = useState(false);
  const [filterType, setFilterType] = useState<string>('ALL');

  useEffect(() => {
    if (isOpen) {
      setLinkText(selectedText);
      loadDestinations();
    }
  }, [isOpen, selectedText]);

  const loadDestinations = async () => {
    try {
      const res = await adminGetInternalLinks();
      if (res.success && res.data && res.data.length > 0) {
        setDestinations(res.data);
      } else {
        // Fallback default list
        setDestinations([
          { id: 'p-1', title: 'Home Page', url: '/', type: 'Site Page' },
          { id: 'p-2', title: 'Services Overview', url: '/services', type: 'Site Page' },
          { id: 'p-3', title: 'Technical SEO & Audit Services', url: '/services/seo', type: 'Service Page' },
          { id: 'p-4', title: 'AI Automation & Autonomous Systems', url: '/services/ai-automation', type: 'Service Page' },
          { id: 'p-5', title: 'Custom Web & Headless Architecture', url: '/services/web-development', type: 'Service Page' },
          { id: 'p-6', title: 'PPC & Algorithmic Ad Optimization', url: '/services/ppc', type: 'Service Page' },
          { id: 'p-7', title: 'Social Media Strategy & Authority', url: '/services/social-media', type: 'Service Page' },
          { id: 'p-8', title: 'About House Robotics Desk', url: '/about', type: 'Site Page' },
          { id: 'p-9', title: 'Free 30-Min Consultation', url: '/contact', type: 'Site Page' },
          { id: 'b-1', title: 'The 2026 AI Search Engine Paradigm', url: '/blog/ai-search-engines-optimization-2026', type: 'Blog Article' },
          { id: 'b-2', title: 'Technical SEO Framework: Auditing Modern Single Page Apps', url: '/blog/technical-seo-audit-framework-react-spa', type: 'Blog Article' },
          { id: 'b-3', title: 'React 19 & Next.js Core Web Vitals Optimization', url: '/blog/core-web-vitals-react-nextjs-performance', type: 'Blog Article' }
        ]);
      }
    } catch {
      // Fallback
    }
  };

  if (!isOpen) return null;

  const filtered = destinations.filter(d => {
    const matchesSearch = d.title.toLowerCase().includes(search.toLowerCase()) || d.url.toLowerCase().includes(search.toLowerCase());
    const matchesType = filterType === 'ALL' || d.type === filterType;
    return matchesSearch && matchesType;
  });

  const handleInsert = () => {
    if (!selectedDest) return;
    onInsert({
      url: selectedDest.url,
      text: linkText.trim() || selectedDest.title,
      openInNewTab
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-900/60 backdrop-blur-xs">
      <div 
        className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col border border-[#E9E7F2]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 border-b border-[#E9E7F2] bg-[#FAF9FF] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-violet-100 text-[#6D28D9] flex items-center justify-center">
              <Link2 className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-neutral-900 font-['Space_Grotesk']">Insert Internal Link</h3>
              <p className="text-[11px] text-neutral-500">Link directly to agency services, case studies, or published articles to build SEO link equity</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white border border-[#E9E7F2] text-neutral-500 hover:text-neutral-900 flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Input Fields */}
        <div className="p-4 border-b border-[#E9E7F2] bg-white space-y-3">
          <div>
            <label className="text-[10px] font-bold text-neutral-600 uppercase tracking-wider block mb-1">
              Anchor Text (Visible Link Text)
            </label>
            <input
              type="text"
              value={linkText}
              onChange={(e) => setLinkText(e.target.value)}
              placeholder="e.g. Enterprise SEO audit framework"
              className="w-full px-3 py-1.5 rounded-xl border border-[#E9E7F2] text-xs text-neutral-900 focus:outline-none focus:border-[#6D28D9] bg-[#FAF9FF]"
            />
          </div>

          <div className="flex items-center justify-between gap-3 pt-1">
            <div className="relative flex-1">
              <Search className="w-3.5 h-3.5 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search services, blog posts, pages..."
                className="w-full pl-8 pr-3 py-1.5 rounded-xl border border-[#E9E7F2] text-xs text-neutral-900 focus:outline-none focus:border-[#6D28D9]"
              />
            </div>

            <div className="flex items-center gap-1 text-[11px]">
              {['ALL', 'Service Page', 'Blog Article', 'Site Page'].map((t) => (
                <button
                  key={t}
                  onClick={() => setFilterType(t)}
                  className={`px-2 py-1 rounded-lg font-semibold transition-all ${
                    filterType === t 
                      ? 'bg-[#6D28D9] text-white shadow-xs' 
                      : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                  }`}
                >
                  {t === 'ALL' ? 'All' : t.replace(' Page', '')}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Destinations List */}
        <div className="p-3 overflow-y-auto max-h-[40vh] space-y-1.5 divide-y divide-neutral-100">
          {filtered.length === 0 ? (
            <div className="py-12 text-center text-neutral-400 text-xs">
              No matching destinations found.
            </div>
          ) : (
            filtered.map((item) => {
              const isSelected = selectedDest?.url === item.url;
              return (
                <div
                  key={item.id}
                  onClick={() => {
                    setSelectedDest(item);
                    if (!linkText.trim()) setLinkText(item.title);
                  }}
                  className={`p-3 rounded-xl cursor-pointer flex items-center justify-between transition-all ${
                    isSelected 
                      ? 'bg-violet-50 border border-violet-200 text-[#6D28D9]' 
                      : 'hover:bg-[#FAF9FF] text-neutral-800'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${
                      item.type === 'Service Page'
                        ? 'bg-blue-100 text-blue-700'
                        : item.type === 'Blog Article'
                        ? 'bg-purple-100 text-purple-700'
                        : 'bg-emerald-100 text-emerald-700'
                    }`}>
                      {item.type === 'Service Page' ? <Layers className="w-3.5 h-3.5" /> : item.type === 'Blog Article' ? <FileText className="w-3.5 h-3.5" /> : <Globe className="w-3.5 h-3.5" />}
                    </div>
                    <div>
                      <h4 className="text-xs font-bold leading-tight">{item.title}</h4>
                      <p className="text-[10px] text-neutral-400 font-mono">{item.url}</p>
                    </div>
                  </div>

                  <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded bg-neutral-100 text-neutral-500">
                    {item.type}
                  </span>
                </div>
              );
            })
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-[#E9E7F2] bg-[#FAF9FF] flex items-center justify-between">
          <label className="flex items-center gap-2 cursor-pointer text-xs text-neutral-600 select-none">
            <input
              type="checkbox"
              checked={openInNewTab}
              onChange={(e) => setOpenInNewTab(e.target.checked)}
              className="rounded text-[#6D28D9] focus:ring-[#6D28D9]"
            />
            <span>Open in new tab (`target="_blank"`)</span>
          </label>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-3 py-1.5 rounded-xl border border-[#E9E7F2] text-xs font-semibold text-neutral-600 hover:bg-neutral-50"
            >
              Cancel
            </button>
            <button
              onClick={handleInsert}
              disabled={!selectedDest}
              className={`btn-micro px-4 py-1.5 rounded-xl bg-[#6D28D9] text-white text-xs font-bold shadow-xs hover:bg-[#5B21B6] ${
                !selectedDest ? 'opacity-40 pointer-events-none' : ''
              }`}
            >
              Insert Link
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
