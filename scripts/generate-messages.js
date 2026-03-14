const fs = require('fs');
const path = require('path');

const translations = {
    en: {
        "nav.home": "Home",
        "nav.farmer": "Farmer Schemes",
        "nav.student": "Student Schemes",
        "nav.women": "Women Schemes",
        "nav.business": "Business Schemes",
        "nav.applications": "My Applications",
        "nav.askVoice": "Ask by Voice",
        "nav.findSchemes": "Find Schemes",
        "nav.byState": "By State",
        "nav.support": "Support",
        "nav.signIn": "Sign In",
        "nav.profile": "Profile",
        "nav.govIndia": "Government of India",
        "home.title": "Localized Government Scheme Discovery",
        "home.subtitle": "Localized Government Scheme Discovery and Auto-Application Portal",
        "home.trusted": "",
        "home.searchPlaceholder": "Search for schemes, benefits, subsidies...",
        "home.search": "Search",
        "home.browseCategory": "Browse by Category",
        "home.findRelevant": "Find schemes relevant to your needs",
        "home.viewAll": "View All",
        "home.schemesCount": "Schemes",
        "home.newFeature": "NEW FEATURE",
        "home.findByState": "Find Schemes By Your State",
        "home.stateSubtitle": "Browse government schemes specifically available in your state or union territory. Get direct access to state portals and apply instantly.",
        "home.exploreStates": "Explore States & UTs",
        "home.states": "States",
        "home.unionTerritories": "Union Territories",
        "home.eligibleSchemesFor": "Eligible Schemes for",
        "home.eligibleSchemes": "Eligible Schemes",
        "home.eligibleCount": "You are eligible for",
        "home.basedOnProfile": "schemes based on your profile",
        "home.completeProfilePrompt": "Complete your profile to see schemes you are eligible for",
        "home.completeProfile": "Complete Your Profile",
        "home.profileHint": "Tell us your age, occupation, income, and state to see schemes you are eligible for.",
        "home.fillProfile": "Fill Profile",
        "home.noMatching": "No matching schemes found. Try updating your profile.",
        "home.updateProfile": "Update Profile",
        "home.popularSchemes": "Popular Schemes",
        "home.popularSubtitle": "Most accessed government welfare programs",
        "home.trackApplications": "Track your submitted applications",
        "schemes.title": "Find Government Schemes",
        "schemes.searchPlaceholder": "Search by scheme name or keyword...",
        "schemes.all": "All Schemes",
        "schemes.filter": "Filters",
        "schemes.clearAll": "Clear All",
        "schemes.gender": "Gender",
        "schemes.socialCategory": "Social Category",
        "schemes.occupation": "Occupation",
        "schemes.status": "Scheme Status",
        "schemes.updateProfilePersonalized": "Update Profile for Personalized Results",
        "schemes.found": "scheme(s) found",
        "schemes.docsRequired": "docs required",
        "schemes.noMatch": "No schemes found matching your criteria.",
        "schemes.clearFilters": "Clear filters",
        "eligible.title": "Eligible For You",
        "eligible.completeProfile": "Complete your profile with age, occupation, and resident area to see personalized eligible schemes.",
        "eligible.setProfile": "Set Profile",
        "eligible.noActive": "No active schemes matched your profile right now. Try updating age, occupation, or resident area in your profile.",
        "common.active": "Active",
        "common.upcoming": "Upcoming",
        "common.expired": "Expired",
        "common.all": "All",
        "btn.apply": "Apply Now",
        "btn.chat": "Ask AI",
        "btn.saveContinue": "Save & Continue",
        "btn.cancel": "Cancel",
    },
    hi: {
        "nav.home": "होम",
        "nav.farmer": "किसान योजनाएं",
        "nav.student": "छात्र योजनाएं",
        "nav.women": "महिला योजनाएं",
        "nav.business": "व्यापार योजनाएं",
        "nav.applications": "मेरे आवेदन",
        "nav.askVoice": "बोलकर पूछें",
        "nav.findSchemes": "योजनाएँ खोजें",
        "nav.byState": "राज्य अनुसार",
        "nav.support": "सहायता",
        "nav.signIn": "साइन इन",
        "nav.profile": "प्रोफाइल",
        "nav.govIndia": "भारत सरकार",
        "home.title": "स्थानीय सरकारी योजना खोज",
        "home.subtitle": "स्थानीय सरकारी योजना खोज और स्वचालित आवेदन पोर्टल",
        "home.trusted": "",
        "home.searchPlaceholder": "योजनाएँ, लाभ, सब्सिडी खोजें...",
        "home.search": "खोजें",
        "home.browseCategory": "श्रेणी के अनुसार देखें",
        "home.findRelevant": "अपनी आवश्यकता के अनुसार योजनाएँ खोजें",
        "home.viewAll": "सभी देखें",
        "home.schemesCount": "योजनाएँ",
        "home.newFeature": "नया फीचर",
        "home.findByState": "अपने राज्य की योजनाएँ खोजें",
        "home.stateSubtitle": "अपने राज्य या केंद्र शासित प्रदेश में उपलब्ध सरकारी योजनाएँ देखें। सीधे पोर्टल पर जाकर तुरंत आवेदन करें।",
        "home.exploreStates": "राज्य व केंद्र शासित प्रदेश देखें",
        "home.states": "राज्य",
        "home.unionTerritories": "केंद्र शासित प्रदेश",
        "home.eligibleSchemesFor": "इनके लिए पात्र योजनाएँ",
        "home.eligibleSchemes": "पात्र योजनाएँ",
        "home.eligibleCount": "आप",
        "home.basedOnProfile": "योजनाओं के लिए पात्र हैं (प्रोफाइल के आधार पर)",
        "home.completeProfilePrompt": "पात्र योजनाएँ देखने के लिए अपनी प्रोफाइल पूरी करें",
        "home.completeProfile": "अपनी प्रोफाइल पूरी करें",
        "home.profileHint": "अपनी उम्र, पेशा, आय और राज्य भरें ताकि पात्र योजनाएँ दिख सकें।",
        "home.fillProfile": "प्रोफाइल भरें",
        "home.noMatching": "कोई मेल खाती योजना नहीं मिली। प्रोफाइल अपडेट करें।",
        "home.updateProfile": "प्रोफाइल अपडेट करें",
        "home.popularSchemes": "लोकप्रिय योजनाएँ",
        "home.popularSubtitle": "सबसे अधिक उपयोग की जाने वाली सरकारी कल्याण योजनाएँ",
        "home.trackApplications": "अपने सबमिट किए गए आवेदनों को ट्रैक करें",
        "schemes.title": "सरकारी योजनाएँ खोजें",
        "schemes.searchPlaceholder": "योजना नाम या कीवर्ड से खोजें...",
        "schemes.all": "सभी योजनाएँ",
        "schemes.filter": "फ़िल्टर",
        "schemes.clearAll": "सभी साफ करें",
        "schemes.gender": "लिंग",
        "schemes.socialCategory": "सामाजिक श्रेणी",
        "schemes.occupation": "पेशा",
        "schemes.status": "योजना स्थिति",
        "schemes.updateProfilePersonalized": "व्यक्तिगत परिणाम के लिए प्रोफाइल अपडेट करें",
        "schemes.found": "योजना(एं) मिलीं",
        "schemes.docsRequired": "दस्तावेज आवश्यक",
        "schemes.noMatch": "आपके मानदंडों से मेल खाती योजनाएँ नहीं मिलीं।",
        "schemes.clearFilters": "फ़िल्टर साफ करें",
        "eligible.title": "आपके लिए पात्र",
        "eligible.completeProfile": "व्यक्तिगत पात्र योजनाएँ देखने划 उम्ने, पेशा और निवास क्षेत्र सहित प्रोफाइल भरें।",
        "eligible.setProfile": "प्रोफाइल सेट करें",
        "eligible.noActive": "अभी आपकी प्रोफाइल से कोई सक्रिय योजना मेल नहीं खाती। प्रोफाइल अपडेट करें।",
        "common.active": "सक्रिय",
        "common.upcoming": "आगामी",
        "common.expired": "समाप्त",
        "common.all": "सभी",
        "btn.apply": "अभी आवेदन करें",
        "btn.chat": "AI से पूछें",
        "btn.saveContinue": "सेव करें और आगे बढ़ें",
        "btn.cancel": "रद्द करें",
    },
    ta: {
        "nav.home": "முகப்பு",
        "nav.farmer": "விவசாயி திட்டங்கள்",
        "nav.student": "மாணவர் திட்டங்கள்",
        "nav.women": "பெண்கள் திட்டங்கள்",
        "nav.business": "வணிக திட்டங்கள்",
        "nav.applications": "என் விண்ணப்பங்கள்",
        "nav.askVoice": "குரலில் கேட்க",
        "home.title": "உள்ளூர் அரசு திட்ட கண்டுபிடிப்பு",
        "home.subtitle": "உள்ளூர் அரசு திட்ட கண்டுபிடிப்பு மற்றும் தானியங்கி விண்ணப்ப போர்டல்",
        "btn.apply": "இப்போது விண்ணப்பிக்கவும்",
        "btn.chat": "AI இடம் கேள்",
    },
    te: {
        "nav.home": "హోమ్",
        "nav.farmer": "రైతు పథకాలు",
        "nav.student": "విద్యార్థి పథకాలు",
        "nav.women": "మహిళా పథకాలు",
        "nav.business": "వ్యాపార పథకాలు",
        "nav.applications": "నా దరఖాస్తులు",
        "nav.askVoice": "వాయిస్ ద్వారా అడగండి",
        "home.title": "స్థానిక ప్రభుత్వ పథకం డిస్కవరీ",
        "home.subtitle": "స్థానిక ప్రభుత్వ పథకం డిస్కవరీ మరియు ఆటో-అప్లికేషన్ పోర్టల్",
        "btn.apply": "ఇప్పుడే దరఖాస్తు చేయండి",
        "btn.chat": "AIని అడగండి",
    }
};

const messagesDir = path.join(__dirname, '..', 'messages');
if (!fs.existsSync(messagesDir)) {
    fs.mkdirSync(messagesDir);
}

const expandObj = (flatObj) => {
    const result = {};
    for (const [key, value] of Object.entries(flatObj)) {
        const parts = key.split('.');
        let current = result;
        for (let i = 0; i < parts.length - 1; i++) {
            if (!current[parts[i]]) current[parts[i]] = {};
            current = current[parts[i]];
        }
        current[parts[parts.length - 1]] = value;
    }
    return result;
}

for (const [lang, flatData] of Object.entries(translations)) {
    // Fill missing keys with english defaults for ta and te so the app doesn't crash on untranslated keys
    let mergedData = { ...translations.en };
    if (lang !== 'en') {
        mergedData = { ...mergedData, ...flatData };
    }
    const nestedData = expandObj(mergedData);
    fs.writeFileSync(path.join(messagesDir, `${lang}.json`), JSON.stringify(nestedData, null, 2));
    console.log(`Generated messages/${lang}.json`);
}
