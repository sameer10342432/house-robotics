import React, { useEffect, useState } from 'react';
import { 
  Briefcase, 
  Search, 
  Plus, 
  Edit2, 
  Trash2, 
  CheckCircle2, 
  X, 
  Eye, 
  EyeOff, 
  Star, 
  Save,
  ArrowRight
} from 'lucide-react';
import { adminGetServices, adminCreateService, adminUpdateService, adminDeleteService } from '../../utils/api';

export const ServicesView: React.FC = () => {
  const [services, setServices] = useState<any[]>([]);
  const [search, setSearch] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [editingService, setEditingService] = useState<any | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    shortDescription: '',
    longDescription: '',
    icon: 'Briefcase',
    featured: false,
    status: 'PUBLISHED',
    sortOrder: 0
  });

  useEffect(() => {
    loadServices();
  }, []);

  const loadServices = async () => {
    setIsLoading(true);
    try {
      const res = await adminGetServices();
      if (res.success && res.data) {
        setServices(res.data);
      }
    } catch (e) {
      console.error('Failed to load services', e);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOpenEdit = (srv: any) => {
    setEditingService(srv);
    setFormData({
      title: srv.title || '',
      slug: srv.slug || '',
      shortDescription: srv.shortDescription || '',
      longDescription: srv.longDescription || '',
      icon: srv.icon || 'Briefcase',
      featured: srv.featured || false,
      status: srv.status || 'PUBLISHED',
      sortOrder: srv.sortOrder || 0
    });
    setIsCreating(false);
  };

  const handleOpenCreate = () => {
    setEditingService(null);
    setFormData({
      title: '',
      slug: '',
      shortDescription: '',
      longDescription: '',
      icon: 'Briefcase',
      featured: false,
      status: 'PUBLISHED',
      sortOrder: services.length + 1
    });
    setIsCreating(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isCreating) {
        const res = await adminCreateService(formData);
        if (res.success) {
          loadServices();
          setIsCreating(false);
        }
      } else if (editingService) {
        const res = await adminUpdateService(editingService.id, formData);
        if (res.success) {
          loadServices();
          setEditingService(null);
        }
      }
    } catch (e) {
      console.error('Failed to save service', e);
    }
  };

  const handleDelete = async (id: string, title: string) => {
    if (!window.confirm(`Are you sure you want to delete service "${title}"?`)) return;
    try {
      const res = await adminDeleteService(id);
      if (res.success) {
        setServices(prev => prev.filter(s => s.id !== id));
      }
    } catch (e) {
      console.error('Failed to delete service', e);
    }
  };

  const handleToggleStatus = async (srv: any) => {
    const nextStatus = srv.status === 'PUBLISHED' ? 'DRAFT' : 'PUBLISHED';
    try {
      const res = await adminUpdateService(srv.id, { status: nextStatus });
      if (res.success) {
        setServices(prev => prev.map(s => s.id === srv.id ? { ...s, status: nextStatus } : s));
      }
    } catch (e) {
      console.error('Failed to toggle status', e);
    }
  };

  const filtered = services.filter(s => 
    s.title?.toLowerCase().includes(search.toLowerCase()) || 
    s.slug?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6 p-6 lg:p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-extrabold text-neutral-900 font-['Space_Grotesk']">
            Agency Capabilities &amp; Services
          </h2>
          <p className="text-xs text-neutral-500">
            Manage, publish, and configure all 21 core services and practice lines.
          </p>
        </div>
        <button
          onClick={handleOpenCreate}
          className="btn-micro px-4 py-2.5 rounded-xl bg-[#6D28D9] hover:bg-[#5B21B6] text-white text-xs font-bold flex items-center gap-1.5 shadow-md self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Service</span>
        </button>
      </div>

      {/* Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-[#E9E7F2] shadow-xs flex items-center justify-between">
        <div className="relative w-full max-w-md">
          <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search service by name or slug..."
            className="w-full pl-9 pr-3 py-2 rounded-xl border border-[#E9E7F2] bg-[#FAF9FF] text-xs text-neutral-900 focus:outline-none focus:border-[#6D28D9]"
          />
        </div>
        <span className="text-xs text-neutral-500 font-medium">
          Showing <strong className="text-neutral-900">{filtered.length}</strong> services
        </span>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {isLoading ? (
          <div className="col-span-3 py-16 text-center text-neutral-400">
            <div className="w-6 h-6 border-2 border-violet-600 border-t-transparent rounded-full animate-spin mx-auto mb-2" />
            Loading services...
          </div>
        ) : filtered.length === 0 ? (
          <div className="col-span-3 py-16 text-center text-neutral-400">
            No services found matching your query.
          </div>
        ) : (
          filtered.map((srv) => (
            <div
              key={srv.id}
              className="bg-white rounded-2xl border border-[#E9E7F2] p-5 shadow-xs space-y-4 hover:shadow-md transition-shadow flex flex-col justify-between"
            >
              <div className="space-y-2.5">
                <div className="flex items-start justify-between gap-2">
                  <div className="w-9 h-9 rounded-xl bg-violet-50 text-[#6D28D9] flex items-center justify-center shrink-0 font-bold">
                    <Briefcase className="w-4.5 h-4.5" />
                  </div>
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => handleToggleStatus(srv)}
                      className={`px-2 py-0.5 rounded text-[10px] font-bold border transition-colors ${
                        srv.status === 'PUBLISHED'
                          ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                          : 'bg-neutral-100 text-neutral-600 border-neutral-200'
                      }`}
                    >
                      {srv.status}
                    </button>
                    {srv.featured && (
                      <span className="p-1 rounded bg-amber-50 text-amber-600" title="Featured Service">
                        <Star className="w-3.5 h-3.5 fill-current" />
                      </span>
                    )}
                  </div>
                </div>

                <div>
                  <h3 className="font-bold text-neutral-900 text-sm">{srv.title}</h3>
                  <div className="font-mono text-[11px] text-neutral-400">/services/{srv.slug}</div>
                </div>

                <p className="text-xs text-neutral-600 line-clamp-2 leading-relaxed">
                  {srv.shortDescription}
                </p>

                {srv.features && srv.features.length > 0 && (
                  <div className="pt-2 border-t border-neutral-100 text-[11px] text-neutral-500">
                    <span className="font-bold text-neutral-700">{srv.features.length}</span> deliverables configured
                  </div>
                )}
              </div>

              <div className="pt-3 border-t border-[#E9E7F2] flex items-center justify-between">
                <span className="text-[10px] font-mono text-neutral-400">
                  Order: #{srv.sortOrder}
                </span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleOpenEdit(srv)}
                    className="p-1.5 rounded-lg bg-neutral-100 hover:bg-neutral-200 text-neutral-700 transition-colors"
                    title="Edit Service"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleDelete(srv.id, srv.title)}
                    className="p-1.5 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 transition-colors"
                    title="Delete Service"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Edit / Create Modal */}
      {(editingService || isCreating) && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-900/60 backdrop-blur-xs"
          onClick={() => { setEditingService(null); setIsCreating(false); }}
        >
          <div
            className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 border-b border-[#E9E7F2] bg-[#FAF9FF] flex items-center justify-between">
              <h3 className="text-lg font-bold text-neutral-900">
                {isCreating ? 'Create New Service' : `Edit: ${editingService.title}`}
              </h3>
              <button
                onClick={() => { setEditingService(null); setIsCreating(false); }}
                className="w-8 h-8 rounded-full bg-white border border-[#E9E7F2] flex items-center justify-center text-neutral-400 hover:text-neutral-900"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSave} className="p-6 overflow-y-auto space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-neutral-700 mb-1">Service Title *</label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => {
                      const title = e.target.value;
                      const slug = isCreating ? title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '') : formData.slug;
                      setFormData({ ...formData, title, slug });
                    }}
                    className="w-full px-3 py-2 rounded-xl border border-[#E9E7F2] bg-[#FAF9FF] text-neutral-900 focus:outline-none focus:border-[#6D28D9]"
                  />
                </div>

                <div>
                  <label className="block font-bold text-neutral-700 mb-1">URL Slug *</label>
                  <input
                    type="text"
                    required
                    value={formData.slug}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-[#E9E7F2] bg-[#FAF9FF] text-neutral-900 focus:outline-none focus:border-[#6D28D9]"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-neutral-700 mb-1">Short Description *</label>
                <textarea
                  rows={2}
                  required
                  value={formData.shortDescription}
                  onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-[#E9E7F2] bg-[#FAF9FF] text-neutral-900 focus:outline-none focus:border-[#6D28D9]"
                />
              </div>

              <div>
                <label className="block font-bold text-neutral-700 mb-1">Long Description &amp; Architecture</label>
                <textarea
                  rows={4}
                  value={formData.longDescription}
                  onChange={(e) => setFormData({ ...formData, longDescription: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-[#E9E7F2] bg-[#FAF9FF] text-neutral-900 focus:outline-none focus:border-[#6D28D9]"
                />
              </div>

              <div className="grid grid-cols-3 gap-4 pt-2">
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

                <div>
                  <label className="block font-bold text-neutral-700 mb-1">Sort Order</label>
                  <input
                    type="number"
                    value={formData.sortOrder}
                    onChange={(e) => setFormData({ ...formData, sortOrder: parseInt(e.target.value, 10) || 0 })}
                    className="w-full px-3 py-2 rounded-xl border border-[#E9E7F2] bg-[#FAF9FF] text-neutral-900 focus:outline-none focus:border-[#6D28D9]"
                  />
                </div>

                <div className="flex items-center pt-5">
                  <label className="flex items-center gap-2 cursor-pointer font-bold text-neutral-700">
                    <input
                      type="checkbox"
                      checked={formData.featured}
                      onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                      className="rounded border-neutral-300 text-[#6D28D9]"
                    />
                    <span>Featured on Home</span>
                  </label>
                </div>
              </div>

              <div className="pt-4 border-t border-[#E9E7F2] flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => { setEditingService(null); setIsCreating(false); }}
                  className="px-4 py-2 rounded-xl bg-neutral-100 hover:bg-neutral-200 text-neutral-700 font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#6D28D9] hover:bg-[#5B21B6] text-white font-bold flex items-center gap-1.5 shadow-md"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>Save Service</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
