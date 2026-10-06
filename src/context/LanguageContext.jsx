import React, { createContext, useContext, useState } from 'react';

// ============================================================
// COMPREHENSIVE TRANSLATIONS — all UI text in 5 languages
// ============================================================
export const translations = {
  en: {
    // Nav / Sidebar
    home: 'Home', services: 'Services', schemes: 'Scheme Finder', chatbot: 'AI Assistant',
    dashboard: 'Dashboard', report: 'Report Issue', track: 'Track Complaint',
    documents: 'Documents', emergency: 'Emergency', map: 'Nearby Services',
    login: 'Login', logout: 'Logout', search: 'Search services...',
    voice: 'Voice Assistant', admin: 'Admin Panel', notifications: 'Notifications',
    form_filling: 'AI Form Filling',

    // Hero
    hero_badge: 'Powered by Smart Bharat AI · Government of India Initiative',
    hero_title_1: 'Making Government',
    hero_title_2: 'Services Smarter',
    hero_title_3: 'with AI',
    hero_subtitle: 'Your intelligent companion for all civic needs. Access',
    hero_subtitle_bold: '500+ services',
    hero_subtitle_end: ', discover eligible schemes, and report issues — instantly.',
    get_started: 'Get Started',
    explore_services: 'Explore Services',
    scroll_to_explore: 'Scroll to explore',

    // Stats
    stat_services: 'Government Services',
    stat_satisfaction: 'Citizen Satisfaction',
    stat_complaints: 'Complaints Resolved',
    stat_schemes: 'Schemes Available',

    // Features section
    features_badge: 'AI-Powered Platform',
    features_title: 'Everything You Need,',
    features_title2: 'In One Place',
    features_subtitle: 'Smart Bharat AI brings the entire government to your fingertips with intelligent, multilingual assistance.',
    feat_ai_title: 'AI-Powered Assistant',
    feat_ai_desc: 'Get instant answers about any government service, scheme eligibility, or documentation in your language.',
    feat_scheme_title: 'Smart Scheme Finder',
    feat_scheme_desc: 'AI analyzes your profile to find all eligible government schemes and benefits automatically.',
    feat_doc_title: 'Document Assistant',
    feat_doc_desc: 'Upload documents for instant OCR extraction, validation, and checklist generation.',
    feat_civic_title: 'Civic Issue Reporting',
    feat_civic_desc: 'Report road damage, broken street lights, or water leakage with AI-assisted categorization.',
    feat_map_title: 'Nearby Government Services',
    feat_map_desc: 'Interactive map showing nearest passport offices, hospitals, RTO, police stations.',
    feat_voice_title: 'Multilingual Voice Assistant',
    feat_voice_desc: 'Speak in Hindi, Telugu, Tamil, Kannada, or English for hands-free assistance.',
    learn_more: 'Learn more',

    // Announcements
    announcements_badge: 'Latest Updates',
    announcements_title: 'Government',
    announcements_title2: 'Announcements',
    announcements_subtitle: 'Stay updated with the latest government schemes, policies, and initiatives.',
    view_all: 'View All Announcements',

    // Testimonials
    testimonials_badge: 'Citizen Reviews',
    testimonials_title: 'Trusted by',
    testimonials_title2: 'Millions of Indians',
    testimonials_subtitle: 'Real experiences from citizens across India using Smart Bharat AI.',

    // CTA
    cta_title: 'Ready to Access India\'s Smartest',
    cta_title2: 'Civic Platform?',
    cta_subtitle: 'Join 18.9 lakh+ citizens already using Smart Bharat AI for their government needs.',
    cta_button: 'Get Started Free',
    cta_button2: 'Watch Demo',

    // Footer
    footer_desc: 'An AI-powered civic platform making government services accessible to every Indian citizen.',
    footer_col1: 'Services',
    footer_col2: 'Features',
    footer_col3: 'Quick Links',
    footer_copyright: '© 2024 Smart Bharat AI. Made with ❤️ for India. Government of India Initiative.',
  },

  hi: {
    home: 'होम', services: 'सेवाएं', schemes: 'योजना खोजक', chatbot: 'AI सहायक',
    dashboard: 'डैशबोर्ड', report: 'समस्या रिपोर्ट', track: 'शिकायत ट्रैक',
    documents: 'दस्तावेज़', emergency: 'आपातकाल', map: 'नजदीकी सेवाएं',
    login: 'लॉगिन', logout: 'लॉगआउट', search: 'सेवाएं खोजें...',
    voice: 'वॉइस असिस्टेंट', admin: 'एडमिन', notifications: 'सूचनाएं',
    form_filling: 'AI फॉर्म भरना',

    hero_badge: 'स्मार्ट भारत AI द्वारा · भारत सरकार की पहल',
    hero_title_1: 'सरकारी सेवाओं को',
    hero_title_2: 'AI से स्मार्ट',
    hero_title_3: 'बनाना',
    hero_subtitle: 'सभी नागरिक जरूरतों के लिए आपका बुद्धिमान साथी।',
    hero_subtitle_bold: '500+ सेवाएं',
    hero_subtitle_end: ' तक पहुंचें, पात्र योजनाओं की खोज करें, और समस्याएं रिपोर्ट करें।',
    get_started: 'शुरू करें',
    explore_services: 'सेवाएं देखें',
    scroll_to_explore: 'नीचे स्क्रॉल करें',

    stat_services: 'सरकारी सेवाएं',
    stat_satisfaction: 'नागरिक संतुष्टि',
    stat_complaints: 'शिकायतें हल',
    stat_schemes: 'योजनाएं उपलब्ध',

    features_badge: 'AI संचालित प्लेटफ़ॉर्म',
    features_title: 'सब कुछ जो आपको चाहिए,',
    features_title2: 'एक जगह पर',
    features_subtitle: 'Smart Bharat AI पूरी सरकार को आपकी उंगलियों पर लाता है।',
    feat_ai_title: 'AI सहायक',
    feat_ai_desc: 'किसी भी सरकारी सेवा, योजना की पात्रता, या दस्तावेज़ के बारे में तुरंत जवाब पाएं।',
    feat_scheme_title: 'स्मार्ट योजना खोजक',
    feat_scheme_desc: 'AI आपकी प्रोफ़ाइल का विश्लेषण करके सभी पात्र योजनाएं खोजता है।',
    feat_doc_title: 'दस्तावेज़ सहायक',
    feat_doc_desc: 'दस्तावेज़ अपलोड करें और तुरंत OCR निष्कर्षण, सत्यापन पाएं।',
    feat_civic_title: 'नागरिक समस्या रिपोर्ट',
    feat_civic_desc: 'सड़क क्षति, टूटी लाइट, या पानी की समस्या AI की मदद से रिपोर्ट करें।',
    feat_map_title: 'नजदीकी सरकारी सेवाएं',
    feat_map_desc: 'पासपोर्ट कार्यालय, अस्पताल, RTO, पुलिस स्टेशन का इंटरएक्टिव मैप।',
    feat_voice_title: 'बहुभाषी वॉइस असिस्टेंट',
    feat_voice_desc: 'हिंदी, तेलुगु, तमिल, कन्नड़, या अंग्रेजी में बोलें।',
    learn_more: 'और जानें',

    announcements_badge: 'ताजा अपडेट',
    announcements_title: 'सरकारी',
    announcements_title2: 'घोषणाएं',
    announcements_subtitle: 'नवीनतम सरकारी योजनाओं और नीतियों से अपडेट रहें।',
    view_all: 'सभी घोषणाएं देखें',

    testimonials_badge: 'नागरिक समीक्षाएं',
    testimonials_title: 'लाखों भारतीयों',
    testimonials_title2: 'का विश्वास',
    testimonials_subtitle: 'Smart Bharat AI का उपयोग करने वाले नागरिकों के असली अनुभव।',

    cta_title: 'भारत के सबसे स्मार्ट',
    cta_title2: 'नागरिक प्लेटफ़ॉर्म पर आएं',
    cta_subtitle: '18.9 लाख+ नागरिक Smart Bharat AI का उपयोग कर रहे हैं।',
    cta_button: 'मुफ्त शुरू करें',
    cta_button2: 'डेमो देखें',

    footer_desc: 'एक AI-संचालित नागरिक प्लेटफ़ॉर्म जो हर भारतीय के लिए सरकारी सेवाएं सुलभ बनाता है।',
    footer_col1: 'सेवाएं', footer_col2: 'विशेषताएं', footer_col3: 'त्वरित लिंक',
    footer_copyright: '© 2024 Smart Bharat AI. भारत के लिए ❤️ के साथ बनाया गया।',
  },

  te: {
    home: 'హోమ్', services: 'సేవలు', schemes: 'పథకాల శోధకం', chatbot: 'AI సహాయకుడు',
    dashboard: 'డాష్‌బోర్డ్', report: 'సమస్య నివేదించండి', track: 'ఫిర్యాదు ట్రాక్',
    documents: 'పత్రాలు', emergency: 'అత్యవసరం', map: 'సమీప సేవలు',
    login: 'లాగిన్', logout: 'లాగ్అవుట్', search: 'సేవలు వెతకండి...',
    voice: 'వాయిస్ అసిస్టెంట్', admin: 'అడ్మిన్', notifications: 'నోటిఫికేషన్లు',
    form_filling: 'AI ఫారం పూరించడం',

    hero_badge: 'స్మార్ట్ భారత్ AI ద్వారా · భారత ప్రభుత్వ చొరవ',
    hero_title_1: 'ప్రభుత్వ సేవలను',
    hero_title_2: 'AI తో స్మార్ట్',
    hero_title_3: 'చేయడం',
    hero_subtitle: 'అన్ని పౌర అవసరాలకు మీ తెలివైన సహచరుడు.',
    hero_subtitle_bold: '500+ సేవలు',
    hero_subtitle_end: ' యాక్సెస్ చేయండి, అర్హత గల పథకాలు కనుగొనండి.',
    get_started: 'ప్రారంభించండి',
    explore_services: 'సేవలు అన్వేషించండి',
    scroll_to_explore: 'క్రిందకు స్క్రోల్ చేయండి',

    stat_services: 'ప్రభుత్వ సేవలు',
    stat_satisfaction: 'పౌర సంతృప్తి',
    stat_complaints: 'ఫిర్యాదులు పరిష్కృతమయ్యాయి',
    stat_schemes: 'పథకాలు అందుబాటులో',

    features_badge: 'AI ఆధారిత వేదిక',
    features_title: 'మీకు అవసరమైన అన్నీ,',
    features_title2: 'ఒకే చోట',
    features_subtitle: 'Smart Bharat AI మొత్తం ప్రభుత్వాన్ని మీ వేళ్లపై తెస్తుంది.',
    feat_ai_title: 'AI సహాయకుడు',
    feat_ai_desc: 'ఏదైనా ప్రభుత్వ సేవ గురించి మీ భాషలో తక్షణ సమాధానాలు పొందండి.',
    feat_scheme_title: 'స్మార్ట్ పథక శోధకం',
    feat_scheme_desc: 'AI మీ ప్రొఫైల్‌ను విశ్లేషించి అర్హత గల పథకాలన్నింటినీ కనుగొంటుంది.',
    feat_doc_title: 'పత్రాల సహాయకుడు',
    feat_doc_desc: 'పత్రాలు అప్‌లోడ్ చేసి తక్షణ OCR వెలికితీత, ధృవీకరణ పొందండి.',
    feat_civic_title: 'పౌర సమస్య నివేదన',
    feat_civic_desc: 'రోడ్డు నష్టం, వీధి దీపాలు, నీటి సమస్యలు AI సహాయంతో నివేదించండి.',
    feat_map_title: 'సమీప ప్రభుత్వ సేవలు',
    feat_map_desc: 'పాస్‌పోర్ట్ కార్యాలయాలు, ఆసుపత్రులు, RTO ఇంటరాక్టివ్ మ్యాప్.',
    feat_voice_title: 'బహుభాషా వాయిస్ అసిస్టెంట్',
    feat_voice_desc: 'తెలుగు, హిందీ, తమిళం, కన్నడ లేదా ఇంగ్లీష్‌లో మాట్లాడండి.',
    learn_more: 'మరింత తెలుసుకోండి',

    announcements_badge: 'తాజా అప్‌డేట్‌లు',
    announcements_title: 'ప్రభుత్వ',
    announcements_title2: 'ప్రకటనలు',
    announcements_subtitle: 'తాజా ప్రభుత్వ పథకాలు మరియు విధానాలతో అప్‌డేట్‌గా ఉండండి.',
    view_all: 'అన్ని ప్రకటనలు చూడండి',

    testimonials_badge: 'పౌర సమీక్షలు',
    testimonials_title: 'లక్షలాది భారతీయులు',
    testimonials_title2: 'నమ్ముతున్నారు',
    testimonials_subtitle: 'Smart Bharat AI వాడుతున్న పౌరుల నిజమైన అనుభవాలు.',

    cta_title: 'భారతదేశంలో అత్యంత స్మార్ట్',
    cta_title2: 'పౌర వేదికకు చేరండి',
    cta_subtitle: '18.9 లక్షల+ పౌరులు Smart Bharat AI ని ఉపయోగిస్తున్నారు.',
    cta_button: 'ఉచితంగా ప్రారంభించండి',
    cta_button2: 'డెమో చూడండి',

    footer_desc: 'ప్రతి భారతీయ పౌరుడికి ప్రభుత్వ సేవలు అందుబాటులో ఉంచే AI వేదిక.',
    footer_col1: 'సేవలు', footer_col2: 'లక్షణాలు', footer_col3: 'త్వరిత లింక్‌లు',
    footer_copyright: '© 2024 Smart Bharat AI. భారతదేశం కోసం ❤️ తో తయారు చేయబడింది.',
  },

  ta: {
    home: 'முகப்பு', services: 'சேவைகள்', schemes: 'திட்ட தேடல்', chatbot: 'AI உதவியாளர்',
    dashboard: 'டாஷ்போர்டு', report: 'பிரச்னை புகாரளி', track: 'புகார் கண்காணி',
    documents: 'ஆவணங்கள்', emergency: 'அவசரம்', map: 'அருகில் சேவைகள்',
    login: 'உள்நுழை', logout: 'வெளியேறு', search: 'சேவைகளை தேடுங்கள்...',
    voice: 'குரல் உதவியாளர்', admin: 'நிர்வாகி', notifications: 'அறிவிப்புகள்',
    form_filling: 'AI படிவம் நிரப்புதல்',

    hero_badge: 'ஸ்மார்ட் பாரத் AI மூலம் · இந்திய அரசு முயற்சி',
    hero_title_1: 'அரசு சேவைகளை',
    hero_title_2: 'AI உடன் புத்திசாலியாக்கு',
    hero_title_3: 'தல்',
    hero_subtitle: 'அனைத்து குடிமக்கள் தேவைகளுக்கும் உங்கள் புத்திசாலி துணை.',
    hero_subtitle_bold: '500+ சேவைகள்',
    hero_subtitle_end: ' அணுகவும், தகுதியான திட்டங்களை கண்டறியவும்.',
    get_started: 'தொடங்குங்கள்',
    explore_services: 'சேவைகளை ஆராயுங்கள்',
    scroll_to_explore: 'கீழே உருட்டுங்கள்',

    stat_services: 'அரசு சேவைகள்',
    stat_satisfaction: 'குடிமக்கள் திருப்தி',
    stat_complaints: 'புகார்கள் தீர்க்கப்பட்டன',
    stat_schemes: 'திட்டங்கள் கிடைக்கின்றன',

    features_badge: 'AI இயக்கப்படும் தளம்',
    features_title: 'உங்களுக்கு தேவையான அனைத்தும்,',
    features_title2: 'ஒரே இடத்தில்',
    features_subtitle: 'Smart Bharat AI முழு அரசையும் உங்கள் விரல் நுனியில் கொண்டுவருகிறது.',
    feat_ai_title: 'AI உதவியாளர்',
    feat_ai_desc: 'எந்த அரசு சேவையையும் பற்றி உங்கள் மொழியில் உடனடி பதில்கள் பெறுங்கள்.',
    feat_scheme_title: 'திட்ட தேடுபொறி',
    feat_scheme_desc: 'AI உங்கள் சுயவிவரத்தை பகுப்பாய்வு செய்து தகுதியான திட்டங்களை கண்டறியும்.',
    feat_doc_title: 'ஆவண உதவியாளர்',
    feat_doc_desc: 'ஆவணங்களை பதிவேற்றி OCR பிரித்தெடுத்தல், சரிபார்ப்பு பெறுங்கள்.',
    feat_civic_title: 'குடிமை பிரச்னை புகார்',
    feat_civic_desc: 'சாலை சேதம், தெரு விளக்குகள், நீர் கசிவு AI உதவியுடன் புகாரளியுங்கள்.',
    feat_map_title: 'அருகில் அரசு சேவைகள்',
    feat_map_desc: 'பாஸ்போர்ட் அலுவலகங்கள், மருத்துவமனைகள், RTO ஊடாடும் வரைபடம்.',
    feat_voice_title: 'பன்மொழி குரல் உதவியாளர்',
    feat_voice_desc: 'தமிழ், இந்தி, தெலுங்கு, கன்னடம் அல்லது ஆங்கிலத்தில் பேசுங்கள்.',
    learn_more: 'மேலும் அறியுங்கள்',

    announcements_badge: 'சமீபத்திய புதுப்பிப்புகள்',
    announcements_title: 'அரசு',
    announcements_title2: 'அறிவிப்புகள்',
    announcements_subtitle: 'சமீபத்திய அரசு திட்டங்கள் மற்றும் கொள்கைகளுடன் புதுப்பிக்கப்படுங்கள்.',
    view_all: 'அனைத்து அறிவிப்புகளையும் காண்க',

    testimonials_badge: 'குடிமக்கள் மதிப்புரைகள்',
    testimonials_title: 'கோடிக்கணக்கான இந்தியர்கள்',
    testimonials_title2: 'நம்புகிறார்கள்',
    testimonials_subtitle: 'Smart Bharat AI பயன்படுத்தும் குடிமக்களின் உண்மையான அனுபவங்கள்.',

    cta_title: 'இந்தியாவின் அறிவார்ந்த',
    cta_title2: 'குடிமை தளத்தில் சேருங்கள்',
    cta_subtitle: '18.9 லட்சம்+ குடிமக்கள் Smart Bharat AI பயன்படுத்துகிறார்கள்.',
    cta_button: 'இலவசமாக தொடங்குங்கள்',
    cta_button2: 'டெமோ பாருங்கள்',

    footer_desc: 'ஒவ்வொரு இந்திய குடிமகனுக்கும் அரசு சேவைகளை எளிதாக்கும் AI தளம்.',
    footer_col1: 'சேவைகள்', footer_col2: 'அம்சங்கள்', footer_col3: 'விரைவு இணைப்புகள்',
    footer_copyright: '© 2024 Smart Bharat AI. இந்தியாவிற்காக ❤️ உடன் உருவாக்கப்பட்டது.',
  },

  kn: {
    home: 'ಮನೆ', services: 'ಸೇವೆಗಳು', schemes: 'ಯೋಜನೆ ಹುಡುಕಾಟ', chatbot: 'AI ಸಹಾಯಕ',
    dashboard: 'ಡ್ಯಾಶ್‌ಬೋರ್ಡ್', report: 'ಸಮಸ್ಯೆ ವರದಿ', track: 'ದೂರು ಟ್ರ್ಯಾಕ್',
    documents: 'ದಾಖಲೆಗಳು', emergency: 'ತುರ್ತು', map: 'ಸಮೀಪದ ಸೇವೆಗಳು',
    login: 'ಲಾಗಿನ್', logout: 'ಲಾಗ್ಔಟ್', search: 'ಸೇವೆಗಳನ್ನು ಹುಡುಕಿ...',
    voice: 'ವಾಯ್ಸ್ ಅಸಿಸ್ಟೆಂಟ್', admin: 'ನಿರ್ವಾಹಕ', notifications: 'ಅಧಿಸೂಚನೆಗಳು',
    form_filling: 'AI ಫಾರ್ಮ್ ಭರ್ತಿ',

    hero_badge: 'ಸ್ಮಾರ್ಟ್ ಭಾರತ್ AI ಮೂಲಕ · ಭಾರತ ಸರ್ಕಾರದ ಉಪಕ್ರಮ',
    hero_title_1: 'ಸರ್ಕಾರಿ ಸೇವೆಗಳನ್ನು',
    hero_title_2: 'AI ಯೊಂದಿಗೆ ಸ್ಮಾರ್ಟ್',
    hero_title_3: 'ಮಾಡುವುದು',
    hero_subtitle: 'ಎಲ್ಲಾ ನಾಗರಿಕ ಅಗತ್ಯಗಳಿಗೆ ನಿಮ್ಮ ಬುದ್ಧಿವಂತ ಸಂಗಾತಿ.',
    hero_subtitle_bold: '500+ ಸೇವೆಗಳು',
    hero_subtitle_end: ' ಪ್ರವೇಶಿಸಿ, ಅರ್ಹ ಯೋಜನೆಗಳನ್ನು ಕಂಡುಹಿಡಿಯಿರಿ.',
    get_started: 'ಪ್ರಾರಂಭಿಸಿ',
    explore_services: 'ಸೇವೆಗಳನ್ನು ಅನ್ವೇಷಿಸಿ',
    scroll_to_explore: 'ಕೆಳಗೆ ಸ್ಕ್ರೋಲ್ ಮಾಡಿ',

    stat_services: 'ಸರ್ಕಾರಿ ಸೇವೆಗಳು',
    stat_satisfaction: 'ನಾಗರಿಕ ತೃಪ್ತಿ',
    stat_complaints: 'ದೂರುಗಳು ಪರಿಹರಿಸಲಾಗಿದೆ',
    stat_schemes: 'ಯೋಜನೆಗಳು ಲಭ್ಯ',

    features_badge: 'AI ಚಾಲಿತ ವೇದಿಕೆ',
    features_title: 'ನಿಮಗೆ ಬೇಕಾದ ಎಲ್ಲವೂ,',
    features_title2: 'ಒಂದೇ ಸ್ಥಳದಲ್ಲಿ',
    features_subtitle: 'Smart Bharat AI ಇಡೀ ಸರ್ಕಾರವನ್ನು ನಿಮ್ಮ ಬೆರಳ ತುದಿಯಲ್ಲಿ ತರುತ್ತದೆ.',
    feat_ai_title: 'AI ಸಹಾಯಕ',
    feat_ai_desc: 'ಯಾವುದೇ ಸರ್ಕಾರಿ ಸೇವೆಯ ಬಗ್ಗೆ ನಿಮ್ಮ ಭಾಷೆಯಲ್ಲಿ ತಕ್ಷಣ ಉತ್ತರಗಳನ್ನು ಪಡೆಯಿರಿ.',
    feat_scheme_title: 'ಸ್ಮಾರ್ಟ್ ಯೋಜನೆ ಹುಡುಕಾಟ',
    feat_scheme_desc: 'AI ನಿಮ್ಮ ಪ್ರೊಫೈಲ್ ವಿಶ್ಲೇಷಿಸಿ ಅರ್ಹ ಯೋಜನೆಗಳನ್ನು ಕಂಡುಹಿಡಿಯುತ್ತದೆ.',
    feat_doc_title: 'ದಾಖಲೆ ಸಹಾಯಕ',
    feat_doc_desc: 'ದಾಖಲೆಗಳನ್ನು ಅಪ್‌ಲೋಡ್ ಮಾಡಿ OCR ಹೊರತೆಗೆಯುವಿಕೆ ಮತ್ತು ಪರಿಶೀಲನೆ ಪಡೆಯಿರಿ.',
    feat_civic_title: 'ನಾಗರಿಕ ಸಮಸ್ಯೆ ವರದಿ',
    feat_civic_desc: 'ರಸ್ತೆ ಹಾನಿ, ದೀಪಗಳು, ನೀರಿನ ಸೋರಿಕೆ AI ಸಹಾಯದಿಂದ ವರದಿ ಮಾಡಿ.',
    feat_map_title: 'ಸಮೀಪದ ಸರ್ಕಾರಿ ಸೇವೆಗಳು',
    feat_map_desc: 'ಪಾಸ್‌ಪೋರ್ಟ್ ಕಚೇರಿಗಳು, ಆಸ್ಪತ್ರೆಗಳು, RTO ಸಂವಾದಾತ್ಮಕ ನಕ್ಷೆ.',
    feat_voice_title: 'ಬಹುಭಾಷಾ ಧ್ವನಿ ಸಹಾಯಕ',
    feat_voice_desc: 'ಕನ್ನಡ, ಹಿಂದಿ, ತೆಲುಗು, ತಮಿಳು ಅಥವಾ ಇಂಗ್ಲಿಷ್‌ನಲ್ಲಿ ಮಾತನಾಡಿ.',
    learn_more: 'ಇನ್ನಷ್ಟು ತಿಳಿಯಿರಿ',

    announcements_badge: 'ಇತ್ತೀಚಿನ ನವೀಕರಣಗಳು',
    announcements_title: 'ಸರ್ಕಾರಿ',
    announcements_title2: 'ಪ್ರಕಟಣೆಗಳು',
    announcements_subtitle: 'ಇತ್ತೀಚಿನ ಸರ್ಕಾರಿ ಯೋಜನೆಗಳು ಮತ್ತು ನೀತಿಗಳೊಂದಿಗೆ ನವೀಕೃತರಾಗಿ.',
    view_all: 'ಎಲ್ಲಾ ಪ್ರಕಟಣೆಗಳನ್ನು ನೋಡಿ',

    testimonials_badge: 'ನಾಗರಿಕ ವಿಮರ್ಶೆಗಳು',
    testimonials_title: 'ಲಕ್ಷಾಂತರ ಭಾರತೀಯರ',
    testimonials_title2: 'ನಂಬಿಕೆ',
    testimonials_subtitle: 'Smart Bharat AI ಬಳಸುವ ನಾಗರಿಕರ ನಿಜವಾದ ಅನುಭವಗಳು.',

    cta_title: 'ಭಾರತದ ಅತ್ಯಂತ ಸ್ಮಾರ್ಟ್',
    cta_title2: 'ನಾಗರಿಕ ವೇದಿಕೆಗೆ ಸೇರಿ',
    cta_subtitle: '18.9 ಲಕ್ಷ+ ನಾಗರಿಕರು Smart Bharat AI ಬಳಸುತ್ತಿದ್ದಾರೆ.',
    cta_button: 'ಉಚಿತವಾಗಿ ಪ್ರಾರಂಭಿಸಿ',
    cta_button2: 'ಡೆಮೋ ನೋಡಿ',

    footer_desc: 'ಪ್ರತಿ ಭಾರತೀಯ ನಾಗರಿಕನಿಗೆ ಸರ್ಕಾರಿ ಸೇವೆಗಳನ್ನು ಸುಲಭಗೊಳಿಸುವ AI ವೇದಿಕೆ.',
    footer_col1: 'ಸೇವೆಗಳು', footer_col2: 'ವೈಶಿಷ್ಟ್ಯಗಳು', footer_col3: 'ತ್ವರಿತ ಲಿಂಕ್‌ಗಳು',
    footer_copyright: '© 2024 Smart Bharat AI. ಭಾರತಕ್ಕಾಗಿ ❤️ ನೊಂದಿಗೆ ತಯಾರಿಸಲಾಗಿದೆ.',
  },
};

const LanguageContext = createContext(null);

export const useLanguage = () => {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider');
  return ctx;
};

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(() => localStorage.getItem('sb-lang') || 'en');

  const t = (key) => translations[language]?.[key] || translations.en[key] || key;

  const changeLanguage = (lang) => {
    setLanguage(lang);
    localStorage.setItem('sb-lang', lang);
  };

  const languages = [
    { code: 'en', name: 'English', native: 'English', flag: '🇬🇧' },
    { code: 'hi', name: 'Hindi', native: 'हिंदी', flag: '🇮🇳' },
    { code: 'te', name: 'Telugu', native: 'తెలుగు', flag: '🇮🇳' },
    { code: 'ta', name: 'Tamil', native: 'தமிழ்', flag: '🇮🇳' },
    { code: 'kn', name: 'Kannada', native: 'ಕನ್ನಡ', flag: '🇮🇳' },
  ];

  return (
    <LanguageContext.Provider value={{ language, setLanguage: changeLanguage, t, languages }}>
      {children}
    </LanguageContext.Provider>
  );
}
