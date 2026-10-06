import React, { Suspense, lazy, useState, useEffect } from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Zap } from 'lucide-react';
import Navbar from './components/layout/Navbar';
import Sidebar from './components/layout/Sidebar';
import FloatingChatbot from './components/chatbot/FloatingChatbot';
import PageLoader from './components/ui/PageLoader';
import CursorGlow from './components/ui/CursorGlow';
import ProtectedRoute from './components/auth/ProtectedRoute';
import { useTheme } from './context/ThemeContext';

// Lazy load all pages
const Home = lazy(() => import('./pages/Home'));
const Login = lazy(() => import('./pages/Login'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Services = lazy(() => import('./pages/Services'));
const ServiceDetail = lazy(() => import('./pages/ServiceDetail'));
const SchemeFinder = lazy(() => import('./pages/SchemeFinder'));
const DocumentAssistant = lazy(() => import('./pages/DocumentAssistant'));
const AIFormFilling = lazy(() => import('./pages/AIFormFilling'));
const MapPage = lazy(() => import('./pages/MapPage'));
const Emergency = lazy(() => import('./pages/Emergency'));
const VoiceAssistant = lazy(() => import('./pages/VoiceAssistant'));
const AdminPanel = lazy(() => import('./pages/AdminPanel'));
const ChatbotPage = lazy(() => import('./pages/ChatbotPage'));

export default function App() {
  const location = useLocation();
  const { theme } = useTheme();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [initialLoading, setInitialLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Hide loader after 10 seconds
    const timer = setTimeout(() => {
      setInitialLoading(false);
    }, 10000);

    // Smoothly increment progress to 100% over 10 seconds
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 1;
      });
    }, 100);

    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, []);

  if (initialLoading) {
    return (
      <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#040916] overflow-hidden">
        <div className="gov-tricolor-bar" />
        {/* Glowing floating grid pattern background */}
        <div className="absolute inset-0 opacity-[0.03]" 
             style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
        
        <div className="flex flex-col items-center gap-8 relative z-10">
          {/* Glowing rotating square box */}
          <motion.div
            animate={{ 
              scale: [1, 1.15, 1],
              rotate: [0, 180, 360],
              borderRadius: ["1.25rem", "2rem", "1.25rem"]
            }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
            className="w-20 h-20 bg-gradient-to-br from-primary-600 to-accent flex items-center justify-center shadow-[0_0_50px_rgba(37,99,235,0.4)] border border-white/20"
          >
            <motion.div
              animate={{ opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <Zap size={32} className="text-white" />
            </motion.div>
          </motion.div>
          
          <div className="text-center space-y-2">
            <h1 className="font-display font-bold text-2xl text-white tracking-wide">
              Smart <span className="gradient-text">Bharat</span> AI
            </h1>
            <p className="text-slate-400 text-xs tracking-widest uppercase">
              Your Intelligent Civic Companion
            </p>
          </div>

          {/* Progress bar container */}
          <div className="w-56 h-1.5 bg-white/[0.05] rounded-full overflow-hidden border border-white/10 relative">
            <motion.div 
              className="h-full bg-gradient-to-r from-primary-500 to-accent rounded-full"
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="font-display font-medium text-sm text-accent">
            {progress}% Loaded
          </div>
        </div>
      </div>
    );
  }

  // Pages that show no sidebar/internal layout (public pages & admin portal)
  const isFullPage = location.pathname === '/' || location.pathname === '/login' || location.pathname === '/admin';

  return (
    <div className={`min-h-screen transition-colors duration-300 relative ${
      theme === 'light' ? 'bg-[#F4F6F9] text-slate-800' : 'bg-[#040916] text-white'
    }`}>
      <div className="gov-tricolor-bar" />
      <CursorGlow />

      {/* ===== INSIDE WEBSITE INDIAN FLAG & CIRCLE WHEEL BACKDROP (POST-LOGIN) ===== */}
      {!isFullPage && (
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
          {/* High-res Indian Flag Backdrop */}
          <div 
            className={`absolute inset-0 bg-cover bg-no-repeat bg-fixed transition-opacity duration-500 ${
              theme === 'light' ? 'opacity-65' : 'opacity-75'
            }`}
            style={{ 
              backgroundImage: "url('/india-flag-bg.jpg')",
              backgroundPosition: 'center 30%',
            }}
          />

          {/* Majestic Rotating Ashoka Chakra Circle Wheel */}
          <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none w-[560px] h-[560px] md:w-[680px] md:h-[680px] transition-opacity duration-500 ${
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

          {/* Balanced gradient overlay to ensure card readability while keeping the flag vibrant */}
          <div 
            className="absolute inset-0 transition-all duration-500"
            style={{
              background: theme === 'light'
                ? 'radial-gradient(ellipse at 30% 45%, rgba(248, 250, 252, 0.40) 0%, rgba(244, 246, 249, 0.65) 60%, rgba(235, 240, 248, 0.82) 100%)'
                : 'radial-gradient(ellipse at 25% 45%, rgba(4, 9, 22, 0.40) 0%, rgba(4, 9, 22, 0.78) 55%, rgba(4, 9, 22, 0.92) 100%)'
            }}
          />
          {/* Top-to-bottom subtle lighting for navbar and content balance */}
          <div 
            className="absolute inset-0 transition-all duration-500"
            style={{
              background: theme === 'light'
                ? 'linear-gradient(to bottom, rgba(248, 250, 252, 0.65) 0%, rgba(244, 246, 249, 0.25) 25%, rgba(244, 246, 249, 0.45) 80%, rgba(235, 240, 248, 0.78) 100%)'
                : 'linear-gradient(to bottom, rgba(4, 9, 22, 0.75) 0%, rgba(4, 9, 22, 0.35) 25%, rgba(4, 9, 22, 0.65) 80%, rgba(4, 9, 22, 0.90) 100%)'
            }}
          />
        </div>
      )}

      {!isFullPage && (
        <>
          <Navbar sidebarOpen={sidebarOpen} onToggleSidebar={() => setSidebarOpen(p => !p)} />
          <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        </>
      )}

      {isFullPage && location.pathname !== '/admin' && <Navbar minimal />}

      <main className={
        !isFullPage
          ? `transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-16'} pt-16 min-h-screen relative z-10`
          : ''
      }>
        <AnimatePresence mode="wait">
          <Suspense fallback={<PageLoader />}>
            <Routes location={location} key={location.pathname}>
              {/* ── PUBLIC ROUTES ── */}
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />

              {/* ── PROTECTED ROUTES (login required) ── */}
              <Route path="/dashboard"      element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
              <Route path="/services"       element={<ProtectedRoute><Services /></ProtectedRoute>} />
              <Route path="/services/:id"   element={<ProtectedRoute><ServiceDetail /></ProtectedRoute>} />
              <Route path="/scheme-finder"  element={<ProtectedRoute><SchemeFinder /></ProtectedRoute>} />
              <Route path="/documents"      element={<ProtectedRoute><DocumentAssistant /></ProtectedRoute>} />
              <Route path="/form-filling"   element={<ProtectedRoute><AIFormFilling /></ProtectedRoute>} />
              <Route path="/map"            element={<ProtectedRoute><MapPage /></ProtectedRoute>} />
              <Route path="/emergency"      element={<ProtectedRoute><Emergency /></ProtectedRoute>} />
              <Route path="/voice-assistant" element={<ProtectedRoute><VoiceAssistant /></ProtectedRoute>} />
              <Route path="/admin"          element={<AdminPanel />} />
              <Route path="/chatbot"        element={<ProtectedRoute><ChatbotPage /></ProtectedRoute>} />

              {/* Catch-all → home */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Suspense>
        </AnimatePresence>
      </main>

      {!isFullPage && <FloatingChatbot />}
    </div>
  );
}
