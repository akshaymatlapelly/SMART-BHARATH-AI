import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, EyeOff, Mail, Lock, User, Zap, ArrowRight, CheckCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import toast from 'react-hot-toast';

export default function Login() {
  const [mode, setMode] = useState('login'); // 'login' | 'register'
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const { loginWithGoogle, loginWithEmail, registerWithEmail } = useAuth();
  const { theme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  // If user was redirected from a protected route, go back there after login
  const from = location.state?.from?.pathname || '/dashboard';

  const handleGoogle = async () => {
    setLoading(true);
    try {
      await loginWithGoogle();
      toast.success('Welcome to Smart Bharat AI! 🎉');
      navigate(from, { replace: true });
    } catch (e) {
      toast.error(e.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (mode === 'login') {
        await loginWithEmail(form.email, form.password);
        toast.success('Welcome back! 👋');
      } else {
        await registerWithEmail(form.name, form.email, form.password);
        toast.success('Account created! Welcome to Smart Bharat AI 🎉');
      }
      navigate(from, { replace: true });
    } catch (e) {
      toast.error(e.message || 'Authentication failed');
    } finally {
      setLoading(false);
    }
  };

  const features = ['AI-powered guidance', 'Multilingual support', '500+ services', 'Scheme finder'];

  return (
    <div className={`min-h-screen flex relative overflow-hidden transition-colors duration-500 ${
      theme === 'light' ? 'bg-[#F8FAFC]' : 'bg-[#040916]'
    }`}>
      {/* High-res Indian Flag Backdrop */}
      <div 
        className={`absolute inset-0 bg-cover bg-no-repeat bg-fixed transition-opacity duration-500 pointer-events-none ${
          theme === 'light' ? 'opacity-40' : 'opacity-20'
        }`}
        style={{ 
          backgroundImage: "url('/india-flag-bg.jpg')",
          backgroundPosition: 'center 30%',
        }}
      />

      {/* Rotating Ashoka Chakra Circle Wheel */}
      <div className={`absolute -bottom-20 -left-20 pointer-events-none w-[520px] h-[520px] transition-opacity duration-500 ${
        theme === 'light' ? 'opacity-30' : 'opacity-[0.07]'
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

      {/* Animated background blobs with Indian Government palette */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="blob w-96 h-96 top-0 left-0" style={{ 
          background: theme === 'light'
            ? 'radial-gradient(circle, rgba(255,153,51,0.18), rgba(234,88,12,0.03), transparent 70%)'
            : 'radial-gradient(circle, rgba(255,153,51,0.22), rgba(234,88,12,0.06), transparent 70%)' 
        }} />
        <div className="blob w-80 h-80 bottom-10 right-0" style={{ 
          background: theme === 'light'
            ? 'radial-gradient(circle, rgba(19,136,8,0.15), rgba(4,120,87,0.03), transparent 70%)'
            : 'radial-gradient(circle, rgba(19,136,8,0.20), rgba(4,120,87,0.05), transparent 70%)', 
          animationDelay: '4s' 
        }} />
        <div className="blob w-64 h-64 top-1/2 left-1/2" style={{ 
          background: theme === 'light'
            ? 'radial-gradient(circle, rgba(37,99,235,0.15), rgba(14,52,130,0.03), transparent 70%)'
            : 'radial-gradient(circle, rgba(37,99,235,0.22), rgba(14,52,130,0.08), transparent 70%)', 
          animationDelay: '2s' 
        }} />
        <div className="absolute inset-0 opacity-[0.02]" style={{
          backgroundImage: theme === 'light'
            ? 'linear-gradient(rgba(15,23,42,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(15,23,42,0.06) 1px, transparent 1px)'
            : 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }} />
      </div>

      {/* Left Panel - Feature showcase */}
      <motion.div
        initial={{ opacity: 0, x: -60 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="hidden lg:flex flex-col justify-center w-1/2 px-16 relative z-10"
      >
        <div className="max-w-md">
          {/* Logo */}
          <div className="flex items-center gap-3 mb-12">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary-600 to-accent flex items-center justify-center glow-primary">
              <Zap size={22} className="text-white" />
            </div>
            <div>
              <div className={`font-display font-bold text-xl ${theme === 'light' ? 'text-slate-900' : 'text-white'}`}>
                Smart Bharat AI
              </div>
              <div className={`text-xs ${theme === 'light' ? 'text-slate-500' : 'text-slate-400'}`}>
                Government of India Initiative
              </div>
            </div>
          </div>

          <h1 className={`font-display font-bold text-4xl mb-4 leading-tight ${theme === 'light' ? 'text-slate-900' : 'text-white'}`}>
            Your Intelligent<br />
            <span className="gradient-text">Civic Companion</span>
          </h1>
          <p className={`text-lg mb-10 leading-relaxed ${theme === 'light' ? 'text-slate-600' : 'text-slate-400'}`}>
            Access government services, discover eligible schemes, and get AI-powered guidance — all in one place.
          </p>

          <div className="space-y-4">
            {features.map((f, i) => (
              <motion.div
                key={f}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.4 + i * 0.1 }}
                className="flex items-center gap-3"
              >
                <CheckCircle size={18} className="text-success flex-shrink-0" />
                <span className={theme === 'light' ? 'text-slate-700 font-medium' : 'text-slate-300'}>{f}</span>
              </motion.div>
            ))}
          </div>

          {/* Testimonial */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
            className="mt-12 glass-card p-5"
          >
            <p className={`text-sm italic mb-3 ${theme === 'light' ? 'text-slate-700' : 'text-slate-300'}`}>
              "Smart Bharat AI helped me discover 4 government schemes I had no idea about. Applied for all of them!"
            </p>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-500 to-accent flex items-center justify-center text-base">👨</div>
              <div>
                <div className={`text-xs font-medium ${theme === 'light' ? 'text-slate-900' : 'text-white'}`}>Rajesh Kumar</div>
                <div className="text-slate-500 text-xs">Farmer, Bihar</div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Right Panel - Auth form */}
      <motion.div
        initial={{ opacity: 0, x: 60 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-1 items-center justify-center px-6 py-12 relative z-10"
      >
        <div className="w-full max-w-md">
          {/* Mobile logo */}
          <div className="flex items-center gap-3 mb-8 lg:hidden">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-600 to-accent flex items-center justify-center">
              <Zap size={18} className="text-white" />
            </div>
            <span className={`font-display font-bold text-lg ${theme === 'light' ? 'text-slate-900' : 'text-white'}`}>
              Smart Bharat AI
            </span>
          </div>

          <div className="glass-card p-8">
            {/* Mode Tabs */}
            <div className={`flex rounded-xl p-1 mb-8 ${
              theme === 'light' ? 'bg-slate-100 border border-slate-200' : 'bg-white/[0.04]'
            }`}>
              {['login', 'register'].map((m) => (
                <button
                  key={m}
                  onClick={() => setMode(m)}
                  className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                    mode === m
                      ? 'bg-primary-600 text-white shadow-lg'
                      : (theme === 'light' ? 'text-slate-600 hover:text-slate-900' : 'text-slate-400 hover:text-white')
                  }`}
                >
                  {m === 'login' ? 'Sign In' : 'Create Account'}
                </button>
              ))}
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={mode}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                <h2 className={`font-display font-bold text-2xl mb-1 ${theme === 'light' ? 'text-slate-900' : 'text-white'}`}>
                  {mode === 'login' ? 'Welcome back' : 'Create account'}
                </h2>
                <p className={`text-sm mb-6 ${theme === 'light' ? 'text-slate-600' : 'text-slate-400'}`}>
                  {mode === 'login' 
                    ? 'Sign in to access your civic dashboard' 
                    : 'Join millions of citizens on Smart Bharat AI'
                  }
                </p>

                {/* Google Button */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleGoogle}
                  disabled={loading}
                  className={`w-full flex items-center justify-center gap-3 py-3.5 rounded-xl font-medium text-sm transition-all duration-200 mb-5 disabled:opacity-50 ${
                    theme === 'light'
                      ? 'border border-slate-300 bg-white text-slate-800 shadow-sm hover:bg-slate-50 hover:border-slate-400'
                      : 'border border-white/15 bg-white/[0.04] text-white hover:bg-white/[0.08] hover:border-white/25'
                  }`}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  Continue with Google
                </motion.button>

                <div className="flex items-center gap-3 mb-5">
                  <div className={`flex-1 h-px ${theme === 'light' ? 'bg-slate-200' : 'bg-white/10'}`} />
                  <span className={`text-xs ${theme === 'light' ? 'text-slate-500' : 'text-slate-500'}`}>or continue with email</span>
                  <div className={`flex-1 h-px ${theme === 'light' ? 'bg-slate-200' : 'bg-white/10'}`} />
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                  {mode === 'register' && (
                    <div className="relative">
                      <User size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input
                        type="text"
                        placeholder="Full Name"
                        value={form.name}
                        onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
                        className="input-glass pl-10"
                        required
                      />
                    </div>
                  )}

                  <div className="relative">
                    <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="email"
                      placeholder="Email address"
                      value={form.email}
                      onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
                      className="input-glass pl-10"
                      required
                    />
                  </div>

                  <div className="relative">
                    <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Password"
                      value={form.password}
                      onChange={e => setForm(p => ({ ...p, password: e.target.value }))}
                      className="input-glass pl-10 pr-10"
                      required
                      minLength={6}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(p => !p)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                    >
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02, y: -1 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    disabled={loading}
                    className="btn-primary w-full py-3.5 flex items-center justify-center gap-2 text-sm font-semibold disabled:opacity-50"
                  >
                    {loading ? (
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      <>
                        {mode === 'login' ? 'Sign In' : 'Create Account'}
                        <ArrowRight size={16} />
                      </>
                    )}
                  </motion.button>
                </form>
              </motion.div>
            </AnimatePresence>

            <p className="text-center text-xs text-slate-500 mt-6">
              By continuing, you agree to the{' '}
              <Link to="/" className="text-accent hover:underline">Terms of Service</Link>
              {' '}and{' '}
              <Link to="/" className="text-accent hover:underline">Privacy Policy</Link>
            </p>
          </div>

          <div className="text-center mt-6">
            <Link to="/" className="text-slate-400 text-sm hover:text-accent transition-colors">
              ← Back to Home
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
