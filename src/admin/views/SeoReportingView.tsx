import React, { useState, useEffect } from 'react';
import { 
  BarChart3, 
  Calendar, 
  Filter, 
  Download, 
  TrendingUp, 
  MapPin, 
  Briefcase, 
  Globe, 
  CheckCircle2, 
  AlertCircle, 
  ExternalLink,
  MessageSquare,
  Sparkles,
  RefreshCw,
  Search,
  Activity,
  Layers,
  ArrowUpRight
} from 'lucide-react';
import { adminGetReports } from '../../utils/api';

export const SeoReportingView: React.FC = () => {
  const [reportsData, setReportsData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Filter States
  const [dateRange, setDateRange] = useState('all');
  const [selectedService, setSelectedService] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [cityFilter, setCityFilter] = useState('');
  const [stateFilter, setStateFilter] = useState('');

  useEffect(() => {
    fetchReport();
  }, [dateRange, selectedService, selectedStatus]);

  const fetchReport = async () => {
    setIsLoading(true);
    try {
      const res = await adminGetReports({
        dateRange,
        service: selectedService !== 'all' ? selectedService : undefined,
        status: selectedStatus !== 'all' ? selectedStatus : undefined,
        city: cityFilter || undefined,
        state: stateFilter || undefined
      });
      if (res.success && res.data) {
        setReportsData(res.data);
      }
    } catch (e) {
      console.error('Failed to load SEO & Lead Reports', e);
    } finally {
      setIsLoading(false);
    }
  };

  const handleApplyTextFilters = (e: React.FormEvent) => {
    e.preventDefault();
    fetchReport();
  };

  const exportReportCsv = () => {
    if (!reportsData?.recentLeads?.length) return;
    const headers = ['Inquiry ID', 'Name', 'Email', 'Service', 'City', 'State', 'Status', 'Landing Page', 'Date'];
    const rows = reportsData.recentLeads.map((l: any) => [
      `"${l.id}"`,
      `"${l.name || ''}"`,
      `"${l.email || ''}"`,
      `"${l.serviceInterest || ''}"`,
      `"${l.city || ''}"`,
      `"${l.state || ''}"`,
      `"${l.status || ''}"`,
      `"${l.sourceUrl || ''}"`,
      `"${l.createdAt || ''}"`
    ]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((r: any) => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `house-robotics-lead-report-${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const summary = reportsData?.summary || { totalMatchingLeads: 0, totalAllTimeLeads: 0, qualifiedLeads: 0, wonLeads: 0 };
  const topServices = reportsData?.topServices || [];
  const topCities = reportsData?.topCities || [];
  const topSources = reportsData?.topSources || [];
  const topLocationPages = reportsData?.topLocationPages || [];
  const events = reportsData?.eventsSummary || [];
  const external = reportsData?.externalAnalytics;

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-[#E9E7F2]">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-[#F3F0FF] text-[#6D28D9] text-[11px] font-bold mb-1">
            <BarChart3 className="w-3.5 h-3.5" />
            <span>USA Growth &amp; Attribution Telemetry</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-neutral-950 font-['Space_Grotesk'] tracking-tight">
            SEO Performance &amp; Inbound Lead Reporting
          </h2>
          <p className="text-xs sm:text-sm text-neutral-500 mt-0.5">
            Real-time attribution, geographic conversion hotspots, and verified search telemetry.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={fetchReport}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white border border-[#E9E7F2] text-xs font-semibold text-neutral-700 hover:bg-neutral-50 shadow-xs transition-colors"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
            <span>Refresh</span>
          </button>

          <button
            onClick={exportReportCsv}
            disabled={!reportsData?.recentLeads?.length}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#6D28D9] hover:bg-[#5B21B6] text-white text-xs font-bold shadow-xs transition-all disabled:opacity-50"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* Filter Engine */}
      <div className="bg-white rounded-2xl border border-[#E9E7F2] p-4 shadow-xs space-y-3">
        <div className="flex items-center gap-2 text-xs font-bold text-neutral-700">
          <Filter className="w-3.5 h-3.5 text-[#6D28D9]" />
          <span>Interactive Attribution Filters</span>
        </div>

        <form onSubmit={handleApplyTextFilters} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {/* Date Range */}
          <div>
            <label className="block text-[11px] font-bold text-neutral-500 mb-1">Date Range</label>
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="w-full text-xs font-semibold px-3 py-2 rounded-xl border border-[#E9E7F2] bg-white text-neutral-800 focus:outline-none focus:border-[#6D28D9]"
            >
              <option value="all">All-Time Pipeline</option>
              <option value="7d">Last 7 Days</option>
              <option value="30d">Last 30 Days</option>
              <option value="90d">Last 90 Days</option>
            </select>
          </div>

          {/* Service Filter */}
          <div>
            <label className="block text-[11px] font-bold text-neutral-500 mb-1">Target Service</label>
            <select
              value={selectedService}
              onChange={(e) => setSelectedService(e.target.value)}
              className="w-full text-xs font-semibold px-3 py-2 rounded-xl border border-[#E9E7F2] bg-white text-neutral-800 focus:outline-none focus:border-[#6D28D9]"
            >
              <option value="all">All Services</option>
              <option value="Custom Website Development">Web Development</option>
              <option value="SEO">SEO Services</option>
              <option value="Local SEO">Local SEO / Maps</option>
              <option value="PPC">PPC / Google Ads</option>
              <option value="AI Automation">AI Automation</option>
              <option value="Social Media">Social Media</option>
            </select>
          </div>

          {/* Lead Status */}
          <div>
            <label className="block text-[11px] font-bold text-neutral-500 mb-1">Lead Stage</label>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full text-xs font-semibold px-3 py-2 rounded-xl border border-[#E9E7F2] bg-white text-neutral-800 focus:outline-none focus:border-[#6D28D9]"
            >
              <option value="all">All Stages</option>
              <option value="NEW">New Inquiries</option>
              <option value="CONTACTED">Contacted</option>
              <option value="QUALIFIED">Qualified</option>
              <option value="PROPOSAL_SENT">Proposal Sent</option>
              <option value="WON">Closed Won</option>
              <option value="LOST">Closed Lost</option>
            </select>
          </div>

          {/* City / State Text Search */}
          <div>
            <label className="block text-[11px] font-bold text-neutral-500 mb-1">Filter by City</label>
            <input
              type="text"
              placeholder="e.g. Austin, Miami..."
              value={cityFilter}
              onChange={(e) => setCityFilter(e.target.value)}
              className="w-full text-xs font-medium px-3 py-2 rounded-xl border border-[#E9E7F2] bg-white text-neutral-800 focus:outline-none focus:border-[#6D28D9]"
            />
          </div>

          <div className="flex items-end">
            <button
              type="submit"
              className="w-full text-xs font-bold py-2 px-3 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white transition-colors"
            >
              Apply Filter
            </button>
          </div>
        </form>
      </div>

      {/* Summary KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl border border-[#E9E7F2] p-4 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider">Filtered Inquiries</span>
            <div className="w-7 h-7 rounded-lg bg-violet-50 text-[#6D28D9] flex items-center justify-center">
              <MessageSquare className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-neutral-900 mt-2 font-['Space_Grotesk']">
            {summary.totalMatchingLeads}
          </div>
          <p className="text-[11px] text-neutral-500 mt-1">
            Matching current filter parameters
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-[#E9E7F2] p-4 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider">All-Time Pipeline</span>
            <div className="w-7 h-7 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
              <TrendingUp className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-neutral-900 mt-2 font-['Space_Grotesk']">
            {summary.totalAllTimeLeads}
          </div>
          <p className="text-[11px] text-neutral-500 mt-1">
            Total CRM recorded commercial leads
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-[#E9E7F2] p-4 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider">Qualified Prospects</span>
            <div className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <CheckCircle2 className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-emerald-600 mt-2 font-['Space_Grotesk']">
            {summary.qualifiedLeads}
          </div>
          <p className="text-[11px] text-neutral-500 mt-1">
            High commercial intent &amp; budget verified
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-[#E9E7F2] p-4 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider">Closed Won Deals</span>
            <div className="w-7 h-7 rounded-lg bg-purple-50 text-purple-700 flex items-center justify-center">
              <Sparkles className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-purple-700 mt-2 font-['Space_Grotesk']">
            {summary.wonLeads}
          </div>
          <p className="text-[11px] text-neutral-500 mt-1">
            Contracted active client engagements
          </p>
        </div>
      </div>

      {/* Analytics Telemetry & Breakdowns */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Top Services Breakdown */}
        <div className="bg-white rounded-2xl border border-[#E9E7F2] p-5 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
            <div className="flex items-center gap-2">
              <Briefcase className="w-4 h-4 text-[#6D28D9]" />
              <h3 className="text-sm font-bold text-neutral-900">Leads by Service Interest</h3>
            </div>
            <span className="text-[11px] font-mono text-neutral-400">{topServices.length} categories</span>
          </div>

          <div className="space-y-3">
            {topServices.length === 0 ? (
              <p className="text-xs text-neutral-400 py-4 text-center">No service inquiries in this filter range.</p>
            ) : (
              topServices.slice(0, 5).map((srv: any, idx: number) => {
                const pct = summary.totalMatchingLeads > 0 ? Math.round((srv.count / summary.totalMatchingLeads) * 100) : 0;
                return (
                  <div key={idx} className="space-y-1">
                    <div className="flex justify-between text-xs font-semibold">
                      <span className="text-neutral-700 truncate max-w-[200px]">{srv.name}</span>
                      <span className="text-neutral-900 font-bold">{srv.count} ({pct}%)</span>
                    </div>
                    <div className="w-full h-1.5 bg-neutral-100 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-[#6D28D9] to-blue-600 rounded-full" style={{ width: `${pct}%` }} />
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Top Geographic Metros */}
        <div className="bg-white rounded-2xl border border-[#E9E7F2] p-5 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-emerald-600" />
              <h3 className="text-sm font-bold text-neutral-900">Top US Geographic Metros</h3>
            </div>
            <span className="text-[11px] font-mono text-neutral-400">{topCities.length} metros</span>
          </div>

          <div className="space-y-3">
            {topCities.length === 0 ? (
              <p className="text-xs text-neutral-400 py-4 text-center">No city-attributed leads in this range.</p>
            ) : (
              topCities.slice(0, 5).map((cty: any, idx: number) => (
                <div key={idx} className="flex items-center justify-between text-xs py-1 border-b border-neutral-50 last:border-0">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-md bg-emerald-50 text-emerald-700 text-[10px] font-bold flex items-center justify-center">
                      #{idx + 1}
                    </span>
                    <span className="font-semibold text-neutral-800">{cty.name}</span>
                  </div>
                  <span className="font-bold text-neutral-900 bg-neutral-50 px-2 py-0.5 rounded-md border border-neutral-200 text-[11px]">
                    {cty.count} {cty.count === 1 ? 'lead' : 'leads'}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Lead Acquisition Sources */}
        <div className="bg-white rounded-2xl border border-[#E9E7F2] p-5 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
            <div className="flex items-center gap-2">
              <Globe className="w-4 h-4 text-blue-600" />
              <h3 className="text-sm font-bold text-neutral-900">Traffic Source / Attribution</h3>
            </div>
            <span className="text-[11px] font-mono text-neutral-400">{topSources.length} channels</span>
          </div>

          <div className="space-y-3">
            {topSources.length === 0 ? (
              <p className="text-xs text-neutral-400 py-4 text-center">No traffic source data available.</p>
            ) : (
              topSources.slice(0, 5).map((src: any, idx: number) => (
                <div key={idx} className="flex items-center justify-between text-xs py-1 border-b border-neutral-50 last:border-0">
                  <span className="font-semibold text-neutral-800 capitalize">{src.name}</span>
                  <span className="font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-md border border-blue-100 text-[11px]">
                    {src.count} inquiries
                  </span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Top Location Landing Pages Leaderboard */}
      <div className="bg-white rounded-2xl border border-[#E9E7F2] p-5 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-[#6D28D9]" />
            <h3 className="text-sm font-bold text-neutral-900">USA Location Landing Pages Performance</h3>
          </div>
          <span className="text-xs font-semibold text-neutral-500">Auto-incrementing conversion counter</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-[#E9E7F2] text-neutral-400 uppercase text-[10px] tracking-wider font-bold">
                <th className="py-2.5 px-3">Landing Page Title</th>
                <th className="py-2.5 px-3">URL Path</th>
                <th className="py-2.5 px-3">City / State</th>
                <th className="py-2.5 px-3">Service</th>
                <th className="py-2.5 px-3 text-right">Attributed Leads</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              {topLocationPages.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-6 text-center text-neutral-400">No published location pages found.</td>
                </tr>
              ) : (
                topLocationPages.map((page: any, idx: number) => (
                  <tr key={idx} className="hover:bg-neutral-50/50 transition-colors">
                    <td className="py-2.5 px-3 font-bold text-neutral-900 max-w-xs truncate">{page.title}</td>
                    <td className="py-2.5 px-3 font-mono text-[11px] text-neutral-600">
                      <a href={page.urlPath} target="_blank" rel="noopener noreferrer" className="hover:text-[#6D28D9] flex items-center gap-1">
                        <span>{page.urlPath}</span>
                        <ArrowUpRight className="w-3 h-3" />
                      </a>
                    </td>
                    <td className="py-2.5 px-3 capitalize font-medium text-neutral-700">{page.city}, {page.state}</td>
                    <td className="py-2.5 px-3 font-medium text-neutral-600">{page.service}</td>
                    <td className="py-2.5 px-3 text-right">
                      <span className="inline-flex items-center gap-1 font-extrabold text-[#6D28D9] bg-violet-50 px-2 py-0.5 rounded-md border border-violet-100">
                        {page.leadsCount}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Honest External Analytics Integration Status */}
      <div className="bg-white rounded-2xl border border-[#E9E7F2] p-5 shadow-xs space-y-4">
        <div className="flex items-center gap-2 border-b border-neutral-100 pb-3">
          <Activity className="w-4 h-4 text-indigo-600" />
          <h3 className="text-sm font-bold text-neutral-900">External Search Console &amp; Google Analytics 4 Telemetry Status</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* GA4 */}
          <div className="p-4 rounded-xl border border-neutral-200 bg-neutral-50/50 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-neutral-800">Google Analytics 4 (GA4)</span>
              {external?.googleAnalytics?.connected ? (
                <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                  <CheckCircle2 className="w-3 h-3" /> Connected
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                  <AlertCircle className="w-3 h-3" /> Configuration Required
                </span>
              )}
            </div>
            <p className="text-xs text-neutral-600 leading-relaxed">
              Tracking ID: <span className="font-mono font-bold text-neutral-800">{external?.googleAnalytics?.trackingId}</span>
            </p>
            <p className="text-[11px] text-neutral-500">
              To activate live web traffic reporting, input your Google Measurement ID (<code className="bg-white px-1 py-0.5 rounded border border-neutral-200">G-XXXXXXXXXX</code>) under <strong>Admin → Site Settings → Analytics</strong>.
            </p>
          </div>

          {/* GSC */}
          <div className="p-4 rounded-xl border border-neutral-200 bg-neutral-50/50 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-neutral-800">Google Search Console (GSC)</span>
              {external?.searchConsole?.connected ? (
                <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                  <CheckCircle2 className="w-3 h-3" /> Verified
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                  <AlertCircle className="w-3 h-3" /> Configuration Required
                </span>
              )}
            </div>
            <p className="text-xs text-neutral-600 leading-relaxed truncate">
              Verification Tag: <span className="font-mono font-bold text-neutral-800">{external?.searchConsole?.verification}</span>
            </p>
            <p className="text-[11px] text-neutral-500">
              Submit your dynamic sitemap (<code className="bg-white px-1 py-0.5 rounded border border-neutral-200">https://houserobotics.online/sitemap.xml</code>) to Google Search Console to index all 51 states and priority city pages.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
