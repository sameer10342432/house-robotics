import React, { useState, useEffect } from 'react';
import { 
  MapPin, 
  Search, 
  Filter, 
  Plus, 
  Edit2, 
  Trash2, 
  ExternalLink, 
  Save, 
  X, 
  CheckCircle2, 
  AlertCircle, 
  Download, 
  Upload, 
  Sparkles, 
  Building2, 
  Eye, 
  FileText,
  TrendingUp,
  Layers,
  Check,
  ShieldCheck
} from 'lucide-react';
import { adminGetLocations, adminSaveLocationPage, adminGetLocationStats } from '../../utils/api';

export const UsaSeoView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'pages' | 'cities' | 'import-export'>('pages');
  const [stats, setStats] = useState<any>({ totalStates: 51, totalCities: 284, publishedPages: 12, totalLeads: 0 });
  const [pages, setPages] = useState<any[]>([]);
  const [cities, setCities] = useState<any[]>([]);
  const [states, setStates] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedState, setSelectedState] = useState('ALL');
  const [selectedStatus, setSelectedStatus] = useState('ALL');

  // Modal / Editor State
  const [isEditing, setIsEditing] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [editingPage, setEditingPage] = useState<any>({
    id: '',
    stateSlug: 'texas',
    citySlug: 'austin',
    serviceSlug: 'web-development',
    title: '',
    h1: '',
    metaDescription: '',
    focusKeyword: '',
    canonicalUrl: '',
    intro: '',
    status: 'PUBLISHED',
    noIndex: false
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const [resLoc, resStats] = await Promise.all([
        adminGetLocations(),
        adminGetLocationStats()
      ]);

      if (resLoc.success && resLoc.data) {
        setPages(resLoc.data.pages || []);
        setCities(resLoc.data.cities || []);
        setStates(resLoc.data.states || []);
      }
      if (resStats.success && resStats.data) {
        setStats(resStats.data);
      }
    } catch (e) {
      console.warn('Failed loading USA SEO data', e);
    } finally {
      setLoading(false);
    }
  };

  const handleEditOrCreate = (page?: any, defaultCity?: any) => {
    setSaveSuccess(false);
    setErrorMessage('');
    if (page) {
      setEditingPage({
        ...page,
        stateSlug: page.state?.slug || page.stateSlug || 'texas',
        citySlug: page.city?.slug || page.citySlug || 'austin'
      });
    } else {
      const c = defaultCity || (cities[0] || { slug: 'austin', state: { slug: 'texas' } });
      setEditingPage({
        id: '',
        stateSlug: c.state?.slug || 'texas',
        citySlug: c.slug || 'austin',
        serviceSlug: 'web-development',
        title: `Custom Web Development in ${c.name || 'Austin'} | House Robotics`,
        h1: `Custom Website & Web Application Development in ${c.name || 'Austin'}`,
        metaDescription: `Engineering high-conversion, fast web platforms for growing businesses in ${c.name || 'Austin'}. Remote excellence with US-aligned delivery.`,
        focusKeyword: `web development ${c.name || 'austin'}`,
        canonicalUrl: `https://houserobotics.online/usa/${c.state?.slug || 'texas'}/${c.slug || 'austin'}/web-development`,
        intro: `House Robotics delivers bespoke web development engineered for enterprises across ${c.name || 'Austin'}.`,
        status: 'PUBLISHED',
        noIndex: false
      });
    }
    setIsEditing(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    try {
      const res = await adminSaveLocationPage(editingPage);
      if (res.success) {
        setSaveSuccess(true);
        setTimeout(() => {
          setIsEditing(false);
          loadData();
        }, 1200);
      } else {
        setErrorMessage(res.message || 'Failed to save location landing page.');
      }
    } catch (err: any) {
      setErrorMessage(err.message || 'Error occurred while saving.');
    }
  };

  // Filtered lists
  const filteredPages = pages.filter((p) => {
    const matchesSearch = !searchQuery || 
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.serviceSlug.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.city?.name?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesState = selectedState === 'ALL' || p.city?.state?.slug === selectedState;
    const matchesStatus = selectedStatus === 'ALL' || p.status === selectedStatus;
    return matchesSearch && matchesState && matchesStatus;
  });

  const filteredCities = cities.filter((c) => {
    const matchesSearch = !searchQuery || 
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.metroArea.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.majorIndustries.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesState = selectedState === 'ALL' || c.state?.slug === selectedState;
    return matchesSearch && matchesState;
  });

  const handleDownloadCsv = () => {
    window.open('/USA-CITY-MASTER-LIST.csv', '_blank');
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6">
      
      {/* Top Header & Metrics Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-100 text-[#6D28D9] text-xs font-bold uppercase tracking-wider mb-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            <span>National Expansion Architecture</span>
          </div>
          <h2 className="text-2xl font-black text-neutral-900 tracking-tight">
            USA National SEO & Location Manager
          </h2>
          <p className="text-xs sm:text-sm text-neutral-500 mt-0.5">
            Manage researched US commercial markets, city-service landing pages, and lead attribution.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => handleEditOrCreate()}
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#6D28D9] hover:bg-[#5B21B6] text-white rounded-xl text-xs font-bold shadow-sm transition"
          >
            <Plus className="w-4 h-4" />
            <span>Create Landing Page</span>
          </button>
        </div>
      </div>

      {/* Stats Counter Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-2xl border border-[#E9E7F2] shadow-xs">
          <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-400 block">Covered States</span>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-2xl font-black text-neutral-900">{stats.totalStates || 51}</span>
            <span className="text-[10px] text-neutral-500 font-semibold">50 States + DC</span>
          </div>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-[#E9E7F2] shadow-xs">
          <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-400 block">Researched Cities</span>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-2xl font-black text-neutral-900">{stats.totalCities || cities.length || 284}</span>
            <span className="text-[10px] text-[#6D28D9] font-bold">100 Priority Hubs</span>
          </div>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-[#E9E7F2] shadow-xs">
          <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-400 block">Active Landing Pages</span>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-2xl font-black text-emerald-600">{stats.publishedPages || pages.length || 12}</span>
            <span className="text-[10px] text-neutral-500 font-semibold">Indexed</span>
          </div>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-[#E9E7F2] shadow-xs">
          <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-400 block">Attributed USA Leads</span>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-2xl font-black text-[#6D28D9]">{stats.totalLeads || 0}</span>
            <span className="text-[10px] text-emerald-600 font-bold">CRM Synced</span>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex items-center gap-2 border-b border-[#E9E7F2] pb-2">
        <button
          onClick={() => setActiveTab('pages')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
            activeTab === 'pages' 
              ? 'bg-[#6D28D9] text-white shadow-xs' 
              : 'text-neutral-600 hover:bg-neutral-100'
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>Landing Pages ({pages.length})</span>
        </button>
        <button
          onClick={() => setActiveTab('cities')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
            activeTab === 'cities' 
              ? 'bg-[#6D28D9] text-white shadow-xs' 
              : 'text-neutral-600 hover:bg-neutral-100'
          }`}
        >
          <Building2 className="w-4 h-4" />
          <span>Researched Metros ({cities.length})</span>
        </button>
        <button
          onClick={() => setActiveTab('import-export')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
            activeTab === 'import-export' 
              ? 'bg-[#6D28D9] text-white shadow-xs' 
              : 'text-neutral-600 hover:bg-neutral-100'
          }`}
        >
          <Download className="w-4 h-4" />
          <span>Datasets & Exports</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-3.5 rounded-2xl border border-[#E9E7F2] flex flex-col sm:flex-row items-center gap-3">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder={activeTab === 'cities' ? "Search city name, metro, industry..." : "Search landing pages, service, city..."}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-[#FAF9FF] border border-[#E9E7F2] rounded-xl text-xs focus:outline-none focus:border-[#6D28D9] transition"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <select
            value={selectedState}
            onChange={(e) => setSelectedState(e.target.value)}
            className="px-3 py-2 bg-[#FAF9FF] border border-[#E9E7F2] rounded-xl text-xs font-medium text-neutral-700 focus:outline-none focus:border-[#6D28D9]"
          >
            <option value="ALL">All States (51)</option>
            {states.map((st) => (
              <option key={st.id || st.slug} value={st.slug}>{st.name} ({st.abbreviation})</option>
            ))}
          </select>

          {activeTab === 'pages' && (
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-3 py-2 bg-[#FAF9FF] border border-[#E9E7F2] rounded-xl text-xs font-medium text-neutral-700 focus:outline-none focus:border-[#6D28D9]"
            >
              <option value="ALL">All Statuses</option>
              <option value="PUBLISHED">Published</option>
              <option value="DRAFT">Draft</option>
              <option value="REVIEW">Review</option>
            </select>
          )}
        </div>
      </div>

      {/* TAB 1: Landing Pages CMS */}
      {activeTab === 'pages' && (
        <div className="bg-white rounded-2xl border border-[#E9E7F2] overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#FAF9FF] border-b border-[#E9E7F2] text-neutral-500 font-bold uppercase tracking-wider">
                <tr>
                  <th className="py-3 px-4">Page Title & Route</th>
                  <th className="py-3 px-4">Market / Location</th>
                  <th className="py-3 px-4">Service</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-center">Leads</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E9E7F2]">
                {filteredPages.map((p) => {
                  const stateSlug = p.city?.state?.slug || p.stateSlug || 'texas';
                  const citySlug = p.city?.slug || p.citySlug || 'austin';
                  const pageUrl = `/usa/${stateSlug}/${citySlug}/${p.serviceSlug}`;

                  return (
                    <tr key={p.id} className="hover:bg-[#FAF9FF] transition-colors">
                      <td className="py-3.5 px-4 max-w-xs">
                        <div className="font-bold text-neutral-900 truncate" title={p.title}>
                          {p.title}
                        </div>
                        <div className="text-[11px] text-neutral-400 font-mono truncate">
                          {pageUrl}
                        </div>
                      </td>
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <div className="font-semibold text-neutral-800">
                          {p.city?.name || 'City'}, {p.city?.state?.abbreviation || 'USA'}
                        </div>
                        <div className="text-[10px] text-neutral-400">
                          {p.city?.metroArea}
                        </div>
                      </td>
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <span className="px-2.5 py-1 rounded-md bg-[#F3F0FF] text-[#6D28D9] font-bold text-[11px]">
                          {p.serviceSlug.replace(/-/g, ' ')}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide ${
                          p.status === 'PUBLISHED' 
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' 
                            : 'bg-amber-50 text-amber-700 border border-amber-200'
                        }`}>
                          {p.status}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-center whitespace-nowrap font-bold text-neutral-700">
                        {p.leadsCount || 0}
                      </td>
                      <td className="py-3.5 px-4 text-right whitespace-nowrap space-x-2">
                        <button
                          onClick={() => window.open(pageUrl, '_blank')}
                          className="p-1.5 rounded-lg text-neutral-400 hover:text-[#6D28D9] hover:bg-purple-50 transition"
                          title="Preview Public Page"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleEditOrCreate(p)}
                          className="p-1.5 rounded-lg text-neutral-400 hover:text-neutral-900 hover:bg-neutral-100 transition"
                          title="Edit Content & SEO"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  );
                })}

                {filteredPages.length === 0 && (
                  <tr>
                    <td colSpan={6} className="py-8 text-center text-neutral-400 text-xs">
                      No location landing pages match the current filters.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 2: Researched Cities Directory */}
      {activeTab === 'cities' && (
        <div className="bg-white rounded-2xl border border-[#E9E7F2] overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#FAF9FF] border-b border-[#E9E7F2] text-neutral-500 font-bold uppercase tracking-wider">
                <tr>
                  <th className="py-3 px-4">City / Metro</th>
                  <th className="py-3 px-4">State</th>
                  <th className="py-3 px-4">Classification</th>
                  <th className="py-3 px-4">Digital Demand</th>
                  <th className="py-3 px-4">Key Economic Sectors</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E9E7F2]">
                {filteredCities.slice(0, 50).map((c) => (
                  <tr key={c.id || c.slug} className="hover:bg-[#FAF9FF] transition-colors">
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-neutral-900">{c.name}</div>
                      <div className="text-[11px] text-neutral-400">{c.metroArea || 'Commercial Area'}</div>
                    </td>
                    <td className="py-3.5 px-4 font-semibold text-neutral-700 whitespace-nowrap">
                      {c.state?.name} ({c.state?.abbreviation})
                    </td>
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      {c.isPriority ? (
                        <span className="px-2 py-0.5 rounded bg-purple-100 text-[#6D28D9] font-bold text-[10px] uppercase">
                          Priority Hub
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 rounded bg-neutral-100 text-neutral-600 font-medium text-[10px]">
                          Expansion Metro
                        </span>
                      )}
                    </td>
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <span className="font-semibold text-emerald-600">{c.digitalDemand || 'High'}</span>
                    </td>
                    <td className="py-3.5 px-4 max-w-xs truncate text-neutral-600">
                      {c.majorIndustries}
                    </td>
                    <td className="py-3.5 px-4 text-right whitespace-nowrap">
                      <button
                        onClick={() => handleEditOrCreate(null, c)}
                        className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-[#FAF9FF] hover:bg-[#F3F0FF] text-[#6D28D9] font-bold text-[11px] border border-[#E9E7F2] transition"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Create Page</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {filteredCities.length > 50 && (
            <div className="py-3 px-4 bg-[#FAF9FF] border-t border-[#E9E7F2] text-center text-xs text-neutral-500">
              Showing first 50 results of {filteredCities.length} cities. Use search to find specific markets.
            </div>
          )}
        </div>
      )}

      {/* TAB 3: Import & Export Datasets */}
      {activeTab === 'import-export' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-[#E9E7F2] shadow-xs space-y-4">
            <div className="w-10 h-10 rounded-xl bg-purple-50 text-[#6D28D9] flex items-center justify-center">
              <Download className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-neutral-900">Export USA City Master Dataset</h3>
            <p className="text-xs text-neutral-500 leading-relaxed">
              Download the authoritative 284-city research spreadsheet containing official Census population data, digital demand rankings, and verified industry sectors.
            </p>
            <div className="pt-2">
              <button
                onClick={handleDownloadCsv}
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#6D28D9] hover:bg-[#5B21B6] text-white rounded-xl text-xs font-bold transition shadow-xs"
              >
                <Download className="w-4 h-4" />
                <span>Download USA-CITY-MASTER-LIST.csv</span>
              </button>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-[#E9E7F2] shadow-xs space-y-4">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-neutral-900">Editorial Quality Review Checklist</h3>
            <p className="text-xs text-neutral-500 leading-relaxed">
              Every city-service page must strictly adhere to the project quality gate before moving from DRAFT to PUBLISHED.
            </p>
            <ul className="text-xs text-neutral-700 space-y-2 list-disc list-inside">
              <li>Verified unique H1 and distinct search intent</li>
              <li>No duplicate paragraphs or copied template text</li>
              <li>No fabricated local physical offices or phone numbers</li>
              <li>Accurate remote collaboration disclosures</li>
            </ul>
          </div>
        </div>
      )}

      {/* Editor Modal / Drawer */}
      {isEditing && (
        <div className="fixed inset-0 z-50 bg-neutral-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl border border-[#E9E7F2] shadow-2xl max-w-2xl w-full max-h-[90vh] flex flex-col overflow-hidden my-auto">
            
            <div className="p-5 border-b border-[#E9E7F2] flex items-center justify-between bg-[#FAF9FF]">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#6D28D9]">CMS Page Editor</span>
                <h3 className="text-lg font-bold text-neutral-900">
                  {editingPage.id ? 'Edit City-Service Landing Page' : 'Create New City-Service Page'}
                </h3>
              </div>
              <button
                onClick={() => setIsEditing(false)}
                className="p-1.5 rounded-lg text-neutral-400 hover:text-neutral-900 hover:bg-neutral-100 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="p-6 space-y-4 overflow-y-auto flex-1 text-xs">
              {saveSuccess && (
                <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-xl flex items-center gap-2 font-bold">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Landing page saved successfully!</span>
                </div>
              )}
              {errorMessage && (
                <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 rounded-xl flex items-center gap-2 font-bold">
                  <AlertCircle className="w-4 h-4" />
                  <span>{errorMessage}</span>
                </div>
              )}

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-neutral-700 mb-1">State</label>
                  <select
                    value={editingPage.stateSlug}
                    onChange={(e) => setEditingPage({ ...editingPage, stateSlug: e.target.value })}
                    className="w-full px-3 py-2 bg-[#FAF9FF] border border-[#E9E7F2] rounded-xl font-medium focus:outline-none focus:border-[#6D28D9]"
                  >
                    {states.map((st) => (
                      <option key={st.id || st.slug} value={st.slug}>{st.name} ({st.abbreviation})</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-neutral-700 mb-1">City</label>
                  <select
                    value={editingPage.citySlug}
                    onChange={(e) => setEditingPage({ ...editingPage, citySlug: e.target.value })}
                    className="w-full px-3 py-2 bg-[#FAF9FF] border border-[#E9E7F2] rounded-xl font-medium focus:outline-none focus:border-[#6D28D9]"
                  >
                    {cities.filter(c => !editingPage.stateSlug || c.state?.slug === editingPage.stateSlug).map((c) => (
                      <option key={c.id || c.slug} value={c.slug}>{c.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-neutral-700 mb-1">Service Slug</label>
                <select
                  value={editingPage.serviceSlug}
                  onChange={(e) => setEditingPage({ ...editingPage, serviceSlug: e.target.value })}
                  className="w-full px-3 py-2 bg-[#FAF9FF] border border-[#E9E7F2] rounded-xl font-medium focus:outline-none focus:border-[#6D28D9]"
                >
                  <option value="web-development">web-development (Web Development & Architecture)</option>
                  <option value="seo-services">seo-services (Technical & Enterprise SEO)</option>
                  <option value="ai-automation">ai-automation (AI Workflow Automation)</option>
                  <option value="digital-marketing">digital-marketing (Digital Marketing & PPC)</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-neutral-700 mb-1">SEO Page Title *</label>
                <input
                  type="text"
                  required
                  value={editingPage.title}
                  onChange={(e) => setEditingPage({ ...editingPage, title: e.target.value })}
                  className="w-full px-3 py-2 bg-[#FAF9FF] border border-[#E9E7F2] rounded-xl focus:outline-none focus:border-[#6D28D9]"
                />
              </div>

              <div>
                <label className="block font-bold text-neutral-700 mb-1">H1 Heading *</label>
                <input
                  type="text"
                  required
                  value={editingPage.h1}
                  onChange={(e) => setEditingPage({ ...editingPage, h1: e.target.value })}
                  className="w-full px-3 py-2 bg-[#FAF9FF] border border-[#E9E7F2] rounded-xl focus:outline-none focus:border-[#6D28D9]"
                />
              </div>

              <div>
                <label className="block font-bold text-neutral-700 mb-1">Meta Description *</label>
                <textarea
                  rows={2}
                  required
                  value={editingPage.metaDescription}
                  onChange={(e) => setEditingPage({ ...editingPage, metaDescription: e.target.value })}
                  className="w-full px-3 py-2 bg-[#FAF9FF] border border-[#E9E7F2] rounded-xl focus:outline-none focus:border-[#6D28D9]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-neutral-700 mb-1">Focus Keyword</label>
                  <input
                    type="text"
                    value={editingPage.focusKeyword || ''}
                    onChange={(e) => setEditingPage({ ...editingPage, focusKeyword: e.target.value })}
                    className="w-full px-3 py-2 bg-[#FAF9FF] border border-[#E9E7F2] rounded-xl focus:outline-none focus:border-[#6D28D9]"
                  />
                </div>
                <div>
                  <label className="block font-bold text-neutral-700 mb-1">Publish Status</label>
                  <select
                    value={editingPage.status}
                    onChange={(e) => setEditingPage({ ...editingPage, status: e.target.value })}
                    className="w-full px-3 py-2 bg-[#FAF9FF] border border-[#E9E7F2] rounded-xl font-medium focus:outline-none focus:border-[#6D28D9]"
                  >
                    <option value="PUBLISHED">PUBLISHED (Public & Indexed)</option>
                    <option value="DRAFT">DRAFT (Hidden from sitemap)</option>
                    <option value="REVIEW">REVIEW (Quality Gate)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-neutral-700 mb-1">Hero Introduction Paragraph</label>
                <textarea
                  rows={3}
                  value={editingPage.intro || ''}
                  onChange={(e) => setEditingPage({ ...editingPage, intro: e.target.value })}
                  className="w-full px-3 py-2 bg-[#FAF9FF] border border-[#E9E7F2] rounded-xl focus:outline-none focus:border-[#6D28D9]"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-3 border-t border-[#E9E7F2]">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 border border-[#E9E7F2] rounded-xl font-bold text-neutral-600 hover:bg-neutral-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#6D28D9] hover:bg-[#5B21B6] text-white rounded-xl font-bold flex items-center gap-2 shadow-xs"
                >
                  <Save className="w-4 h-4" />
                  <span>Save Page Record</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
