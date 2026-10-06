# 🇮🇳 Smart Bharat AI (`Smart_bharath_AI`)

> **Next-Generation Citizen Intelligence & Public Welfare Portal**  
> Empowering Indian citizens with instant access to 500+ civic services, intelligent welfare scheme discovery, client-side document verification, and multilingual AI assistance — completely private with **zero external API keys required**.

---

## 🌟 Key Features

### 1. 🤖 Smart Bharat Civic AI Assistant (100% Built-in)
* **Zero External API Keys Required:** Runs directly in the application without requiring OpenAI or Gemini cloud subscriptions.
* **Domain-Trained on Indian Governance:** Comprehensive knowledge of:
  * **Identity & Legal Documents:** Aadhaar (UIDAI), PAN Card (ITD), Voter ID (ECI), Passport Seva (MEA), Driving License (MoRTH Parivahan).
  * **Revenue & Welfare Certificates:** Income, Caste, Domicile, EWS, Birth/Death certificates.
  * **Civic Grievances:** CPGRAMS, municipal roads, streetlights, water supply, electricity discoms.
  * **National Emergency Helplines:** 112 (National Emergency), 1930 (Cyber Crime Fraud), 1091 (Women Helpline), 1098 (Childline).
* Provides direct official `.gov.in` and `.nic.in` portal links, required document checklists, fees, and processing timelines.

---

### 2. 🎯 AI Scheme Eligibility Finder
* Intelligent multi-variable matching algorithm across **25+ genuine Central & State welfare programs**:
  * **Healthcare:** Ayushman Bharat PM-JAY (₹5 Lakh cashless health cover).
  * **Agriculture:** PM-KISAN (₹6,000/yr DBT) & Kisan Credit Card (KCC).
  * **Housing:** Pradhan Mantri Awas Yojana (PMAY-U 2.0 & PMAY-G).
  * **Education:** National Scholarship Portal (NSP) Pre/Post-Matric & Central Sector Schemes.
  * **Financial Security:** PM MUDRA Yojana, Sukanya Samriddhi Yojana (SSY), Atal Pension Yojana (APY), PM Suraksha Bima (PMSBY).
  * **Divyangjan & Vulnerable Groups:** ADIP Assistive Devices & PM SVANidhi Street Vendor micro-credit.
  * **State Welfare Initiatives:** Telangana Rythu Bharosa / Aasara, Maharashtra MJPJAY, UP Shadi Anudan, Karnataka Gruha Lakshmi.
* Instant eligibility breakdown, percentage match scores, and official application portals.

---

### 3. 📄 Local Neural OCR & Document Assistant
* **100% Client-Side Privacy:** Powered by WebAssembly OCR (`tesseract.js`) and canvas optical analysis — no user document ever leaves their browser.
* **Optical Inspection Metrics:** Evaluates document resolution, aspect ratio (ISO/IEC 7810 ID-1 standard), brightness, and sharpness.
* **Real Field Extraction & Validation:**
  * **Aadhaar Card:** 12-digit number extraction, masked format generation (`XXXX XXXX 1234`), Name, DOB, Gender, Pincode, and UIDAI compliance advisory.
  * **PAN Card:** 10-character code extraction, 4th-character entity categorization (Individual, Company, HUF), Name, Father's Name, DOB, and Section 139AA linking guidance.
  * **Voter ID (EPIC):** 10-character EPIC format, Elector Name, Constituency, and State.
  * **Driving License:** Parivahan DL format, vehicle class (LMV/MCWG), and RTO state.
  * **Certificates:** Certificate number, issuing authority, and financial year validity.
* **One-Click Form Auto-Fill:** Automatically transfers verified identity data to the application forms module.

---

### 4. 📝 AI Form Filling
* Streamlined application forms for Passport (Form SP), PAN Card (Form 49A), Ration Card, and Income Certificates.
* Auto-populates all personal, demographic, and address fields directly from verified OCR document scans.

---

### 5. 🎨 Design Aesthetics & Indian Heritage Theme
* **Seamless Light & Dark Mode:** Toggle in top navigation with Framer Motion spring physics.
* **Indian Tricolor Gradient:** Saffron (`#FF9933`), White (`#FFFFFF`), and Green (`#138808`) backdrop with balanced opacity in both themes.
* **Ashoka Chakra Animation:** Smoothly rotating 24-spoke Navy Blue (`#002B7F`) circle wheel across hero and portal pages.
* **Multilingual UI:** Complete localized translations for English, Hindi (हिंदी), Telugu (తెలుగు), Tamil (தமிழ்), and Kannada (ಕನ್ನಡ).

---

## 🛠️ Tech Stack

* **Frontend Framework:** React 19, Vite
* **Styling & Design System:** Tailwind CSS, Vanilla CSS design tokens, Glassmorphism
* **Animation & Micro-interactions:** Framer Motion
* **Optical Character Recognition:** Tesseract.js (WebAssembly OCR)
* **Icons & Visuals:** Lucide React, Canvas Confetti
* **Routing & State:** React Router DOM v7, React Context API

---

## 🚀 Quick Start & Installation

### Prerequisites
* [Node.js](https://nodejs.org/) (v18 or higher recommended)
* npm or yarn

### 1. Clone the Repository
```bash
git clone https://github.com/aravindlingala6-beep/Smart_bharath_AI.git
cd Smart_bharath_AI
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Start Development Server
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### 4. Build for Production
```bash
npm run build
```

---

## 🔒 Privacy & Security
* **Zero Document Uploads to Cloud:** Document scanning and OCR run 100% locally in browser memory.
* **No Telemetry or Tracking:** Citizen inputs, demographic profiles, and queries stay on the local device.

---

## 📜 License
Distributed under the MIT License. See `LICENSE` for more information.
