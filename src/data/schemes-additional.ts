import { Scheme } from './schemes';

const mk = (text: string) => ({ en: text, hi: text, ta: text, te: text });
const docs = [mk('Aadhaar Card')];
const docsIncome = [mk('Aadhaar Card'), mk('Income Certificate')];
const docsCaste = [mk('Aadhaar Card'), mk('Caste Certificate')];
const docsFarmer = [mk('Aadhaar Card'), mk('Land Records')];
const docsStudent = [mk('Aadhaar Card'), mk('Mark Sheet'), mk('Income Certificate')];
const docsBusiness = [mk('Aadhaar Card'), mk('Business Registration'), mk('PAN Card')];

export const additionalSchemes: Scheme[] = [
  // ========== STATE-SPECIFIC SCHEMES ==========
  
  // Maharashtra Schemes
  { 
    id: 'maha-sanjeevani', 
    category: 'health', 
    title: mk('Mahatma Jyotiba Phule Jan Arogya Yojana'), 
    shortDescription: mk('Free health insurance for families in Maharashtra.'), 
    longDescription: mk('Provides comprehensive health insurance coverage to economically disadvantaged families in Maharashtra with cashless treatment facilities.'), 
    benefitsAmount: mk('₹1.5 Lakh Health Cover'), 
    eligibility: { minAge: 0, occupations: ['All'], maxIncome: 100000, states: ['Maharashtra'], categories: ['All'] },
    requiredDocuments: docsIncome, 
    applicationUrl: 'https://www.jeevandayee.gov.in/',
    startDate: '2017-04-01',
    status: 'active',
    launchedBy: 'Maharashtra Government'
  },

  { 
    id: 'maha-sharad-pawar', 
    category: 'farmer', 
    title: mk('Sharad Pawar Gram Samrudhi Yojana'), 
    shortDescription: mk('Interest-free agricultural loans for farmers in Maharashtra.'), 
    longDescription: mk('Scheme providing interest-free short-term agricultural loans up to ₹3 lakhs to farmers in Maharashtra.'), 
    benefitsAmount: mk('Interest-Free Loan up to ₹3L'), 
    eligibility: { minAge: 18, occupations: ['Farmer'], states: ['Maharashtra'], categories: ['All'] },
    requiredDocuments: docsFarmer, 
    applicationUrl: 'https://krishi.maharashtra.gov.in/',
    startDate: '2023-01-01',
    status: 'active',
    launchedBy: 'Maharashtra Government'
  },

  { 
    id: 'maha-aple-sarkar', 
    category: 'infrastructure', 
    title: mk('Aple Sarkar - Maharashtra Digital Services'), 
    shortDescription: mk('Online portal for government services in Maharashtra.'), 
    longDescription: mk('Single window system for delivery of various government services online to citizens of maharashtra.'), 
    benefitsAmount: mk('Digital Services'), 
    eligibility: { minAge: 0, occupations: ['All'], states: ['Maharashtra'], categories: ['All'] },
    requiredDocuments: docs, 
    applicationUrl: 'https://aaplesarkar.mahaonline.gov.in/',
    startDate: '2015-01-01',
    status: 'active',
    launchedBy: 'Maharashtra Government'
  },

  // Tamil Nadu Schemes
  { 
    id: 'tn-amma-unavagam', 
    category: 'social-welfare', 
    title: mk('Amma Unavagam'), 
    shortDescription: mk('Subsidized food at ₹1-₹5 in Tamil Nadu canteens.'), 
    longDescription: mk('Network of subsidized canteens in Tamil Nadu providing quality food at highly subsidized rates to economically weaker sections.'), 
    benefitsAmount: mk('Meals at ₹1-₹5'), 
    eligibility: { minAge: 0, occupations: ['All'], states: ['Tamil Nadu'], categories: ['All'] },
    requiredDocuments: [], 
    applicationUrl: 'https://www.tn.gov.in/',
    startDate: '2013-01-20',
    status: 'active',
    launchedBy: 'Tamil Nadu Government'
  },

  { 
    id: 'tn-free-laptop', 
    category: 'student', 
    title: mk('Free Laptop Distribution Scheme'), 
    shortDescription: mk('Free laptops for 11th and 12th standard students in TN.'), 
    longDescription: mk('Distribution of free laptops to students of government and government-aided schools who enroll in 11th standard in Tamil Nadu.'), 
    benefitsAmount: mk('Free Laptop'), 
    eligibility: { minAge: 15, maxAge: 19, occupations: ['Student'], states: ['Tamil Nadu'], categories: ['All'] },
    requiredDocuments: docsStudent, 
    applicationUrl: 'https://laptop.tn.gov.in/',
    startDate: '2011-09-15',
    status: 'active',
    launchedBy: 'Tamil Nadu Government'
  },

  { 
    id: 'tn-kalaignar-insurance', 
    category: 'health', 
    title: mk('Kalaignar Kappeettu Thittam'), 
    shortDescription: mk('Comprehensive health insurance for all families in Tamil Nadu.'), 
    longDescription: mk('Provides health insurance coverage of ₹5 lakhs per family per year for all residents of Tamil Nadu for treatment in empaneled hospitals.'), 
    benefitsAmount: mk('₹5 Lakh Health Cover'), 
    eligibility: { minAge: 0, occupations: ['All'], states: ['Tamil Nadu'], categories: ['All'] },
    requiredDocuments: docs, 
    applicationUrl: 'https://www.cmchisttn.com/',
    startDate: '2021-09-12',
    status: 'active',
    launchedBy: 'Tamil Nadu Government'
  },

  // Kerala Schemes
  { 
    id: 'kerala-karunya-benevolent', 
    category: 'health', 
    title: mk('Karunya Benevolent Fund'), 
    shortDescription: mk('Financial aid for treatment of serious diseases in Kerala.'), 
    longDescription: mk('Provides financial assistance to economically backward people suffering from serious ailments like cancer, heart disease, kidney disease requiring expensive treatment.'), 
    benefitsAmount: mk('Up to ₹2 Lakhs'), 
    eligibility: { minAge: 0, occupations: ['All'], maxIncome: 200000, states: ['Kerala'], categories: ['All'] },
    requiredDocuments: [mk('Aadhaar'), mk('Medical Certificate'), mk('Income Certificate')], 
    applicationUrl: 'https://www.lsgkerala.gov.in/',
    startDate: '2008-01-01',
    status: 'active',
    launchedBy: 'Kerala Government'
  },

  { 
    id: 'kerala-farm-debt-waiver', 
    category: 'farmer', 
    title: mk('Kerala Farm Debt Waiver Scheme'), 
    shortDescription: mk('Waiver of agricultural loans for farmers in Kerala.'), 
    longDescription: mk('One-time farm loan waiver for small and marginal farmers in Kerala who have outstanding loans with cooperative banks.'), 
    benefitsAmount: mk('Loan Waiver up to ₹25,000'), 
    eligibility: { minAge: 18, occupations: ['Farmer'], states: ['Kerala'], categories: ['All'] },
    requiredDocuments: docsFarmer, 
    applicationUrl: 'https://keralafarmerdebt.gov.in',
    startDate: '2018-01-01',
    endDate: '2020-12-31',
    status: 'expired',
    launchedBy: 'Kerala Government'
  },

  // Karnataka Schemes
  { 
    id: 'karnataka-anna-bhagya', 
    category: 'social-welfare', 
    title: mk('Anna Bhagya Scheme'), 
    shortDescription: mk('Free rice distribution to BPL families in Karnataka.'), 
    longDescription: mk('Provides free rice to BPL cardholders in Karnataka at 7kg per person per month for all family members.'), 
    benefitsAmount: mk('7kg Free Rice/Person'), 
    eligibility: { minAge: 0, occupations: ['All'], maxIncome: 120000, states: ['Karnataka'], categories: ['BPL', 'All'] },
    requiredDocuments: [mk('Ration Card'), mk('Income Certificate')], 
    applicationUrl: 'https://ahara.kar.nic.in/',
    startDate: '2013-03-01',
    status: 'active',
    launchedBy: 'Karnataka Government'
  },

  { 
    id: 'karnataka-bhagyalaxmi', 
    category: 'women', 
    title: mk('Bhagya Laxmi Scheme'), 
    shortDescription: mk('Financial assistance for girl child birth and education in Karnataka.'), 
    longDescription: mk('Provides financial assistance for girl child born in BPL families including bond for higher education and marriage.'), 
    benefitsAmount: mk('₹1 Lakh Bond + Education Support'), 
    eligibility: { minAge: 0, maxAge: 18, gender: 'Female', occupations: ['All'], maxIncome: 100000, states: ['Karnataka'], categories: ['BPL'] },
    requiredDocuments: [mk('Birth Certificate'), mk('Income Certificate'), mk('BPL Card')], 
    applicationUrl: 'https://wcd.karnataka.gov.in/',
    startDate: '2006-04-01',
    status: 'active',
    launchedBy: 'Karnataka Government'
  },

  // Uttar Pradesh Schemes
  { 
    id: 'up-kanya-sumangala', 
    category: 'women', 
    title: mk('Kanya Sumangala Yojana'), 
    shortDescription: mk('Financial support for girl child from birth to graduation in UP.'), 
    longDescription: mk('Provides financial assistance at six stages from birth to graduation to promote education and welfare of girl children in UP.'), 
    benefitsAmount: mk('Total ₹15,000 in stages'), 
    eligibility: { minAge: 0, maxAge: 25, gender: 'Female', occupations: ['All', 'Student'], maxIncome: 300000, states: ['Uttar Pradesh'], categories: ['All'] },
    requiredDocuments: [mk('Birth Certificate'), mk('Income Certificate'), mk('Bank Account')], 
    applicationUrl: 'https://mksy.up.gov.in/',
    startDate: '2019-04-01',
    status: 'active',
    launchedBy: 'UP Government'
  },

  { 
    id: 'up-vishwakarma-shram-samman', 
    category: 'skill-development', 
    title: mk('Vishwakarma Shram Samman Yojana'), 
    shortDescription: mk('Financial assistance for traditional artisans and craftsmen in UP.'), 
    longDescription: mk('Provides financial assistance and free training to traditional workers and artisans to upgrade their skills and increase income.'), 
    benefitsAmount: mk('₹10,000 + Free Tools'), 
    eligibility: { minAge: 18, occupations: ['All'], states: ['Uttar Pradesh'], categories: ['All'] },
    requiredDocuments: docs, 
    applicationUrl: 'https://diupmsme.upsdc.gov.in/',
    startDate: '2018-09-01',
    status: 'active',
    launchedBy: 'UP Government'
  },

  // Rajasthan Schemes
  { 
    id: 'raj-bhamashah', 
    category: 'financial', 
    title: mk('Bhamashah Yojana'), 
    shortDescription: mk('Financial empowerment and social security scheme for women in Rajasthan.'), 
    longDescription: mk('Empowers women through direct benefit transfer with bank or post office accounts in name of female head of family.'), 
    benefitsAmount: mk('DBT in Women Account'), 
    eligibility: { minAge: 0, occupations: ['All'], states: ['Rajasthan'], categories: ['All'] },
    requiredDocuments: docs, 
    applicationUrl: 'https://bhamashah.rajasthan.gov.in/',
    startDate: '2014-08-15',
    status: 'active',
    launchedBy: 'Rajasthan Government'
  },

  { 
    id: 'raj-palanhar', 
    category: 'social-welfare', 
    title: mk('Palanhar Yojana'), 
    shortDescription: mk('Financial support for orphaned and destitute children in Rajasthan.'), 
    longDescription: mk('Provides monthly financial assistance for education and upbringing of orphaned, destitute children, and children of widows.'), 
    benefitsAmount: mk('₹500-₹1,000/month'), 
    eligibility: { minAge: 0, maxAge: 18, occupations: ['All'], states: ['Rajasthan'], categories: ['All'] },
    requiredDocuments: [mk('Aadhaar'), mk('Death/Widow Certificate')], 
    applicationUrl: 'https://sje.rajasthan.gov.in/',
    startDate: '2005-02-08',
    status: 'active',
    launchedBy: 'Rajasthan Government'
  },

  // Bihar Schemes
  { 
    id: 'bihar-mukhyamantri-kanya-utthan', 
    category: 'women', 
    title: mk('Mukhyamantri Kanya Utthan Yojana'), 
    shortDescription: mk('Financial assistance to girl child from birth to graduation in Bihar.'), 
    longDescription: mk('Provides financial support to girl children at different stages from birth to graduation to promote girl education and reduce gender discrimination.'), 
    benefitsAmount: mk('Total ₹54,100 in stages'), 
    eligibility: { minAge: 0, maxAge: 25, gender: 'Female', occupations: ['All', 'Student'], states: ['Bihar'], categories: ['All'] },
    requiredDocuments: docsStudent, 
    applicationUrl: 'https://edudbt.bih.nic.in/',
    startDate: '2018-04-01',
    status: 'active',
    launchedBy: 'Bihar Government'
  },

  { 
    id: 'bihar-startup-policy', 
    category: 'business', 
    title: mk('Bihar Startup Policy'), 
    shortDescription: mk('Financial incentives and ecosystem support for startups in Bihar.'), 
    longDescription: mk('Provides financial support, tax benefits, and infrastructure facilities to encourage entrepreneurship and innovation in Bihar.'), 
    benefitsAmount: mk('Up to ₹10 Lakh Grant'), 
    eligibility: { minAge: 18, occupations: ['Business'], states: ['Bihar'], categories: ['All'] },
    requiredDocuments: docsBusiness, 
    applicationUrl: 'https://startup.bihar.gov.in/',
    startDate: '2017-07-01',
    status: 'active',
    launchedBy: 'Bihar Government'
  },

  // West Bengal Schemes
  { 
    id: 'wb-kanyashree', 
    category: 'women', 
    title: mk('Kanyashree Prakalpa'), 
    shortDescription: mk('Cash transfer scheme for girls to continue education in West Bengal.'), 
    longDescription: mk('Conditional cash transfer scheme to improve the status and well-being of girls by incentivizing schooling and delaying marriage.'), 
    benefitsAmount: mk('₹750/year + ₹25,000 grant'), 
    eligibility: { minAge: 13, maxAge: 19, gender: 'Female', occupations: ['Student'], maxIncome: 120000, states: ['West Bengal'], categories: ['All'] },
    requiredDocuments: docsStudent, 
    applicationUrl: 'https://www.wbkanyashree.gov.in/',
    startDate: '2013-10-01',
    status: 'active',
    launchedBy: 'West Bengal Government'
  },

  { 
    id: 'wb-krishak-bandhu', 
    category: 'farmer', 
    title: mk('Krishak Bandhu Scheme'), 
    shortDescription: mk('Income support and insurance for farmers in West Bengal.'), 
    longDescription: mk('Two-component scheme providing income support of ₹5,000/year and life insurance of ₹2 lakhs for farmers in WB.'), 
    benefitsAmount: mk('₹5,000/year + ₹2L Insurance'), 
    eligibility: { minAge: 18, maxAge: 60, occupations: ['Farmer'], states: ['West Bengal'], categories: ['All'] },
    requiredDocuments: docsFarmer, 
    applicationUrl: 'https://krishakbandhu.net/',
    startDate: '2019-01-01',
    status: 'active',
    launchedBy: 'West Bengal Government'
  },

  // Gujarat Schemes
  { 
    id: 'guj-vahali-dikri', 
    category: 'women', 
    title: mk('Vahali Dikri Yojana'), 
    shortDescription: mk('Financial support for girl child education and marriage in Gujarat.'), 
    longDescription: mk('Provides financial assistance to families for birth and education of girl child with lumpsum amount when she turns 18.'), 
    benefitsAmount: mk('₹1.10 Lakh at age 18'), 
    eligibility: { minAge: 0, maxAge: 18, gender: 'Female', occupations: ['All'], maxIncome: 200000, states: ['Gujarat'], categories: ['All'] },
    requiredDocuments: [mk('Birth Certificate'), mk('Income Certificate')], 
    applicationUrl: 'https://vdsy.gujarat.gov.in/',
    startDate: '2019-08-15',
    status: 'active',
    launchedBy: 'Gujarat Government'
  },

  { 
    id: 'guj-gruh-yojana', 
    category: 'housing', 
    title: mk('Gruh Hakk Yojana'), 
    shortDescription: mk('Affordable housing scheme for urban poor in Gujarat.'), 
    longDescription: mk('Provides affordable housing units to urban poor in Gujarat with ownership rights at subsidized rates.'), 
    benefitsAmount: mk('Subsidy up to ₹1.5L'), 
    eligibility: { minAge: 18, maxIncome: 300000, occupations: ['All'], states: ['Gujarat'], categories: ['All'] },
    requiredDocuments: docsIncome, 
    applicationUrl: 'https://dhousing.gujarat.gov.in/',
    startDate: '2016-01-01',
    status: 'active',
    launchedBy: 'Gujarat Government'
  },

  // Telangana Schemes
  { 
    id: 'tel-rythu-bandhu', 
    category: 'farmer', 
    title: mk('Rythu Bandhu Scheme'), 
    shortDescription: mk('Investment support for farmers in Telangana - ₹5,000/acre/season.'), 
    longDescription: mk('Direct cash transfer scheme providing investment support of ₹5,000 per acre per season (Rabi and Kharif) to farmers in Telangana.'), 
    benefitsAmount: mk('₹10,000/acre/year'), 
    eligibility: { minAge: 18, occupations: ['Farmer'], states: ['Telangana'], categories: ['All'] },
    requiredDocuments: docsFarmer, 
    applicationUrl: 'https://rythubandhu.telangana.gov.in/',
    startDate: '2018-05-10',
    status: 'active',
    launchedBy: 'Telangana Government'
  },

  { 
    id: 'tel-kalyana-lakshmi', 
    category: 'women', 
    title: mk('Kalyana Lakshmi Scheme'), 
    shortDescription: mk('Financial assistance for marriage of girls in Telangana.'), 
    longDescription: mk('Provides financial assistance of ₹1,00,116 for marriage of girls from SC, ST, BC, and minority communities in Telangana.'), 
    benefitsAmount: mk('₹1,00,116'), 
    eligibility: { minAge: 18, maxAge: 35, gender: 'Female', occupations: ['All'], maxIncome: 200000, states: ['Telangana'], categories: ['SC', 'ST', 'BC', 'Minority'] },
    requiredDocuments: [mk('Aadhaar'), mk('Caste Certificate'), mk('Income Certificate')], 
    applicationUrl: 'https://kalyanalakshmi.telangana.gov.in/',
    startDate: '2014-06-02',
    status: 'active',
    launchedBy: 'Telangana Government'
  },

  // Delhi Schemes
  { 
    id: 'delhi-electric-vehicle', 
    category: 'infrastructure', 
    title: mk('Delhi EV Policy'), 
    shortDescription: mk('Incentives for purchase of electric vehicles in Delhi.'), 
    longDescription: mk('Provides purchase incentives, waiver of road tax and registration fees for electric vehicles to reduce pollution in Delhi.'), 
    benefitsAmount: mk('Up to ₹1.5 Lakh Incentive'), 
    eligibility: { minAge: 18, occupations: ['All'], states: ['Delhi'], categories: ['All'] },
    requiredDocuments: [mk('Aadhaar'), mk('Driving License')], 
    applicationUrl: 'https://ev.delhi.gov.in/',
    startDate: '2020-08-07',
    status: 'active',
    launchedBy: 'Delhi Government'
  },

  { 
    id: 'delhi-free-bus', 
    category: 'social-welfare', 
    title: mk('Free Bus Travel for Women'), 
    shortDescription: mk('Free bus travel for women in DTC and cluster buses in Delhi.'), 
    longDescription: mk('Provides completely free travel for women in all DTC and Delhi government cluster buses to ensure safe and affordable transport.'), 
    benefitsAmount: mk('Free Bus Travel'), 
    eligibility: { minAge: 0, gender: 'Female', occupations: ['All'], states: ['Delhi'], categories: ['All'] },
    requiredDocuments: [], 
    applicationUrl: 'https://delhi.gov.in/',
    startDate: '2019-10-29',
    status: 'active',
    launchedBy: 'Delhi Government'
  },

  // Haryana Schemes
  { 
    id: 'haryana-manohar-jyoti', 
    category: 'elderly', 
    title: mk('Manohar Jyoti Yojana'), 
    shortDescription: mk('Pension for senior citizens, widows, and disabled in Haryana.'), 
    longDescription: mk('Social security pension scheme providing monthly pension to senior citizens, widows, disabled persons, and destitute women in Haryana.'), 
    benefitsAmount: mk('₹2,750/month'), 
    eligibility: { minAge: 60, occupations: ['All'], maxIncome: 200000, states: ['Haryana'], categories: ['All'] },
    requiredDocuments: [mk('Aadhaar'), mk('Age Proof'), mk('Income Certificate')], 
    applicationUrl: 'https://socialjusticehry.gov.in/',
    startDate: '2018-01-01',
    status: 'active',
    launchedBy: 'Haryana Government'
  },

  { 
    id: 'haryana-chara-bijai', 
    category: 'farmer', 
    title: mk('Chara-Bijai Yojana'), 
    shortDescription: mk('Financial assistance for fodder cultivation in Haryana.'), 
    longDescription: mk('Provides financial assistance to farmers for cultivation of fodder crops to meet the fodder requirements of dairy animals.'), 
    benefitsAmount: mk('₹10,000/acre'), 
    eligibility: { minAge: 18, occupations: ['Farmer'], states: ['Haryana'], categories: ['All'] },
    requiredDocuments: docsFarmer, 
    applicationUrl: 'https://agriharyana.gov.in/',
    startDate: '2020-01-01',
    status: 'active',
    launchedBy: 'Haryana Government'
  },

  // Punjab Schemes
  { 
    id: 'punjab-shagun', 
    category: 'women', 
    title: mk('Shagun Scheme'), 
    shortDescription: mk('Financial assistance for marriage of girls from SC/OBC families in Punjab.'), 
    longDescription: mk('Provides financial assistance of ₹51,000 for marriage of girls belonging to SC, OBC, and economically weaker sections in Punjab.'), 
    benefitsAmount: mk('₹51,000'), 
    eligibility: { minAge: 18, maxAge: 40, gender: 'Female', occupations: ['All'], maxIncome: 100000, states: ['Punjab'], categories: ['SC', 'OBC'] },
    requiredDocuments: [mk('Aadhaar'), mk('Caste Certificate'), mk('Income Certificate')], 
    applicationUrl: 'https://punjab.gov.in/',
    startDate: '2017-01-01',
    status: 'active',
    launchedBy: 'Punjab Government'
  },

  { 
    id: 'punjab-soil-health', 
    category: 'farmer', 
    title: mk('Soil Health Card Distribution'), 
    shortDescription: mk('Free soil testing and advisory services for farmers in Punjab.'), 
    longDescription: mk('Provides free soil health cards with soil test results and crop-wise fertilizer recommendations to improve soil fertility and crop yields.'), 
    benefitsAmount: mk('Free Soil Testing'), 
    eligibility: { minAge: 18, occupations: ['Farmer'], states: ['Punjab'], categories: ['All'] },
    requiredDocuments: docsFarmer, 
    applicationUrl: 'https://punjabagri.gov.in/',
    startDate: '2016-01-01',
    status: 'active',
    launchedBy: 'Punjab Government'
  },

  // Madhya Pradesh Schemes
  { 
    id: 'mp-ladli-laxmi', 
    category: 'women', 
    title: mk('Ladli Laxmi Yojana'), 
    shortDescription: mk('Financial security for girl child in Madhya Pradesh.'), 
    longDescription: mk('Provides financial security to girl children through investments and cash benefits at various life stages until marriage or higher education.'), 
    benefitsAmount: mk('₹1.18 Lakh Total'), 
    eligibility: { minAge: 0, maxAge: 21, gender: 'Female', occupations: ['All'], states: ['Madhya Pradesh'], categories: ['All'] },
    requiredDocuments: [mk('Birth Certificate'), mk('Parent Aadhaar')], 
    applicationUrl: 'https://ladlilaxmi.mp.gov.in/',
    startDate: '2007-04-01',
    status: 'active',
    launchedBy: 'MP Government'
  },

  { 
    id: 'mp-mukhyamantri-solar-pump', 
    category: 'farmer', 
    title: mk('Mukhyamantri Solar Pump Yojana'), 
    shortDescription: mk('Subsidized solar pumps for farmers in Madhya Pradesh.'), 
    longDescription: mk('Provides solar pumps to farmers at subsidized rates (up to 90% subsidy) to promote sustainable irrigation in MP.'), 
    benefitsAmount: mk('90% Subsidy on Solar Pump'), 
    eligibility: { minAge: 18, occupations: ['Farmer'], states: ['Madhya Pradesh'], categories: ['All'] },
    requiredDocuments: docsFarmer, 
    applicationUrl: 'https://cmsolarpump.mp.gov.in/',
    startDate: '2016-01-01',
    status: 'active',
    launchedBy: 'MP Government'
  },

  // ========== DISTRICT-LEVEL SCHEMES ==========
  
  // Mumbai District (Maharashtra)
  { 
    id: 'mumbai-street-vendor', 
    category: 'business', 
    title: mk('Mumbai Street Vendor Welfare Scheme'), 
    shortDescription: mk('Registration and financial support for street vendors in Mumbai.'), 
    longDescription: mk('Provides identity cards, vending zones, and microfinance support to street vendors in Mumbai district for sustainable livelihood.'), 
    benefitsAmount: mk('₹10,000 Working Capital'), 
    eligibility: { minAge: 18, occupations: ['Business'], states: ['Maharashtra'], districts: ['Mumbai', 'Mumbai Suburban'], categories: ['All'] },
    requiredDocuments: [mk('Aadhaar'), mk('Residence Proof')], 
    applicationUrl: 'https://portal.mcgm.gov.in/',
    startDate: '2019-01-01',
    status: 'active',
    launchedBy: 'Mumbai Municipal Corporation'
  },

  // Bangalore District (Karnataka)
  { 
    id: 'bangalore-e-khata', 
    category: 'infrastructure', 
    title: mk('Bangalore E-Khata Service'), 
    shortDescription: mk('Online property tax and khata services in Bangalore.'), 
    longDescription: mk('Digital property records and online khata application, transfer, and mutation services for Bangalore urban district.'), 
    benefitsAmount: mk('Digital Property Service'), 
    eligibility: { minAge: 18, occupations: ['All'], states: ['Karnataka'], districts: ['Bangalore Urban'], categories: ['All'] },
    requiredDocuments: [mk('Property Documents'), mk('Aadhaar')], 
    applicationUrl: 'https://bbmp.gov.in/',
    startDate: '2018-01-01',
    status: 'active',
    launchedBy: 'Bangalore Municipal Corporation'
  },

  // Hyderabad District (Telangana)
  { 
    id: 'hyderabad-auto-subsidy', 
    category: 'business', 
    title: mk('Auto Rickshaw Subsidy - Hyderabad'), 
    shortDescription: mk('Subsidy for SC/ST candidates to purchase auto rickshaws in Hyderabad.'), 
    longDescription: mk('Provides subsidy for purchasing auto rickshaws to SC/ST candidates in Hyderabad district to promote self-employment.'), 
    benefitsAmount: mk('₹50,000 Subsidy'), 
    eligibility: { minAge: 21, maxAge: 45, occupations: ['All'], states: ['Telangana'], districts: ['Hyderabad'], categories: ['SC', 'ST'] },
    requiredDocuments: [mk('Aadhaar'), mk('Caste Certificate'), mk('Driving License')], 
    applicationUrl: 'https://hyderabad.telangana.gov.in/',
    startDate: '2017-01-01',
    status: 'active',
    launchedBy: 'Hyderabad District Administration'
  },

  // Pune District (Maharashtra)
  { 
    id: 'pune-smart-parking', 
    category: 'infrastructure', 
    title: mk('Pune Smart Parking System'), 
    shortDescription: mk('App-based smart parking solution in Pune city.'), 
    longDescription: mk('Digital parking management system with mobile app for finding and booking parking spaces in Pune district.'), 
    benefitsAmount: mk('Convenient Parking'), 
    eligibility: { minAge: 18, occupations: ['All'], states: ['Maharashtra'], districts: ['Pune'], categories: ['All'] },
    requiredDocuments: [], 
    applicationUrl: 'https://pmc.gov.in/',
    startDate: '2020-01-01',
    status: 'active',
    launchedBy: 'Pune Municipal Corporation'
  },

  // Chennai District (Tamil Nadu)
  { 
    id: 'chennai-amma-canteen', 
    category: 'social-welfare', 
    title: mk('Amma Canteen - Chennai'), 
    shortDescription: mk('Subsidized meals at ₹1-₹5 in Chennai canteens.'), 
    longDescription: mk('Network of Amma canteens in Chennai district providing quality breakfast, lunch, and dinner at highly subsidized rates.'), 
    benefitsAmount: mk('Meals at ₹1-₹5'), 
    eligibility: { minAge: 0, occupations: ['All'], states: ['Tamil Nadu'], districts: ['Chennai'], categories: ['All'] },
    requiredDocuments: [], 
    applicationUrl: 'https://chennai.tn.gov.in/',
    startDate: '2013-02-01',
    status: 'active',
    launchedBy: 'Chennai Corporation'
  },

  // ========== UPCOMING SCHEMES ==========
  
  { 
    id: 'national-health-stack', 
    category: 'health', 
    title: mk('National Health Stack 2.0'), 
    shortDescription: mk('Advanced digital health infrastructure with AI integration.'), 
    longDescription: mk('Next generation digital health infrastructure integrating AI, telemedicine, drug tracking, and unified health records system.'), 
    benefitsAmount: mk('Advanced Health Services'), 
    eligibility: { minAge: 0, occupations: ['All'], states: ['All'], categories: ['All'] },
    requiredDocuments: docs, 
    applicationUrl: 'https://abdm.gov.in/',
    startDate: '2026-07-01',
    status: 'upcoming',
    launchedBy: 'Central Government'
  },

  { 
    id: 'green-energy-subsidy', 
    category: 'infrastructure', 
    title: mk('PM Green Energy Subsidy Scheme'), 
    shortDescription: mk('Subsidy for rooftop solar panels and renewable energy adoption.'), 
    longDescription: mk('Upcoming scheme to provide subsidies for installing rooftop solar panels and other renewable energy solutions for residential and commercial buildings.'), 
    benefitsAmount: mk('40% Subsidy on Solar Installation'), 
    eligibility: { minAge: 18, occupations: ['All'], states: ['All'], categories: ['All'] },
    requiredDocuments: [mk('Property Documents'), mk('Aadhaar')], 
    applicationUrl: 'https://www.india.gov.in/',
    startDate: '2026-09-01',
    status: 'upcoming',
    launchedBy: 'Central Government'
  },

  { 
    id: 'quantum-skill-initiative', 
    category: 'skill-development', 
    title: mk('National Quantum Skills Initiative'), 
    shortDescription: mk('Training in quantum computing and emerging technologies.'), 
    longDescription: mk('Upcoming program to train youth in quantum computing, AI, blockchain, and other emerging technologies to prepare workforce for future industries.'), 
    benefitsAmount: mk('Free Training + Certification'), 
    eligibility: { minAge: 18, maxAge: 35, occupations: ['Student', 'All'], states: ['All'], categories: ['All'] },
    requiredDocuments: docsStudent, 
    applicationUrl: 'https://www.skillindia.gov.in/',
    startDate: '2026-11-01',
    status: 'upcoming',
    launchedBy: 'Central Government'
  },

  // ========== RECENTLY EXPIRED SCHEMES ==========
  
  { 
    id: 'covid-vaccine-certificate', 
    category: 'health', 
    title: mk('COVID-19 Vaccination Certificate'), 
    shortDescription: mk('Free COVID-19 vaccination and digital certificate.'), 
    longDescription: mk('Mass vaccination drive providing free COVID-19 vaccines to all eligible citizens with digital vaccination certificates.'), 
    benefitsAmount: mk('Free Vaccination'), 
    eligibility: { minAge: 12, occupations: ['All'], states: ['All'], categories: ['All'] },
    requiredDocuments: docs, 
    applicationUrl: 'https://www.cowin.gov.in/',
    startDate: '2021-01-16',
    endDate: '2024-12-31',
    status: 'expired',
    launchedBy: 'Central Government'
  },

  { 
    id: 'garib-kalyan-rojgar', 
    category: 'employment', 
    title: mk('Garib Kalyan Rozgar Abhiyaan'), 
    shortDescription: mk('Employment generation for migrant workers during COVID-19.'), 
    longDescription: mk('125-day campaign to provide employment and livelihood opportunities to migrant workers who returned to villages during COVID-19 pandemic.'), 
    benefitsAmount: mk('Employment Opportunities'), 
    eligibility: { minAge: 18, maxAge: 60, occupations: ['All'], states: ['All'], categories: ['All'] },
    requiredDocuments: docs, 
    applicationUrl: 'https://gkra.nic.in/',
    startDate: '2020-06-20',
    endDate: '2020-10-31',
    status: 'expired',
    launchedBy: 'Central Government'
  },
];
