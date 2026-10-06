import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Menu, X, Bell, Search, Sun, Moon, Globe, User, LogOut, 
  Settings, ChevronDown, Zap
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { useLanguage } from '../../context/LanguageContext';
import toast from 'react-hot-toast';

export default function Navbar({ minimal = false, sidebarOpen, onToggleSidebar }) {
  const { user, logout } = useAuth();
  const { theme, toggleTheme, setTheme } = useTheme();
  const { language, setLanguage, languages, t } = useLanguage();
  const location = useLocation();
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = async () => {
    await logout();
    toast.success('Logged out successfully');
    navigate('/');
    setProfileOpen(false);
  };

  const notifications = [
    { id: 1, text: 'Your Aadhaar update is complete', time: '5m ago', icon: '✅', unread: true },
    { id: 2, text: 'New scheme: PM Ujjwala 3.0 launched', time: '1h ago', icon: '🎯', unread: true },
    { id: 3, text: 'Complaint #SB2024001 resolved', time: '3h ago', icon: '🔧', unread: false },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 right-0 z-40 h-16 transition-all duration-300
        ${!minimal ? (sidebarOpen ? 'left-64' : 'left-16') : 'left-0'}
        ${scrolled 
          ? (theme === 'light' ? 'bg-white/95 border-b border-slate-200/90 shadow-sm backdrop-blur-xl' : 'glass border-b border-white/10 shadow-lg')
          : (theme === 'light' ? 'bg-white/75 border-b border-slate-200/60 backdrop-blur-md' : 'bg-transparent border-b border-transparent')
        }
      `}
    >
      <div className="h-full flex items-center justify-between px-4 lg:px-6">
        {/* Left: Toggle + Logo */}
        <div className="flex items-center gap-3">
          {!minimal && (
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={onToggleSidebar}
              className={`p-2 rounded-xl transition-all ${
                theme === 'light' 
                  ? 'text-slate-600 hover:text-slate-900 hover:bg-slate-100' 
                  : 'text-slate-400 hover:text-white hover:bg-white/10'
              }`}
            >
              <Menu size={20} />
            </motion.button>
          )}
          
          {minimal && (
            <Link to="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-primary-500 to-accent flex items-center justify-center">
                <Zap size={16} className="text-white" />
              </div>
              <span className={`font-display font-bold text-lg hidden sm:block ${
                theme === 'light' ? 'text-slate-900' : 'text-white'
              }`}>
                Smart <span className="gradient-text">Bharat</span> AI
              </span>
            </Link>
          )}
        </div>

        {/* Center: Search (non-minimal) */}
        {!minimal && (
          <div className="hidden md:flex flex-1 max-w-md mx-6">
            <div className="relative w-full">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder={t('search')}
                className="input-glass pl-9 py-2 text-sm w-full"
                onKeyDown={(e) => e.key === 'Enter' && navigate('/services')}
              />
            </div>
          </div>
        )}

        {/* Right: Actions */}
        <div className="flex items-center gap-2">
          {/* Light / Dark Mode Toggle Button */}
          <div 
            className={`flex items-center p-1 rounded-full border transition-all duration-300 ${
              theme === 'light'
                ? 'bg-slate-200/80 border-slate-300/80 shadow-inner'
                : 'bg-slate-900/80 border-white/10 shadow-inner'
            }`}
          >
            <button
              type="button"
              onClick={() => setTheme('light')}
              title="Switch to Light Mode"
              aria-label="Light Mode"
              className={`relative flex items-center gap-1.5 px-2.5 sm:px-3 py-1 rounded-full text-xs font-semibold transition-all duration-200 ${
                theme === 'light'
                  ? 'text-amber-950 font-bold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {theme === 'light' && (
                <motion.div
                  layoutId="activeThemeNavbar"
                  className="absolute inset-0 rounded-full bg-gradient-to-r from-amber-300 via-amber-200 to-yellow-300 shadow-md border border-amber-400/50"
                  transition={{ type: 'spring', stiffness: 450, damping: 30 }}
                />
              )}
              <Sun 
                size={14} 
                className={`relative z-10 transition-transform duration-300 ${
                  theme === 'light' ? 'text-amber-800 rotate-90 scale-110' : 'text-slate-400'
                }`} 
              />
              <span className="relative z-10 hidden sm:inline">Light</span>
            </button>

            <button
              type="button"
              onClick={() => setTheme('dark')}
              title="Switch to Dark Mode"
              aria-label="Dark Mode"
              className={`relative flex items-center gap-1.5 px-2.5 sm:px-3 py-1 rounded-full text-xs font-semibold transition-all duration-200 ${
                theme === 'dark'
                  ? 'text-white font-bold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {theme === 'dark' && (
                <motion.div
                  layoutId="activeThemeNavbar"
                  className="absolute inset-0 rounded-full bg-gradient-to-r from-primary-600 to-indigo-600 shadow-[0_0_12px_rgba(37,99,235,0.5)] border border-primary-400/40"
                  transition={{ type: 'spring', stiffness: 450, damping: 30 }}
                />
              )}
              <Moon 
                size={14} 
                className={`relative z-10 transition-transform duration-300 ${
                  theme === 'dark' ? 'text-blue-100 -rotate-12 scale-110' : 'text-slate-500'
                }`} 
              />
              <span className="relative z-10 hidden sm:inline">Dark</span>
            </button>
          </div>

          {/* Language Switcher */}
          <div className="relative">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => { setLangOpen(p => !p); setProfileOpen(false); setNotifOpen(false); }}
              className={`flex items-center gap-1 px-3 py-2 rounded-xl transition-all text-sm ${
                theme === 'light'
                  ? 'text-slate-700 hover:text-slate-900 hover:bg-slate-100'
                  : 'text-slate-400 hover:text-white hover:bg-white/10'
              }`}
            >
              <Globe size={16} />
              <span className="hidden sm:inline">{languages.find(l => l.code === language)?.native}</span>
              <ChevronDown size={12} />
            </motion.button>

            <AnimatePresence>
              {langOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ duration: 0.15 }}
                  className={`absolute right-0 top-12 w-44 rounded-2xl py-2 shadow-2xl z-50 transition-all ${
                    theme === 'light'
                      ? 'bg-white border border-slate-200 shadow-xl text-slate-800'
                      : 'glass border border-white/10'
                  }`}
                >
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => { setLanguage(lang.code); setLangOpen(false); }}
                      className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm transition-all ${
                        theme === 'light'
                          ? (language === lang.code ? 'text-primary-600 bg-primary-50 font-semibold' : 'text-slate-700 hover:bg-slate-50')
                          : (language === lang.code ? 'text-accent' : 'text-slate-300 hover:bg-white/10')
                      }`}
                    >
                      <span>{lang.flag}</span>
                      <span>{lang.native}</span>
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Notifications */}
          {user && (
            <div className="relative">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => { setNotifOpen(p => !p); setProfileOpen(false); setLangOpen(false); }}
                className={`relative p-2 rounded-xl transition-all ${
                  theme === 'light'
                    ? 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                    : 'text-slate-400 hover:text-white hover:bg-white/10'
                }`}
              >
                <Bell size={18} />
                <span className="absolute top-1 right-1 w-2 h-2 bg-error rounded-full animate-ping-slow" />
              </motion.button>

              <AnimatePresence>
                {notifOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className={`absolute right-0 top-12 w-80 rounded-2xl shadow-2xl z-50 overflow-hidden ${
                      theme === 'light'
                        ? 'bg-white border border-slate-200 shadow-xl'
                        : 'glass border border-white/10'
                    }`}
                  >
                    <div className={`p-4 border-b ${theme === 'light' ? 'border-slate-100 bg-slate-50/50' : 'border-white/10'}`}>
                      <h3 className={`font-semibold text-sm ${theme === 'light' ? 'text-slate-900' : 'text-white'}`}>Notifications</h3>
                    </div>
                    {notifications.map((n) => (
                      <div 
                        key={n.id} 
                        className={`flex gap-3 p-4 transition-all cursor-pointer ${
                          theme === 'light'
                            ? (n.unread ? 'bg-primary-50/50 hover:bg-primary-50' : 'hover:bg-slate-50')
                            : (n.unread ? 'bg-primary-500/5 hover:bg-white/5' : 'hover:bg-white/5')
                        }`}
                      >
                        <span className="text-xl">{n.icon}</span>
                        <div className="flex-1 min-w-0">
                          <p className={`text-sm leading-snug ${theme === 'light' ? 'text-slate-700' : 'text-slate-300'}`}>{n.text}</p>
                          <p className={`text-xs mt-1 ${theme === 'light' ? 'text-slate-400' : 'text-slate-500'}`}>{n.time}</p>
                        </div>
                        {n.unread && <span className="w-2 h-2 bg-accent rounded-full mt-1 flex-shrink-0" />}
                      </div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}

          {/* User Profile */}
          {user ? (
            <div className="relative">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => { setProfileOpen(p => !p); setNotifOpen(false); setLangOpen(false); }}
                className={`flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-xl transition-all ${
                  theme === 'light' ? 'hover:bg-slate-100' : 'hover:bg-white/10'
                }`}
              >
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-500 to-accent flex items-center justify-center text-white font-semibold text-sm">
                  {user.displayName?.[0] || user.email?.[0] || 'U'}
                </div>
                <span className={`text-sm hidden md:block max-w-[100px] truncate ${
                  theme === 'light' ? 'text-slate-700' : 'text-slate-300'
                }`}>
                  {user.displayName || user.email?.split('@')[0]}
                </span>
                <ChevronDown size={14} className={theme === 'light' ? 'text-slate-500' : 'text-slate-400'} />
              </motion.button>

              <AnimatePresence>
                {profileOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className={`absolute right-0 top-12 w-52 rounded-2xl py-2 shadow-2xl z-50 ${
                      theme === 'light'
                        ? 'bg-white border border-slate-200 shadow-xl'
                        : 'glass border border-white/10'
                    }`}
                  >
                    <div className={`px-4 py-3 border-b ${theme === 'light' ? 'border-slate-100 bg-slate-50/50' : 'border-white/10'}`}>
                      <p className={`text-sm font-medium truncate ${theme === 'light' ? 'text-slate-900' : 'text-white'}`}>
                        {user.displayName || 'Citizen'}
                      </p>
                      <p className={`text-xs truncate ${theme === 'light' ? 'text-slate-500' : 'text-slate-400'}`}>
                        {user.email}
                      </p>
                    </div>
                    <Link to="/dashboard" onClick={() => setProfileOpen(false)}
                      className={`flex items-center gap-3 px-4 py-2.5 text-sm transition-all ${
                        theme === 'light' ? 'text-slate-700 hover:text-slate-900 hover:bg-slate-50' : 'text-slate-300 hover:text-white hover:bg-white/10'
                      }`}>
                      <User size={15} /> My Dashboard
                    </Link>
                    <Link to="/admin" onClick={() => setProfileOpen(false)}
                      className={`flex items-center gap-3 px-4 py-2.5 text-sm transition-all ${
                        theme === 'light' ? 'text-slate-700 hover:text-slate-900 hover:bg-slate-50' : 'text-slate-300 hover:text-white hover:bg-white/10'
                      }`}>
                      <Settings size={15} /> Admin Panel
                    </Link>
                    <button onClick={handleLogout}
                      className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-error hover:bg-error/10 transition-all">
                      <LogOut size={15} /> {t('logout')}
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <Link to="/login">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-primary text-sm px-4 py-2"
              >
                {t('login')}
              </motion.button>
            </Link>
          )}
        </div>
      </div>
    </motion.nav>
  );
}
