import React, { useEffect, useState } from 'react';
import { 
  MessageSquare, 
  Search, 
  Trash2, 
  Mail, 
  CheckCircle, 
  Clock, 
  X, 
  Phone,
  Eye
} from 'lucide-react';
import { adminGetMessages, adminMarkMessageRead, adminDeleteMessage } from '../../utils/api';

export const MessagesView: React.FC = () => {
  const [messages, setMessages] = useState<any[]>([]);
  const [search, setSearch] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [selectedMessage, setSelectedMessage] = useState<any | null>(null);

  useEffect(() => {
    loadMessages();
  }, [search]);

  const loadMessages = async () => {
    setIsLoading(true);
    try {
      const res = await adminGetMessages({ search: search.trim() || undefined });
      if (res.success && res.data) {
        setMessages(res.data);
      }
    } catch (e) {
      console.error('Failed to load messages', e);
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggleRead = async (msg: any, e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      const res = await adminMarkMessageRead(msg.id, !msg.isRead);
      if (res.success) {
        setMessages(prev => prev.map(m => m.id === msg.id ? { ...m, isRead: !msg.isRead } : m));
      }
    } catch (e) {
      console.error('Failed to update read state', e);
    }
  };

  const handleDelete = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!window.confirm('Delete this message permanently?')) return;
    try {
      const res = await adminDeleteMessage(id);
      if (res.success) {
        setMessages(prev => prev.filter(m => m.id !== id));
        if (selectedMessage?.id === id) setSelectedMessage(null);
      }
    } catch (e) {
      console.error('Failed to delete message', e);
    }
  };

  return (
    <div className="space-y-6 p-6 lg:p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-extrabold text-neutral-900 font-['Space_Grotesk']">
            Contact Messages &amp; Inbound Inquiries
          </h2>
          <p className="text-xs text-neutral-500">
            Raw inquiries received from the website contact desk and consultation modals.
          </p>
        </div>
        <div className="text-xs font-semibold text-neutral-500">
          Total Messages: <strong className="text-neutral-900">{messages.length}</strong>
        </div>
      </div>

      {/* Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-[#E9E7F2] shadow-xs flex items-center justify-between">
        <div className="relative w-full max-w-md">
          <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by prospect name, email, or message..."
            className="w-full pl-9 pr-3 py-2 rounded-xl border border-[#E9E7F2] bg-[#FAF9FF] text-xs text-neutral-900 focus:outline-none focus:border-[#6D28D9]"
          />
        </div>
      </div>

      {/* Messages List */}
      <div className="bg-white rounded-3xl border border-[#E9E7F2] shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#FAF9FF] text-neutral-500 uppercase tracking-wider font-semibold border-b border-[#E9E7F2]">
              <tr>
                <th className="py-3.5 px-4">Ref ID</th>
                <th className="py-3.5 px-4">Sender</th>
                <th className="py-3.5 px-4">Service</th>
                <th className="py-3.5 px-4">Message Snippet</th>
                <th className="py-3.5 px-4">Date</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100 text-neutral-700">
              {isLoading ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-neutral-400">
                    <div className="w-6 h-6 border-2 border-violet-600 border-t-transparent rounded-full animate-spin mx-auto mb-2" />
                    Loading messages...
                  </td>
                </tr>
              ) : messages.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-neutral-400">
                    No contact inquiries found.
                  </td>
                </tr>
              ) : (
                messages.map((msg) => (
                  <tr
                    key={msg.id}
                    onClick={() => setSelectedMessage(msg)}
                    className={`hover:bg-[#FAF9FF]/60 transition-colors cursor-pointer ${
                      !msg.isRead ? 'bg-violet-50/30 font-semibold' : ''
                    }`}
                  >
                    <td className="py-3.5 px-4 font-mono font-bold text-[#6D28D9]">
                      {msg.inquiryId}
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-neutral-900">{msg.name}</div>
                      <div className="text-[11px] text-neutral-500">{msg.email}</div>
                    </td>
                    <td className="py-3.5 px-4 text-neutral-800">
                      {msg.service || 'General'}
                    </td>
                    <td className="py-3.5 px-4 max-w-xs truncate text-neutral-600">
                      {msg.message}
                    </td>
                    <td className="py-3.5 px-4 font-mono text-neutral-400 text-[11px]">
                      {new Date(msg.createdAt).toLocaleDateString()}
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={(e) => handleToggleRead(msg, e)}
                          className={`p-1.5 rounded-lg text-xs font-bold ${
                            msg.isRead
                              ? 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                              : 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                          }`}
                          title={msg.isRead ? 'Mark Unread' : 'Mark Read'}
                        >
                          <CheckCircle className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={(e) => handleDelete(msg.id, e)}
                          className="p-1.5 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 transition-colors"
                          title="Delete Message"
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

      {/* Message Modal */}
      {selectedMessage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-900/60 backdrop-blur-xs"
          onClick={() => setSelectedMessage(null)}
        >
          <div
            className="w-full max-w-lg bg-white rounded-3xl shadow-2xl p-6 sm:p-8 space-y-5"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between border-b border-[#E9E7F2] pb-4">
              <div>
                <div className="font-mono text-xs font-bold text-[#6D28D9] mb-1">
                  {selectedMessage.inquiryId}
                </div>
                <h3 className="text-xl font-bold text-neutral-900">{selectedMessage.name}</h3>
                <p className="text-xs text-neutral-500">{selectedMessage.email} · {selectedMessage.phone || 'No phone'}</p>
              </div>
              <button
                onClick={() => setSelectedMessage(null)}
                className="w-8 h-8 rounded-full bg-neutral-100 hover:bg-neutral-200 flex items-center justify-center text-neutral-500"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3 p-3 rounded-xl bg-[#FAF9FF] border border-[#E9E7F2]">
                <div>
                  <span className="text-[10px] uppercase font-bold text-neutral-400 block">Service</span>
                  <span className="font-semibold text-neutral-800">{selectedMessage.service || 'N/A'}</span>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-neutral-400 block">Budget Scope</span>
                  <span className="font-semibold text-neutral-800">{selectedMessage.budget || 'N/A'}</span>
                </div>
              </div>

              <div>
                <span className="text-[10px] uppercase font-bold text-neutral-400 block mb-1">Inquiry Content</span>
                <p className="p-4 rounded-xl bg-neutral-50 border border-[#E9E7F2] text-neutral-800 leading-relaxed text-xs">
                  {selectedMessage.message}
                </p>
              </div>
            </div>

            <div className="pt-2 flex items-center justify-end gap-2">
              <a
                href={`mailto:${selectedMessage.email}`}
                className="px-4 py-2 rounded-xl bg-[#6D28D9] text-white text-xs font-bold hover:bg-[#5B21B6] transition-colors flex items-center gap-1.5"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>Reply by Email</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
