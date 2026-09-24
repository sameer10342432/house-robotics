import React, { useEffect, useState } from 'react';
import { 
  UploadCloud, 
  Trash2, 
  Copy, 
  Check, 
  Search, 
  File, 
  Image as ImageIcon 
} from 'lucide-react';
import { adminGetMedia, adminUploadFile, adminDeleteMedia } from '../../utils/api';

export const MediaView: React.FC = () => {
  const [mediaList, setMediaList] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  useEffect(() => {
    loadMedia();
  }, []);

  const loadMedia = async () => {
    setIsLoading(true);
    try {
      const res = await adminGetMedia();
      if (res.success && res.data) {
        setMediaList(res.data);
      }
    } catch (e) {
      console.error('Failed to load media', e);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setIsUploading(true);
    try {
      for (let i = 0; i < files.length; i++) {
        await adminUploadFile(files[i]);
      }
      loadMedia();
    } catch (e) {
      console.error('Upload failed', e);
    } finally {
      setIsUploading(false);
    }
  };

  const handleCopyUrl = (url: string, id: string) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleDelete = async (id: string, name: string) => {
    if (!window.confirm(`Delete media item "${name}"?`)) return;
    try {
      const res = await adminDeleteMedia(id);
      if (res.success) {
        setMediaList(prev => prev.filter(m => m.id !== id));
      }
    } catch (e) {
      console.error('Failed to delete media', e);
    }
  };

  return (
    <div className="space-y-6 p-6 lg:p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-extrabold text-neutral-900 font-['Space_Grotesk']">
            Media Library &amp; Asset Management
          </h2>
          <p className="text-xs text-neutral-500">
            Upload images, banners, and vector assets for services, articles, and meta tags.
          </p>
        </div>

        {/* Upload Trigger */}
        <label className="btn-micro px-4 py-2.5 rounded-xl bg-[#6D28D9] hover:bg-[#5B21B6] text-white text-xs font-bold flex items-center gap-1.5 shadow-md cursor-pointer self-start sm:self-auto">
          <UploadCloud className="w-4 h-4" />
          <span>{isUploading ? 'Uploading File...' : 'Upload Media'}</span>
          <input
            type="file"
            multiple
            accept="image/*,application/pdf"
            onChange={handleFileUpload}
            disabled={isUploading}
            className="hidden"
          />
        </label>
      </div>

      {/* Media Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {isLoading ? (
          <div className="col-span-full py-16 text-center text-neutral-400">
            <div className="w-6 h-6 border-2 border-violet-600 border-t-transparent rounded-full animate-spin mx-auto mb-2" />
            Loading media assets...
          </div>
        ) : mediaList.length === 0 ? (
          <div className="col-span-full py-16 text-center text-neutral-400 bg-white rounded-3xl border border-[#E9E7F2] p-8">
            <UploadCloud className="w-10 h-10 text-neutral-300 mx-auto mb-2" />
            <p className="text-xs">No uploaded media files yet.</p>
            <p className="text-[11px] text-neutral-400 mt-1">Upload images above to store them in your local and production uploads directory.</p>
          </div>
        ) : (
          mediaList.map((m) => (
            <div
              key={m.id}
              className="bg-white rounded-2xl border border-[#E9E7F2] overflow-hidden p-2.5 shadow-xs space-y-2 group hover:shadow-md transition-shadow"
            >
              <div className="aspect-square rounded-xl bg-neutral-100 overflow-hidden flex items-center justify-center relative">
                {m.mimeType?.startsWith('image') ? (
                  <img
                    src={m.url}
                    alt={m.altText || m.originalName}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <File className="w-8 h-8 text-neutral-400" />
                )}
              </div>

              <div className="space-y-1">
                <p className="font-semibold text-neutral-800 text-[11px] truncate" title={m.originalName}>
                  {m.originalName}
                </p>
                <p className="text-[10px] text-neutral-400 font-mono">
                  {(m.size / 1024).toFixed(1)} KB
                </p>
              </div>

              <div className="flex items-center justify-between pt-1 border-t border-neutral-100">
                <button
                  onClick={() => handleCopyUrl(m.url, m.id)}
                  className="px-2 py-1 rounded bg-neutral-100 hover:bg-neutral-200 text-neutral-700 text-[10px] font-bold flex items-center gap-1 transition-colors"
                  title="Copy asset URL"
                >
                  {copiedId === m.id ? (
                    <>
                      <Check className="w-3 h-3 text-emerald-600" />
                      <span className="text-emerald-700">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3" />
                      <span>URL</span>
                    </>
                  )}
                </button>
                <button
                  onClick={() => handleDelete(m.id, m.originalName)}
                  className="p-1 rounded text-red-500 hover:bg-red-50 transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
