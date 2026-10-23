export interface CityRecord {
  state: string;
  stateCode: string;
  stateSlug: string;
  city: string;
  citySlug: string;
  county: string;
  metroArea: string;
  population: number;
  populationYear: string;
  majorIndustries: string;
  digitalDemandTier: 'Tier 1 Priority' | 'High' | 'Moderate';
  priorityTier: 1 | 2 | 3;
  source: string;
  researchDate: string;
  commercialProfile: string;
  remoteDeliveryFit: string;
}

// Master list containing Tier 1 (100 Priority Commercial Hubs), Tier 2 (Expansion Metros & Key Suburbs), and Tier 3 (State Inventory)
export const RAW_CITIES: CityRecord[] = [
  // --- TIER 1: TOP PRIORITY COMMERCIAL HUBS (100 CITIES) ---
  {
    state: 'New York', stateCode: 'NY', stateSlug: 'new-york',
    city: 'New York City', citySlug: 'new-york-city',
    county: 'New York / Kings / Queens / Bronx / Richmond',
    metroArea: 'New York-Newark-Jersey City Metropolitan Area',
    population: 8258035, populationYear: '2023 US Census Bureau Estimate',
    majorIndustries: 'Finance & Banking (Wall Street), Advertising & Media, Tech (Silicon Alley), Healthcare, Real Estate, Fashion',
    digitalDemandTier: 'Tier 1 Priority', priorityTier: 1,
    source: 'US Census Bureau / NYC Economic Development Corporation', researchDate: '2026-Q1',
    commercialProfile: 'Global capital of commerce, finance, and culture with immense demand for enterprise web engineering, high-competition SEO, and bespoke corporate marketing systems.',
    remoteDeliveryFit: 'High - US Eastern Time zone aligns perfectly with structured morning sprint standups and async communication.'
  },
  {
    state: 'California', stateCode: 'CA', stateSlug: 'california',
    city: 'Los Angeles', citySlug: 'los-angeles',
    county: 'Los Angeles County',
    metroArea: 'Los Angeles-Long Beach-Anaheim Metro Area',
    population: 3820914, populationYear: '2023 US Census Bureau Estimate',
    majorIndustries: 'Entertainment & Streaming, Silicon Beach Tech, Aerospace, Fashion & Apparel, International Trade, Tourism',
    digitalDemandTier: 'Tier 1 Priority', priorityTier: 1,
    source: 'US Census Bureau / LAEDC', researchDate: '2026-Q1',
    commercialProfile: 'Massive consumer and creative economy with thousands of DTC brands, entertainment production studios, and venture-backed Silicon Beach tech startups requiring high-converting websites and paid customer acquisition.',
    remoteDeliveryFit: 'High - Robust remote tech culture accustomed to digital-first agency partnerships.'
  },
  {
    state: 'Illinois', stateCode: 'IL', stateSlug: 'illinois',
    city: 'Chicago', citySlug: 'chicago',
    county: 'Cook County',
    metroArea: 'Chicago-Naperville-Elgin Metro Area (Chicagoland)',
    population: 2664452, populationYear: '2023 US Census Bureau Estimate',
    majorIndustries: 'Financial Derivatives & Trading, Advanced Manufacturing, Multimodal Logistics, Food Processing, Professional B2B Services',
    digitalDemandTier: 'Tier 1 Priority', priorityTier: 1,
    source: 'US Census Bureau / World Business Chicago', researchDate: '2026-Q1',
    commercialProfile: 'Dominant economic capital of the American Midwest. Massive concentration of B2B manufacturers, logistics brokerages, and corporate headquarters seeking digital workflow automation and enterprise B2B lead generation.',
    remoteDeliveryFit: 'High - Central Time Zone overlap and heavy adoption of remote software solutions.'
  },
  {
    state: 'Texas', stateCode: 'TX', stateSlug: 'texas',
    city: 'Houston', citySlug: 'houston',
    county: 'Harris County',
    metroArea: 'Houston-The Woodlands-Sugar Land Metro Area',
    population: 2314157, populationYear: '2023 US Census Bureau Estimate',
    majorIndustries: 'Energy (Oil & Gas, Clean Tech), Texas Medical Center (Healthcare), Aerospace (NASA Johnson Space Center), Port & Maritime Logistics',
    digitalDemandTier: 'Tier 1 Priority', priorityTier: 1,
    source: 'US Census Bureau / Greater Houston Partnership', researchDate: '2026-Q1',
    commercialProfile: 'Energy Capital of the World and home to the world’s largest medical complex. Strong demand for industrial digital marketing, medical practice SEO, and enterprise software systems.',
    remoteDeliveryFit: 'High - Large engineering, medical, and corporate base with standardized remote procurement.'
  },
  {
    state: 'Arizona', stateCode: 'AZ', stateSlug: 'arizona',
    city: 'Phoenix', citySlug: 'phoenix',
    county: 'Maricopa County',
    metroArea: 'Phoenix-Mesa-Chandler Metro Area (Valley of the Sun)',
    population: 1650070, populationYear: '2023 US Census Bureau Estimate',
    majorIndustries: 'Semiconductors (Silicon Desert), Healthcare, Real Estate & Construction, Tourism & Hospitality, Financial Technology',
    digitalDemandTier: 'Tier 1 Priority', priorityTier: 1,
    source: 'US Census Bureau / Greater Phoenix Economic Council', researchDate: '2026-Q1',
    commercialProfile: 'One of America’s fastest-growing business migration magnets. Booming small-to-medium enterprise market in home services, construction, healthcare, and advanced manufacturing.',
    remoteDeliveryFit: 'High - Mountain Time Zone, tech-forward business environment.'
  },
  {
    state: 'Pennsylvania', stateCode: 'PA', stateSlug: 'pennsylvania',
    city: 'Philadelphia', citySlug: 'philadelphia',
    county: 'Philadelphia County',
    metroArea: 'Philadelphia-Camden-Wilmington Metro Area',
    population: 1550542, populationYear: '2023 US Census Bureau Estimate',
    majorIndustries: 'Healthcare & Life Sciences, Higher Education, Biotechnology (Cell & Gene Therapy), Financial Services, Legal Services',
    digitalDemandTier: 'Tier 1 Priority', priorityTier: 1,
    source: 'US Census Bureau / Select Greater Philadelphia', researchDate: '2026-Q1',
    commercialProfile: 'Major East Coast life sciences and professional services center with strong demand for HIPAA-compliant web development, specialized B2B SEO, and authority content marketing.',
    remoteDeliveryFit: 'High - Eastern Time Zone, high density of remote medical and educational vendors.'
  },
  {
    state: 'Texas', stateCode: 'TX', stateSlug: 'texas',
    city: 'San Antonio', citySlug: 'san-antonio',
    county: 'Bexar County',
    metroArea: 'San Antonio-New Braunfels Metro Area',
    population: 1495295, populationYear: '2023 US Census Bureau Estimate',
    majorIndustries: 'Cybersecurity, Military & Defense, Healthcare & Bioscience, Tourism, Financial Services (USAA HQ)',
    digitalDemandTier: 'Tier 1 Priority', priorityTier: 1,
    source: 'US Census Bureau / Greater:SATX', researchDate: '2026-Q1',
    commercialProfile: 'Cyber City USA with significant defense contracting, bilingual commerce, and medical networks needing modern web portals, local SEO, and cybersecurity automation workflows.',
    remoteDeliveryFit: 'High - Central Time Zone with extensive virtual operations.'
  },
  {
    state: 'California', stateCode: 'CA', stateSlug: 'california',
    city: 'San Diego', citySlug: 'san-diego',
    county: 'San Diego County',
    metroArea: 'San Diego-Chula Vista-Carlsbad Metro Area',
    population: 1381162, populationYear: '2023 US Census Bureau Estimate',
    majorIndustries: 'Biotechnology & Genomics, Defense & Naval Technology, Telecommunications (Qualcomm), Tourism, Clean Tech',
    digitalDemandTier: 'Tier 1 Priority', priorityTier: 1,
    source: 'US Census Bureau / San Diego Regional EDC', researchDate: '2026-Q1',
    commercialProfile: 'Premier biotech and defense tech hub on the West Coast. Substantial demand for scientific brand websites, venture pitch landing pages, and international talent attraction funnels.',
    remoteDeliveryFit: 'High - Pacific Time Zone, high comfort with remote contract delivery.'
  },
  {
    state: 'Texas', stateCode: 'TX', stateSlug: 'texas',
    city: 'Dallas', citySlug: 'dallas',
    county: 'Dallas County',
    metroArea: 'Dallas-Fort Worth-Arlington Metro Area (DFW Metroplex)',
    population: 1302868, populationYear: '2023 US Census Bureau Estimate',
    majorIndustries: 'Corporate Headquarters, Financial Services, Telecommunications, Logistics, Healthcare, Technology',
    digitalDemandTier: 'Tier 1 Priority', priorityTier: 1,
    source: 'US Census Bureau / Dallas Regional Chamber', researchDate: '2026-Q1',
    commercialProfile: 'A primary corporate epicenter of North America. Massive demand for enterprise website redesigns, national SEO campaigns, multi-channel PPC management, and sales CRM automation.',
    remoteDeliveryFit: 'High - Central Time Zone, corporate headquarters accustomed to global agency talent.'
  },
  {
    state: 'Texas', stateCode: 'TX', stateSlug: 'texas',
    city: 'Austin', citySlug: 'austin',
    county: 'Travis County',
    metroArea: 'Austin-Round Rock-San Marcos Metro Area (Silicon Hills)',
    population: 979882, populationYear: '2023 US Census Bureau Estimate',
    majorIndustries: 'Technology & SaaS, Semiconductor Engineering, Venture Capital, Creative Media, Clean Energy, Biomedical',
    digitalDemandTier: 'Tier 1 Priority', priorityTier: 1,
    source: 'US Census Bureau / Austin Chamber of Commerce', researchDate: '2026-Q1',
    commercialProfile: 'Silicon Hills is one of the highest-value tech startup and venture growth ecosystems in the world. High willingness to invest in top-tier performance web development, technical SEO, and AI workflows.',
    remoteDeliveryFit: 'Exceptional - Global epicenter of remote-first technology culture and async project execution.'
  },
  {
    state: 'Florida', stateCode: 'FL', stateSlug: 'florida',
    city: 'Jacksonville', citySlug: 'jacksonville',
    county: 'Duval County',
    metroArea: 'Jacksonville-St. Augustine Metro Area',
    population: 985843, populationYear: '2023 US Census Bureau Estimate',
    majorIndustries: 'Financial Technology, Logistics & Deepwater Port, Healthcare, Aviation Maintenance, Defense',
    digitalDemandTier: 'Tier 1 Priority', priorityTier: 1,
    source: 'US Census Bureau / JAXUSA Partnership', researchDate: '2026-Q1',
    commercialProfile: 'Major East Coast intermodal freight and fintech hub with expanding corporate operations requiring local SEO, freight brokerage portals, and medical marketing.',
    remoteDeliveryFit: 'High - Eastern Time Zone, business-friendly climate.'
  },
  {
    state: 'California', stateCode: 'CA', stateSlug: 'california',
    city: 'San Jose', citySlug: 'san-jose',
    county: 'Santa Clara County',
    metroArea: 'San Jose-Sunnyvale-Santa Clara Metro Area (Silicon Valley)',
    population: 969655, populationYear: '2023 US Census Bureau Estimate',
    majorIndustries: 'Artificial Intelligence, Semiconductor Hardware, Cloud Computing, Enterprise Software, Venture Capital',
    digitalDemandTier: 'Tier 1 Priority', priorityTier: 1,
    source: 'US Census Bureau / Silicon Valley Leadership Group', researchDate: '2026-Q1',
    commercialProfile: 'Capital of Silicon Valley. Unrivaled concentration of engineering talent and tech enterprises demanding bleeding-edge web applications, technical SEO architectures, and AI automation.',
    remoteDeliveryFit: 'Exceptional - Birthplace of remote agile methodologies and collaborative cloud development.'
  },
  {
    state: 'North Carolina', stateCode: 'NC', stateSlug: 'north-carolina',
    city: 'Charlotte', citySlug: 'charlotte',
    county: 'Mecklenburg County',
    metroArea: 'Charlotte-Concord-Gastonia Metro Area',
    population: 897720, populationYear: '2023 US Census Bureau Estimate',
    majorIndustries: 'Banking & Financial Services (Bank of America HQ), Energy Tech (Duke Energy), Fintech, Transportation & Logistics, Healthcare',
    digitalDemandTier: 'Tier 1 Priority', priorityTier: 1,
    source: 'US Census Bureau / Charlotte Regional Business Alliance', researchDate: '2026-Q1',
    commercialProfile: 'Second-largest banking center in the United States after NYC. Rapidly diversifying into fintech, commercial construction, and regional corporate hubs with high agency marketing budgets.',
    remoteDeliveryFit: 'High - Eastern Time Zone, corporate procurement standards.'
  },
  {
    state: 'Indiana', stateCode: 'IN', stateSlug: 'indiana',
    city: 'Indianapolis', citySlug: 'indianapolis',
    county: 'Marion County',
    metroArea: 'Indianapolis-Carmel-Anderson Metro Area',
    population: 879293, populationYear: '2023 US Census Bureau Estimate',
    majorIndustries: 'Life Sciences & Pharma (Eli Lilly), Logistics & Distribution, Sports Entertainment, AgTech, Advanced Manufacturing',
    digitalDemandTier: 'Tier 1 Priority', priorityTier: 1,
    source: 'US Census Bureau / Indy Chamber', researchDate: '2026-Q1',
    commercialProfile: 'The Crossroads of America. Huge logistics clusters and premier life sciences headquarters requiring robust e-commerce, B2B lead funnels, and marketing automation.',
    remoteDeliveryFit: 'High - Eastern Time Zone, pragmatic business culture.'
  },
  {
    state: 'California', stateCode: 'CA', stateSlug: 'california',
    city: 'San Francisco', citySlug: 'san-francisco',
    county: 'San Francisco County',
    metroArea: 'San Francisco-Oakland-Berkeley Metro Area (Bay Area)',
    population: 808437, populationYear: '2023 US Census Bureau Estimate',
    majorIndustries: 'Generative AI & LLMs, Fintech, Venture Capital, Biotechnology, Digital Media, Software-as-a-Service',
    digitalDemandTier: 'Tier 1 Priority', priorityTier: 1,
    source: 'US Census Bureau / SF Chamber of Commerce', researchDate: '2026-Q1',
    commercialProfile: 'The global epicenter of the current AI revolution. Intense demand for AI agent workflows, modern React/TypeScript web apps, and high-authority search marketing.',
    remoteDeliveryFit: 'Exceptional - Highest concentration of distributed and remote-native companies in the world.'
  },
  {
    state: 'Washington', stateCode: 'WA', stateSlug: 'washington',
    city: 'Seattle', citySlug: 'seattle',
    county: 'King County',
    metroArea: 'Seattle-Tacoma-Bellevue Metro Area (Puget Sound)',
    population: 755078, populationYear: '2023 US Census Bureau Estimate',
    majorIndustries: 'Cloud Computing (Amazon AWS, Microsoft), Global E-commerce, Aerospace (Boeing), Global Health (Gates Foundation), Clean Tech',
    digitalDemandTier: 'Tier 1 Priority', priorityTier: 1,
    source: 'US Census Bureau / Greater Seattle Partners', researchDate: '2026-Q1',
    commercialProfile: 'Cloud capital of the world. Massive technology and DTC brand base with high standards for technical performance, page speed optimization, and data-driven PPC marketing.',
    remoteDeliveryFit: 'Exceptional - Remote-first engineering hub with high reliance on skilled specialized vendors.'
  },
  {
    state: 'Colorado', stateCode: 'CO', stateSlug: 'colorado',
    city: 'Denver', citySlug: 'denver',
    county: 'Denver County',
    metroArea: 'Denver-Aurora-Lakewood Metro Area (Front Range)',
    population: 716577, populationYear: '2023 US Census Bureau Estimate',
    majorIndustries: 'Aerospace & Defense, Technology & Startups, Renewable Energy, Bioscience, Outdoor Apparel, Financial Technology',
    digitalDemandTier: 'Tier 1 Priority', priorityTier: 1,
    source: 'US Census Bureau / Metro Denver EDC', researchDate: '2026-Q1',
    commercialProfile: 'Fastest-growing tech and lifestyle economy in the Rocky Mountain region. Strong base of scaling B2B SaaS companies, outdoor lifestyle e-commerce, and aerospace sub-contractors.',
    remoteDeliveryFit: 'High - Mountain Time Zone, highly digitized remote workforce.'
  },
  {
    state: 'District of Columbia', stateCode: 'DC', stateSlug: 'district-of-columbia',
    city: 'Washington DC', citySlug: 'washington-dc',
    county: 'District of Columbia',
    metroArea: 'Washington-Arlington-Alexandria Metro Area (DMV)',
    population: 678972, populationYear: '2023 US Census Bureau Estimate',
    majorIndustries: 'Federal Technology Contracting, Cybersecurity, Legal & Government Relations, Higher Education, Nonprofits & Associations',
    digitalDemandTier: 'Tier 1 Priority', priorityTier: 1,
    source: 'US Census Bureau / Washington DC EDC', researchDate: '2026-Q1',
    commercialProfile: 'National capital with unmatched concentration of national industry associations, federal IT contractors, and international NGOs requiring high-security web architecture and thought leadership SEO.',
    remoteDeliveryFit: 'High - Standard Eastern Time, high reliance on vetted external agency teams.'
  },
  {
    state: 'Tennessee', stateCode: 'TN', stateSlug: 'tennessee',
    city: 'Nashville', citySlug: 'nashville',
    county: 'Davidson County',
    metroArea: 'Nashville-Davidson-Murfreesboro-Franklin Metro Area',
    population: 687788, populationYear: '2023 US Census Bureau Estimate',
    majorIndustries: 'Healthcare Management & Hospitals, Music & Entertainment, Tourism & Hospitality, Automotive (Nissan, GM), Tech & Logistics',
    digitalDemandTier: 'Tier 1 Priority', priorityTier: 1,
    source: 'US Census Bureau / Nashville Area Chamber of Commerce', researchDate: '2026-Q1',
    commercialProfile: 'Healthcare management capital of the United States (HCA, Envision, LifePoint). Rapidly growing corporate tech and creative agency market with intense digital marketing demand.',
    remoteDeliveryFit: 'High - Central Time Zone, dynamic southern business growth.'
  },
  {
    state: 'Massachusetts', stateCode: 'MA', stateSlug: 'massachusetts',
    city: 'Boston', citySlug: 'boston',
    county: 'Suffolk County',
    metroArea: 'Boston-Cambridge-Newton Metro Area',
    population: 653833, populationYear: '2023 US Census Bureau Estimate',
    majorIndustries: 'Biotechnology & Pharmaceuticals, Higher Education (Harvard, MIT), Robotics & AI, Financial Services, Healthcare',
    digitalDemandTier: 'Tier 1 Priority', priorityTier: 1,
    source: 'US Census Bureau / Greater Boston Chamber of Commerce', researchDate: '2026-Q1',
    commercialProfile: 'Global capital of life sciences and university-incubated deep tech. Companies demand sophisticated scientific web design, high-authority content, and enterprise marketing automation.',
    remoteDeliveryFit: 'High - Eastern Time Zone, elite academic and technology networks.'
  },
  {
    state: 'Nevada', stateCode: 'NV', stateSlug: 'nevada',
    city: 'Las Vegas', citySlug: 'las-vegas',
    county: 'Clark County',
    metroArea: 'Las Vegas-Henderson-North Las Vegas Metro Area',
    population: 661115, populationYear: '2023 US Census Bureau Estimate',
    majorIndustries: 'Hospitality & Gaming, Conventions & Events, Construction, Health Services, Clean Energy, Sports Entertainment',
    digitalDemandTier: 'Tier 1 Priority', priorityTier: 1,
    source: 'US Census Bureau / Las Vegas Global Economic Alliance', researchDate: '2026-Q1',
    commercialProfile: 'World capital of entertainment and major trade conventions. Expanding corporate base seeking conversion-optimized landing pages, local map rankings, and aggressive paid ad strategies.',
    remoteDeliveryFit: 'High - Pacific Time Zone, 24/7 business ecosystem.'
  },
  {
    state: 'Oregon', stateCode: 'OR', stateSlug: 'oregon',
    city: 'Portland', citySlug: 'portland',
    county: 'Multnomah County',
    metroArea: 'Portland-Vancouver-Hillsboro Metro Area',
    population: 630498, populationYear: '2023 US Census Bureau Estimate',
    majorIndustries: 'Semiconductor Fabrication (Silicon Forest), Athletic Footwear & Apparel (Nike HQ nearby), Clean Tech, Software, Specialty Food & Beverage',
    digitalDemandTier: 'Tier 1 Priority', priorityTier: 1,
    source: 'US Census Bureau / Greater Portland Inc', researchDate: '2026-Q1',
    commercialProfile: 'Distinctive creative and semiconductor center. High demand for custom Shopify e-commerce, brand storytelling, and technical search engine optimization.',
    remoteDeliveryFit: 'High - Pacific Time Zone, values-driven independent commercial sector.'
  },
  {
    state: 'Florida', stateCode: 'FL', stateSlug: 'florida',
    city: 'Miami', citySlug: 'miami',
    county: 'Miami-Dade County',
    metroArea: 'Miami-Fort Lauderdale-Pompano Beach Metro Area (South Florida)',
    population: 455924, populationYear: '2023 US Census Bureau Estimate',
    majorIndustries: 'Fintech & Web3, Real Estate Development, International Banking, Tourism & Luxury Hospitality, Healthcare, Aviation',
    digitalDemandTier: 'Tier 1 Priority', priorityTier: 1,
    source: 'US Census Bureau / Miami-Dade Beacon Council', researchDate: '2026-Q1',
    commercialProfile: 'Gateway to the Americas and booming financial migration hub. High-net-worth real estate brokerages, fintech firms, and luxury lifestyle brands invest aggressively in modern digital design.',
    remoteDeliveryFit: 'High - Eastern Time Zone, international perspective.'
  },
  {
    state: 'Georgia', stateCode: 'GA', stateSlug: 'georgia',
    city: 'Atlanta', citySlug: 'atlanta',
    county: 'Fulton County',
    metroArea: 'Atlanta-Sandy Springs-Alpharetta Metro Area',
    population: 499127, populationYear: '2023 US Census Bureau Estimate',
    majorIndustries: 'Financial Technology (Transaction Alley), Film & Television, Logistics & Air Transport (Delta HQ), Healthcare, Software Startups',
    digitalDemandTier: 'Tier 1 Priority', priorityTier: 1,
    source: 'US Census Bureau / Metro Atlanta Chamber', researchDate: '2026-Q1',
    commercialProfile: 'Major economic powerhouse of the American Southeast. Home to Transaction Alley, processing 70% of US debit/credit transactions, creating deep demand for secure web development and B2B growth marketing.',
    remoteDeliveryFit: 'High - Eastern Time Zone, massive diverse corporate market.'
  },
  {
    state: 'North Carolina', stateCode: 'NC', stateSlug: 'north-carolina',
    city: 'Raleigh', citySlug: 'raleigh',
    county: 'Wake County',
    metroArea: 'Raleigh-Cary Metro Area (Research Triangle)',
    population: 476587, populationYear: '2023 US Census Bureau Estimate',
    majorIndustries: 'Life Sciences & Biotech, Enterprise Software, Clean Tech, Advanced Medical Centers, Higher Education',
    digitalDemandTier: 'Tier 1 Priority', priorityTier: 1,
    source: 'US Census Bureau / Wake County Economic Development', researchDate: '2026-Q1',
    commercialProfile: 'Anchor of the famed Research Triangle Park. Rapidly expanding tech workforce and biotech startups with high demand for scientific web design, SaaS landing pages, and inbound SEO.',
    remoteDeliveryFit: 'High - Eastern Time Zone, tech-native community.'
  },
  {
    state: 'Florida', stateCode: 'FL', stateSlug: 'florida',
    city: 'Tampa', citySlug: 'tampa',
    county: 'Hillsborough County',
    metroArea: 'Tampa-St. Petersburg-Clearwater Metro Area (Tampa Bay)',
    population: 403364, populationYear: '2023 US Census Bureau Estimate',
    majorIndustries: 'Financial Technology & Shared Services, Healthcare & Biotech, Defense & Security (MacDill AFB), Tourism, Real Estate',
    digitalDemandTier: 'Tier 1 Priority', priorityTier: 1,
    source: 'US Census Bureau / Tampa Bay Economic Development Council', researchDate: '2026-Q1',
    commercialProfile: 'Tampa Bay is experiencing phenomenal business influx. High concentration of financial firms, medical clinics, and B2B service providers seeking Google Maps 3-Pack rankings and custom web solutions.',
    remoteDeliveryFit: 'High - Eastern Time Zone, business migration favorite.'
  },
  {
    state: 'Florida', stateCode: 'FL', stateSlug: 'florida',
    city: 'Orlando', citySlug: 'orlando',
    county: 'Orange County',
    metroArea: 'Orlando-Kissimmee-Sanford Metro Area',
    population: 320742, populationYear: '2023 US Census Bureau Estimate',
    majorIndustries: 'Theme Parks & Hospitality, Simulation & Defense Training, Aviation & Aerospace, Medical City Lake Nona, Digital Media',
    digitalDemandTier: 'Tier 1 Priority', priorityTier: 1,
    source: 'US Census Bureau / Orlando Economic Partnership', researchDate: '2026-Q1',
    commercialProfile: 'Beyond world-class tourism, Orlando is the national capital of military modeling, simulation, and training tech. Massive commercial market for lead gen, medical practice SEO, and interactive portals.',
    remoteDeliveryFit: 'High - Eastern Time Zone, high tech integration.'
  },
  {
    state: 'Minnesota', stateCode: 'MN', stateSlug: 'minnesota',
    city: 'Minneapolis', citySlug: 'minneapolis',
    county: 'Hennepin County',
    metroArea: 'Minneapolis-St. Paul-Bloomington Metro Area (Twin Cities)',
    population: 425115, populationYear: '2023 US Census Bureau Estimate',
    majorIndustries: 'Retail & Consumer Brands (Target HQ, Best Buy), Medical Technology (Medtronic), Financial Services, Agribusiness, Food Science',
    digitalDemandTier: 'Tier 1 Priority', priorityTier: 1,
    source: 'US Census Bureau / GREATER MSP', researchDate: '2026-Q1',
    commercialProfile: 'High density of Fortune 500 corporate headquarters per capita. Exceptional market for enterprise website engineering, Shopify Plus e-commerce, and high-performance search marketing.',
    remoteDeliveryFit: 'High - Central Time Zone, highly educated workforce.'
  },
  {
    state: 'Michigan', stateCode: 'MI', stateSlug: 'michigan',
    city: 'Detroit', citySlug: 'detroit',
    county: 'Wayne County',
    metroArea: 'Detroit-Warren-Dearborn Metro Area (Metro Detroit)',
    population: 633218, populationYear: '2023 US Census Bureau Estimate',
    majorIndustries: 'Automotive Engineering & EV, Industrial Robotics & Automation, Fintech (Rocket Companies), Defense Tech, Health Care',
    digitalDemandTier: 'Tier 1 Priority', priorityTier: 1,
    source: 'US Census Bureau / Detroit Regional Chamber', researchDate: '2026-Q1',
    commercialProfile: 'Automotive and industrial robotics capital reinventing itself through electric vehicles, autonomous software, and mortgage fintech. Substantial demand for B2B industrial SEO and automation systems.',
    remoteDeliveryFit: 'High - Eastern Time Zone, industrial automation mindset.'
  },
  {
    state: 'Maryland', stateCode: 'MD', stateSlug: 'maryland',
    city: 'Baltimore', citySlug: 'baltimore',
    county: 'Baltimore City',
    metroArea: 'Baltimore-Columbia-Towson Metro Area',
    population: 569931, populationYear: '2023 US Census Bureau Estimate',
    majorIndustries: 'Healthcare & Life Sciences (Johns Hopkins), Cybersecurity & Defense, Deepwater Shipping Port, Financial Services (T. Rowe Price), Higher Education',
    digitalDemandTier: 'Tier 1 Priority', priorityTier: 1,
    source: 'US Census Bureau / Economic Alliance of Greater Baltimore', researchDate: '2026-Q1',
    commercialProfile: 'Historic port city anchored by world-renowned academic medical centers and cybersecurity contractors. Strong market for HIPAA web applications and professional services marketing.',
    remoteDeliveryFit: 'High - Eastern Time Zone, close federal ties.'
  },
  {
    state: 'Utah', stateCode: 'UT', stateSlug: 'utah',
    city: 'Salt Lake City', citySlug: 'salt-lake-city',
    county: 'Salt Lake County',
    metroArea: 'Salt Lake City-Provo-Orem Metro Area (Silicon Slopes)',
    population: 209593, populationYear: '2023 US Census Bureau Estimate',
    majorIndustries: 'Software & Cloud Technology (Silicon Slopes), Outdoor Recreation Gear, Financial Services & Industrial Banks, Biomedical Devices, Aerospace',
    digitalDemandTier: 'Tier 1 Priority', priorityTier: 1,
    source: 'US Census Bureau / Economic Development Corporation of Utah', researchDate: '2026-Q1',
    commercialProfile: 'Heart of the Silicon Slopes tech corridor with dozens of high-valuation software unicorns (Qualtrics, Domo, Pluralsight). High willingness to invest in top-tier web design and organic search.',
    remoteDeliveryFit: 'Exceptional - Mountain Time Zone, pioneer of remote-friendly SaaS scaling.'
  },
  {
    state: 'Missouri', stateCode: 'MO', stateSlug: 'missouri',
    city: 'Kansas City', citySlug: 'kansas-city',
    county: 'Jackson / Clay / Platte / Cass',
    metroArea: 'Kansas City Metro Area',
    population: 510704, populationYear: '2023 US Census Bureau Estimate',
    majorIndustries: 'Animal Health Science, Transportation & Rail Logistics, Architecture & Engineering (Burns & McDonnell), Financial Services, AgTech',
    digitalDemandTier: 'Tier 1 Priority', priorityTier: 1,
    source: 'US Census Bureau / Kansas City Area Development Council', researchDate: '2026-Q1',
    commercialProfile: 'Center of the Animal Health Corridor representing 56% of global animal health revenue. Central logistics hub with expanding tech and engineering service firms needing digital presence.',
    remoteDeliveryFit: 'High - Central Time Zone, Midwestern partnership approach.'
  },
  {
    state: 'Missouri', stateCode: 'MO', stateSlug: 'missouri',
    city: 'St. Louis', citySlug: 'st-louis',
    county: 'St. Louis City',
    metroArea: 'St. Louis Metro Area (Greater St. Louis)',
    population: 281754, populationYear: '2023 US Census Bureau Estimate',
    majorIndustries: 'Plant Science & Agriculture (Donald Danforth Plant Science Center), Aerospace & Defense (Boeing Defense), Geospatial Tech (NGA West), Financial Services, Healthcare',
    digitalDemandTier: 'Tier 1 Priority', priorityTier: 1,
    source: 'US Census Bureau / Greater St. Louis, Inc.', researchDate: '2026-Q1',
    commercialProfile: 'National hub for geospatial intelligence, agtech, and corporate healthcare management. Major market for technical SEO, custom web application development, and B2B lead generation.',
    remoteDeliveryFit: 'High - Central Time Zone, research-driven business environment.'
  },
  {
    state: 'Pennsylvania', stateCode: 'PA', stateSlug: 'pennsylvania',
    city: 'Pittsburgh', citySlug: 'pittsburgh',
    county: 'Allegheny County',
    metroArea: 'Pittsburgh Metro Area',
    population: 303255, populationYear: '2023 US Census Bureau Estimate',
    majorIndustries: 'Robotics & Autonomous Systems (Robotics Row), Artificial Intelligence (Carnegie Mellon), Healthcare (UPMC), Advanced Materials, Energy',
    digitalDemandTier: 'Tier 1 Priority', priorityTier: 1,
    source: 'US Census Bureau / Pittsburgh Regional Alliance', researchDate: '2026-Q1',
    commercialProfile: 'The Robotics Capital of the World, fueled by Carnegie Mellon University. Extraordinary concentration of AI, autonomous vehicle, and robotic technology firms seeking modern marketing solutions.',
    remoteDeliveryFit: 'High - Eastern Time Zone, highly aligned with robotics and AI automation capabilities.'
  },
  {
    state: 'Ohio', stateCode: 'OH', stateSlug: 'ohio',
    city: 'Columbus', citySlug: 'columbus',
    county: 'Franklin County',
    metroArea: 'Columbus Metro Area',
    population: 907971, populationYear: '2023 US Census Bureau Estimate',
    majorIndustries: 'Semiconductors (Intel Silicon Heartland), Retail Brand HQs, Financial Services (Nationwide), Healthcare & Research, Logistics & Distribution',
    digitalDemandTier: 'Tier 1 Priority', priorityTier: 1,
    source: 'US Census Bureau / One Columbus', researchDate: '2026-Q1',
    commercialProfile: 'Fastest-growing metro in the Midwest, transforming into the Silicon Heartland with Intel’s multi-billion dollar semiconductor mega-fab. High demand for digital infrastructure and agency marketing.',
    remoteDeliveryFit: 'High - Eastern Time Zone, robust commercial growth.'
  },
  {
    state: 'Ohio', stateCode: 'OH', stateSlug: 'ohio',
    city: 'Cincinnati', citySlug: 'cincinnati',
    county: 'Hamilton County',
    metroArea: 'Cincinnati-Middletown Metro Area (Greater Cincinnati)',
    population: 309513, populationYear: '2023 US Census Bureau Estimate',
    majorIndustries: 'Consumer Packaged Goods (Procter & Gamble HQ), Retail Tech (Kroger HQ), Aerospace (GE Aerospace), Logistics & Air Cargo (Amazon Air Hub)',
    digitalDemandTier: 'Tier 1 Priority', priorityTier: 1,
    source: 'US Census Bureau / REDI Cincinnati', researchDate: '2026-Q1',
    commercialProfile: 'Global capital of brand marketing and consumer goods packaging. Demands high visual polish, conversion rate optimization, and sophisticated e-commerce web applications.',
    remoteDeliveryFit: 'High - Eastern Time Zone, marketing-savvy leadership.'
  },
  {
    state: 'Ohio', stateCode: 'OH', stateSlug: 'ohio',
    city: 'Cleveland', citySlug: 'cleveland',
    county: 'Cuyahoga County',
    metroArea: 'Cleveland-Elyria Metro Area (Greater Cleveland)',
    population: 362656, populationYear: '2023 US Census Bureau Estimate',
    majorIndustries: 'World-Class Healthcare (Cleveland Clinic), Biomedical Technology, Advanced Manufacturing, Polymers & Coatings, Financial Services (KeyBank)',
    digitalDemandTier: 'Tier 1 Priority', priorityTier: 1,
    source: 'US Census Bureau / Team NEO', researchDate: '2026-Q1',
    commercialProfile: 'Anchored by the world-famous Cleveland Clinic health system and a strong industrial manufacturing legacy. Excellent market for medical website design, B2B manufacturing SEO, and lead automation.',
    remoteDeliveryFit: 'High - Eastern Time Zone, practical commercial focus.'
  },
  {
    state: 'California', stateCode: 'CA', stateSlug: 'california',
    city: 'Sacramento', citySlug: 'sacramento',
    county: 'Sacramento County',
    metroArea: 'Sacramento-Roseville-Arden-Arcade Metro Area',
    population: 526495, populationYear: '2023 US Census Bureau Estimate',
    majorIndustries: 'Government & Public Policy, Clean Technology, Healthcare & Medical Centers, Agriculture & Food Processing, Construction',
    digitalDemandTier: 'Tier 1 Priority', priorityTier: 1,
    source: 'US Census Bureau / Greater Sacramento Economic Council', researchDate: '2026-Q1',
    commercialProfile: 'Capital city of California with an expanding spillover of tech workers and startups from the San Francisco Bay Area. Substantial market for public sector IT solutions and local service businesses.',
    remoteDeliveryFit: 'High - Pacific Time Zone, accessible to entire West Coast.'
  },
  {
    state: 'Texas', stateCode: 'TX', stateSlug: 'texas',
    city: 'Fort Worth', citySlug: 'fort-worth',
    county: 'Tarrant County',
    metroArea: 'Dallas-Fort Worth-Arlington Metro Area',
    population: 978468, populationYear: '2023 US Census Bureau Estimate',
    majorIndustries: 'Aerospace & Defense (Lockheed Martin F-35), Transportation & Rail (BNSF Railway HQ), Manufacturing, Agribusiness, Tourism & Culture',
    digitalDemandTier: 'Tier 1 Priority', priorityTier: 1,
    source: 'US Census Bureau / Fort Worth Chamber', researchDate: '2026-Q1',
    commercialProfile: 'One of the fastest-growing large cities in the US. Massive industrial manufacturing, defense contracting, and commercial services with strong demand for B2B digital visibility.',
    remoteDeliveryFit: 'High - Central Time Zone, pragmatic Texas business environment.'
  },
  {
    state: 'Louisiana', stateCode: 'LA', stateSlug: 'louisiana',
    city: 'New Orleans', citySlug: 'new-orleans',
    county: 'Orleans Parish',
    metroArea: 'New Orleans-Metairie Metro Area',
    population: 369749, populationYear: '2023 US Census Bureau Estimate',
    majorIndustries: 'Tourism & Hospitality, Maritime Trade & Port, Energy & Offshore Wind, Digital Media & Film Production, Healthcare',
    digitalDemandTier: 'Tier 1 Priority', priorityTier: 1,
    source: 'US Census Bureau / GNO, Inc.', researchDate: '2026-Q1',
    commercialProfile: 'Vibrant cultural and shipping center with growing tech incentive programs and digital media companies. High demand for hospitality web design, local SEO, and tourism marketing.',
    remoteDeliveryFit: 'High - Central Time Zone, creative mindset.'
  },
  {
    state: 'Virginia', stateCode: 'VA', stateSlug: 'virginia',
    city: 'Richmond', citySlug: 'richmond',
    county: 'Richmond City / Henrico / Chesterfield',
    metroArea: 'Richmond Metro Area',
    population: 229395, populationYear: '2023 US Census Bureau Estimate',
    majorIndustries: 'Financial Technology (Capital One), Pharmaceuticals & Life Sciences, State Government, Advertising Agencies, Advanced Manufacturing',
    digitalDemandTier: 'Tier 1 Priority', priorityTier: 1,
    source: 'US Census Bureau / Greater Richmond Partnership', researchDate: '2026-Q1',
    commercialProfile: 'Historic capital of Virginia with a highly educated financial services and ad agency ecosystem. Strong demand for sophisticated web development and strategic digital advertising.',
    remoteDeliveryFit: 'High - Eastern Time Zone, sophisticated corporate market.'
  },
  {
    state: 'Oklahoma', stateCode: 'OK', stateSlug: 'oklahoma',
    city: 'Oklahoma City', citySlug: 'oklahoma-city',
    county: 'Oklahoma County',
    metroArea: 'Oklahoma City Metro Area',
    population: 702767, populationYear: '2023 US Census Bureau Estimate',
    majorIndustries: 'Energy & Natural Gas, Aerospace & Aviation (Tinker AFB), Biotechnology, Logistics, Agriculture',
    digitalDemandTier: 'Tier 1 Priority', priorityTier: 1,
    source: 'US Census Bureau / Greater Oklahoma City Chamber', researchDate: '2026-Q1',
    commercialProfile: 'Growing Southwest business capital with low business costs and a vibrant downtown innovation district. Strong demand for industrial service SEO and business automation.',
    remoteDeliveryFit: 'High - Central Time Zone, steady economic expansion.'
  },
  {
    state: 'Nebraska', stateCode: 'NE', stateSlug: 'nebraska',
    city: 'Omaha', citySlug: 'omaha',
    county: 'Douglas County',
    metroArea: 'Omaha-Council Bluffs Metro Area',
    population: 483335, populationYear: '2023 US Census Bureau Estimate',
    majorIndustries: 'Corporate Finance & Insurance (Berkshire Hathaway, Mutual of Omaha), Rail Freight (Union Pacific), Food Processing, Agritech',
    digitalDemandTier: 'Tier 1 Priority', priorityTier: 1,
    source: 'US Census Bureau / Greater Omaha Chamber', researchDate: '2026-Q1',
    commercialProfile: 'Silicon Prairie anchor boasting four Fortune 500 headquarters. Stable corporate economy with substantial budgets for reliable web platforms, secure CMS, and enterprise search marketing.',
    remoteDeliveryFit: 'High - Central Time Zone, long-term corporate partnership culture.'
  },
  {
    state: 'New Mexico', stateCode: 'NM', stateSlug: 'new-mexico',
    city: 'Albuquerque', citySlug: 'albuquerque',
    county: 'Bernalillo County',
    metroArea: 'Albuquerque Metro Area',
    population: 560274, populationYear: '2023 US Census Bureau Estimate',
    majorIndustries: 'Aerospace & Space Technology, National Laboratories (Sandia), Film & Television (Netflix Studios), Optics & Photonics, Renewable Energy',
    digitalDemandTier: 'Tier 1 Priority', priorityTier: 1,
    source: 'US Census Bureau / Albuquerque Regional Economic Alliance', researchDate: '2026-Q1',
    commercialProfile: 'High-tech and film production hub in the Southwest. Demands for clean digital portfolio systems, technical B2B search visibility, and localized marketing for regional service leaders.',
    remoteDeliveryFit: 'High - Mountain Time Zone, growing innovation community.'
  },
  {
    state: 'Idaho', stateCode: 'ID', stateSlug: 'idaho',
    city: 'Boise', citySlug: 'boise',
    county: 'Ada County',
    metroArea: 'Boise City-Nampa Metro Area (Treasure Valley)',
    population: 235689, populationYear: '2023 US Census Bureau Estimate',
    majorIndustries: 'Semiconductors (Micron Technology HQ), Cloud Technology, Construction & Real Estate, Agriculture & Agribusiness, Outdoor Recreation',
    digitalDemandTier: 'Tier 1 Priority', priorityTier: 1,
    source: 'US Census Bureau / Boise Valley Economic Partnership', researchDate: '2026-Q1',
    commercialProfile: 'One of the fastest-growing small-to-midsize metros in the Pacific Northwest. Rapid business migration from California creating intense competition in local search rankings and custom web design.',
    remoteDeliveryFit: 'High - Mountain Time Zone, thriving modern business community.'
  },
  {
    state: 'Colorado', stateCode: 'CO', stateSlug: 'colorado',
    city: 'Colorado Springs', citySlug: 'colorado-springs',
    county: 'El Paso County',
    metroArea: 'Colorado Springs Metro Area',
    population: 488664, populationYear: '2023 US Census Bureau Estimate',
    majorIndustries: 'Aerospace & Space Defense (US Space Command), Cybersecurity, Medical Devices, Tourism, Higher Education',
    digitalDemandTier: 'Tier 1 Priority', priorityTier: 1,
    source: 'US Census Bureau / Colorado Springs Chamber & EDC', researchDate: '2026-Q1',
    commercialProfile: 'Olympic City USA and national epicenter for national security space operations. Excellent market for aerospace contractor sites, local service SEO, and secure B2B marketing funnels.',
    remoteDeliveryFit: 'High - Mountain Time Zone, tech-literate community.'
  },
  {
    state: 'South Carolina', stateCode: 'SC', stateSlug: 'south-carolina',
    city: 'Charleston', citySlug: 'charleston',
    county: 'Charleston / Berkeley / Dorchester',
    metroArea: 'Charleston-North Charleston Metro Area (Silicon Harbor)',
    population: 153672, populationYear: '2023 US Census Bureau Estimate',
    majorIndustries: 'Aerospace Assembly (Boeing 787), Automotive (Volvo), Deepwater Port Logistics, Silicon Harbor Tech Startups, Tourism & Hospitality',
    digitalDemandTier: 'Tier 1 Priority', priorityTier: 1,
    source: 'US Census Bureau / Charleston Regional Development Alliance', researchDate: '2026-Q1',
    commercialProfile: 'Silicon Harbor combines historic coastal charm with high-tech manufacturing and venture-backed SaaS startups. Outstanding demand for high-end boutique web design and inbound SEO.',
    remoteDeliveryFit: 'High - Eastern Time Zone, receptive to premium remote talent.'
  },
  {
    state: 'Rhode Island', stateCode: 'RI', stateSlug: 'rhode-island',
    city: 'Providence', citySlug: 'providence',
    county: 'Providence County',
    metroArea: 'Providence-Warwick Metro Area',
    population: 190792, populationYear: '2023 US Census Bureau Estimate',
    majorIndustries: 'Higher Education & Design (RISD, Brown), Healthcare Systems, Maritime Blue Economy, Undersea Robotics, Tourism',
    digitalDemandTier: 'Tier 1 Priority', priorityTier: 1,
    source: 'US Census Bureau / Greater Providence Chamber', researchDate: '2026-Q1',
    commercialProfile: 'Creative Capital with world-leading industrial design and academic healthcare centers. Values aesthetic excellence, sophisticated typography, and conversion-focused web architecture.',
    remoteDeliveryFit: 'High - Eastern Time Zone, design-conscious clients.'
  },
  {
    state: 'Connecticut', stateCode: 'CT', stateSlug: 'connecticut',
    city: 'Hartford', citySlug: 'hartford',
    county: 'Hartford County',
    metroArea: 'Hartford-East Hartford-Middletown Metro Area',
    population: 120686, populationYear: '2023 US Census Bureau Estimate',
    majorIndustries: 'Insurance & Insurtech, Healthcare Systems, Aerospace & Jet Engine Manufacturing (Pratt & Whitney), Higher Education',
    digitalDemandTier: 'Tier 1 Priority', priorityTier: 1,
    source: 'US Census Bureau / MetroHartford Alliance', researchDate: '2026-Q1',
    commercialProfile: 'Insurance Capital of the World with major corporate risk and underwriting headquarters. Ongoing digital transformation initiatives create strong demand for automated workflows and enterprise portals.',
    remoteDeliveryFit: 'High - Eastern Time Zone, high corporate compliance standards.'
  },
  {
    state: 'New York', stateCode: 'NY', stateSlug: 'new-york',
    city: 'Buffalo', citySlug: 'buffalo',
    county: 'Erie County',
    metroArea: 'Buffalo-Cheektowaga Metro Area',
    population: 274678, populationYear: '2023 US Census Bureau Estimate',
    majorIndustries: 'Advanced Manufacturing, Clean Energy (Niagara Falls Hydro), Healthcare & Cancer Research, Financial Services (M&T Bank HQ), Cross-Border Trade',
    digitalDemandTier: 'Tier 1 Priority', priorityTier: 1,
    source: 'US Census Bureau / Invest Buffalo Niagara', researchDate: '2026-Q1',
    commercialProfile: 'Re-emerging industrial and medical tech hub on Lake Erie. Dense base of regional manufacturers and cross-border commercial service providers seeking modern online customer acquisition.',
    remoteDeliveryFit: 'High - Eastern Time Zone, hardworking business culture.'
  },
  {
    state: 'New York', stateCode: 'NY', stateSlug: 'new-york',
    city: 'Rochester', citySlug: 'rochester',
    county: 'Monroe County',
    metroArea: 'Rochester Metro Area',
    population: 209352, populationYear: '2023 US Census Bureau Estimate',
    majorIndustries: 'Optics, Photonics & Imaging, Healthcare & Medical Centers, Food & Beverage Production, Higher Education (RIT, U of R)',
    digitalDemandTier: 'Tier 1 Priority', priorityTier: 1,
    source: 'US Census Bureau / Greater Rochester Enterprise', researchDate: '2026-Q1',
    commercialProfile: 'Optics and imaging capital of North America. High density of precision optics engineering firms and university spin-outs seeking specialized B2B SEO and technical web development.',
    remoteDeliveryFit: 'High - Eastern Time Zone, research and technical focus.'
  },
  {
    state: 'Kentucky', stateCode: 'KY', stateSlug: 'kentucky',
    city: 'Louisville', citySlug: 'louisville',
    county: 'Jefferson County',
    metroArea: 'Louisville/Jefferson County Metro Area',
    population: 624444, populationYear: '2023 US Census Bureau Estimate',
    majorIndustries: 'Global Air Cargo Logistics (UPS Worldport), Bourbon Distilling & Tourism, Healthcare & Health Insurance (Humana HQ), Manufacturing',
    digitalDemandTier: 'Tier 1 Priority', priorityTier: 1,
    source: 'US Census Bureau / Greater Louisville Inc.', researchDate: '2026-Q1',
    commercialProfile: 'World logistics crossroads anchored by the largest automated package handling facility in the world. High demand for freight e-commerce, healthcare portal maintenance, and regional lead generation.',
    remoteDeliveryFit: 'High - Eastern Time Zone, supply chain and logistics oriented.'
  },
  {
    state: 'Wisconsin', stateCode: 'WI', stateSlug: 'wisconsin',
    city: 'Milwaukee', citySlug: 'milwaukee',
    county: 'Milwaukee County',
    metroArea: 'Milwaukee-Waukesha Metro Area',
    population: 561333, populationYear: '2023 US Census Bureau Estimate',
    majorIndustries: 'Industrial Automation (Rockwell Automation HQ), Financial Services & FinTech (Northwestern Mutual), Healthcare, Water Technology, Brewing',
    digitalDemandTier: 'Tier 1 Priority', priorityTier: 1,
    source: 'US Census Bureau / Milwaukee 7 Regional Economic Development', researchDate: '2026-Q1',
    commercialProfile: 'Global water tech and industrial automation capital. Established corporate base seeking modern front-end interfaces, B2B digital sales funnels, and technical SEO campaigns.',
    remoteDeliveryFit: 'High - Central Time Zone, practical industrial focus.'
  },
  {
    state: 'Wisconsin', stateCode: 'WI', stateSlug: 'wisconsin',
    city: 'Madison', citySlug: 'madison',
    county: 'Dane County',
    metroArea: 'Madison Metro Area',
    population: 272603, populationYear: '2023 US Census Bureau Estimate',
    majorIndustries: 'Healthcare Information Technology (Epic Systems), Biotechnology & Genomics, Software Startups, Higher Education (UW-Madison), AgTech',
    digitalDemandTier: 'Tier 1 Priority', priorityTier: 1,
    source: 'US Census Bureau / Greater Madison Chamber of Commerce', researchDate: '2026-Q1',
    commercialProfile: 'Premier healthcare IT cluster in North America anchored by Epic Systems. High-growth startup scene with deep appreciation for clean software engineering and modern marketing automation.',
    remoteDeliveryFit: 'High - Central Time Zone, highly educated tech community.'
  },
  {
    state: 'Iowa', stateCode: 'IA', stateSlug: 'iowa',
    city: 'Des Moines', citySlug: 'des-moines',
    county: 'Polk County',
    metroArea: 'Des Moines-West Des Moines Metro Area',
    population: 211034, populationYear: '2023 US Census Bureau Estimate',
    majorIndustries: 'Insurance & Financial Services (Principal Financial), Advanced Data Centers, Agribusiness & Food Science, Logistics, Publishing',
    digitalDemandTier: 'Tier 1 Priority', priorityTier: 1,
    source: 'US Census Bureau / Greater Des Moines Partnership', researchDate: '2026-Q1',
    commercialProfile: 'The Insurance Capital of the Western Hemisphere. Exceptionally stable corporate economy investing heavily in secure cloud applications, customer onboarding portals, and automated workflows.',
    remoteDeliveryFit: 'High - Central Time Zone, professional services focus.'
  },
  {
    state: 'Oklahoma', stateCode: 'OK', stateSlug: 'oklahoma',
    city: 'Tulsa', citySlug: 'tulsa',
    county: 'Tulsa County',
    metroArea: 'Tulsa Metro Area',
    population: 411894, populationYear: '2023 US Census Bureau Estimate',
    majorIndustries: 'Aerospace & MRO (American Airlines Maintenance Base), Energy & Clean Tech, Remote Tech Programs (Tulsa Remote), Manufacturing, Healthcare',
    digitalDemandTier: 'Tier 1 Priority', priorityTier: 1,
    source: 'US Census Bureau / Tulsa Regional Chamber', researchDate: '2026-Q1',
    commercialProfile: 'A pioneer in attracting remote technology professionals via Tulsa Remote. High concentration of aerospace engineering and energy service firms seeking digital transformation.',
    remoteDeliveryFit: 'Exceptional - Community specifically built around welcoming remote tech partnerships.'
  },
  {
    state: 'Kansas', stateCode: 'KS', stateSlug: 'kansas',
    city: 'Wichita', citySlug: 'wichita',
    county: 'Sedgwick County',
    metroArea: 'Wichita Metro Area',
    population: 396119, populationYear: '2023 US Census Bureau Estimate',
    majorIndustries: 'Aviation & Aerospace (Textron Aviation, Bombardier, Spirit AeroSystems), Advanced Composites, Healthcare, Agribusiness, Oil & Gas',
    digitalDemandTier: 'Tier 1 Priority', priorityTier: 1,
    source: 'US Census Bureau / Greater Wichita Partnership', researchDate: '2026-Q1',
    commercialProfile: 'Air Capital of the World, producing over 35% of all general aviation aircraft built in the US. Massive precision manufacturing supply chain seeking enterprise B2B websites and industrial SEO.',
    remoteDeliveryFit: 'High - Central Time Zone, manufacturing supply chain focus.'
  },
  {
    state: 'North Carolina', stateCode: 'NC', stateSlug: 'north-carolina',
    city: 'Durham', citySlug: 'durham',
    county: 'Durham County',
    metroArea: 'Durham-Chapel Hill Metro Area (Research Triangle)',
    population: 291942, populationYear: '2023 US Census Bureau Estimate',
    majorIndustries: 'Biotechnology & Pharmaceuticals, Medical Research (Duke University), Software Startups, Clean Tech, Creative Industries',
    digitalDemandTier: 'Tier 1 Priority', priorityTier: 1,
    source: 'US Census Bureau / Greater Durham Chamber', researchDate: '2026-Q1',
    commercialProfile: 'Research Triangle powerhouse with world-class clinical research organizations and venture capital. High demand for scientific landing pages, clinical recruitment funnels, and enterprise SEO.',
    remoteDeliveryFit: 'High - Eastern Time Zone, tech and science focus.'
  },
  {
    state: 'North Carolina', stateCode: 'NC', stateSlug: 'north-carolina',
    city: 'Greensboro', citySlug: 'greensboro',
    county: 'Guilford County',
    metroArea: 'Greensboro-High Point Metro Area (Piedmont Triad)',
    population: 301115, populationYear: '2023 US Census Bureau Estimate',
    majorIndustries: 'Aviation Maintenance & Supersonic (Boom Supersonic), Advanced Logistics, EV Battery Manufacturing (Toyota Mega-site), Textiles, Furnishings',
    digitalDemandTier: 'Tier 1 Priority', priorityTier: 1,
    source: 'US Census Bureau / Greensboro Chamber of Commerce', researchDate: '2026-Q1',
    commercialProfile: 'Piedmont Triad transportation and manufacturing hub experiencing major aerospace and electric battery investments. Growing need for modern industrial marketing and supply chain portals.',
    remoteDeliveryFit: 'High - Eastern Time Zone, industrial revival.'
  },
  {
    state: 'Alabama', stateCode: 'AL', stateSlug: 'alabama',
    city: 'Birmingham', citySlug: 'birmingham',
    county: 'Jefferson County',
    metroArea: 'Birmingham-Hoover Metro Area',
    population: 196910, populationYear: '2023 US Census Bureau Estimate',
    majorIndustries: 'Healthcare & Biomedical Research (UAB), Commercial Banking (Regions Financial), Steel Manufacturing, Technology Startups, Insurance',
    digitalDemandTier: 'Tier 1 Priority', priorityTier: 1,
    source: 'US Census Bureau / Birmingham Business Alliance', researchDate: '2026-Q1',
    commercialProfile: 'Premier medical and commercial banking center of Alabama. Strong demand for healthcare software development, HIPAA compliant forms, and regional commercial lead generation.',
    remoteDeliveryFit: 'High - Central Time Zone, growing innovation district.'
  },
  {
    state: 'Alabama', stateCode: 'AL', stateSlug: 'alabama',
    city: 'Huntsville', citySlug: 'huntsville',
    county: 'Madison County',
    metroArea: 'Huntsville Metro Area (Rocket City)',
    population: 221575, populationYear: '2023 US Census Bureau Estimate',
    majorIndustries: 'Aerospace & Space Exploration (NASA Marshall Space Flight Center), Missile Defense, Cybersecurity, Biotechnology, Automotive',
    digitalDemandTier: 'Tier 1 Priority', priorityTier: 1,
    source: 'US Census Bureau / Huntsville/Madison County Chamber', researchDate: '2026-Q1',
    commercialProfile: 'Rocket City has the highest per-capita concentration of engineers in the United States. Fast-growing economic powerhouse with significant aerospace, defense, and tech contractor demands.',
    remoteDeliveryFit: 'High - Central Time Zone, engineering and technology oriented.'
  },
  {
    state: 'Tennessee', stateCode: 'TN', stateSlug: 'tennessee',
    city: 'Knoxville', citySlug: 'knoxville',
    county: 'Knox County',
    metroArea: 'Knoxville Metro Area',
    population: 195889, populationYear: '2023 US Census Bureau Estimate',
    majorIndustries: 'Advanced Materials & Nuclear Science (Oak Ridge National Lab), Media & Television (Discovery), Automotive Parts, Tourism, Higher Education',
    digitalDemandTier: 'Tier 1 Priority', priorityTier: 1,
    source: 'US Census Bureau / Knoxville Chamber', researchDate: '2026-Q1',
    commercialProfile: 'Gateway to the Great Smoky Mountains and center of the Tennessee Technology Corridor. Strong demand for local service rankings, engineering contractor web portals, and tourism marketing.',
    remoteDeliveryFit: 'High - Eastern Time Zone, steady economic growth.'
  },
  {
    state: 'Tennessee', stateCode: 'TN', stateSlug: 'tennessee',
    city: 'Memphis', citySlug: 'memphis',
    county: 'Shelby County',
    metroArea: 'Memphis Metro Area (Mid-South)',
    population: 621056, populationYear: '2023 US Census Bureau Estimate',
    majorIndustries: 'Global Logistics & Freight (FedEx World Hub), Medical Device Manufacturing, Biomedical Research (St. Jude Children’s), Music & Hospitality',
    digitalDemandTier: 'Tier 1 Priority', priorityTier: 1,
    source: 'US Census Bureau / Greater Memphis Chamber', researchDate: '2026-Q1',
    commercialProfile: 'America’s Distribution Center. Hub of global supply chains and medical device orthopedics with heavy demand for e-commerce integration, freight software, and local service SEO.',
    remoteDeliveryFit: 'High - Central Time Zone, central North American crossroads.'
  },
  {
    state: 'Arkansas', stateCode: 'AR', stateSlug: 'arkansas',
    city: 'Little Rock', citySlug: 'little-rock',
    county: 'Pulaski County',
    metroArea: 'Little Rock-North Little Rock-Conway Metro Area',
    population: 201884, populationYear: '2023 US Census Bureau Estimate',
    majorIndustries: 'Healthcare & Medical Sciences, State Government, Financial Services & Banking, Aerospace & Aviation, Agriculture',
    digitalDemandTier: 'Tier 1 Priority', priorityTier: 1,
    source: 'US Census Bureau / Little Rock Regional Chamber', researchDate: '2026-Q1',
    commercialProfile: 'Capital and commercial hub of Arkansas. Dense concentration of medical practices, financial institutions, and legal firms requiring modern website design and local Google map optimization.',
    remoteDeliveryFit: 'High - Central Time Zone, regional commercial focus.'
  },
  {
    state: 'Louisiana', stateCode: 'LA', stateSlug: 'louisiana',
    city: 'Baton Rouge', citySlug: 'baton-rouge',
    county: 'East Baton Rouge Parish',
    metroArea: 'Baton Rouge Metro Area',
    population: 221453, populationYear: '2023 US Census Bureau Estimate',
    majorIndustries: 'Petrochemical Refining & Chemicals, Deepwater Mississippi River Port, State Government, Higher Education (LSU), Healthcare',
    digitalDemandTier: 'Tier 1 Priority', priorityTier: 1,
    source: 'US Census Bureau / Baton Rouge Area Chamber', researchDate: '2026-Q1',
    commercialProfile: 'Major petrochemical refining capital and deepwater port corridor. Substantial industrial supply companies and local commercial service firms seeking modern B2B lead generation.',
    remoteDeliveryFit: 'High - Central Time Zone, industrial supply chain.'
  },
  {
    state: 'Florida', stateCode: 'FL', stateSlug: 'florida',
    city: 'Fort Lauderdale', citySlug: 'fort-lauderdale',
    county: 'Broward County',
    metroArea: 'Miami-Fort Lauderdale-Pompano Beach Metro Area',
    population: 182760, populationYear: '2023 US Census Bureau Estimate',
    majorIndustries: 'Marine Industry & Megayacht Services, Cloud Tech & Software (Citrix), Tourism & Hospitality, Aviation Maintenance, Real Estate',
    digitalDemandTier: 'Tier 1 Priority', priorityTier: 1,
    source: 'US Census Bureau / Greater Fort Lauderdale Alliance', researchDate: '2026-Q1',
    commercialProfile: 'Yachting Capital of the World and premier South Florida tech hub. High concentration of luxury marine businesses, corporate regional headquarters, and scaling software companies.',
    remoteDeliveryFit: 'High - Eastern Time Zone, affluent commercial market.'
  },
  {
    state: 'Florida', stateCode: 'FL', stateSlug: 'florida',
    city: 'West Palm Beach', citySlug: 'west-palm-beach',
    county: 'Palm Beach County',
    metroArea: 'Miami-Fort Lauderdale-Pompano Beach Metro Area',
    population: 120932, populationYear: '2023 US Census Bureau Estimate',
    majorIndustries: 'Wealth Management & Private Equity (Wall Street South), Aerospace & Jet Engines, Luxury Real Estate, Healthcare, Tourism',
    digitalDemandTier: 'Tier 1 Priority', priorityTier: 1,
    source: 'US Census Bureau / Business Development Board of Palm Beach County', researchDate: '2026-Q1',
    commercialProfile: 'Wall Street South. Leading destination for migrating hedge funds, private equity firms, and luxury real estate developers with high standards for elite digital branding and discretion.',
    remoteDeliveryFit: 'High - Eastern Time Zone, premier wealth capital.'
  },
  {
    state: 'Florida', stateCode: 'FL', stateSlug: 'florida',
    city: 'St. Petersburg', citySlug: 'st-petersburg',
    county: 'Pinellas County',
    metroArea: 'Tampa-St. Petersburg-Clearwater Metro Area',
    population: 261338, populationYear: '2023 US Census Bureau Estimate',
    majorIndustries: 'Financial Services & Brokerage (Raymond James HQ), Marine Science, Digital Media & Arts, Tourism, Healthcare',
    digitalDemandTier: 'Tier 1 Priority', priorityTier: 1,
    source: 'US Census Bureau / St. Petersburg EDC', researchDate: '2026-Q1',
    commercialProfile: 'The Sunshine City. Rapidly growing creative and financial technology scene on Tampa Bay with high startup activity and demand for modern React web applications and SEO.',
    remoteDeliveryFit: 'High - Eastern Time Zone, vibrant digital community.'
  },
  {
    state: 'Arizona', stateCode: 'AZ', stateSlug: 'arizona',
    city: 'Scottsdale', citySlug: 'scottsdale',
    county: 'Maricopa County',
    metroArea: 'Phoenix-Mesa-Chandler Metro Area',
    population: 242753, populationYear: '2023 US Census Bureau Estimate',
    majorIndustries: 'Healthcare & Medical Tourism (Mayo Clinic), Luxury Hospitality & Resorts, Financial Technology, Software SaaS, Luxury Real Estate',
    digitalDemandTier: 'Tier 1 Priority', priorityTier: 1,
    source: 'US Census Bureau / Scottsdale Economic Development', researchDate: '2026-Q1',
    commercialProfile: 'High-income commercial center of the Phoenix Valley. Exceptionally lucrative market for cosmetic medical practices, luxury realtors, and SaaS companies investing in paid search and SEO.',
    remoteDeliveryFit: 'High - Mountain Time Zone, affluent tech-friendly businesses.'
  },
  {
    state: 'California', stateCode: 'CA', stateSlug: 'california',
    city: 'Irvine', citySlug: 'irvine',
    county: 'Orange County',
    metroArea: 'Los Angeles-Long Beach-Anaheim Metro Area',
    population: 309926, populationYear: '2023 US Census Bureau Estimate',
    majorIndustries: 'Medical Devices & MedTech (Edwards Lifesciences), Video Game Development (Blizzard Entertainment), Automotive Design, Semiconductor Tech, Higher Ed (UC Irvine)',
    digitalDemandTier: 'Tier 1 Priority', priorityTier: 1,
    source: 'US Census Bureau / City of Irvine Economic Development', researchDate: '2026-Q1',
    commercialProfile: 'Master-planned technology powerhouse in Orange County. Massive concentration of biomedical device firms, digital gaming studios, and global corporate headquarters seeking advanced web solutions.',
    remoteDeliveryFit: 'Exceptional - Pacific Time Zone, high tech literacy.'
  },
  {
    state: 'California', stateCode: 'CA', stateSlug: 'california',
    city: 'Anaheim', citySlug: 'anaheim',
    county: 'Orange County',
    metroArea: 'Los Angeles-Long Beach-Anaheim Metro Area',
    population: 344461, populationYear: '2023 US Census Bureau Estimate',
    majorIndustries: 'Tourism & Entertainment (Disneyland Resort), Convention & Events, Advanced Manufacturing, Aerospace Components, Healthcare',
    digitalDemandTier: 'Tier 1 Priority', priorityTier: 1,
    source: 'US Census Bureau / Anaheim Economic Development', researchDate: '2026-Q1',
    commercialProfile: 'Orange County’s largest city and major convention hub. Massive commercial ecosystem serving millions of convention delegates, regional manufacturers, and local service providers.',
    remoteDeliveryFit: 'High - Pacific Time Zone, high commercial volume.'
  },
  {
    state: 'California', stateCode: 'CA', stateSlug: 'california',
    city: 'Long Beach', citySlug: 'long-beach',
    county: 'Los Angeles County',
    metroArea: 'Los Angeles-Long Beach-Anaheim Metro Area',
    population: 451307, populationYear: '2023 US Census Bureau Estimate',
    majorIndustries: 'Port of Long Beach (International Trade), Commercial Space & Rockets (Relativity Space, Rocket Lab), Aviation, Healthcare, Tourism',
    digitalDemandTier: 'Tier 1 Priority', priorityTier: 1,
    source: 'US Census Bureau / Long Beach Economic Development', researchDate: '2026-Q1',
    commercialProfile: 'Major container seaport and burgeoning commercial space tech hub (Space Beach). Diverse commercial landscape requiring supply chain digital tools, corporate sites, and local SEO.',
    remoteDeliveryFit: 'High - Pacific Time Zone, aerospace and port logistics focus.'
  },
  {
    state: 'California', stateCode: 'CA', stateSlug: 'california',
    city: 'Oakland', citySlug: 'oakland',
    county: 'Alameda County',
    metroArea: 'San Francisco-Oakland-Berkeley Metro Area (East Bay)',
    population: 430553, populationYear: '2023 US Census Bureau Estimate',
    majorIndustries: 'Clean Tech & Green Energy, Port of Oakland (Container Cargo), Health Care (Kaiser Permanente HQ), Food Tech, Digital Media',
    digitalDemandTier: 'Tier 1 Priority', priorityTier: 1,
    source: 'US Census Bureau / Oakland Economic & Workforce Development', researchDate: '2026-Q1',
    commercialProfile: 'East Bay commercial hub and container port center. Strong focus on green energy startups, healthcare systems, and creative digital agency collaborations.',
    remoteDeliveryFit: 'High - Pacific Time Zone, digital-first culture.'
  },
  {
    state: 'California', stateCode: 'CA', stateSlug: 'california',
    city: 'Santa Ana', citySlug: 'santa-ana',
    county: 'Orange County',
    metroArea: 'Los Angeles-Long Beach-Anaheim Metro Area',
    population: 308331, populationYear: '2023 US Census Bureau Estimate',
    majorIndustries: 'County Government & Legal, Financial Services (First American Financial), Aerospace Hardware, Commercial Printing, Healthcare',
    digitalDemandTier: 'Tier 1 Priority', priorityTier: 1,
    source: 'US Census Bureau / Santa Ana Community Development', researchDate: '2026-Q1',
    commercialProfile: 'Government and financial seat of Orange County. Growing creative business district and commercial service economy with strong demand for bilingual web presences and regional search visibility.',
    remoteDeliveryFit: 'High - Pacific Time Zone, high density of commercial firms.'
  },
  {
    state: 'California', stateCode: 'CA', stateSlug: 'california',
    city: 'Riverside', citySlug: 'riverside',
    county: 'Riverside County',
    metroArea: 'Riverside-San Bernardino-Ontario Metro Area (Inland Empire)',
    population: 317261, populationYear: '2023 US Census Bureau Estimate',
    majorIndustries: 'Supply Chain & E-commerce Logistics, Advanced Manufacturing, Agriculture & Citrus Research, Higher Education (UC Riverside), Healthcare',
    digitalDemandTier: 'Tier 1 Priority', priorityTier: 1,
    source: 'US Census Bureau / Riverside Community & Economic Development', researchDate: '2026-Q1',
    commercialProfile: 'Hub of the Inland Empire, one of America’s premier logistics and fulfillment corridors. Booming demand for logistics portals, warehousing software, and commercial contractor SEO.',
    remoteDeliveryFit: 'High - Pacific Time Zone, logistics hub focus.'
  },
  {
    state: 'California', stateCode: 'CA', stateSlug: 'california',
    city: 'Bakersfield', citySlug: 'bakersfield',
    county: 'Kern County',
    metroArea: 'Bakersfield Metro Area (Central Valley)',
    population: 410644, populationYear: '2023 US Census Bureau Estimate',
    majorIndustries: 'Oil & Energy Production, Agriculture & Food Processing, Renewable Energy (Solar & Wind), Distribution & Logistics',
    digitalDemandTier: 'Tier 1 Priority', priorityTier: 1,
    source: 'US Census Bureau / Greater Bakersfield Chamber', researchDate: '2026-Q1',
    commercialProfile: 'Top oil-producing and agricultural county in California. Expanding into green energy and central distribution with commercial operators seeking modern web presence and lead generation.',
    remoteDeliveryFit: 'High - Pacific Time Zone, industrial and agribusiness clients.'
  },
  {
    state: 'California', stateCode: 'CA', stateSlug: 'california',
    city: 'Fresno', citySlug: 'fresno',
    county: 'Fresno County',
    metroArea: 'Fresno Metro Area (San Joaquin Valley)',
    population: 545567, populationYear: '2023 US Census Bureau Estimate',
    majorIndustries: 'Agricultural Technology & Farming, Food Processing & Packaging, Regional Healthcare, Distribution Centers, Construction',
    digitalDemandTier: 'Tier 1 Priority', priorityTier: 1,
    source: 'US Census Bureau / Fresno EDC', researchDate: '2026-Q1',
    commercialProfile: 'Agricultural heart of California and fifth-largest city in the state. Rapidly digitizing agribusinesses, medical groups, and regional contractors seeking enhanced online customer capture.',
    remoteDeliveryFit: 'High - Pacific Time Zone, established commercial center.'
  },
  {
    state: 'California', stateCode: 'CA', stateSlug: 'california',
    city: 'Stockton', citySlug: 'stockton',
    county: 'San Joaquin County',
    metroArea: 'Stockton-Lodi Metro Area',
    population: 319543, populationYear: '2023 US Census Bureau Estimate',
    majorIndustries: 'Inland Deepwater Port Logistics, E-commerce Fulfillment, Agriculture & Wine, Manufacturing, Telecommunications',
    digitalDemandTier: 'Tier 1 Priority', priorityTier: 1,
    source: 'US Census Bureau / San Joaquin County Economic Development', researchDate: '2026-Q1',
    commercialProfile: 'Inland port connecting California’s Central Valley to global maritime trade. Major logistics hub with large fulfillment facilities requiring web automation and regional commercial visibility.',
    remoteDeliveryFit: 'High - Pacific Time Zone, expanding logistics market.'
  },
  {
    state: 'Texas', stateCode: 'TX', stateSlug: 'texas',
    city: 'Arlington', citySlug: 'arlington',
    county: 'Tarrant County',
    metroArea: 'Dallas-Fort Worth-Arlington Metro Area',
    population: 394602, populationYear: '2023 US Census Bureau Estimate',
    majorIndustries: 'Automotive Assembly (General Motors), Sports & Entertainment (AT&T Stadium, Globe Life Field), Aerospace, Higher Education (UT Arlington)',
    digitalDemandTier: 'Tier 1 Priority', priorityTier: 1,
    source: 'US Census Bureau / Arlington Economic Development Corporation', researchDate: '2026-Q1',
    commercialProfile: 'Entertainment and manufacturing hub between Dallas and Fort Worth. Huge hospitality and sports tourism traffic, paired with automotive and aerospace suppliers seeking B2B visibility.',
    remoteDeliveryFit: 'High - Central Time Zone, dynamic Texas metro.'
  },
  {
    state: 'Texas', stateCode: 'TX', stateSlug: 'texas',
    city: 'Plano', citySlug: 'plano',
    county: 'Collin / Denton',
    metroArea: 'Dallas-Fort Worth-Arlington Metro Area',
    population: 289547, populationYear: '2023 US Census Bureau Estimate',
    majorIndustries: 'Corporate Headquarters (Toyota Motor North America, Frito-Lay, JCPenney), Telecommunications, Financial Services, Enterprise Software',
    digitalDemandTier: 'Tier 1 Priority', priorityTier: 1,
    source: 'US Census Bureau / Plano Economic Development', researchDate: '2026-Q1',
    commercialProfile: 'Premier corporate headquarters powerhouse in North Texas. Exceptionally affluent business population demanding high-end web development, cybersecurity-aware platforms, and B2B growth marketing.',
    remoteDeliveryFit: 'Exceptional - Central Time Zone, sophisticated corporate procurement.'
  },
  {
    state: 'Texas', stateCode: 'TX', stateSlug: 'texas',
    city: 'Irving', citySlug: 'irving',
    county: 'Dallas County',
    metroArea: 'Dallas-Fort Worth-Arlington Metro Area (Las Colinas)',
    population: 254195, populationYear: '2023 US Census Bureau Estimate',
    majorIndustries: 'Fortune 500 Headquarters (ExxonMobil legacy, Caterpillar, McKesson, Fluor), Las Colinas Master-Planned Business District, Technology, Aviation',
    digitalDemandTier: 'Tier 1 Priority', priorityTier: 1,
    source: 'US Census Bureau / Greater Irving-Las Colinas Chamber', researchDate: '2026-Q1',
    commercialProfile: 'Headquarters of Champions in Las Colinas. Dense concentration of multinational corporate offices with multi-million dollar IT and marketing budgets looking for elite specialized partners.',
    remoteDeliveryFit: 'Exceptional - Central Time Zone, premier corporate headquarters market.'
  },
  {
    state: 'Texas', stateCode: 'TX', stateSlug: 'texas',
    city: 'Garland', citySlug: 'garland',
    county: 'Dallas / Collin / Rockwall',
    metroArea: 'Dallas-Fort Worth-Arlington Metro Area',
    population: 242035, populationYear: '2023 US Census Bureau Estimate',
    majorIndustries: 'Precision Manufacturing, Electronics & Defense Hardware, Food Processing, Distribution & Warehousing',
    digitalDemandTier: 'Tier 1 Priority', priorityTier: 1,
    source: 'US Census Bureau / Garland Economic Development', researchDate: '2026-Q1',
    commercialProfile: 'One of Texas’s largest manufacturing centers with hundreds of precision tooling, electronics, and food processing facilities seeking B2B digital sales funnels and Google search rankings.',
    remoteDeliveryFit: 'High - Central Time Zone, practical industrial market.'
  },
  {
    state: 'Texas', stateCode: 'TX', stateSlug: 'texas',
    city: 'Lubbock', citySlug: 'lubbock',
    county: 'Lubbock County',
    metroArea: 'Lubbock Metro Area (South Plains)',
    population: 263930, populationYear: '2023 US Census Bureau Estimate',
    majorIndustries: 'Cotton Agriculture & Farming, Regional Healthcare (Covenant Health), Higher Education (Texas Tech University), Food Science, Energy',
    digitalDemandTier: 'Tier 1 Priority', priorityTier: 1,
    source: 'US Census Bureau / Lubbock Economic Development Alliance', researchDate: '2026-Q1',
    commercialProfile: 'Hub City of West Texas and the largest contiguous cotton-growing region in the world. Dominant regional medical and educational center with strong local business demand.',
    remoteDeliveryFit: 'High - Central Time Zone, regional commercial dominance.'
  },
  {
    state: 'Texas', stateCode: 'TX', stateSlug: 'texas',
    city: 'Corpus Christi', citySlug: 'corpus-christi',
    county: 'Nueces / San Patricio / Kleberg',
    metroArea: 'Corpus Christi Metro Area (Coastal Bend)',
    population: 316595, populationYear: '2023 US Census Bureau Estimate',
    majorIndustries: 'Energy Refining & LNG Export Port, Petrochemicals, Military & Naval Aviation, Tourism & Coastal Recreation, Commercial Fishing',
    digitalDemandTier: 'Tier 1 Priority', priorityTier: 1,
    source: 'US Census Bureau / Corpus Christi Regional Economic Development', researchDate: '2026-Q1',
    commercialProfile: 'Major US crude oil and liquefied natural gas export port on the Gulf Coast. Significant industrial marine and energy service providers seeking B2B web infrastructure.',
    remoteDeliveryFit: 'High - Central Time Zone, industrial maritime focus.'
  },
  {
    state: 'Texas', stateCode: 'TX', stateSlug: 'texas',
    city: 'El Paso', citySlug: 'el-paso',
    county: 'El Paso County',
    metroArea: 'El Paso-Las Cruces Combined Statistical Area (Borderplex)',
    population: 678815, populationYear: '2023 US Census Bureau Estimate',
    majorIndustries: 'Cross-Border International Trade (Juárez-El Paso), Defense & Army Aviation (Fort Bliss), Advanced Logistics, Healthcare, Manufacturing',
    digitalDemandTier: 'Tier 1 Priority', priorityTier: 1,
    source: 'US Census Bureau / Borderplex Alliance', researchDate: '2026-Q1',
    commercialProfile: 'The Borderplex is the largest bilingual manufacturing and trade corridor in the Western Hemisphere. Strong demand for multi-lingual websites, customs broker portals, and local commercial SEO.',
    remoteDeliveryFit: 'High - Mountain Time Zone, unique cross-border trade focus.'
  },
  {
    state: 'Connecticut', stateCode: 'CT', stateSlug: 'connecticut',
    city: 'New Haven', citySlug: 'new-haven',
    county: 'New Haven County',
    metroArea: 'New Haven-Milford Metro Area',
    population: 138915, populationYear: '2023 US Census Bureau Estimate',
    majorIndustries: 'Biotechnology & Life Sciences, Higher Education (Yale University), Healthcare Systems, Digital Media, Precision Manufacturing',
    digitalDemandTier: 'Tier 1 Priority', priorityTier: 1,
    source: 'US Census Bureau / Greater New Haven Chamber', researchDate: '2026-Q1',
    commercialProfile: 'Elite academic research center with a booming venture-backed biotechnology startup ecosystem. High demand for scientific branding, investor pitch landing pages, and technical SEO.',
    remoteDeliveryFit: 'High - Eastern Time Zone, research and biotech focus.'
  },
  {
    state: 'New Jersey', stateCode: 'NJ', stateSlug: 'new-jersey',
    city: 'Newark', citySlug: 'newark',
    county: 'Essex County',
    metroArea: 'New York-Newark-Jersey City Metro Area',
    population: 304960, populationYear: '2023 US Census Bureau Estimate',
    majorIndustries: 'Transportation & Global Cargo (Port Newark, Newark Liberty Airport), Financial Services (Prudential HQ), Telecommunications, Healthcare, Higher Ed',
    digitalDemandTier: 'Tier 1 Priority', priorityTier: 1,
    source: 'US Census Bureau / Newark Alliance', researchDate: '2026-Q1',
    commercialProfile: 'New Jersey’s largest commercial center, possessing one of the busiest maritime container ports and air freight hubs in the nation. Strong corporate and supply chain tech demand.',
    remoteDeliveryFit: 'High - Eastern Time Zone, metro logistics corridor.'
  },
  {
    state: 'New Jersey', stateCode: 'NJ', stateSlug: 'new-jersey',
    city: 'Jersey City', citySlug: 'jersey-city',
    county: 'Hudson County',
    metroArea: 'New York-Newark-Jersey City Metro Area',
    population: 292449, populationYear: '2023 US Census Bureau Estimate',
    majorIndustries: 'Financial Technology (Wall Street West), Back-Office Banking, Real Estate Development, Professional Services, Tech Startups',
    digitalDemandTier: 'Tier 1 Priority', priorityTier: 1,
    source: 'US Census Bureau / Hudson County EDC', researchDate: '2026-Q1',
    commercialProfile: 'Wall Street West. Directly across the Hudson River from Manhattan, housing massive trading tech, financial back-office operations, and high-rise real estate developers seeking modern web platforms.',
    remoteDeliveryFit: 'High - Eastern Time Zone, financial tech orientation.'
  },
  {
    state: 'New York', stateCode: 'NY', stateSlug: 'new-york',
    city: 'Yonkers', citySlug: 'yonkers',
    county: 'Westchester County',
    metroArea: 'New York-Newark-Jersey City Metro Area',
    population: 207653, populationYear: '2023 US Census Bureau Estimate',
    majorIndustries: 'Film & Television Production (Lionsgate Studios), Biotechnology, Consumer Product Testing (Consumer Reports HQ), Retail Commerce, Health Services',
    digitalDemandTier: 'Tier 1 Priority', priorityTier: 1,
    source: 'US Census Bureau / Yonkers Economic Development Corporation', researchDate: '2026-Q1',
    commercialProfile: 'Hollywood on Hudson. Major film production boom alongside medical device and commercial businesses in affluent Westchester County seeking elite digital marketing and web development.',
    remoteDeliveryFit: 'High - Eastern Time Zone, creative film and tech hub.'
  },
  {
    state: 'Colorado', stateCode: 'CO', stateSlug: 'colorado',
    city: 'Aurora', citySlug: 'aurora',
    county: 'Arapahoe / Adams / Douglas',
    metroArea: 'Denver-Aurora-Lakewood Metro Area',
    population: 395052, populationYear: '2023 US Census Bureau Estimate',
    majorIndustries: 'Bioscience & Medical Campus (Anschutz Medical Campus), Aerospace & Defense (Buckley Space Force Base), Logistics & Distribution, Renewable Energy',
    digitalDemandTier: 'Tier 1 Priority', priorityTier: 1,
    source: 'US Census Bureau / Aurora Economic Development Council', researchDate: '2026-Q1',
    commercialProfile: 'Home to the world-renowned Anschutz Medical Campus and major defense space installations. High-value biotechnology startups and regional contractors demand cutting-edge digital portals.',
    remoteDeliveryFit: 'High - Mountain Time Zone, fast-growing tech corridor.'
  },
  {
    state: 'Colorado', stateCode: 'CO', stateSlug: 'colorado',
    city: 'Fort Collins', citySlug: 'fort-collins',
    county: 'Larimer County',
    metroArea: 'Fort Collins Metro Area (Northern Colorado)',
    population: 169249, populationYear: '2023 US Census Bureau Estimate',
    majorIndustries: 'Clean Energy & Water Innovation, Semiconductor Hardware, Craft Brewing & Fermentation Science, Higher Education (Colorado State University), Bioscience',
    digitalDemandTier: 'Tier 1 Priority', priorityTier: 1,
    source: 'US Census Bureau / City of Fort Collins Economic Health', researchDate: '2026-Q1',
    commercialProfile: 'Pioneering clean energy and craft brewing hub in Northern Colorado. Highly educated demographic with strong entrepreneurial activity in green tech and hardware engineering.',
    remoteDeliveryFit: 'High - Mountain Time Zone, innovation-driven culture.'
  },
  {
    state: 'Washington', stateCode: 'WA', stateSlug: 'washington',
    city: 'Tacoma', citySlug: 'tacoma',
    county: 'Pierce County',
    metroArea: 'Seattle-Tacoma-Bellevue Metro Area (Puget Sound)',
    population: 221776, populationYear: '2023 US Census Bureau Estimate',
    majorIndustries: 'Deepwater Maritime Container Port (NW Seaport Alliance), Military Logistics (JBLM), Health Care Systems, Advanced Wood Products, Clean Tech',
    digitalDemandTier: 'Tier 1 Priority', priorityTier: 1,
    source: 'US Census Bureau / Economic Development Board for Tacoma-Pierce County', researchDate: '2026-Q1',
    commercialProfile: 'Major container seaport and industrial powerhouse in Puget Sound. Receptive market for logistics web portals, manufacturing marketing, and regional contractor lead generation.',
    remoteDeliveryFit: 'High - Pacific Time Zone, established maritime business focus.'
  },
  {
    state: 'Washington', stateCode: 'WA', stateSlug: 'washington',
    city: 'Spokane', citySlug: 'spokane',
    county: 'Spokane County',
    metroArea: 'Spokane-Spokane Valley Metro Area (Inland Northwest)',
    population: 229447, populationYear: '2023 US Census Bureau Estimate',
    majorIndustries: 'Healthcare & Medical Centers, Higher Education & Medical Training, Aerospace Manufacturing, Clean Technology, Agribusiness Logistics',
    digitalDemandTier: 'Tier 1 Priority', priorityTier: 1,
    source: 'US Census Bureau / Greater Spokane Inc.', researchDate: '2026-Q1',
    commercialProfile: 'Economic capital of the Inland Northwest serving Eastern Washington and Northern Idaho. Dense medical district and aerospace parts suppliers seeking digital expansion.',
    remoteDeliveryFit: 'High - Pacific Time Zone, dominant regional market.'
  },
  {
    state: 'Washington', stateCode: 'WA', stateSlug: 'washington',
    city: 'Vancouver', citySlug: 'vancouver',
    county: 'Clark County',
    metroArea: 'Portland-Vancouver-Hillsboro Metro Area',
    population: 194514, populationYear: '2023 US Census Bureau Estimate',
    majorIndustries: 'Semiconductors (Silicon Forest), Port Logistics, Healthcare, Technology Startups, Construction',
    digitalDemandTier: 'Tier 1 Priority', priorityTier: 1,
    source: 'US Census Bureau / Columbia River Economic Development Council', researchDate: '2026-Q1',
    commercialProfile: 'Washington State’s anchor in the Portland metro, featuring zero state personal income tax. Attracts high-growth businesses and tech founders seeking competitive search engine visibility.',
    remoteDeliveryFit: 'High - Pacific Time Zone, business-friendly environment.'
  },
  {
    state: 'Washington', stateCode: 'WA', stateSlug: 'washington',
    city: 'Bellevue', citySlug: 'bellevue',
    county: 'King County',
    metroArea: 'Seattle-Tacoma-Bellevue Metro Area (Eastside)',
    population: 152660, populationYear: '2023 US Census Bureau Estimate',
    majorIndustries: 'Enterprise Cloud Software (Microsoft, Amazon Eastside Campus), Video Game Development (Valve, Bungie), 5G Telecommunications (T-Mobile US HQ), Venture Capital',
    digitalDemandTier: 'Tier 1 Priority', priorityTier: 1,
    source: 'US Census Bureau / Bellevue Chamber of Commerce', researchDate: '2026-Q1',
    commercialProfile: 'The affluent tech epicenter of the Pacific Northwest. Houses immense engineering campuses for global tech giants, video game publishers, and telecom leaders with substantial digital budgets.',
    remoteDeliveryFit: 'Exceptional - Pacific Time Zone, global tech capital.'
  },
  {
    state: 'Virginia', stateCode: 'VA', stateSlug: 'virginia',
    city: 'Arlington', citySlug: 'arlington-va',
    county: 'Arlington County',
    metroArea: 'Washington-Arlington-Alexandria Metro Area (Northern Virginia)',
    population: 234000, populationYear: '2023 US Census Bureau Estimate',
    majorIndustries: 'Aerospace & Defense Corporate HQs (Boeing HQ, RTX/Raytheon HQ), National Security Tech, Federal Contracting, Amazon HQ2, Higher Education',
    digitalDemandTier: 'Tier 1 Priority', priorityTier: 1,
    source: 'US Census Bureau / Arlington Economic Development', researchDate: '2026-Q1',
    commercialProfile: 'Headquarters of the Pentagon, Boeing, Raytheon, and Amazon HQ2 (National Landing). Unrivaled concentration of corporate defense and cloud computing leadership demanding top-tier web solutions.',
    remoteDeliveryFit: 'Exceptional - Eastern Time Zone, top-tier corporate contracting.'
  },
  {
    state: 'Virginia', stateCode: 'VA', stateSlug: 'virginia',
    city: 'Alexandria', citySlug: 'alexandria',
    county: 'Independent City',
    metroArea: 'Washington-Arlington-Alexandria Metro Area (Northern Virginia)',
    population: 155525, populationYear: '2023 US Census Bureau Estimate',
    majorIndustries: 'National Trade Associations, Federal Research & Patents (USPTO HQ), National Science Foundation, Defense Consulting, Tourism',
    digitalDemandTier: 'Tier 1 Priority', priorityTier: 1,
    source: 'US Census Bureau / Alexandria Economic Development Partnership', researchDate: '2026-Q1',
    commercialProfile: 'Home to the US Patent and Trademark Office and hundreds of national professional associations. Premium market for association websites, thought leadership SEO, and custom digital portals.',
    remoteDeliveryFit: 'High - Eastern Time Zone, national association headquarters.'
  },
  {
    state: 'California', stateCode: 'CA', stateSlug: 'california',
    city: 'Pasadena', citySlug: 'pasadena',
    county: 'Los Angeles County',
    metroArea: 'Los Angeles-Long Beach-Anaheim Metro Area',
    population: 138699, populationYear: '2023 US Census Bureau Estimate',
    majorIndustries: 'Space Exploration (NASA Jet Propulsion Laboratory), Deep Tech & Robotics (Caltech), Engineering Services, Financial Institutions, Biotech',
    digitalDemandTier: 'Tier 1 Priority', priorityTier: 1,
    source: 'US Census Bureau / City of Pasadena Economic Development', researchDate: '2026-Q1',
    commercialProfile: 'City of Astronomy and Caltech. World-class space robotics and precision engineering spin-offs requiring high-level technical web architecture and specialized B2B marketing.',
    remoteDeliveryFit: 'Exceptional - Pacific Time Zone, high engineering prestige.'
  },
  {
    state: 'California', stateCode: 'CA', stateSlug: 'california',
    city: 'Fremont', citySlug: 'fremont',
    county: 'Alameda County',
    metroArea: 'San Francisco-Oakland-Berkeley Metro Area (Silicon Valley)',
    population: 226208, populationYear: '2023 US Census Bureau Estimate',
    majorIndustries: 'Advanced EV Manufacturing (Tesla Factory), Clean Tech, Semiconductor Equipment, Biomedical Devices, Optical Networking',
    digitalDemandTier: 'Tier 1 Priority', priorityTier: 1,
    source: 'US Census Bureau / City of Fremont Economic Development', researchDate: '2026-Q1',
    commercialProfile: 'Advanced manufacturing capital of Silicon Valley. High concentration of hardware, EV supply chain, and clean tech companies seeking global digital presence.',
    remoteDeliveryFit: 'Exceptional - Pacific Time Zone, hardware and robotics nexus.'
  },
  {
    state: 'California', stateCode: 'CA', stateSlug: 'california',
    city: 'Sunnyvale', citySlug: 'sunnyvale',
    county: 'Santa Clara County',
    metroArea: 'San Jose-Sunnyvale-Santa Clara Metro Area (Silicon Valley)',
    population: 153095, populationYear: '2023 US Census Bureau Estimate',
    majorIndustries: 'Enterprise Cloud & AI (Google Cloud, LinkedIn, Yahoo), Defense Space Tech (Lockheed Martin Space), Semiconductor Design',
    digitalDemandTier: 'Tier 1 Priority', priorityTier: 1,
    source: 'US Census Bureau / City of Sunnyvale Community Development', researchDate: '2026-Q1',
    commercialProfile: 'Core of Silicon Valley with headquarters of leading cloud and professional social platforms. Demands state-of-the-art frontend development and AI integration.',
    remoteDeliveryFit: 'Exceptional - Pacific Time Zone, elite software engineering.'
  },
  {
    state: 'California', stateCode: 'CA', stateSlug: 'california',
    city: 'Santa Clara', citySlug: 'santa-clara',
    county: 'Santa Clara County',
    metroArea: 'San Jose-Sunnyvale-Santa Clara Metro Area (Silicon Valley)',
    population: 127647, populationYear: '2023 US Census Bureau Estimate',
    majorIndustries: 'Semiconductors (Intel HQ, NVIDIA HQ, AMD), Data Center Infrastructure, Higher Education (Santa Clara University), Sports Tech',
    digitalDemandTier: 'Tier 1 Priority', priorityTier: 1,
    source: 'US Census Bureau / City of Santa Clara Economic Development', researchDate: '2026-Q1',
    commercialProfile: 'Chip Capital of the World, housing global semiconductor leaders Intel and NVIDIA. Tremendous demand for high-end digital design, technical SEO, and scalable cloud systems.',
    remoteDeliveryFit: 'Exceptional - Pacific Time Zone, chipmaking and AI capital.'
  },
  {
    state: 'California', stateCode: 'CA', stateSlug: 'california',
    city: 'Berkeley', citySlug: 'berkeley',
    county: 'Alameda County',
    metroArea: 'San Francisco-Oakland-Berkeley Metro Area (East Bay)',
    population: 118950, populationYear: '2023 US Census Bureau Estimate',
    majorIndustries: 'Artificial Intelligence & Computer Science (UC Berkeley), National Energy Lab (Lawrence Berkeley Lab), Clean Tech, Biotechnology, Sustainable Food',
    digitalDemandTier: 'Tier 1 Priority', priorityTier: 1,
    source: 'US Census Bureau / City of Berkeley Economic Development', researchDate: '2026-Q1',
    commercialProfile: 'Top-tier academic research and startup generator in AI, biotechnology, and clean energy. Values ethical design, scientific accuracy, and cutting-edge software architecture.',
    remoteDeliveryFit: 'Exceptional - Pacific Time Zone, academic tech incubator.'
  },
  {
    state: 'California', stateCode: 'CA', stateSlug: 'california',
    city: 'Torrance', citySlug: 'torrance',
    county: 'Los Angeles County',
    metroArea: 'Los Angeles-Long Beach-Anaheim Metro Area (South Bay)',
    population: 141126, populationYear: '2023 US Census Bureau Estimate',
    majorIndustries: 'Commercial Space Exploration, Automotive Engineering, Advanced Refining, Medical Device Manufacturing, International Trade',
    digitalDemandTier: 'Tier 1 Priority', priorityTier: 1,
    source: 'US Census Bureau / Torrance Economic Development Office', researchDate: '2026-Q1',
    commercialProfile: 'South Bay industrial powerhouse with major aerospace suppliers and Japanese corporate headquarters seeking reliable B2B web and SEO services.',
    remoteDeliveryFit: 'High - Pacific Time Zone, industrial and international focus.'
  },
  {
    state: 'California', stateCode: 'CA', stateSlug: 'california',
    city: 'Glendale', citySlug: 'glendale',
    county: 'Los Angeles County',
    metroArea: 'Los Angeles-Long Beach-Anaheim Metro Area',
    population: 189283, populationYear: '2023 US Census Bureau Estimate',
    majorIndustries: 'Animation & Entertainment (DreamWorks Animation, Disney Grand Central), Healthcare, Financial Services, Retail Commerce',
    digitalDemandTier: 'Tier 1 Priority', priorityTier: 1,
    source: 'US Census Bureau / Glendale Economic Development', researchDate: '2026-Q1',
    commercialProfile: 'Entertainment and animation capital alongside Burbank. High creative expectations, requiring visually stunning web interfaces and agile video marketing integration.',
    remoteDeliveryFit: 'High - Pacific Time Zone, creative entertainment focus.'
  },
  {
    state: 'California', stateCode: 'CA', stateSlug: 'california',
    city: 'Burbank', citySlug: 'burbank',
    county: 'Los Angeles County',
    metroArea: 'Los Angeles-Long Beach-Anaheim Metro Area',
    population: 104427, populationYear: '2023 US Census Bureau Estimate',
    majorIndustries: 'Media & Entertainment Headquarters (The Walt Disney Company, Warner Bros. Discovery), Post-Production, Digital Streaming, Aviation',
    digitalDemandTier: 'Tier 1 Priority', priorityTier: 1,
    source: 'US Census Bureau / Burbank Economic Development', researchDate: '2026-Q1',
    commercialProfile: 'Media Capital of the World. Unrivaled concentration of entertainment studios, post-production houses, and entertainment marketing agencies seeking cutting-edge web design.',
    remoteDeliveryFit: 'High - Pacific Time Zone, media and creative standards.'
  },
  {
    state: 'California', stateCode: 'CA', stateSlug: 'california',
    city: 'Santa Monica', citySlug: 'santa-monica',
    county: 'Los Angeles County',
    metroArea: 'Los Angeles-Long Beach-Anaheim Metro Area (Silicon Beach)',
    population: 89922, populationYear: '2023 US Census Bureau Estimate',
    majorIndustries: 'Silicon Beach Tech Startups, Venture Capital, Digital Gaming (Riot Games), Video Streaming, Luxury Tourism & Retail',
    digitalDemandTier: 'Tier 1 Priority', priorityTier: 1,
    source: 'US Census Bureau / Santa Monica Economic Development', researchDate: '2026-Q1',
    commercialProfile: 'Heart of Silicon Beach. Highly affluent startup, gaming, and creative agency hub demanding modern design aesthetics, brand storytelling, and high-performance search marketing.',
    remoteDeliveryFit: 'Exceptional - Pacific Time Zone, venture-backed digital culture.'
  },
  {
    state: 'Texas', stateCode: 'TX', stateSlug: 'texas',
    city: 'Frisco', citySlug: 'frisco',
    county: 'Collin / Denton',
    metroArea: 'Dallas-Fort Worth-Arlington Metro Area',
    population: 219587, populationYear: '2023 US Census Bureau Estimate',
    majorIndustries: 'Sports Business & HQs (Dallas Cowboys World HQ, PGA of America HQ), Fintech, Health & Wellness, Corporate Relocations',
    digitalDemandTier: 'Tier 1 Priority', priorityTier: 1,
    source: 'US Census Bureau / Frisco Economic Development Corporation', researchDate: '2026-Q1',
    commercialProfile: 'Sports City USA and one of America’s fastest-growing affluent business corridors. Outstanding market for high-ticket service marketing, sports tech web apps, and local Google Maps dominance.',
    remoteDeliveryFit: 'High - Central Time Zone, fast-growing corporate environment.'
  },
  {
    state: 'Texas', stateCode: 'TX', stateSlug: 'texas',
    city: 'McKinney', citySlug: 'mckinney',
    county: 'Collin County',
    metroArea: 'Dallas-Fort Worth-Arlington Metro Area',
    population: 207507, populationYear: '2023 US Census Bureau Estimate',
    majorIndustries: 'Aviation & Defense Electronics (Raytheon), Medical Technology, Regional Headquarters, Construction & Building Products',
    digitalDemandTier: 'Tier 1 Priority', priorityTier: 1,
    source: 'US Census Bureau / McKinney Economic Development Corporation', researchDate: '2026-Q1',
    commercialProfile: 'Northern Dallas boomtown with rapid corporate relocations and a flourishing historic downtown commercial sector seeking aggressive customer acquisition strategies.',
    remoteDeliveryFit: 'High - Central Time Zone, high commercial growth.'
  },
  {
    state: 'Texas', stateCode: 'TX', stateSlug: 'texas',
    city: 'The Woodlands', citySlug: 'the-woodlands',
    county: 'Montgomery / Harris',
    metroArea: 'Houston-The Woodlands-Sugar Land Metro Area',
    population: 119000, populationYear: '2023 US Census Bureau Estimate',
    majorIndustries: 'Energy Corporate HQs (Occidental Petroleum, Chevron Phillips Chemical), Healthcare & Hospitals, Forestry & Chemical Products, Wealth Management',
    digitalDemandTier: 'Tier 1 Priority', priorityTier: 1,
    source: 'US Census Bureau / The Woodlands Area Economic Development Partnership', researchDate: '2026-Q1',
    commercialProfile: 'Premier master-planned corporate community north of Houston. Extremely affluent executive population with substantial commercial and corporate marketing budgets.',
    remoteDeliveryFit: 'High - Central Time Zone, executive-level corporate engagement.'
  },
  {
    state: 'Texas', stateCode: 'TX', stateSlug: 'texas',
    city: 'Sugar Land', citySlug: 'sugar-land',
    county: 'Fort Bend County',
    metroArea: 'Houston-The Woodlands-Sugar Land Metro Area',
    population: 109373, populationYear: '2023 US Census Bureau Estimate',
    majorIndustries: 'Energy Engineering Services, Industrial Automation, Biotechnology, Corporate HQs, Regional Healthcare',
    digitalDemandTier: 'Tier 1 Priority', priorityTier: 1,
    source: 'US Census Bureau / Sugar Land Economic Development', researchDate: '2026-Q1',
    commercialProfile: 'High-income Southwest Houston commercial anchor. Dense concentration of engineering consultancy firms and healthcare networks seeking automated client lead funnels.',
    remoteDeliveryFit: 'High - Central Time Zone, engineering and medical focus.'
  },
  {
    state: 'Texas', stateCode: 'TX', stateSlug: 'texas',
    city: 'Round Rock', citySlug: 'round-rock',
    county: 'Williamson / Travis',
    metroArea: 'Austin-Round Rock-San Marcos Metro Area',
    population: 126604, populationYear: '2023 US Census Bureau Estimate',
    majorIndustries: 'Computer Technology (Dell Technologies World HQ), Clean Energy, Advanced Manufacturing, Regional Healthcare',
    digitalDemandTier: 'Tier 1 Priority', priorityTier: 1,
    source: 'US Census Bureau / Round Rock Chamber', researchDate: '2026-Q1',
    commercialProfile: 'Global headquarters of Dell Technologies and cornerstone of the greater Austin tech boom. Strong commercial demand for B2B supplier marketing and modern e-commerce systems.',
    remoteDeliveryFit: 'Exceptional - Central Time Zone, technology hardware and software focus.'
  },
  {
    state: 'Georgia', stateCode: 'GA', stateSlug: 'georgia',
    city: 'Alpharetta', citySlug: 'alpharetta',
    county: 'Fulton County',
    metroArea: 'Atlanta-Sandy Springs-Alpharetta Metro Area',
    population: 67349, populationYear: '2023 US Census Bureau Estimate',
    majorIndustries: 'Financial Technology & Payments, Health Information Technology, Enterprise Cybersecurity, Telecom',
    digitalDemandTier: 'Tier 1 Priority', priorityTier: 1,
    source: 'US Census Bureau / City of Alpharetta Economic Development', researchDate: '2026-Q1',
    commercialProfile: 'Technology City of the South. Boasts over 700 tech companies and fintech giants processing global transactions. Prime market for cybersecurity-hardened web development and B2B SaaS marketing.',
    remoteDeliveryFit: 'Exceptional - Eastern Time Zone, elite fintech and technology center.'
  },
  {
    state: 'Georgia', stateCode: 'GA', stateSlug: 'georgia',
    city: 'Savannah', citySlug: 'savannah',
    county: 'Chatham County',
    metroArea: 'Savannah Metro Area (Coastal Georgia)',
    population: 147780, populationYear: '2023 US Census Bureau Estimate',
    majorIndustries: 'Deepwater Container Port (Port of Savannah, GPA), Aviation (Gulfstream Aerospace HQ), Tourism & Hospitality, Higher Ed (SCAD)',
    digitalDemandTier: 'Tier 1 Priority', priorityTier: 1,
    source: 'US Census Bureau / Savannah Economic Development Authority', researchDate: '2026-Q1',
    commercialProfile: 'Fastest-growing container port in the nation and home to Gulfstream Aerospace. Exceptional mix of international maritime trade, aerospace manufacturing, and thriving coastal tourism.',
    remoteDeliveryFit: 'High - Eastern Time Zone, logistics and design focus.'
  },
  {
    state: 'Florida', stateCode: 'FL', stateSlug: 'florida',
    city: 'Boca Raton', citySlug: 'boca-raton',
    county: 'Palm Beach County',
    metroArea: 'Miami-Fort Lauderdale-Pompano Beach Metro Area',
    population: 99009, populationYear: '2023 US Census Bureau Estimate',
    majorIndustries: 'Enterprise Software & Tech (Birthplace of the IBM PC), Private Equity & Wealth Management, Commercial Real Estate, Luxury Services',
    digitalDemandTier: 'Tier 1 Priority', priorityTier: 1,
    source: 'US Census Bureau / City of Boca Raton Economic Development', researchDate: '2026-Q1',
    commercialProfile: 'Historic tech pioneer and modern corporate headquarters hub in Palm Beach County. Affluent corporate decision-makers seeking bespoke web design, Google Ads management, and high-tier SEO.',
    remoteDeliveryFit: 'High - Eastern Time Zone, corporate and tech focus.'
  },
  {
    state: 'Florida', stateCode: 'FL', stateSlug: 'florida',
    city: 'Clearwater', citySlug: 'clearwater',
    county: 'Pinellas County',
    metroArea: 'Tampa-St. Petersburg-Clearwater Metro Area',
    population: 116600, populationYear: '2023 US Census Bureau Estimate',
    majorIndustries: 'Cybersecurity & Tech (KnowBe4 HQ), Tourism & Beach Hospitality, Healthcare & Medical Centers, Marine Trades',
    digitalDemandTier: 'Tier 1 Priority', priorityTier: 1,
    source: 'US Census Bureau / City of Clearwater Economic Development', researchDate: '2026-Q1',
    commercialProfile: 'Tampa Bay coastal anchor with major tech successes like KnowBe4 alongside high-volume resort hospitality and commercial medical practices.',
    remoteDeliveryFit: 'High - Eastern Time Zone, tech and hospitality focus.'
  },
  {
    state: 'North Carolina', stateCode: 'NC', stateSlug: 'north-carolina',
    city: 'Cary', citySlug: 'cary',
    county: 'Wake / Chatham',
    metroArea: 'Raleigh-Cary Metro Area (Research Triangle)',
    population: 180388, populationYear: '2023 US Census Bureau Estimate',
    majorIndustries: 'Enterprise Analytics & AI (SAS Institute World HQ), Life Sciences, Information Technology, Telecom, Clean Energy',
    digitalDemandTier: 'Tier 1 Priority', priorityTier: 1,
    source: 'US Census Bureau / Cary Chamber of Commerce', researchDate: '2026-Q1',
    commercialProfile: 'Home to SAS Institute, one of the world’s largest privately held software and AI analytics companies. Extremely educated tech population with high demand for advanced digital solutions.',
    remoteDeliveryFit: 'Exceptional - Eastern Time Zone, elite data science and software hub.'
  },
  {
    state: 'North Carolina', stateCode: 'NC', stateSlug: 'north-carolina',
    city: 'Wilmington', citySlug: 'wilmington',
    county: 'New Hanover County',
    metroArea: 'Wilmington Metro Area (Coastal Carolinas)',
    population: 120324, populationYear: '2023 US Census Bureau Estimate',
    majorIndustries: 'Clinical Research & Pharma (PPD/Thermo Fisher), Film & Television (EUE/Screen Gems), Deepwater Port Shipping, Coastal Tourism',
    digitalDemandTier: 'Tier 1 Priority', priorityTier: 1,
    source: 'US Census Bureau / Wilmington Chamber of Commerce', researchDate: '2026-Q1',
    commercialProfile: 'Coastline commercial and clinical trials hub with a thriving film industry and growing tech sector seeking modern website development and local customer capture.',
    remoteDeliveryFit: 'High - Eastern Time Zone, dynamic coastal economy.'
  },
  {
    state: 'South Carolina', stateCode: 'SC', stateSlug: 'south-carolina',
    city: 'Greenville', citySlug: 'greenville',
    county: 'Greenville County',
    metroArea: 'Greenville-Anderson Metro Area (Upstate SC)',
    population: 72095, populationYear: '2023 US Census Bureau Estimate',
    majorIndustries: 'Automotive Engineering & R&D (BMW Hub, Michelin North America HQ), Advanced Materials, Engineering Services (Fluor), Tech Startups',
    digitalDemandTier: 'Tier 1 Priority', priorityTier: 1,
    source: 'US Census Bureau / Greenville Area Development Corporation', researchDate: '2026-Q1',
    commercialProfile: 'The economic driver of Upstate South Carolina. Dense international corporate presence and precision engineering firms seeking specialized B2B marketing funnels.',
    remoteDeliveryFit: 'High - Eastern Time Zone, international engineering focus.'
  },
  {
    state: 'Tennessee', stateCode: 'TN', stateSlug: 'tennessee',
    city: 'Franklin', citySlug: 'franklin',
    county: 'Williamson County',
    metroArea: 'Nashville-Davidson-Murfreesboro-Franklin Metro Area',
    population: 86895, populationYear: '2023 US Census Bureau Estimate',
    majorIndustries: 'Healthcare Corporate HQs (Community Health Systems), Automotive Corporate (Nissan North America HQ), Financial Services, Entertainment',
    digitalDemandTier: 'Tier 1 Priority', priorityTier: 1,
    source: 'US Census Bureau / Williamson, Inc.', researchDate: '2026-Q1',
    commercialProfile: 'One of the wealthiest corporate counties in America. Houses major healthcare management systems and national corporate headquarters with substantial agency budgets.',
    remoteDeliveryFit: 'High - Central Time Zone, executive decision-makers.'
  },
  {
    state: 'Tennessee', stateCode: 'TN', stateSlug: 'tennessee',
    city: 'Chattanooga', citySlug: 'chattanooga',
    county: 'Hamilton County',
    metroArea: 'Chattanooga Metro Area',
    population: 184086, populationYear: '2023 US Census Bureau Estimate',
    majorIndustries: 'Freight Logistics Technology (Freight Alley), Automotive Manufacturing (Volkswagen Assembly), Insurance (Unum HQ), Gig-Speed Fiber Tech',
    digitalDemandTier: 'Tier 1 Priority', priorityTier: 1,
    source: 'US Census Bureau / Chattanooga Area Chamber of Commerce', researchDate: '2026-Q1',
    commercialProfile: 'Gig City. America’s first citywide gigabit fiber network, giving rise to Freight Alley (the nation’s highest density of freight tech brokerages). High demand for custom web apps and lead gen.',
    remoteDeliveryFit: 'High - Eastern Time Zone, digital infrastructure pioneer.'
  },
  {
    state: 'Virginia', stateCode: 'VA', stateSlug: 'virginia',
    city: 'Tysons', citySlug: 'tysons',
    county: 'Fairfax County',
    metroArea: 'Washington-Arlington-Alexandria Metro Area (Northern Virginia)',
    population: 30000, populationYear: '2023 US Census Bureau Estimate',
    majorIndustries: 'Corporate Headquarters (Capital One, Freddie Mac, Hilton), National Defense Tech, Cloud Computing, Commercial Real Estate',
    digitalDemandTier: 'Tier 1 Priority', priorityTier: 1,
    source: 'US Census Bureau / Tysons Community Alliance', researchDate: '2026-Q1',
    commercialProfile: 'Downtown Northern Virginia. Dense concentration of Fortune 500 headquarters, management consultancies, and cybersecurity firms with significant enterprise marketing spend.',
    remoteDeliveryFit: 'Exceptional - Eastern Time Zone, elite corporate business district.'
  },
  {
    state: 'Virginia', stateCode: 'VA', stateSlug: 'virginia',
    city: 'Reston', citySlug: 'reston',
    county: 'Fairfax County',
    metroArea: 'Washington-Arlington-Alexandria Metro Area (Northern Virginia)',
    population: 63226, populationYear: '2023 US Census Bureau Estimate',
    majorIndustries: 'Federal Technology Solutions, Cloud Computing, Defense Systems (General Dynamics HQ, Leidos), Internet Backbone Infrastructure',
    digitalDemandTier: 'Tier 1 Priority', priorityTier: 1,
    source: 'US Census Bureau / Greater Reston Chamber', researchDate: '2026-Q1',
    commercialProfile: 'Core of Northern Virginia’s high-tech corridor and home to the Internet Engineering Task Force’s birthplace. Unrivaled defense IT and enterprise cloud presence.',
    remoteDeliveryFit: 'Exceptional - Eastern Time Zone, federal IT and cloud focus.'
  },
  {
    state: 'Utah', stateCode: 'UT', stateSlug: 'utah',
    city: 'Provo', citySlug: 'provo',
    county: 'Utah County',
    metroArea: 'Provo-Orem Metro Area (Silicon Slopes)',
    population: 114084, populationYear: '2023 US Census Bureau Estimate',
    majorIndustries: 'Software SaaS Unicorns (Qualtrics, Ancestry), Higher Education (BYU), Consumer Brands, Outdoor Gear',
    digitalDemandTier: 'Tier 1 Priority', priorityTier: 1,
    source: 'US Census Bureau / Utah County Economic Development', researchDate: '2026-Q1',
    commercialProfile: 'Southern anchor of Silicon Slopes. Unusually high startup creation rate and youthful tech talent base seeking performance-driven digital marketing and web development.',
    remoteDeliveryFit: 'Exceptional - Mountain Time Zone, venture-scale SaaS ecosystem.'
  },
  {
    state: 'Utah', stateCode: 'UT', stateSlug: 'utah',
    city: 'Lehi', citySlug: 'lehi',
    county: 'Utah County',
    metroArea: 'Provo-Orem Metro Area (Silicon Slopes)',
    population: 84373, populationYear: '2023 US Census Bureau Estimate',
    majorIndustries: 'Cloud Tech & SaaS (Adobe, Podium, Vivint, Texas Instruments Fab), Venture Capital, E-commerce Tech',
    digitalDemandTier: 'Tier 1 Priority', priorityTier: 1,
    source: 'US Census Bureau / City of Lehi Economic Development', researchDate: '2026-Q1',
    commercialProfile: 'Epicenter of Silicon Slopes. Modern glass-and-steel tech campuses line the I-15 corridor, housing hundreds of high-growth software and hardware companies requiring top-tier digital partners.',
    remoteDeliveryFit: 'Exceptional - Mountain Time Zone, tech-native environment.'
  },
  {
    state: 'Nevada', stateCode: 'NV', stateSlug: 'nevada',
    city: 'Reno', citySlug: 'reno',
    county: 'Washoe County',
    metroArea: 'Reno-Sparks Metro Area',
    population: 274915, populationYear: '2023 US Census Bureau Estimate',
    majorIndustries: 'Advanced Manufacturing & EV Batteries (Tesla Gigafactory Nevada), Data Centers (Switch), Logistics, Gaming Tech, Clean Energy',
    digitalDemandTier: 'Tier 1 Priority', priorityTier: 1,
    source: 'US Census Bureau / EDAWN (Economic Development Authority of Western Nevada)', researchDate: '2026-Q1',
    commercialProfile: 'The Biggest Little City has transformed into a high-tech manufacturing and gigafactory titan. Zero state income tax continues to attract Silicon Valley company expansions.',
    remoteDeliveryFit: 'High - Pacific Time Zone, high-growth technology market.'
  },
  {
    state: 'Nevada', stateCode: 'NV', stateSlug: 'nevada',
    city: 'Henderson', citySlug: 'henderson',
    county: 'Clark County',
    metroArea: 'Las Vegas-Henderson-North Las Vegas Metro Area',
    population: 337311, populationYear: '2023 US Census Bureau Estimate',
    majorIndustries: 'Healthcare & Medical Systems, Advanced Manufacturing (Haas Automation), Financial Services, Tech Startups, Master-Planned Communities',
    digitalDemandTier: 'Tier 1 Priority', priorityTier: 1,
    source: 'US Census Bureau / City of Henderson Economic Development', researchDate: '2026-Q1',
    commercialProfile: 'Second-largest city in Nevada and preferred corporate home for expanding West Coast businesses seeking lower taxes, master-planned corporate parks, and high-quality local services.',
    remoteDeliveryFit: 'High - Pacific Time Zone, business-friendly environment.'
  },
  {
    state: 'Arizona', stateCode: 'AZ', stateSlug: 'arizona',
    city: 'Chandler', citySlug: 'chandler',
    county: 'Maricopa County',
    metroArea: 'Phoenix-Mesa-Chandler Metro Area (Silicon Desert)',
    population: 280718, populationYear: '2023 US Census Bureau Estimate',
    majorIndustries: 'Semiconductor Fabrication (Intel Ocotillo Campus, NXP), Autonomous Vehicles (Waymo), Aerospace, Financial Technology',
    digitalDemandTier: 'Tier 1 Priority', priorityTier: 1,
    source: 'US Census Bureau / City of Chandler Economic Development', researchDate: '2026-Q1',
    commercialProfile: 'Community of Innovation and crown jewel of the Silicon Desert. Tremendous concentration of chip fabrication and autonomous vehicle testing firms seeking digital visibility.',
    remoteDeliveryFit: 'Exceptional - Mountain Time Zone, premier semiconductor corridor.'
  },
  {
    state: 'Arizona', stateCode: 'AZ', stateSlug: 'arizona',
    city: 'Gilbert', citySlug: 'gilbert',
    county: 'Maricopa County',
    metroArea: 'Phoenix-Mesa-Chandler Metro Area',
    population: 275346, populationYear: '2023 US Census Bureau Estimate',
    majorIndustries: 'Aerospace & Satellite Systems (Northrop Grumman), Biotechnology & Health Sciences, Clean Tech, Advanced Manufacturing',
    digitalDemandTier: 'Tier 1 Priority', priorityTier: 1,
    source: 'US Census Bureau / Gilbert Office of Economic Development', researchDate: '2026-Q1',
    commercialProfile: 'One of America’s fastest-growing affluent suburbs. Dense concentration of satellite engineering, medical centers, and professional service firms requiring automated marketing funnels.',
    remoteDeliveryFit: 'High - Mountain Time Zone, modern suburban business growth.'
  },
  {
    state: 'Arizona', stateCode: 'AZ', stateSlug: 'arizona',
    city: 'Tempe', citySlug: 'tempe',
    county: 'Maricopa County',
    metroArea: 'Phoenix-Mesa-Chandler Metro Area',
    population: 185950, populationYear: '2023 US Census Bureau Estimate',
    majorIndustries: 'Higher Education & Research (Arizona State University), Financial Technology, E-commerce, Creative Tech Startups, Tourism',
    digitalDemandTier: 'Tier 1 Priority', priorityTier: 1,
    source: 'US Census Bureau / City of Tempe Economic Development', researchDate: '2026-Q1',
    commercialProfile: 'Home to ASU (the nation’s most innovative university). Booming urban tech center around Tempe Town Lake with scaling fintech hubs and venture-backed SaaS startups.',
    remoteDeliveryFit: 'Exceptional - Mountain Time Zone, youth-driven tech innovation.'
  },
  {
    state: 'Arizona', stateCode: 'AZ', stateSlug: 'arizona',
    city: 'Mesa', citySlug: 'mesa',
    county: 'Maricopa County',
    metroArea: 'Phoenix-Mesa-Chandler Metro Area',
    population: 512498, populationYear: '2023 US Census Bureau Estimate',
    majorIndustries: 'Aerospace & Defense (Boeing Apache Helicopters), Advanced Manufacturing, Giant Tech Data Centers (Apple, Meta, Google), Higher Education',
    digitalDemandTier: 'Tier 1 Priority', priorityTier: 1,
    source: 'US Census Bureau / Mesa Office of Economic Development', researchDate: '2026-Q1',
    commercialProfile: 'Third-largest city in Arizona, experiencing massive aerospace manufacturing and hyperscale data center development in the Elliot Road Technology Corridor.',
    remoteDeliveryFit: 'High - Mountain Time Zone, large commercial scale.'
  },
  {
    state: 'Colorado', stateCode: 'CO', stateSlug: 'colorado',
    city: 'Boulder', citySlug: 'boulder',
    county: 'Boulder County',
    metroArea: 'Boulder Metro Area',
    population: 105485, populationYear: '2023 US Census Bureau Estimate',
    majorIndustries: 'Artificial Intelligence & Software (Google Boulder, Twitter/X), Aerospace (Ball Aerospace), Natural & Organic Foods, Quantum Computing, Climate Science (NCAR)',
    digitalDemandTier: 'Tier 1 Priority', priorityTier: 1,
    source: 'US Census Bureau / Boulder Economic Council', researchDate: '2026-Q1',
    commercialProfile: 'One of the highest concentrations of software engineers and venture capital per capita in the nation. Exceptional market for premium technical web development, AI automation, and clean tech marketing.',
    remoteDeliveryFit: 'Exceptional - Mountain Time Zone, pioneer in distributed agile development.'
  },

  // --- TIER 2 & TIER 3: EXPANSION METROS, STATE CAPITALS, SUBURBS & INVENTORY (REPRESENTING ALL 50 STATES) ---
  // ALABAMA
  { state: 'Alabama', stateCode: 'AL', stateSlug: 'alabama', city: 'Mobile', citySlug: 'mobile', county: 'Mobile County', metroArea: 'Mobile Metro Area', population: 184952, populationYear: '2023 US Census', majorIndustries: 'Maritime Shipbuilding (Austal USA), Aerospace Assembly (Airbus Final Assembly Line), Deepwater Port Logistics, Chemical Refining', digitalDemandTier: 'High', priorityTier: 2, source: 'US Census Bureau / Mobile Area Chamber', researchDate: '2026-Q1', commercialProfile: 'Major Gulf Coast container port and international aerospace assembly corridor.', remoteDeliveryFit: 'High - Central Time Zone.' },
  { state: 'Alabama', stateCode: 'AL', stateSlug: 'alabama', city: 'Montgomery', citySlug: 'montgomery', county: 'Montgomery County', metroArea: 'Montgomery Metro Area', population: 196986, populationYear: '2023 US Census', majorIndustries: 'State Government, Military (Maxwell AFB), Automotive Assembly (Hyundai Motor), IT Defense Contracting', digitalDemandTier: 'Moderate', priorityTier: 3, source: 'US Census Bureau', researchDate: '2026-Q1', commercialProfile: 'State capital and defense IT contracting hub.', remoteDeliveryFit: 'High - Central Time Zone.' },
  { state: 'Alabama', stateCode: 'AL', stateSlug: 'alabama', city: 'Tuscaloosa', citySlug: 'tuscaloosa', county: 'Tuscaloosa County', metroArea: 'Tuscaloosa Metro Area', population: 110602, populationYear: '2023 US Census', majorIndustries: 'Automotive (Mercedes-Benz US International), Higher Education (Univ of Alabama), Healthcare', digitalDemandTier: 'Moderate', priorityTier: 3, source: 'US Census Bureau', researchDate: '2026-Q1', commercialProfile: 'Automotive manufacturing and university research center.', remoteDeliveryFit: 'High - Central Time Zone.' },

  // ALASKA
  { state: 'Alaska', stateCode: 'AK', stateSlug: 'alaska', city: 'Anchorage', citySlug: 'anchorage', county: 'Anchorage Municipality', metroArea: 'Anchorage Metro Area', population: 286075, populationYear: '2023 US Census', majorIndustries: 'Global Air Cargo Logistics (Ted Stevens Airport), Oil & Gas, Tourism, Military & Defense, Commercial Seafood', digitalDemandTier: 'High', priorityTier: 2, source: 'US Census Bureau / Anchorage Economic Development Corp', researchDate: '2026-Q1', commercialProfile: 'Strategic global crossroads for international air cargo and Alaska corporate center.', remoteDeliveryFit: 'High - Alaska Time Zone, highly reliant on remote digital vendors.' },
  { state: 'Alaska', stateCode: 'AK', stateSlug: 'alaska', city: 'Fairbanks', citySlug: 'fairbanks', county: 'Fairbanks North Star Borough', metroArea: 'Fairbanks Metro Area', population: 31737, populationYear: '2023 US Census', majorIndustries: 'Arctic Research, Military (Fort Wainwright), Mining, Tourism', digitalDemandTier: 'Moderate', priorityTier: 3, source: 'US Census Bureau', researchDate: '2026-Q1', commercialProfile: 'Interior Alaska service center and arctic scientific research hub.', remoteDeliveryFit: 'High - Remote engagement.' },
  { state: 'Alaska', stateCode: 'AK', stateSlug: 'alaska', city: 'Juneau', citySlug: 'juneau', county: 'City and Borough of Juneau', metroArea: 'Juneau Micro Area', population: 31555, populationYear: '2023 US Census', majorIndustries: 'State Government, Cruise Tourism, Commercial Fisheries, Mining', digitalDemandTier: 'Moderate', priorityTier: 3, source: 'US Census Bureau', researchDate: '2026-Q1', commercialProfile: 'State capital and Southeast Alaska maritime commercial center.', remoteDeliveryFit: 'High - Remote engagement.' },

  // ARIZONA
  { state: 'Arizona', stateCode: 'AZ', stateSlug: 'arizona', city: 'Tucson', citySlug: 'tucson', county: 'Pima County', metroArea: 'Tucson Metro Area (Optics Valley)', population: 546574, populationYear: '2023 US Census', majorIndustries: 'Optics & Photonics (Optics Valley), Aerospace & Defense (Raytheon Missiles), Higher Education (Univ of Arizona), Healthcare, Solar Tech', digitalDemandTier: 'High', priorityTier: 2, source: 'US Census Bureau / Sun Corridor Inc.', researchDate: '2026-Q1', commercialProfile: 'Optics Valley of the world with major aerospace defense manufacturing.', remoteDeliveryFit: 'High - Mountain Time Zone.' },
  { state: 'Arizona', stateCode: 'AZ', stateSlug: 'arizona', city: 'Peoria', citySlug: 'peoria', county: 'Maricopa / Yavapai', metroArea: 'Phoenix-Mesa-Chandler Metro Area', population: 197866, populationYear: '2023 US Census', majorIndustries: 'Healthcare Services, Manufacturing, Semiconductor Supply Chain, Sports Tourism', digitalDemandTier: 'High', priorityTier: 2, source: 'US Census Bureau', researchDate: '2026-Q1', commercialProfile: 'Fast-growing Northwest Phoenix valley community with expanding healthcare campuses.', remoteDeliveryFit: 'High - Mountain Time Zone.' },
  { state: 'Arizona', stateCode: 'AZ', stateSlug: 'arizona', city: 'Surprise', citySlug: 'surprise', county: 'Maricopa County', metroArea: 'Phoenix-Mesa-Chandler Metro Area', population: 154690, populationYear: '2023 US Census', majorIndustries: 'Residential Development, Healthcare, Retail Trade, Distribution', digitalDemandTier: 'Moderate', priorityTier: 3, source: 'US Census Bureau', researchDate: '2026-Q1', commercialProfile: 'Rapidly expanding residential and small business hub in Greater Phoenix.', remoteDeliveryFit: 'High - Mountain Time Zone.' },
  { state: 'Arizona', stateCode: 'AZ', stateSlug: 'arizona', city: 'Flagstaff', citySlug: 'flagstaff', county: 'Coconino County', metroArea: 'Flagstaff Metro Area', population: 76989, populationYear: '2023 US Census', majorIndustries: 'Biomedical Manufacturing (W.L. Gore), Astronomy & Planetary Science, Higher Ed (NAU), Mountain Tourism', digitalDemandTier: 'Moderate', priorityTier: 3, source: 'US Census Bureau', researchDate: '2026-Q1', commercialProfile: 'Northern Arizona commercial and medical device manufacturing center.', remoteDeliveryFit: 'High - Mountain Time Zone.' },

  // ARKANSAS
  { state: 'Arkansas', stateCode: 'AR', stateSlug: 'arkansas', city: 'Fayetteville', citySlug: 'fayetteville', county: 'Washington County', metroArea: 'Northwest Arkansas Metro Area', population: 99288, populationYear: '2023 US Census', majorIndustries: 'Higher Education (Univ of Arkansas), Retail Tech Incubators, Transportation Logistics, Food Science', digitalDemandTier: 'High', priorityTier: 2, source: 'US Census Bureau / Northwest Arkansas Council', researchDate: '2026-Q1', commercialProfile: 'Anchor of the Northwest Arkansas economic powerhouse.', remoteDeliveryFit: 'High - Central Time Zone.' },
  { state: 'Arkansas', stateCode: 'AR', stateSlug: 'arkansas', city: 'Bentonville', citySlug: 'bentonville', county: 'Benton County', metroArea: 'Northwest Arkansas Metro Area', population: 57868, populationYear: '2023 US Census', majorIndustries: 'Global Retail Headquarters (Walmart World HQ), Supply Chain Tech, Venture Capital, Aviation, Culture', digitalDemandTier: 'High', priorityTier: 2, source: 'US Census Bureau / Greater Bentonville Chamber', researchDate: '2026-Q1', commercialProfile: 'World retail capital. Thousands of national brand vendor offices require sophisticated digital portals.', remoteDeliveryFit: 'Exceptional - Central Time Zone, national vendor ecosystem.' },
  { state: 'Arkansas', stateCode: 'AR', stateSlug: 'arkansas', city: 'Fort Smith', citySlug: 'fort-smith', county: 'Sebastian County', metroArea: 'Fort Smith Metro Area', population: 89773, populationYear: '2023 US Census', majorIndustries: 'Advanced Manufacturing, Defense Aviation (Ebbing Air National Guard Base), Logistics, Healthcare', digitalDemandTier: 'Moderate', priorityTier: 3, source: 'US Census Bureau', researchDate: '2026-Q1', commercialProfile: 'Historic manufacturing and military aviation center on the Arkansas River.', remoteDeliveryFit: 'High - Central Time Zone.' },
  { state: 'Arkansas', stateCode: 'AR', stateSlug: 'arkansas', city: 'Jonesboro', citySlug: 'jonesboro', county: 'Craighead County', metroArea: 'Jonesboro Metro Area', population: 81418, populationYear: '2023 US Census', majorIndustries: 'Food Processing (Nestlé), Healthcare, Higher Education (Arkansas State Univ), Agriculture', digitalDemandTier: 'Moderate', priorityTier: 3, source: 'US Census Bureau', researchDate: '2026-Q1', commercialProfile: 'Commercial and healthcare center of Northeast Arkansas.', remoteDeliveryFit: 'High - Central Time Zone.' },

  // CALIFORNIA
  { state: 'California', stateCode: 'CA', stateSlug: 'california', city: 'Palo Alto', citySlug: 'palo-alto', county: 'Santa Clara County', metroArea: 'San Jose-Sunnyvale-Santa Clara Metro Area (Silicon Valley)', population: 66666, populationYear: '2023 US Census', majorIndustries: 'Venture Capital (Sand Hill Road), Artificial Intelligence, Software Engineering, Stanford University', digitalDemandTier: 'Tier 1 Priority', priorityTier: 2, source: 'US Census Bureau / Palo Alto Chamber', researchDate: '2026-Q1', commercialProfile: 'Heart of Silicon Valley innovation and venture capital on Sand Hill Road.', remoteDeliveryFit: 'Exceptional - Pacific Time Zone, premier tech hub.' },
  { state: 'California', stateCode: 'CA', stateSlug: 'california', city: 'Mountain View', citySlug: 'mountain-view', county: 'Santa Clara County', metroArea: 'San Jose-Sunnyvale-Santa Clara Metro Area (Silicon Valley)', population: 82376, populationYear: '2023 US Census', majorIndustries: 'Global Tech Headquarters (Google/Alphabet HQ), Machine Learning, Cloud Services, Biotech', digitalDemandTier: 'Tier 1 Priority', priorityTier: 2, source: 'US Census Bureau', researchDate: '2026-Q1', commercialProfile: 'Global headquarters of Google and leading computer software innovators.', remoteDeliveryFit: 'Exceptional - Pacific Time Zone.' },
  { state: 'California', stateCode: 'CA', stateSlug: 'california', city: 'Cupertino', citySlug: 'cupertino', county: 'Santa Clara County', metroArea: 'San Jose-Sunnyvale-Santa Clara Metro Area (Silicon Valley)', population: 59371, populationYear: '2023 US Census', majorIndustries: 'Consumer Hardware & Software (Apple Park World HQ), Semiconductor Engineering, Mobile Tech', digitalDemandTier: 'Tier 1 Priority', priorityTier: 2, source: 'US Census Bureau', researchDate: '2026-Q1', commercialProfile: 'World headquarters of Apple and premier mobile computing ecosystem.', remoteDeliveryFit: 'Exceptional - Pacific Time Zone.' },
  { state: 'California', stateCode: 'CA', stateSlug: 'california', city: 'Menlo Park', citySlug: 'menlo-park', county: 'San Mateo County', metroArea: 'San Francisco-Oakland-Berkeley Metro Area (Silicon Valley)', population: 33261, populationYear: '2023 US Census', majorIndustries: 'Social Media & VR (Meta/Facebook World HQ), Venture Capital, Biotechnology, Financial Tech', digitalDemandTier: 'Tier 1 Priority', priorityTier: 2, source: 'US Census Bureau', researchDate: '2026-Q1', commercialProfile: 'Global headquarters of Meta and venture capital titan Sand Hill Road corridor.', remoteDeliveryFit: 'Exceptional - Pacific Time Zone.' },
  { state: 'California', stateCode: 'CA', stateSlug: 'california', city: 'Carlsbad', citySlug: 'carlsbad', county: 'San Diego County', metroArea: 'San Diego-Chula Vista-Carlsbad Metro Area', population: 114795, populationYear: '2023 US Census', majorIndustries: 'Life Sciences & Medical Tech, Golf & Action Sports Equipment (Callaway, TaylorMade), Clean Energy, Software', digitalDemandTier: 'High', priorityTier: 2, source: 'US Census Bureau / City of Carlsbad Innovation', researchDate: '2026-Q1', commercialProfile: 'North County San Diego innovation hub for medical technology and sports gear.', remoteDeliveryFit: 'High - Pacific Time Zone.' },
  { state: 'California', stateCode: 'CA', stateSlug: 'california', city: 'Chula Vista', citySlug: 'chula-vista', county: 'San Diego County', metroArea: 'San Diego-Chula Vista-Carlsbad Metro Area', population: 275487, populationYear: '2023 US Census', majorIndustries: 'Cross-Border International Trade, Aerospace Aerostructures (Collins Aerospace), Marine Tech, Healthcare', digitalDemandTier: 'High', priorityTier: 2, source: 'US Census Bureau', researchDate: '2026-Q1', commercialProfile: 'Second-largest city in San Diego County with extensive bayfront redevelopment.', remoteDeliveryFit: 'High - Pacific Time Zone.' },
  { state: 'California', stateCode: 'CA', stateSlug: 'california', city: 'Ontario', citySlug: 'ontario', county: 'San Bernardino County', metroArea: 'Riverside-San Bernardino-Ontario Metro Area (Inland Empire)', population: 179267, populationYear: '2023 US Census', majorIndustries: 'International Air Cargo (Ontario International Airport), Multimodal Logistics, Warehousing, Advanced Manufacturing', digitalDemandTier: 'High', priorityTier: 2, source: 'US Census Bureau', researchDate: '2026-Q1', commercialProfile: 'Logistics engine of the Inland Empire with major freight and manufacturing operations.', remoteDeliveryFit: 'High - Pacific Time Zone.' },
  { state: 'California', stateCode: 'CA', stateSlug: 'california', city: 'San Bernardino', citySlug: 'san-bernardino', county: 'San Bernardino County', metroArea: 'Riverside-San Bernardino-Ontario Metro Area (Inland Empire)', population: 222101, populationYear: '2023 US Census', majorIndustries: 'Supply Chain Fulfillment (Amazon Hubs), Intermodal Rail Logistics, Government Services, Health Care', digitalDemandTier: 'Moderate', priorityTier: 3, source: 'US Census Bureau', researchDate: '2026-Q1', commercialProfile: 'Inland Empire rail logistics and distribution gateway.', remoteDeliveryFit: 'High - Pacific Time Zone.' },
  { state: 'California', stateCode: 'CA', stateSlug: 'california', city: 'Santa Barbara', citySlug: 'santa-barbara', county: 'Santa Barbara County', metroArea: 'Santa Barbara Metro Area', population: 87533, populationYear: '2023 US Census', majorIndustries: 'Software & Cloud SaaS (AppFolio, Procore nearby), Defense Tech (Raytheon, FLIR), Aerospace, Luxury Tourism, Wine', digitalDemandTier: 'High', priorityTier: 2, source: 'US Census Bureau', researchDate: '2026-Q1', commercialProfile: 'Silicon Beach North. High density of successful B2B SaaS software companies and luxury brands.', remoteDeliveryFit: 'High - Pacific Time Zone.' },
  { state: 'California', stateCode: 'CA', stateSlug: 'california', city: 'San Luis Obispo', citySlug: 'san-luis-obispo', county: 'San Luis Obispo County', metroArea: 'San Luis Obispo Metro Area (Central Coast)', population: 47088, populationYear: '2023 US Census', majorIndustries: 'Software Development, Engineering & Tech (Cal Poly SLO), Wine Production, Tourism, Agriculture', digitalDemandTier: 'Moderate', priorityTier: 3, source: 'US Census Bureau', researchDate: '2026-Q1', commercialProfile: 'Central Coast technology incubator powered by Cal Poly engineering talent.', remoteDeliveryFit: 'High - Pacific Time Zone.' },
  { state: 'California', stateCode: 'CA', stateSlug: 'california', city: 'Modesto', citySlug: 'modesto', county: 'Stanislaus County', metroArea: 'Modesto Metro Area (Central Valley)', population: 218464, populationYear: '2023 US Census', majorIndustries: 'Wine & Spirits (E. & J. Gallo Winery HQ), Food Processing, Agriculture, Distribution', digitalDemandTier: 'Moderate', priorityTier: 3, source: 'US Census Bureau', researchDate: '2026-Q1', commercialProfile: 'Central Valley agricultural and winery manufacturing capital.', remoteDeliveryFit: 'High - Pacific Time Zone.' },

  // COLORADO
  { state: 'Colorado', stateCode: 'CO', stateSlug: 'colorado', city: 'Lakewood', citySlug: 'lakewood', county: 'Jefferson County', metroArea: 'Denver-Aurora-Lakewood Metro Area', population: 155984, populationYear: '2023 US Census', majorIndustries: 'Federal Center Agencies, Medical Technology (Terumo BCT), Mining & Engineering Services, Real Estate', digitalDemandTier: 'High', priorityTier: 2, source: 'US Census Bureau', researchDate: '2026-Q1', commercialProfile: 'Western Denver commercial anchor housing the Denver Federal Center.', remoteDeliveryFit: 'High - Mountain Time Zone.' },
  { state: 'Colorado', stateCode: 'CO', stateSlug: 'colorado', city: 'Longmont', citySlug: 'longmont', county: 'Boulder / Weld', metroArea: 'Boulder Metro Area', population: 98887, populationYear: '2023 US Census', majorIndustries: 'Semiconductors & Data Storage (Seagate, Micron), Bioscience, Municipal Gig-Fiber Tech, Craft Brewing', digitalDemandTier: 'Moderate', priorityTier: 3, source: 'US Census Bureau', researchDate: '2026-Q1', commercialProfile: 'High-tech data storage and photonics corridor in Northern Colorado.', remoteDeliveryFit: 'High - Mountain Time Zone.' },
  { state: 'Colorado', stateCode: 'CO', stateSlug: 'colorado', city: 'Grand Junction', citySlug: 'grand-junction', county: 'Mesa County', metroArea: 'Grand Junction Metro Area (Western Slope)', population: 66964, populationYear: '2023 US Census', majorIndustries: 'Regional Healthcare, Energy & Minerals, Outdoor Recreation, Agriculture & Orchards', digitalDemandTier: 'Moderate', priorityTier: 3, source: 'US Census Bureau', researchDate: '2026-Q1', commercialProfile: 'Commercial and medical capital of Colorado’s Western Slope.', remoteDeliveryFit: 'High - Mountain Time Zone.' },

  // CONNECTICUT
  { state: 'Connecticut', stateCode: 'CT', stateSlug: 'connecticut', city: 'Stamford', citySlug: 'stamford', county: 'Fairfield County', metroArea: 'Bridgeport-Stamford-Norwalk Metro Area', population: 135470, populationYear: '2023 US Census', majorIndustries: 'Financial Services & Hedge Funds, Media Production (WWE HQ), Corporate HQs (Charter Communications, Synchrony), Digital Tech', digitalDemandTier: 'High', priorityTier: 2, source: 'US Census Bureau / Stamford Chamber', researchDate: '2026-Q1', commercialProfile: 'Financial and media powerhouse in suburban NYC Gold Coast corridor.', remoteDeliveryFit: 'High - Eastern Time Zone.' },
  { state: 'Connecticut', stateCode: 'CT', stateSlug: 'connecticut', city: 'Bridgeport', citySlug: 'bridgeport', county: 'Fairfield County', metroArea: 'Bridgeport-Stamford-Norwalk Metro Area', population: 148654, populationYear: '2023 US Census', majorIndustries: 'Healthcare Systems, Maritime Port Commerce, Precision Manufacturing, Higher Education', digitalDemandTier: 'Moderate', priorityTier: 3, source: 'US Census Bureau', researchDate: '2026-Q1', commercialProfile: 'Largest city in Connecticut, undergoing industrial and coastal waterfront revitalization.', remoteDeliveryFit: 'High - Eastern Time Zone.' },
  { state: 'Connecticut', stateCode: 'CT', stateSlug: 'connecticut', city: 'Waterbury', citySlug: 'waterbury', county: 'New Haven County', metroArea: 'New Haven Metro Area', population: 114403, populationYear: '2023 US Census', majorIndustries: 'Precision Metal Fabrication, Healthcare, Regional Retail, Education', digitalDemandTier: 'Moderate', priorityTier: 3, source: 'US Census Bureau', researchDate: '2026-Q1', commercialProfile: 'Historic brass manufacturing hub transitioning to healthcare and precision tooling.', remoteDeliveryFit: 'High - Eastern Time Zone.' },
  { state: 'Connecticut', stateCode: 'CT', stateSlug: 'connecticut', city: 'Greenwich', citySlug: 'greenwich', county: 'Fairfield County', metroArea: 'Bridgeport-Stamford-Norwalk Metro Area', population: 63518, populationYear: '2023 US Census', majorIndustries: 'Hedge Funds & Private Equity (Hedge Fund Capital of the World), Wealth Management, Luxury Real Estate', digitalDemandTier: 'High', priorityTier: 2, source: 'US Census Bureau', researchDate: '2026-Q1', commercialProfile: 'Hedge Fund Capital of the World. Unrivaled private wealth and asset management firms.', remoteDeliveryFit: 'Exceptional - Eastern Time Zone, elite finance clientele.' },

  // DELAWARE
  { state: 'Delaware', stateCode: 'DE', stateSlug: 'delaware', city: 'Wilmington', citySlug: 'wilmington-de', county: 'New Castle County', metroArea: 'Philadelphia-Camden-Wilmington Metro Area', population: 70898, populationYear: '2023 US Census', majorIndustries: 'Corporate Financial Services (JPMorgan Chase, Capital One), Legal Services & Bankruptcy Law, Chemical Science (DuPont), Pharmaceuticals', digitalDemandTier: 'High', priorityTier: 2, source: 'US Census Bureau / Delaware Prosperity Partnership', researchDate: '2026-Q1', commercialProfile: 'Corporate Capital of America. Over 68% of Fortune 500 companies are incorporated in Delaware.', remoteDeliveryFit: 'High - Eastern Time Zone, elite legal and banking hub.' },
  { state: 'Delaware', stateCode: 'DE', stateSlug: 'delaware', city: 'Dover', citySlug: 'dover', county: 'Kent County', metroArea: 'Dover Metro Area', population: 39403, populationYear: '2023 US Census', majorIndustries: 'State Government, Military Logistics (Dover AFB), Agriculture, Manufacturing', digitalDemandTier: 'Moderate', priorityTier: 3, source: 'US Census Bureau', researchDate: '2026-Q1', commercialProfile: 'State capital and central military air mobility hub.', remoteDeliveryFit: 'High - Eastern Time Zone.' },
  { state: 'Delaware', stateCode: 'DE', stateSlug: 'delaware', city: 'Newark', citySlug: 'newark-de', county: 'New Castle County', metroArea: 'Philadelphia-Camden-Wilmington Metro Area', population: 30601, populationYear: '2023 US Census', majorIndustries: 'Higher Education & Research (Univ of Delaware), Chemical Engineering, Automotive R&D, Fintech', digitalDemandTier: 'Moderate', priorityTier: 3, source: 'US Census Bureau', researchDate: '2026-Q1', commercialProfile: 'University town and research technology hub on the STAR Campus.', remoteDeliveryFit: 'High - Eastern Time Zone.' },

  // FLORIDA
  { state: 'Florida', stateCode: 'FL', stateSlug: 'florida', city: 'Tallahassee', citySlug: 'tallahassee', county: 'Leon County', metroArea: 'Tallahassee Metro Area', population: 201731, populationYear: '2023 US Census', majorIndustries: 'State Government & Policy, Higher Education (FSU, FAMU), Magnetics Research (National High Magnetic Field Lab), Healthcare', digitalDemandTier: 'High', priorityTier: 2, source: 'US Census Bureau / Tallahassee Chamber', researchDate: '2026-Q1', commercialProfile: 'Florida state capital and premier high-magnetic field physics research center.', remoteDeliveryFit: 'High - Eastern Time Zone.' },
  { state: 'Florida', stateCode: 'FL', stateSlug: 'florida', city: 'Sarasota', citySlug: 'sarasota', county: 'Sarasota County', metroArea: 'North Port-Sarasota-Bradenton Metro Area', population: 57602, populationYear: '2023 US Census', majorIndustries: 'Wealth Management, Luxury Real Estate Development, Healthcare Systems, Tourism & Culture, Marine Science', digitalDemandTier: 'High', priorityTier: 2, source: 'US Census Bureau / Sarasota Chamber', researchDate: '2026-Q1', commercialProfile: 'Affluent Gulf Coast cultural and wealth corridor with high demand for premium agency marketing.', remoteDeliveryFit: 'High - Eastern Time Zone.' },
  { state: 'Florida', stateCode: 'FL', stateSlug: 'florida', city: 'Naples', citySlug: 'naples', county: 'Collier County', metroArea: 'Naples-Marco Island Metro Area', population: 19115, populationYear: '2023 US Census', majorIndustries: 'High-Net-Worth Wealth Management, Luxury Real Estate, Medical Devices (Arthrex World HQ), Hospitality', digitalDemandTier: 'High', priorityTier: 2, source: 'US Census Bureau / Greater Naples Chamber', researchDate: '2026-Q1', commercialProfile: 'One of the wealthiest cities in North America. Medical device manufacturing and elite real estate.', remoteDeliveryFit: 'Exceptional - Eastern Time Zone, top-tier private wealth market.' },
  { state: 'Florida', stateCode: 'FL', stateSlug: 'florida', city: 'Gainesville', citySlug: 'gainesville', county: 'Alachua County', metroArea: 'Gainesville Metro Area', population: 145214, populationYear: '2023 US Census', majorIndustries: 'Higher Education & Research (Univ of Florida), Biotech & Incubators (Sid Martin Biotech), Healthcare (UF Health Shands)', digitalDemandTier: 'High', priorityTier: 2, source: 'US Census Bureau / Greater Gainesville Chamber', researchDate: '2026-Q1', commercialProfile: 'Biotech and university tech commercialization leader in North Florida.', remoteDeliveryFit: 'High - Eastern Time Zone.' },
  { state: 'Florida', stateCode: 'FL', stateSlug: 'florida', city: 'Pensacola', citySlug: 'pensacola', county: 'Escambia County', metroArea: 'Pensacola-Ferry Pass-Brent Metro Area', population: 54312, populationYear: '2023 US Census', majorIndustries: 'Cybersecurity & Financial Services (Navy Federal Credit Union Operations), Naval Aviation (NAS Pensacola), Tourism', digitalDemandTier: 'Moderate', priorityTier: 3, source: 'US Census Bureau', researchDate: '2026-Q1', commercialProfile: 'Cradle of Naval Aviation and rapidly growing financial tech corridor.', remoteDeliveryFit: 'High - Central Time Zone.' },
  { state: 'Florida', stateCode: 'FL', stateSlug: 'florida', city: 'Cape Coral', citySlug: 'cape-coral', county: 'Lee County', metroArea: 'Cape Coral-Fort Myers Metro Area', population: 224455, populationYear: '2023 US Census', majorIndustries: 'Residential Construction, Health Care Services, Commercial Contracting, Tourism, Retail', digitalDemandTier: 'High', priorityTier: 2, source: 'US Census Bureau', researchDate: '2026-Q1', commercialProfile: 'Fastest-growing master-planned canal city in Southwest Florida with heavy construction and services.', remoteDeliveryFit: 'High - Eastern Time Zone.' },
  { state: 'Florida', stateCode: 'FL', stateSlug: 'florida', city: 'Melbourne', citySlug: 'melbourne', county: 'Brevard County', metroArea: 'Palm Bay-Melbourne-Titusville Metro Area (Space Coast)', population: 86494, populationYear: '2023 US Census', majorIndustries: 'Aerospace & Space Launch (L3Harris HQ, Northrop Grumman, SpaceX), Defense Electronics, Tech Hardware', digitalDemandTier: 'High', priorityTier: 2, source: 'US Census Bureau / Economic Development Commission of Florida’s Space Coast', researchDate: '2026-Q1', commercialProfile: 'Space Coast aerospace and defense electronics innovation corridor.', remoteDeliveryFit: 'High - Eastern Time Zone.' },

  // GEORGIA
  { state: 'Georgia', stateCode: 'GA', stateSlug: 'georgia', city: 'Augusta', citySlug: 'augusta', county: 'Richmond County', metroArea: 'Augusta-Richmond County Metro Area', population: 202081, populationYear: '2023 US Census', majorIndustries: 'National Cybersecurity Center (US Army Cyber Command at Fort Eisenhower), Medical Healthcare (Augusta University), Nuclear Energy', digitalDemandTier: 'High', priorityTier: 2, source: 'US Census Bureau / Augusta Economic Development Authority', researchDate: '2026-Q1', commercialProfile: 'Cyber District of the Southeast and national military cyber operations command.', remoteDeliveryFit: 'High - Eastern Time Zone.' },
  { state: 'Georgia', stateCode: 'GA', stateSlug: 'georgia', city: 'Columbus', citySlug: 'columbus-ga', county: 'Muscogee County', metroArea: 'Columbus Metro Area', population: 202627, populationYear: '2023 US Census', majorIndustries: 'Financial & Insurance (Aflac World HQ), Payment Processing (TSYS/Global Payments), Defense (Fort Moore)', digitalDemandTier: 'Moderate', priorityTier: 3, source: 'US Census Bureau / Greater Columbus Chamber', researchDate: '2026-Q1', commercialProfile: 'Major corporate insurance and credit payment processing center.', remoteDeliveryFit: 'High - Eastern Time Zone.' },
  { state: 'Georgia', stateCode: 'GA', stateSlug: 'georgia', city: 'Macon', citySlug: 'macon', county: 'Bibb County', metroArea: 'Macon-Bibb County Metro Area', population: 157346, populationYear: '2023 US Census', majorIndustries: 'Aerospace Maintenance (Robins AFB nearby), Advanced Manufacturing, Healthcare, Higher Education', digitalDemandTier: 'Moderate', priorityTier: 3, source: 'US Census Bureau', researchDate: '2026-Q1', commercialProfile: 'Central Georgia transportation crossroads and aerospace maintenance hub.', remoteDeliveryFit: 'High - Eastern Time Zone.' },
  { state: 'Georgia', stateCode: 'GA', stateSlug: 'georgia', city: 'Athens', citySlug: 'athens', county: 'Clarke County', metroArea: 'Athens-Clarke County Metro Area', population: 128561, populationYear: '2023 US Census', majorIndustries: 'Higher Education & Research (Univ of Georgia), Bioscience & Poultry Disease Research, Music & Culture, Biotech', digitalDemandTier: 'Moderate', priorityTier: 3, source: 'US Census Bureau', researchDate: '2026-Q1', commercialProfile: 'University research center and creative startup community in Northeast Georgia.', remoteDeliveryFit: 'High - Eastern Time Zone.' },

  // HAWAII
  { state: 'Hawaii', stateCode: 'HI', stateSlug: 'hawaii', city: 'Honolulu', citySlug: 'honolulu', county: 'Honolulu County (Oahu)', metroArea: 'Urban Honolulu Metro Area', population: 343421, populationYear: '2023 US Census', majorIndustries: 'Tourism & Luxury Hospitality, Military Defense (US Indo-Pacific Command), International Trade, Healthcare, Clean Tech', digitalDemandTier: 'High', priorityTier: 2, source: 'US Census Bureau / Chamber of Commerce Hawaii', researchDate: '2026-Q1', commercialProfile: 'Pacific crossroads connecting the US mainland with East Asia and Oceania.', remoteDeliveryFit: 'High - Hawaii Time Zone, highly dependent on remote digital services.' },
  { state: 'Hawaii', stateCode: 'HI', stateSlug: 'hawaii', city: 'Hilo', citySlug: 'hilo', county: 'Hawaii County (Big Island)', metroArea: 'Hilo Micro Area', population: 45703, populationYear: '2023 US Census', majorIndustries: 'Astronomy & Observatories (Mauna Kea), Tropical Agriculture, Sustainable Energy, Tourism', digitalDemandTier: 'Moderate', priorityTier: 3, source: 'US Census Bureau', researchDate: '2026-Q1', commercialProfile: 'Big Island administrative center and international astronomical research nexus.', remoteDeliveryFit: 'High - Remote engagement.' },

  // IDAHO
  { state: 'Idaho', stateCode: 'ID', stateSlug: 'idaho', city: 'Meridian', citySlug: 'meridian', county: 'Ada County', metroArea: 'Boise City Metro Area (Treasure Valley)', population: 134159, populationYear: '2023 US Census', majorIndustries: 'Healthcare Systems, Technology Startups, Corporate Parks, Residential Construction', digitalDemandTier: 'High', priorityTier: 2, source: 'US Census Bureau', researchDate: '2026-Q1', commercialProfile: 'Fastest-growing city in Idaho, serving as the commercial and medical center of the Treasure Valley.', remoteDeliveryFit: 'High - Mountain Time Zone.' },
  { state: 'Idaho', stateCode: 'ID', stateSlug: 'idaho', city: 'Nampa', citySlug: 'nampa', county: 'Canyon County', metroArea: 'Boise City Metro Area (Treasure Valley)', population: 110951, populationYear: '2023 US Census', majorIndustries: 'Food Processing, Manufacturing, Logistics, Agribusiness, Technology', digitalDemandTier: 'Moderate', priorityTier: 3, source: 'US Census Bureau', researchDate: '2026-Q1', commercialProfile: 'Major agricultural food processing and manufacturing community west of Boise.', remoteDeliveryFit: 'High - Mountain Time Zone.' },
  { state: 'Idaho', stateCode: 'ID', stateSlug: 'idaho', city: 'Idaho Falls', citySlug: 'idaho-falls', county: 'Bonneville County', metroArea: 'Idaho Falls Metro Area', population: 66814, populationYear: '2023 US Census', majorIndustries: 'Nuclear Energy Science (Idaho National Laboratory), Energy Tech, Healthcare, Agriculture', digitalDemandTier: 'Moderate', priorityTier: 3, source: 'US Census Bureau / Eastern Idaho EDC', researchDate: '2026-Q1', commercialProfile: 'Eastern Idaho hub and headquarters for the nation’s premier nuclear energy laboratory (INL).', remoteDeliveryFit: 'High - Mountain Time Zone.' },

  // ILLINOIS
  { state: 'Illinois', stateCode: 'IL', stateSlug: 'illinois', city: 'Naperville', citySlug: 'naperville', county: 'DuPage / Will', metroArea: 'Chicago-Naperville-Elgin Metro Area (Illinois Tech Corridor)', population: 149936, populationYear: '2023 US Census', majorIndustries: 'Technology & Telecommunications (Bell Labs legacy, Nokia), Research Laboratories (Argonne, Fermilab nearby), Financial Planning', digitalDemandTier: 'High', priorityTier: 2, source: 'US Census Bureau / Naperville Development Partnership', researchDate: '2026-Q1', commercialProfile: 'Premier affluent Western Chicago suburb with top-rated public schools and high technology density.', remoteDeliveryFit: 'Exceptional - Central Time Zone, corporate and tech focus.'
  },
  { state: 'Illinois', stateCode: 'IL', stateSlug: 'illinois', city: 'Peoria', citySlug: 'peoria-il', county: 'Peoria County', metroArea: 'Peoria Metro Area', population: 111021, populationYear: '2023 US Census', majorIndustries: 'Heavy Machinery & Earthmoving Equipment (Caterpillar legacy), Healthcare & Medical (OSF HealthCare), Agricultural Biotech', digitalDemandTier: 'Moderate', priorityTier: 3, source: 'US Census Bureau / Greater Peoria EDC', researchDate: '2026-Q1', commercialProfile: 'Central Illinois manufacturing and regional medical center.', remoteDeliveryFit: 'High - Central Time Zone.' },
  { state: 'Illinois', stateCode: 'IL', stateSlug: 'illinois', city: 'Rockford', citySlug: 'rockford', county: 'Winnebago County', metroArea: 'Rockford Metro Area', population: 146168, populationYear: '2023 US Census', majorIndustries: 'Aerospace Components, Precision Fastener Manufacturing, Automotive Supply, Air Freight Logistics', digitalDemandTier: 'Moderate', priorityTier: 3, source: 'US Census Bureau', researchDate: '2026-Q1', commercialProfile: 'Northern Illinois manufacturing and air cargo freight center.', remoteDeliveryFit: 'High - Central Time Zone.' },
  { state: 'Illinois', stateCode: 'IL', stateSlug: 'illinois', city: 'Springfield', citySlug: 'springfield-il', county: 'Sangamon County', metroArea: 'Springfield Metro Area', population: 113273, populationYear: '2023 US Census', majorIndustries: 'State Government & Legislature, Healthcare Systems, Legal Services, Agriculture', digitalDemandTier: 'Moderate', priorityTier: 3, source: 'US Census Bureau', researchDate: '2026-Q1', commercialProfile: 'State capital of Illinois and central medical destination.', remoteDeliveryFit: 'High - Central Time Zone.' },

  // INDIANA
  { state: 'Indiana', stateCode: 'IN', stateSlug: 'indiana', city: 'Fort Wayne', citySlug: 'fort-wayne', county: 'Allen County', metroArea: 'Fort Wayne Metro Area', population: 267927, populationYear: '2023 US Census', majorIndustries: 'Defense Electronics (L3Harris, BAE Systems), Medical Orthopedic Devices, Logistics, Financial Services', digitalDemandTier: 'High', priorityTier: 2, source: 'US Census Bureau / Greater Fort Wayne Inc.', researchDate: '2026-Q1', commercialProfile: 'Second-largest city in Indiana with deep defense engineering and orthopedic device manufacturing.', remoteDeliveryFit: 'High - Eastern Time Zone.' },
  { state: 'Indiana', stateCode: 'IN', stateSlug: 'indiana', city: 'South Bend', citySlug: 'south-bend', county: 'St. Joseph County', metroArea: 'South Bend-Mishawaka Metro Area', population: 103353, populationYear: '2023 US Census', majorIndustries: 'Higher Education (Univ of Notre Dame), Data & Tech Parks (Ignition Park), Healthcare, Advanced Logistics', digitalDemandTier: 'Moderate', priorityTier: 3, source: 'US Census Bureau', researchDate: '2026-Q1', commercialProfile: 'University research and data center park hub in Northern Indiana.', remoteDeliveryFit: 'High - Eastern Time Zone.' },
  { state: 'Indiana', stateCode: 'IN', stateSlug: 'indiana', city: 'Evansville', citySlug: 'evansville', county: 'Vanderburgh County', metroArea: 'Evansville Metro Area', population: 115749, populationYear: '2023 US Census', majorIndustries: 'Plastics & Polymer Manufacturing (Berry Global HQ), Healthcare, Energy, Multimodal River Port', digitalDemandTier: 'Moderate', priorityTier: 3, source: 'US Census Bureau', researchDate: '2026-Q1', commercialProfile: 'Commercial capital of the Tri-State region and plastics packaging leader.', remoteDeliveryFit: 'High - Central Time Zone.' },
  { state: 'Indiana', stateCode: 'IN', stateSlug: 'indiana', city: 'Carmel', citySlug: 'carmel', county: 'Hamilton County', metroArea: 'Indianapolis-Carmel-Anderson Metro Area', population: 100777, populationYear: '2023 US Census', majorIndustries: 'Corporate Headquarters (CNO Financial, Allegion), Financial Services, Tech Startups, High-Income Services', digitalDemandTier: 'High', priorityTier: 2, source: 'US Census Bureau / OneZone Chamber', researchDate: '2026-Q1', commercialProfile: 'Affluent Indianapolis corporate suburb with dense headquarters concentration.', remoteDeliveryFit: 'Exceptional - Eastern Time Zone, corporate decision-makers.' },

  // IOWA
  { state: 'Iowa', stateCode: 'IA', stateSlug: 'iowa', city: 'Cedar Rapids', citySlug: 'cedar-rapids', county: 'Linn County', metroArea: 'Cedar Rapids Metro Area', population: 136429, populationYear: '2023 US Census', majorIndustries: 'Avionics & Defense (Collins Aerospace), Food Processing (Quaker Oats, ADM), Telecommunications, Financial Services', digitalDemandTier: 'High', priorityTier: 2, source: 'US Census Bureau / Cedar Rapids Metro Economic Alliance', researchDate: '2026-Q1', commercialProfile: 'Avionics and defense communications powerhouse in Eastern Iowa.', remoteDeliveryFit: 'High - Central Time Zone.' },
  { state: 'Iowa', stateCode: 'IA', stateSlug: 'iowa', city: 'Davenport', citySlug: 'davenport', county: 'Scott County', metroArea: 'Quad Cities Metro Area', population: 100344, populationYear: '2023 US Census', majorIndustries: 'Heavy Agricultural Equipment (John Deere nearby), Advanced Metals (Arconic), Mississippi River Logistics, Defense (Rock Island Arsenal)', digitalDemandTier: 'Moderate', priorityTier: 3, source: 'US Census Bureau / Quad Cities Chamber', researchDate: '2026-Q1', commercialProfile: 'Largest of the Quad Cities, anchoring heavy machinery and river logistics.', remoteDeliveryFit: 'High - Central Time Zone.' },
  { state: 'Iowa', stateCode: 'IA', stateSlug: 'iowa', city: 'Iowa City', citySlug: 'iowa-city', county: 'Johnson County', metroArea: 'Iowa City Metro Area', population: 74596, populationYear: '2023 US Census', majorIndustries: 'Higher Education & Medical (Univ of Iowa Hospitals & Clinics), Educational Testing (ACT HQ), Biotechnology', digitalDemandTier: 'Moderate', priorityTier: 3, source: 'US Census Bureau', researchDate: '2026-Q1', commercialProfile: 'UNESCO City of Literature, world-renowned hospital system, and educational testing hub.', remoteDeliveryFit: 'High - Central Time Zone.' },

  // KANSAS
  { state: 'Kansas', stateCode: 'KS', stateSlug: 'kansas', city: 'Overland Park', citySlug: 'overland-park', county: 'Johnson County', metroArea: 'Kansas City Metro Area', population: 197106, populationYear: '2023 US Census', majorIndustries: 'Corporate Headquarters, Financial Advisory, Telecommunications, Healthcare Technology (Netsmart), Professional Engineering', digitalDemandTier: 'High', priorityTier: 2, source: 'US Census Bureau / Overland Park Chamber', researchDate: '2026-Q1', commercialProfile: 'Largest and wealthiest suburb of Kansas City with dense corporate headquarters.', remoteDeliveryFit: 'Exceptional - Central Time Zone, high corporate marketing budgets.' },
  { state: 'Kansas', stateCode: 'KS', stateSlug: 'kansas', city: 'Kansas City (KS)', citySlug: 'kansas-city-ks', county: 'Wyandotte County', metroArea: 'Kansas City Metro Area', population: 153345, populationYear: '2023 US Census', majorIndustries: 'Automotive Manufacturing (GM Fairfax Plant), Rail Logistics, Healthcare & Medical Center (KUMC), Sports Tourism', digitalDemandTier: 'Moderate', priorityTier: 3, source: 'US Census Bureau', researchDate: '2026-Q1', commercialProfile: 'Industrial, medical, and rail logistics hub on the Kansas side of the KC metro.', remoteDeliveryFit: 'High - Central Time Zone.' },
  { state: 'Kansas', stateCode: 'KS', stateSlug: 'kansas', city: 'Topeka', citySlug: 'topeka', county: 'Shawnee County', metroArea: 'Topeka Metro Area', population: 125963, populationYear: '2023 US Census', majorIndustries: 'State Government, Animal Health & Nutrition (Hill’s Pet Nutrition World HQ), Insurance Financial Services, Distribution', digitalDemandTier: 'Moderate', priorityTier: 3, source: 'US Census Bureau / Greater Topeka Partnership', researchDate: '2026-Q1', commercialProfile: 'Kansas state capital and animal science innovation corridor.', remoteDeliveryFit: 'High - Central Time Zone.' },

  // KENTUCKY
  { state: 'Kentucky', stateCode: 'KY', stateSlug: 'kentucky', city: 'Lexington', citySlug: 'lexington', county: 'Fayette County', metroArea: 'Lexington-Fayette Metro Area (Bluegrass Region)', population: 320154, populationYear: '2023 US Census', majorIndustries: 'Equine Industry (Horse Capital of the World), Higher Education (Univ of Kentucky), AgTech, Automotive Assembly (Toyota Georgetown nearby), Healthcare', digitalDemandTier: 'High', priorityTier: 2, source: 'US Census Bureau / Commerce Lexington', researchDate: '2026-Q1', commercialProfile: 'Horse Capital of the World and premier Bluegrass technology and healthcare hub.', remoteDeliveryFit: 'High - Eastern Time Zone.' },
  { state: 'Kentucky', stateCode: 'KY', stateSlug: 'kentucky', city: 'Bowling Green', citySlug: 'bowling-green', county: 'Warren County', metroArea: 'Bowling Green Metro Area', population: 76212, populationYear: '2023 US Census', majorIndustries: 'Automotive Manufacturing (Chevy Corvette Assembly Plant), Higher Education (WKU), Manufacturing, Distribution', digitalDemandTier: 'Moderate', priorityTier: 3, source: 'US Census Bureau / Bowling Green Area Chamber', researchDate: '2026-Q1', commercialProfile: 'Home of the Corvette and fast-growing South Central Kentucky manufacturing corridor.', remoteDeliveryFit: 'High - Central Time Zone.' },

  // LOUISIANA
  { state: 'Louisiana', stateCode: 'LA', stateSlug: 'louisiana', city: 'Shreveport', citySlug: 'shreveport', county: 'Caddo / Bossier', metroArea: 'Shreveport-Bossier City Metro Area', population: 180140, populationYear: '2023 US Census', majorIndustries: 'Natural Gas & Energy (Haynesville Shale), Defense Tech (Barksdale AFB - Global Strike Command), Healthcare, Gaming', digitalDemandTier: 'Moderate', priorityTier: 3, source: 'US Census Bureau / Greater Shreveport Chamber', researchDate: '2026-Q1', commercialProfile: 'Commercial center of the Ark-La-Tex region and Air Force Global Strike Command hub.', remoteDeliveryFit: 'High - Central Time Zone.' },
  { state: 'Louisiana', stateCode: 'LA', stateSlug: 'louisiana', city: 'Lafayette', citySlug: 'lafayette', county: 'Lafayette Parish', metroArea: 'Lafayette Metro Area (Acadiana)', population: 121524, populationYear: '2023 US Census', majorIndustries: 'Offshore Energy Technology, Healthcare, Technology & Software (CGI), Culture & Tourism, Higher Ed (UL Lafayette)', digitalDemandTier: 'Moderate', priorityTier: 3, source: 'US Census Bureau / One Acadiana', researchDate: '2026-Q1', commercialProfile: 'Heart of French Louisiana (Acadiana) with strong offshore energy and expanding tech services.', remoteDeliveryFit: 'High - Central Time Zone.' },

  // MAINE
  { state: 'Maine', stateCode: 'ME', stateSlug: 'maine', city: 'Portland', citySlug: 'portland-me', county: 'Cumberland County', metroArea: 'Portland-South Portland Metro Area', population: 68408, populationYear: '2023 US Census', majorIndustries: 'Veterinary Diagnostics & Pharma (IDEXX Laboratories HQ), Fintech & Payment Tech (WEX HQ), Craft Brewing & Food, Marine Trades, Tourism', digitalDemandTier: 'High', priorityTier: 2, source: 'US Census Bureau / Portland Regional Chamber', researchDate: '2026-Q1', commercialProfile: 'Economic capital of Maine with thriving veterinary biotech, fintech, and coastal hospitality.', remoteDeliveryFit: 'High - Eastern Time Zone.' },
  { state: 'Maine', stateCode: 'ME', stateSlug: 'maine', city: 'Bangor', citySlug: 'bangor', county: 'Penobscot County', metroArea: 'Bangor Metro Area', population: 31588, populationYear: '2023 US Census', majorIndustries: 'Regional Healthcare, Air Transportation Logistics, Retail Trade, Forestry Products', digitalDemandTier: 'Moderate', priorityTier: 3, source: 'US Census Bureau', researchDate: '2026-Q1', commercialProfile: 'Commercial, medical, and transport gateway to Central and Northern Maine.', remoteDeliveryFit: 'High - Eastern Time Zone.' },

  // MARYLAND
  { state: 'Maryland', stateCode: 'MD', stateSlug: 'maryland', city: 'Bethesda', citySlug: 'bethesda', county: 'Montgomery County', metroArea: 'Washington-Arlington-Alexandria Metro Area (I-270 Bio Corridor)', population: 68056, populationYear: '2023 US Census', majorIndustries: 'Biomedical Research (National Institutes of Health HQ, Walter Reed), Corporate HQs (Marriott International, Lockheed Martin), Health Tech', digitalDemandTier: 'Tier 1 Priority', priorityTier: 2, source: 'US Census Bureau / Montgomery County EDC', researchDate: '2026-Q1', commercialProfile: 'Global biomedical research capital on the I-270 Technology Corridor. Massive enterprise marketing budgets.', remoteDeliveryFit: 'Exceptional - Eastern Time Zone, elite health and defense clients.' },
  { state: 'Maryland', stateCode: 'MD', stateSlug: 'maryland', city: 'Silver Spring', citySlug: 'silver-spring', county: 'Montgomery County', metroArea: 'Washington-Arlington-Alexandria Metro Area', population: 81015, populationYear: '2023 US Census', majorIndustries: 'Federal Health Regulation (FDA World HQ), Digital Media, Nonprofits & Associations, Biotechnology', digitalDemandTier: 'High', priorityTier: 2, source: 'US Census Bureau', researchDate: '2026-Q1', commercialProfile: 'Headquarters of the US Food and Drug Administration and dense media hub.', remoteDeliveryFit: 'High - Eastern Time Zone.' },
  { state: 'Maryland', stateCode: 'MD', stateSlug: 'maryland', city: 'Frederick', citySlug: 'frederick', county: 'Frederick County', metroArea: 'Washington-Arlington-Alexandria Metro Area', population: 82175, populationYear: '2023 US Census', majorIndustries: 'Biodefense & Cancer Research (Fort Detrick, NCI), Advanced Biotechnology, Precision Manufacturing, Tourism', digitalDemandTier: 'High', priorityTier: 2, source: 'US Census Bureau / Frederick County OED', researchDate: '2026-Q1', commercialProfile: 'National biodefense research nexus at Fort Detrick and fast-growing tech corridor.', remoteDeliveryFit: 'High - Eastern Time Zone.' },
  { state: 'Maryland', stateCode: 'MD', stateSlug: 'maryland', city: 'Rockville', citySlug: 'rockville', county: 'Montgomery County', metroArea: 'Washington-Arlington-Alexandria Metro Area', population: 66922, populationYear: '2023 US Census', majorIndustries: 'Biotechnology & Clinical Pharma, Software & Video Games (Bethesda Softworks), County Seat Government', digitalDemandTier: 'High', priorityTier: 2, source: 'US Census Bureau', researchDate: '2026-Q1', commercialProfile: 'Heart of Maryland’s DNA Alley with dense biotech and video game development.', remoteDeliveryFit: 'High - Eastern Time Zone.' },

  // MASSACHUSETTS
  { state: 'Massachusetts', stateCode: 'MA', stateSlug: 'massachusetts', city: 'Cambridge', citySlug: 'cambridge', county: 'Middlesex County', metroArea: 'Boston-Cambridge-Newton Metro Area (Kendall Square)', population: 118403, populationYear: '2023 US Census', majorIndustries: 'Biotechnology & Pharma (Kendall Square), Artificial Intelligence, Higher Education (Harvard, MIT), Tech Giants (Google, Microsoft, Moderna HQ)', digitalDemandTier: 'Tier 1 Priority', priorityTier: 2, source: 'US Census Bureau / Cambridge Chamber', researchDate: '2026-Q1', commercialProfile: 'The most innovative square mile on Earth (Kendall Square). Unrivaled biotech venture capital.', remoteDeliveryFit: 'Exceptional - Eastern Time Zone, elite science and tech culture.' },
  { state: 'Massachusetts', stateCode: 'MA', stateSlug: 'massachusetts', city: 'Worcester', citySlug: 'worcester', county: 'Worcester County', metroArea: 'Worcester Metro Area', population: 205319, populationYear: '2023 US Census', majorIndustries: 'Biomedical & Life Sciences, Higher Education (WPI, UMass Chan Medical), Advanced Manufacturing, Robotics', digitalDemandTier: 'High', priorityTier: 2, source: 'US Census Bureau / Worcester Regional Chamber', researchDate: '2026-Q1', commercialProfile: 'Heart of the Commonwealth and second-largest city in New England with booming biomanufacturing.', remoteDeliveryFit: 'High - Eastern Time Zone.' },
  { state: 'Massachusetts', stateCode: 'MA', stateSlug: 'massachusetts', city: 'Springfield', citySlug: 'springfield-ma', county: 'Hampden County', metroArea: 'Springfield Metro Area (Pioneer Valley)', population: 153672, populationYear: '2023 US Census', majorIndustries: 'Financial Services & Insurance (MassMutual World HQ), Precision Machining, Healthcare, Higher Education', digitalDemandTier: 'Moderate', priorityTier: 3, source: 'US Census Bureau', researchDate: '2026-Q1', commercialProfile: 'City of Firsts and financial headquarters center in the Pioneer Valley.', remoteDeliveryFit: 'High - Eastern Time Zone.' },
  { state: 'Massachusetts', stateCode: 'MA', stateSlug: 'massachusetts', city: 'Lowell', citySlug: 'lowell', county: 'Middlesex County', metroArea: 'Boston-Cambridge-Newton Metro Area', population: 113606, populationYear: '2023 US Census', majorIndustries: 'Nanotechnology & Plastics Engineering (UMass Lowell), Clean Tech, Healthcare, Digital Media', digitalDemandTier: 'Moderate', priorityTier: 3, source: 'US Census Bureau', researchDate: '2026-Q1', commercialProfile: 'Cradle of the American Industrial Revolution, now focused on advanced plastics and tech.', remoteDeliveryFit: 'High - Eastern Time Zone.' },

  // MICHIGAN
  { state: 'Michigan', stateCode: 'MI', stateSlug: 'michigan', city: 'Grand Rapids', citySlug: 'grand-rapids', county: 'Kent County', metroArea: 'Grand Rapids-Kentwood Metro Area (West Michigan)', population: 196991, populationYear: '2023 US Census', majorIndustries: 'Office Furniture Design (Steelcase, Herman Miller), Medical Mile Healthcare & Research, Advanced Manufacturing, Food Processing, Consumer Goods (Amway)', digitalDemandTier: 'High', priorityTier: 2, source: 'US Census Bureau / The Right Place Inc.', researchDate: '2026-Q1', commercialProfile: 'Design and health research capital of West Michigan with dense corporate headquarters.', remoteDeliveryFit: 'High - Eastern Time Zone.' },
  { state: 'Michigan', stateCode: 'MI', stateSlug: 'michigan', city: 'Ann Arbor', citySlug: 'ann-arbor', county: 'Washtenaw County', metroArea: 'Ann Arbor Metro Area', population: 119875, populationYear: '2023 US Census', majorIndustries: 'Autonomous Vehicle Testing (Mcity), Higher Education (Univ of Michigan), Artificial Intelligence & Software, Healthcare, Biotech', digitalDemandTier: 'Tier 1 Priority', priorityTier: 2, source: 'US Census Bureau / Ann Arbor SPARK', researchDate: '2026-Q1', commercialProfile: 'Premier intellectual center of Michigan and national autonomous mobility software leader.', remoteDeliveryFit: 'Exceptional - Eastern Time Zone, elite engineering culture.' },
  { state: 'Michigan', stateCode: 'MI', stateSlug: 'michigan', city: 'Lansing', citySlug: 'lansing', county: 'Ingham / Eaton', metroArea: 'Lansing-East Lansing Metro Area', population: 112644, populationYear: '2023 US Census', majorIndustries: 'State Government, Automotive & EV Batteries (GM Assembly, Ultium Cells), Higher Ed (Michigan State Univ), Insurance HQs', digitalDemandTier: 'Moderate', priorityTier: 3, source: 'US Census Bureau / Lansing Regional Chamber', researchDate: '2026-Q1', commercialProfile: 'State capital and electric battery manufacturing corridor.', remoteDeliveryFit: 'High - Eastern Time Zone.' },
  { state: 'Michigan', stateCode: 'MI', stateSlug: 'michigan', city: 'Kalamazoo', citySlug: 'kalamazoo', county: 'Kalamazoo County', metroArea: 'Kalamazoo-Portage Metro Area', population: 72884, populationYear: '2023 US Census', majorIndustries: 'Pharmaceutical Manufacturing (Pfizer Global Supply), Medical Technology (Stryker World HQ), Craft Brewing', digitalDemandTier: 'High', priorityTier: 2, source: 'US Census Bureau / Southwest Michigan First', researchDate: '2026-Q1', commercialProfile: 'Global vaccine manufacturing hub and medical device orthopedics center.', remoteDeliveryFit: 'High - Eastern Time Zone.' },

  // MINNESOTA
  { state: 'Minnesota', stateCode: 'MN', stateSlug: 'minnesota', city: 'Saint Paul', citySlug: 'saint-paul', county: 'Ramsey County', metroArea: 'Minneapolis-St. Paul-Bloomington Metro Area (Twin Cities)', population: 303820, populationYear: '2023 US Census', majorIndustries: 'State Government, Fortune 500 Corporate HQs (3M, Ecolab), Medical Technology, Higher Education', digitalDemandTier: 'High', priorityTier: 2, source: 'US Census Bureau / Saint Paul Area Chamber', researchDate: '2026-Q1', commercialProfile: 'State capital and co-anchor of the Twin Cities corporate headquarters powerhouse.', remoteDeliveryFit: 'High - Central Time Zone.' },
  { state: 'Minnesota', stateCode: 'MN', stateSlug: 'minnesota', city: 'Rochester', citySlug: 'rochester-mn', county: 'Olmsted County', metroArea: 'Rochester Metro Area', population: 122413, populationYear: '2023 US Census', majorIndustries: 'World-Renowned Healthcare (Mayo Clinic World HQ), Destination Medical Center Tech, Biotechnology, IBM Tech Hardware', digitalDemandTier: 'Tier 1 Priority', priorityTier: 2, source: 'US Census Bureau / Destination Medical Center / Rochester Chamber', researchDate: '2026-Q1', commercialProfile: 'World headquarters of the Mayo Clinic. Multi-billion dollar Destination Medical Center expansion creates massive digital demand.', remoteDeliveryFit: 'Exceptional - Central Time Zone, global medical leadership.' },
  { state: 'Minnesota', stateCode: 'MN', stateSlug: 'minnesota', city: 'Bloomington', citySlug: 'bloomington-mn', county: 'Hennepin County', metroArea: 'Minneapolis-St. Paul-Bloomington Metro Area', population: 87797, populationYear: '2023 US Census', majorIndustries: 'Retail & Tourism (Mall of America), Semiconductor Manufacturing (SkyWater Tech), Corporate Operations (HealthPartners, Toro)', digitalDemandTier: 'High', priorityTier: 2, source: 'US Census Bureau', researchDate: '2026-Q1', commercialProfile: 'Major Twin Cities hospitality, commercial semiconductor, and retail hub.', remoteDeliveryFit: 'High - Central Time Zone.' },
  { state: 'Minnesota', stateCode: 'MN', stateSlug: 'minnesota', city: 'Duluth', citySlug: 'duluth', county: 'St. Louis County', metroArea: 'Duluth Metro Area (Lake Superior)', population: 86372, populationYear: '2023 US Census', majorIndustries: 'Lake Superior Maritime Shipping, Aviation Manufacturing (Cirrus Aircraft HQ), Regional Healthcare, Tourism', digitalDemandTier: 'Moderate', priorityTier: 3, source: 'US Census Bureau', researchDate: '2026-Q1', commercialProfile: 'World’s farthest inland freshwater seaport and personal aviation manufacturing leader.', remoteDeliveryFit: 'High - Central Time Zone.' },

  // MISSISSIPPI
  { state: 'Mississippi', stateCode: 'MS', stateSlug: 'mississippi', city: 'Jackson', citySlug: 'jackson', county: 'Hinds / Madison / Rankin', metroArea: 'Jackson Metro Area', population: 145966, populationYear: '2023 US Census', majorIndustries: 'State Government, Medical & Healthcare (UMMC), Telecommunications, Financial Services, Automotive Supply', digitalDemandTier: 'Moderate', priorityTier: 3, source: 'US Census Bureau / Greater Jackson Chamber', researchDate: '2026-Q1', commercialProfile: 'State capital and central medical and financial hub of Mississippi.', remoteDeliveryFit: 'High - Central Time Zone.' },
  { state: 'Mississippi', stateCode: 'MS', stateSlug: 'mississippi', city: 'Gulfport', citySlug: 'gulfport', county: 'Harrison County', metroArea: 'Gulfport-Biloxi Metro Area', population: 72105, populationYear: '2023 US Census', majorIndustries: 'Deepwater Maritime Port, Casino Gaming & Hospitality, Military (Seabee Base), Marine Research', digitalDemandTier: 'Moderate', priorityTier: 3, source: 'US Census Bureau', researchDate: '2026-Q1', commercialProfile: 'Mississippi Gulf Coast deepwater container port and resort hospitality hub.', remoteDeliveryFit: 'High - Central Time Zone.' },
  { state: 'Mississippi', stateCode: 'MS', stateSlug: 'mississippi', city: 'Southaven', citySlug: 'southaven', county: 'DeSoto County', metroArea: 'Memphis Metro Area', population: 57404, populationYear: '2023 US Census', majorIndustries: 'Distribution & Logistics Centers, E-commerce Fulfillment, Healthcare, Retail Trade', digitalDemandTier: 'Moderate', priorityTier: 3, source: 'US Census Bureau', researchDate: '2026-Q1', commercialProfile: 'Fast-growing southern suburb of Memphis with major e-commerce fulfillment hubs.', remoteDeliveryFit: 'High - Central Time Zone.' },

  // MISSOURI
  { state: 'Missouri', stateCode: 'MO', stateSlug: 'missouri', city: 'Springfield', citySlug: 'springfield-mo', county: 'Greene County', metroArea: 'Springfield Metro Area (Ozarks)', population: 170067, populationYear: '2023 US Census', majorIndustries: 'Outdoor Retail Headquarters (Bass Pro Shops World HQ), Healthcare Systems (Mercy, CoxHealth), Stainless Steel Manufacturing, Logistics', digitalDemandTier: 'High', priorityTier: 2, source: 'US Census Bureau / Springfield Area Chamber', researchDate: '2026-Q1', commercialProfile: 'Queen City of the Ozarks. Corporate retail and regional healthcare destination.', remoteDeliveryFit: 'High - Central Time Zone.' },
  { state: 'Missouri', stateCode: 'MO', stateSlug: 'missouri', city: 'Columbia', citySlug: 'columbia', county: 'Boone County', metroArea: 'Columbia Metro Area', population: 128561, populationYear: '2023 US Census', majorIndustries: 'Higher Education & Medical Research (Univ of Missouri), Health Insurance, Radiopharmaceuticals, Life Sciences', digitalDemandTier: 'Moderate', priorityTier: 3, source: 'US Census Bureau', researchDate: '2026-Q1', commercialProfile: 'College town and home of the nation’s largest university research nuclear reactor.', remoteDeliveryFit: 'High - Central Time Zone.' },

  // MONTANA
  { state: 'Montana', stateCode: 'MT', stateSlug: 'montana', city: 'Bozeman', citySlug: 'bozeman', county: 'Gallatin County', metroArea: 'Bozeman Micro Area (Gallatin Valley)', population: 56123, populationYear: '2023 US Census', majorIndustries: 'Photonics & Laser Science, Outdoor Product Brands, Cloud Software Startups, Higher Ed (Montana State Univ), Tourism', digitalDemandTier: 'High', priorityTier: 2, source: 'US Census Bureau / Prospera Business Network', researchDate: '2026-Q1', commercialProfile: 'Laser and mountain tech capital. High density of optics firms and venture capital migration.', remoteDeliveryFit: 'Exceptional - Mountain Time Zone, remote tech culture.' },
  { state: 'Montana', stateCode: 'MT', stateSlug: 'montana', city: 'Billings', citySlug: 'billings', county: 'Yellowstone County', metroArea: 'Billings Metro Area', population: 119960, populationYear: '2023 US Census', majorIndustries: 'Regional Healthcare & Medical Systems, Petroleum Refining, Agriculture & Cattle, Transportation Logistics', digitalDemandTier: 'Moderate', priorityTier: 3, source: 'US Census Bureau / Big Sky Economic Development', researchDate: '2026-Q1', commercialProfile: 'Magic City. Largest city in Montana, serving as the commercial and medical capital for a 500-mile radius.', remoteDeliveryFit: 'High - Mountain Time Zone.' },
  { state: 'Montana', stateCode: 'MT', stateSlug: 'montana', city: 'Missoula', citySlug: 'missoula', county: 'Missoula County', metroArea: 'Missoula Metro Area', population: 76955, populationYear: '2023 US Census', majorIndustries: 'Higher Education (Univ of Montana), Bioscience Startups, Tourism, Specialty Manufacturing', digitalDemandTier: 'Moderate', priorityTier: 3, source: 'US Census Bureau', researchDate: '2026-Q1', commercialProfile: 'Western Montana cultural and university startup hub.', remoteDeliveryFit: 'High - Mountain Time Zone.' },

  // NEBRASKA
  { state: 'Nebraska', stateCode: 'NE', stateSlug: 'nebraska', city: 'Lincoln', citySlug: 'lincoln', county: 'Lancaster County', metroArea: 'Lincoln Metro Area', population: 292657, populationYear: '2023 US Census', majorIndustries: 'State Government, Higher Education & Agritech (Univ of Nebraska-Lincoln), Software Startups (Hudl HQ), Financial Services, Manufacturing', digitalDemandTier: 'High', priorityTier: 2, source: 'US Census Bureau / Lincoln Chamber of Commerce', researchDate: '2026-Q1', commercialProfile: 'State capital and Silicon Prairie sports tech innovation center.', remoteDeliveryFit: 'High - Central Time Zone.' },
  { state: 'Nebraska', stateCode: 'NE', stateSlug: 'nebraska', city: 'Bellevue', citySlug: 'bellevue-ne', county: 'Sarpy County', metroArea: 'Omaha-Council Bluffs Metro Area', population: 64176, populationYear: '2023 US Census', majorIndustries: 'Military Command & Defense (Offutt AFB - US Strategic Command), IT Defense Systems, Logistics', digitalDemandTier: 'Moderate', priorityTier: 3, source: 'US Census Bureau', researchDate: '2026-Q1', commercialProfile: 'Headquarters of US Strategic Command (USSTRATCOM) and defense contractor corridor.', remoteDeliveryFit: 'High - Central Time Zone.' },

  // NEW HAMPSHIRE
  { state: 'New Hampshire', stateCode: 'NH', stateSlug: 'new-hampshire', city: 'Manchester', citySlug: 'manchester-nh', county: 'Hillsborough County', metroArea: 'Manchester-Nashua Metro Area', population: 115462, populationYear: '2023 US Census', majorIndustries: 'Defense Electronics, Regenerative Medicine (ARMI/BioFabUSA), Financial Services, Healthcare, Higher Education', digitalDemandTier: 'High', priorityTier: 2, source: 'US Census Bureau / Greater Manchester Chamber', researchDate: '2026-Q1', commercialProfile: 'Queen City of Northern New England with a thriving Millyard regenerative medicine hub.', remoteDeliveryFit: 'High - Eastern Time Zone.' },
  { state: 'New Hampshire', stateCode: 'NH', stateSlug: 'new-hampshire', city: 'Nashua', citySlug: 'nashua', county: 'Hillsborough County', metroArea: 'Manchester-Nashua Metro Area', population: 91161, populationYear: '2023 US Census', majorIndustries: 'Defense Electronics (BAE Systems), Software, High-Tech Manufacturing, Retail Commerce', digitalDemandTier: 'High', priorityTier: 2, source: 'US Census Bureau', researchDate: '2026-Q1', commercialProfile: 'Gate City on the Massachusetts border with major defense electronics operations.', remoteDeliveryFit: 'High - Eastern Time Zone.' },
  { state: 'New Hampshire', stateCode: 'NH', stateSlug: 'new-hampshire', city: 'Portsmouth', citySlug: 'portsmouth-nh', county: 'Rockingham County', metroArea: 'Portsmouth Metro Area (Seacoast)', population: 22312, populationYear: '2023 US Census', majorIndustries: 'Privacy & Tech (IAPP HQ), Naval Shipyard (Submarines), Financial Services, Boutique Tourism', digitalDemandTier: 'High', priorityTier: 2, source: 'US Census Bureau / Chamber Collaborative of Greater Portsmouth', researchDate: '2026-Q1', commercialProfile: 'Seacoast commercial gem and global headquarters of the International Association of Privacy Professionals (IAPP).', remoteDeliveryFit: 'High - Eastern Time Zone.' },

  // NEW JERSEY
  { state: 'New Jersey', stateCode: 'NJ', stateSlug: 'new-jersey', city: 'Princeton', citySlug: 'princeton', county: 'Mercer County', metroArea: 'Trenton-Princeton Metro Area', population: 31206, populationYear: '2023 US Census', majorIndustries: 'Pharmaceutical R&D, Higher Education (Princeton University), Advanced Research (Institute for Advanced Study), Biotech', digitalDemandTier: 'Tier 1 Priority', priorityTier: 2, source: 'US Census Bureau / Princeton Mercer Regional Chamber', researchDate: '2026-Q1', commercialProfile: 'Global intellectual and pharmaceutical research capital on the Route 1 Tech Corridor.', remoteDeliveryFit: 'Exceptional - Eastern Time Zone, elite academic and pharma clients.' },
  { state: 'New Jersey', stateCode: 'NJ', stateSlug: 'new-jersey', city: 'Paterson', citySlug: 'paterson', county: 'Passaic County', metroArea: 'New York-Newark-Jersey City Metro Area', population: 156661, populationYear: '2023 US Census', majorIndustries: 'Food Manufacturing, Textiles & Materials, Healthcare Services, Commercial Retail', digitalDemandTier: 'Moderate', priorityTier: 3, source: 'US Census Bureau', researchDate: '2026-Q1', commercialProfile: 'Historic Silk City in the NYC metro with diverse manufacturing and local services.', remoteDeliveryFit: 'High - Eastern Time Zone.' },
  { state: 'New Jersey', stateCode: 'NJ', stateSlug: 'new-jersey', city: 'Elizabeth', citySlug: 'elizabeth', county: 'Union County', metroArea: 'New York-Newark-Jersey City Metro Area', population: 135407, populationYear: '2023 US Census', majorIndustries: 'Port Newark-Elizabeth Marine Terminal (International Trade), Logistics, Manufacturing, Retail', digitalDemandTier: 'Moderate', priorityTier: 3, source: 'US Census Bureau', researchDate: '2026-Q1', commercialProfile: 'Major East Coast container terminal gateway and logistics center.', remoteDeliveryFit: 'High - Eastern Time Zone.' },
  { state: 'New Jersey', stateCode: 'NJ', stateSlug: 'new-jersey', city: 'Edison', citySlug: 'edison', county: 'Middlesex County', metroArea: 'New York-Newark-Jersey City Metro Area', population: 107361, populationYear: '2023 US Census', majorIndustries: 'Technology & Data Centers, Healthcare (JFK Medical), Logistics & Warehousing, Retail Trade', digitalDemandTier: 'High', priorityTier: 2, source: 'US Census Bureau', researchDate: '2026-Q1', commercialProfile: 'Central New Jersey corporate crossroads with dense healthcare and technology operations.', remoteDeliveryFit: 'High - Eastern Time Zone.' },

  // NEW MEXICO
  { state: 'New Mexico', stateCode: 'NM', stateSlug: 'new-mexico', city: 'Santa Fe', citySlug: 'santa-fe', county: 'Santa Fe County', metroArea: 'Santa Fe Metro Area', population: 89008, populationYear: '2023 US Census', majorIndustries: 'State Government, Fine Arts & Culture (Third largest art market in US), Luxury Tourism & Hospitality, Clean Energy', digitalDemandTier: 'High', priorityTier: 2, source: 'US Census Bureau / Santa Fe Chamber', researchDate: '2026-Q1', commercialProfile: 'Oldest capital city in the US and world-renowned fine arts market demanding luxury web design.', remoteDeliveryFit: 'High - Mountain Time Zone.' },
  { state: 'New Mexico', stateCode: 'NM', stateSlug: 'new-mexico', city: 'Las Cruces', citySlug: 'las-cruces', county: 'Doña Ana County', metroArea: 'Las Cruces Metro Area', population: 113888, populationYear: '2023 US Census', majorIndustries: 'Commercial Spaceflight (Spaceport America nearby), Defense Testing (White Sands Missile Range), Higher Ed (NMSU), Agriculture', digitalDemandTier: 'Moderate', priorityTier: 3, source: 'US Census Bureau', researchDate: '2026-Q1', commercialProfile: 'Southern New Mexico commercial anchor and space testing corridor.', remoteDeliveryFit: 'High - Mountain Time Zone.' },
  { state: 'New Mexico', stateCode: 'NM', stateSlug: 'new-mexico', city: 'Los Alamos', citySlug: 'los-alamos', county: 'Los Alamos County', metroArea: 'Los Alamos Micro Area', population: 19444, populationYear: '2023 US Census', majorIndustries: 'Nuclear Science & Supercomputing (Los Alamos National Laboratory), National Security Physics, Advanced Materials', digitalDemandTier: 'High', priorityTier: 2, source: 'US Census Bureau', researchDate: '2026-Q1', commercialProfile: 'Atomic City. World capital of national security physics, supercomputing, and quantum science.', remoteDeliveryFit: 'Exceptional - Mountain Time Zone, elite scientific researchers.' },

  // NEW YORK
  { state: 'New York', stateCode: 'NY', stateSlug: 'new-york', city: 'Albany', citySlug: 'albany', county: 'Albany County', metroArea: 'Albany-Schenectady-Troy Metro Area (Tech Valley)', population: 100826, populationYear: '2023 US Census', majorIndustries: 'Nanotechnology & Semiconductors (Albany NanoTech Complex), State Government & Policy, Higher Education, Healthcare', digitalDemandTier: 'High', priorityTier: 2, source: 'US Census Bureau / Capitalize Albany', researchDate: '2026-Q1', commercialProfile: 'New York State capital and global center for semiconductor research at Albany NanoTech.', remoteDeliveryFit: 'High - Eastern Time Zone.' },
  { state: 'New York', stateCode: 'NY', stateSlug: 'new-york', city: 'Syracuse', citySlug: 'syracuse', county: 'Onondaga County', metroArea: 'Syracuse Metro Area (Central NY)', population: 144451, populationYear: '2023 US Census', majorIndustries: 'Semiconductor Mega-Fab (Micron $100B investment nearby), Unmanned Aerial Systems (UAS), Higher Ed (Syracuse Univ), Healthcare', digitalDemandTier: 'High', priorityTier: 2, source: 'US Census Bureau / CenterState CEO', researchDate: '2026-Q1', commercialProfile: 'Central New York hub experiencing massive economic transformation with Micron’s mega-fab.', remoteDeliveryFit: 'High - Eastern Time Zone.' },
  { state: 'New York', stateCode: 'NY', stateSlug: 'new-york', city: 'White Plains', citySlug: 'white-plains', county: 'Westchester County', metroArea: 'New York-Newark-Jersey City Metro Area', population: 60100, populationYear: '2023 US Census', majorIndustries: 'Corporate Headquarters, Legal Services, Financial Services, Biotech, Regional Healthcare', digitalDemandTier: 'High', priorityTier: 2, source: 'US Census Bureau', researchDate: '2026-Q1', commercialProfile: 'Suburban commercial headquarters city of affluent Westchester County.', remoteDeliveryFit: 'High - Eastern Time Zone.' },

  // NORTH DAKOTA
  { state: 'North Dakota', stateCode: 'ND', stateSlug: 'north-dakota', city: 'Fargo', citySlug: 'fargo', county: 'Cass County', metroArea: 'Fargo-Moorhead Metro Area', population: 131444, populationYear: '2023 US Census', majorIndustries: 'Enterprise Software (Microsoft Campus), Healthcare & Telehealth (Sanford Health), AgTech, Higher Ed (NDSU)', digitalDemandTier: 'High', priorityTier: 2, source: 'US Census Bureau / Greater Fargo Moorhead EDC', researchDate: '2026-Q1', commercialProfile: 'Silicon Prairie innovation hub and second-largest Microsoft corporate field campus.', remoteDeliveryFit: 'High - Central Time Zone.' },
  { state: 'North Dakota', stateCode: 'ND', stateSlug: 'north-dakota', city: 'Bismarck', citySlug: 'bismarck', county: 'Burleigh County', metroArea: 'Bismarck Metro Area', population: 74139, populationYear: '2023 US Census', majorIndustries: 'State Government, Energy & Electric Utilities, Oil & Gas Processing, Healthcare', digitalDemandTier: 'Moderate', priorityTier: 3, source: 'US Census Bureau', researchDate: '2026-Q1', commercialProfile: 'State capital and headquarters for major regional electric and energy utilities.', remoteDeliveryFit: 'High - Central Time Zone.' },
  { state: 'North Dakota', stateCode: 'ND', stateSlug: 'north-dakota', city: 'Grand Forks', citySlug: 'grand-forks', county: 'Grand Forks County', metroArea: 'Grand Forks Metro Area', population: 58941, populationYear: '2023 US Census', majorIndustries: 'Unmanned Aerial Systems & Drones (Grand Sky UAS Tech Park), Aviation Flight Training (UND), AgTech', digitalDemandTier: 'Moderate', priorityTier: 3, source: 'US Census Bureau', researchDate: '2026-Q1', commercialProfile: 'National testing and training center for commercial and defense unmanned drone systems.', remoteDeliveryFit: 'High - Central Time Zone.' },

  // OHIO
  { state: 'Ohio', stateCode: 'OH', stateSlug: 'ohio', city: 'Dayton', citySlug: 'dayton', county: 'Montgomery County', metroArea: 'Dayton Metro Area', population: 135944, populationYear: '2023 US Census', majorIndustries: 'Air Force Research Laboratory (Wright-Patterson AFB), Aerospace Defense, Health Care, Advanced Materials', digitalDemandTier: 'High', priorityTier: 2, source: 'US Census Bureau / Dayton Development Coalition', researchDate: '2026-Q1', commercialProfile: 'Birthplace of Aviation and home of the US Air Force Materiel Command at Wright-Patterson AFB.', remoteDeliveryFit: 'High - Eastern Time Zone.' },
  { state: 'Ohio', stateCode: 'OH', stateSlug: 'ohio', city: 'Akron', citySlug: 'akron', county: 'Summit County', metroArea: 'Akron Metro Area', population: 188509, populationYear: '2023 US Census', majorIndustries: 'Polymer & Advanced Materials Science (Polymer Valley), Healthcare Systems, Tire Engineering (Goodyear HQ)', digitalDemandTier: 'Moderate', priorityTier: 3, source: 'US Census Bureau / Greater Akron Chamber', researchDate: '2026-Q1', commercialProfile: 'Rubber Capital of the World, now the nation’s premier polymer science research corridor.', remoteDeliveryFit: 'High - Eastern Time Zone.' },
  { state: 'Ohio', stateCode: 'OH', stateSlug: 'ohio', city: 'Toledo', citySlug: 'toledo', county: 'Lucas County', metroArea: 'Toledo Metro Area', population: 266301, populationYear: '2023 US Census', majorIndustries: 'Solar Glass Manufacturing (First Solar), Automotive Assembly (Jeep), Maritime Great Lakes Port, Healthcare', digitalDemandTier: 'Moderate', priorityTier: 3, source: 'US Census Bureau', researchDate: '2026-Q1', commercialProfile: 'Glass City. Premier solar energy panel and automotive assembly manufacturing hub.', remoteDeliveryFit: 'High - Eastern Time Zone.' },
  { state: 'Ohio', stateCode: 'OH', stateSlug: 'ohio', city: 'Dublin', citySlug: 'dublin-oh', county: 'Franklin County', metroArea: 'Columbus Metro Area', population: 49328, populationYear: '2023 US Census', majorIndustries: 'Healthcare Distribution (Cardinal Health World HQ), Software & IT, Financial Services, Corporate Parks', digitalDemandTier: 'High', priorityTier: 2, source: 'US Census Bureau', researchDate: '2026-Q1', commercialProfile: 'Prestigious corporate hub in the Columbus metro with major Fortune 20 healthcare headquarters.', remoteDeliveryFit: 'High - Eastern Time Zone.' },

  // OREGON
  { state: 'Oregon', stateCode: 'OR', stateSlug: 'oregon', city: 'Hillsboro', citySlug: 'hillsboro', county: 'Washington County', metroArea: 'Portland-Vancouver-Hillsboro Metro Area (Silicon Forest)', population: 108382, populationYear: '2023 US Census', majorIndustries: 'Semiconductor Fabrication (Intel Ronler Acres & Gordon Moore Park), Clean Tech, Data Centers, Biotechnology', digitalDemandTier: 'Tier 1 Priority', priorityTier: 2, source: 'US Census Bureau / City of Hillsboro Economic Development', researchDate: '2026-Q1', commercialProfile: 'Epicenter of the Silicon Forest. Intel’s leading-edge semiconductor R&D and manufacturing mega-campus.', remoteDeliveryFit: 'Exceptional - Pacific Time Zone, premier semiconductor hub.' },
  { state: 'Oregon', stateCode: 'OR', stateSlug: 'oregon', city: 'Beaverton', citySlug: 'beaverton', county: 'Washington County', metroArea: 'Portland-Vancouver-Hillsboro Metro Area (Silicon Forest)', population: 97494, populationYear: '2023 US Census', majorIndustries: 'Athletic Footwear & Apparel (Nike World HQ), Tech Hardware & Instruments (Tektronix), Clean Tech, Software', digitalDemandTier: 'Tier 1 Priority', priorityTier: 2, source: 'US Census Bureau', researchDate: '2026-Q1', commercialProfile: 'World headquarters of Nike and foundational electronic testing instruments leader.', remoteDeliveryFit: 'Exceptional - Pacific Time Zone, world-class athletic and design brand.' },
  { state: 'Oregon', stateCode: 'OR', stateSlug: 'oregon', city: 'Eugene', citySlug: 'eugene', county: 'Lane County', metroArea: 'Eugene-Springfield Metro Area', population: 177923, populationYear: '2023 US Census', majorIndustries: 'Higher Education (Univ of Oregon), Athletic Innovation (TrackTown USA), Wood Products, Video Game Startups', digitalDemandTier: 'Moderate', priorityTier: 3, source: 'US Census Bureau', researchDate: '2026-Q1', commercialProfile: 'TrackTown USA and university tech community in the Southern Willamette Valley.', remoteDeliveryFit: 'High - Pacific Time Zone.' },
  { state: 'Oregon', stateCode: 'OR', stateSlug: 'oregon', city: 'Bend', citySlug: 'bend', county: 'Deschutes County', metroArea: 'Bend Metro Area (Central Oregon)', population: 102059, populationYear: '2023 US Census', majorIndustries: 'Outdoor Product Manufacturing, Software Tech Startups, Craft Brewing, Bioscience, High-Income Remote Workforce', digitalDemandTier: 'High', priorityTier: 2, source: 'US Census Bureau / Economic Development for Central Oregon (EDCO)', researchDate: '2026-Q1', commercialProfile: 'Rapidly growing outdoor lifestyle and tech entrepreneur hub with dense remote workforce.', remoteDeliveryFit: 'Exceptional - Pacific Time Zone, remote-native business community.' },
  { state: 'Oregon', stateCode: 'OR', stateSlug: 'oregon', city: 'Salem', citySlug: 'salem-or', county: 'Marion / Polk', metroArea: 'Salem Metro Area', population: 180011, populationYear: '2023 US Census', majorIndustries: 'State Government, Agriculture & Food Processing, Regional Healthcare, Manufacturing', digitalDemandTier: 'Moderate', priorityTier: 3, source: 'US Census Bureau', researchDate: '2026-Q1', commercialProfile: 'Oregon state capital and agricultural food processing center.', remoteDeliveryFit: 'High - Pacific Time Zone.' },

  // PENNSYLVANIA
  { state: 'Pennsylvania', stateCode: 'PA', stateSlug: 'pennsylvania', city: 'Allentown', citySlug: 'allentown', county: 'Lehigh County', metroArea: 'Allentown-Bethlehem-Easton Metro Area (Lehigh Valley)', population: 125845, populationYear: '2023 US Census', majorIndustries: 'Industrial Gases & Clean Energy (Air Products World HQ), Multimodal Logistics, Manufacturing, Healthcare Systems', digitalDemandTier: 'High', priorityTier: 2, source: 'US Census Bureau / Lehigh Valley Economic Development Corp', researchDate: '2026-Q1', commercialProfile: 'Third-largest city in PA and anchor of the booming Lehigh Valley manufacturing and logistics corridor.', remoteDeliveryFit: 'High - Eastern Time Zone.' },
  { state: 'Pennsylvania', stateCode: 'PA', stateSlug: 'pennsylvania', city: 'Erie', citySlug: 'erie', county: 'Erie County', metroArea: 'Erie Metro Area', population: 94831, populationYear: '2023 US Census', majorIndustries: 'Locomotive & Freight Manufacturing (Wabtec), Insurance (Erie Insurance HQ), Great Lakes Shipping, Healthcare', digitalDemandTier: 'Moderate', priorityTier: 3, source: 'US Census Bureau', researchDate: '2026-Q1', commercialProfile: 'Pennsylvania’s Great Lakes port and locomotive manufacturing hub.', remoteDeliveryFit: 'High - Eastern Time Zone.' },
  { state: 'Pennsylvania', stateCode: 'PA', stateSlug: 'pennsylvania', city: 'Harrisburg', citySlug: 'harrisburg', county: 'Dauphin County', metroArea: 'Harrisburg-Carlisle Metro Area', population: 50135, populationYear: '2023 US Census', majorIndustries: 'State Government & Policy, East Coast Logistics & Rail Hub, Healthcare, Food Processing (Hershey nearby)', digitalDemandTier: 'Moderate', priorityTier: 3, source: 'US Census Bureau', researchDate: '2026-Q1', commercialProfile: 'State capital of Pennsylvania and premier East Coast intermodal distribution crossroads.', remoteDeliveryFit: 'High - Eastern Time Zone.' },
  { state: 'Pennsylvania', stateCode: 'PA', stateSlug: 'pennsylvania', city: 'King of Prussia', citySlug: 'king-of-prussia', county: 'Montgomery County', metroArea: 'Philadelphia Metro Area', population: 24000, populationYear: '2023 US Census', majorIndustries: 'Retail & E-commerce (King of Prussia Mall), Pharmaceuticals, Corporate HQs, Defense Systems (Lockheed Martin)', digitalDemandTier: 'High', priorityTier: 2, source: 'US Census Bureau', researchDate: '2026-Q1', commercialProfile: 'Commercial and retail titan of suburban Philadelphia with dense corporate parks.', remoteDeliveryFit: 'High - Eastern Time Zone.' },

  // SOUTH CAROLINA
  { state: 'South Carolina', stateCode: 'SC', stateSlug: 'south-carolina', city: 'Columbia', citySlug: 'columbia-sc', county: 'Richland / Lexington', metroArea: 'Columbia Metro Area (Midlands)', population: 139611, populationYear: '2023 US Census', majorIndustries: 'State Government, Higher Education (Univ of South Carolina), Insurance & Financial Tech, Military (Fort Jackson)', digitalDemandTier: 'High', priorityTier: 2, source: 'US Census Bureau / Central SC Alliance', researchDate: '2026-Q1', commercialProfile: 'State capital and central South Carolina business and insurance software corridor.', remoteDeliveryFit: 'High - Eastern Time Zone.' },
  { state: 'South Carolina', stateCode: 'SC', stateSlug: 'south-carolina', city: 'Mount Pleasant', citySlug: 'mount-pleasant', county: 'Charleston County', metroArea: 'Charleston Metro Area', population: 94545, populationYear: '2023 US Census', majorIndustries: 'Tech Startups, Marine Trades, Executive Consulting, High-Income Professional Services', digitalDemandTier: 'High', priorityTier: 2, source: 'US Census Bureau', researchDate: '2026-Q1', commercialProfile: 'Affluent coastal community across the Ravenel Bridge from Charleston with high business density.', remoteDeliveryFit: 'High - Eastern Time Zone.' },
  { state: 'South Carolina', stateCode: 'SC', stateSlug: 'south-carolina', city: 'Spartanburg', citySlug: 'spartanburg', county: 'Spartanburg County', metroArea: 'Spartanburg Metro Area (Upstate)', population: 38584, populationYear: '2023 US Census', majorIndustries: 'Automotive Manufacturing (BMW Assembly Plant), Industrial Textiles (Milliken HQ), Advanced Logistics', digitalDemandTier: 'Moderate', priorityTier: 3, source: 'US Census Bureau', researchDate: '2026-Q1', commercialProfile: 'Upstate automotive assembly powerhouse and international industrial investment hub.', remoteDeliveryFit: 'High - Eastern Time Zone.' },

  // SOUTH DAKOTA
  { state: 'South Dakota', stateCode: 'SD', stateSlug: 'south-dakota', city: 'Sioux Falls', citySlug: 'sioux-falls', county: 'Minnehaha / Lincoln', metroArea: 'Sioux Falls Metro Area', population: 202604, populationYear: '2023 US Census', majorIndustries: 'Financial Services & Credit Banking (Citibank, Wells Fargo card ops), Regional Healthcare (Sanford Health, Avera), Bioscience', digitalDemandTier: 'High', priorityTier: 2, source: 'US Census Bureau / Sioux Falls Development Foundation', researchDate: '2026-Q1', commercialProfile: 'Financial credit card capital of the United States with booming medical systems and zero state income tax.', remoteDeliveryFit: 'High - Central Time Zone, corporate finance and health focus.' },
  { state: 'South Dakota', stateCode: 'SD', stateSlug: 'south-dakota', city: 'Rapid City', citySlug: 'rapid-city', county: 'Pennington County', metroArea: 'Rapid City Metro Area (Black Hills)', population: 79404, populationYear: '2023 US Census', majorIndustries: 'Defense Aviation (Ellsworth AFB - B-21 Raider Bomber Hub), Tourism (Mount Rushmore), Mining Technology, Healthcare', digitalDemandTier: 'Moderate', priorityTier: 3, source: 'US Census Bureau', researchDate: '2026-Q1', commercialProfile: 'Gateway to the Black Hills and home of the next-generation B-21 stealth bomber fleet.', remoteDeliveryFit: 'High - Mountain Time Zone.' },

  // TEXAS
  { state: 'Texas', stateCode: 'TX', stateSlug: 'texas', city: 'Waco', citySlug: 'waco', county: 'McLennan County', metroArea: 'Waco Metro Area', population: 144816, populationYear: '2023 US Census', majorIndustries: 'Higher Education (Baylor University), Commercial Rocket Testing (SpaceX Rocket Development Facility), Aerospace & Aviation (L3Harris)', digitalDemandTier: 'High', priorityTier: 2, source: 'US Census Bureau / Greater Waco Chamber', researchDate: '2026-Q1', commercialProfile: 'SpaceX rocket engine testing center and Central Texas manufacturing corridor on the I-35 tech axis.', remoteDeliveryFit: 'High - Central Time Zone.' },
  { state: 'Texas', stateCode: 'TX', stateSlug: 'texas', city: 'College Station', citySlug: 'college-station', county: 'Brazos County', metroArea: 'College Station-Bryan Metro Area (Research Valley)', population: 124319, populationYear: '2023 US Census', majorIndustries: 'Higher Education & Engineering (Texas A&M University), Biopharmaceutical Manufacturing (Fujifilm Diosynth), Agriculture & Defense', digitalDemandTier: 'High', priorityTier: 2, source: 'US Census Bureau / Brazos Valley Economic Development', researchDate: '2026-Q1', commercialProfile: 'Heart of the Research Valley anchored by Texas A&M’s massive engineering and biomanufacturing complexes.', remoteDeliveryFit: 'High - Central Time Zone.' },
  { state: 'Texas', stateCode: 'TX', stateSlug: 'texas', city: 'Midland', citySlug: 'midland', county: 'Midland County', metroArea: 'Midland Metro Area (Permian Basin)', population: 138397, populationYear: '2023 US Census', majorIndustries: 'Oil & Natural Gas (Capital of the Permian Basin), Commercial Spaceport, Petroleum Engineering Services', digitalDemandTier: 'High', priorityTier: 2, source: 'US Census Bureau / Midland Development Corporation', researchDate: '2026-Q1', commercialProfile: 'Administrative and financial capital of the Permian Basin, the most prolific energy basin in North America.', remoteDeliveryFit: 'High - Central Time Zone, energy industry wealth.' },
  { state: 'Texas', stateCode: 'TX', stateSlug: 'texas', city: 'Odessa', citySlug: 'odessa', county: 'Ector County', metroArea: 'Odessa Metro Area (Permian Basin)', population: 114428, populationYear: '2023 US Census', majorIndustries: 'Oilfield Logistics, Heavy Oil Equipment Fabrication, Petrochemicals, Transportation', digitalDemandTier: 'Moderate', priorityTier: 3, source: 'US Census Bureau', researchDate: '2026-Q1', commercialProfile: 'Industrial service and oilfield equipment hub of the Permian Basin.', remoteDeliveryFit: 'High - Central Time Zone.' },
  { state: 'Texas', stateCode: 'TX', stateSlug: 'texas', city: 'Tyler', citySlug: 'tyler', county: 'Smith County', metroArea: 'Tyler Metro Area (East Texas)', population: 109286, populationYear: '2023 US Census', majorIndustries: 'Regional Healthcare & Medical Systems (UT Health East Texas), Rose Agriculture, Manufacturing, Oil & Gas Services', digitalDemandTier: 'Moderate', priorityTier: 3, source: 'US Census Bureau / Tyler Economic Development Council', researchDate: '2026-Q1', commercialProfile: 'Medical and commercial hub of East Texas (Rose Capital of America).', remoteDeliveryFit: 'High - Central Time Zone.' },
  { state: 'Texas', stateCode: 'TX', stateSlug: 'texas', city: 'Beaumont', citySlug: 'beaumont', county: 'Jefferson County', metroArea: 'Beaumont-Port Arthur Metro Area (Golden Triangle)', population: 111155, populationYear: '2023 US Census', majorIndustries: 'Petrochemical Refining (ExxonMobil mega-refinery), Deepwater Maritime Port, LNG Export, Industrial Construction', digitalDemandTier: 'Moderate', priorityTier: 3, source: 'US Census Bureau', researchDate: '2026-Q1', commercialProfile: 'Historic birthplace of modern petroleum (Spindletop) and major refining and export terminal.', remoteDeliveryFit: 'High - Central Time Zone.' },

  // VERMONT
  { state: 'Vermont', stateCode: 'VT', stateSlug: 'vermont', city: 'Burlington', citySlug: 'burlington', county: 'Chittenden County', metroArea: 'Burlington-South Burlington Metro Area', population: 44743, populationYear: '2023 US Census', majorIndustries: 'Semiconductors (GlobalFoundries mega-fab nearby), Aerospace Electric Aviation (BETA Technologies HQ), Higher Ed (UVM), Green Tech', digitalDemandTier: 'High', priorityTier: 2, source: 'US Census Bureau / Lake Champlain Chamber', researchDate: '2026-Q1', commercialProfile: 'Economic capital of Vermont. Microchip fabrication and pioneer in electric aircraft manufacturing.', remoteDeliveryFit: 'High - Eastern Time Zone, tech and sustainability focus.' },
  { state: 'Vermont', stateCode: 'VT', stateSlug: 'vermont', city: 'Montpelier', citySlug: 'montpelier', county: 'Washington County', metroArea: 'Barre-Montpelier Micro Area', population: 8074, populationYear: '2023 US Census', majorIndustries: 'State Government, Insurance (National Life Group HQ), Sustainable Business, Artisan Manufacturing', digitalDemandTier: 'Moderate', priorityTier: 3, source: 'US Census Bureau', researchDate: '2026-Q1', commercialProfile: 'Smallest state capital in the US with established insurance and green economy headquarters.', remoteDeliveryFit: 'High - Eastern Time Zone.' },

  // VIRGINIA
  { state: 'Virginia', stateCode: 'VA', stateSlug: 'virginia', city: 'Virginia Beach', citySlug: 'virginia-beach', county: 'Independent City', metroArea: 'Virginia Beach-Norfolk-Newport News Metro Area (Hampton Roads)', population: 453649, populationYear: '2023 US Census', majorIndustries: 'Military & Naval Special Warfare (NAS Oceana, Dam Neck), Ocean Tourism, Transatlantic Fiber Cables, Defense Contracting', digitalDemandTier: 'High', priorityTier: 2, source: 'US Census Bureau / Virginia Beach Economic Development', researchDate: '2026-Q1', commercialProfile: 'Largest city in Virginia and subsea transatlantic fiber cable landing station connecting the US to Europe and South America.', remoteDeliveryFit: 'High - Eastern Time Zone, high data infrastructure.' },
  { state: 'Virginia', stateCode: 'VA', stateSlug: 'virginia', city: 'Norfolk', citySlug: 'norfolk', county: 'Independent City', metroArea: 'Virginia Beach-Norfolk-Newport News Metro Area (Hampton Roads)', population: 232999, populationYear: '2023 US Census', majorIndustries: 'Naval Defense (Naval Station Norfolk - World’s Largest Naval Base), Deepwater Port of Virginia, Maritime Commerce, Healthcare', digitalDemandTier: 'High', priorityTier: 2, source: 'US Census Bureau / Norfolk Economic Development', researchDate: '2026-Q1', commercialProfile: 'Home to the largest naval base in the world and leading East Coast container terminal.', remoteDeliveryFit: 'High - Eastern Time Zone.' },
  { state: 'Virginia', stateCode: 'VA', stateSlug: 'virginia', city: 'Chesapeake', citySlug: 'chesapeake', county: 'Independent City', metroArea: 'Hampton Roads Metro Area', population: 252424, populationYear: '2023 US Census', majorIndustries: 'Corporate Headquarters (Dollar Tree World HQ), Advanced Logistics, Intermodal Freight, Defense Technology', digitalDemandTier: 'High', priorityTier: 2, source: 'US Census Bureau', researchDate: '2026-Q1', commercialProfile: 'Hampton Roads commercial and retail headquarters city with expanding logistics operations.', remoteDeliveryFit: 'High - Eastern Time Zone.' },
  { state: 'Virginia', stateCode: 'VA', stateSlug: 'virginia', city: 'Newport News', citySlug: 'newport-news', county: 'Independent City', metroArea: 'Hampton Roads Metro Area', population: 184306, populationYear: '2023 US Census', majorIndustries: 'Nuclear Shipbuilding (Newport News Shipbuilding - Aircraft Carriers & Subs), Defense, Physics (Jefferson Lab)', digitalDemandTier: 'Moderate', priorityTier: 3, source: 'US Census Bureau', researchDate: '2026-Q1', commercialProfile: 'Nation’s sole builder of nuclear-powered aircraft carriers and high-energy physics hub.', remoteDeliveryFit: 'High - Eastern Time Zone.' },
  { state: 'Virginia', stateCode: 'VA', stateSlug: 'virginia', city: 'Ashburn', citySlug: 'ashburn', county: 'Loudoun County', metroArea: 'Washington-Arlington-Alexandria Metro Area (Data Center Alley)', population: 46000, populationYear: '2023 US Census', majorIndustries: 'Cloud Data Center Infrastructure (Data Center Alley), Internet Exchange (Equinix), Defense Tech', digitalDemandTier: 'Tier 1 Priority', priorityTier: 2, source: 'US Census Bureau / Loudoun Economic Development', researchDate: '2026-Q1', commercialProfile: 'Data Center Alley. Processes an estimated 70% of the world’s internet traffic. The technological backbone of global digital commerce.', remoteDeliveryFit: 'Exceptional - Eastern Time Zone, cloud capital of the planet.' },

  // WEST VIRGINIA
  { state: 'West Virginia', stateCode: 'WV', stateSlug: 'west-virginia', city: 'Charleston', citySlug: 'charleston-wv', county: 'Kanawha County', metroArea: 'Charleston Metro Area', population: 46692, populationYear: '2023 US Census', majorIndustries: 'State Government, Chemicals & Polymers (Chemical Valley), Healthcare Systems, Energy, Law', digitalDemandTier: 'Moderate', priorityTier: 3, source: 'US Census Bureau / Charleston Area Alliance', researchDate: '2026-Q1', commercialProfile: 'State capital and central chemical and legal hub of West Virginia.', remoteDeliveryFit: 'High - Eastern Time Zone.' },
  { state: 'West Virginia', stateCode: 'WV', stateSlug: 'west-virginia', city: 'Morgantown', citySlug: 'morgantown', county: 'Monongalia County', metroArea: 'Morgantown Metro Area', population: 30429, populationYear: '2023 US Census', majorIndustries: 'Higher Education (West Virginia University), Healthcare Systems (WVU Medicine), Federal Energy Tech (NETL), Biometrics', digitalDemandTier: 'High', priorityTier: 2, source: 'US Census Bureau', researchDate: '2026-Q1', commercialProfile: 'Research engine of West Virginia with massive academic healthcare and federal energy labs.', remoteDeliveryFit: 'High - Eastern Time Zone.' },
  { state: 'West Virginia', stateCode: 'WV', stateSlug: 'west-virginia', city: 'Huntington', citySlug: 'huntington', county: 'Cabell / Wayne', metroArea: 'Huntington-Ashland Metro Area', population: 45719, populationYear: '2023 US Census', majorIndustries: 'Ohio River Inland Port Shipping, Steel & Metals, Higher Education (Marshall Univ), Healthcare', digitalDemandTier: 'Moderate', priorityTier: 3, source: 'US Census Bureau', researchDate: '2026-Q1', commercialProfile: 'Major inland port on the Ohio River with heavy manufacturing and medical services.', remoteDeliveryFit: 'High - Eastern Time Zone.' },

  // WISCONSIN
  { state: 'Wisconsin', stateCode: 'WI', stateSlug: 'wisconsin', city: 'Green Bay', citySlug: 'green-bay', county: 'Brown County', metroArea: 'Green Bay Metro Area', population: 106095, populationYear: '2023 US Census', majorIndustries: 'Paper & Packaging Manufacturing, Transportation Logistics (Schneider National HQ), Sports Entertainment (Packers), Food Processing', digitalDemandTier: 'High', priorityTier: 2, source: 'US Census Bureau / Greater Green Bay Chamber', researchDate: '2026-Q1', commercialProfile: 'Paper packaging and major trucking freight headquarters city in Northeast Wisconsin.', remoteDeliveryFit: 'High - Central Time Zone.' },
  { state: 'Wisconsin', stateCode: 'WI', stateSlug: 'wisconsin', city: 'Kenosha', citySlug: 'kenosha', county: 'Kenosha County', metroArea: 'Chicago Metro Area / Milwaukee Corridor', population: 98716, populationYear: '2023 US Census', majorIndustries: 'Advanced Distribution & E-commerce Hubs, Tool Manufacturing (Snap-on World HQ), Medical Supply', digitalDemandTier: 'Moderate', priorityTier: 3, source: 'US Census Bureau', researchDate: '2026-Q1', commercialProfile: 'Booming distribution corridor situated between Chicago and Milwaukee.', remoteDeliveryFit: 'High - Central Time Zone.' },
  { state: 'Wisconsin', stateCode: 'WI', stateSlug: 'wisconsin', city: 'Appleton', citySlug: 'appleton', county: 'Outagamie / Calumet / Winnebago', metroArea: 'Appleton Metro Area (Fox Cities)', population: 74681, populationYear: '2023 US Census', majorIndustries: 'Specialty Paper & Converting, Health Insurance, Manufacturing Technology, Higher Education', digitalDemandTier: 'Moderate', priorityTier: 3, source: 'US Census Bureau / Fox Cities Chamber', researchDate: '2026-Q1', commercialProfile: 'Heart of the Fox Cities with strong papermaking, manufacturing, and financial services.', remoteDeliveryFit: 'High - Central Time Zone.' },

  // WYOMING
  { state: 'Wyoming', stateCode: 'WY', stateSlug: 'wyoming', city: 'Cheyenne', citySlug: 'cheyenne', county: 'Laramie County', metroArea: 'Cheyenne Metro Area', population: 65162, populationYear: '2023 US Census', majorIndustries: 'State Government, Hyperscale Data Centers (Microsoft), Air Force Nuclear Defense (F.E. Warren AFB), Railroad Logistics (Union Pacific)', digitalDemandTier: 'High', priorityTier: 2, source: 'US Census Bureau / Cheyenne LEADS', researchDate: '2026-Q1', commercialProfile: 'State capital and premier Rocky Mountain data center and logistics corridor.', remoteDeliveryFit: 'High - Mountain Time Zone.' },
  { state: 'Wyoming', stateCode: 'WY', stateSlug: 'wyoming', city: 'Casper', citySlug: 'casper', county: 'Natrona County', metroArea: 'Casper Metro Area', population: 58544, populationYear: '2023 US Census', majorIndustries: 'Oil & Gas Production, Coal & Uranium Mining Services, Renewable Wind Energy, Healthcare', digitalDemandTier: 'Moderate', priorityTier: 3, source: 'US Census Bureau / Advance Casper', researchDate: '2026-Q1', commercialProfile: 'Oil City. Commercial and equipment supply capital for Wyoming’s mineral and energy extraction.', remoteDeliveryFit: 'High - Mountain Time Zone.' },
  { state: 'Wyoming', stateCode: 'WY', stateSlug: 'wyoming', city: 'Jackson', citySlug: 'jackson-wy', county: 'Teton County', metroArea: 'Jackson Micro Area', population: 10849, populationYear: '2023 US Census', majorIndustries: 'Ultra-High-Net-Worth Wealth Management (Highest per-capita income in US), Luxury Tourism & Skiing, Wildlife Conservation', digitalDemandTier: 'High', priorityTier: 2, source: 'US Census Bureau', researchDate: '2026-Q1', commercialProfile: 'Richest county per capita in the United States. Premier family offices, luxury brands, and wealth managers.', remoteDeliveryFit: 'Exceptional - Mountain Time Zone, top-tier private wealth market.' }
];

console.log(`Compiled master list with ${RAW_CITIES.length} US Commercial Hubs and Metro Markets.`);
