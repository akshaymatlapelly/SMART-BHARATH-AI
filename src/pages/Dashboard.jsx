import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  LayoutDashboard, Bell, FileText, Search, AlertTriangle,
  TrendingUp, CheckCircle, Clock, ArrowRight, Zap, RefreshCw
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

// Animated counter
function Counter({ target, suffix = '' }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started) {
        setStarted(true);
        let c = 0;
        const step = target / 60;
        const timer = setInterval(() => {
          c += step;
          if (c >= target) { setCount(target); clearInterval(timer); }
          else setCount(Math.floor(c));
        }, 16);
      }
    });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target, started]);

  return <span ref={ref}>{count.toLocaleString('en-IN')}{suffix}</span>;
}

const activityData = [
  { month: 'Jan', searches: 120, complaints: 45, schemes: 30 },
  { month: 'Feb', searches: 180, complaints: 60, schemes: 45 },
  { month: 'Mar', searches: 150, complaints: 38, schemes: 55 },
  { month: 'Apr', searches: 220, complaints: 72, schemes: 68 },
  { month: 'May', searches: 280, complaints: 55, schemes: 82 },
  { month: 'Jun', searches: 310, complaints: 89, schemes: 95 },
  { month: 'Jul', searches: 260, complaints: 63, schemes: 78 },
];

const schemeData = [
  { name: 'PM Kisan', value: 35, color: '#22C55E' },
  { name: 'Ayushman', value: 28, color: '#EF4444' },
  { name: 'PM Awas', value: 20, color: '#2563EB' },
  { name: 'Others', value: 17, color: '#8B5CF6' },
];

export default function Dashboard() {
  const { user } = useAuth();

  const widgets = [
    { title: 'Services Used', value: 12, suffix: '', icon: FileText, color: '#2563EB', trend: '+3 this month' },
    { title: 'Active Complaints', value: 2, suffix: '', icon: AlertTriangle, color: '#F59E0B', trend: '1 in progress' },
    { title: 'Saved Schemes', value: 5, suffix: '', icon: Search, color: '#22C55E', trend: '2 applied' },
    { title: 'AI Queries', value: 47, suffix: '', icon: Zap, color: '#8B5CF6', trend: '+12 this week' },
  ];

  const recentActivity = [
    { action: 'Viewed Passport service', time: '2 hours ago', icon: '🛂' },
    { action: 'Filed road damage complaint', time: '1 day ago', icon: '🛣️' },
    { action: 'Found 3 eligible schemes', time: '3 days ago', icon: '🎯' },
    { action: 'Uploaded Aadhaar document', time: '5 days ago', icon: '🪪' },
    { action: 'Used AI assistant', time: '1 week ago', icon: '🤖' },
  ];

  const notifications = [
    { text: 'Aadhaar update completed ✅', time: '30m ago', type: 'success' },
    { text: 'New scheme: PM Ujjwala 3.0 available', time: '2h ago', type: 'info' },
    { text: 'Passport appointment reminder tomorrow', time: '5h ago', type: 'warning' },
  ];

  const quickActions = [
    { label: 'AI Chat', to: '/chatbot', icon: '🤖', color: '#8B5CF6' },
    { label: 'Find Schemes', to: '/scheme-finder', icon: '🎯', color: '#22C55E' },
    { label: 'Nearby Services', to: '/map', icon: '🗺️', color: '#10B981' },
    { label: 'Voice Assistant', to: '/voice-assistant', icon: '🎙️', color: '#EC4899' },
    { label: 'Documents', to: '/documents', icon: '📄', color: '#F59E0B' },
    { label: 'Emergency', to: '/emergency', icon: '🆘', color: '#EF4444' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="p-6 space-y-6"
    >
      {/* Welcome Header */}
      <div className="flex items-center justify-between">
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="font-display font-bold text-2xl md:text-3xl text-white">
            Welcome back, <span className="gradient-text">{user?.displayName?.split(' ')[0] || 'Citizen'}</span> 👋
          </h1>
          <p className="text-slate-400 text-sm mt-1">Here's your civic dashboard overview</p>
        </motion.div>
        <motion.button
          whileHover={{ rotate: 180 }}
          transition={{ duration: 0.3 }}
          className="p-2.5 rounded-xl glass border border-white/10 text-slate-400 hover:text-white"
        >
          <RefreshCw size={18} />
        </motion.button>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {widgets.map((w, i) => {
          const Icon = w.icon;
          return (
            <motion.div
              key={w.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              whileHover={{ y: -4, scale: 1.02 }}
              className="stat-card"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="text-sm text-slate-400">{w.title}</div>
                <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: `${w.color}15` }}>
                  <Icon size={16} style={{ color: w.color }} />
                </div>
              </div>
              <div className="font-display font-bold text-3xl text-white mb-1">
                <Counter target={w.value} suffix={w.suffix} />
              </div>
              <div className="text-xs text-slate-500">{w.trend}</div>
            </motion.div>
          );
        })}
      </div>

      {/* Main Content Grid */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Activity Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-2 glass-card p-5"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-white">Activity Overview</h2>
            <span className="badge badge-primary text-xs">Last 7 months</span>
          </div>
          <div className="h-52">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={activityData}>
                <defs>
                  <linearGradient id="colorSearches" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2563EB" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#2563EB" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorComplaints" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#EF4444" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#EF4444" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="month" tick={{ fill: '#64748b', fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: '#64748b', fontSize: 11 }} axisLine={false} tickLine={false} />
                <Tooltip
                  contentStyle={{ background: 'rgba(15,23,42,0.9)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', color: 'white', fontSize: 12 }}
                />
                <Area type="monotone" dataKey="searches" stroke="#2563EB" fill="url(#colorSearches)" strokeWidth={2} />
                <Area type="monotone" dataKey="complaints" stroke="#EF4444" fill="url(#colorComplaints)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div className="flex gap-4 mt-3 justify-center">
            <div className="flex items-center gap-1.5 text-xs text-slate-400">
              <div className="w-2.5 h-2.5 rounded-full bg-primary-500" />Searches
            </div>
            <div className="flex items-center gap-1.5 text-xs text-slate-400">
              <div className="w-2.5 h-2.5 rounded-full bg-error" />Complaints
            </div>
          </div>
        </motion.div>

        {/* Scheme Distribution */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="glass-card p-5"
        >
          <h2 className="font-semibold text-white mb-4">Scheme Applications</h2>
          <div className="h-36 flex items-center justify-center">
            <PieChart width={140} height={140}>
              <Pie data={schemeData} cx={70} cy={70} innerRadius={40} outerRadius={65} dataKey="value" strokeWidth={0}>
                {schemeData.map((entry, index) => (
                  <Cell key={index} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </div>
          <div className="space-y-2">
            {schemeData.map(item => (
              <div key={item.name} className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ background: item.color }} />
                  <span className="text-slate-400">{item.name}</span>
                </div>
                <span className="text-white font-medium">{item.value}%</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Bottom Row */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="glass-card p-5"
        >
          <h2 className="font-semibold text-white mb-4">Quick Actions</h2>
          <div className="grid grid-cols-3 gap-2">
            {quickActions.map((action, i) => (
              <Link key={action.label} to={action.to}>
                <motion.div
                  whileHover={{ y: -3, scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-3 rounded-xl text-center cursor-pointer transition-all border border-white/08 hover:border-white/20"
                  style={{ background: `${action.color}10` }}
                >
                  <div className="text-xl mb-1">{action.icon}</div>
                  <div className="text-xs text-slate-400 font-medium leading-tight">{action.label}</div>
                </motion.div>
              </Link>
            ))}
          </div>
        </motion.div>

        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="glass-card p-5"
        >
          <h2 className="font-semibold text-white mb-4">Recent Activity</h2>
          <div className="space-y-3">
            {recentActivity.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + i * 0.05 }}
                className="flex items-center gap-3"
              >
                <div className="text-lg flex-shrink-0">{item.icon}</div>
                <div className="flex-1 min-w-0">
                  <p className="text-slate-300 text-xs truncate">{item.action}</p>
                  <p className="text-slate-600 text-xs">{item.time}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Notifications */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45 }}
          className="glass-card p-5"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-white">Notifications</h2>
            <span className="badge badge-error text-xs">3 new</span>
          </div>
          <div className="space-y-3">
            {notifications.map((n, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + i * 0.05 }}
                className={`p-3 rounded-xl text-xs border ${
                  n.type === 'success' ? 'bg-success/10 border-success/20 text-success' :
                  n.type === 'warning' ? 'bg-warning/10 border-warning/20 text-warning' :
                  'bg-primary-500/10 border-primary-500/20 text-accent'
                }`}
              >
                <p className="mb-1">{n.text}</p>
                <p className="opacity-60">{n.time}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
