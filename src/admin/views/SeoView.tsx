import React, { useEffect, useState } from 'react';
import { 
  Globe, 
  Search, 
  Edit2, 
  Save, 
  X, 
  CheckCircle2, 
  AlertCircle 
} from 'lucide-react';
import { adminGetSeo, adminUpdateSeo } from '../../utils/api';

export const SeoView: React.FC = () => {
  const [seoList, setSeoList] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editingItem, setEditingItem] = useState<any | null>(null);

  const [formData, setFormData] = useState({
    pagePath: '',
    seoTitle: '',
    metaDescription: '',
    focusKeyword: '',
    canonicalUrl: '',
    noIndex: false
  });

  useEffect(() => {
    loadSeo();
  }, []);

  const loadSeo = async () => {
    setIsLoading(true);
    try {
      const res = await adminGetSeo();
      if (res.success && res.data) {
        setSeoList(res.data);
      }
    } catch (e) {
      console.error('Failed to load SEO', e);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOpenEdit = (item: any) => {
    setEditingItem(item);
    setFormData({
      pagePath: item.pagePath || '',
      seoTitle: item.seoTitle || '',
      metaDescription: item.metaDescription || '',
      focusKeyword: item.focusKeyword || '',
      canonicalUrl: item.canonicalUrl || '',
      noIndex: item.noIndex || false
    });
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await adminUpdateSeo(formData);
      if (res.success) {
        loadSeo();
        setEditingItem(null);
      }
    } catch (e) {
      console.error('Failed to save SEO metadata', e);
    }
  };

  return (
    <div className="space-y-6 p-6 lg:p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-extrabold text-neutral-900 font-['Space_Grotesk']">
          Search Engine Optimization (SEO) &amp; OpenGraph Meta
        </h2>
        <p className="text-xs text-neutral-500">
          Fine-tune search title tags, meta descriptions, and Google indexing attributes for key pages.
        </p>
      </div>

      {/* SEO Table */}
      <div className="bg-white rounded-3xl border border-[#E9E7F2] shadow-xs overflow-hidden">
        <table className="w-full text-left text-xs">
          <thead className="bg-[#FAF9FF] text-neutral-500 uppercase tracking-wider font-semibold border-b border-[#E9E7F2]">
            <tr>
              <th className="py-3.5 px-4">Page Path</th>
              <th className="py-3.5 px-4">Title Tag</th>
              <th className="py-3.5 px-4">Meta Description Snippet</th>
              <th className="py-3.5 px-4">Focus Keyword</th>
              <th className="py-3.5 px-4">Robots</th>
              <th className="py-3.5 px-4 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-100 text-neutral-700">
            {isLoading ? (
              <tr>
                <td colSpan={6} className="py-12 text-center text-neutral-400">
                  <div className="w-6 h-6 border-2 border-violet-600 border-t-transparent rounded-full animate-spin mx-auto mb-2" />
                  Loading SEO configurations...
                </td>
              </tr>
            ) : (
              seoList.map((item) => (
                <tr key={item.id} className="hover:bg-[#FAF9FF]/50 transition-colors">
                  <td className="py-3.5 px-4 font-mono font-bold text-[#6D28D9]">
                    {item.pagePath}
                  </td>
                  <td className="py-3.5 px-4 font-semibold text-neutral-900 max-w-xs truncate">
                    {item.seoTitle}
                  </td>
                  <td className="py-3.5 px-4 text-neutral-600 max-w-sm truncate">
                    {item.metaDescription}
                  </td>
                  <td className="py-3.5 px-4 font-mono text-neutral-500">
                    {item.focusKeyword || '—'}
                  </td>
                  <td className="py-3.5 px-4">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${
                      item.noIndex 
                        ? 'bg-red-50 text-red-700 border-red-200' 
                        : 'bg-emerald-50 text-emerald-700 border-emerald-200'
                    }`}>
                      {item.noIndex ? 'noindex' : 'index, follow'}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <button
                      onClick={() => handleOpenEdit(item)}
                      className="px-3 py-1.5 rounded-lg bg-neutral-100 hover:bg-neutral-200 text-neutral-700 font-bold transition-colors"
                    >
                      Configure
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Edit Modal */}
      {editingItem && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-900/60 backdrop-blur-xs"
          onClick={() => setEditingItem(null)}
        >
          <div
            className="w-full max-w-xl bg-white rounded-3xl shadow-2xl p-6 sm:p-8 space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-[#E9E7F2] pb-3">
              <h3 className="text-base font-bold text-neutral-900">
                Configure SEO for <span className="text-[#6D28D9] font-mono">{editingItem.pagePath}</span>
              </h3>
              <button
                onClick={() => setEditingItem(null)}
                className="w-7 h-7 rounded-full bg-neutral-100 hover:bg-neutral-200 flex items-center justify-center text-neutral-500"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-neutral-700 mb-1">SEO Meta Title *</label>
                <input
                  type="text"
                  required
                  value={formData.seoTitle}
                  onChange={(e) => setFormData({ ...formData, seoTitle: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-[#E9E7F2] bg-[#FAF9FF] text-neutral-900 focus:outline-none focus:border-[#6D28D9]"
                />
              </div>

              <div>
                <label className="block font-bold text-neutral-700 mb-1">Meta Description *</label>
                <textarea
                  rows={3}
                  required
                  value={formData.metaDescription}
                  onChange={(e) => setFormData({ ...formData, metaDescription: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-[#E9E7F2] bg-[#FAF9FF] text-neutral-900 focus:outline-none focus:border-[#6D28D9]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-neutral-700 mb-1">Focus Keyword</label>
                  <input
                    type="text"
                    value={formData.focusKeyword}
                    onChange={(e) => setFormData({ ...formData, focusKeyword: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-[#E9E7F2] bg-[#FAF9FF] text-neutral-900 focus:outline-none focus:border-[#6D28D9]"
                  />
                </div>

                <div>
                  <label className="block font-bold text-neutral-700 mb-1">Canonical URL</label>
                  <input
                    type="text"
                    value={formData.canonicalUrl}
                    onChange={(e) => setFormData({ ...formData, canonicalUrl: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-[#E9E7F2] bg-[#FAF9FF] text-neutral-900 focus:outline-none focus:border-[#6D28D9]"
                  />
                </div>
              </div>

              <div className="pt-2">
                <label className="flex items-center gap-2 cursor-pointer font-bold text-neutral-700">
                  <input
                    type="checkbox"
                    checked={formData.noIndex}
                    onChange={(e) => setFormData({ ...formData, noIndex: e.target.checked })}
                    className="rounded border-neutral-300 text-[#6D28D9]"
                  />
                  <span>No-Index this page (Hide from Search Engines)</span>
                </label>
              </div>

              <div className="pt-3 border-t border-[#E9E7F2] flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setEditingItem(null)}
                  className="px-4 py-2 rounded-xl bg-neutral-100 hover:bg-neutral-200 text-neutral-700 font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#6D28D9] hover:bg-[#5B21B6] text-white font-bold flex items-center gap-1.5 shadow-md"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>Update SEO</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
