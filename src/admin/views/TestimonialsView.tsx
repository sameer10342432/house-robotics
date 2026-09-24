import React, { useEffect, useState } from 'react';
import { 
  Star, 
  Plus, 
  Edit2, 
  Trash2, 
  CheckCircle2, 
  X, 
  Save, 
  Search, 
  Building
} from 'lucide-react';
import { 
  adminGetTestimonials, 
  adminCreateTestimonial, 
  adminUpdateTestimonial, 
  adminDeleteTestimonial 
} from '../../utils/api';

export const TestimonialsView: React.FC = () => {
  const [testimonials, setTestimonials] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editingItem, setEditingItem] = useState<any | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  const [formData, setFormData] = useState({
    clientName: '',
    company: '',
    role: '',
    review: '',
    rating: 5,
    status: 'APPROVED',
    photo: '/images/avatar-marcus.svg',
    sortOrder: 0
  });

  useEffect(() => {
    loadTestimonials();
  }, []);

  const loadTestimonials = async () => {
    setIsLoading(true);
    try {
      const res = await adminGetTestimonials();
      if (res.success && res.data) {
        setTestimonials(res.data);
      }
    } catch (e) {
      console.error('Failed to load testimonials', e);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOpenEdit = (item: any) => {
    setEditingItem(item);
    setFormData({
      clientName: item.clientName || '',
      company: item.company || '',
      role: item.role || '',
      review: item.review || '',
      rating: item.rating || 5,
      status: item.status || 'APPROVED',
      photo: item.photo || '/images/avatar-marcus.svg',
      sortOrder: item.sortOrder || 0
    });
    setIsCreating(false);
  };

  const handleOpenCreate = () => {
    setEditingItem(null);
    setFormData({
      clientName: '',
      company: '',
      role: '',
      review: '',
      rating: 5,
      status: 'APPROVED',
      photo: '/images/avatar-marcus.svg',
      sortOrder: testimonials.length + 1
    });
    setIsCreating(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isCreating) {
        const res = await adminCreateTestimonial(formData);
        if (res.success) {
          loadTestimonials();
          setIsCreating(false);
        }
      } else if (editingItem) {
        const res = await adminUpdateTestimonial(editingItem.id, formData);
        if (res.success) {
          loadTestimonials();
          setEditingItem(null);
        }
      }
    } catch (e) {
      console.error('Failed to save testimonial', e);
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (!window.confirm(`Delete review from "${name}"?`)) return;
    try {
      const res = await adminDeleteTestimonial(id);
      if (res.success) {
        setTestimonials(prev => prev.filter(t => t.id !== id));
      }
    } catch (e) {
      console.error('Failed to delete testimonial', e);
    }
  };

  return (
    <div className="space-y-6 p-6 lg:p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-extrabold text-neutral-900 font-['Space_Grotesk']">
            Testimonials &amp; Client Social Proof
          </h2>
          <p className="text-xs text-neutral-500">
            Approved client reviews and verified case outcomes.
          </p>
        </div>
        <button
          onClick={handleOpenCreate}
          className="btn-micro px-4 py-2.5 rounded-xl bg-[#6D28D9] hover:bg-[#5B21B6] text-white text-xs font-bold flex items-center gap-1.5 shadow-md self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add Testimonial</span>
        </button>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {isLoading ? (
          <div className="col-span-2 py-16 text-center text-neutral-400">
            <div className="w-6 h-6 border-2 border-violet-600 border-t-transparent rounded-full animate-spin mx-auto mb-2" />
            Loading reviews...
          </div>
        ) : testimonials.length === 0 ? (
          <div className="col-span-2 py-16 text-center text-neutral-400 bg-white rounded-3xl border border-[#E9E7F2]">
            No testimonials recorded yet.
          </div>
        ) : (
          testimonials.map((t) => (
            <div
              key={t.id}
              className="bg-white rounded-2xl border border-[#E9E7F2] p-5 shadow-xs space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-amber-400">
                    {Array.from({ length: t.rating || 5 }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${
                    t.status === 'APPROVED'
                      ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                      : 'bg-amber-50 text-amber-800 border-amber-200'
                  }`}>
                    {t.status}
                  </span>
                </div>

                <p className="text-xs text-neutral-700 italic leading-relaxed">
                  "{t.review}"
                </p>

                <div className="pt-2 border-t border-neutral-100 flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-violet-100 text-[#6D28D9] flex items-center justify-center font-bold text-xs">
                    {t.clientName.charAt(0)}
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-neutral-900">{t.clientName}</h4>
                    <p className="text-[11px] text-neutral-500">{t.role} · {t.company}</p>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-[#E9E7F2] flex items-center justify-end gap-2">
                <button
                  onClick={() => handleOpenEdit(t)}
                  className="p-1.5 rounded-lg bg-neutral-100 hover:bg-neutral-200 text-neutral-700 transition-colors"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => handleDelete(t.id, t.clientName)}
                  className="p-1.5 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Modal */}
      {(editingItem || isCreating) && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-900/60 backdrop-blur-xs"
          onClick={() => { setEditingItem(null); setIsCreating(false); }}
        >
          <div
            className="w-full max-w-xl bg-white rounded-3xl shadow-2xl overflow-hidden p-6 space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-[#E9E7F2] pb-3">
              <h3 className="text-base font-bold text-neutral-900">
                {isCreating ? 'Add Testimonial' : `Edit: ${editingItem.clientName}`}
              </h3>
              <button
                onClick={() => { setEditingItem(null); setIsCreating(false); }}
                className="w-7 h-7 rounded-full bg-neutral-100 hover:bg-neutral-200 flex items-center justify-center text-neutral-500"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-neutral-700 mb-1">Client Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.clientName}
                    onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-[#E9E7F2] bg-[#FAF9FF] text-neutral-900 focus:outline-none focus:border-[#6D28D9]"
                  />
                </div>
                <div>
                  <label className="block font-bold text-neutral-700 mb-1">Company *</label>
                  <input
                    type="text"
                    required
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-[#E9E7F2] bg-[#FAF9FF] text-neutral-900 focus:outline-none focus:border-[#6D28D9]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-neutral-700 mb-1">Client Role / Title</label>
                  <input
                    type="text"
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-[#E9E7F2] bg-[#FAF9FF] text-neutral-900 focus:outline-none focus:border-[#6D28D9]"
                  />
                </div>
                <div>
                  <label className="block font-bold text-neutral-700 mb-1">Star Rating (1-5)</label>
                  <input
                    type="number"
                    min="1"
                    max="5"
                    value={formData.rating}
                    onChange={(e) => setFormData({ ...formData, rating: parseInt(e.target.value, 10) || 5 })}
                    className="w-full px-3 py-2 rounded-xl border border-[#E9E7F2] bg-[#FAF9FF] text-neutral-900 focus:outline-none focus:border-[#6D28D9]"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-neutral-700 mb-1">Review Statement *</label>
                <textarea
                  rows={4}
                  required
                  value={formData.review}
                  onChange={(e) => setFormData({ ...formData, review: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-[#E9E7F2] bg-[#FAF9FF] text-neutral-900 focus:outline-none focus:border-[#6D28D9]"
                />
              </div>

              <div className="pt-3 border-t border-[#E9E7F2] flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => { setEditingItem(null); setIsCreating(false); }}
                  className="px-4 py-2 rounded-xl bg-neutral-100 hover:bg-neutral-200 text-neutral-700 font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#6D28D9] hover:bg-[#5B21B6] text-white font-bold flex items-center gap-1.5 shadow-md"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>Save Review</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
