import React from 'react';
import { motion } from 'framer-motion';
import { Phone } from 'lucide-react';

const EMERGENCY_NUMBERS = [
  { id: 1, name: 'Police', number: '100', icon: '👮', color: '#2563EB', bgColor: 'rgba(37,99,235,0.15)', desc: 'Report crimes, emergencies, missing persons' },
  { id: 2, name: 'Ambulance', number: '108', icon: '🚑', color: '#EF4444', bgColor: 'rgba(239,68,68,0.15)', desc: 'Medical emergency, accident, critical illness' },
  { id: 3, name: 'Fire Brigade', number: '101', icon: '🚒', color: '#F97316', bgColor: 'rgba(249,115,22,0.15)', desc: 'Fire incidents, rescue operations' },
  { id: 4, name: 'Women Helpline', number: '1091', icon: '👩', color: '#EC4899', bgColor: 'rgba(236,72,153,0.15)', desc: 'Safety, violence, harassment against women' },
  { id: 5, name: 'Child Helpline', number: '1098', icon: '👶', color: '#22C55E', bgColor: 'rgba(34,197,94,0.15)', desc: 'Child abuse, missing children, trafficking' },
  { id: 6, name: 'Disaster Management', number: '1070', icon: '🆘', color: '#F59E0B', bgColor: 'rgba(245,158,11,0.15)', desc: 'Natural disasters, floods, earthquakes' },
  { id: 7, name: 'Senior Citizen', number: '14567', icon: '👴', color: '#8B5CF6', bgColor: 'rgba(139,92,246,0.15)', desc: 'Elder abuse, medical emergencies for seniors' },
  { id: 8, name: 'Anti-Corruption', number: '1064', icon: '⚖️', color: '#38BDF8', bgColor: 'rgba(56,189,248,0.15)', desc: 'Report corruption, bribery by officials' },
  { id: 9, name: 'National Emergency', number: '112', icon: '🆘', color: '#EF4444', bgColor: 'rgba(239,68,68,0.2)', desc: 'Single emergency number for all services', priority: true },
];

export default function Emergency() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="p-6 max-w-4xl mx-auto"
    >
      {/* Header */}
      <div className="mb-8 text-center">
        <motion.div
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-6xl mb-4"
        >
          🆘
        </motion.div>
        <h1 className="font-display font-bold text-3xl text-white mb-2">
          Emergency <span className="gradient-text">Services</span>
        </h1>
        <p className="text-slate-400">One-tap access to all emergency helplines in India</p>
      </div>

      {/* National Emergency Number */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1 }}
        className="glass-card p-6 mb-6 text-center relative overflow-hidden"
        style={{ border: '1px solid rgba(239,68,68,0.3)', background: 'rgba(239,68,68,0.06)' }}
      >
        <div className="absolute inset-0 opacity-10"
          style={{ background: 'radial-gradient(ellipse at center, #EF4444, transparent 70%)' }} />
        <div className="relative">
          <div className="text-slate-400 text-sm mb-2">National Emergency Number</div>
          <div className="font-display font-bold text-7xl text-white mb-2">112</div>
          <div className="text-slate-400 text-sm mb-4">Works for Police · Ambulance · Fire · All emergencies</div>
          <a href="tel:112">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 rounded-2xl font-bold text-white text-lg flex items-center gap-2 mx-auto"
              style={{ background: 'linear-gradient(135deg, #EF4444, #DC2626)', boxShadow: '0 15px 40px rgba(239,68,68,0.4)' }}
            >
              <Phone size={22} /> Call 112 Now
            </motion.button>
          </a>
        </div>
      </motion.div>

      {/* Emergency Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {EMERGENCY_NUMBERS.filter(n => n.number !== '112').map((service, i) => (
          <motion.div
            key={service.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + i * 0.05, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ y: -4, scale: 1.02 }}
            className="glass-card p-5 cursor-pointer group relative overflow-hidden"
          >
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{ background: `radial-gradient(circle at top left, ${service.color}10, transparent)` }}
            />
            <div className="text-3xl mb-3">{service.icon}</div>
            <h3 className="font-semibold text-white mb-1">{service.name}</h3>
            <p className="text-slate-400 text-xs mb-3 leading-relaxed">{service.desc}</p>
            
            <a href={`tel:${service.number}`} className="block w-full">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-2.5 rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition-all"
                style={{ background: service.bgColor, color: service.color, border: `1px solid ${service.color}30` }}
              >
                <Phone size={16} />
                {service.number}
              </motion.button>
            </a>
          </motion.div>
        ))}
      </div>

      {/* Important Notice */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mt-6 glass-card p-4 text-center"
        style={{ background: 'rgba(245,158,11,0.05)', border: '1px solid rgba(245,158,11,0.15)' }}
      >
        <p className="text-warning text-sm font-medium mb-1">⚠️ Important Notice</p>
        <p className="text-slate-400 text-xs">
          These are genuine government emergency numbers. Please only call in real emergencies. 
          Misuse of emergency numbers is a criminal offense.
        </p>
      </motion.div>
    </motion.div>
  );
}
