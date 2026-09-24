import React, { useEffect, useState } from 'react';
import { 
  HelpCircle, 
  Plus, 
  Edit2, 
  Trash2, 
  CheckCircle2, 
  X, 
  Save, 
  Search
} from 'lucide-react';
import { 
  adminGetFaqs, 
  adminCreateFaq, 
  adminUpdateFaq, 
  adminDeleteFaq 
} from '../../utils/api';

export const FaqsView: React.FC = () => {
  const [faqs, setFaqs] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editingItem, setEditingItem] = useState<any | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  const [formData, setFormData] = useState({
    question: '',
    answer: '',
    category: 'General',
    status: 'PUBLISHED',
    sortOrder: 0
  });

  useEffect(() => {
    loadFaqs();
  }, []);

  const loadFaqs = async () => {
    setIsLoading(true);
    try {
      const res = await adminGetFaqs();
      if (res.success && res.data) {
        setFaqs(res.data);
      }
    } catch (e) {
      console.error('Failed to load FAQs', e);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOpenEdit = (item: any) => {
    setEditingItem(item);
    setFormData({
      question: item.question || '',
      answer: item.answer || '',
      category: item.category || 'General',
      status: item.status || 'PUBLISHED',
      sortOrder: item.sortOrder || 0
    });
    setIsCreating(false);
  };

  const handleOpenCreate = () => {
    setEditingItem(null);
    setFormData({
      question: '',
      answer: '',
      category: 'General',
      status: 'PUBLISHED',
      sortOrder: faqs.length + 1
    });
    setIsCreating(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isCreating) {
        const res = await adminCreateFaq(formData);
        if (res.success) {
          loadFaqs();
          setIsCreating(false);
        }
      } else if (editingItem) {
        const res = await adminUpdateFaq(editingItem.id, formData);
        if (res.success) {
          loadFaqs();
          setEditingItem(null);
        }
      }
    } catch (e) {
      console.error('Failed to save FAQ', e);
    }
  };

  const handleDelete = async (id: string, q: string) => {
    if (!window.confirm(`Delete FAQ "${q}"?`)) return;
    try {
      const res = await adminDeleteFaq(id);
      if (res.success) {
        setFaqs(prev => prev.filter(f => f.id !== id));
      }
    } catch (e) {
      console.error('Failed to delete FAQ', e);
    }
  };

  return (
    <div className="space-y-6 p-6 lg:p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-extrabold text-neutral-900 font-['Space_Grotesk']">
            Agency FAQs
          </h2>
          <p className="text-xs text-neutral-500">
            Manage frequently asked client questions displayed on the website and contact desk.
          </p>
        </div>
        <button
          onClick={handleOpenCreate}
          className="btn-micro px-4 py-2.5 rounded-xl bg-[#6D28D9] hover:bg-[#5B21B6] text-white text-xs font-bold flex items-center gap-1.5 shadow-md self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add FAQ</span>
        </button>
      </div>

      {/* FAQs List */}
      <div className="space-y-3">
        {isLoading ? (
          <div className="py-16 text-center text-neutral-400">
            <div className="w-6 h-6 border-2 border-violet-600 border-t-transparent rounded-full animate-spin mx-auto mb-2" />
            Loading FAQs...
          </div>
        ) : faqs.length === 0 ? (
          <div className="py-16 text-center text-neutral-400 bg-white rounded-3xl border border-[#E9E7F2]">
            No FAQs recorded yet.
          </div>
        ) : (
          faqs.map((faq) => (
            <div
              key={faq.id}
              className="bg-white rounded-2xl border border-[#E9E7F2] p-5 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
            >
              <div className="space-y-1.5 flex-1">
                <div className="flex items-center gap-2">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${
                    faq.status === 'PUBLISHED'
                      ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                      : 'bg-neutral-100 text-neutral-600 border-neutral-200'
                  }`}>
                    {faq.status}
                  </span>
                  <span className="text-[11px] font-semibold text-[#6D28D9] bg-violet-50 px-2 py-0.5 rounded">
                    {faq.category || 'General'}
                  </span>
                  <span className="text-neutral-400 text-[10px] font-mono">
                    Order #{faq.sortOrder}
                  </span>
                </div>

                <h3 className="font-bold text-neutral-900 text-sm">
                  {faq.question}
                </h3>

                <p className="text-xs text-neutral-600 leading-relaxed">
                  {faq.answer}
                </p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => handleOpenEdit(faq)}
                  className="p-1.5 rounded-lg bg-neutral-100 hover:bg-neutral-200 text-neutral-700 transition-colors"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => handleDelete(faq.id, faq.question)}
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
                {isCreating ? 'Add New FAQ' : 'Edit FAQ'}
              </h3>
              <button
                onClick={() => { setEditingItem(null); setIsCreating(false); }}
                className="w-7 h-7 rounded-full bg-neutral-100 hover:bg-neutral-200 flex items-center justify-center text-neutral-500"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-neutral-700 mb-1">Question *</label>
                <input
                  type="text"
                  required
                  value={formData.question}
                  onChange={(e) => setFormData({ ...formData, question: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-[#E9E7F2] bg-[#FAF9FF] text-neutral-900 focus:outline-none focus:border-[#6D28D9]"
                />
              </div>

              <div>
                <label className="block font-bold text-neutral-700 mb-1">Answer *</label>
                <textarea
                  rows={4}
                  required
                  value={formData.answer}
                  onChange={(e) => setFormData({ ...formData, answer: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-[#E9E7F2] bg-[#FAF9FF] text-neutral-900 focus:outline-none focus:border-[#6D28D9]"
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block font-bold text-neutral-700 mb-1">Category</label>
                  <input
                    type="text"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-[#E9E7F2] bg-[#FAF9FF] text-neutral-900 focus:outline-none focus:border-[#6D28D9]"
                  />
                </div>
                <div>
                  <label className="block font-bold text-neutral-700 mb-1">Sort Order</label>
                  <input
                    type="number"
                    value={formData.sortOrder}
                    onChange={(e) => setFormData({ ...formData, sortOrder: parseInt(e.target.value, 10) || 0 })}
                    className="w-full px-3 py-2 rounded-xl border border-[#E9E7F2] bg-[#FAF9FF] text-neutral-900 focus:outline-none focus:border-[#6D28D9]"
                  />
                </div>
                <div>
                  <label className="block font-bold text-neutral-700 mb-1">Status</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-[#E9E7F2] bg-[#FAF9FF] text-neutral-900 focus:outline-none focus:border-[#6D28D9]"
                  >
                    <option value="PUBLISHED">PUBLISHED</option>
                    <option value="DRAFT">DRAFT</option>
                  </select>
                </div>
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
                  <span>Save FAQ</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
