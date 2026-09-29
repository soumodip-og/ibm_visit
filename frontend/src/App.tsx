import React, { useState } from 'react';
import { 
  Users, 
  Laptop, 
  Plus, 
  Search, 
  Trash2, 
  Edit3, 
  Download, 
  CheckCircle2, 
  Clock, 
  CheckSquare, 
  Briefcase,
  UserCheck,
  Building2,
  Calendar,
  Phone,
  Mail,
  X,
  Sparkles,
  TrendingUp,
  Filter,
  ShieldCheck,
  Tag
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('visitors');
  const [toastMessage, setToastMessage] = useState(null);

  // Helper for quick notifications
  const showNotification = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // ==========================================
  // 1. VISITOR MANAGEMENT STATE & LOGIC
  // ==========================================
  const [visitors, setVisitors] = useState([
    {
      id: '1',
      name: 'Rahul Sharma',
      mobile: '9876543210',
      email: 'rahul.s@techcorp.com',
      company: 'TechCorp Solutions',
      personToMeet: 'Amit Verma (HR)',
      purpose: 'Technical Interview',
      dateTime: '2026-09-28 10:30 AM',
      status: 'Checked In',
    },
    {
      id: '2',
      name: 'Priya Patel',
      mobile: '9123456789',
      email: 'priya@university.edu',
      company: 'ABC University',
      personToMeet: 'Dr. Suresh Kumar',
      purpose: 'Academic Collaboration',
      dateTime: '2026-09-28 11:15 AM',
      status: 'Checked Out',
    },
    {
      id: '3',
      name: 'Vikram Malhotra',
      mobile: '9988776655',
      email: 'vikram@logistics.in',
      company: 'Apex Express',
      personToMeet: 'Rohan Gupta (Ops)',
      purpose: 'Vendor Onboarding',
      dateTime: '2026-09-28 01:00 PM',
      status: 'Checked In',
    }
  ]);

  const [visitorSearch, setVisitorSearch] = useState('');
  const [visitorStatusFilter, setVisitorStatusFilter] = useState('All');
  const [isVisitorModalOpen, setIsVisitorModalOpen] = useState(false);
  const [editingVisitorId, setEditingVisitorId] = useState(null);

  const [visitorForm, setVisitorForm] = useState({
    name: '',
    mobile: '',
    email: '',
    company: '',
    personToMeet: '',
    purpose: '',
    status: 'Checked In',
  });

  const filteredVisitors = visitors.filter((v) => {
    const matchesSearch =
      v.name.toLowerCase().includes(visitorSearch.toLowerCase()) ||
      v.mobile.includes(visitorSearch) ||
      v.company.toLowerCase().includes(visitorSearch.toLowerCase());
    const matchesStatus = visitorStatusFilter === 'All' || v.status === visitorStatusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleVisitorSubmit = (e) => {
    e.preventDefault();
    if (editingVisitorId) {
      setVisitors(
        visitors.map((v) =>
          v.id === editingVisitorId ? { ...v, ...visitorForm } : v
        )
      );
      showNotification('Visitor record updated successfully!');
    } else {
      const newVisitor = {
        ...visitorForm,
        id: Date.now().toString(),
        dateTime: new Date().toLocaleString('en-US', {
          dateStyle: 'medium',
          timeStyle: 'short',
        }),
      };
      setVisitors([newVisitor, ...visitors]);
      showNotification('New visitor checked in!');
    }
    closeVisitorModal();
  };

  const openVisitorModal = (v = null) => {
    if (v) {
      setEditingVisitorId(v.id);
      setVisitorForm({
        name: v.name,
        mobile: v.mobile,
        email: v.email,
        company: v.company,
        personToMeet: v.personToMeet,
        purpose: v.purpose,
        status: v.status,
      });
    } else {
      setEditingVisitorId(null);
      setVisitorForm({
        name: '',
        mobile: '',
        email: '',
        company: '',
        personToMeet: '',
        purpose: '',
        status: 'Checked In',
      });
    }
    setIsVisitorModalOpen(true);
  };

  const closeVisitorModal = () => {
    setIsVisitorModalOpen(false);
    setEditingVisitorId(null);
  };

  const handleDeleteVisitor = (id) => {
    if (window.confirm('Are you sure you want to delete this visitor record?')) {
      setVisitors(visitors.filter((v) => v.id !== id));
      showNotification('Visitor record removed.');
    }
  };

  const exportVisitorsCSV = () => {
    const headers = "ID,Name,Mobile,Email,Company,Person To Meet,Purpose,Date Time,Status\n";
    const rows = visitors.map(v => `${v.id},"${v.name}",${v.mobile},${v.email},"${v.company}","${v.personToMeet}","${v.purpose}","${v.dateTime}",${v.status}`).join("\n");
    const blob = new Blob([headers + rows], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Visitors_${new Date().toISOString().slice(0,10)}.csv`;
    a.click();
    showNotification('CSV exported successfully!');
  };

  // ==========================================
  // 2. IT ASSET MANAGEMENT STATE & LOGIC
  // ==========================================
  const [assets, setAssets] = useState([
    {
      id: 'AST-101',
      name: 'MacBook Pro 16" M3 Max',
      category: 'Laptop',
      brand: 'Apple',
      purchaseDate: '2025-01-15',
      status: 'Assigned',
      assignedEmployee: 'Rahul Sharma',
    },
    {
      id: 'AST-102',
      name: 'Dell UltraSharp 27" 4K Monitor',
      category: 'Monitor',
      brand: 'Dell',
      purchaseDate: '2025-03-10',
      status: 'Available',
      assignedEmployee: '',
    },
    {
      id: 'AST-103',
      name: 'Logitech MX Master 3S',
      category: 'Mouse',
      brand: 'Logitech',
      purchaseDate: '2025-06-20',
      status: 'Assigned',
      assignedEmployee: 'Ananya Roy',
    },
    {
      id: 'AST-104',
      name: 'Keychron K2 Mechanical Keyboard',
      category: 'Keyboard',
      brand: 'Keychron',
      purchaseDate: '2025-08-05',
      status: 'Under Maintenance',
      assignedEmployee: '',
    }
  ]);

  const [assetSearch, setAssetSearch] = useState('');
  const [assetFilter, setAssetFilter] = useState('All');
  const [isAssetModalOpen, setIsAssetModalOpen] = useState(false);
  const [editingAssetId, setEditingAssetId] = useState(null);

  const [assetForm, setAssetForm] = useState({
    id: '',
    name: '',
    category: 'Laptop',
    brand: '',
    purchaseDate: '',
    status: 'Available',
    assignedEmployee: '',
  });

  const filteredAssets = assets.filter((a) => {
    const matchesSearch =
      a.name.toLowerCase().includes(assetSearch.toLowerCase()) ||
      a.id.toLowerCase().includes(assetSearch.toLowerCase()) ||
      a.assignedEmployee.toLowerCase().includes(assetSearch.toLowerCase());
    const matchesFilter = assetFilter === 'All' || a.status === assetFilter;
    return matchesSearch && matchesFilter;
  });

  const handleAssetSubmit = (e) => {
    e.preventDefault();
    if (editingAssetId) {
      setAssets(assets.map((a) => (a.id === editingAssetId ? assetForm : a)));
      showNotification('Asset updated successfully!');
    } else {
      if (assets.some(a => a.id.toLowerCase() === assetForm.id.toLowerCase())) {
        alert('Asset ID must be unique!');
        return;
      }
      setAssets([...assets, assetForm]);
      showNotification('New asset registered!');
    }
    closeAssetModal();
  };

  const openAssetModal = (a = null) => {
    if (a) {
      setEditingAssetId(a.id);
      setAssetForm(a);
    } else {
      setEditingAssetId(null);
      setAssetForm({
        id: `AST-${Math.floor(100 + Math.random() * 900)}`,
        name: '',
        category: 'Laptop',
        brand: '',
        purchaseDate: new Date().toISOString().slice(0,10),
        status: 'Available',
        assignedEmployee: '',
      });
    }
    setIsAssetModalOpen(true);
  };

  const closeAssetModal = () => {
    setIsAssetModalOpen(false);
    setEditingAssetId(null);
  };

  const handleDeleteAsset = (id) => {
    if (window.confirm('Are you sure you want to remove this asset?')) {
      setAssets(assets.filter((a) => a.id !== id));
      showNotification('Asset deleted.');
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 font-sans selection:bg-indigo-500 selection:text-white">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-5 right-5 z-50 flex items-center gap-2 bg-emerald-500 text-slate-950 font-semibold px-4 py-3 rounded-xl shadow-2xl animate-bounce">
          <Sparkles className="w-5 h-5" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Header */}
      <header className="border-b border-slate-800 bg-slate-900/80 backdrop-blur-md sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-indigo-600 rounded-xl shadow-lg shadow-indigo-600/30">
              <ShieldCheck className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-indigo-400 via-sky-400 to-emerald-400 bg-clip-text text-transparent">
                Enterprise Dashboard
              </h1>
              <p className="text-xs text-slate-400">Full Stack MERN Operations Control</p>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex bg-slate-800/80 p-1.5 rounded-2xl border border-slate-700/60 shadow-inner">
            <button
              onClick={() => setActiveTab('visitors')}
              className={`flex items-center gap-2 px-5 py-2.5 text-sm font-semibold rounded-xl transition-all duration-300 ${
                activeTab === 'visitors'
                  ? 'bg-gradient-to-r from-indigo-600 to-indigo-500 text-white shadow-lg shadow-indigo-600/30 scale-102'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-700/40'
              }`}
            >
              <Users className="w-4 h-4" />
              Visitor Management
            </button>
            {/* <button
              onClick={() => setActiveTab('assets')}
              className={`flex items-center gap-2 px-5 py-2.5 text-sm font-semibold rounded-xl transition-all duration-300 ${
                activeTab === 'assets'
                  ? 'bg-gradient-to-r from-indigo-600 to-indigo-500 text-white shadow-lg shadow-indigo-600/30 scale-102'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-700/40'
              }`}
            >
              <Laptop className="w-4 h-4" />
              IT Asset Tracker
            </button> */}
          </div>
        </div>
      </header>

      {/* Main Dashboard Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* ========================================================= */}
        {/* TAB 1: VISITOR MANAGEMENT SYSTEM                          */}
        {/* ========================================================= */}
        {activeTab === 'visitors' && (
          <div className="space-y-6 animate-fadeIn">
            {/* Analytics Dashboard Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              <div className="bg-slate-800/50 border border-slate-700/60 p-5 rounded-2xl backdrop-blur-sm relative overflow-hidden group">
                <div className="absolute right-3 top-3 p-3 bg-indigo-500/10 rounded-2xl text-indigo-400 group-hover:scale-110 transition-transform">
                  <Users className="w-6 h-6" />
                </div>
                <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">Total Visitors</p>
                <div className="flex items-baseline gap-2 mt-2">
                  <span className="text-3xl font-extrabold text-white">{visitors.length}</span>
                  <span className="text-xs text-emerald-400 flex items-center gap-0.5"><TrendingUp className="w-3 h-3" /> Live</span>
                </div>
              </div>

              <div className="bg-slate-800/50 border border-slate-700/60 p-5 rounded-2xl backdrop-blur-sm relative overflow-hidden group">
                <div className="absolute right-3 top-3 p-3 bg-emerald-500/10 rounded-2xl text-emerald-400 group-hover:scale-110 transition-transform">
                  <UserCheck className="w-6 h-6" />
                </div>
                <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">Currently On Premises</p>
                <div className="flex items-baseline gap-2 mt-2">
                  <span className="text-3xl font-extrabold text-emerald-400">
                    {visitors.filter(v => v.status === 'Checked In').length}
                  </span>
                  <span className="text-xs text-slate-400">active guests</span>
                </div>
              </div>

              <div className="bg-slate-800/50 border border-slate-700/60 p-5 rounded-2xl backdrop-blur-sm relative overflow-hidden group">
                <div className="absolute right-3 top-3 p-3 bg-sky-500/10 rounded-2xl text-sky-400 group-hover:scale-110 transition-transform">
                  <Clock className="w-6 h-6" />
                </div>
                <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">Checked Out Today</p>
                <div className="flex items-baseline gap-2 mt-2">
                  <span className="text-3xl font-extrabold text-sky-400">
                    {visitors.filter(v => v.status === 'Checked Out').length}
                  </span>
                  <span className="text-xs text-slate-400">completed visits</span>
                </div>
              </div>
            </div>

            {/* Actions Bar */}
            <div className="flex flex-col md:flex-row justify-between items-stretch md:items-center gap-4 bg-slate-800/40 p-4 rounded-2xl border border-slate-800">
              <div className="flex flex-1 flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <Search className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search visitor name, phone, or company..."
                    value={visitorSearch}
                    onChange={(e) => setVisitorSearch(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-900/90 border border-slate-700 rounded-xl text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <Filter className="w-4 h-4 text-slate-400" />
                  <select
                    value={visitorStatusFilter}
                    onChange={(e) => setVisitorStatusFilter(e.target.value)}
                    className="bg-slate-900 border border-slate-700 rounded-xl px-3 py-2.5 text-sm text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="All">All Statuses</option>
                    <option value="Checked In">Checked In</option>
                    <option value="Checked Out">Checked Out</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={exportVisitorsCSV}
                  className="flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 px-4 py-2.5 rounded-xl text-sm font-semibold transition"
                >
                  <Download className="w-4 h-4" /> Export CSV
                </button>
                <button
                  onClick={() => openVisitorModal()}
                  className="flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-5 py-2.5 rounded-xl text-sm font-semibold shadow-lg shadow-indigo-600/30 transition transform active:scale-95"
                >
                  <Plus className="w-4 h-4" /> New Visitor
                </button>
              </div>
            </div>

            {/* Data Table */}
            <div className="bg-slate-800/50 border border-slate-700/60 rounded-2xl overflow-hidden shadow-xl">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="bg-slate-900/60 text-slate-400 border-b border-slate-700/60 uppercase text-[11px] tracking-wider font-semibold">
                    <tr>
                      <th className="py-4 px-6">Visitor</th>
                      <th className="py-4 px-6">Host & Purpose</th>
                      <th className="py-4 px-6">Company / Org</th>
                      <th className="py-4 px-6">Entry Time</th>
                      <th className="py-4 px-6">Status</th>
                      <th className="py-4 px-6 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-700/40">
                    {filteredVisitors.map((v) => (
                      <tr key={v.id} className="hover:bg-slate-700/20 transition-colors">
                        <td className="py-4 px-6">
                          <div className="font-semibold text-slate-100 flex items-center gap-2">
                            {v.name}
                          </div>
                          <div className="text-xs text-slate-400 flex items-center gap-3 mt-1">
                            <span className="flex items-center gap-1"><Phone className="w-3 h-3 text-slate-500" /> {v.mobile}</span>
                            {v.email && <span className="flex items-center gap-1"><Mail className="w-3 h-3 text-slate-500" /> {v.email}</span>}
                          </div>
                        </td>
                        <td className="py-4 px-6">
                          <div className="text-slate-200 font-medium">{v.personToMeet}</div>
                          <div className="text-xs text-slate-400">{v.purpose || 'General Visit'}</div>
                        </td>
                        <td className="py-4 px-6">
                          <div className="flex items-center gap-1.5 text-slate-300">
                            <Building2 className="w-3.5 h-3.5 text-slate-500" />
                            {v.company || 'Individual'}
                          </div>
                        </td>
                        <td className="py-4 px-6 text-slate-300 text-xs font-mono">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-3.5 h-3.5 text-slate-500" />
                            {v.dateTime}
                          </div>
                        </td>
                        <td className="py-4 px-6">
                          <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${
                            v.status === 'Checked In'
                              ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                              : 'bg-slate-700/50 text-slate-400 border border-slate-600/40'
                          }`}>
                            <span className={`w-1.5 h-1.5 rounded-full ${v.status === 'Checked In' ? 'bg-emerald-400 animate-pulse' : 'bg-slate-500'}`} />
                            {v.status}
                          </span>
                        </td>
                        <td className="py-4 px-6 text-right space-x-2">
                          <button
                            onClick={() => openVisitorModal(v)}
                            className="p-2 text-slate-400 hover:text-indigo-400 hover:bg-slate-700/50 rounded-lg transition"
                            title="Edit"
                          >
                            <Edit3 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteVisitor(v.id)}
                            className="p-2 text-slate-400 hover:text-rose-400 hover:bg-slate-700/50 rounded-lg transition"
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                    {filteredVisitors.length === 0 && (
                      <tr>
                        <td colSpan="6" className="py-12 text-center text-slate-500">
                          No visitor records matched your criteria.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 2: IT ASSET MANAGEMENT SYSTEM                         */}
        {/* ========================================================= */}
        {activeTab === 'assets' && (
          <div className="space-y-6 animate-fadeIn">
            {/* Analytics Dashboard Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              <div className="bg-slate-800/50 border border-slate-700/60 p-5 rounded-2xl backdrop-blur-sm relative overflow-hidden group">
                <div className="absolute right-3 top-3 p-3 bg-indigo-500/10 rounded-2xl text-indigo-400 group-hover:scale-110 transition-transform">
                  <Laptop className="w-6 h-6" />
                </div>
                <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">Total Equipment</p>
                <div className="flex items-baseline gap-2 mt-2">
                  <span className="text-3xl font-extrabold text-white">{assets.length}</span>
                  <span className="text-xs text-slate-400">tracked hardware</span>
                </div>
              </div>

              <div className="bg-slate-800/50 border border-slate-700/60 p-5 rounded-2xl backdrop-blur-sm relative overflow-hidden group">
                <div className="absolute right-3 top-3 p-3 bg-amber-500/10 rounded-2xl text-amber-400 group-hover:scale-110 transition-transform">
                  <Briefcase className="w-6 h-6" />
                </div>
                <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">Assigned to Staff</p>
                <div className="flex items-baseline gap-2 mt-2">
                  <span className="text-3xl font-extrabold text-amber-400">
                    {assets.filter(a => a.status === 'Assigned').length}
                  </span>
                  <span className="text-xs text-slate-400">in active deployment</span>
                </div>
              </div>

              <div className="bg-slate-800/50 border border-slate-700/60 p-5 rounded-2xl backdrop-blur-sm relative overflow-hidden group">
                <div className="absolute right-3 top-3 p-3 bg-emerald-500/10 rounded-2xl text-emerald-400 group-hover:scale-110 transition-transform">
                  <CheckSquare className="w-6 h-6" />
                </div>
                <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">Ready in Inventory</p>
                <div className="flex items-baseline gap-2 mt-2">
                  <span className="text-3xl font-extrabold text-emerald-400">
                    {assets.filter(a => a.status === 'Available').length}
                  </span>
                  <span className="text-xs text-slate-400">available assets</span>
                </div>
              </div>
            </div>

            {/* Actions Bar */}
            <div className="flex flex-col md:flex-row justify-between items-stretch md:items-center gap-4 bg-slate-800/40 p-4 rounded-2xl border border-slate-800">
              <div className="flex flex-1 flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <Search className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search Asset ID, name, or employee..."
                    value={assetSearch}
                    onChange={(e) => setAssetSearch(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-900/90 border border-slate-700 rounded-xl text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <Filter className="w-4 h-4 text-slate-400" />
                  <select
                    value={assetFilter}
                    onChange={(e) => setAssetFilter(e.target.value)}
                    className="bg-slate-900 border border-slate-700 rounded-xl px-3 py-2.5 text-sm text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="All">All Statuses</option>
                    <option value="Available">Available</option>
                    <option value="Assigned">Assigned</option>
                    <option value="Under Maintenance">Under Maintenance</option>
                  </select>
                </div>
              </div>

              <button
                onClick={() => openAssetModal()}
                className="flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-5 py-2.5 rounded-xl text-sm font-semibold shadow-lg shadow-indigo-600/30 transition transform active:scale-95"
              >
                <Plus className="w-4 h-4" /> Add Asset
              </button>
            </div>

            {/* Data Table */}
            <div className="bg-slate-800/50 border border-slate-700/60 rounded-2xl overflow-hidden shadow-xl">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="bg-slate-900/60 text-slate-400 border-b border-slate-700/60 uppercase text-[11px] tracking-wider font-semibold">
                    <tr>
                      <th className="py-4 px-6">Asset ID & Name</th>
                      <th className="py-4 px-6">Category / Brand</th>
                      <th className="py-4 px-6">Assigned To</th>
                      <th className="py-4 px-6">Purchase Date</th>
                      <th className="py-4 px-6">Status</th>
                      <th className="py-4 px-6 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-700/40">
                    {filteredAssets.map((a) => (
                      <tr key={a.id} className="hover:bg-slate-700/20 transition-colors">
                        <td className="py-4 px-6">
                          <div className="font-semibold text-slate-100">{a.name}</div>
                          <div className="text-xs font-mono text-indigo-400 flex items-center gap-1 mt-0.5">
                            <Tag className="w-3 h-3" /> {a.id}
                          </div>
                        </td>
                        <td className="py-4 px-6">
                          <span className="text-slate-200 font-medium">{a.category}</span>
                          <span className="text-xs text-slate-400 block">{a.brand || 'Generic'}</span>
                        </td>
                        <td className="py-4 px-6">
                          {a.assignedEmployee ? (
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium bg-slate-800 text-slate-200 border border-slate-700">
                              <Users className="w-3 h-3 text-indigo-400" />
                              {a.assignedEmployee}
                            </span>
                          ) : (
                            <span className="text-slate-500 italic text-xs">Unassigned</span>
                          )}
                        </td>
                        <td className="py-4 px-6 text-xs text-slate-400 font-mono">
                          {a.purchaseDate || 'N/A'}
                        </td>
                        <td className="py-4 px-6">
                          <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${
                            a.status === 'Available'
                              ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                              : a.status === 'Assigned'
                              ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                              : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                          }`}>
                            <span className={`w-1.5 h-1.5 rounded-full ${
                              a.status === 'Available' ? 'bg-emerald-400' : a.status === 'Assigned' ? 'bg-amber-400' : 'bg-rose-400'
                            }`} />
                            {a.status}
                          </span>
                        </td>
                        <td className="py-4 px-6 text-right space-x-2">
                          <button
                            onClick={() => openAssetModal(a)}
                            className="p-2 text-slate-400 hover:text-indigo-400 hover:bg-slate-700/50 rounded-lg transition"
                            title="Edit"
                          >
                            <Edit3 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteAsset(a.id)}
                            className="p-2 text-slate-400 hover:text-rose-400 hover:bg-slate-700/50 rounded-lg transition"
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                    {filteredAssets.length === 0 && (
                      <tr>
                        <td colspan="6" className="py-12 text-center text-slate-500">
                          No IT assets match your query.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* ========================================================= */}
      {/* MODAL 1: VISITOR FORM MODAL                               */}
      {/* ========================================================= */}
      {isVisitorModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fadeIn">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 w-full max-w-lg shadow-2xl relative">
            <button
              onClick={closeVisitorModal}
              className="absolute top-5 right-5 text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-xl font-bold text-white mb-1">
              {editingVisitorId ? 'Update Visitor Record' : 'Register New Visitor'}
            </h3>
            <p className="text-xs text-slate-400 mb-6">Enter visitor credentials and host details.</p>

            <form onSubmit={handleVisitorSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">Full Name *</label>
                <input
                  type="text"
                  required
                  value={visitorForm.name}
                  onChange={(e) => setVisitorForm({ ...visitorForm, name: e.target.value })}
                  placeholder="e.g. John Doe"
                  className="w-full px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">Mobile *</label>
                  <input
                    type="tel"
                    required
                    value={visitorForm.mobile}
                    onChange={(e) => setVisitorForm({ ...visitorForm, mobile: e.target.value })}
                    placeholder="9876543210"
                    className="w-full px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">Email</label>
                  <input
                    type="email"
                    value={visitorForm.email}
                    onChange={(e) => setVisitorForm({ ...visitorForm, email: e.target.value })}
                    placeholder="john@company.com"
                    className="w-full px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">Company / Org</label>
                  <input
                    type="text"
                    value={visitorForm.company}
                    onChange={(e) => setVisitorForm({ ...visitorForm, company: e.target.value })}
                    placeholder="Tech Corp"
                    className="w-full px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">Host / Person to Meet *</label>
                  <input
                    type="text"
                    required
                    value={visitorForm.personToMeet}
                    onChange={(e) => setVisitorForm({ ...visitorForm, personToMeet: e.target.value })}
                    placeholder="HR / Manager"
                    className="w-full px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">Purpose</label>
                  <input
                    type="text"
                    value={visitorForm.purpose}
                    onChange={(e) => setVisitorForm({ ...visitorForm, purpose: e.target.value })}
                    placeholder="Interview / Meeting"
                    className="w-full px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">Status</label>
                  <select
                    value={visitorForm.status}
                    onChange={(e) => setVisitorForm({ ...visitorForm, status: e.target.value })}
                    className="w-full px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="Checked In">Checked In</option>
                    <option value="Checked Out">Checked Out</option>
                  </select>
                </div>
              </div>

              <div className="pt-4 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={closeVisitorModal}
                  className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-sm font-semibold transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-sm font-semibold shadow-lg shadow-indigo-600/30 transition"
                >
                  {editingVisitorId ? 'Save Changes' : 'Check In Visitor'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* MODAL 2: IT ASSET FORM MODAL                              */}
      {/* ========================================================= */}
      {isAssetModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fadeIn">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 w-full max-w-lg shadow-2xl relative">
            <button
              onClick={closeAssetModal}
              className="absolute top-5 right-5 text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-xl font-bold text-white mb-1">
              {editingAssetId ? 'Edit IT Asset' : 'Register New Asset'}
            </h3>
            <p className="text-xs text-slate-400 mb-6">Manage internal hardware tracking and employee assignments.</p>

            <form onSubmit={handleAssetSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">Asset ID *</label>
                  <input
                    type="text"
                    required
                    disabled={!!editingAssetId}
                    value={assetForm.id}
                    onChange={(e) => setAssetForm({ ...assetForm, id: e.target.value })}
                    placeholder="AST-105"
                    className="w-full px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-50"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">Category *</label>
                  <select
                    value={assetForm.category}
                    onChange={(e) => setAssetForm({ ...assetForm, category: e.target.value })}
                    className="w-full px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="Laptop">Laptop</option>
                    <option value="Monitor">Monitor</option>
                    <option value="Mouse">Mouse</option>
                    <option value="Keyboard">Keyboard</option>
                    <option value="Headphones">Headphones</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">Asset Name *</label>
                <input
                  type="text"
                  required
                  value={assetForm.name}
                  onChange={(e) => setAssetForm({ ...assetForm, name: e.target.value })}
                  placeholder="e.g. MacBook Pro 16 M3"
                  className="w-full px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">Brand</label>
                  <input
                    type="text"
                    value={assetForm.brand}
                    onChange={(e) => setAssetForm({ ...assetForm, brand: e.target.value })}
                    placeholder="Apple, Dell, etc."
                    className="w-full px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">Purchase Date</label>
                  <input
                    type="date"
                    value={assetForm.purchaseDate}
                    onChange={(e) => setAssetForm({ ...assetForm, purchaseDate: e.target.value })}
                    className="w-full px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">Status</label>
                  <select
                    value={assetForm.status}
                    onChange={(e) => setAssetForm({ ...assetForm, status: e.target.value })}
                    className="w-full px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="Available">Available</option>
                    <option value="Assigned">Assigned</option>
                    <option value="Under Maintenance">Under Maintenance</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">Assigned Employee</label>
                  <input
                    type="text"
                    value={assetForm.assignedEmployee}
                    onChange={(e) => setAssetForm({ ...assetForm, assignedEmployee: e.target.value })}
                    placeholder="Employee Name"
                    className="w-full px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>

              <div className="pt-4 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={closeAssetModal}
                  className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-sm font-semibold transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-sm font-semibold shadow-lg shadow-indigo-600/30 transition"
                >
                  {editingAssetId ? 'Save Changes' : 'Register Asset'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}