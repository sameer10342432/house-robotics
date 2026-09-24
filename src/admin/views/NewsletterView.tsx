import React, { useEffect, useState } from 'react';
import { 
  Send, 
  Search, 
  Trash2, 
  CheckCircle2, 
  XCircle, 
  Plus, 
  X, 
  Save 
} from 'lucide-react';
import { 
  adminGetSubscribers, 
  adminUpdateSubscriberStatus, 
  adminDeleteSubscriber 
} from '../../utils/api';

export const NewsletterView: React.FC = () => {
  const [subscribers, setSubscribers] = useState<any[]>([]);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadSubscribers();
  }, [search, statusFilter]);

  const loadSubscribers = async () => {
    setIsLoading(true);
    try {
      const res = await adminGetSubscribers({
        search: search.trim() || undefined,
        status: statusFilter === 'ALL' ? undefined : statusFilter
      });
      if (res.success && res.data) {
        setSubscribers(res.data);
      }
    } catch (e) {
      console.error('Failed to load subscribers', e);
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggleStatus = async (sub: any) => {
    const nextStatus = sub.status === 'SUBSCRIBED' ? 'UNSUBSCRIBED' : 'SUBSCRIBED';
    try {
      const res = await adminUpdateSubscriberStatus(sub.id, nextStatus);
      if (res.success) {
        setSubscribers(prev => prev.map(s => s.id === sub.id ? { ...s, status: nextStatus } : s));
      }
    } catch (e) {
      console.error('Failed to update subscriber status', e);
    }
  };

  const handleDelete = async (id: string, email: string) => {
    if (!window.confirm(`Remove subscriber "${email}"?`)) return;
    try {
      const res = await adminDeleteSubscriber(id);
      if (res.success) {
        setSubscribers(prev => prev.filter(s => s.id !== id));
      }
    } catch (e) {
      console.error('Failed to delete subscriber', e);
    }
  };

  return (
    <div className="space-y-6 p-6 lg:p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-extrabold text-neutral-900 font-['Space_Grotesk']">
            Newsletter Subscribers
          </h2>
          <p className="text-xs text-neutral-500">
            Subscribers receiving research reports and executive growth briefings.
          </p>
        </div>
        <div className="text-xs font-semibold text-neutral-500">
          Total Subscribers: <strong className="text-neutral-900">{subscribers.length}</strong>
        </div>
      </div>

      {/* Filter / Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-[#E9E7F2] shadow-xs flex flex-col md:flex-row gap-3 items-center justify-between">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search subscriber email or name..."
            className="w-full pl-9 pr-3 py-2 rounded-xl border border-[#E9E7F2] bg-[#FAF9FF] text-xs text-neutral-900 focus:outline-none focus:border-[#6D28D9]"
          />
        </div>

        <div className="flex gap-1.5">
          {['ALL', 'SUBSCRIBED', 'UNSUBSCRIBED'].map((s) => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                statusFilter === s
                  ? 'bg-[#6D28D9] text-white'
                  : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Subscribers Table */}
      <div className="bg-white rounded-3xl border border-[#E9E7F2] shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#FAF9FF] text-neutral-500 uppercase tracking-wider font-semibold border-b border-[#E9E7F2]">
              <tr>
                <th className="py-3.5 px-4">Subscriber</th>
                <th className="py-3.5 px-4">Channel Source</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4">Subscribed At</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100 text-neutral-700">
              {isLoading ? (
                <tr>
                  <td colSpan={5} className="py-12 text-center text-neutral-400">
                    <div className="w-6 h-6 border-2 border-violet-600 border-t-transparent rounded-full animate-spin mx-auto mb-2" />
                    Loading subscribers...
                  </td>
                </tr>
              ) : subscribers.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-12 text-center text-neutral-400">
                    No subscribers found.
                  </td>
                </tr>
              ) : (
                subscribers.map((sub) => (
                  <tr key={sub.id} className="hover:bg-[#FAF9FF]/50 transition-colors">
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-neutral-900">{sub.email}</div>
                      {sub.name && <div className="text-[11px] text-neutral-500">{sub.name}</div>}
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="px-2 py-0.5 rounded bg-neutral-100 text-neutral-600 text-[10px] font-semibold">
                        {sub.source || 'Website'}
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold border ${
                        sub.status === 'SUBSCRIBED'
                          ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                          : 'bg-neutral-100 text-neutral-600 border-neutral-200'
                      }`}>
                        {sub.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 font-mono text-neutral-400 text-[11px]">
                      {new Date(sub.subscribedAt).toLocaleDateString()}
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleToggleStatus(sub)}
                          className="px-2.5 py-1 rounded-lg bg-neutral-100 hover:bg-neutral-200 text-neutral-700 text-xs font-bold"
                        >
                          {sub.status === 'SUBSCRIBED' ? 'Unsubscribe' : 'Resubscribe'}
                        </button>
                        <button
                          onClick={() => handleDelete(sub.id, sub.email)}
                          className="p-1.5 rounded-lg bg-red-50 hover:bg-red-100 text-red-600"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
