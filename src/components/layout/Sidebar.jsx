import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard, FileText, Search, MessageSquare, Map, 
  Mic, Shield, Zap,
  Home, ChevronRight, BookOpen, Phone
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';

const navItems = [
  { path: '/dashboard', icon: LayoutDashboard, labelKey: 'dashboard', color: '#2563EB' },
  { path: '/services', icon: FileText, labelKey: 'services', color: '#38BDF8' },
  { path: '/scheme-finder', icon: Search, labelKey: 'schemes', color: '#22C55E' },
  { path: '/chatbot', icon: MessageSquare, labelKey: 'chatbot', color: '#8B5CF6' },
  { path: '/documents', icon: BookOpen, labelKey: 'documents', color: '#F59E0B' },
  { path: '/map', icon: Map, labelKey: 'map', color: '#10B981' },
  { path: '/voice-assistant', icon: Mic, labelKey: 'Voice', color: '#EC4899' },
  { path: '/emergency', icon: Phone, labelKey: 'emergency', color: '#EF4444' },
];

export default function Sidebar({ open, onClose }) {
  const { t } = useLanguage();
  const { theme } = useTheme();
  const navigate = useNavigate();

  return (
    <AnimatePresence>
      <motion.aside
        initial={false}
        animate={{ width: open ? 256 : 64 }}
        transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
        className={`sidebar flex flex-col overflow-hidden z-30 transition-all duration-300 ${
          theme === 'light'
            ? 'bg-white/95 border-r border-slate-200/90 shadow-[4px_0_24px_rgba(0,0,0,0.03)] backdrop-blur-xl'
            : 'glass border-r border-white/08'
        }`}
      >
        {/* Logo */}
        <div className={`h-16 flex items-center px-4 border-b flex-shrink-0 ${
          theme === 'light' ? 'border-slate-200/80' : 'border-white/[0.06]'
        }`}>
          <button 
            onClick={() => navigate('/dashboard')}
            className="flex items-center gap-3 min-w-0"
          >
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-primary-600 to-accent flex items-center justify-center flex-shrink-0 glow-primary">
              <Zap size={16} className="text-white" />
            </div>
            <AnimatePresence>
              {open && (
                <motion.div
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: 'auto' }}
                  exit={{ opacity: 0, width: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden whitespace-nowrap"
                >
                  <span className={`font-display font-bold text-[15px] ${
                    theme === 'light' ? 'text-slate-900' : 'text-white'
                  }`}>
                    Smart <span className="gradient-text">Bharat</span> AI
                  </span>
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        </div>

        {/* Nav Items */}
        <nav className="flex-1 py-4 overflow-y-auto overflow-x-hidden scrollbar-none">
          <div className="space-y-1 px-2">
            {navItems.map((item, i) => {
              const Icon = item.icon;
              const label = t(item.labelKey) || item.labelKey;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    `group flex items-center gap-3 rounded-xl px-3 py-2.5 transition-all duration-200 relative overflow-hidden
                    ${isActive 
                      ? (theme === 'light'
                          ? 'bg-primary-50 text-primary-700 border border-primary-200/80 shadow-sm font-semibold'
                          : 'bg-primary-600/20 text-white border border-primary-500/20')
                      : (theme === 'light'
                          ? 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80'
                          : 'text-slate-400 hover:text-white hover:bg-white/06')
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      {isActive && (
                        <motion.div
                          layoutId="sidebar-active"
                          className="absolute inset-0 rounded-xl"
                          style={{ 
                            background: theme === 'light' ? `${item.color}12` : `${item.color}15`, 
                            border: `1px solid ${item.color}${theme === 'light' ? '30' : '25'}` 
                          }}
                          transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                        />
                      )}
                      <div className="relative z-10 flex-shrink-0">
                        <Icon 
                          size={20} 
                          style={{ color: isActive ? item.color : undefined }}
                          className="transition-colors duration-200"
                        />
                      </div>
                      <AnimatePresence>
                        {open && (
                          <motion.span
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.15 }}
                            className="text-[15px] font-semibold whitespace-nowrap overflow-hidden relative z-10 flex-1"
                            style={{ 
                              color: isActive 
                                ? (theme === 'light' ? '#1d4ed8' : 'white') 
                                : (theme === 'light' ? '#334155' : undefined) 
                            }}
                          >
                            {label}
                          </motion.span>
                        )}
                      </AnimatePresence>
                      {isActive && open && (
                        <ChevronRight size={14} className={`${theme === 'light' ? 'text-primary-600' : 'text-slate-400'} ml-auto relative z-10 flex-shrink-0`} />
                      )}
                    </>
                  )}
                </NavLink>
              );
            })}
          </div>
        </nav>

        {/* Footer */}
        <div className={`p-3 border-t flex-shrink-0 ${
          theme === 'light' ? 'border-slate-200/80' : 'border-white/[0.06]'
        }`}>
          <AnimatePresence>
            {open ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="glass-card p-3 text-center"
              >
                <div className="text-xs text-slate-400 leading-relaxed">
                  <span className="gradient-text font-semibold">Smart Bharat AI</span>
                  <br />v2.0 • Government of India
                </div>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex justify-center"
              >
                <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.aside>
    </AnimatePresence>
  );
}
