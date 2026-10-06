import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronLeft, Sparkles, Check, ExternalLink, Save, RotateCcw } from 'lucide-react';
import { analyzeSchemeEligibility } from '../services/geminiService';
import toast from 'react-hot-toast';

const STEPS = [
  { id: 'basic', title: 'Basic Info', icon: '👤' },
  { id: 'financial', title: 'Financial', icon: '💰' },
  { id: 'category', title: 'Category', icon: '🏷️' },
  { id: 'results', title: 'Schemes', icon: '🎯' },
];

const STATES = [
  'Andhra Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 'Delhi', 'Goa', 'Gujarat', 'Haryana',
  'Himachal Pradesh', 'Jharkhand', 'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra',
  'Odisha', 'Punjab', 'Rajasthan', 'Tamil Nadu', 'Telangana', 'Uttar Pradesh', 'West Bengal',
];

function SchemeCard({ scheme, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.5, delay, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -6 }}
      className="glass-card p-6 relative overflow-hidden"
    >
      <div
        className="absolute top-0 right-0 w-40 h-40 rounded-full opacity-10 blur-2xl"
        style={{ background: scheme.color, transform: 'translate(30%, -30%)' }}
      />

      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="text-3xl">{scheme.icon}</div>
          <div>
            <h3 className="font-semibold text-white text-[15px]">{scheme.name}</h3>
            <span className="text-xs" style={{ color: scheme.color }}>{scheme.ministry}</span>
          </div>
        </div>
        <div className="text-right">
          <div className="text-sm font-bold" style={{ color: scheme.color }}>{scheme.match}%</div>
          <div className="text-xs text-slate-500">match</div>
        </div>
      </div>

      {/* Match bar */}
      <div className="progress-bar mb-3">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${scheme.match}%` }}
          transition={{ duration: 1, delay: delay + 0.3 }}
          className="progress-fill"
          style={{ background: `linear-gradient(90deg, ${scheme.color}, ${scheme.color}99)` }}
        />
      </div>

      <div className="badge badge-success mb-3 text-xs">{scheme.eligibility}</div>

      <div className="mb-3">
        <div className="text-xs text-slate-500 mb-1">Benefit</div>
        <div className="text-white text-sm font-medium">{scheme.benefit}</div>
      </div>

      <p className="text-slate-400 text-xs leading-relaxed mb-4">{scheme.description}</p>

      <div className="mb-4">
        <div className="text-xs text-slate-500 mb-2">Documents Needed:</div>
        <div className="flex flex-wrap gap-1">
          {scheme.documents.map(doc => (
            <span key={doc} className="text-xs px-2 py-1 rounded-lg bg-white/[0.05] text-slate-300 border border-white/08">
              {doc}
            </span>
          ))}
        </div>
      </div>

      <a href={scheme.link} target="_blank" rel="noopener noreferrer">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full py-2.5 rounded-xl text-sm font-semibold flex items-center justify-center gap-2"
          style={{ background: `${scheme.color}15`, color: scheme.color, border: `1px solid ${scheme.color}25` }}
        >
          Apply Now <ExternalLink size={13} />
        </motion.button>
      </a>
    </motion.div>
  );
}

export default function SchemeFinder() {
  const [step, setStep] = useState(0);
  const [profile, setProfile] = useState({
    age: '', gender: 'Male', income: '', occupation: 'Salaried',
    education: 'Graduate', state: 'Telangana', disability: false,
    isFarmer: false, isStudent: false, isSeniorCitizen: false, hasDisability: false,
  });
  const [schemes, setSchemes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [analyzed, setAnalyzed] = useState(false);

  const update = (key, value) => setProfile(p => ({ ...p, [key]: value }));

  const analyze = async () => {
    setLoading(true);
    setStep(3);
    try {
      const results = await analyzeSchemeEligibility(profile);
      setSchemes(results);
      setAnalyzed(true);
      if (results.length > 0) {
        toast.success(`🎉 Found ${results.length} schemes you may be eligible for!`);
      }
    } catch {
      toast.error('Analysis failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setStep(0);
    setSchemes([]);
    setAnalyzed(false);
    setProfile({ age: '', gender: 'Male', income: '', occupation: 'Salaried', education: 'Graduate', state: 'Telangana', isFarmer: false, isStudent: false, isSeniorCitizen: false, hasDisability: false });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="p-6 min-h-full max-w-4xl mx-auto"
    >
      {/* Header */}
      <div className="mb-8">
        <span className="badge badge-success mb-3">AI Powered</span>
        <h1 className="font-display font-bold text-3xl md:text-4xl text-white mb-2">
          AI Scheme <span className="gradient-text">Finder</span>
        </h1>
        <p className="text-slate-400">Tell us about yourself and our AI will find all government schemes you're eligible for</p>
      </div>

      {/* Progress Steps */}
      <div className="flex items-center mb-8">
        {STEPS.map((s, i) => (
          <React.Fragment key={s.id}>
            <div className="flex flex-col items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center text-lg transition-all duration-300 ${
                  i <= step
                    ? 'bg-gradient-to-br from-primary-600 to-accent text-white shadow-lg'
                    : 'bg-white/[0.05] text-slate-500 border border-white/10'
                }`}
              >
                {i < step ? <Check size={16} /> : s.icon}
              </div>
              <span className={`text-xs mt-1.5 font-medium ${i <= step ? 'text-white' : 'text-slate-500'}`}>
                {s.title}
              </span>
            </div>
            {i < STEPS.length - 1 && (
              <div className={`flex-1 h-0.5 mx-2 transition-all duration-500 ${i < step ? 'bg-primary-600' : 'bg-white/10'}`} />
            )}
          </React.Fragment>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {/* Step 0: Basic Info */}
        {step === 0 && (
          <motion.div
            key="step0"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            className="glass-card p-6"
          >
            <h2 className="font-semibold text-white text-xl mb-6">Basic Information</h2>
            <div className="grid md:grid-cols-2 gap-5">
              <div>
                <label className="text-sm text-slate-400 mb-2 block">Age *</label>
                <input type="number" min="1" max="120"
                  value={profile.age} onChange={e => update('age', e.target.value)}
                  placeholder="Your age" className="input-glass" />
              </div>
              <div>
                <label className="text-sm text-slate-400 mb-2 block">Gender *</label>
                <select value={profile.gender} onChange={e => update('gender', e.target.value)}
                  className="input-glass">
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div>
                <label className="text-sm text-slate-400 mb-2 block">State of Residence *</label>
                <select value={profile.state} onChange={e => update('state', e.target.value)}
                  className="input-glass">
                  {STATES.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
              <div>
                <label className="text-sm text-slate-400 mb-2 block">Education</label>
                <select value={profile.education} onChange={e => update('education', e.target.value)}
                  className="input-glass">
                  {['No Formal Education', 'Primary', 'Secondary', 'Diploma', 'Graduate', 'Post Graduate'].map(e => (
                    <option key={e} value={e}>{e}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="flex justify-end mt-6">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => profile.age ? setStep(1) : toast.error('Please enter your age')}
                className="btn-primary flex items-center gap-2"
              >
                Next <ChevronRight size={16} />
              </motion.button>
            </div>
          </motion.div>
        )}

        {/* Step 1: Financial */}
        {step === 1 && (
          <motion.div
            key="step1"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            className="glass-card p-6"
          >
            <h2 className="font-semibold text-white text-xl mb-6">Financial Information</h2>
            <div className="grid md:grid-cols-2 gap-5">
              <div>
                <label className="text-sm text-slate-400 mb-2 block">Annual Family Income (₹)</label>
                <input type="number"
                  value={profile.income} onChange={e => update('income', e.target.value)}
                  placeholder="e.g. 250000" className="input-glass" />
              </div>
              <div>
                <label className="text-sm text-slate-400 mb-2 block">Occupation</label>
                <select value={profile.occupation} onChange={e => update('occupation', e.target.value)}
                  className="input-glass">
                  {['Salaried', 'Self-Employed', 'Farmer', 'Student', 'Unemployed', 'Retired', 'Daily Wage Worker'].map(o => (
                    <option key={o} value={o}>{o}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="flex justify-between mt-6">
              <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                onClick={() => setStep(0)} className="btn-ghost flex items-center gap-2">
                <ChevronLeft size={16} /> Back
              </motion.button>
              <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                onClick={() => setStep(2)} className="btn-primary flex items-center gap-2">
                Next <ChevronRight size={16} />
              </motion.button>
            </div>
          </motion.div>
        )}

        {/* Step 2: Category */}
        {step === 2 && (
          <motion.div
            key="step2"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            className="glass-card p-6"
          >
            <h2 className="font-semibold text-white text-xl mb-6">Your Category</h2>
            <p className="text-slate-400 text-sm mb-6">Select all that apply to you:</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                { key: 'isFarmer', label: 'Farmer', icon: '🌾', desc: 'Own or cultivate agricultural land' },
                { key: 'isStudent', label: 'Student', icon: '📚', desc: 'Currently enrolled in education' },
                { key: 'isSeniorCitizen', label: 'Senior Citizen', icon: '👴', desc: '60 years or above' },
                { key: 'hasDisability', label: 'Person with Disability', icon: '♿', desc: 'Physically/mentally challenged' },
              ].map(cat => (
                <motion.button
                  key={cat.key}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => update(cat.key, !profile[cat.key])}
                  className={`p-4 rounded-2xl border transition-all text-left ${
                    profile[cat.key]
                      ? 'bg-primary-600/20 border-primary-500/40 text-white'
                      : 'bg-white/[0.03] border-white/10 text-slate-400 hover:border-white/20'
                  }`}
                >
                  <div className="text-2xl mb-2">{cat.icon}</div>
                  <div className="font-medium text-sm mb-1">{cat.label}</div>
                  <div className="text-xs opacity-60">{cat.desc}</div>
                  {profile[cat.key] && (
                    <div className="mt-2">
                      <Check size={14} className="text-accent" />
                    </div>
                  )}
                </motion.button>
              ))}
            </div>
            <div className="flex justify-between mt-6">
              <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                onClick={() => setStep(1)} className="btn-ghost flex items-center gap-2">
                <ChevronLeft size={16} /> Back
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={analyze}
                disabled={loading}
                className="btn-primary flex items-center gap-2"
                style={{ background: 'linear-gradient(135deg, #22C55E, #16a34a)', boxShadow: '0 8px 25px rgba(34,197,94,0.3)' }}
              >
                <Sparkles size={16} />
                Find My Schemes
              </motion.button>
            </div>
          </motion.div>
        )}

        {/* Step 3: Results */}
        {step === 3 && (
          <motion.div key="step3" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            {loading ? (
              <div className="text-center py-20">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
                  className="w-16 h-16 rounded-full border-2 border-primary-500/30 border-t-primary-500 mx-auto mb-6"
                />
                <h3 className="font-semibold text-white text-xl mb-2">Analyzing Your Profile</h3>
                <p className="text-slate-400 text-sm">AI is searching 3,500+ schemes for your eligibility...</p>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="font-display font-bold text-2xl text-white">
                      {schemes.length > 0 ? `Found ${schemes.length} Eligible Schemes! 🎉` : 'No Matching Schemes Found'}
                    </h2>
                    <p className="text-slate-400 text-sm mt-1">Based on your profile analysis</p>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    onClick={reset}
                    className="btn-ghost flex items-center gap-2 text-sm py-2"
                  >
                    <RotateCcw size={14} /> Retake
                  </motion.button>
                </div>

                {schemes.length === 0 && (
                  <div className="glass-card p-10 text-center">
                    <div className="text-5xl mb-4">🔍</div>
                    <p className="text-slate-400">Based on your profile, no specific schemes were matched. Try adjusting your income or category selections.</p>
                  </div>
                )}

                <div className="grid md:grid-cols-2 gap-5">
                  {schemes.map((scheme, i) => (
                    <SchemeCard key={scheme.name} scheme={scheme} delay={i * 0.1} />
                  ))}
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
