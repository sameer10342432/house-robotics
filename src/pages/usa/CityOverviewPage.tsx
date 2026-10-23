import React, { useState, useEffect } from 'react';
import { 
  MapPin, 
  ArrowRight, 
  Sparkles, 
  CheckCircle2, 
  Building2, 
  Code2, 
  TrendingUp, 
  Cpu, 
  ShieldCheck, 
  Clock, 
  ChevronRight,
  Briefcase,
  Users,
  Search,
  Zap
} from 'lucide-react';
import { UsaBreadcrumb } from '../../components/usa/UsaBreadcrumb';
import { fetchLocationCity } from '../../utils/api';
import { AGENCY_INFO } from '../../data/agencyData';
import { applyPageSeo } from '../../utils/seo';

interface CityOverviewPageProps {
  stateSlug: string;
  citySlug: string;
  onNavigatePath: (path: string) => void;
  onOpenConsultation: (service?: string) => void;
}

export const CityOverviewPage: React.FC<CityOverviewPageProps> = ({
  stateSlug,
  citySlug,
  onNavigatePath,
  onOpenConsultation
}) => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCity();
  }, [stateSlug, citySlug]);

  const loadCity = async () => {
    setLoading(true);
    try {
      const res = await fetchLocationCity(stateSlug, citySlug);
      if (res.success && res.data) {
        setData(res.data);
        const { city, state } = res.data;
        const cityName = city.name;
        const stateCode = state.abbreviation || state.code || '';
        const seoTitle = `Web Dev, SEO & AI in ${cityName}, ${stateCode} | House Robotics`;
        const metaDescription = `Expand your commercial reach in ${cityName}, ${stateCode} with custom web engineering, high-ranking SEO, and smart AI automation. Book a discovery call.`;
        applyPageSeo(`/usa/${state.slug}/${city.slug}`, {
          seoTitle,
          metaDescription,
          canonicalUrl: `https://houserobotics.online/usa/${state.slug}/${city.slug}`,
          ogTitle: seoTitle,
          ogDescription: metaDescription
        });
      }
    } catch (e) {
      console.warn('Failed loading city data', e);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FAF9FF] flex items-center justify-center py-24">
        <div className="text-center space-y-4">
          <div className="w-10 h-10 border-4 border-[#6D28D9] border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-neutral-600 font-medium text-sm">Loading city commercial profile...</p>
        </div>
      </div>
    );
  }

  if (!data || !data.city) {
    return (
      <div className="min-h-screen bg-[#FAF9FF] py-24 px-4 text-center">
        <h2 className="text-2xl font-bold text-neutral-900 mb-2">City Profile Not Found</h2>
        <p className="text-neutral-600 mb-6">The requested US city location could not be located in our research directory.</p>
        <button
          onClick={() => onNavigatePath('/usa')}
          className="px-6 py-2.5 bg-[#6D28D9] text-white rounded-xl font-semibold hover:bg-[#5B21B6] transition"
        >
          Return to USA Directory
        </button>
      </div>
    );
  }

  const { city, state, publishedPages = [] } = data;

  const standardServices = [
    {
      slug: 'web-development',
      title: 'Custom Website & Web Application Development',
      desc: `High-conversion, lightning-fast digital platforms built with React, Next.js, and modern backends tailored for ${city.name} businesses.`,
      icon: Code2,
      badge: 'Core Service'
    },
    {
      slug: 'seo-services',
      title: 'Enterprise SEO & Search Visibility',
      desc: `Technical search optimization, on-page architecture, and authority building to capture high-intent buyers in the ${city.metroArea} market.`,
      icon: TrendingUp,
      badge: 'Revenue Driver'
    },
    {
      slug: 'ai-automation',
      title: 'AI Automation & Workflow Engineering',
      desc: `Deploy intelligent AI chatbots, CRM sync pipelines, and operational automations to eliminate administrative drag.`,
      icon: Cpu,
      badge: 'High Efficiency'
    },
    {
      slug: 'digital-marketing',
      title: 'Performance Digital Marketing & PPC',
      desc: `Multi-channel customer acquisition combining Google Ads, targeted paid social, and data-backed CRO.`,
      icon: Zap,
      badge: 'Rapid Scale'
    }
  ];

  return (
    <div className="bg-[#FAF9FF] min-h-screen">
      {/* Breadcrumbs */}
      <div className="bg-white border-b border-[#E9E7F2]">
        <UsaBreadcrumb
          items={[
            { label: 'USA Target Markets', path: '/usa' },
            { label: state.name, path: `/usa/${state.slug}` },
            { label: city.name }
          ]}
          onNavigate={(p) => onNavigatePath(p)}
          pageTitle={`${city.name}, ${state.abbreviation} Web Development, SEO & AI Automation | House Robotics`}
          pageDescription={`Professional web development, national SEO, and AI automation tailored for businesses across ${city.name}, ${state.name}.`}
          canonicalUrl={`https://houserobotics.online/usa/${state.slug}/${city.slug}`}
        />
      </div>

      {/* Hero Section */}
      <section className="relative overflow-hidden py-14 sm:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white via-[#FAF9FF] to-[#F3F0FF] border-b border-[#E9E7F2]">
        <div className="max-w-6xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F3F0FF] border border-[#E9E7F2] text-[#6D28D9] text-xs font-bold tracking-wide uppercase">
            <Building2 className="w-3.5 h-3.5" />
            <span>US Commercial Centre: {city.name}, {state.abbreviation}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-neutral-900 tracking-tight leading-[1.15]">
            Engineering Digital Growth for Businesses in{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6D28D9] via-indigo-600 to-purple-700">
              {city.name}, {state.abbreviation}
            </span>
          </h1>

          <p className="max-w-3xl text-base sm:text-lg text-neutral-600 leading-relaxed">
            From modern responsive web engineering to enterprise organic search visibility and bespoke AI workflow automation, House Robotics equips companies in {city.name} with competitive digital infrastructure to outperform regional and national rivals.
          </p>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4">
            <div className="bg-white p-4 rounded-xl border border-[#E9E7F2] shadow-sm">
              <span className="text-xs uppercase tracking-wider text-neutral-400 font-semibold block">Metro Market</span>
              <span className="text-sm sm:text-base font-bold text-neutral-900 line-clamp-1">{city.metroArea || city.name}</span>
            </div>
            <div className="bg-white p-4 rounded-xl border border-[#E9E7F2] shadow-sm">
              <span className="text-xs uppercase tracking-wider text-neutral-400 font-semibold block">Market Tier</span>
              <span className="text-sm sm:text-base font-bold text-[#6D28D9]">
                {city.isPriority ? 'Tier 1 Priority Metro' : 'Regional Business Hub'}
              </span>
            </div>
            <div className="bg-white p-4 rounded-xl border border-[#E9E7F2] shadow-sm">
              <span className="text-xs uppercase tracking-wider text-neutral-400 font-semibold block">Digital Demand</span>
              <span className="text-sm sm:text-base font-bold text-emerald-600">{city.digitalDemand || 'High'}</span>
            </div>
            <div className="bg-white p-4 rounded-xl border border-[#E9E7F2] shadow-sm">
              <span className="text-xs uppercase tracking-wider text-neutral-400 font-semibold block">Service Model</span>
              <span className="text-sm sm:text-base font-bold text-neutral-900">Remote Excellence</span>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
        
        {/* Industry Focus in this City */}
        <section className="bg-white rounded-2xl border border-[#E9E7F2] p-6 sm:p-8 shadow-sm">
          <div className="inline-flex items-center gap-2 text-xs font-bold text-[#6D28D9] uppercase tracking-wider mb-2">
            <Briefcase className="w-4 h-4" />
            <span>Economic Landscape</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-neutral-900 mb-3">
            Key Industry Verticals in {city.name}
          </h2>
          <p className="text-sm sm:text-base text-neutral-600 mb-6 leading-relaxed">
            Our engineering and search strategies are calibrated around the commercial realities of {city.name}'s leading sectors:
          </p>

          <div className="flex flex-wrap gap-2.5">
            {city.majorIndustries.split(',').map((ind: string, idx: number) => (
              <div 
                key={idx}
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#FAF9FF] border border-[#E9E7F2] text-neutral-800 text-xs sm:text-sm font-semibold"
              >
                <CheckCircle2 className="w-4 h-4 text-[#6D28D9]" />
                <span>{ind.trim()}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Dedicated Published Landing Pages (if any exist for this city) */}
        {publishedPages.length > 0 && (
          <section className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#6D28D9] uppercase tracking-wider mb-1">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Curated City Solutions</span>
                </div>
                <h2 className="text-2xl font-bold text-neutral-900">
                  Featured Services for {city.name}
                </h2>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {publishedPages.map((page: any) => (
                <div
                  key={page.id}
                  onClick={() => onNavigatePath(`/usa/${state.slug}/${city.slug}/${page.serviceSlug}`)}
                  className="group bg-white p-6 rounded-2xl border border-[#E9E7F2] hover:border-[#6D28D9]/40 hover:shadow-lg transition-all duration-200 cursor-pointer flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-bold px-3 py-1 rounded-full bg-[#F3F0FF] text-[#6D28D9] uppercase tracking-wider">
                        {page.serviceSlug.replace(/-/g, ' ')}
                      </span>
                      <ArrowRight className="w-5 h-5 text-neutral-400 group-hover:text-[#6D28D9] group-hover:translate-x-1 transition-all" />
                    </div>
                    <h3 className="text-xl font-bold text-neutral-900 group-hover:text-[#6D28D9] transition-colors mb-2">
                      {page.title.split('|')[0].trim()}
                    </h3>
                    <p className="text-sm text-neutral-600 line-clamp-3">
                      {page.metaDescription}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-[#E9E7F2] flex items-center justify-between text-xs font-bold text-[#6D28D9]">
                    <span>View Dedicated Strategy</span>
                    <ChevronRight className="w-4 h-4" />
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Available Full Suite Services */}
        <section className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-neutral-900">
              Available Digital Growth Capabilities
            </h2>
            <p className="text-sm text-neutral-600">
              Select any capability to discover how House Robotics delivers tailored results for {city.name} businesses.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {standardServices.map((svc) => {
              const Icon = svc.icon;
              return (
                <div
                  key={svc.slug}
                  onClick={() => onNavigatePath(`/usa/${state.slug}/${city.slug}/${svc.slug}`)}
                  className="group bg-white p-6 rounded-2xl border border-[#E9E7F2] hover:border-[#6D28D9]/40 hover:shadow-md transition-all duration-200 cursor-pointer flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    <div className="w-12 h-12 rounded-xl bg-[#F3F0FF] flex items-center justify-center text-[#6D28D9] group-hover:bg-[#6D28D9] group-hover:text-white transition-colors">
                      <Icon className="w-6 h-6" />
                    </div>
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#6D28D9] bg-purple-50 px-2 py-0.5 rounded">
                        {svc.badge}
                      </span>
                      <h3 className="font-bold text-neutral-900 text-base group-hover:text-[#6D28D9] transition-colors mt-1.5">
                        {svc.title}
                      </h3>
                    </div>
                    <p className="text-xs text-neutral-500 leading-relaxed">
                      {svc.desc}
                    </p>
                  </div>

                  <div className="mt-6 pt-3 border-t border-[#E9E7F2] flex items-center justify-between text-xs font-semibold text-[#6D28D9]">
                    <span>Explore Service</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Remote Model Assurance */}
        <section className="bg-white rounded-2xl border border-[#E9E7F2] p-6 sm:p-10 shadow-sm space-y-6">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 text-xs font-bold text-[#6D28D9] uppercase tracking-wider mb-2">
              <ShieldCheck className="w-4 h-4" />
              <span>Transparent Delivery Model</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-neutral-900">
              Why {city.name} Companies Partner with House Robotics Remotely
            </h2>
            <p className="text-neutral-600 text-sm sm:text-base mt-2">
              We operate as a high-velocity remote engineering and growth studio. Rather than maintaining expensive local offices in {city.name}, we channel resources directly into top-tier development talent, technical SEO rigor, and continuous client communication.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
            <div className="p-5 rounded-xl bg-[#FAF9FF] border border-[#E9E7F2] space-y-2">
              <Clock className="w-5 h-5 text-[#6D28D9]" />
              <h4 className="font-bold text-neutral-900 text-sm">Synchronized Sprint Reviews</h4>
              <p className="text-xs text-neutral-600 leading-relaxed">
                Bi-weekly video consultations and weekly staging deployments scheduled around your local work day.
              </p>
            </div>
            <div className="p-5 rounded-xl bg-[#FAF9FF] border border-[#E9E7F2] space-y-2">
              <Code2 className="w-5 h-5 text-[#6D28D9]" />
              <h4 className="font-bold text-neutral-900 text-sm">Modern Architecture</h4>
              <p className="text-xs text-neutral-600 leading-relaxed">
                Production-ready code built with TypeScript, React, Vite, Node, and PHP for clean maintenance and high Lighthouse scores.
              </p>
            </div>
            <div className="p-5 rounded-xl bg-[#FAF9FF] border border-[#E9E7F2] space-y-2">
              <Users className="w-5 h-5 text-[#6D28D9]" />
              <h4 className="font-bold text-neutral-900 text-sm">Direct Founder Contact</h4>
              <p className="text-xs text-neutral-600 leading-relaxed">
                Direct WhatsApp and email channels with technical leadership for instant resolution and tactical agility.
              </p>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="pt-6 border-t border-[#E9E7F2] flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <p className="text-sm font-bold text-neutral-900">Ready to consult on a project in {city.name}?</p>
              <p className="text-xs text-neutral-500">Contact us directly via WhatsApp or schedule a free video consultation.</p>
            </div>
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <a
                href={AGENCY_INFO.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-semibold shadow-sm transition"
              >
                <span>WhatsApp Message</span>
              </a>
              <button
                onClick={() => onOpenConsultation(`Project Inquiry — ${city.name}, ${state.abbreviation}`)}
                className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-[#6D28D9] hover:bg-[#5B21B6] text-white rounded-xl text-xs font-semibold shadow-sm transition"
              >
                <span>Request Proposal</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
};

