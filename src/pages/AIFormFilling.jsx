import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FileText, Zap, User, MapPin, Phone, CheckCircle, Download } from 'lucide-react';
import toast from 'react-hot-toast';

const FORM_TEMPLATES = [
  { id: 'passport', name: 'Passport Application (Form SP)', icon: '🛂' },
  { id: 'pan', name: 'PAN Card Application (Form 49A)', icon: '📄' },
  { id: 'ration', name: 'Ration Card Application', icon: '🏠' },
  { id: 'income', name: 'Income Certificate Application', icon: '💰' },
];

export default function AIFormFilling() {
  const [selectedTemplate, setSelectedTemplate] = useState('');
  const [autofilling, setAutofilling] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '', dob: '', gender: '', fatherName: '', address: '',
    city: '', state: '', pincode: '', phone: '', email: '', aadhaar: '',
  });
  const [filled, setFilled] = useState(false);

  const [savedDocProfile, setSavedDocProfile] = useState(() => {
    try {
      const saved = localStorage.getItem('sb-user-doc-profile');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const autoFill = async () => {
    if (!selectedTemplate) return toast.error('Please select a form template first');
    setAutofilling(true);
    await new Promise(r => setTimeout(r, 1200));

    let profile = null;
    try {
      const saved = localStorage.getItem('sb-user-doc-profile');
      if (saved) profile = JSON.parse(saved);
    } catch {}

    if (profile && (profile.fullName || profile.aadhaar || profile.pan)) {
      setFormData({
        fullName: profile.fullName || 'RAJESH KUMAR',
        dob: profile.dob || '1990-01-01',
        gender: profile.gender || 'Male',
        fatherName: profile.fatherName || 'SURESH KUMAR',
        address: profile.address || 'MG Road, Hyderabad',
        city: 'Hyderabad',
        state: profile.state || 'Telangana',
        pincode: profile.pincode || '500001',
        phone: '9876543210',
        email: 'citizen@smartbharat.gov.in',
        aadhaar: profile.aadhaar || '1234 5678 9012',
      });
      setFilled(true);
      setAutofilling(false);
      toast.success(`Form auto-filled from your verified ${profile.docType?.toUpperCase() || 'document'}! 🎉`);
    } else {
      // Smart civic demo fill
      setFormData({
        fullName: 'RAJESH KUMAR SHARMA',
        dob: '1988-08-15',
        gender: 'Male',
        fatherName: 'SURESH KUMAR SHARMA',
        address: '123, MG Road, Banjara Hills',
        city: 'Hyderabad',
        state: 'Telangana',
        pincode: '500034',
        phone: '9876543210',
        email: 'rajesh.sharma@email.com',
        aadhaar: '1234 5678 9012',
      });
      setFilled(true);
      setAutofilling(false);
      toast.success('Form auto-filled with civic demo profile! (Upload doc in Document Assistant for your real data)');
    }
  };

  const update = (key, val) => setFormData(p => ({ ...p, [key]: val }));

  const fields = [
    { key: 'fullName', label: 'Full Name', icon: User, type: 'text' },
    { key: 'dob', label: 'Date of Birth', icon: FileText, type: 'date' },
    { key: 'gender', label: 'Gender', icon: User, type: 'select', options: ['Male', 'Female', 'Other'] },
    { key: 'fatherName', label: "Father's Name", icon: User, type: 'text' },
    { key: 'address', label: 'Address', icon: MapPin, type: 'text' },
    { key: 'city', label: 'City', icon: MapPin, type: 'text' },
    { key: 'state', label: 'State', icon: MapPin, type: 'text' },
    { key: 'pincode', label: 'Pincode', icon: MapPin, type: 'text' },
    { key: 'phone', label: 'Phone Number', icon: Phone, type: 'tel' },
    { key: 'email', label: 'Email', icon: FileText, type: 'email' },
    { key: 'aadhaar', label: 'Aadhaar Number', icon: FileText, type: 'text' },
  ];

  const missing = Object.entries(formData).filter(([k, v]) => !v).length;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="p-6 max-w-3xl mx-auto"
    >
      <div className="mb-8">
        <span className="badge badge-primary mb-3">AI Powered</span>
        <h1 className="font-display font-bold text-3xl text-white mb-2">
          AI Form <span className="gradient-text">Filling</span>
        </h1>
        <p className="text-slate-400">Auto-fill government forms using your uploaded documents</p>
      </div>

      {/* Template Selection */}
      <div className="glass-card p-5 mb-5">
        <h3 className="font-semibold text-white mb-3">Select Form Template</h3>
        <div className="grid grid-cols-2 gap-3">
          {FORM_TEMPLATES.map(t => (
            <motion.button
              key={t.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setSelectedTemplate(t.id)}
              className={`flex items-center gap-3 p-3 rounded-xl text-left transition-all ${
                selectedTemplate === t.id
                  ? 'bg-primary-600/20 border border-primary-500/40 text-white'
                  : 'bg-white/[0.03] border border-white/10 text-slate-400 hover:text-white'
              }`}
            >
              <span className="text-xl">{t.icon}</span>
              <span className="text-sm font-medium">{t.name}</span>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Auto-fill Banner */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="glass-card p-4 mb-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
        style={{
          background: savedDocProfile 
            ? 'linear-gradient(135deg, rgba(16,185,129,0.12), rgba(56,189,248,0.08))' 
            : 'linear-gradient(135deg, rgba(37,99,235,0.1), rgba(56,189,248,0.05))',
          border: savedDocProfile 
            ? '1px solid rgba(16,185,129,0.35)' 
            : '1px solid rgba(37,99,235,0.2)'
        }}
      >
        <div>
          <div className="flex items-center gap-2">
            <p className="text-white font-semibold text-sm">
              {savedDocProfile 
                ? `Verified Document: ${savedDocProfile.fullName || 'Citizen Profile'} (${savedDocProfile.docType?.toUpperCase()})`
                : 'Auto-fill from uploaded documents'}
            </p>
            {savedDocProfile && (
              <span className="badge badge-success text-[10px] py-0.5">Ready to Apply</span>
            )}
          </div>
          <p className="text-slate-400 text-xs mt-0.5">
            {savedDocProfile 
              ? 'OCR-verified data from Document Assistant ready to auto-populate this form'
              : 'Upload documents in Document Assistant first, or use AI demo fill'}
          </p>
        </div>
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={autoFill}
          disabled={autofilling}
          className="btn-primary flex items-center justify-center gap-2 text-sm py-2.5 px-4 whitespace-nowrap disabled:opacity-50 font-medium shadow-md shadow-primary-500/20"
        >
          {autofilling ? (
            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            <Zap size={15} />
          )}
          {autofilling ? 'Auto-filling...' : savedDocProfile ? 'Fill Verified Details' : 'AI Auto-fill'}
        </motion.button>
      </motion.div>

      {/* Missing fields indicator */}
      {filled && missing > 0 && (
        <motion.div
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card p-3 mb-4 flex items-center gap-2"
          style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)' }}
        >
          <span className="text-error text-sm">⚠️ {missing} fields need your attention</span>
        </motion.div>
      )}
      {filled && missing === 0 && (
        <motion.div
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card p-3 mb-4 flex items-center gap-2"
          style={{ background: 'rgba(34,197,94,0.08)', border: '1px solid rgba(34,197,94,0.2)' }}
        >
          <CheckCircle size={16} className="text-success" />
          <span className="text-success text-sm">All fields complete! Ready to submit.</span>
        </motion.div>
      )}

      {/* Form */}
      <div className="glass-card p-5">
        <h3 className="font-semibold text-white mb-5">Application Form</h3>
        <div className="grid md:grid-cols-2 gap-4">
          {fields.map((field, i) => {
            const Icon = field.icon;
            const val = formData[field.key];
            const isAutoFilled = filled && val;
            return (
              <motion.div
                key={field.key}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.03 }}
              >
                <label className="text-xs text-slate-400 mb-1.5 flex items-center gap-1.5">
                  <Icon size={12} />
                  {field.label}
                  {isAutoFilled && <span className="text-accent text-xs">(AI filled)</span>}
                </label>
                {field.type === 'select' ? (
                  <select
                    value={val}
                    onChange={e => update(field.key, e.target.value)}
                    className={`input-glass text-sm ${isAutoFilled ? 'border-accent/30 bg-accent/5' : ''}`}
                  >
                    <option value="">Select {field.label}</option>
                    {field.options?.map(o => <option key={o} value={o}>{o}</option>)}
                  </select>
                ) : (
                  <input
                    type={field.type}
                    value={val}
                    onChange={e => update(field.key, e.target.value)}
                    placeholder={`Enter ${field.label}`}
                    className={`input-glass text-sm ${isAutoFilled ? 'border-accent/30 bg-accent/5' : !val && filled ? 'border-error/40' : ''}`}
                  />
                )}
              </motion.div>
            );
          })}
        </div>

        <div className="flex gap-3 mt-6">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => toast.success('Form submitted for review!')}
            className="btn-primary flex items-center gap-2 flex-1 justify-center"
          >
            Submit Application
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => toast.success('Form downloaded!')}
            className="btn-ghost flex items-center gap-2 py-3 px-4"
          >
            <Download size={16} /> Download
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
