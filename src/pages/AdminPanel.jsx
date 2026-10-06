import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Users, AlertTriangle, TrendingUp, Shield, Download, RefreshCw, Zap,
  Lock, User as UserIcon, LogOut, LayoutDashboard, KeyRound, Eye, EyeOff,
  Building2, Briefcase, FileText, Gift, FolderKanban, CheckSquare, BrainCircuit,
  Sliders, Database, History, HelpCircle, Activity, Globe, MessageSquare, Plus,
  Search, Filter, Trash2, Check, X, ShieldAlert, BadgeInfo, Bell, Send, Upload,
  AlertOctagon, CheckCircle2, DollarSign, Cloud, Settings, Moon, ChevronRight
} from 'lucide-react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  AreaChart, Area, PieChart, Pie, Cell, LineChart, Line
} from 'recharts';
import toast from 'react-hot-toast';

// ============================================================
// STUNNING PRE-POPULATED DATA SETS
// ============================================================

const INITIAL_USERS = [
  { id: 'U-9842', name: 'Rajesh Sharma', email: 'rajesh.sharma@gmail.com', phone: '+91 98765 43210', aadhaar: 'XXXX-XXXX-9012', state: 'Maharashtra', district: 'Mumbai', city: 'Mumbai', language: 'Hindi', regDate: '2024-01-12', lastLogin: '2026-07-13', chats: 45, complaints: 3, apps: 2, status: 'Verified' },
  { id: 'U-3941', name: 'Ananya Rao', email: 'ananya.rao@outlook.com', phone: '+91 87654 32109', aadhaar: 'XXXX-XXXX-3456', state: 'Karnataka', district: 'Bangalore Urban', city: 'Bangalore', language: 'English', regDate: '2024-03-05', lastLogin: '2026-07-12', chats: 128, complaints: 1, apps: 4, status: 'Verified' },
  { id: 'U-1289', name: 'Karthik Pillai', email: 'karthik.p@yahoo.com', phone: '+91 94440 12345', aadhaar: 'XXXX-XXXX-7890', state: 'Tamil Nadu', district: 'Chennai', city: 'Chennai', language: 'Tamil', regDate: '2024-04-18', lastLogin: '2026-07-13', chats: 89, complaints: 5, apps: 1, status: 'Suspended' },
  { id: 'U-7762', name: 'Sunita Verma', email: 'sunita.v@gov.in', phone: '+91 99887 76655', aadhaar: 'XXXX-XXXX-5544', state: 'Delhi', district: 'New Delhi', city: 'Delhi', language: 'Hindi', regDate: '2024-05-22', lastLogin: '2026-07-10', chats: 34, complaints: 0, apps: 3, status: 'Active' },
  { id: 'U-5091', name: 'Vikram Reddy', email: 'vikram.reddy@gmail.com', phone: '+91 77665 54433', aadhaar: 'XXXX-XXXX-2211', state: 'Telangana', district: 'Hyderabad', city: 'Hyderabad', language: 'Telugu', regDate: '2024-06-01', lastLogin: '2026-07-13', chats: 156, complaints: 8, apps: 0, status: 'Pending Verification' },
];

const INITIAL_ROLES = [
  { id: 'R-1', name: 'Super Admin', desc: 'Full system access & cost analytics control', users: 2, permissions: ['ALL'] },
  { id: 'R-2', name: 'Government Admin', desc: 'Cross-department operations management', users: 5, permissions: ['READ_ALL', 'WRITE_ALL', 'VERIFY_DOCS'] },
  { id: 'R-3', name: 'Department Admin', desc: 'Manage single department & assign officers', users: 12, permissions: ['DEPT_READ', 'DEPT_WRITE', 'ASSIGN_OFFICERS'] },
  { id: 'R-4', name: 'Officer', desc: 'Inspect & resolve citizen complaints', users: 48, permissions: ['RESOLVE_COMPLAINTS', 'ADD_REMARKS'] },
  { id: 'R-5', name: 'Support Executive', desc: 'Manage citizen tickets & chatbot handovers', users: 15, permissions: ['CRM_CHAT', 'RESOLVE_TICKETS'] },
];

const INITIAL_DEPARTMENTS = [
  { id: 'D-1', name: 'Revenue Department', head: 'Dr. Ramesh Patil', officers: 12, performance: 94, activeComplaints: 24, status: 'Excellent' },
  { id: 'D-2', name: 'Police Department', head: 'K. J. Srivatsa (IPS)', officers: 28, performance: 88, activeComplaints: 42, status: 'Good' },
  { id: 'D-3', name: 'Electricity (DISCOM)', head: 'Amit Shah (Director)', officers: 15, performance: 91, activeComplaints: 18, status: 'Excellent' },
  { id: 'D-4', name: 'Water & Sewage Supply', head: 'M. K. Rao', officers: 9, performance: 76, activeComplaints: 31, status: 'Average' },
  { id: 'D-5', name: 'Passport Office', head: 'S. Jaishankar (Regional)', officers: 14, performance: 97, activeComplaints: 5, status: 'Excellent' },
];

const INITIAL_COMPLAINTS = [
  { id: 'C-8849', citizen: 'Rajesh Sharma', category: 'Road Damage', loc: 'MG Road, Mumbai', officer: 'Inspector Deshmukh', priority: 'High', status: 'In Progress', date: '2026-07-11', confScore: 94, img: 'https://images.unsplash.com/photo-1515162305285-0293e4767cc2?q=80&w=400' },
  { id: 'C-7632', citizen: 'Vikram Reddy', category: 'Garbage Dump', loc: 'Hitech City, Hyd', officer: 'Welfare Officer Srinivas', priority: 'Medium', status: 'Pending Review', date: '2026-07-13', confScore: 89, img: 'https://images.unsplash.com/photo-1611284446314-60a58ac0deb9?q=80&w=400' },
  { id: 'C-1029', citizen: 'Ananya Rao', category: 'Street Light Out', loc: 'Indiranagar, Blr', officer: 'Lineman Gowda', priority: 'Low', status: 'Resolved', date: '2026-07-09', confScore: 98, img: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=400' },
];

const INITIAL_SERVICES = [
  { id: 'S-1', name: 'Passport Issuance', dept: 'Passport Office', fee: '₹1,500', timeline: '30-45 Days', status: 'Published' },
  { id: 'S-2', name: 'Income Certificate', dept: 'Revenue Department', fee: '₹50', timeline: '15 Days', status: 'Published' },
  { id: 'S-3', name: 'Driving License', dept: 'Transport Office', fee: '₹800', timeline: '20 Days', status: 'Draft' },
];

const INITIAL_SCHEMES = [
  { id: 'SCH-1', name: 'PM Kisan Samman Nidhi', cat: 'Agriculture', benefits: '₹6,000 / year', status: 'Published' },
  { id: 'SCH-2', name: 'Ayushman Bharat Yojana', cat: 'Health', benefits: '₹5 Lakh Health Cover', status: 'Published' },
  { id: 'SCH-3', name: 'PM Awas Yojana (Urban)', cat: 'Housing', benefits: 'Subsidy up to ₹2.67L', status: 'Draft' },
];

const INITIAL_AUDITS = [
  { time: '13:40:12', user: 'akshay', action: 'EXPORT_USER_REPORTS', module: 'User Management', ip: '192.168.1.45' },
  { time: '13:38:05', user: 'akshay', action: 'APPROVE_OCR_VERIFICATION', module: 'Document verification', ip: '192.168.1.45' },
  { time: '13:22:48', user: 'akshay', action: 'ADMIN_LOGIN_SUCCESS', module: 'Security Guard', ip: '192.168.1.45' },
  { time: '12:15:10', user: 'system', action: 'CRON_BACKUP_SUCCESS', module: 'System Database', ip: '127.0.0.1' },
];

const DEPT_CHART = [
  { name: 'Revenue', resolved: 420, pending: 32 },
  { name: 'Police', resolved: 680, pending: 110 },
  { name: 'DISCOM', resolved: 310, pending: 15 },
  { name: 'Water', resolved: 290, pending: 84 },
  { name: 'Passport', resolved: 540, pending: 8 },
];

const DAILY_USAGE_CHART = [
  { day: 'Mon', queries: 2400, complaints: 140 },
  { day: 'Tue', dayQuery: 3100, complaints: 190 },
  { day: 'Wed', dayQuery: 4500, complaints: 280 },
  { day: 'Thu', dayQuery: 4000, complaints: 210 },
  { day: 'Fri', dayQuery: 4800, complaints: 330 },
  { day: 'Sat', dayQuery: 3200, complaints: 180 },
];

const categoryData = [
  { name: 'Road Damage', value: 32, color: '#F59E0B' },
  { name: 'Garbage', value: 24, color: '#22C55E' },
  { name: 'Street Light', value: 18, color: '#38BDF8' },
  { name: 'Water', value: 14, color: '#2563EB' },
  { name: 'Others', value: 12, color: '#8B5CF6' },
];

export default function AdminPanel() {
  // Auth Screen state
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  // Active module selection
  const [activeTab, setActiveTab] = useState('dashboard');

  // Dynamic modules states
  const [users, setUsers] = useState(INITIAL_USERS);
  const [complaints, setComplaints] = useState(INITIAL_COMPLAINTS);
  const [departments, setDepartments] = useState(INITIAL_DEPARTMENTS);
  const [services, setServices] = useState(INITIAL_SERVICES);
  const [schemes, setSchemes] = useState(INITIAL_SCHEMES);
  const [audits, setAudits] = useState(INITIAL_AUDITS);

  // Search & Filters state
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  // Modal open states
  const [isAddUserOpen, setIsAddUserOpen] = useState(false);
  const [isDetailUserOpen, setIsDetailUserOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  // Form states
  const [newUser, setNewUser] = useState({ name: '', email: '', phone: '', state: '', district: '', status: 'Active' });

  // Notifications/System parameters
  const [systemAlert, setSystemAlert] = useState({ target: 'All', message: '', type: 'Info' });
  const [docVerifyState, setDocVerifyState] = useState([
    { id: 'DOC-120', citizen: 'Rajesh Sharma', docType: 'Aadhaar Card', ocrName: 'RAJESH KUMAR SHARMA', ocrNo: '5420-1100-9012', status: 'Pending Review' },
    { id: 'DOC-125', citizen: 'Sunita Verma', docType: 'PAN Card', ocrName: 'SUNITA VERMA', ocrNo: 'BPWPV9010A', status: 'Verified' }
  ]);

  useEffect(() => {
    const authStatus = localStorage.getItem('sb-admin-session') === 'true';
    if (authStatus) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    if (!username || !password) {
      return toast.error('Please enter all fields');
    }

    setLoading(true);
    setTimeout(() => {
      if (username === 'akshay' && password === 'akshay123') {
        setIsLoggedIn(true);
        localStorage.setItem('sb-admin-session', 'true');
        toast.success('Access Granted! Welcome Akshay.');
      } else {
        toast.error('Invalid credentials. Access Denied.');
      }
      setLoading(false);
    }, 1200);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('sb-admin-session');
    toast.success('Securely Logged Out');
  };

  // Add user function
  const handleCreateUser = (e) => {
    e.preventDefault();
    if (!newUser.name || !newUser.email || !newUser.phone) {
      return toast.error('Please fill required fields');
    }
    const createdUser = {
      id: `U-${Math.floor(1000 + Math.random() * 9000)}`,
      name: newUser.name,
      email: newUser.email,
      phone: newUser.phone,
      aadhaar: 'XXXX-XXXX-' + Math.floor(1000 + Math.random() * 9000),
      state: newUser.state || 'Maharashtra',
      district: newUser.district || 'Mumbai',
      city: newUser.district || 'Mumbai',
      language: 'English',
      regDate: new Date().toISOString().split('T')[0],
      lastLogin: new Date().toISOString().split('T')[0],
      chats: 0,
      complaints: 0,
      apps: 0,
      status: newUser.status
    };
    setUsers([createdUser, ...users]);
    setNewUser({ name: '', email: '', phone: '', state: '', district: '', status: 'Active' });
    setIsAddUserOpen(false);
    toast.success('User registered successfully');

    // Add Audit Log
    setAudits([
      { time: new Date().toTimeString().split(' ')[0], user: 'akshay', action: 'CREATE_USER_PROFILE', module: 'User Management', ip: '192.168.1.45' },
      ...audits
    ]);
  };

  // Change user status
  const handleToggleUserStatus = (userId, newStatus) => {
    setUsers(users.map(u => u.id === userId ? { ...u, status: newStatus } : u));
    toast.success(`User state changed to ${newStatus}`);
  };

  // Verify Document
  const handleVerifyDoc = (docId, approve) => {
    setDocVerifyState(docVerifyState.map(d => d.id === docId ? { ...d, status: approve ? 'Verified' : 'Rejected' } : d));
    toast.success(approve ? 'Document approved successfully' : 'Document rejected');
  };

  // Resolve Complaint
  const handleResolveComplaint = (compId) => {
    setComplaints(complaints.map(c => c.id === compId ? { ...c, status: 'Resolved' } : c));
    toast.success('Complaint status updated to Resolved');
  };

  // Broadcast push notifications
  const handleSendAlert = (e) => {
    e.preventDefault();
    if (!systemAlert.message) return toast.error('Enter message to broadcast');
    toast.success(`Emergency alert dispatched to: ${systemAlert.target}`);
    setSystemAlert({ target: 'All', message: '', type: 'Info' });
  };

  // Export/Import mock
  const handleExportData = () => {
    toast.success('System report compiled to Excel (smart_bharat_report.xlsx)');
  };

  // Admin portal module options
  const MODULES = [
    { id: 'dashboard', label: 'Admin Console', icon: LayoutDashboard },
    { id: 'users', label: 'User Directory', icon: Users },
    { id: 'departments', label: 'Govt Departments', icon: Building2 },
    { id: 'complaints', label: 'Complaint Queue', icon: AlertTriangle },
    { id: 'services', label: 'Services & Schemes', icon: Gift },
    { id: 'documents', label: 'OCR Verification', icon: FolderKanban },
    { id: 'support', label: 'Alert & Support Center', icon: Bell },
    { id: 'audits', label: 'Logs & Security', icon: ShieldAlert },
  ];

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#040916] px-4 relative overflow-hidden">
        {/* Neon Backdrop blobs */}
        <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] rounded-full bg-primary-900/10 blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-accent-950/10 blur-[120px]" />
        <div className="absolute inset-0 opacity-[0.02]" 
             style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)', backgroundSize: '30px 30px' }} />

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md relative z-10"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-primary-500 to-accent rounded-3xl blur-[2px] opacity-20 -z-10" />
          <div className="glass-card p-8 md:p-10 border border-white/10 shadow-2xl relative bg-[#090d23]/80 backdrop-blur-3xl rounded-3xl">
            
            <div className="flex flex-col items-center mb-8">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-600 to-accent flex items-center justify-center shadow-lg border border-white/15 mb-4 glow-primary">
                <Shield size={32} className="text-white animate-pulse" />
              </div>
              <h2 className="text-2xl font-bold font-display text-white text-center">
                Smart Bharat <span className="gradient-text">Admin</span> Portal
              </h2>
              <p className="text-slate-400 text-xs mt-1 tracking-widest uppercase">
                Restricted Access Gate
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-5">
              <div>
                <label className="block text-xs text-slate-400 font-medium mb-1.5 pl-1">
                  Username
                </label>
                <div className="relative">
                  <UserIcon size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Enter admin username"
                    className="w-full pl-10 pr-4 py-3 bg-white/[0.03] border border-white/10 rounded-xl text-white text-sm outline-none focus:border-primary-500 transition-all focus:bg-white/[0.05]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs text-slate-400 font-medium mb-1.5 pl-1">
                  Password
                </label>
                <div className="relative">
                  <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter security password"
                    className="w-full pl-10 pr-12 py-3 bg-white/[0.03] border border-white/10 rounded-xl text-white text-sm outline-none focus:border-primary-500 transition-all focus:bg-white/[0.05]"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(p => !p)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              <div className="pt-2">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 bg-gradient-to-r from-primary-600 to-accent text-white font-semibold rounded-xl shadow-lg shadow-primary-950/50 hover:brightness-110 active:brightness-95 transition-all text-sm flex items-center justify-center gap-2 font-display"
                >
                  {loading ? (
                    <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      <KeyRound size={16} />
                      Verify Credentials
                    </>
                  )}
                </motion.button>
              </div>
            </form>

            <div className="mt-8 pt-6 border-t border-white/5 flex items-center gap-2 justify-center text-[10px] text-slate-500">
              <Shield size={10} className="text-success" />
              <span>AES-256 Bit Secure Connection</span>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex bg-[#040916] text-white overflow-hidden relative">
      {/* Background neon elements */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full bg-primary-800/5 blur-[120px] pointer-events-none" />
      
      {/* ============================================================
          SIDEBAR NAVIGATION - ADMIN PORTAL ISOLATION
          ============================================================ */}
      <aside className="w-64 bg-[#090d23] border-r border-white/5 flex flex-col flex-shrink-0 z-20">
        <div className="h-16 flex items-center px-6 border-b border-white/5 gap-3 flex-shrink-0">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-primary-600 to-accent flex items-center justify-center glow-primary">
            <Shield size={16} className="text-white" />
          </div>
          <div className="leading-tight">
            <div className="font-bold text-sm tracking-wide font-display">Smart Bharat</div>
            <div className="text-[10px] text-accent font-semibold uppercase tracking-widest">Admin Control</div>
          </div>
        </div>

        <nav className="flex-1 py-6 px-4 space-y-1.5 overflow-y-auto">
          {MODULES.map((item) => {
            const Icon = item.icon;
            const isSel = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => { setActiveTab(item.id); setSearchQuery(''); }}
                className={`w-full flex items-center gap-3.5 px-4 py-3 rounded-xl text-left text-sm font-medium transition-all ${
                  isSel 
                    ? 'bg-gradient-to-r from-primary-600/20 to-accent/10 border border-primary-500/20 text-white shadow-inner shadow-primary-950/20' 
                    : 'text-slate-400 hover:text-white hover:bg-white/[0.03]'
                }`}
              >
                <Icon size={18} className={isSel ? 'text-accent' : 'text-slate-400'} />
                {item.label}
              </button>
            );
          })}
        </nav>

        <div className="p-4 border-t border-white/5">
          <div className="glass-card p-3 rounded-2xl bg-white/[0.02]">
            <div className="flex items-center gap-2 mb-1">
              <Activity size={12} className="text-success animate-pulse" />
              <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">System Status</span>
            </div>
            <div className="text-[11px] text-slate-300">Uptime: <span className="font-semibold text-white">99.98%</span></div>
            <div className="text-[11px] text-slate-300">Region: <span className="font-semibold text-white">IN-CENTRAL</span></div>
          </div>
        </div>
      </aside>

      {/* ============================================================
          MAIN CONTENT WORKSPACE
          ============================================================ */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden relative z-10">
        
        {/* Workspace Header */}
        <header className="h-16 border-b border-white/5 flex items-center justify-between px-8 bg-[#020617]/50 backdrop-blur-md flex-shrink-0">
          <div className="flex items-center gap-4">
            <h2 className="font-bold text-lg font-display uppercase tracking-wider text-slate-300">
              {MODULES.find(m => m.id === activeTab)?.label}
            </h2>
            <div className="hidden sm:flex items-center gap-2 px-2.5 py-1 rounded-full bg-slate-900 border border-white/5 text-[10px] text-slate-400 font-medium">
              <Zap size={10} className="text-success" /> Live Feed Enabled
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* Admin profile detail */}
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-primary-600 flex items-center justify-center font-bold text-sm border border-white/10 glow-primary">
                A
              </div>
              <div className="hidden md:block leading-tight text-left">
                <div className="text-xs font-semibold text-white">Akshay Admin</div>
                <div className="text-[9px] text-slate-400">akshay@smartbharat.gov.in</div>
              </div>
            </div>

            {/* Logout button */}
            <button 
              onClick={handleLogout}
              className="p-2.5 rounded-xl border border-red-500/20 bg-red-500/5 text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-all"
              title="Logout from admin portal"
            >
              <LogOut size={16} />
            </button>
          </div>
        </header>

        {/* Scrollable Viewport */}
        <div className="flex-1 overflow-y-auto p-8 space-y-8">
          
          <AnimatePresence mode="wait">
            {activeTab === 'dashboard' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-8"
              >
                {/* 1. KEY KPI STATS CARDS */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
                  <div className="stat-card p-5 relative overflow-hidden bg-white/[0.01]">
                    <div className="absolute right-0 top-0 w-24 h-24 bg-primary-600/5 rounded-full blur-2xl" />
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xs text-slate-400 font-medium uppercase tracking-wider">Registered Citizens</span>
                      <Users size={16} className="text-primary-400" />
                    </div>
                    <div className="text-3xl font-bold font-display text-white">1,89,420</div>
                    <p className="text-[10px] text-success flex items-center gap-1 mt-1">
                      <TrendingUp size={10} /> +12% vs last month
                    </p>
                  </div>

                  <div className="stat-card p-5 relative overflow-hidden bg-white/[0.01]">
                    <div className="absolute right-0 top-0 w-24 h-24 bg-success-600/5 rounded-full blur-2xl" />
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xs text-slate-400 font-medium uppercase tracking-wider">AI Chats Today</span>
                      <BrainCircuit size={16} className="text-success" />
                    </div>
                    <div className="text-3xl font-bold font-display text-white">24,891</div>
                    <p className="text-[10px] text-success flex items-center gap-1 mt-1">
                      <TrendingUp size={10} /> +8% vs yesterday
                    </p>
                  </div>

                  <div className="stat-card p-5 relative overflow-hidden bg-white/[0.01]">
                    <div className="absolute right-0 top-0 w-24 h-24 bg-yellow-600/5 rounded-full blur-2xl" />
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xs text-slate-400 font-medium uppercase tracking-wider">Active Complaints</span>
                      <AlertTriangle size={16} className="text-warning" />
                    </div>
                    <div className="text-3xl font-bold font-display text-white">84</div>
                    <p className="text-[10px] text-slate-500 mt-1">87% Resolution rate overall</p>
                  </div>

                  <div className="stat-card p-5 relative overflow-hidden bg-white/[0.01]">
                    <div className="absolute right-0 top-0 w-24 h-24 bg-accent-600/5 rounded-full blur-2xl" />
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xs text-slate-400 font-medium uppercase tracking-wider">Satisfaction Score</span>
                      <CheckSquare size={16} className="text-accent" />
                    </div>
                    <div className="text-3xl font-bold font-display text-white">98.2%</div>
                    <p className="text-[10px] text-success flex items-center gap-1 mt-1">
                      <TrendingUp size={10} /> Excellent rating status
                    </p>
                  </div>
                </div>

                {/* 2. DUAL CHART PLOT ROW */}
                <div className="grid lg:grid-cols-3 gap-6">
                  {/* AI Queries trend */}
                  <div className="glass-card p-6 lg:col-span-2 space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-300">AI Engagement & Service Metrics</h3>
                      <button onClick={handleExportData} className="flex items-center gap-1.5 text-xs text-accent hover:underline">
                        <Download size={12} /> Export Excel
                      </button>
                    </div>
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={DAILY_USAGE_CHART}>
                          <defs>
                            <linearGradient id="colorQueries" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#2563EB" stopOpacity={0.3}/>
                              <stop offset="95%" stopColor="#2563EB" stopOpacity={0}/>
                            </linearGradient>
                          </defs>
                          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                          <XAxis dataKey="day" tick={{ fill: '#64748b', fontSize: 10 }} />
                          <YAxis tick={{ fill: '#64748b', fontSize: 10 }} />
                          <Tooltip contentStyle={{ background: '#090d23', border: '1px solid rgba(255,255,255,0.1)', color: '#fff' }} />
                          <Area type="monotone" dataKey="dayQuery" stroke="#2563EB" fillOpacity={1} fill="url(#colorQueries)" name="Queries Completed" />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  </div>

                  {/* Complaint Breakdown */}
                  <div className="glass-card p-6 flex flex-col justify-between">
                    <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-300 mb-4">Complaint Categories</h3>
                    <div className="flex justify-center mb-4">
                      <PieChart width={160} height={160}>
                        <Pie data={categoryData} cx={75} cy={75} outerRadius={65} dataKey="value" strokeWidth={0}>
                          {categoryData.map((entry, idx) => <Cell key={idx} fill={entry.color} />)}
                        </Pie>
                      </PieChart>
                    </div>
                    <div className="space-y-2 mt-4">
                      {categoryData.map((item) => (
                        <div key={item.name} className="flex items-center justify-between text-xs">
                          <div className="flex items-center gap-2">
                            <div className="w-2.5 h-2.5 rounded-full" style={{ background: item.color }} />
                            <span className="text-slate-400">{item.name}</span>
                          </div>
                          <span className="font-semibold text-white">{item.value}%</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* 3. PLATFORM HEALTH & AI ACCURACY CONTROL */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {/* Platform Cloud Costs */}
                  <div className="glass-card p-5 space-y-4">
                    <div className="flex items-center gap-2">
                      <DollarSign className="text-success" size={18} />
                      <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-300">Cloud Cost Billing</h4>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs text-slate-400">
                        <span>Smart Bharat Civic AI Engine (Local)</span>
                        <span className="text-emerald-400 font-semibold">₹0.00 (Zero Key)</span>
                      </div>
                      <div className="flex justify-between text-xs text-slate-400">
                        <span>Vector Indexing hosting</span>
                        <span className="text-white font-semibold">$89.40</span>
                      </div>
                      <div className="flex justify-between text-xs text-slate-400">
                        <span>Static storage / Media hosting</span>
                        <span className="text-white font-semibold">$12.50</span>
                      </div>
                    </div>
                    <div className="pt-2 border-t border-white/5 flex items-center justify-between text-sm">
                      <span className="font-medium text-slate-300">Estimated Total Cost</span>
                      <span className="font-bold text-accent">$450.02</span>
                    </div>
                  </div>

                  {/* AI Response Accuracy */}
                  <div className="glass-card p-5 space-y-4">
                    <div className="flex items-center gap-2">
                      <BrainCircuit className="text-accent" size={18} />
                      <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-300">AI Response Quality</h4>
                    </div>
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs text-slate-400">
                        <span>Response Confidence Rate</span>
                        <span className="text-success font-semibold">97.8%</span>
                      </div>
                      <div className="h-1.5 bg-white/[0.05] rounded-full overflow-hidden">
                        <div className="h-full bg-success" style={{ width: '97.8%' }} />
                      </div>
                    </div>
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs text-slate-400">
                        <span>Average Latency</span>
                        <span className="text-white font-medium">840ms</span>
                      </div>
                    </div>
                  </div>

                  {/* Quick Action Console */}
                  <div className="glass-card p-5 space-y-4">
                    <div className="flex items-center gap-2">
                      <Sliders className="text-warning" size={18} />
                      <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-300">Quick Actions</h4>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <button onClick={handleExportData} className="p-3 bg-white/[0.03] hover:bg-white/[0.06] rounded-xl text-xs font-semibold flex flex-col items-center justify-center gap-1 text-slate-300 transition-all border border-white/5">
                        <FileText size={16} className="text-accent" />
                        Export Metrics
                      </button>
                      <button onClick={() => { setActiveTab('support'); }} className="p-3 bg-white/[0.03] hover:bg-white/[0.06] rounded-xl text-xs font-semibold flex flex-col items-center justify-center gap-1 text-slate-300 transition-all border border-white/5">
                        <Bell size={16} className="text-warning" />
                        Broadcast Alert
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* ============================================================
                USER MANAGEMENT WORKSPACE
                ============================================================ */}
            {activeTab === 'users' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-6"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-3 bg-white/[0.03] px-3.5 py-2 border border-white/10 rounded-2xl w-full max-w-md">
                    <Search size={16} className="text-slate-500" />
                    <input
                      type="text"
                      placeholder="Search users by name, email or district..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="bg-transparent border-none outline-none text-sm text-white w-full"
                    />
                  </div>
                  
                  <div className="flex gap-2">
                    <select
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value)}
                      className="px-3.5 py-2 bg-white/[0.03] border border-white/10 rounded-xl text-xs text-white outline-none cursor-pointer"
                    >
                      <option value="All" className="bg-[#090d23]">All Accounts</option>
                      <option value="Verified" className="bg-[#090d23]">Verified</option>
                      <option value="Active" className="bg-[#090d23]">Active</option>
                      <option value="Suspended" className="bg-[#090d23]">Suspended</option>
                      <option value="Pending Verification" className="bg-[#090d23]">Pending Verification</option>
                    </select>

                    <button 
                      onClick={() => setIsAddUserOpen(true)}
                      className="btn-primary flex items-center gap-2 text-xs py-2 px-4 rounded-xl"
                    >
                      <Plus size={14} /> Add User
                    </button>
                  </div>
                </div>

                {/* Users Table */}
                <div className="glass-card overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm border-collapse">
                      <thead>
                        <tr className="border-b border-white/5 text-xs text-slate-400 font-semibold bg-white/[0.02]">
                          <th className="p-4">Name</th>
                          <th className="p-4">Phone / ID</th>
                          <th className="p-4">State & District</th>
                          <th className="p-4">Chats</th>
                          <th className="p-4">Account Status</th>
                          <th className="p-4 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {users
                          .filter(u => statusFilter === 'All' || u.status === statusFilter)
                          .filter(u => u.name.toLowerCase().includes(searchQuery.toLowerCase()) || u.state.toLowerCase().includes(searchQuery.toLowerCase()))
                          .map((user) => (
                            <tr key={user.id} className="border-b border-white/5 hover:bg-white/[0.01] transition-all">
                              <td className="p-4">
                                <div className="font-semibold text-white">{user.name}</div>
                                <div className="text-xs text-slate-500">{user.email}</div>
                              </td>
                              <td className="p-4">
                                <div className="text-white text-xs">{user.phone}</div>
                                <div className="text-[10px] text-slate-500 font-mono">{user.id}</div>
                              </td>
                              <td className="p-4">
                                <div className="text-white text-xs">{user.state}</div>
                                <div className="text-[10px] text-slate-500">{user.district}</div>
                              </td>
                              <td className="p-4 font-mono text-xs">{user.chats} chats</td>
                              <td className="p-4">
                                <span className={`badge text-[10px] ${
                                  user.status === 'Verified' ? 'badge-success' :
                                  user.status === 'Active' ? 'badge-primary' :
                                  user.status === 'Suspended' ? 'badge-error' : 'badge-warning'
                                }`}>
                                  {user.status}
                                </span>
                              </td>
                              <td className="p-4 text-right">
                                <div className="flex gap-1.5 justify-end">
                                  <button 
                                    onClick={() => { setSelectedUser(user); setIsDetailUserOpen(true); }}
                                    className="p-1.5 bg-white/[0.03] hover:bg-white/[0.07] border border-white/5 rounded-lg text-slate-400 hover:text-white transition-all text-xs"
                                  >
                                    View
                                  </button>
                                  {user.status !== 'Suspended' ? (
                                    <button 
                                      onClick={() => handleToggleUserStatus(user.id, 'Suspended')}
                                      className="p-1.5 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 hover:bg-red-500/20 transition-all"
                                      title="Suspend Account"
                                    >
                                      <Trash2 size={13} />
                                    </button>
                                  ) : (
                                    <button 
                                      onClick={() => handleToggleUserStatus(user.id, 'Verified')}
                                      className="p-1.5 bg-green-500/10 border border-green-500/20 rounded-lg text-green-400 hover:bg-green-500/20 transition-all"
                                      title="Verify Account"
                                    >
                                      <Check size={13} />
                                    </button>
                                  )}
                                </div>
                              </td>
                            </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </motion.div>
            )}

            {/* ============================================================
                GOVERNMENT DEPARTMENTS WORKSPACE
                ============================================================ */}
            {activeTab === 'departments' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-6"
              >
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {departments.map((dept) => (
                    <div key={dept.id} className="glass-card p-5 space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="w-10 h-10 bg-white/[0.04] border border-white/10 rounded-xl flex items-center justify-center">
                          <Building2 size={20} className="text-accent" />
                        </div>
                        <span className={`badge text-[10px] ${dept.status === 'Excellent' ? 'badge-success' : 'badge-warning'}`}>
                          {dept.status}
                        </span>
                      </div>
                      <div>
                        <h4 className="font-bold text-white tracking-wide text-sm">{dept.name}</h4>
                        <p className="text-xs text-slate-500 mt-0.5">Head: {dept.head}</p>
                      </div>
                      <div className="grid grid-cols-2 gap-2 pt-2 border-t border-white/5 text-xs">
                        <div>
                          <div className="text-slate-500 text-[10px] uppercase">Officers</div>
                          <div className="font-bold text-white mt-0.5">{dept.officers} assigned</div>
                        </div>
                        <div>
                          <div className="text-slate-500 text-[10px] uppercase">Performance</div>
                          <div className="font-bold text-success mt-0.5">{dept.performance}% SLA</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="glass-card p-6 space-y-4">
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-300">Department Resolution Time Trends</h3>
                  <div className="h-56">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={DEPT_CHART}>
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                        <XAxis dataKey="name" tick={{ fill: '#64748b', fontSize: 10 }} />
                        <YAxis tick={{ fill: '#64748b', fontSize: 10 }} />
                        <Tooltip contentStyle={{ background: '#090d23', border: '1px solid rgba(255,255,255,0.1)' }} />
                        <Bar dataKey="resolved" fill="#22C55E" name="Resolved complaints" />
                        <Bar dataKey="pending" fill="#EF4444" name="Pending complaints" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </motion.div>
            )}

            {/* ============================================================
                COMPLAINT QUEUE & AI REVIEW
                ============================================================ */}
            {activeTab === 'complaints' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-6"
              >
                <div className="grid lg:grid-cols-3 gap-6">
                  {complaints.map((comp) => (
                    <div key={comp.id} className="glass-card overflow-hidden bg-white/[0.01]">
                      <div className="h-36 overflow-hidden relative border-b border-white/5">
                        <img src={comp.img} alt="Pothole" className="w-full h-full object-cover" />
                        <div className="absolute top-3 right-3 badge badge-error text-[10px] font-bold">
                          AI Match: {comp.confScore}%
                        </div>
                      </div>
                      <div className="p-5 space-y-4">
                        <div>
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-slate-400 font-semibold">{comp.category}</span>
                            <span className={`badge text-[9px] ${comp.status === 'Resolved' ? 'badge-success' : 'badge-warning'}`}>
                              {comp.status}
                            </span>
                          </div>
                          <h4 className="font-bold text-white mt-1 text-sm">{comp.loc}</h4>
                          <p className="text-[10px] text-slate-500 mt-1">Submitted by: {comp.citizen}</p>
                        </div>

                        <div className="text-xs text-slate-400 leading-tight">
                          Assigned Inspector: <span className="font-semibold text-white">{comp.officer}</span>
                        </div>

                        {comp.status !== 'Resolved' && (
                          <div className="flex gap-2 pt-2 border-t border-white/5">
                            <button 
                              onClick={() => handleResolveComplaint(comp.id)}
                              className="flex-1 py-2 bg-success text-white font-semibold text-xs rounded-xl shadow-md shadow-success-950/20 hover:brightness-105 transition-all"
                            >
                              Approve Resolution
                            </button>
                            <button 
                              onClick={() => toast.success('Complaint escalated to Senior Officer')}
                              className="px-3 py-2 bg-white/[0.03] hover:bg-white/[0.06] border border-white/10 text-xs font-semibold rounded-xl text-slate-300 transition-all"
                            >
                              Escalate
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* ============================================================
                SERVICES & SCHEMES DATABASE
                ============================================================ */}
            {activeTab === 'services' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-6"
              >
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Service database config */}
                  <div className="glass-card p-6 space-y-4">
                    <div className="flex items-center justify-between border-b border-white/5 pb-3">
                      <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-300">Public Services</h3>
                      <button onClick={() => toast.success('Add Service Modal opened')} className="flex items-center gap-1.5 text-xs text-accent hover:underline">
                        <Plus size={14} /> Add Service
                      </button>
                    </div>
                    <div className="space-y-3">
                      {services.map(s => (
                        <div key={s.id} className="flex items-center justify-between p-3.5 bg-white/[0.02] border border-white/5 rounded-xl">
                          <div>
                            <div className="font-semibold text-white text-xs">{s.name}</div>
                            <div className="text-[10px] text-slate-500 mt-0.5">{s.dept} · Fee: {s.fee}</div>
                          </div>
                          <span className={`badge text-[9px] ${s.status === 'Published' ? 'badge-success' : 'badge-warning'}`}>
                            {s.status}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Schemes config */}
                  <div className="glass-card p-6 space-y-4">
                    <div className="flex items-center justify-between border-b border-white/5 pb-3">
                      <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-300">Govt Benefits Schemes</h3>
                      <button onClick={() => toast.success('Add Scheme Modal opened')} className="flex items-center gap-1.5 text-xs text-accent hover:underline">
                        <Plus size={14} /> Add Scheme
                      </button>
                    </div>
                    <div className="space-y-3">
                      {schemes.map(sch => (
                        <div key={sch.id} className="flex items-center justify-between p-3.5 bg-white/[0.02] border border-white/5 rounded-xl">
                          <div>
                            <div className="font-semibold text-white text-xs">{sch.name}</div>
                            <div className="text-[10px] text-slate-500 mt-0.5">{sch.cat} · Benefit: {sch.benefits}</div>
                          </div>
                          <span className={`badge text-[9px] ${sch.status === 'Published' ? 'badge-success' : 'badge-warning'}`}>
                            {sch.status}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* ============================================================
                DOCUMENT OCR VERIFICATION
                ============================================================ */}
            {activeTab === 'documents' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-6"
              >
                <div className="grid md:grid-cols-2 gap-6">
                  {docVerifyState.map((doc) => (
                    <div key={doc.id} className="glass-card p-6 space-y-5 bg-white/[0.01]">
                      <div className="flex items-center justify-between border-b border-white/5 pb-3">
                        <div>
                          <span className="badge badge-primary text-[9px] uppercase tracking-wider">{doc.docType}</span>
                          <h4 className="font-bold text-white text-xs mt-1">Submitted by: {doc.citizen}</h4>
                        </div>
                        <span className={`badge text-[10px] ${
                          doc.status === 'Verified' ? 'badge-success' :
                          doc.status === 'Rejected' ? 'badge-error' : 'badge-warning'
                        }`}>
                          {doc.status}
                        </span>
                      </div>
                      
                      <div className="space-y-2 bg-white/[0.02] p-4 rounded-xl border border-white/5 font-mono text-xs text-slate-300">
                        <div className="flex justify-between">
                          <span>OCR Name:</span>
                          <span className="text-white font-semibold">{doc.ocrName}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>OCR Identity No:</span>
                          <span className="text-white font-semibold">{doc.ocrNo}</span>
                        </div>
                      </div>

                      {doc.status === 'Pending Review' && (
                        <div className="flex gap-2">
                          <button 
                            onClick={() => handleVerifyDoc(doc.id, true)}
                            className="flex-1 py-2 bg-success text-white font-semibold text-xs rounded-xl shadow-md hover:brightness-105 transition-all"
                          >
                            Approve
                          </button>
                          <button 
                            onClick={() => handleVerifyDoc(doc.id, false)}
                            className="px-4 py-2 bg-red-500/10 border border-red-500/20 text-xs font-semibold rounded-xl text-red-400 hover:bg-red-500/20 transition-all"
                          >
                            Reject
                          </button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* ============================================================
                SUPPORT & ALERT CENTER (BROADCAST MESSAGE)
                ============================================================ */}
            {activeTab === 'support' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="grid md:grid-cols-2 gap-6"
              >
                {/* Broadcast message form */}
                <form onSubmit={handleSendAlert} className="glass-card p-6 space-y-5">
                  <div className="border-b border-white/5 pb-3">
                    <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-300">Broadcast System Alert</h3>
                    <p className="text-[11px] text-slate-500 mt-0.5">Send a real-time notification to registered user devices</p>
                  </div>
                  <div>
                    <label className="block text-xs text-slate-400 font-medium mb-1.5">Target Audience</label>
                    <select 
                      value={systemAlert.target}
                      onChange={(e) => setSystemAlert({ ...systemAlert, target: e.target.value })}
                      className="w-full p-3 bg-white/[0.03] border border-white/10 rounded-xl text-sm text-white outline-none focus:border-primary-500 transition-all"
                    >
                      <option value="All" className="bg-[#090d23]">All Users</option>
                      <option value="Maharashtra" className="bg-[#090d23]">Maharashtra State</option>
                      <option value="Karnataka" className="bg-[#090d23]">Karnataka State</option>
                      <option value="Delhi" className="bg-[#090d23]">Delhi NCT</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs text-slate-400 font-medium mb-1.5">Alert Priority</label>
                    <div className="flex gap-2">
                      {['Info', 'Warning', 'Emergency'].map(p => (
                        <button
                          key={p}
                          type="button"
                          onClick={() => setSystemAlert({ ...systemAlert, type: p })}
                          className={`flex-1 py-2 px-3 rounded-lg text-xs font-semibold border transition-all ${
                            systemAlert.type === p 
                              ? p === 'Emergency' ? 'bg-red-600 border-red-500 text-white shadow-lg shadow-red-950/20' 
                                : p === 'Warning' ? 'bg-yellow-600 border-yellow-500 text-white shadow-lg'
                                : 'bg-primary-600 border-primary-500 text-white shadow-lg'
                              : 'bg-white/[0.02] border-white/10 text-slate-400 hover:text-white'
                          }`}
                        >
                          {p}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs text-slate-400 font-medium mb-1.5">Broadcast Message</label>
                    <textarea 
                      rows="3"
                      value={systemAlert.message}
                      onChange={(e) => setSystemAlert({ ...systemAlert, message: e.target.value })}
                      placeholder="Type the message to push..."
                      className="w-full p-3.5 bg-white/[0.03] border border-white/10 rounded-xl text-sm text-white outline-none focus:border-primary-500 transition-all focus:bg-white/[0.05]"
                    />
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    className="w-full py-3 bg-gradient-to-r from-primary-600 to-accent text-white font-semibold rounded-xl text-xs flex items-center justify-center gap-2"
                  >
                    <Send size={13} />
                    Dispatch Emergency Alert
                  </motion.button>
                </form>

                {/* Support CRM Queue */}
                <div className="glass-card p-6 space-y-4">
                  <div className="border-b border-white/5 pb-3">
                    <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-300">Live Support CRM</h3>
                    <p className="text-[11px] text-slate-500 mt-0.5">Active callback requests & AI handovers</p>
                  </div>
                  <div className="space-y-3">
                    {[
                      { name: 'Karthik Pillai', issue: 'Passport Appointment Slot delay', time: '12m ago', state: 'Assigned Support' },
                      { name: 'Raju Naidu', issue: 'Aadhaar Biometric Update query', time: '40m ago', state: 'AI Resolved' }
                    ].map((tick, i) => (
                      <div key={i} className="p-3.5 bg-white/[0.02] border border-white/5 rounded-xl text-xs space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="font-semibold text-white">{tick.name}</span>
                          <span className="text-[10px] text-slate-500">{tick.time}</span>
                        </div>
                        <p className="text-slate-400 leading-snug">{tick.issue}</p>
                        <div className="flex justify-between pt-1 text-[10px]">
                          <span className="text-accent font-semibold">{tick.state}</span>
                          <button onClick={() => toast.success('Agent joined active session')} className="text-success hover:underline font-semibold">Join Chat</button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {/* ============================================================
                AUDIT LOGS & SYSTEM STABILITY
                ============================================================ */}
            {activeTab === 'audits' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-6"
              >
                <div className="glass-card p-5 space-y-4 bg-white/[0.01]">
                  <div className="flex items-center justify-between border-b border-white/5 pb-3">
                    <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-300">System Security Audit Logs</h3>
                    <button onClick={handleExportData} className="flex items-center gap-1.5 text-xs text-accent hover:underline">
                      <Download size={12} /> Export Excel logs
                    </button>
                  </div>
                  <div className="space-y-3">
                    {audits.map((item, i) => (
                      <div key={i} className="flex items-center justify-between p-3.5 bg-white/[0.02] border border-white/5 rounded-xl font-mono text-xs">
                        <div className="flex gap-4 items-center">
                          <span className="text-slate-500">{item.time}</span>
                          <span className="text-accent font-semibold">{item.user}</span>
                          <span className="text-white">{item.action}</span>
                        </div>
                        <div className="flex gap-4 items-center">
                          <span className="badge badge-primary text-[9px]">{item.module}</span>
                          <span className="text-slate-500 text-[10px]">{item.ip}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </main>

      {/* ============================================================
          USER REGISTRATION FORM MODAL Dialog
          ============================================================ */}
      <AnimatePresence>
        {isAddUserOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="w-full max-w-md glass bg-[#090d23] border border-white/10 rounded-2xl p-6 relative"
            >
              <button 
                onClick={() => setIsAddUserOpen(false)}
                className="absolute top-4 right-4 text-slate-400 hover:text-white"
              >
                <X size={18} />
              </button>
              
              <h3 className="text-lg font-bold font-display text-white mb-6">Create New User Profile</h3>
              
              <form onSubmit={handleCreateUser} className="space-y-4">
                <div>
                  <label className="block text-xs text-slate-400 font-medium mb-1.5">Full Name</label>
                  <input
                    type="text"
                    required
                    value={newUser.name}
                    onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                    placeholder="Enter full name"
                    className="w-full p-2.5 bg-white/[0.03] border border-white/10 rounded-xl text-white text-xs outline-none focus:border-primary-500"
                  />
                </div>

                <div>
                  <label className="block text-xs text-slate-400 font-medium mb-1.5">Email Address</label>
                  <input
                    type="email"
                    required
                    value={newUser.email}
                    onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                    placeholder="Enter email address"
                    className="w-full p-2.5 bg-white/[0.03] border border-white/10 rounded-xl text-white text-xs outline-none focus:border-primary-500"
                  />
                </div>

                <div>
                  <label className="block text-xs text-slate-400 font-medium mb-1.5">Phone Number</label>
                  <input
                    type="tel"
                    required
                    value={newUser.phone}
                    onChange={(e) => setNewUser({ ...newUser, phone: e.target.value })}
                    placeholder="+91 XXXXX XXXXX"
                    className="w-full p-2.5 bg-white/[0.03] border border-white/10 rounded-xl text-white text-xs outline-none focus:border-primary-500"
                  />
                </div>

                <div>
                  <label className="block text-xs text-slate-400 font-medium mb-1.5">State</label>
                  <input
                    type="text"
                    value={newUser.state}
                    onChange={(e) => setNewUser({ ...newUser, state: e.target.value })}
                    placeholder="Maharashtra, Telangana, Delhi etc."
                    className="w-full p-2.5 bg-white/[0.03] border border-white/10 rounded-xl text-white text-xs outline-none focus:border-primary-500"
                  />
                </div>

                <div>
                  <label className="block text-xs text-slate-400 font-medium mb-1.5">Account Status</label>
                  <select
                    value={newUser.status}
                    onChange={(e) => setNewUser({ ...newUser, status: e.target.value })}
                    className="w-full p-2.5 bg-white/[0.03] border border-white/10 rounded-xl text-xs text-white outline-none cursor-pointer"
                  >
                    <option value="Active" className="bg-[#090d23]">Active</option>
                    <option value="Verified" className="bg-[#090d23]">Verified</option>
                    <option value="Pending Verification" className="bg-[#090d23]">Pending Verification</option>
                  </select>
                </div>

                <div className="pt-2 flex gap-3">
                  <button 
                    type="submit" 
                    className="flex-1 py-2.5 bg-gradient-to-r from-primary-600 to-accent text-white font-semibold text-xs rounded-xl shadow-lg hover:brightness-105"
                  >
                    Save User Profile
                  </button>
                  <button 
                    type="button" 
                    onClick={() => setIsAddUserOpen(false)}
                    className="px-4 py-2.5 bg-white/[0.03] hover:bg-white/[0.07] border border-white/10 text-xs font-semibold rounded-xl text-slate-300"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ============================================================
          USER PROFILE DETAILS MODAL Dialog
          ============================================================ */}
      <AnimatePresence>
        {isDetailUserOpen && selectedUser && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="w-full max-w-lg glass bg-[#090d23] border border-white/10 rounded-2xl p-6 relative"
            >
              <button 
                onClick={() => { setSelectedUser(null); setIsDetailUserOpen(false); }}
                className="absolute top-4 right-4 text-slate-400 hover:text-white"
              >
                <X size={18} />
              </button>
              
              <h3 className="text-lg font-bold font-display text-white mb-6">Citizen Profile Details</h3>

              <div className="grid grid-cols-2 gap-4 text-xs">
                <div>
                  <span className="text-slate-500">Full Name</span>
                  <div className="font-semibold text-white text-sm mt-0.5">{selectedUser.name}</div>
                </div>
                <div>
                  <span className="text-slate-500">Aadhaar (Masked)</span>
                  <div className="font-semibold text-white mt-0.5">{selectedUser.aadhaar}</div>
                </div>
                <div>
                  <span className="text-slate-500">Email Address</span>
                  <div className="font-semibold text-white mt-0.5">{selectedUser.email}</div>
                </div>
                <div>
                  <span className="text-slate-500">Phone Number</span>
                  <div className="font-semibold text-white mt-0.5">{selectedUser.phone}</div>
                </div>
                <div>
                  <span className="text-slate-500">State / City</span>
                  <div className="font-semibold text-white mt-0.5">{selectedUser.state} / {selectedUser.city}</div>
                </div>
                <div>
                  <span className="text-slate-500">Registration Date</span>
                  <div className="font-semibold text-white mt-0.5">{selectedUser.regDate}</div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2 mt-6 pt-6 border-t border-white/5 text-center text-xs">
                <div className="bg-white/[0.02] p-2.5 rounded-xl border border-white/5">
                  <div className="text-[10px] text-slate-500">AI Chats</div>
                  <div className="font-bold text-white mt-0.5">{selectedUser.chats}</div>
                </div>
                <div className="bg-white/[0.02] p-2.5 rounded-xl border border-white/5">
                  <div className="text-[10px] text-slate-500">Complaints</div>
                  <div className="font-bold text-white mt-0.5">{selectedUser.complaints}</div>
                </div>
                <div className="bg-white/[0.02] p-2.5 rounded-xl border border-white/5">
                  <div className="text-[10px] text-slate-500">Applications</div>
                  <div className="font-bold text-white mt-0.5">{selectedUser.apps}</div>
                </div>
              </div>

              <div className="mt-6 flex justify-end gap-2">
                <button 
                  onClick={() => { setSelectedUser(null); setIsDetailUserOpen(false); }}
                  className="px-4 py-2 bg-white/[0.03] hover:bg-white/[0.07] border border-white/10 text-xs font-semibold rounded-xl text-slate-300"
                >
                  Close Details
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
