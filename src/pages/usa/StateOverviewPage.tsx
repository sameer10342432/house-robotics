import React, { useState, useEffect } from 'react';
import { 
  MapPin, 
  Search, 
  ArrowRight, 
  Sparkles, 
  CheckCircle2, 
  Building2, 
  Code2, 
  TrendingUp, 
  Cpu, 
  ShieldCheck, 
  Clock, 
  ExternalLink,
  ChevronRight,
  Briefcase
} from 'lucide-react';
import { UsaBreadcrumb } from '../../components/usa/UsaBreadcrumb';
import { fetchLocationState } from '../../utils/api';
import { AGENCY_INFO } from '../../data/agencyData';
import { applyPageSeo } from '../../utils/seo';

interface StateOverviewPageProps {
  stateSlug: string;
  onNavigatePath: (path: string) => void;
  onOpenConsultation: (service?: string) => void;
}

export const StateOverviewPage: React.FC<StateOverviewPageProps> = ({
  stateSlug,
  onNavigatePath,
  onOpenConsultation
}) => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [searchCity, setSearchCity] = useState('');

  useEffect(() => {
    loadState();
  }, [stateSlug]);

  const loadState = async () => {
    setLoading(true);
    try {
      const res = await fetchLocationState(stateSlug);
      if (res.success && res.data) {
        setData(res.data);
        const st = res.data.state;
        const stateName = st.name;
        const stateCode = st.abbreviation || st.code || '';
        const seoTitle = `Web Dev, SEO & AI in ${stateName} | House Robotics`;
        const metaDescription = `Scalable web development, technical SEO, and AI automation for businesses across ${stateName}. Remote excellence for commercial growth.`;
        applyPageSeo(`/usa/${st.slug}`, {
          seoTitle,
          metaDescription,
          canonicalUrl: `https://houserobotics.online/usa/${st.slug}`,
          ogTitle: seoTitle,
          ogDescription: metaDescription
        });
      }
    } catch (e) {
      console.warn('Failed loading state data', e);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FAF9FF] flex items-center justify-center py-24">
        <div className="text-center space-y-4">
          <div className="w-10 h-10 border-4 border-[#6D28D9] border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-neutral-600 font-medium text-sm">Loading market profile...</p>
        </div>
      </div>
    );
  }

  if (!data || !data.state) {
    return (
      <div className="min-h-screen bg-[#FAF9FF] py-24 px-4 text-center">
        <h2 className="text-2xl font-bold text-neutral-900 mb-2">State Market Not Found</h2>
        <p className="text-neutral-600 mb-6">The requested US state location could not be located in our verified directory.</p>
        <button
          onClick={() => onNavigatePath('/usa')}
          className="px-6 py-2.5 bg-[#6D28D9] text-white rounded-xl font-semibold hover:bg-[#5B21B6] transition"
        >
          Return to USA Directory
        </button>
      </div>
    );
  }

  const { state, cities = [], publishedPages = [] } = data;

  const filteredCities = cities.filter((c: any) => {
    if (!searchCity) return true;
    return c.name.toLowerCase().includes(searchCity.toLowerCase()) ||
      c.metroArea.toLowerCase().includes(searchCity.toLowerCase()) ||
      c.majorIndustries.toLowerCase().includes(searchCity.toLowerCase());
  });

  return (
    <div className="bg-[#FAF9FF] min-h-screen">
      {/* Breadcrumb Navigation */}
      <div className="bg-white border-b border-[#E9E7F2]">
        <UsaBreadcrumb
          items={[
            { label: 'USA Target Markets', path: '/usa' },
            { label: state.name }
          ]}
          onNavigate={(p) => onNavigatePath(p)}
          pageTitle={`${state.name} Web Development, SEO & AI Automation | House Robotics`}
          pageDescription={`Tailored web development, technical SEO, and intelligent workflow automation for enterprises and growing businesses across ${state.name}.`}
          canonicalUrl={`https://houserobotics.online/usa/${state.slug}`}
        />
      </div>

      {/* Hero Section */}
      <section className="relative overflow-hidden py-14 sm:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white via-[#FAF9FF] to-[#F3F0FF] border-b border-[#E9E7F2]">
        <div className="max-w-6xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F3F0FF] border border-[#E9E7F2] text-[#6D28D9] text-xs font-bold tracking-wide uppercase">
            <MapPin className="w-3.5 h-3.5" />
            <span>US State Market Profile: {state.abbreviation}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-neutral-900 tracking-tight leading-[1.15]">
            Custom Web Development, SEO & AI Automation in{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6D28D9] via-indigo-600 to-purple-700">
              {state.name}
            </span>
          </h1>

          <p className="max-w-3xl text-base sm:text-lg text-neutral-600 leading-relaxed">
            {state.economicOverview || `${state.name} is a dynamic economic driver within the ${state.region} region, boasting diverse business ecosystems across ${state.majorIndustries}.`}
          </p>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4">
            <div className="bg-white p-4 rounded-xl border border-[#E9E7F2] shadow-sm">
              <span className="text-xs uppercase tracking-wider text-neutral-400 font-semibold block">State Capital</span>
              <span className="text-base font-bold text-neutral-900">{state.capital || 'N/A'}</span>
            </div>
            <div className="bg-white p-4 rounded-xl border border-[#E9E7F2] shadow-sm">
              <span className="text-xs uppercase tracking-wider text-neutral-400 font-semibold block">Geographic Region</span>
              <span className="text-base font-bold text-neutral-900">{state.region}</span>
            </div>
            <div className="bg-white p-4 rounded-xl border border-[#E9E7F2] shadow-sm">
              <span className="text-xs uppercase tracking-wider text-neutral-400 font-semibold block">Tracked Commercial Hubs</span>
              <span className="text-base font-bold text-[#6D28D9]">{cities.length} Metros</span>
            </div>
            <div className="bg-white p-4 rounded-xl border border-[#E9E7F2] shadow-sm">
              <span className="text-xs uppercase tracking-wider text-neutral-400 font-semibold block">Delivery Model</span>
              <span className="text-base font-bold text-neutral-900">100% Verified Remote</span>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
        
        {/* Published Pilot Landing Pages in this State */}
        {publishedPages.length > 0 && (
          <section className="bg-white rounded-2xl border border-[#E9E7F2] p-6 sm:p-8 shadow-sm">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
              <div>
                <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#6D28D9] uppercase tracking-wider mb-1">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Verified Dedicated Landing Pages</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-neutral-900">
                  Priority City Solutions in {state.name}
                </h2>
              </div>
              <span className="text-xs text-neutral-500 bg-[#F3F0FF] px-3 py-1.5 rounded-full font-medium">
                {publishedPages.length} active solution{publishedPages.length === 1 ? '' : 's'}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {publishedPages.map((page: any) => (
                <div
                  key={page.id}
                  onClick={() => onNavigatePath(`/usa/${state.slug}/${page.city?.slug || 'market'}/${page.serviceSlug}`)}
                  className="group p-5 rounded-xl border border-[#E9E7F2] hover:border-[#6D28D9]/40 hover:shadow-md transition-all duration-200 cursor-pointer bg-gradient-to-br from-white to-[#FAF9FF]"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-[#F3F0FF] text-[#6D28D9]">
                      {page.city?.name}
                    </span>
                    <ArrowRight className="w-4 h-4 text-neutral-400 group-hover:text-[#6D28D9] group-hover:translate-x-1 transition-all" />
                  </div>
                  <h3 className="font-bold text-neutral-900 group-hover:text-[#6D28D9] transition-colors text-base line-clamp-1">
                    {page.title.split('|')[0].trim()}
                  </h3>
                  <p className="text-xs text-neutral-500 mt-1 line-clamp-2">
                    {page.metaDescription}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Cities Directory for this State */}
        <section className="space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold text-neutral-900">
                Commercial Cities & Metro Markets in {state.name}
              </h2>
              <p className="text-sm text-neutral-600">
                Select a city to review commercial profiles and available digital growth services.
              </p>
            </div>

            <div className="relative w-full sm:w-72">
              <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search city or industry..."
                value={searchCity}
                onChange={(e) => setSearchCity(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-white border border-[#E9E7F2] rounded-xl text-sm focus:outline-none focus:border-[#6D28D9] focus:ring-1 focus:ring-[#6D28D9] transition"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredCities.map((city: any) => (
              <div
                key={city.id}
                onClick={() => onNavigatePath(`/usa/${state.slug}/${city.slug}`)}
                className="group bg-white p-5 rounded-xl border border-[#E9E7F2] hover:border-[#6D28D9]/40 hover:shadow-md transition-all duration-200 cursor-pointer flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Building2 className="w-4 h-4 text-[#6D28D9]" />
                      <h3 className="font-bold text-neutral-900 group-hover:text-[#6D28D9] transition-colors">
                        {city.name}
                      </h3>
                    </div>
                    {city.isPriority && (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-purple-100 text-[#6D28D9] uppercase tracking-wide">
                        Priority Hub
                      </span>
                    )}
                  </div>
                  
                  <p className="text-xs text-neutral-500 mb-2">
                    <span className="font-medium text-neutral-700">Metro:</span> {city.metroArea || 'Commercial Area'}
                  </p>

                  <div className="text-xs text-neutral-600 bg-[#FAF9FF] p-2.5 rounded-lg border border-[#E9E7F2]/60 mb-3">
                    <span className="font-semibold text-neutral-700 block mb-1">Key Verticals:</span>
                    <span className="line-clamp-2">{city.majorIndustries}</span>
                  </div>
                </div>

                <div className="pt-2 border-t border-[#E9E7F2] flex items-center justify-between text-xs text-[#6D28D9] font-semibold">
                  <span>Explore Market Solutions</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            ))}
          </div>

          {filteredCities.length === 0 && (
            <div className="text-center py-12 bg-white rounded-xl border border-[#E9E7F2]">
              <p className="text-neutral-500 text-sm">No commercial centres match "{searchCity}" in {state.name}.</p>
            </div>
          )}
        </section>

        {/* Remote Delivery Transparency & Collaboration Framework */}
        <section className="bg-white rounded-2xl border border-[#E9E7F2] p-6 sm:p-10 shadow-sm space-y-6">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 text-xs font-bold text-[#6D28D9] uppercase tracking-wider mb-2">
              <ShieldCheck className="w-4 h-4" />
              <span>Full Remote Delivery Transparency</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-neutral-900">
              Serving {state.name} Enterprises with Full Remote Agility
            </h2>
            <p className="text-neutral-600 text-sm sm:text-base mt-2">
              House Robotics collaborates directly with leadership teams across {state.name} through seamless digital workflows, daily asynchronous updates, and US-aligned working hours. We do not maintain physical branches in {state.name}, saving your business substantial agency overhead while delivering Silicon Valley-grade code and engineering excellence.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
            <div className="p-5 rounded-xl bg-[#FAF9FF] border border-[#E9E7F2] space-y-2">
              <Clock className="w-5 h-5 text-[#6D28D9]" />
              <h4 className="font-bold text-neutral-900 text-sm">Overlapping US Hours</h4>
              <p className="text-xs text-neutral-600 leading-relaxed">
                Dedicated collaboration sprints scheduled within your local timezone for sprint planning, code walk-throughs, and strategic reviews.
              </p>
            </div>
            <div className="p-5 rounded-xl bg-[#FAF9FF] border border-[#E9E7F2] space-y-2">
              <ShieldCheck className="w-5 h-5 text-[#6D28D9]" />
              <h4 className="font-bold text-neutral-900 text-sm">Direct Founder Engagement</h4>
              <p className="text-xs text-neutral-600 leading-relaxed">
                Work directly with senior engineers and marketing tacticians. No account managers, middle-tier delays, or junior delegation.
              </p>
            </div>
            <div className="p-5 rounded-xl bg-[#FAF9FF] border border-[#E9E7F2] space-y-2">
              <Briefcase className="w-5 h-5 text-[#6D28D9]" />
              <h4 className="font-bold text-neutral-900 text-sm">Rigorous Production Standards</h4>
              <p className="text-xs text-neutral-600 leading-relaxed">
                Full IP ownership, GitHub pull-request hygiene, automated CI/CD pipelines, and zero hidden licensing obligations.
              </p>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="pt-6 border-t border-[#E9E7F2] flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <p className="text-sm font-bold text-neutral-900">Ready to expand your digital footprint in {state.name}?</p>
              <p className="text-xs text-neutral-500">Inquire today for an architectural audit or growth consultation.</p>
            </div>
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <a
                href={AGENCY_INFO.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-semibold shadow-sm transition"
              >
                <span>WhatsApp Instant Call</span>
              </a>
              <button
                onClick={() => onOpenConsultation(`USA Growth — ${state.name}`)}
                className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-[#6D28D9] hover:bg-[#5B21B6] text-white rounded-xl text-xs font-semibold shadow-sm transition"
              >
                <span>Book Consultation</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
};

