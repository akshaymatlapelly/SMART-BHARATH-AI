import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, ArrowRight, MessageSquare } from 'lucide-react';

const ALL_SERVICES = [
  // 🆔 Identity & Personal Documents
  { id: 'aadhaar-services', icon: '🪪', name: 'Aadhaar Services', category: 'Identity', description: 'Apply for fresh Aadhaar enrolment, biometric updates, or demographic corrections.', timeline: '10-30 days', fee: 'Free / ₹50', eligibility: 'All Indian Residents', color: '#F59E0B' },
  { id: 'pan-card', icon: '📄', name: 'PAN Card', category: 'Identity', description: 'Apply for a new Permanent Account Number or request card corrections.', timeline: '15-20 days', fee: '₹107', eligibility: 'Taxpayers & Residents', color: '#22C55E' },
  { id: 'passport', icon: '🛂', name: 'Passport Services', category: 'Identity', description: 'Apply for fresh passport, re-issue, passport renewal, or Tatkal services.', timeline: '15-45 days', fee: '₹1,500 - ₹3,500', eligibility: 'Indian Citizens', color: '#2563EB', badge: 'Most Popular' },
  { id: 'voter-id', icon: '🗳️', name: 'Voter ID (EPIC)', category: 'Identity', description: 'Register as a voter, download e-EPIC card, or change electoral details.', timeline: '30-45 days', fee: 'Free', eligibility: 'Citizens 18+', color: '#EC4899' },
  { id: 'birth-certificate', icon: '👶', name: 'Birth Certificate', category: 'Identity', description: 'Register births or obtain legal birth certificate copies from municipal bodies.', timeline: '7-15 days', fee: '₹10 - ₹50', eligibility: 'All Citizens', color: '#38BDF8' },
  { id: 'death-certificate', icon: '📋', name: 'Death Certificate', category: 'Identity', description: 'Register deaths and obtain death records from municipal offices.', timeline: '7-15 days', fee: '₹10 - ₹50', eligibility: 'Next of kin', color: '#64748B' },
  { id: 'marriage-certificate', icon: '💍', name: 'Marriage Certificate', category: 'Identity', description: 'Get a legal marriage certificate registered under Hindu/Special Marriage Act.', timeline: '15-30 days', fee: '₹100 - ₹500', eligibility: 'Married Couples', color: '#EC4899' },
  { id: 'domicile-certificate', icon: '🏠', name: 'Domicile Certificate', category: 'Identity', description: 'Obtain proof of domicile/residence in a particular State/UT.', timeline: '15-20 days', fee: '₹30 - ₹100', eligibility: 'State Residents', color: '#10B981' },
  { id: 'residence-certificate', icon: '📍', name: 'Residence Certificate', category: 'Identity', description: 'State-issued proof of current residential address status.', timeline: '10-15 days', fee: '₹20 - ₹50', eligibility: 'Local Residents', color: '#6366F1' },
  { id: 'identity-certificate', icon: '🎗️', name: 'Identity Certificate', category: 'Identity', description: 'Official identity certificate for stateless persons or refugees.', timeline: '30-60 days', fee: 'Free', eligibility: 'Stateless / Refugees', color: '#8B5CF6' },
  { id: 'family-certificate', icon: '👨‍👩‍👧‍👦', name: 'Family Certificate', category: 'Identity', description: 'State-issued certificate details listing all active family dependents.', timeline: '15-20 days', fee: '₹50', eligibility: 'Head of Family', color: '#14B8A6' },

  // 📜 Certificates
  { id: 'income-certificate', icon: '💰', name: 'Income Certificate', category: 'Certificates', description: 'Official certification of annual family income for educational or aid benefits.', timeline: '7-15 days', fee: '₹10 - ₹50', eligibility: 'All Residents', color: '#22C55E' },
  { id: 'caste-certificate', icon: '📜', name: 'Caste Certificate', category: 'Certificates', description: 'Certificate verifying caste (SC/ST/OBC) for reservation claims.', timeline: '15-30 days', fee: 'Free', eligibility: 'Eligible Castes', color: '#F97316' },
  { id: 'ews-certificate', icon: '🏵️', name: 'EWS Certificate', category: 'Certificates', description: 'Economically Weaker Section certificate for reservation quotas.', timeline: '15-25 days', fee: 'Free / ₹50', eligibility: 'EWS Eligible', color: '#EAB308' },
  { id: 'disability-certificate', icon: '♿', name: 'Disability Certificate', category: 'Certificates', description: 'Official certificate for physically challenged/disabled citizens.', timeline: '15-30 days', fee: 'Free', eligibility: 'Persons w/ Disability', color: '#06B6D4' },
  { id: 'character-certificate', icon: '🛡️', name: 'Character Certificate', category: 'Certificates', description: 'Police certified background and good character certification verification.', timeline: '7-14 days', fee: '₹100', eligibility: 'All Citizens', color: '#3B82F6' },
  { id: 'bonafide-certificate', icon: '🎓', name: 'Bonafide Certificate', category: 'Certificates', description: 'Issued by educational institutes as proof of regular student status.', timeline: '1-3 days', fee: 'Free / Varies', eligibility: 'Enrolled Students', color: '#8B5CF6' },
  { id: 'minority-certificate', icon: '🤝', name: 'Minority Certificate', category: 'Certificates', description: 'Certificate verifying minority community membership for special schemes.', timeline: '10-15 days', fee: 'Free', eligibility: 'Minority Community', color: '#06B6D4' },
  { id: 'non-creamy-layer', icon: '📄', name: 'Non-Creamy Layer Certificate', category: 'Certificates', description: 'OBC NCL certificate required for obtaining reserved class seats.', timeline: '15-30 days', fee: '₹50', eligibility: 'OBC category', color: '#059669' },
  { id: 'senior-citizen-cert', icon: '👴', name: 'Senior Citizen Certificate', category: 'Certificates', description: 'Official status document card for tax, transit, and healthcare concessions.', timeline: '7-10 days', fee: 'Free', eligibility: 'Aged 60+', color: '#6B7280' },
  { id: 'widow-certificate', icon: '👩‍🦳', name: 'Widow Certificate', category: 'Certificates', description: 'Certificate verifying widowhood for availing state support pensions.', timeline: '10-15 days', fee: 'Free', eligibility: 'Widows', color: '#9CA3AF' },

  // 🚗 Transport & Vehicle Services
  { id: 'driving-license', icon: '🚗', name: 'Driving License', category: 'Transport', description: 'Obtain a permanent driving license for light motor vehicles or two-wheelers.', timeline: '15-30 days', fee: '₹200 - ₹500', eligibility: 'Learners card holders', color: '#8B5CF6' },
  { id: 'learners-license', icon: '📝', name: "Learner's License", category: 'Transport', description: 'Apply for a provisional license by taking an online traffic signals test.', timeline: '1-3 days', fee: '₹150', eligibility: 'Aged 16+ (non-gear)', color: '#A855F7' },
  { id: 'vehicle-rc', icon: '💳', name: 'Vehicle Registration (RC)', category: 'Transport', description: 'Register new vehicles or obtain duplicate RC books from the local RTO.', timeline: '15-20 days', fee: 'Varies', eligibility: 'Vehicle Owners', color: '#4F46E5' },
  { id: 'rc-transfer', icon: '🔄', name: 'Vehicle Ownership Transfer', category: 'Transport', description: 'Transfer of motor vehicle ownership to buyer/next-of-kin legal titles.', timeline: '15-30 days', fee: '₹300 - ₹500', eligibility: 'Buyers & Sellers', color: '#6366F1' },
  { id: 'fitness-certificate', icon: '🔧', name: 'Vehicle Fitness Certificate', category: 'Transport', description: 'RTO inspection fitness checks for commercial and private motor transport.', timeline: '7-10 days', fee: '₹600 - ₹1000', eligibility: 'Commercial vehicles', color: '#F59E0B' },
  { id: 'road-tax', icon: '🛣️', name: 'Road Tax Payment', category: 'Transport', description: 'Pay annual or lifetime state road taxes online through Vahan portal.', timeline: 'Instant', fee: 'Based on vehicle', eligibility: 'Vehicle Owners', color: '#10B981' },
  { id: 'traffic-challan', icon: '🚦', name: 'Traffic Challan Payment', category: 'Transport', description: 'Search and clear active traffic violation challans online.', timeline: 'Instant', fee: 'Fine amount', eligibility: 'Violators / Owners', color: '#EF4444' },
  { id: 'vehicle-permit', icon: '📋', name: 'Vehicle Permit', category: 'Transport', description: 'Apply for national, state, or tourist permits for commercial transport.', timeline: '7-15 days', fee: 'Varies by permit', eligibility: 'Transport Operators', color: '#06B6D4' },
  { id: 'puc-certificate', icon: '💨', name: 'Pollution Under Control (PUC)', category: 'Transport', description: 'Check vehicle emission standards at certified booths to receive green tags.', timeline: '1 day', fee: '₹50 - ₹100', eligibility: 'All Motor Vehicles', color: '#10B981' },
  { id: 'fancy-number', icon: '🔢', name: 'Fancy Number Booking', category: 'Transport', description: 'Participate in online auctions for choosing customized vehicle registration numbers.', timeline: '3-7 days', fee: 'Auction Based', eligibility: 'Vehicle Purchasers', color: '#F59E0B' },

  // ⚡ Utility Services
  { id: 'electricity-bill', icon: '💡', name: 'Electricity Bill Payment', category: 'Utilities', description: 'Instant online electricity consumption bill inquiry and payment portals.', timeline: 'Instant', fee: 'Bill amount', eligibility: 'Utility Consumers', color: '#F59E0B' },
  { id: 'electricity-connection', icon: '🔌', name: 'New Electricity Connection', category: 'Utilities', description: 'Request domestic, commercial, or industrial power grid connection lines.', timeline: '7-15 days', fee: 'Security Deposit', eligibility: 'Property Owners', color: '#F97316' },
  { id: 'water-bill', icon: '💧', name: 'Water Bill Payment', category: 'Utilities', description: 'Clear municipal water supply service bills online through direct portals.', timeline: 'Instant', fee: 'Bill amount', eligibility: 'Water Customers', color: '#38BDF8' },
  { id: 'water-connection', icon: '🚿', name: 'New Water Connection', category: 'Utilities', description: 'Apply for fresh clean drinking water pipeline connections from municipal grids.', timeline: '15-30 days', fee: 'Installation cost', eligibility: 'House Owners', color: '#06B6D4' },
  { id: 'sewerage-services', icon: '🚽', name: 'Sewerage Services', category: 'Utilities', description: 'Municipal sewerage system connection clearance and maintenance requests.', timeline: '10-20 days', fee: 'Varies', eligibility: 'Property Owners', color: '#78350F' },
  { id: 'gas-connection', icon: '🔥', name: 'Gas Connection', category: 'Utilities', description: 'Apply for LPG cylinders or PNG piped natural gas pipeline services.', timeline: '3-7 days', fee: 'Deposit Varies', eligibility: 'All Households', color: '#EF4444' },
  { id: 'lpg-subsidy', icon: '💸', name: 'LPG Subsidy', category: 'Utilities', description: 'Link bank account and Aadhaar to receive active direct benefit transfers for LPG.', timeline: '3-5 days', fee: 'Free', eligibility: 'DBT Registered', color: '#22C55E' },
  { id: 'broadband-services', icon: '🌐', name: 'Internet & Broadband Services', category: 'Utilities', description: 'Apply for BharatNet broadband connections or public Wi-Fi access.', timeline: '3-7 days', fee: 'Package Based', eligibility: 'All Residents', color: '#3B82F6' },

  // 🏥 Health Services
  { id: 'ayushman-bharat', icon: '🏥', name: 'Ayushman Bharat', category: 'Health', description: 'Enrol under PM-JAY scheme to receive free hospital covers up to ₹5 Lakh.', timeline: '7-10 days', fee: 'Free', eligibility: 'EWS/SECC List', color: '#22C55E', badge: 'Essential' },
  { id: 'abha-health-id', icon: '🆔', name: 'Health ID (ABHA)', category: 'Health', description: 'Create your digital health account card to share medical records securely.', timeline: 'Instant', fee: 'Free', eligibility: 'All Residents', color: '#3B82F6' },
  { id: 'vaccination-certificate', icon: '💉', name: 'Vaccination Certificate', category: 'Health', description: 'Download authenticated digital vaccination certificates (CoWIN).', timeline: 'Instant', fee: 'Free', eligibility: 'Vaccinated persons', color: '#06B6D4' },
  { id: 'hospital-finder', icon: '🔍', name: 'Hospital Finder', category: 'Health', description: 'Locate nearby government and empanelled private hospitals or health centres.', timeline: 'Instant', fee: 'Free', eligibility: 'All Citizens', color: '#10B981' },
  { id: 'blood-bank', icon: '🩸', name: 'Blood Bank Finder', category: 'Health', description: 'Check real-time stock levels of matching blood units at municipal centers.', timeline: 'Instant', fee: 'Free', eligibility: 'All Citizens', color: '#EF4444' },
  { id: 'organ-donation', icon: '❤️', name: 'Organ Donation Registration', category: 'Health', description: 'Pledge organ donations legally and download registry donor cards.', timeline: 'Instant', fee: 'Free', eligibility: 'Adult Citizens', color: '#EC4899' },
  { id: 'health-insurance', icon: '🛡️', name: 'Health Insurance Schemes', category: 'Health', description: 'Central and state-level cooperative medical schemes registration portals.', timeline: '7-15 days', fee: 'Nominal Premium', eligibility: 'Scheme Dependent', color: '#4F46E5' },
  { id: 'medical-cert-verify', icon: '🩺', name: 'Medical Certificate Verification', category: 'Health', description: 'Verify doctors certified fitness reports or sickness certificates.', timeline: 'Instant', fee: 'Free', eligibility: 'Employers / Public', color: '#6366F1' },

  // 🎓 Education Services
  { id: 'scholarships', icon: '🎓', name: 'Scholarships', category: 'Education', description: 'Apply for National Scholarship Portal (NSP) merit/post-matric schemes.', timeline: '30-90 days', fee: 'Free', eligibility: 'Meritorious students', color: '#8B5CF6' },
  { id: 'student-loans', icon: '💸', name: 'Student Loans', category: 'Education', description: 'Apply for collateral-free education loans through Vidya Lakshmi portal.', timeline: '15-30 days', fee: 'Interest Varies', eligibility: 'Admitted students', color: '#10B981' },
  { id: 'college-admissions', icon: '🏛️', name: 'College Admissions', category: 'Education', description: 'Centralized state admissions portals for universities and colleges.', timeline: 'Varies', fee: 'Application fee', eligibility: 'Qualified applicants', color: '#3B82F6' },
  { id: 'school-admissions', icon: '🏫', name: 'School Admissions', category: 'Education', description: 'Right to Education (RTE) free admissions portals for primary schools.', timeline: 'Varies', fee: 'Free (under RTE)', eligibility: 'Aged 6-14 years', color: '#F59E0B' },
  { id: 'degree-verification', icon: '📜', name: 'Degree Certificate Verification', category: 'Education', description: 'Verify authenticity of graduation degrees through UGC academic depositories.', timeline: '3-7 days', fee: 'Varies', eligibility: 'Graduates/Employers', color: '#6366F1' },
  { id: 'marksheet-verification', icon: '📝', name: 'Marksheet Verification', category: 'Education', description: 'Fetch and verify standard 10th and 12th board marksheet transcripts.', timeline: 'Instant', fee: 'Free', eligibility: 'All Boards', color: '#EC4899' },
  { id: 'skill-india', icon: '🛠️', name: 'Skill India Programs', category: 'Education', description: 'Enroll in PMKVY free vocational skill development courses and earn certifications.', timeline: 'Varies', fee: 'Free', eligibility: 'Aged 15-45 years', color: '#F97316' },
  { id: 'digital-certificates-edu', icon: '📁', name: 'Digital Certificates', category: 'Education', description: 'Fetch verified board and graduation certifications online directly.', timeline: 'Instant', fee: 'Free', eligibility: 'Students', color: '#14B8A6' },

  // 🌾 Agriculture Services
  { id: 'pm-kisan', icon: '🌾', name: 'PM Kisan', category: 'Agriculture', description: 'Register for ₹6,000 yearly income support transferred directly to farmers.', timeline: '15-30 days', fee: 'Free', eligibility: 'Land-holding Farmers', color: '#22C55E' },
  { id: 'crop-insurance', icon: '🛡️', name: 'Crop Insurance (PMFBY)', category: 'Agriculture', description: 'Protect your crops against natural calamities with low-premium insurances.', timeline: '15-30 days', fee: 'Nominal Premium', eligibility: 'Cultivators', color: '#10B981' },
  { id: 'soil-health', icon: '🌱', name: 'Soil Health Card', category: 'Agriculture', description: 'Get diagnostic chemical reports of farm soil nutrients and fertilizer guidance.', timeline: '10-15 days', fee: 'Free', eligibility: 'Landowners', color: '#84CC16' },
  { id: 'fertilizer-subsidy', icon: '🧪', name: 'Fertilizer Subsidy', category: 'Agriculture', description: 'Purchase subsidized chemical fertilizers using farmer biometric database.', timeline: 'Instant', fee: 'Subsidized rate', eligibility: 'Registered Farmers', color: '#06B6D4' },
  { id: 'seed-distribution', icon: '🌾', name: 'Seed Distribution', category: 'Agriculture', description: 'Obtain high-yield certified seeds at subsidized prices from local hubs.', timeline: '7-10 days', fee: 'Subsidized cost', eligibility: 'Registered Farmers', color: '#10B981' },
  { id: 'farmer-registration', icon: '📝', name: 'Farmer Registration', category: 'Agriculture', description: 'Enrol under state databases to receive direct subsidy benefit transfers.', timeline: '5-7 days', fee: 'Free', eligibility: 'Landholders', color: '#22C55E' },
  { id: 'weather-advisory', icon: '☀️', name: 'Weather Advisory', category: 'Agriculture', description: 'Get daily localized agricultural weather forecasts and warning alerts.', timeline: 'Instant', fee: 'Free', eligibility: 'All Farmers', color: '#F59E0B' },
  { id: 'crop-loan', icon: '💰', name: 'Crop Loan Services', category: 'Agriculture', description: 'Apply for short-term production credit through Kisan Credit Cards (KCC).', timeline: '15-30 days', fee: 'Interest Varies', eligibility: 'KCC card holders', color: '#10B981' },
  { id: 'market-price', icon: '📈', name: 'Market Price Information', category: 'Agriculture', description: 'Check daily wholesale commodity prices at agricultural mandis online.', timeline: 'Instant', fee: 'Free', eligibility: 'Public', color: '#38BDF8' },

  // 📂 Digital Services
  { id: 'digilocker', icon: '📂', name: 'DigiLocker Integration', category: 'Digital', description: 'Store and fetch verified digital copies of driving license, marksheets, etc.', timeline: 'Instant', fee: 'Free', eligibility: 'Aadhaar Holders', color: '#3B82F6' },
  { id: 'document-verification-digital', icon: '🔍', name: 'Document Verification', category: 'Digital', description: 'Upload scan copies of certificates for cryptographic validity checks.', timeline: 'Instant', fee: 'Free', eligibility: 'All Users', color: '#6366F1' },
  { id: 'digital-signature', icon: '✍️', name: 'Digital Signature (DSC)', category: 'Digital', description: 'Apply for high-security Class 3 cryptographic digital signatures.', timeline: '3-5 days', fee: '₹500 - ₹1000', eligibility: 'Corporate/Individuals', color: '#8B5CF6' },
  { id: 'e-sign', icon: '📝', name: 'e-Sign Service', category: 'Digital', description: 'Electronically sign PDF documents legally using Aadhaar OTP authentication.', timeline: 'Instant', fee: 'Free / ₹5', eligibility: 'Aadhaar/OTP enabled', color: '#A855F7' },
  { id: 'qr-verification', icon: '📱', name: 'QR Verification', category: 'Digital', description: 'Verify authenticity of government documents by scanning security QR codes.', timeline: 'Instant', fee: 'Free', eligibility: 'All Users', color: '#14B8A6' },
  { id: 'digital-certificates-gen', icon: '📜', name: 'Digital Certificates Validation', category: 'Digital', description: 'Validate the digital signatures embedded in municipal certificate PDFs.', timeline: 'Instant', fee: 'Free', eligibility: 'Public', color: '#06B6D4' },

  // 🌍 Immigration & Travel
  { id: 'passport-renewal', icon: '🛂', name: 'Passport Renewal', category: 'Travel', description: 'Apply online for reissue of Indian Passport on expiry or changes.', timeline: '15-30 days', fee: '₹1,500', eligibility: 'Passport holders', color: '#2563EB' },
  { id: 'visa-info', icon: '🌍', name: 'Visa Information', category: 'Travel', description: 'Detailed visa guidelines, tourist e-Visa rules, and overseas applications.', timeline: 'Instant', fee: 'Free (info)', eligibility: 'All Travellers', color: '#3B82F6' },
  { id: 'overseas-citizen', icon: '🇮🇳', name: 'Overseas Citizen (OCI)', category: 'Travel', description: 'Apply for Overseas Citizen of India lifelong multi-entry visa cards.', timeline: '60-90 days', fee: 'Varies', eligibility: 'Foreigners of Indian origin', color: '#10B981' },
  { id: 'emigration-clearance', icon: '🛫', name: 'Emigration Clearance (EC)', category: 'Travel', description: 'Obtain emigration clearances required for specific employment countries.', timeline: '3-7 days', fee: '₹200', eligibility: 'ECR passport holders', color: '#4F46E5' },
  { id: 'travel-advisories', icon: '📢', name: 'Travel Advisories', category: 'Travel', description: 'Get live security guidelines and travel restrictions from Ministry of External Affairs.', timeline: 'Instant', fee: 'Free', eligibility: 'All Citizens', color: '#EF4444' },

  // 👨‍👩‍👧 Social Welfare
  { id: 'old-age-pension', icon: '👴', name: 'Old Age Pension', category: 'Welfare', description: 'Monthly financial assistance scheme for senior citizens belonging to BPL.', timeline: '30-45 days', fee: 'Free', eligibility: 'Aged 60+ (BPL)', color: '#6B7280' },
  { id: 'widow-pension', icon: '👵', name: 'Widow Pension', category: 'Welfare', description: 'Financial support cards for single/widowed women with family dependents.', timeline: '30-45 days', fee: 'Free', eligibility: 'Widows (BPL)', color: '#EC4899' },
  { id: 'disability-pension', icon: '♿', name: 'Disability Pension', category: 'Welfare', description: 'Monthly welfare pension disbursements for physically challenged residents.', timeline: '30-45 days', fee: 'Free', eligibility: '40%+ Disabled', color: '#06B6D4' },
  { id: 'pm-awas-yojana', icon: '🏠', name: 'PM Awas Yojana', category: 'Welfare', description: 'Apply for affordable housing credit subsidies to build private pakka houses.', timeline: '90-180 days', fee: 'Free', eligibility: 'Homeless families', color: '#2563EB' },
  { id: 'food-security', icon: '🌾', name: 'National Food Security (NFSA)', category: 'Welfare', description: 'Register to get heavily subsidized rice, wheat, and grains from government stores.', timeline: '15-30 days', fee: 'Free', eligibility: 'BPL/AAY List', color: '#10B981' },
  { id: 'ration-card', icon: '🛒', name: 'Ration Card Services', category: 'Welfare', description: 'Apply for new ration card, add members, or transfer ration shop listings.', timeline: '15-30 days', fee: 'Free / ₹10', eligibility: 'Families', color: '#22C55E' },
  { id: 'mgnrega', icon: '🚜', name: 'MGNREGA Job Card', category: 'Welfare', description: 'Register for guaranteed 100 days of manual wage employment in rural areas.', timeline: '15 days', fee: 'Free', eligibility: 'Rural Adults', color: '#F97316' },
  { id: 'jan-dhan-yojana', icon: '💰', name: 'PM Jan Dhan Yojana', category: 'Welfare', description: 'Open zero-balance basic savings accounts with integrated accident insurance.', timeline: '1-3 days', fee: 'Free', eligibility: 'Unbanked Adults', color: '#22C55E' },

  // 💰 Tax & Finance
  { id: 'income-tax', icon: '💵', name: 'Income Tax filing', category: 'Finance', description: 'File income tax returns (ITR), check refund claims, or link PAN with Aadhaar.', timeline: 'Instant', fee: 'Tax based', eligibility: 'Income Earners', color: '#22C55E' },
  { id: 'gst-portal', icon: '🧾', name: 'GST Services', category: 'Finance', description: 'Goods and Services Tax registration, composition scheme filing, and refunds.', timeline: '3-7 days', fee: 'Free', eligibility: 'Business owners', color: '#059669' },
  { id: 'property-tax-finance', icon: '🏠', name: 'Property Tax', category: 'Finance', description: 'Pay municipal building and land holding property taxes online.', timeline: 'Instant', fee: 'Assessed value', eligibility: 'Property owners', color: '#10B981' },
  { id: 'professional-tax', icon: '👔', name: 'Professional Tax Payment', category: 'Finance', description: 'Submit professional taxes collected by state governments from salaries.', timeline: 'Instant', fee: 'State rates', eligibility: 'Salaried / Employers', color: '#3B82F6' },
  { id: 'tds-info', icon: '📊', name: 'TDS Information (Form 26AS)', category: 'Finance', description: 'Verify tax deducted at source values from salary and bank investments.', timeline: 'Instant', fee: 'Free', eligibility: 'Taxpayers', color: '#6366F1' },
  { id: 'tax-refund', icon: '🔄', name: 'Tax Refund Status', category: 'Finance', description: 'Check online status of Income Tax Return (ITR) refunds.', timeline: 'Instant', fee: 'Free', eligibility: 'Taxpayers', color: '#22C55E' },
  { id: 'pension-services', icon: '👵', name: 'Pension Services (NPS)', category: 'Finance', description: 'Enrol under National Pension Scheme or manage investments and withdrawals.', timeline: 'Varies', fee: 'Contribution based', eligibility: 'Aged 18-70 years', color: '#4F46E5' },
  { id: 'pf-withdrawal', icon: '🏦', name: 'PF Withdrawal (EPFO)', category: 'Finance', description: 'Claim EPF balances, check UAN logs, and transfer provident funds online.', timeline: '10-20 days', fee: 'Free', eligibility: 'EPF Members', color: '#3B82F6' },

  // 🏠 Property & Land Services
  { id: 'property-reg', icon: '📜', name: 'Property Registration', category: 'Property', description: 'Get deeds, title sales, and property transfers registered at the sub-registrar.', timeline: '3-7 days', fee: 'Stamp duty + fees', eligibility: 'Buyers & Sellers', color: '#8B5CF6' },
  { id: 'encumbrance-cert', icon: '🔍', name: 'Encumbrance Certificate', category: 'Property', description: 'Obtain proof that property is free from any liability or pending loans.', timeline: '7-15 days', fee: '₹200 - ₹500', eligibility: 'Property Owners', color: '#14B8A6' },
  { id: 'land-records', icon: '🗺️', name: 'Land Records (Patta/Chitta/RoR)', category: 'Property', description: 'Search and download survey numbers, patta land deeds, and field maps.', timeline: 'Instant', fee: 'Free / ₹20', eligibility: 'Landowners', color: '#10B981' },
  { id: 'mutation-cert', icon: '🔄', name: 'Mutation Certificate', category: 'Property', description: 'Update land records to transfer mutation title names on ownership change.', timeline: '30-60 days', fee: '₹100', eligibility: 'New Purchasers', color: '#F97316' },
  { id: 'building-permission', icon: '🏢', name: 'Building Permission', category: 'Property', description: 'Get layout approvals and building plan clearances from municipal authorities.', timeline: '30-45 days', fee: 'Area Based', eligibility: 'Property Developers', color: '#F59E0B' },
  { id: 'property-verification', icon: '✅', name: 'Property Ownership Verification', category: 'Property', description: 'Verify current ownership records and boundary dimensions online.', timeline: '1-3 days', fee: 'Free', eligibility: 'Public', color: '#10B981' },
  { id: 'land-survey', icon: '📐', name: 'Land Survey Request', category: 'Property', description: 'Request government survey teams to mark land boundary limits.', timeline: '15-30 days', fee: 'Survey charge', eligibility: 'Landholders', color: '#6B7280' },
  { id: 'property-valuation', icon: '⚖️', name: 'Property Valuation', category: 'Property', description: 'Obtain certified property valuation reports based on state guidance rates.', timeline: '7-10 days', fee: 'Varies', eligibility: 'Property Owners', color: '#06B6D4' }
];

const CATEGORIES = [
  'All', 'Identity', 'Certificates', 'Transport', 'Utilities', 
  'Health', 'Education', 'Agriculture', 'Digital', 'Travel', 
  'Welfare', 'Finance', 'Property'
];

export default function Services() {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const navigate = useNavigate();

  const filtered = useMemo(() => {
    return ALL_SERVICES.filter(s => {
      const matchesSearch = s.name.toLowerCase().includes(search.toLowerCase()) ||
        s.description.toLowerCase().includes(search.toLowerCase()) ||
        s.category.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = activeCategory === 'All' || s.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [search, activeCategory]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="p-6 min-h-full"
    >
      {/* Header */}
      <div className="mb-8">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
          <span className="badge badge-primary mb-3">Government Services</span>
          <h1 className="font-display font-bold text-3xl md:text-4xl text-white mb-2">
            All Government <span className="gradient-text">Services</span>
          </h1>
          <p className="text-slate-400">Find, understand, and access any government service in India</p>
        </motion.div>
      </div>

      {/* Search */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="relative mb-6"
      >
        <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          type="text"
          placeholder="Search services..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="input-glass pl-12 py-4 text-base w-full max-w-2xl"
        />
      </motion.div>

      {/* Category Filters */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="flex flex-wrap gap-2 mb-8"
      >
        {CATEGORIES.map(cat => (
          <motion.button
            key={cat}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
              activeCategory === cat
                ? 'bg-primary-600 text-white shadow-lg'
                : 'glass border border-white/10 text-slate-400 hover:text-white hover:border-white/20'
            }`}
          >
            {cat}
          </motion.button>
        ))}
      </motion.div>

      {/* Results count */}
      <p className="text-slate-500 text-sm mb-5">{filtered.length} services found</p>

      {/* Services Grid */}
      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filtered.map((service, i) => (
          <motion.div
            key={service.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ y: -6, scale: 1.01 }}
            onClick={() => navigate(`/services/${service.id}`)}
            className="glass-card p-5 group cursor-pointer relative overflow-hidden text-left"
          >
            {/* Hover glow */}
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl pointer-events-none"
              style={{ background: `radial-gradient(circle at top left, ${service.color}15, transparent 60%)` }}
            />

            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl transition-transform group-hover:scale-110 duration-300"
                  style={{ background: `${service.color}15`, border: `1px solid ${service.color}25` }}
                >
                  {service.icon}
                </div>
                <div>
                  <h3 className="font-semibold text-white text-[15px]">{service.name}</h3>
                  <span className="text-xs text-slate-500">{service.category}</span>
                </div>
              </div>
              {service.badge && (
                <span className="badge badge-primary text-xs flex-shrink-0">{service.badge}</span>
              )}
            </div>

            <p className="text-slate-400 text-sm mb-4 leading-relaxed line-clamp-2 h-10">{service.description}</p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-2 mb-4 bg-white/[0.02] p-2 rounded-xl border border-white/05">
              <div className="text-center">
                <div className="text-[10px] text-slate-500 mb-0.5">Timeline</div>
                <div className="text-[11px] text-white font-medium truncate px-1">{service.timeline}</div>
              </div>
              <div className="text-center border-x border-white/08">
                <div className="text-[10px] text-slate-500 mb-0.5">Fee</div>
                <div className="text-[11px] text-white font-medium truncate px-1">{service.fee}</div>
              </div>
              <div className="text-center">
                <div className="text-[10px] text-slate-500 mb-0.5">Eligible</div>
                <div className="text-[11px] text-white font-medium truncate px-1">{service.eligibility.split(' ')[0]}</div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(`/services/${service.id}`);
                }}
                className="flex-1 py-2 rounded-xl text-xs font-semibold transition-all flex items-center justify-center gap-1"
                style={{ background: `${service.color}15`, color: service.color, border: `1px solid ${service.color}25` }}
              >
                View Details <ArrowRight size={12} />
              </button>
              
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  navigate('/chatbot');
                }}
                className="p-2 rounded-xl glass border border-white/10 text-slate-400 hover:text-accent transition-all"
                title="Ask AI"
              >
                <MessageSquare size={14} />
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {filtered.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-20"
        >
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-white font-semibold text-xl mb-2">No services found</h3>
        </motion.div>
      )}
    </motion.div>
  );
}
