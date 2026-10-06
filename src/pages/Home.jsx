import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { 
  MessageSquare, ArrowRight, Star, ChevronRight, Shield,
  Zap, Users, CheckCircle, TrendingUp, Award, Play,
  FileText, Search, Map, Phone, Mic, LogIn
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';

// ===== ANIMATED COUNTER =====
function AnimatedCounter({ target, suffix = '', prefix = '' }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const end = parseInt(target.toString().replace(/,/g, ''));
    const duration = 2000;
    const step = end / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= end) { setCount(end); clearInterval(timer); }
      else { setCount(Math.floor(start)); }
    }, 16);
    return () => clearInterval(timer);
  }, [inView, target]);

  return <span ref={ref}>{prefix}{count.toLocaleString('en-IN')}{suffix}</span>;
}

// ===== FEATURE CARD =====
function FeatureCard({ icon: Icon, title, description, color, link, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -8, scale: 1.02 }}
      className="glass-card p-6 group cursor-pointer relative overflow-hidden"
    >
      <div 
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl"
        style={{ background: `radial-gradient(circle at top left, ${color}10, transparent 60%)` }}
      />
      <div 
        className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110 duration-300"
        style={{ background: `${color}20`, border: `1px solid ${color}30` }}
      >
        <Icon size={22} style={{ color }} />
      </div>
      <h3 className="font-semibold text-white mb-2 text-[15px]">{title}</h3>
      <p className="text-slate-400 text-sm leading-relaxed">{description}</p>
      <Link to={link} className="flex items-center gap-1 mt-4 text-sm font-medium transition-all group-hover:gap-2"
        style={{ color }}>
        Learn more <ArrowRight size={14} />
      </Link>
    </motion.div>
  );
}

// ===== ANNOUNCEMENT CARD =====
function AnnouncementCard({ title, description, date, category, icon, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ x: 4 }}
      className="glass-card p-4 flex gap-4 items-start cursor-pointer group"
    >
      <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary-600/20 to-accent/20 flex items-center justify-center text-2xl flex-shrink-0 group-hover:scale-110 transition-transform">
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1 flex-wrap">
          <span className="badge badge-primary text-xs">{category}</span>
          <span className="text-slate-500 text-xs">{date}</span>
        </div>
        <h4 className="font-medium text-white text-sm mb-1 group-hover:text-accent transition-colors">{title}</h4>
        <p className="text-slate-400 text-xs leading-relaxed truncate">{description}</p>
      </div>
    </motion.div>
  );
}

export default function Home() {
  const { t } = useLanguage();
  const { user } = useAuth();
  const { theme } = useTheme();
  const navigate = useNavigate();
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 600], [0, -200]);
  const heroOpacity = useTransform(scrollY, [0, 400], [1, 0]);

  // Ref for smooth scroll to features section
  const featuresRef = useRef(null);

  const handleGetStarted = () => {
    if (user) {
      navigate('/dashboard');
    } else {
      navigate('/login');
    }
  };

  const handleExploreServices = (e) => {
    e.preventDefault();
    featuresRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const features = [
    { icon: MessageSquare, title: t('feat_ai_title'), description: t('feat_ai_desc'), color: '#8B5CF6', link: '/chatbot', delay: 0 },
    { icon: Search, title: t('feat_scheme_title'), description: t('feat_scheme_desc'), color: '#22C55E', link: '/scheme-finder', delay: 0.1 },
    { icon: FileText, title: t('feat_doc_title'), description: t('feat_doc_desc'), color: '#F59E0B', link: '/documents', delay: 0.2 },
    { icon: Phone, title: t('emergency'), description: '24/7 National emergency helplines for Police, Ambulance, Fire, Women, and Child safety.', color: '#EF4444', link: '/emergency', delay: 0.3 },
    { icon: Map, title: t('feat_map_title'), description: t('feat_map_desc'), color: '#38BDF8', link: '/map', delay: 0.4 },
    { icon: Mic, title: t('feat_voice_title'), description: t('feat_voice_desc'), color: '#EC4899', link: '/voice-assistant', delay: 0.5 },
  ];

  const stats = [
    { label: t('stat_services'), value: '500', suffix: '+', icon: '🏛️', color: '#2563EB' },
    { label: t('stat_satisfaction'), value: '98', suffix: '%', icon: '⭐', color: '#F59E0B' },
    { label: t('stat_complaints'), value: '1200000', suffix: '+', icon: '✅', color: '#22C55E' },
    { label: t('stat_schemes'), value: '3500', suffix: '+', icon: '🎯', color: '#8B5CF6' },
  ];

  const announcements = [
    { title: 'PM Awas Yojana Urban 2.0 – New Registrations Open', description: 'Apply for affordable housing subsidy. Eligible families can get up to ₹2.67 lakh subsidy.', date: 'July 2024', category: 'Housing', icon: '🏠', delay: 0 },
    { title: 'Aadhaar Biometric Update – Free till December 2024', description: 'UIDAI announces free biometric update for citizens with Aadhaar older than 10 years.', date: 'June 2024', category: 'Identity', icon: '🪪', delay: 0.1 },
    { title: 'New PM Kisan 17th Instalment Released', description: '₹2,000 transferred to 9.3 crore farmers directly. Check status at PM-KISAN portal.', date: 'June 2024', category: 'Agriculture', icon: '🌾', delay: 0.2 },
    { title: 'DigiLocker Now Accepts 300+ Document Types', description: 'Digital wallet for government documents expanded with driving license auto-fetch.', date: 'May 2024', category: 'Digital India', icon: '📱', delay: 0.3 },
  ];

  const testimonials = [
    { name: 'Priya Sharma', location: 'Mumbai, Maharashtra', text: 'Smart Bharat AI helped me discover 4 schemes I was eligible for! The AI chatbot explained everything in Hindi. Amazing!', avatar: '👩', rating: 5 },
    { name: 'Raju Naidu', location: 'Hyderabad, Telangana', text: 'Filed a road damage complaint in minutes. Got resolved in 3 days! The tracking timeline is excellent.', avatar: '👨', rating: 5 },
    { name: 'Meena Krishnan', location: 'Chennai, Tamil Nadu', text: 'The voice assistant is incredible – works perfectly in Tamil. Like having a government officer available 24/7.', avatar: '👩', rating: 5 },
  ];

  return (
    <div className="min-h-screen overflow-hidden">
      {/* ===== HERO SECTION ===== */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Indian Government Tricolor & Flag ambient background */}
        <div className={`absolute inset-0 transition-colors duration-500 ${
          theme === 'light' ? 'bg-[#F8FAFC]' : 'bg-[#040916]'
        }`}>
          {/* High-res Indian Flag Backdrop */}
          <div 
            className={`absolute inset-0 bg-cover bg-no-repeat bg-fixed transition-opacity duration-500 ${
              theme === 'light' ? 'opacity-45' : 'opacity-25'
            }`}
            style={{ 
              backgroundImage: "url('/india-flag-bg.jpg')",
              backgroundPosition: 'center 30%',
            }}
          />

          {/* Top-left: Bhagwa / Indian Saffron aura */}
          <div className="blob w-[32rem] h-[32rem] -top-20 -left-10"
            style={{ 
              background: theme === 'light' 
                ? 'radial-gradient(circle, rgba(255,153,51,0.22), rgba(234,88,12,0.04), transparent 70%)'
                : 'radial-gradient(circle, rgba(255,153,51,0.22), rgba(234,88,12,0.06), transparent 70%)', 
              animationDelay: '0s' 
            }} />
          {/* Center-right: Ashoka Navy aura */}
          <div className="blob w-[36rem] h-[36rem] top-1/4 right-10"
            style={{ 
              background: theme === 'light'
                ? 'radial-gradient(circle, rgba(37,99,235,0.18), rgba(14,52,130,0.04), transparent 70%)'
                : 'radial-gradient(circle, rgba(37,99,235,0.22), rgba(14,52,130,0.08), transparent 70%)', 
              animationDelay: '3s' 
            }} />
          {/* Bottom-left: India Green aura */}
          <div className="blob w-[30rem] h-[30rem] -bottom-10 left-1/4"
            style={{ 
              background: theme === 'light'
                ? 'radial-gradient(circle, rgba(19,136,8,0.18), rgba(4,120,87,0.04), transparent 70%)'
                : 'radial-gradient(circle, rgba(19,136,8,0.20), rgba(4,120,87,0.05), transparent 70%)', 
              animationDelay: '5s' 
            }} />
          
          {/* Majestic Rotating Ashoka Chakra Circle Wheel */}
          <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none w-[560px] h-[560px] md:w-[660px] md:h-[660px] transition-opacity duration-500 ${
            theme === 'light' ? 'opacity-35' : 'opacity-[0.08]'
          }`}>
            <svg viewBox="0 0 100 100" className="w-full h-full animate-[spin_120s_linear_infinite]">
              <circle cx="50" cy="50" r="46" fill="none" stroke={theme === 'light' ? '#002B7F' : '#38BDF8'} strokeWidth="1.8" />
              <circle cx="50" cy="50" r="42" fill="none" stroke={theme === 'light' ? '#002B7F' : '#38BDF8'} strokeWidth="2.2" />
              <g stroke={theme === 'light' ? '#002B7F' : '#38BDF8'} strokeWidth="1.3">
                <line x1="50" y1="8" x2="50" y2="92" />
                <line x1="8" y1="50" x2="92" y2="50" />
                <line x1="50" y1="8" x2="50" y2="92" transform="rotate(15 50 50)" />
                <line x1="50" y1="8" x2="50" y2="92" transform="rotate(30 50 50)" />
                <line x1="50" y1="8" x2="50" y2="92" transform="rotate(45 50 50)" />
                <line x1="50" y1="8" x2="50" y2="92" transform="rotate(60 50 50)" />
                <line x1="50" y1="8" x2="50" y2="92" transform="rotate(75 50 50)" />
                <line x1="50" y1="8" x2="50" y2="92" transform="rotate(105 50 50)" />
                <line x1="50" y1="8" x2="50" y2="92" transform="rotate(120 50 50)" />
                <line x1="50" y1="8" x2="50" y2="92" transform="rotate(135 50 50)" />
                <line x1="50" y1="8" x2="50" y2="92" transform="rotate(150 50 50)" />
                <line x1="50" y1="8" x2="50" y2="92" transform="rotate(165 50 50)" />
              </g>
              <circle cx="50" cy="50" r="7.5" fill={theme === 'light' ? '#002B7F' : '#38BDF8'} />
              <circle cx="50" cy="50" r="2.8" fill={theme === 'light' ? '#FFFFFF' : '#040916'} />
            </svg>
          </div>

          {/* Balanced soft gradient overlay so text stays readable while flag & wheel remain visible */}
          <div 
            className="absolute inset-0 transition-all duration-500"
            style={{
              background: theme === 'light'
                ? 'radial-gradient(ellipse at 50% 50%, rgba(248, 250, 252, 0.40) 0%, rgba(248, 250, 252, 0.68) 60%, rgba(241, 245, 249, 0.88) 100%)'
                : 'radial-gradient(ellipse at 50% 50%, rgba(4, 9, 22, 0.50) 0%, rgba(4, 9, 22, 0.80) 70%, rgba(4, 9, 22, 0.95) 100%)'
            }}
          />

          <div className="absolute inset-0 opacity-[0.03]"
            style={{ 
              backgroundImage: theme === 'light'
                ? 'linear-gradient(rgba(15,23,42,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(15,23,42,0.08) 1px, transparent 1px)'
                : 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)', 
              backgroundSize: '60px 60px' 
            }} />
        </div>

        <motion.div
          style={{ y: heroY, opacity: heroOpacity }}
          className="relative z-10 container mx-auto px-6 text-center pt-24 md:pt-28"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8 border transition-all ${
              theme === 'light'
                ? 'bg-white/90 border-slate-200/90 shadow-sm text-slate-700'
                : 'glass border-white/10 text-slate-300'
            }`}
          >
            <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
            <span className="text-sm font-medium">{t('hero_badge')}</span>
            <Award size={14} className="text-accent" />
          </motion.div>

          {/* Hero Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="font-display font-bold text-5xl md:text-7xl lg:text-8xl leading-[1.05] mb-6 tracking-tight"
          >
            <span className={theme === 'light' ? 'text-slate-900' : 'text-white'}>{t('hero_title_1')}</span>
            <br />
            <span className="gradient-text">{t('hero_title_2')}</span>
            <br />
            <span className={theme === 'light' ? 'text-slate-900' : 'text-white'}>{t('hero_title_3')}</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className={`text-xl md:text-2xl max-w-2xl mx-auto mb-10 leading-relaxed ${
              theme === 'light' ? 'text-slate-600' : 'text-slate-400'
            }`}
          >
            {t('hero_subtitle')} <strong className={theme === 'light' ? 'text-slate-900 font-semibold' : 'text-white'}>{t('hero_subtitle_bold')}</strong>
            {t('hero_subtitle_end')}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-wrap items-center justify-center gap-4 mb-16"
          >
            {/* GET STARTED */}
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleGetStarted}
              className="btn-primary flex items-center gap-2 text-base px-8 py-4 rounded-2xl font-semibold shadow-2xl"
              style={{ background: 'linear-gradient(135deg, #2563EB, #38BDF8)', boxShadow: '0 20px 60px rgba(37,99,235,0.4)' }}
            >
              <LogIn size={20} />
              {t('get_started')}
            </motion.button>

            {/* EXPLORE SERVICES */}
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleExploreServices}
              className={`flex items-center gap-2 text-base px-8 py-4 rounded-2xl font-semibold transition-all ${
                theme === 'light'
                  ? 'bg-white text-slate-800 border border-slate-300 shadow-md hover:bg-slate-50 hover:border-slate-400'
                  : 'glass border border-white/15 text-white hover:border-white/30'
              }`}
            >
              {t('explore_services')}
              <ArrowRight size={20} />
            </motion.button>
          </motion.div>

          {/* Floating Service Icons */}
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="relative flex justify-center items-center gap-4 flex-wrap"
          >
            {['🛂 Passport', '🪪 Aadhaar', '📄 PAN', '🚗 License', '🌾 PM Kisan', '🏥 Ayushman'].map((item, i) => (
              <motion.div
                key={item}
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 3 + i * 0.5, repeat: Infinity, ease: 'easeInOut', delay: i * 0.3 }}
                className={`px-4 py-2 rounded-full text-sm transition-all ${
                  theme === 'light'
                    ? 'bg-white/85 text-slate-700 border border-slate-200/90 shadow-sm'
                    : 'glass text-slate-300 border border-white/10'
                }`}
              >
                {item}
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-slate-500"
        >
          <span className="text-xs">{t('scroll_to_explore')}</span>
          <div className="w-5 h-8 rounded-full border border-slate-600 flex justify-center pt-2">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-1 h-1 rounded-full bg-slate-400"
            />
          </div>
        </motion.div>
      </section>

      {/* ===== STATS SECTION ===== */}
      <section className="py-20 relative">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} className="text-center mb-12"
          >
            <span className="badge badge-primary mb-4">Platform Statistics</span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-white">
              Trusted by <span className="gradient-text">Crores of Citizens</span>
            </h2>
          </motion.div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ y: -4, scale: 1.02 }} className="stat-card text-center"
              >
                <div className="text-4xl mb-2">{stat.icon}</div>
                <div className="font-display font-bold text-3xl md:text-4xl mb-1" style={{ color: stat.color }}>
                  <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                </div>
                <div className="text-slate-400 text-sm">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FEATURES GRID ===== */}
      <section ref={featuresRef} className="py-20 relative scroll-mt-16">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} className="text-center mb-16"
          >
            <span className="badge badge-primary mb-4">{t('features_badge')}</span>
            <h2 className="font-display text-3xl md:text-5xl font-bold text-white mb-4">
              {t('features_title')} <span className="gradient-text">{t('features_title2')}</span>
            </h2>
            <p className="text-slate-400 text-lg max-w-xl mx-auto">{t('features_subtitle')}</p>
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map((f) => <FeatureCard key={f.title} {...f} />)}
          </div>
        </div>
      </section>

      {/* ===== GOVERNMENT ANNOUNCEMENTS ===== */}
      <section className="py-20 relative">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <motion.div
              initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.7 }}
            >
              <span className="badge badge-success mb-4">{t('announcements_badge')}</span>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-4">
                {t('announcements_title')} <span className="gradient-text">{t('announcements_title2')}</span>
              </h2>
              <p className="text-slate-400 text-lg mb-8">{t('announcements_subtitle')}</p>
              <div className="space-y-4">
                {announcements.map((a, i) => <AnnouncementCard key={i} {...a} />)}
              </div>
              <motion.div whileHover={{ x: 4 }} className="mt-6">
                <Link to="/services" className="flex items-center gap-2 text-accent font-medium hover:underline">
                  {t('view_all')} <ChevronRight size={18} />
                </Link>
              </motion.div>
            </motion.div>

            {/* Quick Access Panel */}
            <motion.div
              initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.7 }}
            >
              <span className="badge badge-primary mb-4">Quick Access</span>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-8">
                Popular <span className="gradient-text">{t('services')}</span>
              </h2>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { icon: '🛂', name: 'Passport', desc: '30-45 days', link: '/services/passport' },
                  { icon: '🪪', name: 'Aadhaar', desc: 'Identity card', link: '/services/aadhaar' },
                  { icon: '📄', name: 'PAN Card', desc: '15-20 days', link: '/services/pan' },
                  { icon: '🚗', name: 'Driving License', desc: 'RTO services', link: '/services/driving-license' },
                  { icon: '🗳️', name: 'Voter ID', desc: 'Election card', link: '/services/voter-id' },
                  { icon: '👶', name: 'Birth Certificate', desc: 'Civil records', link: '/services/birth-certificate' },
                  { icon: '💡', name: 'Electricity', desc: 'Bill & connection', link: '/services/electricity' },
                  { icon: '🏠', name: 'Property Tax', desc: 'Municipal tax', link: '/services/property-tax' },
                ].map((s, i) => (
                  <motion.div
                    key={s.name}
                    initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.05 }}
                    whileHover={{ y: -4, scale: 1.03 }} className="cursor-pointer"
                  >
                    <Link to={s.link}>
                      <div className="glass-card p-4 group">
                        <div className="text-2xl mb-2">{s.icon}</div>
                        <div className="font-medium text-white text-sm group-hover:text-accent transition-colors">{s.name}</div>
                        <div className="text-xs text-slate-500">{s.desc}</div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
              <Link to="/services">
                <motion.button
                  whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                  className="mt-4 w-full btn-ghost text-sm py-3 rounded-xl"
                >
                  View All 500+ {t('services')} →
                </motion.button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ===== HOW IT WORKS ===== */}
      <section className="py-20 relative">
        <div className="absolute inset-0 opacity-5"
          style={{ background: 'radial-gradient(ellipse at center, #2563EB, transparent 70%)' }} />
        <div className="container mx-auto px-6 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} className="text-center mb-16"
          >
            <span className="badge badge-warning mb-4">How It Works</span>
            <h2 className="font-display text-3xl md:text-5xl font-bold text-white">
              Simple. Fast. <span className="gradient-text">Intelligent.</span>
            </h2>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              { step: '01', title: 'Ask Your Question', desc: 'Type or speak your query in any Indian language. Our AI understands context naturally.', icon: '💬', color: '#2563EB' },
              { step: '02', title: 'Get Smart Guidance', desc: 'AI instantly provides step-by-step guidance, documents needed, fees, and timelines.', icon: '🧠', color: '#38BDF8' },
              { step: '03', title: 'Take Action', desc: 'Apply online, locate offices, access services, or download forms — all from one place.', icon: '🚀', color: '#22C55E' },
            ].map((item, i) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.2 }}
                className="text-center"
              >
                <div className="relative inline-block mb-6">
                  <motion.div animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                    className="absolute inset-0 rounded-full"
                    style={{ border: `2px dashed ${item.color}40` }} />
                  <div className="w-20 h-20 rounded-full flex items-center justify-center text-3xl"
                    style={{ background: `${item.color}15`, border: `2px solid ${item.color}30` }}>
                    {item.icon}
                  </div>
                  <div className="absolute -top-1 -right-1 w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white"
                    style={{ background: item.color }}>
                    {item.step}
                  </div>
                </div>
                <h3 className="font-semibold text-white text-lg mb-2">{item.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== TESTIMONIALS ===== */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} className="text-center mb-12"
          >
            <span className="badge badge-primary mb-4">{t('testimonials_badge')}</span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-white">
              {t('testimonials_title')} <span className="gradient-text">{t('testimonials_title2')}</span>
            </h2>
            <p className="text-slate-400 text-lg mt-3">{t('testimonials_subtitle')}</p>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t2, i) => (
              <motion.div
                key={t2.name}
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.15 }}
                whileHover={{ y: -6 }} className="glass-card p-6"
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(t2.rating)].map((_, j) => (
                    <Star key={j} size={14} className="text-warning fill-warning" />
                  ))}
                </div>
                <p className="text-slate-300 text-sm leading-relaxed mb-6 italic">"{t2.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-500 to-accent flex items-center justify-center text-xl">
                    {t2.avatar}
                  </div>
                  <div>
                    <div className="text-white font-medium text-sm">{t2.name}</div>
                    <div className="text-slate-500 text-xs">{t2.location}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== EMERGENCY BANNER ===== */}
      <section className="py-12">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="glass-card p-8 flex flex-col md:flex-row items-center justify-between gap-6"
            style={{ background: 'linear-gradient(135deg, rgba(239,68,68,0.08), rgba(239,68,68,0.02))', border: '1px solid rgba(239,68,68,0.15)' }}
          >
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-error/20 flex items-center justify-center text-2xl animate-pulse">🆘</div>
              <div>
                <h3 className="font-display font-bold text-white text-xl">Emergency Services</h3>
                <p className="text-slate-400 text-sm">One-tap access to Police, Ambulance, Fire, Helplines</p>
              </div>
            </div>
            <Link to="/emergency">
              <motion.button
                whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                className="px-6 py-3 rounded-xl font-semibold text-white flex items-center gap-2"
                style={{ background: 'linear-gradient(135deg, #EF4444, #DC2626)', boxShadow: '0 8px 25px rgba(239,68,68,0.3)' }}
              >
                <Phone size={18} /> Emergency Helplines
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ===== CTA SECTION ===== */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0"
          style={{ background: 'radial-gradient(ellipse at center, rgba(37,99,235,0.15), transparent 70%)' }} />
        <div className="container mx-auto px-6 text-center relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.7 }}
          >
            <h2 className="font-display font-bold text-4xl md:text-6xl text-white mb-6">
              {t('cta_title')} <br /><span className="gradient-text">{t('cta_title2')}</span>
            </h2>
            <p className="text-slate-400 text-xl max-w-lg mx-auto mb-10">{t('cta_subtitle')}</p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.98 }}
                onClick={handleGetStarted}
                className="btn-primary text-base px-8 py-4 rounded-2xl font-semibold flex items-center gap-2"
                style={{ background: 'linear-gradient(135deg, #2563EB, #38BDF8)', boxShadow: '0 20px 60px rgba(37,99,235,0.4)' }}
              >
                {t('cta_button')} <ArrowRight size={20} />
              </motion.button>
              <Link to="/login">
                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.98 }}
                  className="btn-ghost text-base px-8 py-4 rounded-2xl flex items-center gap-2"
                >
                  <Play size={18} /> {t('cta_button2')}
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="border-t border-white/[0.06] py-16">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div className="md:col-span-1">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-600 to-accent flex items-center justify-center">
                  <Zap size={18} className="text-white" />
                </div>
                <span className="font-display font-bold text-white text-lg">Smart Bharat AI</span>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed">{t('footer_desc')}</p>
              <div className="flex gap-3 mt-5">
                {['🏛️', '🇮🇳', '🤖'].map((icon, i) => (
                  <div key={i} className="w-9 h-9 glass rounded-xl flex items-center justify-center text-lg hover:bg-white/10 transition-all cursor-pointer">{icon}</div>
                ))}
              </div>
            </div>
            {[
              { title: t('footer_col1'), links: ['Passport', 'Aadhaar', 'PAN Card', 'Driving License', 'Voter ID', 'Birth Certificate'] },
              { title: t('footer_col2'), links: ['AI Chatbot', 'Scheme Finder', 'Document Assistant', 'Voice Assistant', 'Form Filling', 'Emergency Helplines'] },
              { title: t('footer_col3'), links: ['Help Center', 'AI Form Filling', 'Emergency', 'Nearby Services', 'Privacy Policy', 'Terms of Service'] },
            ].map((col) => (
              <div key={col.title}>
                <h4 className="font-semibold text-white mb-4">{col.title}</h4>
                <ul className="space-y-3">
                  {col.links.map((link) => (
                    <li key={link}>
                      <Link to="/services" className="text-slate-400 text-sm hover:text-accent transition-colors">{link}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="border-t border-white/[0.06] pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-slate-500 text-sm">{t('footer_copyright')}</p>
            <div className="flex items-center gap-2 text-slate-500 text-sm">
              <Shield size={14} className="text-success" />
              <span>Secure · Trusted · Government Certified</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
