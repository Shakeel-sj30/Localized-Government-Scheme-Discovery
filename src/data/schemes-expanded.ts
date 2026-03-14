export type SchemeCategory = 'farmer' | 'student' | 'women' | 'business' | 'health' | 'housing' | 'financial' | 'employment' | 'infrastructure' | 'education' | 'social-welfare' | 'skill-development' | 'elderly' | 'disability' | 'tribal';

export type SchemeStatus = 'active' | 'expired' | 'upcoming' | 'suspended';

export interface Scheme {
  id: string;
  category: SchemeCategory;
  title: Record<string, string>;
  shortDescription: Record<string, string>;
  longDescription: Record<string, string>;
  benefitsAmount: Record<string, string>;
  eligibility: {
    minAge?: number;
    maxAge?: number;
    gender?: 'All' | 'Female' | 'Male';
    occupations: string[];
    maxIncome?: number;
    minIncome?: number;
    states: string[];
    districts?: string[];
    categories: string[];
  };
  requiredDocuments: Record<string, string>[];
  applicationUrl: string;
  startDate?: string;
  endDate?: string;
  status: SchemeStatus;
  launchedBy?: string;
}

const mk = (text: string) => ({ en: text, hi: text, ta: text, te: text });
const docs = [mk('Aadhaar Card')];
const docsIncome = [mk('Aadhaar Card'), mk('Income Certificate')];
const docsCaste = [mk('Aadhaar Card'), mk('Caste Certificate')];
const docsFarmer = [mk('Aadhaar Card'), mk('Land Records')];
const docsStudent = [mk('Aadhaar Card'), mk('Mark Sheet'), mk('Income Certificate')];
const docsBusiness = [mk('Aadhaar Card'), mk('Business Registration'), mk('PAN Card')];

export const schemes: Scheme[] = [
  // ============ NATIONAL SCHEMES (ALL STATES) ============

  // Financial - National
  {
    id: 'pm-jan-dhan',
    category: 'financial',
    title: mk('Pradhan Mantri Jan Dhan Yojana'),
    shortDescription: mk('Zero balance bank accounts with RuPay debit card and accident insurance.'),
    longDescription: mk('National Mission on Financial Inclusion ensuring access to various financial services like bank accounts, remittances, credit, insurance, and pension.'),
    benefitsAmount: mk('Zero Balance Account + ₹2L Insurance'),
    eligibility: { minAge: 10, occupations: ['All'], states: ['All'], categories: ['All'] },
    requiredDocuments: docs,
    applicationUrl: 'https://pmjdy.gov.in/',
    startDate: '2014-08-28',
    status: 'active',
    launchedBy: 'Central Government'
  },

  {
    id: 'atal-pension',
    category: 'financial',
    title: mk('Atal Pension Yojana'),
    shortDescription: mk('Guaranteed pension of ₹1000-5000/month after 60 years for unorganized sector workers.'),
    longDescription: mk('A pension scheme primarily targeted at the unorganized sector workers aged 18-40 years. Guaranteed monthly pension from age 60.'),
    benefitsAmount: mk('₹1,000-₹5,000/month Pension'),
    eligibility: { minAge: 18, maxAge: 40, occupations: ['All'], states: ['All'], categories: ['All'] },
    requiredDocuments: docs,
    applicationUrl: 'https://www.npscra.nsdl.co.in/scheme-details.php',
    startDate: '2015-05-09',
    status: 'active',
    launchedBy: 'Central Government'
  },

  {
    id: 'pm-jeevan-jyoti',
    category: 'financial',
    title: mk('PM Jeevan Jyoti Bima Yojana'),
    shortDescription: mk('Life insurance cover of ₹2 Lakh at premium of ₹436/year.'),
    longDescription: mk('Life insurance scheme available to people aged 18-50 years having bank account. Renewable annually with coverage of ₹2 lakh for death.'),
    benefitsAmount: mk('₹2 Lakh Life Cover'),
    eligibility: { minAge: 18, maxAge: 50, occupations: ['All'], states: ['All'], categories: ['All'] },
    requiredDocuments: docs,
    applicationUrl: 'https://www.jansuraksha.gov.in/',
    startDate: '2015-05-09',
    status: 'active',
    launchedBy: 'Central Government'
  },

  {
    id: 'pm-suraksha-bima',
    category: 'financial',
    title: mk('PM Suraksha Bima Yojana'),
    shortDescription: mk('Accident insurance of ₹2 Lakh at premium of just ₹20/year.'),
    longDescription: mk('Accident insurance scheme offering coverage for death or disability due to an accident at affordable premium of only ₹20 per year.'),
    benefitsAmount: mk('₹2 Lakh Accident Cover'),
    eligibility: { minAge: 18, maxAge: 70, occupations: ['All'], states: ['All'], categories: ['All'] },
    requiredDocuments: docs,
    applicationUrl: 'https://www.jansuraksha.gov.in/',
    startDate: '2015-05-09',
    status: 'active',
    launchedBy: 'Central Government'
  },

  {
    id: 'sukanya-samriddhi',
    category: 'financial',
    title: mk('Sukanya Samriddhi Yojana'),
    shortDescription: mk('Small savings scheme for the girl child with high interest rate.'),
    longDescription: mk('A Government of India backed saving scheme for girl children under 10 years. Offers attractive interest rates and tax benefits under Section 80C.'),
    benefitsAmount: mk('8.2% Interest + Tax Benefits'),
    eligibility: { minAge: 0, maxAge: 10, gender: 'Female', occupations: ['All'], states: ['All'], categories: ['All'] },
    requiredDocuments: [mk('Birth Certificate'), mk('Guardian ID Proof')],
    applicationUrl: 'https://www.indiapost.gov.in/',
    startDate: '2015-01-22',
    status: 'active',
    launchedBy: 'Central Government'
  },

  {
    id: 'national-pension',
    category: 'financial',
    title: mk('National Pension Scheme'),
    shortDescription: mk('Voluntary retirement savings scheme for all citizens.'),
    longDescription: mk('Market-linked retirement savings scheme offering pension benefits with tax advantages under Section 80C and 80CCD.'),
    benefitsAmount: mk('Tax Benefits + Market Returns'),
    eligibility: { minAge: 18, maxAge: 70, occupations: ['All'], states: ['All'], categories: ['All'] },
    requiredDocuments: [mk('Aadhaar'), mk('PAN Card'), mk('Bank Details')],
    applicationUrl: 'https://www.npscra.nsdl.co.in/',
    startDate: '2004-01-01',
    status: 'active',
    launchedBy: 'Central Government'
  },

  // Farmer - National
  {
    id: 'pm-kisan',
    category: 'farmer',
    title: mk('PM Kisan Samman Nidhi'),
    shortDescription: mk('Income support of ₹6000/year for farmer families in three installments.'),
    longDescription: mk('Under PM-KISAN, all landholding farmer families shall be provided financial benefit of ₹6000 per year payable in three equal installments of ₹2000 each every four months.'),
    benefitsAmount: mk('₹6,000/year'),
    eligibility: { minAge: 18, occupations: ['Farmer'], states: ['All'], categories: ['All'] },
    requiredDocuments: docsFarmer,
    applicationUrl: 'https://pmkisan.gov.in/',
    startDate: '2018-12-01',
    status: 'active',
    launchedBy: 'Central Government'
  },

  {
    id: 'pm-fasal-bima',
    category: 'farmer',
    title: mk('PM Fasal Bima Yojana'),
    shortDescription: mk('Crop insurance scheme providing comprehensive coverage against crop loss.'),
    longDescription: mk('Provides comprehensive insurance cover including prevented sowing, standing crop, post-harvest losses, and localized calamities. Premium shared between farmers and government.'),
    benefitsAmount: mk('Crop Insurance Cover'),
    eligibility: { minAge: 18, occupations: ['Farmer'], states: ['All'], categories: ['All'] },
    requiredDocuments: docsFarmer,
    applicationUrl: 'https://pmfby.gov.in/',
    startDate: '2016-02-18',
    status: 'active',
    launchedBy: 'Central Government'
  },

  {
    id: 'pm-krishi-sinchayee',
    category: 'farmer',
    title: mk('PM Krishi Sinchayee Yojana'),
    shortDescription: mk('Ensuring access to irrigation for every farm - Har Khet Ko Paani.'),
    longDescription: mk('Scheme to expand cultivable area under assured irrigation, improve water use efficiency, introduce sustainable water conservation practices, and adopt precision irrigation.'),
    benefitsAmount: mk('Irrigation Infrastructure Support'),
    eligibility: { minAge: 18, occupations: ['Farmer'], states: ['All'], categories: ['All'] },
    requiredDocuments: docsFarmer,
    applicationUrl: 'https://pmksy.gov.in/',
    startDate: '2015-07-01',
    status: 'active',
    launchedBy: 'Central Government'
  },

  {
    id: 'soil-health-card',
    category: 'farmer',
    title: mk('Soil Health Card Scheme'),
    shortDescription: mk('Free soil testing and nutrient recommendations for optimal crop yield.'),
    longDescription: mk('Provides soil health cards to farmers with crop-wise recommendations of nutrients and fertilizers required for individual farms.'),
    benefitsAmount: mk('Free Soil Testing'),
    eligibility: { minAge: 18, occupations: ['Farmer'], states: ['All'], categories: ['All'] },
    requiredDocuments: docsFarmer,
    applicationUrl: 'https://soilhealth.dac.gov.in/',
    startDate: '2015-02-19',
    status: 'active',
    launchedBy: 'Central Government'
  },

  {
    id: 'kisan-credit-card',
    category: 'farmer',
    title: mk('Kisan Credit Card (KCC)'),
    shortDescription: mk('Credit facilities for timely agricultural inputs and expenses.'),
    longDescription: mk('Provides adequate and timely credit support from the banking system to farmers for comprehensive credit requirements including cultivation and post-harvest expenses.'),
    benefitsAmount: mk('Credit up to ₹3 Lakhs'),
    eligibility: { minAge: 18, occupations: ['Farmer'], states: ['All'], categories: ['All'] },
    requiredDocuments: docsFarmer,
    applicationUrl: 'https://www.nabard.org/schemes-kcc.aspx',
    startDate: '1998-08-01',
    status: 'active',
    launchedBy: 'Central Government'
  },

  // Health - National
  {
    id: 'ayushman-bharat',
    category: 'health',
    title: mk('Ayushman Bharat - PM Jan Arogya Yojana'),
    shortDescription: mk('Health insurance of ₹5 Lakh per family per year.'),
    longDescription: mk('World\'s largest health insurance scheme providing health cover of Rs. 5 lakhs per family per year for secondary and tertiary care hospitalization to over 50 crore beneficiaries.'),
    benefitsAmount: mk('₹5 Lakh Health Cover/Family'),
    eligibility: { minAge: 0, occupations: ['All'], maxIncome: 500000, states: ['All'], categories: ['All'] },
    requiredDocuments: docsIncome,
    applicationUrl: 'https://pmjay.gov.in/',
    startDate: '2018-09-23',
    status: 'active',
    launchedBy: 'Central Government'
  },

  {
    id: 'digital-health-mission',
    category: 'health',
    title: mk('National Digital Health Mission'),
    shortDescription: mk('Unique health ID for every citizen - digital health records.'),
    longDescription: mk('Creates digital health ecosystem to support integrated digital health infrastructure with health ID, health records, telemedicine, and e-pharmacy services.'),
    benefitsAmount: mk('Free Health ID'),
    eligibility: { minAge: 0, occupations: ['All'], states: ['All'], categories: ['All'] },
    requiredDocuments: docs,
    applicationUrl: 'https://abdm.gov.in/',
    startDate: '2020-08-15',
    status: 'active',
    launchedBy: 'Central Government'
  },

  {
    id: 'mission-indradhanush',
    category: 'health',
    title: mk('Mission Indradhanush'),
    shortDescription: mk('Full immunization coverage for all children under 2 years.'),
    longDescription: mk('Mission to ensure full immunization with all available vaccines for children up to two years of age and pregnant women covering 12 diseases.'),
    benefitsAmount: mk('Free Vaccination'),
    eligibility: { minAge: 0, maxAge: 5, occupations: ['All'], states: ['All'], categories: ['All'] },
    requiredDocuments: [mk('Birth Certificate')],
    applicationUrl: 'https://www.nhp.gov.in/',
    startDate: '2014-12-25',
    status: 'active',
    launchedBy: 'Central Government'
  },

  {
    id: 'janani-suraksha',
    category: 'health',
    title: mk('Janani Suraksha Yojana'),
    shortDescription: mk('Cash assistance for pregnant women for institutional delivery.'),
    longDescription: mk('Safe motherhood intervention scheme promoting institutional delivery among poor pregnant women. Provides cash assistance for delivery in health facilities.'),
    benefitsAmount: mk('₹1,400-₹1,000 Cash'),
    eligibility: { minAge: 18, maxAge: 50, gender: 'Female', occupations: ['All'], maxIncome: 100000, states: ['All'], categories: ['All'] },
    requiredDocuments: [mk('Aadhaar'), mk('Pregnancy Card')],
    applicationUrl: 'https://nhm.gov.in/index1.php?lang=1&level=3&sublinkid=841&lid=309',
    startDate: '2005-04-01',
    status: 'active',
    launchedBy: 'Central Government'
  },

  // Housing - National
  {
    id: 'pmay-urban',
    category: 'housing',
    title: mk('PM Awas Yojana (Urban)'),
    shortDescription: mk('Affordable housing for urban poor with interest subsidy.'),
    longDescription: mk('Housing for All mission in urban areas providing four verticals: In-situ slum redevelopment, credit linked subsidy, affordable housing, and beneficiary-led construction.'),
    benefitsAmount: mk('Interest Subsidy up to ₹2.67L'),
    eligibility: { minAge: 18, maxIncome: 1800000, occupations: ['All'], states: ['All'], categories: ['All'] },
    requiredDocuments: docsIncome,
    applicationUrl: 'https://pmaymis.gov.in/',
    startDate: '2015-06-25',
    status: 'active',
    launchedBy: 'Central Government'
  },

  {
    id: 'pmay-gramin',
    category: 'housing',
    title: mk('PM Awas Yojana (Gramin)'),
    shortDescription: mk('Housing assistance for rural households without pucca house.'),
    longDescription: mk('Provides financial assistance for construction of pucca house with basic amenities to rural poor families. Beneficiaries can avail loan up to Rs 70,000.'),
    benefitsAmount: mk('₹1.20 Lakh Financial Aid'),
    eligibility: { minAge: 18, occupations: ['All', 'Farmer'], states: ['All'], categories: ['All'] },
    requiredDocuments: docsIncome,
    applicationUrl: 'https://pmayg.nic.in/',
    startDate: '2016-04-01',
    status: 'active',
    launchedBy: 'Central Government'
  },

  // Women - National
  {
    id: 'beti-bachao',
    category: 'women',
    title: mk('Beti Bachao Beti Padhao'),
    shortDescription: mk('Empowerment of the girl child - addressing gender bias.'),
    longDescription: mk('MultiMinistry campaign addressing declining Child Sex Ratio and creating awareness about education and empowerment of girl children.'),
    benefitsAmount: mk('Awareness + Support'),
    eligibility: { minAge: 0, maxAge: 18, gender: 'Female', occupations: ['All'], states: ['All'], categories: ['All'] },
    requiredDocuments: [mk('Birth Certificate')],
    applicationUrl: 'https://wcd.nic.in/bbbp-schemes',
    startDate: '2015-01-22',
    status: 'active',
    launchedBy: 'Central Government'
  },

  {
    id: 'pm-matru-vandana',
    category: 'women',
    title: mk('PM Matru Vandana Yojana'),
    shortDescription: mk('Cash incentive for pregnant and lactating mothers for first child.'),
    longDescription: mk('Maternity benefit program providing cash incentive of Rs.5000 in three installments for pregnant and lactating mothers for better health and nutrition.'),
    benefitsAmount: mk('₹5,000 Cash Transfer'),
    eligibility: { minAge: 19, gender: 'Female', occupations: ['All'], states: ['All'], categories: ['All'] },
    requiredDocuments: [mk('Aadhaar'), mk('Pregnancy Registration Card')],
    applicationUrl: 'https://pmmvy.wcd.gov.in/',
    startDate: '2017-01-01',
    status: 'active',
    launchedBy: 'Central Government'
  },

  {
    id: 'mahila-shakti-kendra',
    category: 'women',
    title: mk('Mahila Shakti Kendra'),
    shortDescription: mk('Scheme for empowerment of rural women through community participation.'),
    longDescription: mk('Provides platform to empower rural women through awareness, skill development, employment, digital literacy, health and nutrition support.'),
    benefitsAmount: mk('Skill Training + Support'),
    eligibility: { minAge: 18, gender: 'Female', occupations: ['All'], states: ['All'], categories: ['All'] },
    requiredDocuments: docs,
    applicationUrl: 'https://wcd.nic.in/',
    startDate: '2017-04-01',
    status: 'active',
    launchedBy: 'Central Government'
  },

  {
    id: 'free-silai-machine',
    category: 'women',
    title: mk('Free Silai Machine Yojana'),
    shortDescription: mk('Free sewing machines for women to become self-employed.'),
    longDescription: mk('Distribution of free sewing machines to economically disadvantaged women across India to help them establish home-based tailoring business.'),
    benefitsAmount: mk('Free Sewing Machine'),
    eligibility: { minAge: 20, maxAge: 40, gender: 'Female', occupations: ['All'], maxIncome: 120000, states: ['All'], categories: ['All'] },
    requiredDocuments: docsIncome,
    applicationUrl: 'https://www.india.gov.in/',
    startDate: '2020-01-01',
    status: 'active',
    launchedBy: 'Central Government'
  },

  // Student - National
  {
    id: 'nsp-scholarship',
    category: 'student',
    title: mk('National Scholarship Portal'),
    shortDescription: mk('Scholarships for students from Class 1 to Post-Graduation.'),
    longDescription: mk('One-stop solution for end-to-end scholarship process - from applying to funds disbursement to students. Various scholarships for SC/ST/OBC/Minorities.'),
    benefitsAmount: mk('₹1,000 - ₹20,000/year'),
    eligibility: { minAge: 5, maxAge: 30, maxIncome: 250000, occupations: ['Student'], states: ['All'], categories: ['SC', 'ST', 'OBC', 'Minority'] },
    requiredDocuments: docsStudent,
    applicationUrl: 'https://scholarships.gov.in/',
    startDate: '2011-09-01',
    status: 'active',
    launchedBy: 'Central Government'
  },

  {
    id: 'inspire-scholarship',
    category: 'student',
    title: mk('INSPIRE Scholarship'),
    shortDescription: mk('Scholarship for pursuing undergraduate studies in Natural and Basic Sciences.'),
    longDescription: mk('Innovation in Science Pursuit for Inspired Research (INSPIRE) scheme provides scholarships to attract talent to the study and career in science.'),
    benefitsAmount: mk('₹80,000/year'),
    eligibility: { minAge: 17, maxAge: 22, occupations: ['Student'], states: ['All'], categories: ['All'] },
    requiredDocuments: docsStudent,
    applicationUrl: 'https://online-inspire.gov.in/',
    startDate: '2008-11-01',
    status: 'active',
    launchedBy: 'Central Government'
  },

  {
    id: 'central-sector-scholarship',
    category: 'student',
    title: mk('Central Sector Scholarship Scheme'),
    shortDescription: mk('Merit-based scholarship for college and university students.'),
    longDescription: mk('Scholarship for college/university students whose family income is less than Rs 8 lakh per annum. Selection based on Class 12 board exam marks.'),
    benefitsAmount: mk('₹10,000-₹20,000/year'),
    eligibility: { minAge: 17, maxAge: 25, maxIncome: 800000, occupations: ['Student'], states: ['All'], categories: ['All'] },
    requiredDocuments: docsStudent,
    applicationUrl: 'https://scholarships.gov.in/',
    startDate: '2008-01-01',
    status: 'active',
    launchedBy: 'Central Government'
  },

  // Employment - National
  {
    id: 'skill-india',
    category: 'employment',
    title: mk('Skill India Mission'),
    shortDescription: mk('Umbrella program for skill development and entrepreneurship training.'),
    longDescription: mk('Initiative to train over 40 crore people in India in different skills by 2022 through various programs under the National Skill Development Mission.'),
    benefitsAmount: mk('Free Skill Training'),
    eligibility: { minAge: 15, maxAge: 45, occupations: ['Student', 'Unemployed', 'All'], states: ['All'], categories: ['All'] },
    requiredDocuments: docs,
    applicationUrl: 'https://www.skillindia.gov.in/',
    startDate: '2015-07-15',
    status: 'active',
    launchedBy: 'Central Government'
  },

  {
    id: 'pmkvy',
    category: 'employment',
    title: mk('PM Kaushal Vikas Yojana'),
    shortDescription: mk('Free skill training for youth with certification and cash reward.'),
    longDescription: mk('Flagship scheme providing industry-relevant skill training to Indian youth enabling them to secure better livelihoods with monetary rewards.'),
    benefitsAmount: mk('Free Training + ₹8,000 Reward'),
    eligibility: { minAge: 15, maxAge: 45, occupations: ['Student', 'Unemployed', 'All'], states: ['All'], categories: ['All'] },
    requiredDocuments: docs,
    applicationUrl: 'https://www.pmkvyofficial.org/',
    startDate: '2015-07-15',
    status: 'active',
    launchedBy: 'Central Government'
  },

  {
    id: 'national-career',
    category: 'employment',
    title: mk('National Career Service'),
    shortDescription: mk('Online platform connecting job seekers with employers nationwide.'),
    longDescription: mk('Portal provides career related services like job matching, career counseling, vocational guidance, information on skill development courses and apprenticeship opportunities.'),
    benefitsAmount: mk('Free Job Portal'),
    eligibility: { minAge: 15, maxAge: 60, occupations: ['All', 'Unemployed', 'Student'], states: ['All'], categories: ['All'] },
    requiredDocuments: docs,
    applicationUrl: 'https://www.ncs.gov.in/',
    startDate: '2015-07-20',
    status: 'active',
    launchedBy: 'Central Government'
  },

  {
    id: 'deen-dayal-upadhyaya',
    category: 'employment',
    title: mk('Deen Dayal Upadhyaya Grameen Kaushalya Yojana'),
    shortDescription: mk('Skill development program for rural poor youth.'),
    longDescription: mk('Placement linked skill development scheme for rural youths from poor families. Focus on sustainable employment through training and placement support.'),
    benefitsAmount: mk('Free Training + Placement'),
    eligibility: { minAge: 15, maxAge: 35, occupations: ['Unemployed'], maxIncome: 100000, states: ['All'], categories: ['All'] },
    requiredDocuments: docsIncome,
    applicationUrl: 'https://ddugky.gov.in/',
    startDate: '2014-09-25',
    status: 'active',
    launchedBy: 'Central Government'
  },

  // Business - National
  {
    id: 'startup-india',
    category: 'business',
    title: mk('Startup India'),
    shortDescription: mk('Action plan for startup ecosystem with tax benefits and funding.'),
    longDescription: mk('Initiative to build a strong ecosystem for nurturing innovation and startups in India with tax benefits, simplified compliance, IPR fast-tracking, and funding support.'),
    benefitsAmount: mk('Tax Holiday + Funding Support'),
    eligibility: { minAge: 18, occupations: ['Business', 'All'], states: ['All'], categories: ['All'] },
    requiredDocuments: docsBusiness,
    applicationUrl: 'https://www.startupindia.gov.in/',
    startDate: '2016-01-16',
    status: 'active',
    launchedBy: 'Central Government'
  },

  {
    id: 'standup-india',
    category: 'business',
    title: mk('Stand Up India'),
    shortDescription: mk('Bank loans between ₹10L-₹1Cr for SC/ST and women entrepreneurs.'),
    longDescription: mk('Facilitates bank loans between Rs 10 lakh to Rs 1 crore to at least one SC/ST borrower and one woman per bank branch for greenfield enterprises.'),
    benefitsAmount: mk('Loan ₹10L to ₹1 Crore'),
    eligibility: { minAge: 18, occupations: ['Business', 'All'], states: ['All'], categories: ['SC', 'ST', 'Female', 'All'] },
    requiredDocuments: docsBusiness,
    applicationUrl: 'https://www.standupmitra.in/',
    startDate: '2016-04-05',
    status: 'active',
    launchedBy: 'Central Government'
  },

  {
    id: 'pm-mudra',
    category: 'business',
    title: mk('PM Mudra Yojana'),
    shortDescription: mk('Loans up to ₹10 Lakhs for micro and small enterprises.'),
    longDescription: mk('Provides loans to micro/small business units and individuals for income-generating activities through Shishu (<50k), Kishore (50k-5L), Tarun (5L-10L) categories.'),
    benefitsAmount: mk('Loan up to ₹10 Lakhs'),
    eligibility: { minAge: 18, occupations: ['Business', 'Unemployed', 'All'], states: ['All'], categories: ['All'] },
    requiredDocuments: docsBusiness,
    applicationUrl: 'https://www.mudra.org.in/',
    startDate: '2015-04-08',
    status: 'active',
    launchedBy: 'Central Government'
  },

  {
    id: 'msme-champion',
    category: 'business',
    title: mk('MSME CHAMPIONS Portal'),
    shortDescription: mk('Technology-based control and help to MSMEs for easier resolutions.'),
    longDescription: mk('Portal for MSME grievance resolution, monitoring and tracking. Aims to assist, resolve, guide, and handhold MSMEs in their operations.'),
    benefitsAmount: mk('Grievance Resolution'),
    eligibility: { minAge: 18, occupations: ['Business'], states: ['All'], categories: ['All'] },
    requiredDocuments: docsBusiness,
    applicationUrl: 'https://champions.gov.in/',
    startDate: '2020-06-01',
    status: 'active',
    launchedBy: 'Central Government'
  },

  // Infrastructure - National
  {
    id: 'swachh-bharat',
    category: 'infrastructure',
    title: mk('Swachh Bharat Mission'),
    shortDescription: mk('National campaign for clean India with toilet construction subsidy.'),
    longDescription: mk('Nationwide cleanliness campaign including construction of toilets, waste management, and behavior change towards sanitation. Divided into urban and rural missions.'),
    benefitsAmount: mk('₹12,000 Toilet Subsidy'),
    eligibility: { minAge: 18, occupations: ['All'], states: ['All'], categories: ['All'] },
    requiredDocuments: docs,
    applicationUrl: 'https://swachhbharatmission.gov.in/',
    startDate: '2014-10-02',
    status: 'active',
    launchedBy: 'Central Government'
  },

  {
    id: 'digital-india',
    category: 'infrastructure',
    title: mk('Digital India'),
    shortDescription: mk('Transforming India into digitally empowered society and knowledge economy.'),
    longDescription: mk('Programme to ensure government services are available to citizens electronically by improving online infrastructure and internet connectivity.'),
    benefitsAmount: mk('Digital Services Access'),
    eligibility: { minAge: 0, occupations: ['All'], states: ['All'], categories: ['All'] },
    requiredDocuments: docs,
    applicationUrl: 'https://www.digitalindia.gov.in/',
    startDate: '2015-07-01',
    status: 'active',
    launchedBy: 'Central Government'
  },

  {
    id: 'amrut-mission',
    category: 'infrastructure',
    title: mk('AMRUT Mission'),
    shortDescription: mk('Atal Mission for urban infrastructure - water supply and sewerage.'),
    longDescription: mk('Provides basic services like water supply, sewerage, urban transport to households and builds amenities in cities which will improve the quality of life for all.'),
    benefitsAmount: mk('Urban Infrastructure'),
    eligibility: { minAge: 18, occupations: ['All'], states: ['All'], categories: ['All'] },
    requiredDocuments: docs,
    applicationUrl: 'https://amrut.gov.in/',
    startDate: '2015-06-25',
    status: 'active',
    launchedBy: 'Central Government'
  },

  {
    id: 'smart-cities',
    category: 'infrastructure',
    title: mk('Smart Cities Mission'),
    shortDescription: mk('Development of 100 smart cities across India with modern infrastructure.'),
    longDescription: mk('Urban renewal and retrofitting program developing 100 cities to make them citizen-friendly and sustainable through smart solutions and technology.'),
    benefitsAmount: mk('Smart Infrastructure'),
    eligibility: { minAge: 0, occupations: ['All'], states: ['All'], categories: ['All'] },
    requiredDocuments: docs,
    applicationUrl: 'https://smartcities.gov.in/',
    startDate: '2015-06-25',
    status: 'active',
    launchedBy: 'Central Government'
  },

  // ==========CONTINUED IN NEXT SECTION DUE TO LENGTH==========
];
