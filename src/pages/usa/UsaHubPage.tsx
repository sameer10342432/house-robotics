import React, { useState, useEffect } from 'react';
import { 
  MapPin, 
  Search, 
  ArrowRight, 
  Sparkles, 
  CheckCircle2, 
  Globe, 
  Building2, 
  Code2, 
  TrendingUp, 
  Cpu, 
  ShieldCheck, 
  Clock, 
  MessageSquare, 
  PhoneCall,
  ExternalLink,
  ChevronRight
} from 'lucide-react';
import { UsaBreadcrumb } from '../../components/usa/UsaBreadcrumb';
import { fetchLocationsHub } from '../../utils/api';
import { AGENCY_INFO } from '../../data/agencyData';
import { applyPageSeo } from '../../utils/seo';

interface UsaHubPageProps {
  onNavigatePath: (path: string) => void;
  onOpenConsultation: (service?: string) => void;
}

export const UsaHubPage: React.FC<UsaHubPageProps> = ({
  onNavigatePath,
  onOpenConsultation
}) => {
  const [hubData, setHubData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRegion, setSelectedRegion] = useState<string>('All');

  useEffect(() => {
    applyPageSeo('/usa');
    loadHub();
  }, []);

  const loadHub = async () => {
    try {
      const res = await fetchLocationsHub();
      if (res.success && res.data) {
        setHubData(res.data);
      }
    } catch (e) {
      console.warn('Failed loading USA Hub data', e);
    } finally {
      setLoading(false);
    }
  };

  const regions = ['All', 'Southeast', 'Southwest', 'West', 'Midwest', 'Northeast'];

  const filteredStates = (hubData?.states || []).filter((s: any) => {
    const matchesRegion = selectedRegion === 'All' || s.region === selectedRegion;
    const matchesSearch = !searchTerm || 
      s.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      s.majorIndustries.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesRegion && matchesSearch;
  });

  const priorityCities = (hubData?.priorityCities || []).filter((c: any) => {
    if (!searchTerm) return true;
    return c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.metroArea.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.majorIndustries.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const pilotPages = hubData?.pilotPages || [];

  return (
    <div className="bg-[#FAF9FF] min-h-screen">
      {/* Visual Breadcrumb Navigation */}
      <div className="bg-white border-b border-[#E9E7F2]">
        <UsaBreadcrumb
          items={[{ label: 'USA Target Markets' }]}
          onNavigate={(p) => onNavigatePath(p)}
          pageTitle="USA Digital Marketing, Web Development & AI Automation | House Robotics"
          pageDescription="High-performance website engineering, enterprise SEO, and AI automation workflows tailored for US commercial leaders."
          canonicalUrl="https://houserobotics.online/usa"
        />
      </div>

      {/* Hero Section */}
      <section className="relative overflow-hidden py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white via-[#FAF9FF] to-[#F3F0FF] border-b border-[#E9E7F2]">
        <div className="max-w-6xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F3F0FF] border border-[#E9E7F2] text-[#6D28D9] text-xs font-bold tracking-wide uppercase">
            <Sparkles className="w-3.5 h-3.5" />
            <span>United States Commercial Expansion</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-neutral-900 tracking-tight leading-[1.12]">
            High-Performance Digital Growth & <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6D28D9] via-indigo-600 to-purple-700">
              Technology Engineering for US Enterprises
            </span>
          </h1>

          <p className="max-w-3xl mx-auto text-base sm:text-lg text-neutral-600 leading-relaxed">
            House Robotics delivers custom React/WordPress web engineering, enterprise technical SEO, and intelligent AI automation pipelines for ambitious businesses across all 50 US States.
          </p>

          {/* Quick Metrics Bar */}
          <div className="pt-4 flex flex-wrap justify-center items-center gap-6 sm:gap-10 text-xs sm:text-sm font-semibold text-neutral-700">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
              <span>Full US Time Zone Alignment (ET, CT, PT)</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#6D28D9]" />
              <span>50 States + 280+ Commercial Markets Covered</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#6D28D9]" />
              <span>Enterprise-Grade Code Ownership</span>
            </div>
          </div>

          {/* Search Input Box */}
          <div className="max-w-xl mx-auto pt-6">
            <div className="relative flex items-center">
              <Search className="w-5 h-5 text-neutral-400 absolute left-4 pointer-events-none" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by state, city, or industry (e.g. Austin, Texas, SaaS, Fintech)..."
                className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-white border border-[#E9E7F2] shadow-sm text-sm focus:outline-none focus:ring-2 focus:ring-[#6D28D9] focus:border-transparent transition-all"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Pilot City-Service Landing Pages */}
      <section className="py-14 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-[#6D28D9] flex items-center gap-1.5">
              <Building2 className="w-3.5 h-3.5" />
              <span>Researched Commercial Hubs</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 mt-1">
              Featured USA City-Service Landing Pages
            </h2>
          </div>
          <span className="text-xs text-neutral-500 font-medium">
            Handcrafted editorial pages meeting our Content Quality Gate
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {pilotPages.map((page: any) => (
            <div
              key={page.id}
              onClick={() => onNavigatePath(page.urlPath)}
              className="group bg-white rounded-2xl border border-[#E9E7F2] p-6 shadow-xs hover:shadow-lg hover:border-purple-300 transition-all cursor-pointer flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="px-2.5 py-1 rounded-md bg-[#FAF9FF] border border-[#E9E7F2] font-semibold text-[#6D28D9] capitalize">
                    {page.stateSlug} · {page.citySlug?.replace('-', ' ')}
                  </span>
                  <span className="text-[11px] font-mono font-medium text-neutral-400 uppercase">
                    {page.serviceSlug?.replace('-', ' ')}
                  </span>
                </div>

                <h3 className="text-base font-bold text-neutral-900 group-hover:text-[#6D28D9] transition-colors leading-snug">
                  {page.h1Title}
                </h3>

                {page.heroKicker && (
                  <p className="text-xs text-neutral-500 line-clamp-2">
                    {page.heroKicker}
                  </p>
                )}
              </div>

              <div className="pt-5 mt-4 border-t border-[#F3F0FF] flex items-center justify-between text-xs font-bold text-[#6D28D9]">
                <span>Explore City Strategy</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Priority US Commercial Hubs Grid */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto bg-white rounded-3xl border border-[#E9E7F2] shadow-xs my-6">
        <div className="mb-8">
          <div className="text-xs font-bold uppercase tracking-wider text-[#6D28D9] flex items-center gap-1.5">
            <Globe className="w-3.5 h-3.5" />
            <span>Phase 1 Research</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 mt-1">
            Top Priority Commercial Centers & Metro Areas
          </h2>
          <p className="text-sm text-neutral-600 mt-1">
            Targeting commercial clusters across tech, health, finance, manufacturing, and aerospace.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {priorityCities.slice(0, 18).map((city: any) => (
            <div
              key={city.id}
              onClick={() => onNavigatePath(`/usa/${city.stateSlug}/${city.slug}`)}
              className="p-4 rounded-xl border border-[#E9E7F2] hover:border-purple-300 hover:bg-[#FAF9FF] transition-all cursor-pointer flex items-start gap-3"
            >
              <div className="w-9 h-9 rounded-lg bg-[#F3F0FF] text-[#6D28D9] flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs">
                {city.stateSlug.slice(0, 2).toUpperCase()}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-2">
                  <h4 className="text-sm font-bold text-neutral-900 truncate">
                    {city.name}
                  </h4>
                  <span className="text-[10px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full shrink-0">
                    Tier 1
                  </span>
                </div>
                <div className="text-xs text-neutral-500 truncate mt-0.5">
                  {city.metroArea}
                </div>
                <div className="text-[11px] text-neutral-600 line-clamp-1 mt-1 font-medium">
                  {city.majorIndustries}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* State Directory by Geographic Region */}
      <section className="py-14 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-900">
              State-by-State Directory (All 50 States)
            </h2>
            <p className="text-sm text-neutral-600 mt-0.5">
              Select a state to explore local metropolitan economies and available remote services.
            </p>
          </div>

          {/* Region Tabs */}
          <div className="flex flex-wrap gap-1.5 p-1 bg-white rounded-xl border border-[#E9E7F2] text-xs font-semibold">
            {regions.map((reg) => (
              <button
                key={reg}
                onClick={() => setSelectedRegion(reg)}
                className={`px-3 py-1.5 rounded-lg transition-colors ${
                  selectedRegion === reg
                    ? 'bg-[#6D28D9] text-white shadow-xs'
                    : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100'
                }`}
              >
                {reg}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {filteredStates.map((st: any) => (
            <button
              key={st.id}
              onClick={() => onNavigatePath(`/usa/${st.slug}`)}
              className="p-3.5 rounded-xl bg-white border border-[#E9E7F2] hover:border-purple-300 hover:shadow-xs transition-all text-left flex flex-col justify-between group"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-bold text-[#6D28D9] bg-[#FAF9FF] px-2 py-0.5 rounded border border-[#E9E7F2]">
                  {st.code}
                </span>
                <span className="text-[11px] text-neutral-400 group-hover:text-[#6D28D9] transition-colors">
                  {st._count?.cities || 0} cities
                </span>
              </div>
              <div className="mt-2.5">
                <div className="text-xs font-bold text-neutral-900 group-hover:text-[#6D28D9] transition-colors">
                  {st.name}
                </div>
                <div className="text-[10px] text-neutral-400 mt-0.5">
                  {st.region}
                </div>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* Remote Collaboration Framework for US Clients */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto bg-gradient-to-br from-[#120F24] to-[#1E1838] text-white rounded-3xl shadow-xl my-10">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-violet-300 text-xs font-bold tracking-wide uppercase">
            <Clock className="w-3.5 h-3.5" />
            <span>How We Partner Remotely With US Teams</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
            Seamless Remote Collaboration with Full US Time-Zone Overlap
          </h2>

          <p className="text-sm sm:text-base text-neutral-300 leading-relaxed max-w-2xl mx-auto">
            House Robotics operates as a specialized digital and AI partner. We eliminate local overhead and deliver rapid-velocity sprint results directly into your workflow.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-8 text-left">
            <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-2">
              <div className="w-8 h-8 rounded-lg bg-violet-600/30 text-violet-400 flex items-center justify-center font-bold text-sm">
                01
              </div>
              <h3 className="font-bold text-sm text-white">Daily Standups & Direct Chat</h3>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Direct communication via WhatsApp ({AGENCY_INFO.whatsapp}) and dedicated Slack/Teams channels aligned with ET, CT, and PT hours.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-2">
              <div className="w-8 h-8 rounded-lg bg-violet-600/30 text-violet-400 flex items-center justify-center font-bold text-sm">
                02
              </div>
              <h3 className="font-bold text-sm text-white">Bi-Weekly Sprints & Demos</h3>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Structured two-week milestones with live staging link previews, recorded Loom walkthroughs, and clear code documentation.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-2">
              <div className="w-8 h-8 rounded-lg bg-violet-600/30 text-violet-400 flex items-center justify-center font-bold text-sm">
                03
              </div>
              <h3 className="font-bold text-sm text-white">Full IP & Code Ownership</h3>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Complete intellectual property handover. You own 100% of your Git repositories, design files, and data pipelines without vendor lock-in.
              </p>
            </div>
          </div>

          <div className="pt-8 flex flex-wrap justify-center items-center gap-4">
            <button
              onClick={() => onOpenConsultation('USA National Partnership')}
              className="px-6 py-3 rounded-xl bg-[#6D28D9] text-white font-bold text-xs hover:bg-[#5B21B6] transition-colors shadow-lg hover:shadow-purple-500/30"
            >
              Schedule Free 30-Minute Growth Audit →
            </button>
            <a
              href={AGENCY_INFO.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-xl bg-white/10 border border-white/20 text-white font-bold text-xs hover:bg-white/20 transition-colors inline-flex items-center gap-2"
            >
              <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
              <span>Instant WhatsApp ({AGENCY_INFO.whatsapp})</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

