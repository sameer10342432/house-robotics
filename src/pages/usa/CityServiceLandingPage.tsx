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
  HelpCircle,
  Layers,
  Send,
  MessageSquare,
  AlertCircle
} from 'lucide-react';
import { UsaBreadcrumb } from '../../components/usa/UsaBreadcrumb';
import { fetchLocationPage, submitContact } from '../../utils/api';
import { AGENCY_INFO } from '../../data/agencyData';
import { applyPageSeo } from '../../utils/seo';

interface CityServiceLandingPageProps {
  stateSlug: string;
  citySlug: string;
  serviceSlug: string;
  onNavigatePath: (path: string) => void;
  onOpenConsultation: (service?: string) => void;
}

export const CityServiceLandingPage: React.FC<CityServiceLandingPageProps> = ({
  stateSlug,
  citySlug,
  serviceSlug,
  onNavigatePath,
  onOpenConsultation
}) => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Lead Generation Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    budget: '$5,000 - $15,000',
    message: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formError, setFormError] = useState('');

  useEffect(() => {
    loadPage();
  }, [stateSlug, citySlug, serviceSlug]);

  const loadPage = async () => {
    setLoading(true);
    try {
      const res = await fetchLocationPage(stateSlug, citySlug, serviceSlug);
      if (res.success && res.data) {
        setData(res.data);
        const { page, city, state } = res.data;
        const formattedService = serviceSlug.replace(/-/g, ' ').replace(/\b\w/g, (c: string) => c.toUpperCase());
        const defaultTitle = `${formattedService} in ${city?.name}, ${state?.abbreviation || state?.code} | House Robotics`;
        const pageTitle = page?.metaTitle || (defaultTitle.length <= 60 ? defaultTitle : `${formattedService} in ${city?.name} | House Robotics`);
        const pageDesc = page?.metaDescription || `Explore ${serviceSlug.replace(/-/g, ' ')} in ${city?.name}, ${state?.name}, with custom technical execution and performance tracking tailored to your business goals.`;
        applyPageSeo(`/usa/${stateSlug}/${citySlug}/${serviceSlug}`, {
          seoTitle: pageTitle,
          metaDescription: pageDesc,
          canonicalUrl: page?.canonicalUrl || `https://houserobotics.online/usa/${stateSlug}/${citySlug}/${serviceSlug}`,
          ogTitle: page?.ogTitle || pageTitle,
          ogDescription: page?.ogDescription || pageDesc
        });
      }
    } catch (e) {
      console.warn('Failed loading landing page data', e);
    } finally {
      setLoading(false);
    }
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');

    if (!formData.name || !formData.email || !formData.message) {
      setFormError('Please provide your name, business email, and a brief description of your project.');
      return;
    }

    setSubmitting(true);
    try {
      const urlParams = new URLSearchParams(window.location.search);
      const res = await submitContact({
        name: formData.name,
        email: formData.email,
        phone: formData.phone || 'N/A',
        company: formData.company,
        service: `${serviceSlug.replace(/-/g, ' ')} (${data?.city?.name || citySlug}, ${data?.state?.abbreviation || stateSlug})`,
        budget: formData.budget,
        message: formData.message,
        source: 'USA_LANDING_PAGE',
        city: data?.city?.name || citySlug,
        state: data?.state?.name || stateSlug,
        pageUrl: window.location.href,
        utmSource: urlParams.get('utm_source') || undefined,
        utmMedium: urlParams.get('utm_medium') || undefined,
        utmCampaign: urlParams.get('utm_campaign') || undefined
      });

      if (res.success) {
        setSubmitted(true);
      } else {
        setFormError(res.message || 'Unable to submit your inquiry at this moment. Please reach out directly on WhatsApp.');
      }
    } catch (err: any) {
      setFormError(err.message || 'Submission failed. Please check your network connection.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FAF9FF] flex items-center justify-center py-24">
        <div className="text-center space-y-4">
          <div className="w-10 h-10 border-4 border-[#6D28D9] border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-neutral-600 font-medium text-sm">Loading market landing page...</p>
        </div>
      </div>
    );
  }

  if (!data || !data.city || !data.state) {
    return (
      <div className="min-h-screen bg-[#FAF9FF] py-24 px-4 text-center">
        <h2 className="text-2xl font-bold text-neutral-900 mb-2">Market Solution Not Found</h2>
        <p className="text-neutral-600 mb-6">The requested location-service combination is not currently active.</p>
        <button
          onClick={() => onNavigatePath('/usa')}
          className="px-6 py-2.5 bg-[#6D28D9] text-white rounded-xl font-semibold hover:bg-[#5B21B6] transition"
        >
          Return to USA Directory
        </button>
      </div>
    );
  }

  const { page, city, state, relatedPages = [] } = data;
  const serviceName = serviceSlug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());

  // Safe JSON Parser for dynamic database fields
  const parseSafeJson = <T,>(val: any, fallback: T): T => {
    if (!val) return fallback;
    if (typeof val === 'object') return val as T;
    try {
      return JSON.parse(val) as T;
    } catch {
      return fallback;
    }
  };

  const dynamicIndustries = parseSafeJson<Array<{ industry: string; challenge: string }>>(page?.localIndustryFocus, []);
  const dynamicProblems = parseSafeJson<string[]>(page?.businessProblemsSolved, []);
  const dynamicDeliverables = parseSafeJson<any[]>(page?.serviceDeliverables, []);
  const dynamicScenario = parseSafeJson<{ scenarioTitle?: string; description?: string }>(page?.illustrativeScenarios, {});
  const dynamicFaqs = parseSafeJson<Array<{ question: string; answer: string }>>(page?.faqs, []);

  // Structured Data for SEO
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    'name': page?.metaTitle || page?.title || `${serviceName} in ${city.name}, ${state.abbreviation}`,
    'description': page?.metaDescription || `Professional ${serviceName} tailored for businesses in ${city.name}, ${state.name}.`,
    'provider': {
      '@type': 'Organization',
      'name': 'House Robotics',
      'url': 'https://houserobotics.online',
      'email': AGENCY_INFO.email
    },
    'areaServed': {
      '@type': 'City',
      'name': city.name,
      'containedInPlace': {
        '@type': 'State',
        'name': state.name
      }
    }
  };

  return (
    <div className="bg-[#FAF9FF] min-h-screen">
      {/* Schema.org Injection */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />

      {/* Breadcrumb Navigation */}
      <div className="bg-white border-b border-[#E9E7F2]">
        <UsaBreadcrumb
          items={[
            { label: 'USA Target Markets', path: '/usa' },
            { label: state.name, path: `/usa/${state.slug}` },
            { label: city.name, path: `/usa/${state.slug}/${city.slug}` },
            { label: serviceName }
          ]}
          onNavigate={(p) => onNavigatePath(p)}
          pageTitle={page?.metaTitle || page?.title}
          pageDescription={page?.metaDescription}
          canonicalUrl={page?.canonicalUrl || `https://houserobotics.online/usa/${state.slug}/${city.slug}/${serviceSlug}`}
        />
      </div>

      {/* Hero Section */}
      <section className="relative overflow-hidden py-14 sm:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white via-[#FAF9FF] to-[#F3F0FF] border-b border-[#E9E7F2]">
        <div className="max-w-6xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F3F0FF] border border-[#E9E7F2] text-[#6D28D9] text-xs font-bold tracking-wide uppercase">
            <Building2 className="w-3.5 h-3.5" />
            <span>{city.name}, {state.abbreviation} • Commercial Solutions</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-neutral-900 tracking-tight leading-[1.12]">
            {page?.h1Title || page?.h1 || `${serviceName} for High-Growth Businesses in ${city.name}, ${state.abbreviation}`}
          </h1>

          <p className="max-w-3xl text-base sm:text-lg text-neutral-600 leading-relaxed">
            {page?.contentIntro || page?.intro || `House Robotics delivers bespoke ${serviceName.toLowerCase()} engineered to empower enterprises across the ${city.metroArea} commercial market. We combine technical rigor, conversion architecture, and remote agility.`}
          </p>

          {/* Quick Stats Banner */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4">
            <div className="bg-white p-4 rounded-xl border border-[#E9E7F2] shadow-sm">
              <span className="text-xs uppercase tracking-wider text-neutral-400 font-semibold block">Target Market</span>
              <span className="text-sm sm:text-base font-bold text-neutral-900">{city.name}, {state.abbreviation}</span>
            </div>
            <div className="bg-white p-4 rounded-xl border border-[#E9E7F2] shadow-sm">
              <span className="text-xs uppercase tracking-wider text-neutral-400 font-semibold block">Primary Focus</span>
              <span className="text-sm sm:text-base font-bold text-[#6D28D9]">{serviceName}</span>
            </div>
            <div className="bg-white p-4 rounded-xl border border-[#E9E7F2] shadow-sm">
              <span className="text-xs uppercase tracking-wider text-neutral-400 font-semibold block">Delivery Framework</span>
              <span className="text-sm sm:text-base font-bold text-neutral-900">Direct Remote Sprint</span>
            </div>
            <div className="bg-white p-4 rounded-xl border border-[#E9E7F2] shadow-sm">
              <span className="text-xs uppercase tracking-wider text-neutral-400 font-semibold block">Turnaround</span>
              <span className="text-sm sm:text-base font-bold text-emerald-600">Agile Bi-Weekly</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Layout */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left Column: Comprehensive Editorial Content */}
          <div className="lg:col-span-7 space-y-12">
            
            {/* Section 1: Local Market & Industry Challenges */}
            <div className="bg-white rounded-2xl border border-[#E9E7F2] p-6 sm:p-8 shadow-sm space-y-4">
              <div className="inline-flex items-center gap-2 text-xs font-bold text-[#6D28D9] uppercase tracking-wider">
                <Briefcase className="w-4 h-4" />
                <span>Market Context</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-neutral-900">
                Solving Critical Commercial Bottlenecks in {city.name}
              </h2>
              <p className="text-sm sm:text-base text-neutral-600 leading-relaxed">
                The commercial ecosystem across {city.name} is powered by key sectors including <strong className="text-neutral-800">{city.majorIndustries}</strong>. In these demanding verticals, traditional off-the-shelf templates and generic marketing campaigns consistently fail to yield qualified enterprise pipeline.
              </p>
              
              {dynamicIndustries.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  {dynamicIndustries.map((item, idx) => (
                    <div key={idx} className="p-4 rounded-xl bg-[#FAF9FF] border border-[#E9E7F2] space-y-1.5">
                      <span className="text-xs font-bold text-[#6D28D9] uppercase block">{item.industry}</span>
                      <p className="text-xs text-neutral-600 leading-relaxed">{item.challenge}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div className="p-4 rounded-xl bg-[#FAF9FF] border border-[#E9E7F2] space-y-1.5">
                    <span className="text-xs font-bold text-rose-600 uppercase">Common Bottleneck</span>
                    <p className="text-xs text-neutral-600">Sluggish website performance, low mobile conversion rates, and bloated legacy tech stacks.</p>
                  </div>
                  <div className="p-4 rounded-xl bg-[#FAF9FF] border border-[#E9E7F2] space-y-1.5">
                    <span className="text-xs font-bold text-emerald-600 uppercase">House Robotics Solution</span>
                    <p className="text-xs text-neutral-600">Bespoke full-stack engineering, sub-second TTFB, and conversion-focused UX architecture.</p>
                  </div>
                </div>
              )}
            </div>

            {/* Section 2: Service Deliverables & Engineering Specs */}
            <div className="bg-white rounded-2xl border border-[#E9E7F2] p-6 sm:p-8 shadow-sm space-y-6">
              <div className="inline-flex items-center gap-2 text-xs font-bold text-[#6D28D9] uppercase tracking-wider">
                <Layers className="w-4 h-4" />
                <span>Deliverables & Scope</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-neutral-900">
                What We Deliver for Your Project
              </h2>
              <div className="space-y-3.5">
                {(dynamicDeliverables.length > 0 ? dynamicDeliverables : [
                  {
                    title: 'Bespoke Production-Grade Architecture',
                    desc: 'Clean, modular code built with modern frameworks (React, Vite, Node, PHP) with zero unnecessary vendor bloat.'
                  },
                  {
                    title: 'Search Optimization & Core Web Vitals Excellence',
                    desc: 'Pre-rendered semantic HTML, mobile-first layouts, and technical schema metadata designed to secure high organic positions.'
                  },
                  {
                    title: 'API & Workflow Automation Integrations',
                    desc: 'Seamless connections to your existing CRM, WhatsApp lead routing, Stripe payment gateways, and automated webhook pipelines.'
                  },
                  {
                    title: 'Full Intellectual Property Ownership',
                    desc: 'You own 100% of your source code, repositories, graphic assets, and deployment credentials with complete independence.'
                  }
                ]).map((item: any, idx: number) => {
                  const title = typeof item === 'string' ? item : item.title;
                  const desc = typeof item === 'string' ? null : item.desc;
                  return (
                    <div key={idx} className="flex items-start gap-3.5 p-3.5 rounded-xl bg-[#FAF9FF] border border-[#E9E7F2]">
                      <CheckCircle2 className="w-5 h-5 text-[#6D28D9] flex-shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-bold text-neutral-900 text-sm">{title}</h4>
                        {desc && <p className="text-xs text-neutral-600 mt-0.5 leading-relaxed">{desc}</p>}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Section 3: Transparent Remote Collaboration Framework */}
            <div className="bg-white rounded-2xl border border-[#E9E7F2] p-6 sm:p-8 shadow-sm space-y-6">
              <div className="inline-flex items-center gap-2 text-xs font-bold text-[#6D28D9] uppercase tracking-wider">
                <ShieldCheck className="w-4 h-4" />
                <span>Remote Collaboration Model</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-neutral-900">
                Transparent Remote Delivery for {city.name} Clients
              </h2>
              <p className="text-sm text-neutral-600 leading-relaxed">
                {page?.remoteCollaborationModel || `House Robotics operates as an agile, remote technology studio. We do not claim physical office spaces in ${city.name}, allowing us to offer elite technical engineering and growth consulting at a fraction of high-overhead US agency retainers.`}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                <div className="p-4 rounded-xl bg-[#FAF9FF] border border-[#E9E7F2] space-y-1.5 text-center">
                  <Clock className="w-5 h-5 text-[#6D28D9] mx-auto" />
                  <h4 className="font-bold text-xs text-neutral-900">US Timezone Alignment</h4>
                  <p className="text-[11px] text-neutral-500">Live video calls and sprint reviews scheduled during your business day.</p>
                </div>
                <div className="p-4 rounded-xl bg-[#FAF9FF] border border-[#E9E7F2] space-y-1.5 text-center">
                  <Code2 className="w-5 h-5 text-[#6D28D9] mx-auto" />
                  <h4 className="font-bold text-xs text-neutral-900">Direct Engineer Access</h4>
                  <p className="text-[11px] text-neutral-500">Communicate directly with the developers writing your code.</p>
                </div>
                <div className="p-4 rounded-xl bg-[#FAF9FF] border border-[#E9E7F2] space-y-1.5 text-center">
                  <CheckCircle2 className="w-5 h-5 text-[#6D28D9] mx-auto" />
                  <h4 className="font-bold text-xs text-neutral-900">Staging Environments</h4>
                  <p className="text-[11px] text-neutral-500">Review live staging prototypes before anything touches production.</p>
                </div>
              </div>
            </div>

            {/* Section 4: Illustrative Client Scenario (Transparent, non-fabricated) */}
            <div className="bg-gradient-to-br from-[#FAF9FF] to-[#F3F0FF] rounded-2xl border border-[#E9E7F2] p-6 sm:p-8 space-y-4">
              <span className="text-[10px] font-bold px-2.5 py-1 rounded-md bg-purple-100 text-[#6D28D9] uppercase tracking-wider">
                Illustrative Practical Scenario
              </span>
              <h3 className="text-lg font-bold text-neutral-900">
                {dynamicScenario?.scenarioTitle || `How a Typical B2B Firm in ${city.name} Scales with House Robotics`}
              </h3>
              <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                {dynamicScenario?.description || `Scenario: A commercial enterprise in the ${city.metroArea} area experiences sluggish organic inquiry volume. House Robotics implements a modern architecture, resolving Core Web Vitals bottlenecks and elevating qualified inbound pipeline.`}
              </p>
            </div>

            {/* Section 5: Frequently Asked Questions */}
            <div className="bg-white rounded-2xl border border-[#E9E7F2] p-6 sm:p-8 shadow-sm space-y-6">
              <div className="inline-flex items-center gap-2 text-xs font-bold text-[#6D28D9] uppercase tracking-wider">
                <HelpCircle className="w-4 h-4" />
                <span>Common Inquiries</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-neutral-900">
                Frequently Asked Questions
              </h2>
              <div className="space-y-4">
                {(dynamicFaqs.length > 0 ? dynamicFaqs : [
                  {
                    question: `How do we collaborate if House Robotics is working remotely for our ${city.name} business?`,
                    answer: `We utilize modern asynchronous tools (Slack, WhatsApp, Loom, and GitHub) combined with scheduled Zoom/Google Meet sprint reviews. You receive weekly progress reports and staging URLs to test new features in real time.`
                  },
                  {
                    question: `Do you provide ongoing maintenance and performance monitoring?`,
                    answer: `Yes. In addition to custom development and SEO deployment, we offer continuous SLA maintenance, server monitoring, security patching, and search visibility tracking.`
                  },
                  {
                    question: `What is the typical timeline for an enterprise engagement?`,
                    answer: `Most website redesigns and custom web development projects are completed within 3 to 6 weeks. SEO optimization and AI automation sprints can often be deployed in 2-week increments.`
                  },
                  {
                    question: `Do you guarantee specific search rankings or revenue figures?`,
                    answer: `We do not make false guarantees of #1 rankings or guaranteed revenue, as search algorithms and consumer behavior depend on numerous market factors. We adhere strictly to Google Webmaster Guidelines and verifiable engineering excellence.`
                  }
                ]).map((faq: any, idx: number) => (
                  <div key={idx} className="p-4 rounded-xl bg-[#FAF9FF] border border-[#E9E7F2] space-y-2">
                    <h4 className="font-bold text-neutral-900 text-sm">{faq.question || faq.q}</h4>
                    <p className="text-xs text-neutral-600 leading-relaxed">{faq.answer || faq.a}</p>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Right Column: High-Conversion Lead Capture Form & Direct Contact */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Consultation & Lead Capture Box */}
            <div className="bg-white rounded-2xl border-2 border-[#6D28D9]/30 p-6 sm:p-8 shadow-md sticky top-6 space-y-6">
              <div>
                <div className="inline-flex items-center gap-2 text-xs font-bold text-[#6D28D9] uppercase tracking-wider mb-1">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Request a Free Project Consultation</span>
                </div>
                <h3 className="text-2xl font-extrabold text-neutral-900">
                  Discuss Your {city.name} Project
                </h3>
                <p className="text-xs text-neutral-500 mt-1">
                  Connect directly with technical leadership. No sales spam, no obligations.
                </p>
              </div>

              {submitted ? (
                <div className="p-6 rounded-xl bg-emerald-50 border border-emerald-200 text-center space-y-3">
                  <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
                  <h4 className="font-bold text-neutral-900 text-base">Inquiry Received</h4>
                  <p className="text-xs text-neutral-600 leading-relaxed">
                    Thank you! Our technical director will review your requirements for {city.name} and reach out within 24 hours.
                  </p>
                  <button
                    onClick={() => { setSubmitted(false); setFormData({ name: '', email: '', phone: '', company: '', budget: '$5,000 - $15,000', message: '' }); }}
                    className="text-xs text-[#6D28D9] font-bold hover:underline"
                  >
                    Submit another inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="space-y-4">
                  {formError && (
                    <div className="p-3 rounded-lg bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 flex-shrink-0" />
                      <span>{formError}</span>
                    </div>
                  )}

                  <div>
                    <label className="block text-xs font-bold text-neutral-700 mb-1">Your Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Michael Smith"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-[#FAF9FF] border border-[#E9E7F2] rounded-xl text-sm focus:outline-none focus:border-[#6D28D9] transition"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-neutral-700 mb-1">Business Email *</label>
                    <input
                      type="email"
                      required
                      placeholder="michael@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-[#FAF9FF] border border-[#E9E7F2] rounded-xl text-sm focus:outline-none focus:border-[#6D28D9] transition"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-neutral-700 mb-1">Phone / WhatsApp</label>
                      <input
                        type="text"
                        placeholder="+1 (555) 000-0000"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-3.5 py-2.5 bg-[#FAF9FF] border border-[#E9E7F2] rounded-xl text-sm focus:outline-none focus:border-[#6D28D9] transition"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-neutral-700 mb-1">Company</label>
                      <input
                        type="text"
                        placeholder="Company name"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        className="w-full px-3.5 py-2.5 bg-[#FAF9FF] border border-[#E9E7F2] rounded-xl text-sm focus:outline-none focus:border-[#6D28D9] transition"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-neutral-700 mb-1">Estimated Budget</label>
                    <select
                      value={formData.budget}
                      onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-[#FAF9FF] border border-[#E9E7F2] rounded-xl text-sm focus:outline-none focus:border-[#6D28D9] transition"
                    >
                      <option value="Under $5,000">Under $5,000</option>
                      <option value="$5,000 - $15,000">$5,000 - $15,000</option>
                      <option value="$15,000 - $30,000">$15,000 - $30,000</option>
                      <option value="$30,000+">$30,000+</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-neutral-700 mb-1">Project Details *</label>
                    <textarea
                      required
                      rows={3}
                      placeholder={`Tell us about your goals in ${city.name}...`}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-[#FAF9FF] border border-[#E9E7F2] rounded-xl text-sm focus:outline-none focus:border-[#6D28D9] transition"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full py-3 bg-[#6D28D9] hover:bg-[#5B21B6] disabled:opacity-60 text-white rounded-xl font-bold text-sm shadow-md transition flex items-center justify-center gap-2"
                  >
                    {submitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Submitting...</span>
                      </>
                    ) : (
                      <>
                        <span>Submit Project Request</span>
                        <Send className="w-4 h-4" />
                      </>
                    )}
                  </button>

                  <p className="text-[11px] text-neutral-400 text-center">
                    Protected by privacy standards. We never share or sell client contact details.
                  </p>
                </form>
              )}

              {/* Direct WhatsApp Channel */}
              <div className="pt-4 border-t border-[#E9E7F2] space-y-3">
                <span className="text-xs uppercase tracking-wider text-neutral-400 font-semibold block text-center">
                  Prefer Instant Messaging?
                </span>
                <a
                  href={AGENCY_INFO.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-semibold text-xs transition flex items-center justify-center gap-2"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>WhatsApp: +92 347 4542881</span>
                </a>
              </div>
            </div>

            {/* Related Landing Pages */}
            {relatedPages.length > 0 && (
              <div className="bg-white rounded-2xl border border-[#E9E7F2] p-5 shadow-sm space-y-3">
                <h4 className="font-bold text-neutral-900 text-sm">More Solutions in {city.name}</h4>
                <div className="space-y-2">
                  {relatedPages.map((rp: any) => (
                    <div
                      key={rp.id}
                      onClick={() => onNavigatePath(`/usa/${state.slug}/${city.slug}/${rp.serviceSlug}`)}
                      className="p-3 rounded-lg bg-[#FAF9FF] hover:bg-[#F3F0FF] border border-[#E9E7F2] cursor-pointer transition flex items-center justify-between text-xs font-semibold text-neutral-800"
                    >
                      <span className="line-clamp-1">{rp.serviceSlug.replace(/-/g, ' ').toUpperCase()}</span>
                      <ChevronRight className="w-4 h-4 text-[#6D28D9]" />
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>

        </div>
      </div>
    </div>
  );
};

