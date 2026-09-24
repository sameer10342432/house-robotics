import React, { useEffect, useState } from 'react';
import { 
  Users, 
  ShieldCheck, 
  Plus, 
  Trash2, 
  Edit2, 
  X, 
  Save, 
  Key 
} from 'lucide-react';
import { adminGetUsers, adminCreateUser, adminDeleteUser } from '../../utils/api';

export const UsersView: React.FC = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isCreating, setIsCreating] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'ADMIN'
  });

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    setIsLoading(true);
    try {
      const res = await adminGetUsers();
      if (res.success && res.data) {
        setUsers(res.data);
      }
    } catch (e) {
      console.error('Failed to load users', e);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await adminCreateUser(formData);
      if (res.success) {
        loadUsers();
        setIsCreating(false);
        setFormData({ name: '', email: '', password: '', role: 'ADMIN' });
      }
    } catch (e) {
      console.error('Failed to create user', e);
    }
  };

  const handleDelete = async (id: string, email: string) => {
    if (!window.confirm(`Delete administrator "${email}"?`)) return;
    try {
      const res = await adminDeleteUser(id);
      if (res.success) {
        setUsers(prev => prev.filter(u => u.id !== id));
      }
    } catch (e) {
      console.error('Failed to delete user', e);
    }
  };

  return (
    <div className="space-y-6 p-6 lg:p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-extrabold text-neutral-900 font-['Space_Grotesk']">
            Administrative Team &amp; Access Roles
          </h2>
          <p className="text-xs text-neutral-500">
            Manage authorized staff credentials across SUPER_ADMIN, ADMIN, and EDITOR roles.
          </p>
        </div>
        <button
          onClick={() => setIsCreating(true)}
          className="btn-micro px-4 py-2.5 rounded-xl bg-[#6D28D9] hover:bg-[#5B21B6] text-white text-xs font-bold flex items-center gap-1.5 shadow-md self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add Admin User</span>
        </button>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-3xl border border-[#E9E7F2] shadow-xs overflow-hidden">
        <table className="w-full text-left text-xs">
          <thead className="bg-[#FAF9FF] text-neutral-500 uppercase tracking-wider font-semibold border-b border-[#E9E7F2]">
            <tr>
              <th className="py-3.5 px-4">Admin Name</th>
              <th className="py-3.5 px-4">Email</th>
              <th className="py-3.5 px-4">Role</th>
              <th className="py-3.5 px-4">Status</th>
              <th className="py-3.5 px-4">Last Login</th>
              <th className="py-3.5 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-100 text-neutral-700">
            {isLoading ? (
              <tr>
                <td colSpan={6} className="py-12 text-center text-neutral-400">
                  <div className="w-6 h-6 border-2 border-violet-600 border-t-transparent rounded-full animate-spin mx-auto mb-2" />
                  Loading admin users...
                </td>
              </tr>
            ) : (
              users.map((u) => (
                <tr key={u.id} className="hover:bg-[#FAF9FF]/50 transition-colors">
                  <td className="py-3.5 px-4 font-bold text-neutral-900">
                    {u.name}
                  </td>
                  <td className="py-3.5 px-4 font-mono text-neutral-600">
                    {u.email}
                  </td>
                  <td className="py-3.5 px-4">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${
                      u.role === 'SUPER_ADMIN'
                        ? 'bg-purple-100 text-purple-800 border-purple-200'
                        : u.role === 'ADMIN'
                        ? 'bg-blue-100 text-blue-800 border-blue-200'
                        : 'bg-neutral-100 text-neutral-700 border-neutral-200'
                    }`}>
                      {u.role}
                    </span>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
                      {u.isActive ? 'Active' : 'Disabled'}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 font-mono text-neutral-400 text-[11px]">
                    {u.lastLogin ? new Date(u.lastLogin).toLocaleDateString() : 'Never'}
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    {u.role !== 'SUPER_ADMIN' && (
                      <button
                        onClick={() => handleDelete(u.id, u.email)}
                        className="p-1.5 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Create Modal */}
      {isCreating && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-900/60 backdrop-blur-xs"
          onClick={() => setIsCreating(false)}
        >
          <div
            className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-6 space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-[#E9E7F2] pb-3">
              <h3 className="text-base font-bold text-neutral-900">Provision Administrator</h3>
              <button
                onClick={() => setIsCreating(false)}
                className="w-7 h-7 rounded-full bg-neutral-100 hover:bg-neutral-200 flex items-center justify-center text-neutral-500"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreate} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-neutral-700 mb-1">Full Name *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-[#E9E7F2] bg-[#FAF9FF] text-neutral-900 focus:outline-none focus:border-[#6D28D9]"
                />
              </div>

              <div>
                <label className="block font-bold text-neutral-700 mb-1">Corporate Email *</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-[#E9E7F2] bg-[#FAF9FF] text-neutral-900 focus:outline-none focus:border-[#6D28D9]"
                />
              </div>

              <div>
                <label className="block font-bold text-neutral-700 mb-1">Secure Password *</label>
                <input
                  type="password"
                  required
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  placeholder="Min 8 characters"
                  className="w-full px-3 py-2 rounded-xl border border-[#E9E7F2] bg-[#FAF9FF] text-neutral-900 focus:outline-none focus:border-[#6D28D9]"
                />
              </div>

              <div>
                <label className="block font-bold text-neutral-700 mb-1">Role Permission</label>
                <select
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-[#E9E7F2] bg-[#FAF9FF] text-neutral-900 focus:outline-none focus:border-[#6D28D9]"
                >
                  <option value="ADMIN">ADMIN (Operations, Leads, Inquiries)</option>
                  <option value="EDITOR">EDITOR (Services, Articles, FAQs)</option>
                  <option value="SUPER_ADMIN">SUPER_ADMIN (Full Platform Authority)</option>
                </select>
              </div>

              <div className="pt-3 border-t border-[#E9E7F2] flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsCreating(false)}
                  className="px-4 py-2 rounded-xl bg-neutral-100 hover:bg-neutral-200 text-neutral-700 font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#6D28D9] hover:bg-[#5B21B6] text-white font-bold flex items-center gap-1.5 shadow-md"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>Create Administrator</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
