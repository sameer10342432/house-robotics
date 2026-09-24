import React, { useEffect, useState } from 'react';
import { 
  Users, 
  MessageSquare, 
  Briefcase, 
  FileText, 
  Send, 
  TrendingUp, 
  CheckCircle2, 
  Clock, 
  ArrowRight,
  Sparkles,
  Phone,
  Mail,
  ShieldAlert,
  Star
} from 'lucide-react';
import { adminGetDashboard } from '../../utils/api';

interface DashboardViewProps {
  onNavigateTab: (tab: string) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({ onNavigateTab }) => {
  const [data, setData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    setIsLoading(true);
    try {
      const res = await adminGetDashboard();
      if (res.success && res.data) {
        setData(res.data);
      }
    } catch (e) {
      console.error('Failed to load dashboard metrics', e);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="p-8 flex items-center justify-center min-h-[400px]">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-3 border-violet-600 border-t-transparent rounded-full animate-spin" />
          <p className="text-xs font-semibold text-neutral-500">Loading Agency Analytics &amp; Pipeline Data...</p>
        </div>
      </div>
    );
  }

  const counts = data?.counts || {
    totalLeads: 0,
    newLeads: 0,
    qualifiedLeads: 0,
    wonLeads: 0,
    contactMessages: 0,
    newsletterSubscribers: 0,
    blogPosts: 0,
    publishedServices: 21,
    testimonials: 0
  };

  const statusMap = data?.leadStatusCounts || {};
  const statusLabels: Record<string, string> = {
    NEW: 'New Inquiries',
    CONTACTED: 'Contacted',
    QUALIFIED: 'Qualified',
    PROPOSAL_SENT: 'Proposal Sent',
    WON: 'Deals Won',
    LOST: 'Lost / Closed'
  };

  const statusColors: Record<string, string> = {
    NEW: 'bg-blue-500',
    CONTACTED: 'bg-amber-500',
    QUALIFIED: 'bg-purple-500',
    PROPOSAL_SENT: 'bg-indigo-500',
    WON: 'bg-emerald-500',
    LOST: 'bg-neutral-400'
  };

  return (
    <div className="space-y-8 p-6 lg:p-8 max-w-7xl mx-auto">
      {/* Top Banner / Welcome */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#6D28D9] via-[#4F46E5] to-[#2563EB] text-white shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md text-xs font-bold border border-white/20">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>House Robotics Command Center</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight font-['Space_Grotesk']">
            Agency Performance &amp; Client Pipeline
          </h2>
          <p className="text-xs sm:text-sm text-purple-100 max-w-xl leading-relaxed">
            Real-time pipeline monitoring, automated inquiry processing, and content administration.
          </p>
        </div>

        <div className="flex flex-wrap gap-2.5">
          <button
            onClick={() => onNavigateTab('leads')}
            className="px-4 py-2.5 rounded-xl bg-white text-[#6D28D9] text-xs font-extrabold hover:bg-neutral-100 shadow-md transition-all flex items-center gap-1.5"
          >
            <Users className="w-4 h-4" />
            <span>Open CRM Pipeline</span>
          </button>
          <button
            onClick={() => onNavigateTab('services')}
            className="px-4 py-2.5 rounded-xl bg-white/20 hover:bg-white/30 text-white text-xs font-extrabold backdrop-blur-md border border-white/20 transition-all flex items-center gap-1.5"
          >
            <Briefcase className="w-4 h-4" />
            <span>Manage 21 Services</span>
          </button>
        </div>
      </div>

      {/* Primary KPI Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
        {/* Card 1 */}
        <div className="p-5 rounded-2xl bg-white border border-[#E9E7F2] shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-neutral-500 uppercase tracking-wider">Total CRM Leads</span>
            <div className="w-8 h-8 rounded-xl bg-violet-50 text-[#6D28D9] flex items-center justify-center">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-neutral-900 font-['Space_Grotesk']">
            {counts.totalLeads}
          </div>
          <div className="text-[11px] font-semibold text-emerald-600 flex items-center gap-1">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>{counts.newLeads} new awaiting action</span>
          </div>
        </div>

        {/* Card 2 */}
        <div className="p-5 rounded-2xl bg-white border border-[#E9E7F2] shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-neutral-500 uppercase tracking-wider">Qualified Prospects</span>
            <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-neutral-900 font-['Space_Grotesk']">
            {counts.qualifiedLeads}
          </div>
          <div className="text-[11px] font-semibold text-neutral-500">
            High intent business leads
          </div>
        </div>

        {/* Card 3 */}
        <div className="p-5 rounded-2xl bg-white border border-[#E9E7F2] shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-neutral-500 uppercase tracking-wider">Contact Messages</span>
            <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <MessageSquare className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-neutral-900 font-['Space_Grotesk']">
            {counts.contactMessages}
          </div>
          <div className="text-[11px] font-semibold text-blue-600">
            Direct website inquiries
          </div>
        </div>

        {/* Card 4 */}
        <div className="p-5 rounded-2xl bg-white border border-[#E9E7F2] shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-neutral-500 uppercase tracking-wider">Subscribers</span>
            <div className="w-8 h-8 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
              <Send className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-neutral-900 font-['Space_Grotesk']">
            {counts.newsletterSubscribers}
          </div>
          <div className="text-[11px] font-semibold text-purple-600">
            Active newsletter readers
          </div>
        </div>

        {/* Card 5 */}
        <div className="p-5 rounded-2xl bg-white border border-[#E9E7F2] shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-neutral-500 uppercase tracking-wider">Published Services</span>
            <div className="w-8 h-8 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <Briefcase className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-neutral-900 font-['Space_Grotesk']">
            {counts.publishedServices}
          </div>
          <div className="text-[11px] font-semibold text-neutral-500">
            Core Agency Capabilities
          </div>
        </div>

        {/* Card 6 */}
        <div className="p-5 rounded-2xl bg-white border border-[#E9E7F2] shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-neutral-500 uppercase tracking-wider">Blog Articles</span>
            <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <FileText className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-neutral-900 font-['Space_Grotesk']">
            {counts.blogPosts}
          </div>
          <div className="text-[11px] font-semibold text-amber-600">
            Live insights &amp; guides
          </div>
        </div>

        {/* Card 7 */}
        <div className="p-5 rounded-2xl bg-white border border-[#E9E7F2] shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-neutral-500 uppercase tracking-wider">Testimonials</span>
            <div className="w-8 h-8 rounded-xl bg-yellow-50 text-yellow-600 flex items-center justify-center">
              <Star className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-neutral-900 font-['Space_Grotesk']">
            {counts.testimonials}
          </div>
          <div className="text-[11px] font-semibold text-neutral-500">
            Verified client reviews
          </div>
        </div>

        {/* Card 8 */}
        <div className="p-5 rounded-2xl bg-white border border-[#E9E7F2] shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-neutral-500 uppercase tracking-wider">Deals Won</span>
            <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-neutral-900 font-['Space_Grotesk']">
            {counts.wonLeads}
          </div>
          <div className="text-[11px] font-semibold text-emerald-600">
            Successfully closed clients
          </div>
        </div>
      </div>

      {/* Middle Section: Lead Status Distribution + Lead Source */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Pipeline Distribution Chart / Progress Bars */}
        <div className="lg:col-span-7 bg-white p-6 sm:p-7 rounded-3xl border border-[#E9E7F2] shadow-xs space-y-5">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-neutral-900">Lead Pipeline Status</h3>
              <p className="text-xs text-neutral-500">Distribution of commercial inquiries across pipeline stages</p>
            </div>
            <button
              onClick={() => onNavigateTab('leads')}
              className="text-xs font-bold text-[#6D28D9] hover:underline flex items-center gap-1"
            >
              <span>View all leads</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-3.5 pt-2">
            {['NEW', 'CONTACTED', 'QUALIFIED', 'PROPOSAL_SENT', 'WON', 'LOST'].map((statusKey) => {
              const count = statusMap[statusKey] || 0;
              const total = counts.totalLeads || 1;
              const percent = Math.round((count / total) * 100);

              return (
                <div key={statusKey} className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-neutral-700">
                      {statusLabels[statusKey] || statusKey}
                    </span>
                    <span className="font-mono text-neutral-500">
                      {count} ({percent}%)
                    </span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-neutral-100 overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${statusColors[statusKey] || 'bg-violet-600'}`}
                      style={{ width: `${Math.max(count > 0 ? 5 : 0, percent)}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Official Agency Quick Info */}
        <div className="lg:col-span-5 bg-white p-6 sm:p-7 rounded-3xl border border-[#E9E7F2] shadow-xs space-y-5">
          <div>
            <h3 className="text-base font-bold text-neutral-900">Agency Channels</h3>
            <p className="text-xs text-neutral-500">Official verified client communication endpoints</p>
          </div>

          <div className="space-y-3">
            <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200/60 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[11px] font-bold text-emerald-800 uppercase">Official WhatsApp Desk</div>
                  <div className="text-xs font-mono font-bold text-emerald-950">+92 347 4542881</div>
                </div>
              </div>
              <span className="text-[10px] font-bold bg-emerald-200 text-emerald-900 px-2 py-0.5 rounded-full">
                Active 24/7
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-violet-50/70 border border-violet-200/60 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#6D28D9] text-white flex items-center justify-center">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[11px] font-bold text-violet-800 uppercase">Executive Direct Email</div>
                  <div className="text-xs font-mono font-bold text-violet-950">sameerliaqat81@gmail.com</div>
                </div>
              </div>
              <span className="text-[10px] font-bold bg-violet-200 text-violet-900 px-2 py-0.5 rounded-full">
                Verified
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-neutral-50 border border-neutral-200 text-xs text-neutral-600 leading-relaxed">
              <span className="font-bold text-neutral-900 block mb-1">Production Security Protocol:</span>
              All incoming client inquiries are encrypted, recorded in the PostgreSQL database, and forwarded instantaneously to the verified administrative desk.
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Grid: Recent Inbound Leads Table */}
      <div className="bg-white rounded-3xl border border-[#E9E7F2] shadow-xs overflow-hidden">
        <div className="p-6 border-b border-[#E9E7F2] flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-neutral-900">Recent Inbound Leads</h3>
            <p className="text-xs text-neutral-500">Live submissions captured through contact forms and consultation requests</p>
          </div>
          <button
            onClick={() => onNavigateTab('leads')}
            className="text-xs font-bold text-[#6D28D9] hover:underline"
          >
            Open CRM →
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#FAF9FF] text-neutral-500 uppercase tracking-wider font-semibold border-b border-[#E9E7F2]">
              <tr>
                <th className="py-3 px-4">Ref ID</th>
                <th className="py-3 px-4">Prospect</th>
                <th className="py-3 px-4">Service</th>
                <th className="py-3 px-4">Budget</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100 text-neutral-700">
              {data?.recentLeads && data.recentLeads.length > 0 ? (
                data.recentLeads.map((lead: any) => (
                  <tr key={lead.id} className="hover:bg-[#FAF9FF]/50 transition-colors">
                    <td className="py-3.5 px-4 font-mono font-bold text-[#6D28D9]">
                      {lead.inquiryId}
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-neutral-900">{lead.name}</div>
                      <div className="text-[11px] text-neutral-500">{lead.company || lead.email}</div>
                    </td>
                    <td className="py-3.5 px-4 font-medium text-neutral-800">
                      {lead.service || 'General Inbound'}
                    </td>
                    <td className="py-3.5 px-4 font-mono text-neutral-600">
                      {lead.budget || 'Custom'}
                    </td>
                    <td className="py-3.5 px-4">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        lead.status === 'NEW'
                          ? 'bg-blue-100 text-blue-800'
                          : lead.status === 'QUALIFIED'
                          ? 'bg-purple-100 text-purple-800'
                          : lead.status === 'WON'
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-neutral-100 text-neutral-800'
                      }`}>
                        {lead.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 font-mono text-neutral-400 text-[11px]">
                      {new Date(lead.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-neutral-400">
                    No leads recorded yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
