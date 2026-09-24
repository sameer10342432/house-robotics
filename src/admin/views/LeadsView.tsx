import React, { useEffect, useState } from 'react';
import { 
  Users, 
  Search, 
  Filter, 
  MessageSquare, 
  Phone, 
  Mail, 
  CheckCircle2, 
  Clock, 
  X, 
  Send,
  Plus,
  ExternalLink,
  ChevronRight,
  TrendingUp,
  Tag
} from 'lucide-react';
import { adminGetLeads, adminUpdateLeadStatus, adminAddLeadNote } from '../../utils/api';

export const LeadsView: React.FC = () => {
  const [leads, setLeads] = useState<any[]>([]);
  const [pagination, setPagination] = useState<any>({ total: 0, page: 1, limit: 20 });
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [search, setSearch] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  // Selected lead for detail drawer
  const [selectedLead, setSelectedLead] = useState<any | null>(null);
  const [newNote, setNewNote] = useState('');
  const [isSubmittingNote, setIsSubmittingNote] = useState(false);

  useEffect(() => {
    fetchLeads();
  }, [statusFilter, search]);

  const fetchLeads = async (page = 1) => {
    setIsLoading(true);
    try {
      const res = await adminGetLeads({
        status: statusFilter === 'ALL' ? undefined : statusFilter,
        search: search.trim() || undefined,
        page,
        limit: 20
      });
      if (res.success && res.data) {
        setLeads(res.data);
        if (res.pagination) setPagination(res.pagination);
      }
    } catch (e) {
      console.error('Failed to load leads', e);
    } finally {
      setIsLoading(false);
    }
  };

  const handleStatusChange = async (leadId: string, newStatus: string) => {
    try {
      const res = await adminUpdateLeadStatus(leadId, newStatus);
      if (res.success) {
        setLeads(prev => prev.map(l => l.id === leadId ? { ...l, status: newStatus } : l));
        if (selectedLead?.id === leadId) {
          setSelectedLead((prev: any) => ({ ...prev, status: newStatus }));
        }
      }
    } catch (e) {
      console.error('Status change error', e);
    }
  };

  const handleAddNote = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedLead || !newNote.trim()) return;

    setIsSubmittingNote(true);
    try {
      const res = await adminAddLeadNote(selectedLead.id, newNote);
      if (res.success && res.data) {
        const updatedNotes = [res.data, ...(selectedLead.notes || [])];
        setSelectedLead({ ...selectedLead, notes: updatedNotes });
        setNewNote('');
      }
    } catch (e) {
      console.error('Failed to add note', e);
    } finally {
      setIsSubmittingNote(false);
    }
  };

  const statusBadges: Record<string, string> = {
    NEW: 'bg-blue-100 text-blue-800 border-blue-200',
    CONTACTED: 'bg-amber-100 text-amber-800 border-amber-200',
    QUALIFIED: 'bg-purple-100 text-purple-800 border-purple-200',
    PROPOSAL_SENT: 'bg-indigo-100 text-indigo-800 border-indigo-200',
    WON: 'bg-emerald-100 text-emerald-800 border-emerald-200',
    LOST: 'bg-neutral-100 text-neutral-600 border-neutral-200'
  };

  return (
    <div className="space-y-6 p-6 lg:p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-extrabold text-neutral-900 font-['Space_Grotesk']">
            Lead Management CRM
          </h2>
          <p className="text-xs text-neutral-500">
            Track inquiries, update pipeline statuses, and record communication history.
          </p>
        </div>
        <div className="text-xs font-semibold text-neutral-500">
          Total Leads in Database: <span className="font-bold text-neutral-900">{pagination.total}</span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-[#E9E7F2] shadow-xs flex flex-col md:flex-row gap-3 items-center justify-between">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by prospect, company, ref ID..."
            className="w-full pl-9 pr-3 py-2 rounded-xl border border-[#E9E7F2] bg-[#FAF9FF] text-xs text-neutral-900 focus:outline-none focus:border-[#6D28D9]"
          />
        </div>

        {/* Status Filter Buttons */}
        <div className="flex flex-wrap gap-1.5 w-full md:w-auto">
          {['ALL', 'NEW', 'CONTACTED', 'QUALIFIED', 'PROPOSAL_SENT', 'WON', 'LOST'].map((s) => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                statusFilter === s
                  ? 'bg-[#6D28D9] text-white shadow-xs'
                  : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Main Table */}
      <div className="bg-white rounded-3xl border border-[#E9E7F2] shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#FAF9FF] text-neutral-500 uppercase tracking-wider font-semibold border-b border-[#E9E7F2]">
              <tr>
                <th className="py-3.5 px-4">Ref ID</th>
                <th className="py-3.5 px-4">Prospect</th>
                <th className="py-3.5 px-4">Service &amp; Budget</th>
                <th className="py-3.5 px-4">Source</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4">Date</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100 text-neutral-700">
              {isLoading ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-neutral-400">
                    <div className="w-6 h-6 border-2 border-violet-600 border-t-transparent rounded-full animate-spin mx-auto mb-2" />
                    Loading lead records...
                  </td>
                </tr>
              ) : leads.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-neutral-400">
                    No leads matching criteria found.
                  </td>
                </tr>
              ) : (
                leads.map((lead) => (
                  <tr
                    key={lead.id}
                    className="hover:bg-[#FAF9FF]/60 transition-colors cursor-pointer"
                    onClick={() => setSelectedLead(lead)}
                  >
                    <td className="py-3.5 px-4 font-mono font-bold text-[#6D28D9]">
                      {lead.inquiryId}
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-neutral-900">{lead.name}</div>
                      <div className="text-[11px] text-neutral-500 flex items-center gap-2">
                        <span>{lead.company || 'Direct Client'}</span>
                        <span>·</span>
                        <span>{lead.email}</span>
                      </div>
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="font-semibold text-neutral-800">{lead.service || 'General Inbound'}</div>
                      <div className="text-[11px] font-mono text-neutral-500">{lead.budget || 'Custom'}</div>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="px-2 py-0.5 rounded bg-neutral-100 border border-neutral-200 text-[10px] font-semibold text-neutral-600">
                        {lead.source || 'Website'}
                      </span>
                    </td>
                    <td className="py-3.5 px-4" onClick={(e) => e.stopPropagation()}>
                      <select
                        value={lead.status}
                        onChange={(e) => handleStatusChange(lead.id, e.target.value)}
                        className={`px-2 py-1 rounded-lg text-[11px] font-bold border focus:outline-none ${statusBadges[lead.status] || 'bg-neutral-100'}`}
                      >
                        <option value="NEW">NEW</option>
                        <option value="CONTACTED">CONTACTED</option>
                        <option value="QUALIFIED">QUALIFIED</option>
                        <option value="PROPOSAL_SENT">PROPOSAL_SENT</option>
                        <option value="WON">WON</option>
                        <option value="LOST">LOST</option>
                      </select>
                    </td>
                    <td className="py-3.5 px-4 font-mono text-neutral-400 text-[11px]">
                      {new Date(lead.createdAt).toLocaleDateString()}
                    </td>
                    <td className="py-3.5 px-4 text-right" onClick={(e) => e.stopPropagation()}>
                      <button
                        onClick={() => setSelectedLead(lead)}
                        className="px-3 py-1.5 rounded-lg bg-violet-50 text-[#6D28D9] font-bold hover:bg-violet-100 transition-colors inline-flex items-center gap-1"
                      >
                        <span>View</span>
                        <ChevronRight className="w-3 h-3" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Lead Detail Drawer / Modal */}
      {selectedLead && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-end bg-neutral-900/50 backdrop-blur-xs"
          onClick={() => setSelectedLead(null)}
        >
          <div
            className="w-full max-w-xl h-full bg-white shadow-2xl overflow-y-auto flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Drawer Header */}
            <div className="p-6 border-b border-[#E9E7F2] bg-[#FAF9FF] flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-mono text-xs font-bold text-[#6D28D9] bg-violet-100 px-2 py-0.5 rounded">
                    {selectedLead.inquiryId}
                  </span>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${statusBadges[selectedLead.status]}`}>
                    {selectedLead.status}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-neutral-900">{selectedLead.name}</h3>
                <p className="text-xs text-neutral-500">{selectedLead.company || 'Individual Client'}</p>
              </div>
              <button
                onClick={() => setSelectedLead(null)}
                className="w-8 h-8 rounded-full bg-white border border-[#E9E7F2] flex items-center justify-center text-neutral-400 hover:text-neutral-900"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Drawer Body */}
            <div className="p-6 space-y-6 flex-1">
              {/* Quick Actions (WhatsApp & Email) */}
              <div className="grid grid-cols-2 gap-3">
                {selectedLead.phone && (
                  <a
                    href={`https://wa.me/${selectedLead.phone.replace(/[^0-9]/g, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center justify-center gap-2 hover:bg-emerald-100 transition-colors"
                  >
                    <MessageSquare className="w-4 h-4 text-emerald-600" />
                    <span>WhatsApp Prospect</span>
                  </a>
                )}
                {selectedLead.email && (
                  <a
                    href={`mailto:${selectedLead.email}`}
                    className="p-3 rounded-xl bg-violet-50 border border-violet-200 text-violet-800 text-xs font-bold flex items-center justify-center gap-2 hover:bg-violet-100 transition-colors"
                  >
                    <Mail className="w-4 h-4 text-[#6D28D9]" />
                    <span>Send Direct Email</span>
                  </a>
                )}
              </div>

              {/* Lead Details Card */}
              <div className="p-4 rounded-2xl bg-[#FAF9FF] border border-[#E9E7F2] space-y-3 text-xs">
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-neutral-400 block">Phone</span>
                    <span className="font-semibold text-neutral-800">{selectedLead.phone || 'N/A'}</span>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-neutral-400 block">Email</span>
                    <span className="font-semibold text-neutral-800">{selectedLead.email}</span>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-neutral-400 block">Target Service</span>
                    <span className="font-semibold text-neutral-800">{selectedLead.service || 'N/A'}</span>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-neutral-400 block">Budget Scope</span>
                    <span className="font-semibold text-neutral-800">{selectedLead.budget || 'Custom'}</span>
                  </div>
                </div>

                <div className="pt-2 border-t border-neutral-200">
                  <span className="text-[10px] uppercase font-bold text-neutral-400 block mb-1">Inquiry Brief / Message</span>
                  <p className="text-neutral-700 leading-relaxed bg-white p-3 rounded-xl border border-[#E9E7F2]">
                    {selectedLead.message}
                  </p>
                </div>
              </div>

              {/* Timeline Notes */}
              <div className="space-y-4">
                <h4 className="text-xs font-bold text-neutral-900 uppercase tracking-wider flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-[#6D28D9]" />
                  <span>Activity Timeline &amp; Notes</span>
                </h4>

                {/* Add Note Form */}
                <form onSubmit={handleAddNote} className="flex gap-2">
                  <input
                    type="text"
                    value={newNote}
                    onChange={(e) => setNewNote(e.target.value)}
                    placeholder="Add an internal note or meeting summary..."
                    className="flex-1 px-3 py-2 rounded-xl border border-[#E9E7F2] bg-[#FAF9FF] text-xs focus:outline-none focus:border-[#6D28D9]"
                  />
                  <button
                    type="submit"
                    disabled={isSubmittingNote || !newNote.trim()}
                    className="px-4 py-2 rounded-xl bg-[#6D28D9] text-white text-xs font-bold hover:bg-[#5B21B6] transition-colors disabled:opacity-50 flex items-center gap-1"
                  >
                    <span>Save</span>
                    <Send className="w-3 h-3" />
                  </button>
                </form>

                {/* Notes List */}
                <div className="space-y-2">
                  {selectedLead.notes && selectedLead.notes.length > 0 ? (
                    selectedLead.notes.map((note: any) => (
                      <div key={note.id} className="p-3 rounded-xl bg-white border border-[#E9E7F2] text-xs space-y-1">
                        <p className="text-neutral-800">{note.note}</p>
                        <div className="text-[10px] font-mono text-neutral-400">
                          {new Date(note.createdAt).toLocaleString()}
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-xs text-neutral-400 italic">No notes added to this lead yet.</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
