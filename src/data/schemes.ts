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

import { statesAndUTs } from './states';
// Import additional schemes
import { additionalSchemes } from './schemes-additional';

const schemeTemplates: Array<{
  key: string;
  category: SchemeCategory;
  occupations: string[];
  categories: string[];
  benefit: string;
}> = [
  { key: 'farmer-support', category: 'farmer', occupations: ['Farmer'], categories: ['All'], benefit: '₹8,000/year' },
  { key: 'student-scholarship', category: 'student', occupations: ['Student'], categories: ['All'], benefit: '₹12,000/year' },
  { key: 'women-enterprise', category: 'women', occupations: ['All'], categories: ['Female', 'All'], benefit: '₹50,000 support' },
  { key: 'health-cover', category: 'health', occupations: ['All'], categories: ['All'], benefit: '₹3 Lakh cover' },
  { key: 'housing-grant', category: 'housing', occupations: ['All'], categories: ['All'], benefit: '₹1.5 Lakh grant' },
  { key: 'small-business', category: 'business', occupations: ['Business', 'All'], categories: ['All'], benefit: 'Loan up to ₹5L' },
  { key: 'skill-upgrade', category: 'skill-development', occupations: ['Student', 'Unemployed', 'All'], categories: ['All'], benefit: 'Free training + stipend' },
  { key: 'social-pension', category: 'elderly', occupations: ['All'], categories: ['All'], benefit: '₹2,000/month' },
  { key: 'disability-aid', category: 'disability', occupations: ['All'], categories: ['All'], benefit: '₹2,500/month' },
  { key: 'tribal-development', category: 'tribal', occupations: ['All'], categories: ['ST', 'All'], benefit: '₹75,000 support' },
  { key: 'digital-infra', category: 'infrastructure', occupations: ['All'], categories: ['All'], benefit: 'Digital citizen services' },
  { key: 'employment-mission', category: 'employment', occupations: ['Unemployed', 'All'], categories: ['All'], benefit: 'Placement support' },
  { key: 'financial-inclusion', category: 'financial', occupations: ['All'], categories: ['All'], benefit: 'Interest subsidy' },
  { key: 'education-boost', category: 'education', occupations: ['Student'], categories: ['All'], benefit: 'Tuition assistance' },
  { key: 'social-welfare', category: 'social-welfare', occupations: ['All'], categories: ['All'], benefit: 'Direct benefit transfer' },
];

const districtMap: Record<string, string[]> = {
  'Maharashtra': ['Mumbai', 'Pune', 'Nagpur'],
  'Tamil Nadu': ['Chennai', 'Coimbatore', 'Madurai'],
  'Karnataka': ['Bangalore Urban', 'Mysuru', 'Mangaluru'],
  'Uttar Pradesh': ['Lucknow', 'Varanasi', 'Kanpur Nagar'],
  'Rajasthan': ['Jaipur', 'Jodhpur', 'Udaipur'],
  'Gujarat': ['Ahmedabad', 'Surat', 'Vadodara'],
  'West Bengal': ['Kolkata', 'Howrah', 'Darjeeling'],
  'Telangana': ['Hyderabad', 'Warangal', 'Nizamabad'],
  'Kerala': ['Thiruvananthapuram', 'Kochi', 'Kozhikode'],
  'Delhi': ['New Delhi', 'North Delhi', 'South Delhi'],
};

const generatedStateSchemes: Scheme[] = statesAndUTs.flatMap((state, stateIndex) =>
  schemeTemplates.map((template, templateIndex) => {
    const statusCycle: SchemeStatus[] = ['active', 'active', 'active', 'upcoming', 'expired'];
    const status = statusCycle[(stateIndex + templateIndex) % statusCycle.length];
    const year = 2018 + ((stateIndex + templateIndex) % 8);
    const startDate = `${year}-04-01`;
    const endDate = status === 'expired' ? `${year + 1}-03-31` : undefined;
    const stateTypeLabel = state.type === 'state' ? 'State' : 'UT';

    return {
      id: `${state.id}-${template.key}`,
      category: template.category,
      title: mk(`${state.name} ${stateTypeLabel} ${template.key.split('-').map(word => word[0].toUpperCase() + word.slice(1)).join(' ')} Scheme`),
      shortDescription: mk(`${template.key.split('-').join(' ')} support program for eligible beneficiaries in ${state.name}.`),
      longDescription: mk(`This ${stateTypeLabel.toLowerCase()} level scheme supports eligible citizens in ${state.name} under ${template.key.split('-').join(' ')} initiatives with transparent online applications and benefit delivery.`),
      benefitsAmount: mk(template.benefit),
      eligibility: {
        minAge: template.category === 'student' ? 12 : 18,
        maxAge: template.category === 'elderly' ? undefined : 60,
        occupations: template.occupations,
        states: [state.name],
        categories: template.categories,
      },
      requiredDocuments: docs,
      applicationUrl: state.schemePortal,
      startDate,
      endDate,
      status,
      launchedBy: `${state.name} Government`,
    };
  })
);

const generatedDistrictSchemes: Scheme[] = Object.entries(districtMap).flatMap(([stateName, districts], stateIndex) =>
  districts.flatMap((district, districtIndex) =>
    ['district-employment', 'district-health', 'district-business', 'district-housing', 'district-student'].map((key, keyIndex) => {
      const categoryMap: Record<string, SchemeCategory> = {
        'district-employment': 'employment',
        'district-health': 'health',
        'district-business': 'business',
        'district-housing': 'housing',
        'district-student': 'student',
      };
      const statusCycle: SchemeStatus[] = ['active', 'active', 'upcoming', 'expired'];
      const status = statusCycle[(stateIndex + districtIndex + keyIndex) % statusCycle.length];
      const year = 2019 + ((stateIndex + districtIndex + keyIndex) % 7);

      return {
        id: `${stateName.toLowerCase().replace(/\s+/g, '-')}-${district.toLowerCase().replace(/\s+/g, '-')}-${key}`,
        category: categoryMap[key],
        title: mk(`${district} ${key.split('-')[1][0].toUpperCase() + key.split('-')[1].slice(1)} Support Scheme`),
        shortDescription: mk(`${key.split('-')[1]} support initiative for residents of ${district}, ${stateName}.`),
        longDescription: mk(`District administration scheme focused on ${key.split('-')[1]} benefits for residents of ${district} in ${stateName}.`),
        benefitsAmount: mk('District benefit package'),
        eligibility: {
          minAge: key.includes('student') ? 12 : 18,
          occupations: key.includes('student') ? ['Student'] : ['All'],
          states: [stateName],
          districts: [district],
          categories: ['All'],
        },
        requiredDocuments: docs,
        applicationUrl: 'https://www.india.gov.in/',
        startDate: `${year}-06-01`,
        endDate: status === 'expired' ? `${year + 1}-05-31` : undefined,
        status,
        launchedBy: `${district} District Administration`,
      };
    })
  )
);

export const schemes: Scheme[] = [
  // Financial - National
  { id: 'pm-jan-dhan', category: 'financial', title: mk('Pradhan Mantri Jan Dhan Yojana'), shortDescription: mk('Zero balance bank accounts with RuPay debit card and accident insurance.'), longDescription: mk('National Mission on Financial Inclusion ensuring access to various financial services.'), benefitsAmount: mk('Zero Balance Account + ₹2L Insurance'), eligibility: { minAge: 10, occupations: ['All'], states: ['All'], categories: ['All'] }, requiredDocuments: docs, applicationUrl: 'https://pmjdy.gov.in/', startDate: '2014-08-28', status: 'active', launchedBy: 'Central Government' },
  { id: 'atal-pension', category: 'financial', title: mk('Atal Pension Yojana'), shortDescription: mk('Guaranteed pension of ₹1000-5000/month after 60 years for unorganized sector workers.'), longDescription: mk('A pension scheme primarily targeted at the unorganized sector workers.'), benefitsAmount: mk('₹1,000-₹5,000/month Pension'), eligibility: { minAge: 18, maxAge: 40, occupations: ['All'], states: ['All'], categories: ['All'] }, requiredDocuments: docs, applicationUrl: 'https://www.npscra.nsdl.co.in/scheme-details.php', startDate: '2015-05-09', status: 'active', launchedBy: 'Central Government' },
  { id: 'pm-jeevan-jyoti', category: 'financial', title: mk('PM Jeevan Jyoti Bima Yojana'), shortDescription: mk('Life insurance cover of ₹2 Lakh at premium of ₹436/year.'), longDescription: mk('Life insurance scheme offering coverage for death due to any reason.'), benefitsAmount: mk('₹2 Lakh Life Cover'), eligibility: { minAge: 18, maxAge: 50, occupations: ['All'], states: ['All'], categories: ['All'] }, requiredDocuments: docs, applicationUrl: 'https://www.jansuraksha.gov.in/', startDate: '2015-05-09', status: 'active', launchedBy: 'Central Government' },
  { id: 'pm-suraksha-bima', category: 'financial', title: mk('PM Suraksha Bima Yojana'), shortDescription: mk('Accident insurance of ₹2 Lakh at premium of just ₹20/year.'), longDescription: mk('Accident insurance scheme offering coverage for death or disability due to an accident.'), benefitsAmount: mk('₹2 Lakh Accident Cover'), eligibility: { minAge: 18, maxAge: 70, occupations: ['All'], states: ['All'], categories: ['All'] }, requiredDocuments: docs, applicationUrl: 'https://www.jansuraksha.gov.in/', startDate: '2015-05-09', status: 'active', launchedBy: 'Central Government' },
  { id: 'kisan-vikas-patra', category: 'financial', title: mk('Kisan Vikas Patra'), shortDescription: mk('Savings certificate that doubles your investment.'), longDescription: mk('A saving certificate scheme which was first launched by India Post.'), benefitsAmount: mk('Doubles Investment'), eligibility: { minAge: 18, occupations: ['All'], states: ['All'], categories: ['All'] }, requiredDocuments: docs, applicationUrl: 'https://www.indiapost.gov.in/', startDate: '1988-04-01', status: 'active', launchedBy: 'Central Government' },
  { id: 'sukanya-samriddhi', category: 'financial', title: mk('Sukanya Samriddhi Yojana'), shortDescription: mk('Small savings scheme for the girl child.'), longDescription: mk('A Government of India backed saving scheme targeted at the parents of girl children.'), benefitsAmount: mk('8.2% Interest + Tax Benefits'), eligibility: { minAge: 0, maxAge: 10, gender: 'Female', occupations: ['All'], states: ['All'], categories: ['All'] }, requiredDocuments: docs, applicationUrl: 'https://www.indiapost.gov.in/', startDate: '2015-01-22', status: 'active', launchedBy: 'Central Government' },
  { id: 'national-pension', category: 'financial', title: mk('National Pension Scheme'), shortDescription: mk('Voluntary retirement savings scheme.'), longDescription: mk('A voluntary, defined contribution retirement savings scheme designed to enable systematic savings.'), benefitsAmount: mk('Tax Benefits + Pension'), eligibility: { minAge: 18, maxAge: 70, occupations: ['All'], states: ['All'], categories: ['All'] }, requiredDocuments: docs, applicationUrl: 'https://www.npscra.nsdl.co.in/', startDate: '2004-01-01', status: 'active', launchedBy: 'Central Government' },

  // Farmer - National
  { id: 'pm-kisan', category: 'farmer', title: mk('PM Kisan Samman Nidhi'), shortDescription: mk('Income support of ₹6000/year for farmer families.'), longDescription: mk('Under the scheme an income support of ₹6000/- per year is provided to all farmer families.'), benefitsAmount: mk('₹6,000/year'), eligibility: { minAge: 18, occupations: ['Farmer'], states: ['All'], categories: ['All'] }, requiredDocuments: docsFarmer, applicationUrl: 'https://pmkisan.gov.in/', startDate: '2018-12-01', status: 'active', launchedBy: 'Central Government' },
  { id: 'pm-fasal-bima', category: 'farmer', title: mk('PM Fasal Bima Yojana'), shortDescription: mk('Crop insurance against natural calamities.'), longDescription: mk('Provides comprehensive insurance cover against failure of the crop.'), benefitsAmount: mk('Crop Insurance Cover'), eligibility: { minAge: 18, occupations: ['Farmer'], states: ['All'], categories: ['All'] }, requiredDocuments: docsFarmer, applicationUrl: 'https://pmfby.gov.in/', startDate: '2016-02-18', status: 'active', launchedBy: 'Central Government' },
  { id: 'pm-krishi-sinchayee', category: 'farmer', title: mk('PM Krishi Sinchayee Yojana'), shortDescription: mk('Ensuring access to irrigation for every farm.'), longDescription: mk('Har Khet Ko Paani - expanding cultivable area under assured irrigation.'), benefitsAmount: mk('Irrigation Support'), eligibility: { minAge: 18, occupations: ['Farmer'], states: ['All'], categories: ['All'] }, requiredDocuments: docsFarmer, applicationUrl: 'https://pmksy.gov.in/', startDate: '2015-07-01', status: 'active', launchedBy: 'Central Government' },
  { id: 'soil-health-card', category: 'farmer', title: mk('Soil Health Card Scheme'), shortDescription: mk('Soil testing and nutrient recommendations for farmers.'), longDescription: mk('Provides soil health cards to farmers with crop-wise nutrient recommendations.'), benefitsAmount: mk('Free Soil Testing'), eligibility: { minAge: 18, occupations: ['Farmer'], states: ['All'], categories: ['All'] }, requiredDocuments: docsFarmer, applicationUrl: 'https://soilhealth.dac.gov.in/', startDate: '2015-02-19', status: 'active', launchedBy: 'Central Government' },
  { id: 'paramparagat-krishi', category: 'farmer', title: mk('Paramparagat Krishi Vikas Yojana'), shortDescription: mk('Promotes organic farming.'), longDescription: mk('Promoting organic farming through cluster approach.'), benefitsAmount: mk('₹50,000/ha for Organic Farming'), eligibility: { minAge: 18, occupations: ['Farmer'], states: ['All'], categories: ['All'] }, requiredDocuments: docsFarmer, applicationUrl: 'https://pgsindia-ncof.gov.in/', startDate: '2015-04-01', status: 'active', launchedBy: 'Central Government' },
  { id: 'enam', category: 'farmer', title: mk('National Agriculture Market (eNAM)'), shortDescription: mk('Online trading platform for agricultural commodities.'), longDescription: mk('A pan-India electronic trading portal which networks the existing APMC mandis.'), benefitsAmount: mk('Better Prices via Online Market'), eligibility: { minAge: 18, occupations: ['Farmer'], states: ['All'], categories: ['All'] }, requiredDocuments: docsFarmer, applicationUrl: 'https://enam.gov.in/', startDate: '2016-04-14', status: 'active', launchedBy: 'Central Government' },

  // Health - National
  { id: 'ayushman-bharat', category: 'health', title: mk('Ayushman Bharat - PM Jan Arogya Yojana'), shortDescription: mk('Health insurance of ₹5 Lakh/family/year.'), longDescription: mk('Provides health cover of Rs. 5 lakhs per family per year for secondary and tertiary care hospitalization.'), benefitsAmount: mk('₹5 Lakh Health Cover/Family'), eligibility: { minAge: 0, occupations: ['All'], maxIncome: 500000, states: ['All'], categories: ['All'] }, requiredDocuments: docsIncome, applicationUrl: 'https://pmjay.gov.in/', startDate: '2018-09-23', status: 'active', launchedBy: 'Central Government' },
  { id: 'pm-swasthya-suraksha', category: 'health', title: mk('PM Swasthya Suraksha Yojana'), shortDescription: mk('Upgrading government medical colleges.'), longDescription: mk('Aims to correct regional imbalances in the availability of affordable/reliable tertiary healthcare.'), benefitsAmount: mk('Free/Subsidized Healthcare'), eligibility: { minAge: 0, occupations: ['All'], states: ['All'], categories: ['All'] }, requiredDocuments: docs, applicationUrl: 'https://pmssy-mohfw.nic.in/', startDate: '2003-03-01', status: 'active', launchedBy: 'Central Government' },
  { id: 'digital-health-mission', category: 'health', title: mk('National Digital Health Mission'), shortDescription: mk('Unique health ID for every citizen.'), longDescription: mk('Aims to develop the backbone necessary to support the integrated digital health infrastructure of the country.'), benefitsAmount: mk('Free Health ID'), eligibility: { minAge: 0, occupations: ['All'], states: ['All'], categories: ['All'] }, requiredDocuments: docs, applicationUrl: 'https://abdm.gov.in/', startDate: '2020-08-15', status: 'active', launchedBy: 'Central Government' },
  { id: 'mission-indradhanush', category: 'health', title: mk('Mission Indradhanush'), shortDescription: mk('Full immunization coverage for children.'), longDescription: mk('Ensures that all children under the age of two years and pregnant women are fully immunized.'), benefitsAmount: mk('Free Vaccination'), eligibility: { minAge: 0, maxAge: 5, occupations: ['All'], states: ['All'], categories: ['All'] }, requiredDocuments: docs, applicationUrl: 'https://www.nhp.gov.in/', startDate: '2014-12-25', status: 'active', launchedBy: 'Central Government' },

  // Housing - National
  { id: 'pmay-urban', category: 'housing', title: mk('PM Awas Yojana (Urban)'), shortDescription: mk('Affordable housing for urban poor.'), longDescription: mk('Providing housing for all in urban areas.'), benefitsAmount: mk('Interest Subsidy up to ₹2.67L'), eligibility: { minAge: 18, maxIncome: 1800000, occupations: ['All'], states: ['All'], categories: ['All'] }, requiredDocuments: docsIncome, applicationUrl: 'https://pmaymis.gov.in/', startDate: '2015-06-25', status: 'active', launchedBy: 'Central Government' },
  { id: 'pmay-gramin', category: 'housing', title: mk('PM Awas Yojana (Gramin)'), shortDescription: mk('Housing assistance for rural households.'), longDescription: mk('Provides financial assistance for construction of pucca houses in rural areas.'), benefitsAmount: mk('₹1.20 Lakh Financial Aid'), eligibility: { minAge: 18, occupations: ['All', 'Farmer'], states: ['All'], categories: ['All'] }, requiredDocuments: docsIncome, applicationUrl: 'https://pmayg.nic.in/', startDate: '2016-04-01', status: 'active', launchedBy: 'Central Government' },

  // Women - National
  { id: 'beti-bachao', category: 'women', title: mk('Beti Bachao Beti Padhao'), shortDescription: mk('Empowerment of the girl child.'), longDescription: mk('Campaign addressing declining child sex ratio and empowerment of the girl child.'), benefitsAmount: mk('Awareness + Support'), eligibility: { minAge: 0, maxAge: 18, gender: 'Female', occupations: ['All'], states: ['All'], categories: ['All'] }, requiredDocuments: docs, applicationUrl: 'https://wcd.nic.in/bbbp-schemes', startDate: '2015-01-22', status: 'active', launchedBy: 'Central Government' },
  { id: 'pm-matru-vandana', category: 'women', title: mk('PM Matru Vandana Yojana'), shortDescription: mk('Cash incentive for pregnant and lactating mothers.'), longDescription: mk('Provides ₹5000 cash incentive for pregnant and lactating mothers for the first living child.'), benefitsAmount: mk('₹5,000 Cash Transfer'), eligibility: { minAge: 19, gender: 'Female', occupations: ['All'], states: ['All'], categories: ['All'] }, requiredDocuments: docs, applicationUrl: 'https://pmmvy.wcd.gov.in/', startDate: '2017-01-01', status: 'active', launchedBy: 'Central Government' },
  { id: 'one-stop-centre', category: 'women', title: mk('One Stop Centre Scheme'), shortDescription: mk('Support to women affected by violence.'), longDescription: mk('Medical, legal, and shelter assistance to women affected by violence.'), benefitsAmount: mk('Free Legal & Medical Aid'), eligibility: { minAge: 0, gender: 'Female', occupations: ['All'], states: ['All'], categories: ['All'] }, requiredDocuments: docs, applicationUrl: 'https://wcd.nic.in/', startDate: '2015-04-01', status: 'active', launchedBy: 'Central Government' },

  // Employment & Student - National
  { id: 'skill-india', category: 'employment', title: mk('Skill India Mission'), shortDescription: mk('Umbrella program for skill development.'), longDescription: mk('Focuses on industry-relevant training.'), benefitsAmount: mk('Free Skill Training'), eligibility: { minAge: 15, maxAge: 45, occupations: ['Student', 'Unemployed', 'All'], states: ['All'], categories: ['All'] }, requiredDocuments: docs, applicationUrl: 'https://www.skillindia.gov.in/', startDate: '2015-07-15', status: 'active', launchedBy: 'Central Government' },
  { id: 'pmkvy', category: 'employment', title: mk('PM Kaushal Vikas Yojana'), shortDescription: mk('Free skill training for youth.'), longDescription: mk('Provides free skill training and certification for youth with monetary reward.'), benefitsAmount: mk('Free Training + ₹8,000 Reward'), eligibility: { minAge: 15, maxAge: 45, occupations: ['Student', 'Unemployed', 'All'], states: ['All'], categories: ['All'] }, requiredDocuments: docs, applicationUrl: 'https://www.pmkvyofficial.org/', startDate: '2015-07-15', status: 'active', launchedBy: 'Central Government' },
  { id: 'atmanirbhar-rozgar', category: 'employment', title: mk('Atmanirbhar Bharat Rozgar Yojana'), shortDescription: mk('Incentivizes employers for new employment.'), longDescription: mk('Subsidizing EPF contributions for new employees.'), benefitsAmount: mk('EPF Subsidy'), eligibility: { minAge: 18, maxAge: 45, occupations: ['All', 'Unemployed'], states: ['All'], categories: ['All'] }, requiredDocuments: docs, applicationUrl: 'https://www.epfindia.gov.in/', startDate: '2020-10-01', status: 'active', launchedBy: 'Central Government' },
  { id: 'national-career', category: 'employment', title: mk('National Career Service'), shortDescription: mk('Online platform connecting job seekers with employers.'), longDescription: mk('A national ICT based portal developed to provide a wide variety of employment related services.'), benefitsAmount: mk('Free Job Portal'), eligibility: { minAge: 15, maxAge: 60, occupations: ['All', 'Unemployed', 'Student'], states: ['All'], categories: ['All'] }, requiredDocuments: docs, applicationUrl: 'https://www.ncs.gov.in/', startDate: '2015-07-20', status: 'active', launchedBy: 'Central Government' },
  { id: 'nsp-scholarship', category: 'student', title: mk('National Scholarship Portal'), shortDescription: mk('Scholarships for students from Class 1 to Post-Graduation.'), longDescription: mk('Centralized portal for tracking and applying to all national scholarships.'), benefitsAmount: mk('₹1,000 - ₹20,000/year'), eligibility: { minAge: 5, maxAge: 30, maxIncome: 250000, occupations: ['Student'], states: ['All'], categories: ['SC', 'ST', 'OBC', 'Minority'] }, requiredDocuments: docsStudent, applicationUrl: 'https://scholarships.gov.in/', startDate: '2011-09-01', status: 'active', launchedBy: 'Central Government' },

  // Business - National
  { id: 'startup-india', category: 'business', title: mk('Startup India'), shortDescription: mk('Action plan for startup ecosystem.'), longDescription: mk('Provides tax benefits, funding support and simplified regulations.'), benefitsAmount: mk('Tax Holiday + Funding Support'), eligibility: { minAge: 18, occupations: ['Business', 'All'], states: ['All'], categories: ['All'] }, requiredDocuments: docsBusiness, applicationUrl: 'https://www.startupindia.gov.in/', startDate: '2016-01-16', status: 'active', launchedBy: 'Central Government' },
  { id: 'standup-india', category: 'business', title: mk('Stand Up India'), shortDescription: mk('Bank loans between ₹10L-₹1Cr for SC/ST and women.'), longDescription: mk('Facilitates bank loans for setting up greenfield enterprises.'), benefitsAmount: mk('Loan ₹10L to ₹1 Crore'), eligibility: { minAge: 18, occupations: ['Business', 'All'], states: ['All'], categories: ['SC', 'ST', 'Female', 'All'] }, requiredDocuments: docsBusiness, applicationUrl: 'https://www.standupmitra.in/', startDate: '2016-04-05', status: 'active', launchedBy: 'Central Government' },
  { id: 'pm-mudra', category: 'business', title: mk('PM Mudra Yojana'), shortDescription: mk('Loans up to ₹10 Lakhs for micro enterprises.'), longDescription: mk('Provides loans under Shishu, Kishore, and Tarun categories.'), benefitsAmount: mk('Loan up to ₹10 Lakhs'), eligibility: { minAge: 18, occupations: ['Business', 'Unemployed', 'All'], states: ['All'], categories: ['All'] }, requiredDocuments: docsBusiness, applicationUrl: 'https://www.mudra.org.in/', startDate: '2015-04-08', status: 'active', launchedBy: 'Central Government' },
  { id: 'make-in-india', category: 'business', title: mk('Make in India'), shortDescription: mk('Initiative to facilitate investment in manufacturing.'), longDescription: mk('Fostering innovation and building best in class manufacturing infrastructure.'), benefitsAmount: mk('Investment Facilitation'), eligibility: { minAge: 18, occupations: ['Business'], states: ['All'], categories: ['All'] }, requiredDocuments: docsBusiness, applicationUrl: 'https://www.makeinindia.com/', startDate: '2014-09-25', status: 'active', launchedBy: 'Central Government' },

  // Infrastructure - National
  { id: 'swachh-bharat', category: 'infrastructure', title: mk('Swachh Bharat Mission'), shortDescription: mk('National campaign for a clean India.'), longDescription: mk('Includes construction of toilets and waste management initiatives.'), benefitsAmount: mk('Toilet Construction Subsidy'), eligibility: { minAge: 18, occupations: ['All'], states: ['All'], categories: ['All'] }, requiredDocuments: docs, applicationUrl: 'https://swachhbharatmission.gov.in/', startDate: '2014-10-02', status: 'active', launchedBy: 'Central Government' },
  { id: 'digital-india', category: 'infrastructure', title: mk('Digital India'), shortDescription: mk('Transforming India into a digitally empowered society.'), longDescription: mk('Ensuring government services are available to citizens electronically.'), benefitsAmount: mk('Digital Services Access'), eligibility: { minAge: 0, occupations: ['All'], states: ['All'], categories: ['All'] }, requiredDocuments: docs, applicationUrl: 'https://www.digitalindia.gov.in/', startDate: '2015-07-01', status: 'active', launchedBy: 'Central Government' },
  { id: 'amrut-mission', category: 'infrastructure', title: mk('AMRUT Mission'), shortDescription: mk('Urban transformation for water supply and sewerage.'), longDescription: mk('Providing basic services to households and building amenities in cities.'), benefitsAmount: mk('Urban Infrastructure'), eligibility: { minAge: 18, occupations: ['All'], states: ['All'], categories: ['All'] }, requiredDocuments: docs, applicationUrl: 'https://amrut.gov.in/', startDate: '2015-06-25', status: 'active', launchedBy: 'Central Government' },

  // Merge additional schemes
  ...additionalSchemes,
  ...generatedStateSchemes,
  ...generatedDistrictSchemes
];