import React, { useState, useEffect } from 'react';
import { X, Upload, Search, Image as ImageIcon, Check, Loader2, Trash2 } from 'lucide-react';
import { adminGetMedia, adminUploadFile } from '../../../utils/api';

interface MediaItem {
  id: string;
  filename: string;
  originalName: string;
  mimeType: string;
  size: number;
  url: string;
  altText?: string;
  title?: string;
  caption?: string;
  description?: string;
  uploadedBy?: string;
  createdAt: string;
}

interface MediaLibraryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (media: { url: string; altText: string; title?: string; caption?: string }) => void;
  title?: string;
}

export const MediaLibraryModal: React.FC<MediaLibraryModalProps> = ({
  isOpen,
  onClose,
  onSelect,
  title = 'Select from Media Library'
}) => {
  const [items, setItems] = useState<MediaItem[]>([]);
  const [search, setSearch] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedItem, setSelectedItem] = useState<MediaItem | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadAltText, setUploadAltText] = useState('');
  const [uploadError, setUploadError] = useState<string | null>(null);

  // Pre-seed some high-quality agency defaults if media table is empty
  const defaultAssets: MediaItem[] = [
    {
      id: 'default-1',
      filename: 'blog-ai-search.webp',
      originalName: 'Generative AI & Search Infrastructure',
      mimeType: 'image/webp',
      size: 450000,
      url: '/assets/blog-ai-search.webp',
      altText: 'Generative AI search architecture and technical SEO optimization visual',
      title: 'AI Search Systems',
      caption: 'Algorithmic search models and enterprise indexation',
      createdAt: new Date().toISOString()
    },
    {
      id: 'default-2',
      filename: 'blog-technical-seo.webp',
      originalName: 'Enterprise Technical SEO Audit Console',
      mimeType: 'image/webp',
      size: 520000,
      url: '/assets/blog-technical-seo.webp',
      altText: 'Technical SEO telemetry and crawl budget analysis visual',
      title: 'Technical SEO Audit',
      caption: 'Crawl budget optimization and Core Web Vitals',
      createdAt: new Date().toISOString()
    },
    {
      id: 'default-3',
      filename: 'blog-react-performance.webp',
      originalName: 'Modern Web Performance Architecture',
      mimeType: 'image/webp',
      size: 480000,
      url: '/assets/blog-react-performance.webp',
      altText: 'High-speed frontend performance telemetry and rendering pipeline',
      title: 'Web Performance Benchmark',
      caption: 'Sub-second interaction and edge cache distribution',
      createdAt: new Date().toISOString()
    },
    {
      id: 'default-4',
      filename: 'blog-page-hero.webp',
      originalName: 'Editorial Research Desk Hero',
      mimeType: 'image/webp',
      size: 610000,
      url: '/assets/blog-page-hero.webp',
      altText: 'House Robotics editorial research intelligence hero banner',
      title: 'Editorial Hero',
      caption: 'Strategic market research and autonomous agent models',
      createdAt: new Date().toISOString()
    },
    {
      id: 'default-5',
      filename: 'home-hero-visual.webp',
      originalName: 'House Robotics Core Command Center',
      mimeType: 'image/webp',
      size: 720000,
      url: '/assets/home-hero-visual.webp',
      altText: 'House Robotics agency intelligence command center',
      title: 'Command Center',
      caption: 'Full-service digital marketing & technology agency',
      createdAt: new Date().toISOString()
    }
  ];

  useEffect(() => {
    if (isOpen) {
      loadMedia();
    }
  }, [isOpen]);

  const loadMedia = async () => {
    setIsLoading(true);
    try {
      const res = await adminGetMedia({ limit: 50 });
      if (res.success && res.data && res.data.length > 0) {
        setItems(res.data);
      } else {
        setItems(defaultAssets);
      }
    } catch (e) {
      setItems(defaultAssets);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 10 * 1024 * 1024) {
      setUploadError('File size exceeds the 10MB limit.');
      return;
    }

    setIsUploading(true);
    setUploadError(null);

    try {
      const res = await adminUploadFile(file, {
        altText: uploadAltText || file.name.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' '),
        title: file.name.replace(/\.[^/.]+$/, '')
      });

      if (res.success && res.data) {
        const newMedia = res.data;
        setItems(prev => [newMedia, ...prev]);
        setSelectedItem(newMedia);
        setUploadAltText('');
      } else {
        setUploadError(res.message || 'Upload failed.');
      }
    } catch (err: any) {
      setUploadError(err.message || 'Upload failed.');
    } finally {
      setIsUploading(false);
      e.target.value = '';
    }
  };

  const handleConfirmSelect = () => {
    if (!selectedItem) return;
    onSelect({
      url: selectedItem.url,
      altText: selectedItem.altText || selectedItem.originalName || 'House Robotics Article Image',
      title: selectedItem.title || selectedItem.originalName,
      caption: selectedItem.caption || ''
    });
    onClose();
  };

  if (!isOpen) return null;

  const filteredItems = items.filter(item =>
    item.originalName?.toLowerCase().includes(search.toLowerCase()) ||
    item.altText?.toLowerCase().includes(search.toLowerCase()) ||
    item.filename?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-900/60 backdrop-blur-xs">
      <div 
        className="w-full max-w-4xl bg-white rounded-3xl shadow-2xl overflow-hidden max-h-[85vh] flex flex-col border border-[#E9E7F2]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="p-5 border-b border-[#E9E7F2] bg-[#FAF9FF] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-violet-100 text-[#6D28D9] flex items-center justify-center">
              <ImageIcon className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-neutral-900 font-['Space_Grotesk']">{title}</h3>
              <p className="text-[11px] text-neutral-500">Choose an existing media asset or upload an optimized image</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white border border-[#E9E7F2] text-neutral-500 hover:text-neutral-900 flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Toolbar: Upload & Search */}
        <div className="p-4 border-b border-[#E9E7F2] bg-white flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search images by name or alt text..."
              className="w-full pl-9 pr-3 py-1.5 rounded-xl border border-[#E9E7F2] text-xs text-neutral-900 bg-[#FAF9FF] focus:outline-none focus:border-[#6D28D9]"
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <label className={`btn-micro px-3.5 py-1.5 rounded-xl bg-[#6D28D9] hover:bg-[#5B21B6] text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-xs ${isUploading ? 'opacity-50 pointer-events-none' : ''}`}>
              {isUploading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Upload className="w-3.5 h-3.5" />}
              <span>{isUploading ? 'Uploading...' : 'Upload Image'}</span>
              <input
                type="file"
                accept="image/jpeg,image/png,image/webp,image/svg+xml,image/gif"
                onChange={handleFileUpload}
                className="hidden"
              />
            </label>
          </div>
        </div>

        {uploadError && (
          <div className="px-4 py-2 bg-red-50 text-red-700 text-xs border-b border-red-200">
            {uploadError}
          </div>
        )}

        {/* Grid & Details Panel */}
        <div className="flex-1 overflow-hidden grid grid-cols-1 md:grid-cols-12">
          {/* Gallery View */}
          <div className="md:col-span-8 p-4 overflow-y-auto max-h-[50vh] border-r border-[#E9E7F2]">
            {isLoading ? (
              <div className="py-20 text-center text-neutral-400">
                <Loader2 className="w-6 h-6 animate-spin mx-auto mb-2 text-[#6D28D9]" />
                <span className="text-xs">Loading media assets...</span>
              </div>
            ) : filteredItems.length === 0 ? (
              <div className="py-20 text-center text-neutral-400">
                <ImageIcon className="w-10 h-10 mx-auto mb-2 text-neutral-300" />
                <p className="text-xs">No media files found matching your search.</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {filteredItems.map((item) => {
                  const isSelected = selectedItem?.id === item.id || selectedItem?.url === item.url;
                  return (
                    <div
                      key={item.id}
                      onClick={() => setSelectedItem(item)}
                      className={`relative aspect-[4/3] rounded-xl overflow-hidden border-2 cursor-pointer transition-all group bg-neutral-100 ${
                        isSelected 
                          ? 'border-[#6D28D9] ring-2 ring-violet-200 shadow-md' 
                          : 'border-[#E9E7F2] hover:border-violet-300'
                      }`}
                    >
                      <img
                        src={item.url}
                        alt={item.altText || item.originalName}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = '/assets/blog-ai-search.webp';
                        }}
                      />
                      {isSelected && (
                        <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-[#6D28D9] text-white flex items-center justify-center shadow-md">
                          <Check className="w-3 h-3 stroke-[3]" />
                        </div>
                      )}
                      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-2 text-white">
                        <p className="text-[10px] font-bold truncate">{item.originalName || item.filename}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Asset Metadata Sidebar */}
          <div className="md:col-span-4 p-4 bg-[#FAF9FF] overflow-y-auto max-h-[50vh] space-y-4">
            {selectedItem ? (
              <div className="space-y-3">
                <div className="aspect-video rounded-xl overflow-hidden border border-[#E9E7F2] bg-white">
                  <img
                    src={selectedItem.url}
                    alt={selectedItem.altText || ''}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = '/assets/blog-ai-search.webp';
                    }}
                  />
                </div>

                <div className="space-y-1">
                  <h4 className="text-xs font-bold text-neutral-900 truncate">{selectedItem.originalName || selectedItem.filename}</h4>
                  <p className="text-[10px] text-neutral-400 font-mono break-all">{selectedItem.url}</p>
                </div>

                <div className="space-y-2 pt-2 border-t border-[#E9E7F2]">
                  <div>
                    <label className="text-[10px] font-bold text-neutral-700 uppercase tracking-wider block mb-1">
                      Alt Text (SEO Mandatory)
                    </label>
                    <input
                      type="text"
                      value={selectedItem.altText || ''}
                      onChange={(e) => setSelectedItem({ ...selectedItem, altText: e.target.value })}
                      placeholder="Descriptive image ALT text..."
                      className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-[#E9E7F2] bg-white text-neutral-900 focus:outline-none focus:border-[#6D28D9]"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] font-bold text-neutral-700 uppercase tracking-wider block mb-1">
                      Image Title
                    </label>
                    <input
                      type="text"
                      value={selectedItem.title || ''}
                      onChange={(e) => setSelectedItem({ ...selectedItem, title: e.target.value })}
                      placeholder="Image title attribute..."
                      className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-[#E9E7F2] bg-white text-neutral-900 focus:outline-none focus:border-[#6D28D9]"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] font-bold text-neutral-700 uppercase tracking-wider block mb-1">
                      Caption
                    </label>
                    <input
                      type="text"
                      value={selectedItem.caption || ''}
                      onChange={(e) => setSelectedItem({ ...selectedItem, caption: e.target.value })}
                      placeholder="Editorial caption to show under image..."
                      className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-[#E9E7F2] bg-white text-neutral-900 focus:outline-none focus:border-[#6D28D9]"
                    />
                  </div>
                </div>
              </div>
            ) : (
              <div className="py-16 text-center text-neutral-400">
                <p className="text-xs">Click any image to inspect metadata and select it for your article.</p>
              </div>
            )}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-[#E9E7F2] bg-white flex items-center justify-between">
          <div className="text-xs text-neutral-500">
            {selectedItem ? (
              <span>Selected: <strong className="text-neutral-900">{selectedItem.originalName || selectedItem.filename}</strong></span>
            ) : (
              <span>No image selected</span>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl border border-[#E9E7F2] text-xs font-semibold text-neutral-600 hover:bg-neutral-50"
            >
              Cancel
            </button>
            <button
              onClick={handleConfirmSelect}
              disabled={!selectedItem}
              className={`btn-micro px-5 py-2 rounded-xl bg-[#6D28D9] text-white text-xs font-bold shadow-xs hover:bg-[#5B21B6] transition-opacity ${
                !selectedItem ? 'opacity-40 pointer-events-none' : ''
              }`}
            >
              Use Selected Image
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
