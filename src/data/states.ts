export interface StateUTData {
  id: string;
  name: string;
  type: 'state' | 'union-territory';
  officialWebsite: string;
  schemePortal: string;
}

export const statesAndUTs: StateUTData[] = [
  // States
  { id: 'andhra-pradesh', name: 'Andhra Pradesh', type: 'state', officialWebsite: 'https://www.ap.gov.in/', schemePortal: 'https://www.appost.in/' },
  { id: 'arunachal-pradesh', name: 'Arunachal Pradesh', type: 'state', officialWebsite: 'https://arunachalpradesh.gov.in/', schemePortal: 'https://arunachalpradesh.gov.in/schemes/' },
  { id: 'assam', name: 'Assam', type: 'state', officialWebsite: 'https://assam.gov.in/', schemePortal: 'https://online.assam.gov.in/' },
  { id: 'bihar', name: 'Bihar', type: 'state', officialWebsite: 'https://state.bihar.gov.in/', schemePortal: 'https://serviceonline.bihar.gov.in/' },
  { id: 'chhattisgarh', name: 'Chhattisgarh', type: 'state', officialWebsite: 'https://cgstate.gov.in/', schemePortal: 'https://edistrict.cgstate.gov.in/' },
  { id: 'goa', name: 'Goa', type: 'state', officialWebsite: 'https://www.goa.gov.in/', schemePortal: 'https://goaonline.gov.in/' },
  { id: 'gujarat', name: 'Gujarat', type: 'state', officialWebsite: 'https://gujaratindia.gov.in/', schemePortal: 'https://digitalgujarat.gov.in/' },
  { id: 'haryana', name: 'Haryana', type: 'state', officialWebsite: 'https://haryana.gov.in/', schemePortal: 'https://saralharyana.gov.in/' },
  { id: 'himachal-pradesh', name: 'Himachal Pradesh', type: 'state', officialWebsite: 'https://himachal.nic.in/', schemePortal: 'https://edistrict.hp.gov.in/' },
  { id: 'jharkhand', name: 'Jharkhand', type: 'state', officialWebsite: 'https://www.jharkhand.gov.in/', schemePortal: 'https://jharsewa.jharkhand.gov.in/' },
  { id: 'karnataka', name: 'Karnataka', type: 'state', officialWebsite: 'https://karnataka.gov.in/', schemePortal: 'https://sevasindhu.karnataka.gov.in/' },
  { id: 'kerala', name: 'Kerala', type: 'state', officialWebsite: 'https://kerala.gov.in/', schemePortal: 'https://keralapsc.gov.in/' },
  { id: 'madhya-pradesh', name: 'Madhya Pradesh', type: 'state', officialWebsite: 'https://www.mp.gov.in/', schemePortal: 'https://mpedistrict.gov.in/' },
  { id: 'maharashtra', name: 'Maharashtra', type: 'state', officialWebsite: 'https://www.maharashtra.gov.in/', schemePortal: 'https://aaplesarkar.mahaonline.gov.in/' },
  { id: 'manipur', name: 'Manipur', type: 'state', officialWebsite: 'https://manipur.gov.in/', schemePortal: 'https://manipur.gov.in/schemes/' },
  { id: 'meghalaya', name: 'Meghalaya', type: 'state', officialWebsite: 'https://meghalaya.gov.in/', schemePortal: 'https://megedistrict.gov.in/' },
  { id: 'mizoram', name: 'Mizoram', type: 'state', officialWebsite: 'https://mizoram.gov.in/', schemePortal: 'https://mizoram.gov.in/page/schemes' },
  { id: 'nagaland', name: 'Nagaland', type: 'state', officialWebsite: 'https://nagaland.gov.in/', schemePortal: 'https://nagaland.gov.in/schemes/' },
  { id: 'odisha', name: 'Odisha', type: 'state', officialWebsite: 'https://odisha.gov.in/', schemePortal: 'https://odisha.gov.in/schemes' },
  { id: 'punjab', name: 'Punjab', type: 'state', officialWebsite: 'https://punjab.gov.in/', schemePortal: 'https://punjab.gov.in/schemes' },
  { id: 'rajasthan', name: 'Rajasthan', type: 'state', officialWebsite: 'https://rajasthan.gov.in/', schemePortal: 'https://sso.rajasthan.gov.in/' },
  { id: 'sikkim', name: 'Sikkim', type: 'state', officialWebsite: 'https://sikkim.gov.in/', schemePortal: 'https://sikkim.gov.in/schemes' },
  { id: 'tamil-nadu', name: 'Tamil Nadu', type: 'state', officialWebsite: 'https://www.tn.gov.in/', schemePortal: 'https://www.tnega.tn.gov.in/' },
  { id: 'telangana', name: 'Telangana', type: 'state', officialWebsite: 'https://www.telangana.gov.in/', schemePortal: 'https://meeseva.telangana.gov.in/' },
  { id: 'tripura', name: 'Tripura', type: 'state', officialWebsite: 'https://tripura.gov.in/', schemePortal: 'https://tripura.gov.in/schemes' },
  { id: 'uttar-pradesh', name: 'Uttar Pradesh', type: 'state', officialWebsite: 'https://up.gov.in/', schemePortal: 'https://edistrict.up.gov.in/' },
  { id: 'uttarakhand', name: 'Uttarakhand', type: 'state', officialWebsite: 'https://uk.gov.in/', schemePortal: 'https://edistrict.uk.gov.in/' },
  { id: 'west-bengal', name: 'West Bengal', type: 'state', officialWebsite: 'https://wb.gov.in/', schemePortal: 'https://wb.gov.in/schemes.aspx' },
  
  // Union Territories
  { id: 'andaman-nicobar', name: 'Andaman and Nicobar Islands', type: 'union-territory', officialWebsite: 'https://andaman.gov.in/', schemePortal: 'https://andaman.gov.in/schemes' },
  { id: 'chandigarh', name: 'Chandigarh', type: 'union-territory', officialWebsite: 'https://chandigarh.gov.in/', schemePortal: 'https://chandigarh.gov.in/schemes.htm' },
  { id: 'dadra-nagar-haveli-daman-diu', name: 'Dadra and Nagar Haveli and Daman and Diu', type: 'union-territory', officialWebsite: 'https://dnh.gov.in/', schemePortal: 'https://dnh.gov.in/schemes' },
  { id: 'delhi', name: 'Delhi', type: 'union-territory', officialWebsite: 'https://delhi.gov.in/', schemePortal: 'https://edistrict.delhigovt.nic.in/' },
  { id: 'jammu-kashmir', name: 'Jammu and Kashmir', type: 'union-territory', officialWebsite: 'https://jk.gov.in/', schemePortal: 'https://jkedistrict.nic.in/' },
  { id: 'ladakh', name: 'Ladakh', type: 'union-territory', officialWebsite: 'https://ladakh.gov.in/', schemePortal: 'https://ladakh.gov.in/schemes' },
  { id: 'lakshadweep', name: 'Lakshadweep', type: 'union-territory', officialWebsite: 'https://lakshadweep.gov.in/', schemePortal: 'https://lakshadweep.gov.in/schemes' },
  { id: 'puducherry', name: 'Puducherry', type: 'union-territory', officialWebsite: 'https://py.gov.in/', schemePortal: 'https://edistrict.py.gov.in/' },
];

export const getStateById = (id: string): StateUTData | undefined => {
  return statesAndUTs.find(state => state.id === id);
};

export const getStatesByType = (type: 'state' | 'union-territory'): StateUTData[] => {
  return statesAndUTs.filter(state => state.type === type);
};
