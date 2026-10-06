import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Clock, DollarSign, Users, CheckCircle, ExternalLink, MessageSquare, ChevronDown, FileText } from 'lucide-react';

const SERVICE_DATA = {
  passport: {
    id: 'passport', icon: '🛂', name: 'Passport', category: 'Identity Documents',
    color: '#2563EB',
    description: 'The Indian Passport is issued by the Ministry of External Affairs. It serves as an international travel document and proof of Indian citizenship.',
    eligibility: 'All Indian citizens are eligible. Minor passports require parental consent.',
    timeline: '30-45 days (Normal) · 7-14 days (Tatkal)',
    fee: '₹1,500 (36 pages) · ₹2,000 (60 pages) · ₹3,500 (Tatkal)',
    officialLink: 'https://passportindia.gov.in',
    ministry: 'Ministry of External Affairs',
    documents: [
      { name: 'Proof of Identity', examples: 'Aadhaar card, Voter ID, PAN card' },
      { name: 'Proof of Address', examples: 'Aadhaar, Electricity bill, Bank passbook' },
      { name: 'Proof of Date of Birth', examples: 'Birth certificate, School certificate, Aadhaar' },
      { name: 'Recent Photographs', examples: '2 passport-size photos (white background)' },
    ],
    process: [
      { step: 1, title: 'Register Online', desc: 'Visit Passport Seva Portal and create an account' },
      { step: 2, title: 'Fill Application', desc: 'Complete Form SP (Fresh) or SPR (Renewal)' },
      { step: 3, title: 'Pay Fee', desc: 'Pay fees online via net banking, debit/credit card' },
      { step: 4, title: 'Book Appointment', desc: 'Schedule appointment at nearest PSK/POPSK' },
      { step: 5, title: 'Visit PSK', desc: 'Visit with original documents for verification' },
      { step: 6, title: 'Police Verification', desc: 'Local police verifies your address and background' },
      { step: 7, title: 'Receive Passport', desc: 'Passport delivered by Speed Post in 30-45 days' },
    ],
    faqs: [
      { q: 'How long is an Indian passport valid?', a: '10 years for adults, 5 years for minors under 18.' },
      { q: 'Can I track my passport status?', a: 'Yes, track on Passport Seva Portal using file number.' },
      { q: 'What if I lost my passport?', a: 'File police FIR, then apply for fresh passport with Lost Passport FIR copy.' },
      { q: 'Is Aadhaar mandatory for passport?', a: 'Not mandatory but highly recommended as identity proof.' },
    ],
  },
  aadhaar: {
    id: 'aadhaar', icon: '🪪', name: 'Aadhaar Card', category: 'Identity Documents',
    color: '#F59E0B',
    description: 'Aadhaar is a 12-digit unique identity number issued by UIDAI to every Indian resident. It is a biometric-based identification system.',
    eligibility: 'All residents of India (including NRIs and foreigners residing in India for 182+ days)',
    timeline: '90 days for new enrollment · Instant update online',
    fee: 'Free (enrollment) · ₹50 (demographic update) · ₹100 (biometric update)',
    officialLink: 'https://uidai.gov.in',
    ministry: 'UIDAI – Ministry of Electronics & IT',
    documents: [
      { name: 'Proof of Identity (any one)', examples: 'Voter ID, Passport, Driving License, PAN, NREGA card' },
      { name: 'Proof of Address (any one)', examples: 'Electricity bill, Bank statement, Post office passbook' },
      { name: 'Proof of Date of Birth (any one)', examples: 'Birth certificate, Marksheet, SSLC certificate' },
    ],
    process: [
      { step: 1, title: 'Locate Centre', desc: 'Find nearest Aadhaar Enrolment Centre at UIDAI website' },
      { step: 2, title: 'Fill Form', desc: 'Fill Enrolment/Correction form at the centre' },
      { step: 3, title: 'Biometrics', desc: 'Provide fingerprints, iris scan, and photograph' },
      { step: 4, title: 'Acknowledgement', desc: 'Receive acknowledgement slip with EID number' },
      { step: 5, title: 'Receive Aadhaar', desc: 'Aadhaar card delivered in 90 days (also available digitally)' },
    ],
    faqs: [
      { q: 'How to update Aadhaar online?', a: 'Visit myAadhaar portal (myaadhaar.uidai.gov.in) and use OTP-based update.' },
      { q: 'What is e-Aadhaar?', a: 'A password-protected digital copy of Aadhaar, equally valid as physical copy.' },
      { q: 'Can I have multiple Aadhaar cards?', a: 'No. Only one Aadhaar per resident. You can update existing one.' },
      { q: 'UIDAI Helpline?', a: 'Call 1947 (toll-free) or email help@uidai.gov.in' },
    ],
  },
  pan: {
    id: 'pan', icon: '📄', name: 'PAN Card', category: 'Finance Documents',
    color: '#22C55E',
    description: 'PAN (Permanent Account Number) is a 10-digit alphanumeric number issued by Income Tax Department. Required for financial transactions.',
    eligibility: 'All Indian citizens, companies, and entities requiring financial identity',
    timeline: '15-20 days (physical) · Instant (e-PAN)',
    fee: '₹107 (physical) · ₹72 (e-PAN) · Free (instant e-PAN via IT portal)',
    officialLink: 'https://tin.tin.nsdl.com',
    ministry: 'Income Tax Department – Ministry of Finance',
    documents: [
      { name: 'Proof of Identity', examples: 'Aadhaar, Voter ID, Passport, Driving License' },
      { name: 'Proof of Address', examples: 'Aadhaar, Electricity bill, Bank statement' },
      { name: 'Proof of Date of Birth', examples: 'Birth certificate, Marksheet, Aadhaar' },
    ],
    process: [
      { step: 1, title: 'Choose Portal', desc: 'NSDL (tin.tin.nsdl.com) or UTIITSL (utiitsl.com)' },
      { step: 2, title: 'Fill Form 49A', desc: 'For Indian citizens; Form 49AA for foreigners' },
      { step: 3, title: 'Upload Documents', desc: 'Upload scanned identity and address proof' },
      { step: 4, title: 'Pay Fee', desc: 'Pay ₹107 online for physical PAN card' },
      { step: 5, title: 'Submit & Track', desc: 'Submit form and track with acknowledgement number' },
    ],
    faqs: [
      { q: 'Can I get instant PAN?', a: 'Yes, via Income Tax Portal using Aadhaar. Completely free and instant.' },
      { q: 'Can I have two PAN cards?', a: 'No. Having two PAN cards is illegal. Surrender the extra one.' },
      { q: 'Is PAN mandatory for bank accounts?', a: 'Required for transactions above ₹50,000 and many financial activities.' },
    ],
  },
};

// Default fallback for unspecified services
const getServiceData = (id) => {
  if (SERVICE_DATA[id]) return SERVICE_DATA[id];
  return {
    id, icon: '📋', name: id.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase()),
    category: 'Government Service', color: '#2563EB',
    description: 'This government service helps citizens access essential civic benefits and documentation.',
    eligibility: 'All eligible Indian citizens',
    timeline: '7-30 working days', fee: 'Varies by state',
    officialLink: 'https://india.gov.in', ministry: 'Government of India',
    documents: [
      { name: 'Identity Proof', examples: 'Aadhaar, Voter ID, PAN' },
      { name: 'Address Proof', examples: 'Aadhaar, Electricity bill' },
      { name: 'Application Form', examples: 'Filled and signed form' },
    ],
    process: [
      { step: 1, title: 'Visit Office', desc: 'Visit the relevant government office or online portal' },
      { step: 2, title: 'Fill Application', desc: 'Complete the application form with required details' },
      { step: 3, title: 'Submit Documents', desc: 'Submit self-attested photocopies of required documents' },
      { step: 4, title: 'Pay Fee', desc: 'Pay applicable fees at the counter or online' },
      { step: 5, title: 'Receive Certificate', desc: 'Collect certificate within the stipulated timeline' },
    ],
    faqs: [
      { q: 'How to check application status?', a: 'Visit the official portal and use your application number to track.' },
      { q: 'Can I apply online?', a: 'Many services are now available on the respective state e-governance portals.' },
    ],
  };
};

export default function ServiceDetail() {
  const { id } = useParams();
  const service = getServiceData(id);
  const [activeFaq, setActiveFaq] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');

  const tabs = ['overview', 'documents', 'process', 'faqs'];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="p-6 max-w-4xl mx-auto"
    >
      {/* Back button */}
      <Link to="/services">
        <motion.button
          whileHover={{ x: -4 }}
          className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-6 text-sm"
        >
          <ArrowLeft size={16} /> Back to Services
        </motion.button>
      </Link>

      {/* Hero Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card p-8 mb-6 relative overflow-hidden"
      >
        <div
          className="absolute top-0 right-0 w-64 h-64 rounded-full opacity-10 blur-3xl"
          style={{ background: service.color, transform: 'translate(30%, -30%)' }}
        />
        <div className="flex flex-col md:flex-row md:items-center gap-6">
          <div
            className="w-20 h-20 rounded-3xl flex items-center justify-center text-4xl flex-shrink-0"
            style={{ background: `${service.color}15`, border: `2px solid ${service.color}25` }}
          >
            {service.icon}
          </div>
          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-3 mb-2">
              <span className="badge badge-primary">{service.category}</span>
              <span className="text-slate-500 text-sm">{service.ministry}</span>
            </div>
            <h1 className="font-display font-bold text-3xl text-white mb-2">{service.name}</h1>
            <p className="text-slate-400 leading-relaxed">{service.description}</p>
          </div>
        </div>

        {/* Quick stats */}
        <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-white/08">
          <div>
            <div className="flex items-center gap-2 text-slate-500 text-xs mb-1">
              <Clock size={12} /> Timeline
            </div>
            <div className="text-white font-medium text-sm">{service.timeline}</div>
          </div>
          <div>
            <div className="flex items-center gap-2 text-slate-500 text-xs mb-1">
              <DollarSign size={12} /> Fee
            </div>
            <div className="text-white font-medium text-sm">{service.fee}</div>
          </div>
          <div>
            <div className="flex items-center gap-2 text-slate-500 text-xs mb-1">
              <Users size={12} /> Eligibility
            </div>
            <div className="text-white font-medium text-sm">{service.eligibility}</div>
          </div>
        </div>
      </motion.div>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-3 mb-6">
        <a href={service.officialLink} target="_blank" rel="noopener noreferrer">
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="btn-primary flex items-center gap-2 py-2.5 text-sm"
          >
            Apply Online <ExternalLink size={14} />
          </motion.button>
        </a>
        <Link to="/chatbot">
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="btn-ghost flex items-center gap-2 py-2.5 text-sm"
          >
            <MessageSquare size={14} /> Ask AI Assistant
          </motion.button>
        </Link>
        <Link to="/documents">
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="btn-ghost flex items-center gap-2 py-2.5 text-sm"
          >
            <FileText size={14} /> Document Checklist
          </motion.button>
        </Link>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 glass rounded-2xl p-1 mb-6 w-fit">
        {tabs.map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-xl text-sm font-medium capitalize transition-all ${
              activeTab === tab
                ? 'bg-primary-600 text-white'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
        >
          {activeTab === 'overview' && (
            <div className="glass-card p-6">
              <h2 className="font-semibold text-white text-lg mb-4">About This Service</h2>
              <p className="text-slate-400 leading-relaxed mb-4">{service.description}</p>
              <div className="p-4 rounded-xl" style={{ background: `${service.color}10`, border: `1px solid ${service.color}20` }}>
                <h3 className="font-medium mb-2" style={{ color: service.color }}>Eligibility</h3>
                <p className="text-slate-300 text-sm">{service.eligibility}</p>
              </div>
            </div>
          )}

          {activeTab === 'documents' && (
            <div className="glass-card p-6">
              <h2 className="font-semibold text-white text-lg mb-4">Required Documents</h2>
              <div className="space-y-3">
                {service.documents.map((doc, i) => (
                  <motion.div
                    key={doc.name}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="flex gap-4 p-4 rounded-xl bg-white/[0.03] border border-white/08"
                  >
                    <CheckCircle size={18} className="text-success flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="text-white font-medium text-sm mb-1">{doc.name}</div>
                      <div className="text-slate-400 text-xs">{doc.examples}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'process' && (
            <div className="glass-card p-6">
              <h2 className="font-semibold text-white text-lg mb-6">Application Process</h2>
              <div className="space-y-4">
                {service.process.map((step, i) => (
                  <motion.div
                    key={step.step}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="flex gap-4"
                  >
                    <div className="flex flex-col items-center">
                      <div
                        className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold text-white flex-shrink-0"
                        style={{ background: service.color }}
                      >
                        {step.step}
                      </div>
                      {i < service.process.length - 1 && (
                        <div className="w-0.5 flex-1 mt-2" style={{ background: `${service.color}30` }} />
                      )}
                    </div>
                    <div className="pb-4 flex-1">
                      <div className="font-medium text-white text-sm mb-1">{step.title}</div>
                      <div className="text-slate-400 text-sm">{step.desc}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'faqs' && (
            <div className="glass-card p-6">
              <h2 className="font-semibold text-white text-lg mb-4">Frequently Asked Questions</h2>
              <div className="space-y-2">
                {service.faqs.map((faq, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="rounded-xl overflow-hidden border border-white/08"
                  >
                    <button
                      onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                      className="w-full flex items-center justify-between p-4 text-left hover:bg-white/05 transition-all"
                    >
                      <span className="text-white font-medium text-sm">{faq.q}</span>
                      <ChevronDown
                        size={16}
                        className={`text-slate-400 transition-transform flex-shrink-0 ml-3 ${activeFaq === i ? 'rotate-180' : ''}`}
                      />
                    </button>
                    <AnimatePresence>
                      {activeFaq === i && (
                        <motion.div
                          initial={{ height: 0 }}
                          animate={{ height: 'auto' }}
                          exit={{ height: 0 }}
                          className="overflow-hidden"
                        >
                          <div className="px-4 pb-4 text-slate-400 text-sm">{faq.a}</div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
}
