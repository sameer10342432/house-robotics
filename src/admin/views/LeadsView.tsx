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
  Tag,
  Download,
  Calendar,
  AlertTriangle,
  Globe,
  MapPin,
  FileText,
  ShieldCheck,
  Check
} from 'lucide-react';
import { 
  adminGetLeads, 
  adminUpdateLeadStatus, 
  adminAddLeadNote, 
  adminScheduleFollowUp, 
  adminCompleteFollowUp,
  adminExportLeadsCsv
} from '../../utils/api';

export const LeadsView: React.FC = () => {
  const [leads, setLeads] = useState<any[]>([]);
  const [pagination, setPagination] = useState<any>({ total: 0, page: 1, limit: 20 });
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [followUpFilter, setFollowUpFilter] = useState('ALL');
  const [serviceFilter, setServiceFilter] = useState('ALL');
  const [dateRangeFilter, setDateRangeFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  // Selected lead for detail drawer
  const [selectedLead, setSelectedLead] = useState<any | null>(null);
  const [newNote, setNewNote] = useState('');
  const [isSubmittingNote, setIsSubmittingNote] = useState(false);

  // Follow-up scheduling form state
  const [scheduleDate, setScheduleDate] = useState('');
  const [scheduleNote, setScheduleNote] = useState('');
  const [isScheduling, setIsScheduling] = useState(false);
  const [scheduleSuccessMsg, setScheduleSuccessMsg] = useState('');

  useEffect(() => {
    fetchLeads(1);
  }, [statusFilter, followUpFilter, serviceFilter, dateRangeFilter, search]);

  const fetchLeads = async (page = 1) => {
    setIsLoading(true);
    try {
      const res = await adminGetLeads({
        status: statusFilter === 'ALL' ? undefined : statusFilter,
        followUp: followUpFilter === 'ALL' ? undefined : followUpFilter,
        service: serviceFilter === 'ALL' ? undefined : serviceFilter,
        dateRange: dateRangeFilter === 'all' ? undefined : dateRangeFilter,
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

  const handleScheduleFollowUp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedLead || !scheduleDate) return;

    setIsScheduling(true);
    setScheduleSuccessMsg('');
    try {
      const res = await adminScheduleFollowUp(selectedLead.id, {
        followUpDate: scheduleDate,
        followUpNote: scheduleNote.trim() || undefined
      });

      if (res.success && res.data) {
        const updated = {
          ...selectedLead,
          followUpDate: scheduleDate,
          followUpStatus: 'PENDING',
          followUpNote: scheduleNote.trim() || null
        };
        setSelectedLead(updated);
        setLeads(prev => prev.map(l => l.id === selectedLead.id ? { ...l, ...updated } : l));
        setScheduleSuccessMsg('Follow-up scheduled successfully!');
        setScheduleNote('');
        setTimeout(() => setScheduleSuccessMsg(''), 4000);
      }
    } catch (e) {
      console.error('Failed to schedule follow-up', e);
    } finally {
      setIsScheduling(false);
    }
  };

  const handleCompleteFollowUp = async () => {
    if (!selectedLead) return;
    try {
      const res = await adminCompleteFollowUp(selectedLead.id);
      if (res.success) {
        const updated = {
          ...selectedLead,
          followUpStatus: 'COMPLETED'
        };
        setSelectedLead(updated);
        setLeads(prev => prev.map(l => l.id === selectedLead.id ? { ...l, followUpStatus: 'COMPLETED' } : l));
        setScheduleSuccessMsg('Follow-up marked complete!');
        setTimeout(() => setScheduleSuccessMsg(''), 4000);
      }
    } catch (e) {
      console.error('Failed to complete follow-up', e);
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

  const handleExportCsv = () => {
    adminExportLeadsCsv({
      status: statusFilter === 'ALL' ? undefined : statusFilter,
      followUp: followUpFilter === 'ALL' ? undefined : followUpFilter,
      service: serviceFilter === 'ALL' ? undefined : serviceFilter,
      search: search.trim() || undefined
    });
  };

  const statusBadges: Record<string, string> = {
    NEW: 'bg-blue-100 text-blue-800 border-blue-200',
    CONTACTED: 'bg-amber-100 text-amber-800 border-amber-200',
    QUALIFIED: 'bg-purple-100 text-purple-800 border-purple-200',
    PROPOSAL_SENT: 'bg-indigo-100 text-indigo-800 border-indigo-200',
    WON: 'bg-emerald-100 text-emerald-800 border-emerald-200',
    LOST: 'bg-neutral-100 text-neutral-600 border-neutral-200'
  };

  const followUpBadges: Record<string, { label: string; cls: string; icon: any }> = {
    OVERDUE: { label: 'Overdue', cls: 'bg-rose-100 text-rose-800 border-rose-200', icon: AlertTriangle },
    TODAY: { label: 'Due Today', cls: 'bg-amber-100 text-amber-800 border-amber-200', icon: Clock },
    UPCOMING: { label: 'Upcoming', cls: 'bg-purple-100 text-purple-800 border-purple-200', icon: Calendar },
    COMPLETED: { label: 'Completed', cls: 'bg-emerald-100 text-emerald-800 border-emerald-200', icon: CheckCircle2 },
    PENDING: { label: 'Pending', cls: 'bg-blue-100 text-blue-800 border-blue-200', icon: Clock },
    NONE: { label: 'No Follow-up', cls: 'bg-neutral-100 text-neutral-500 border-neutral-200', icon: Clock }
  };

  return (
    <div className="space-y-6 p-6 lg:p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-extrabold text-neutral-900 font-['Space_Grotesk']">
            Lead Management &amp; CRM Pipeline
          </h2>
          <p className="text-xs text-neutral-500 mt-0.5">
            Capture inbound US enquiries, assign follow-up tasks, track communications, and manage pipeline velocity.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={handleExportCsv}
            className="px-3.5 py-2 rounded-xl bg-white border border-[#E9E7F2] text-xs font-bold text-neutral-700 hover:border-[#6D28D9] hover:text-[#6D28D9] transition-colors shadow-xs flex items-center gap-1.5"
            title="Download verified leads to CSV with formula-injection security protection"
          >
            <Download className="w-3.5 h-3.5 text-[#6D28D9]" />
            <span>Export CSV</span>
          </button>
          <div className="text-xs font-semibold text-neutral-500 bg-white px-3 py-2 rounded-xl border border-[#E9E7F2] shadow-xs">
            Total Leads: <span className="font-bold text-[#6D28D9]">{pagination.total}</span>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-[#E9E7F2] shadow-xs space-y-3">
        <div className="flex flex-col md:flex-row gap-3 items-center justify-between">
          {/* Search Box */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by prospect, company, email, city..."
              className="w-full pl-9 pr-3 py-2 rounded-xl border border-[#E9E7F2] bg-[#FAF9FF] text-xs text-neutral-900 focus:outline-none focus:border-[#6D28D9]"
            />
          </div>

          {/* Service & Date Range Dropdowns */}
          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
            <select
              value={serviceFilter}
              onChange={(e) => setServiceFilter(e.target.value)}
              className="px-3 py-2 rounded-xl border border-[#E9E7F2] bg-[#FAF9FF] text-xs font-medium text-neutral-700 focus:outline-none focus:border-[#6D28D9]"
            >
              <option value="ALL">All Services</option>
              <option value="SEO">SEO Services</option>
              <option value="Web Development">Web Development</option>
              <option value="Digital Marketing">Digital Marketing / PPC</option>
              <option value="AI Automation">AI &amp; Workflow Automation</option>
              <option value="E-Commerce">E-Commerce Development</option>
            </select>

            <select
              value={dateRangeFilter}
              onChange={(e) => setDateRangeFilter(e.target.value)}
              className="px-3 py-2 rounded-xl border border-[#E9E7F2] bg-[#FAF9FF] text-xs font-medium text-neutral-700 focus:outline-none focus:border-[#6D28D9]"
            >
              <option value="all">All Dates</option>
              <option value="today">Today</option>
              <option value="7d">Last 7 Days</option>
              <option value="30d">Last 30 Days</option>
              <option value="90d">Last 90 Days</option>
            </select>
          </div>
        </div>

        {/* Status & Follow-Up Filter Tabs */}
        <div className="pt-2 border-t border-neutral-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          {/* Status Tabs */}
          <div className="flex flex-wrap gap-1">
            <span className="text-[10px] uppercase font-bold text-neutral-400 self-center mr-1">Status:</span>
            {['ALL', 'NEW', 'CONTACTED', 'QUALIFIED', 'PROPOSAL_SENT', 'WON', 'LOST'].map((s) => (
              <button
                key={s}
                onClick={() => setStatusFilter(s)}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                  statusFilter === s
                    ? 'bg-[#6D28D9] text-white shadow-xs'
                    : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                }`}
              >
                {s}
              </button>
            ))}
          </div>

          {/* Follow-Up Tabs */}
          <div className="flex flex-wrap gap-1">
            <span className="text-[10px] uppercase font-bold text-neutral-400 self-center mr-1">Follow-Up:</span>
            {[
              { id: 'ALL', label: 'All Tasks' },
              { id: 'TODAY', label: 'Due Today' },
              { id: 'OVERDUE', label: 'Overdue' },
              { id: 'UPCOMING', label: 'Upcoming' },
              { id: 'COMPLETED', label: 'Done' }
            ].map((f) => (
              <button
                key={f.id}
                onClick={() => setFollowUpFilter(f.id)}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                  followUpFilter === f.id
                    ? 'bg-neutral-900 text-white shadow-xs'
                    : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Table */}
      <div className="bg-white rounded-3xl border border-[#E9E7F2] shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#FAF9FF] text-neutral-500 uppercase tracking-wider font-semibold border-b border-[#E9E7F2]">
              <tr>
                <th className="py-3.5 px-4">Ref ID</th>
                <th className="py-3.5 px-4">Prospect &amp; Company</th>
                <th className="py-3.5 px-4">Service &amp; Budget</th>
                <th className="py-3.5 px-4">Location</th>
                <th className="py-3.5 px-4">Follow-Up Task</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4">Date</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100 text-neutral-700">
              {isLoading ? (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-neutral-400">
                    <div className="w-6 h-6 border-2 border-[#6D28D9] border-t-transparent rounded-full animate-spin mx-auto mb-2" />
                    Loading lead records...
                  </td>
                </tr>
              ) : leads.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-neutral-400">
                    No leads matching current filters found.
                  </td>
                </tr>
              ) : (
                leads.map((lead) => {
                  const followUpBadge = followUpBadges[lead.followUpStatus] || followUpBadges.NONE;
                  const FollowUpIcon = followUpBadge.icon;

                  return (
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
                        <div className="text-[11px] text-neutral-500 flex items-center gap-1.5">
                          <span>{lead.company || 'Direct Client'}</span>
                          <span>·</span>
                          <span className="truncate max-w-[150px]">{lead.email}</span>
                        </div>
                      </td>
                      <td className="py-3.5 px-4">
                        <div className="font-semibold text-neutral-800">{lead.service || 'General Inbound'}</div>
                        <div className="text-[11px] font-mono text-neutral-500">{lead.budget || 'Custom'}</div>
                      </td>
                      <td className="py-3.5 px-4">
                        <div className="text-neutral-700 font-medium">
                          {lead.city ? `${lead.city}${lead.state ? `, ${lead.state}` : ''}` : 'National / Remote'}
                        </div>
                        <div className="text-[10px] text-neutral-400">{lead.source || 'Website'}</div>
                      </td>
                      <td className="py-3.5 px-4">
                        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-bold border ${followUpBadge.cls}`}>
                          <FollowUpIcon className="w-3 h-3" />
                          <span>{followUpBadge.label}</span>
                        </span>
                        {lead.followUpDate && (
                          <div className="text-[10px] font-mono text-neutral-400 mt-0.5">
                            {new Date(lead.followUpDate).toLocaleDateString()}
                          </div>
                        )}
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
                          <span>Manage</span>
                          <ChevronRight className="w-3 h-3" />
                        </button>
                      </td>
                    </tr>
                  );
                })
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
            className="w-full max-w-2xl h-full bg-white shadow-2xl overflow-y-auto flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Drawer Header */}
            <div className="p-6 border-b border-[#E9E7F2] bg-[#FAF9FF] flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                  <span className="font-mono text-xs font-bold text-[#6D28D9] bg-violet-100 px-2 py-0.5 rounded">
                    {selectedLead.inquiryId}
                  </span>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${statusBadges[selectedLead.status]}`}>
                    {selectedLead.status}
                  </span>
                  {selectedLead.followUpStatus && selectedLead.followUpStatus !== 'NONE' && (
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${followUpBadges[selectedLead.followUpStatus]?.cls || 'bg-neutral-100'}`}>
                      Follow-up: {selectedLead.followUpStatus}
                    </span>
                  )}
                </div>
                <h3 className="text-xl font-bold text-neutral-900">{selectedLead.name}</h3>
                <p className="text-xs text-neutral-500">{selectedLead.company || 'Direct Client'}</p>
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
                {selectedLead.phone ? (
                  <a
                    href={`https://wa.me/${selectedLead.phone.replace(/[^0-9]/g, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center justify-center gap-2 hover:bg-emerald-100 transition-colors"
                  >
                    <MessageSquare className="w-4 h-4 text-emerald-600" />
                    <span>WhatsApp ({selectedLead.phone})</span>
                  </a>
                ) : (
                  <div className="p-3 rounded-xl bg-neutral-50 border border-neutral-200 text-neutral-400 text-xs text-center">
                    No Phone Provided
                  </div>
                )}
                {selectedLead.email && (
                  <a
                    href={`mailto:${selectedLead.email}?subject=Re:%20House%20Robotics%20Proposal%20[${selectedLead.inquiryId}]`}
                    className="p-3 rounded-xl bg-violet-50 border border-violet-200 text-violet-800 text-xs font-bold flex items-center justify-center gap-2 hover:bg-violet-100 transition-colors"
                  >
                    <Mail className="w-4 h-4 text-[#6D28D9]" />
                    <span>Send Email Reply</span>
                  </a>
                )}
              </div>

              {/* Follow-Up Management Section */}
              <div className="p-4 rounded-2xl bg-[#FAF9FF] border border-[#E9E7F2] space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-neutral-900 uppercase tracking-wider flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-[#6D28D9]" />
                    <span>Follow-Up Task Management</span>
                  </h4>
                  {selectedLead.followUpStatus && selectedLead.followUpStatus !== 'COMPLETED' && selectedLead.followUpStatus !== 'NONE' && (
                    <button
                      onClick={handleCompleteFollowUp}
                      className="px-2.5 py-1 rounded-lg bg-emerald-100 text-emerald-800 text-[11px] font-bold hover:bg-emerald-200 transition-colors flex items-center gap-1"
                    >
                      <Check className="w-3 h-3" />
                      <span>Mark Complete</span>
                    </button>
                  )}
                </div>

                {scheduleSuccessMsg && (
                  <div className="p-2.5 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs">
                    {scheduleSuccessMsg}
                  </div>
                )}

                {selectedLead.followUpDate ? (
                  <div className="text-xs space-y-1 p-2.5 bg-white rounded-xl border border-[#E9E7F2]">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-neutral-800">
                        Scheduled Date: {new Date(selectedLead.followUpDate).toLocaleDateString()}
                      </span>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${followUpBadges[selectedLead.followUpStatus]?.cls || 'bg-neutral-100'}`}>
                        {selectedLead.followUpStatus}
                      </span>
                    </div>
                    {selectedLead.followUpNote && (
                      <p className="text-neutral-600 text-[11px] italic">"{selectedLead.followUpNote}"</p>
                    )}
                  </div>
                ) : (
                  <p className="text-xs text-neutral-500">No scheduled follow-up for this lead.</p>
                )}

                {/* Schedule/Reschedule Form */}
                <form onSubmit={handleScheduleFollowUp} className="pt-2 border-t border-neutral-200 space-y-2">
                  <span className="text-[10px] uppercase font-bold text-neutral-400 block">
                    {selectedLead.followUpDate ? 'Reschedule Follow-Up Date & Note:' : 'Schedule a Follow-Up Task:'}
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <input
                      type="date"
                      value={scheduleDate}
                      onChange={(e) => setScheduleDate(e.target.value)}
                      required
                      className="px-3 py-1.5 rounded-xl border border-[#E9E7F2] bg-white text-xs focus:outline-none focus:border-[#6D28D9]"
                    />
                    <input
                      type="text"
                      value={scheduleNote}
                      onChange={(e) => setScheduleNote(e.target.value)}
                      placeholder="e.g. Call regarding proposal feedback"
                      className="px-3 py-1.5 rounded-xl border border-[#E9E7F2] bg-white text-xs focus:outline-none focus:border-[#6D28D9]"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={isScheduling || !scheduleDate}
                    className="w-full py-2 rounded-xl bg-[#6D28D9] text-white text-xs font-bold hover:bg-[#5B21B6] transition-colors disabled:opacity-50"
                  >
                    {isScheduling ? 'Saving Task...' : 'Save Follow-Up Reminder'}
                  </button>
                </form>
              </div>

              {/* Comprehensive Lead Details Card */}
              <div className="p-4 rounded-2xl bg-white border border-[#E9E7F2] space-y-3 text-xs">
                <h4 className="text-xs font-bold text-neutral-900 uppercase tracking-wider flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5 text-[#6D28D9]" />
                  <span>Lead Intelligence &amp; Brief</span>
                </h4>

                <div className="grid grid-cols-2 gap-2.5">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-neutral-400 block">Phone / WhatsApp</span>
                    <span className="font-semibold text-neutral-800">{selectedLead.phone || 'N/A'}</span>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-neutral-400 block">Business Email</span>
                    <span className="font-semibold text-neutral-800">{selectedLead.email}</span>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-neutral-400 block">Company Name</span>
                    <span className="font-semibold text-neutral-800">{selectedLead.company || 'N/A'}</span>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-neutral-400 block">Website URL</span>
                    {selectedLead.websiteUrl ? (
                      <a
                        href={selectedLead.websiteUrl.startsWith('http') ? selectedLead.websiteUrl : `https://${selectedLead.websiteUrl}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-semibold text-[#6D28D9] hover:underline flex items-center gap-1"
                      >
                        <span className="truncate max-w-[150px]">{selectedLead.websiteUrl}</span>
                        <ExternalLink className="w-3 h-3 shrink-0" />
                      </a>
                    ) : (
                      <span className="font-semibold text-neutral-400">Not provided</span>
                    )}
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-neutral-400 block">Location</span>
                    <span className="font-semibold text-neutral-800">
                      {selectedLead.city ? `${selectedLead.city}${selectedLead.state ? `, ${selectedLead.state}` : ''}` : 'National / Remote'}
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-neutral-400 block">Target Service</span>
                    <span className="font-semibold text-neutral-800">{selectedLead.service || 'N/A'}</span>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-neutral-400 block">Budget Scope</span>
                    <span className="font-semibold text-neutral-800">{selectedLead.budget || 'Custom'}</span>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-neutral-400 block">Target Timeline</span>
                    <span className="font-semibold text-neutral-800">{selectedLead.timeline || 'Flexible'}</span>
                  </div>
                </div>

                {/* Service Details (Conditional answers) */}
                {selectedLead.serviceDetails && (
                  <div className="pt-2 border-t border-neutral-100">
                    <span className="text-[10px] uppercase font-bold text-neutral-400 block mb-1">Service-Specific Context</span>
                    <p className="text-neutral-700 bg-[#FAF9FF] p-2.5 rounded-xl border border-[#E9E7F2] font-mono text-[11px]">
                      {typeof selectedLead.serviceDetails === 'string' 
                        ? selectedLead.serviceDetails 
                        : JSON.stringify(selectedLead.serviceDetails, null, 2)}
                    </p>
                  </div>
                )}

                {/* Inquiry Brief */}
                <div className="pt-2 border-t border-neutral-100">
                  <span className="text-[10px] uppercase font-bold text-neutral-400 block mb-1">Inbound Brief / Message</span>
                  <p className="text-neutral-700 leading-relaxed bg-[#FAF9FF] p-3 rounded-xl border border-[#E9E7F2]">
                    {selectedLead.message || 'No written message provided.'}
                  </p>
                </div>

                {/* Attribution & Source Details */}
                <div className="pt-2 border-t border-neutral-100 space-y-1.5 text-[11px]">
                  <span className="text-[10px] uppercase font-bold text-neutral-400 block">Attribution &amp; Source Tracking</span>
                  <div className="grid grid-cols-2 gap-2 text-neutral-600">
                    <div>Source: <span className="font-bold text-neutral-800">{selectedLead.source || 'Website'}</span></div>
                    <div>Consent: <span className="font-bold text-emerald-700">Confirmed (100%)</span></div>
                    {selectedLead.utmSource && <div>UTM Source: <span className="font-mono">{selectedLead.utmSource}</span></div>}
                    {selectedLead.utmMedium && <div>UTM Medium: <span className="font-mono">{selectedLead.utmMedium}</span></div>}
                    {selectedLead.utmCampaign && <div>UTM Campaign: <span className="font-mono">{selectedLead.utmCampaign}</span></div>}
                  </div>
                  {selectedLead.pageUrl && (
                    <div className="truncate text-neutral-500">
                      Page: <a href={selectedLead.pageUrl} target="_blank" rel="noopener noreferrer" className="text-[#6D28D9] hover:underline font-mono">{selectedLead.pageUrl}</a>
                    </div>
                  )}
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
                          {new Date(note.createdAt).toLocaleString()} · {note.authorName || 'Admin'}
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
