import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useImageJobs } from '../../context/ImageJobContext';
import { formatDate, formatCurrency } from '../../utils/formatters';
import { ShieldAlert, Users, CreditCard, Image as ImageIcon, AlertTriangle, Search, CheckCircle2, RefreshCw } from 'lucide-react';
import { useToast } from '../../context/ToastContext';

export const AdminDashboard: React.FC = () => {
  const { user, isAdmin } = useAuth();
  const { jobs } = useImageJobs();
  const { showToast } = useToast();
  const [activeTab, setActiveTab] = useState<'users' | 'jobs' | 'subscriptions'>('users');
  const [searchQuery, setSearchQuery] = useState('');

  if (!isAdmin) {
    return (
      <div className="max-w-md mx-auto py-20 text-center space-y-4">
        <div className="w-12 h-12 rounded-2xl bg-rose-500/20 text-rose-400 flex items-center justify-center mx-auto">
          <ShieldAlert className="w-6 h-6" />
        </div>
        <h2 className="text-xl font-bold text-white">Access Denied</h2>
        <p className="text-xs text-[#A1A1AA]">
          You do not have administrative privileges to access this area.
        </p>
      </div>
    );
  }

  // Mock Admin Tables Data in INR
  const mockUsers = [
    { id: 'usr-1', name: 'Alex Morgan', email: 'alex.creator@clippix.ai', plan: 'pro', credits: 24, status: 'active', joined: '2026-08-15' },
    { id: 'usr-2', name: 'Sarah Jenkins', email: 'sarah@studioart.com', plan: 'business', credits: 940, status: 'active', joined: '2026-09-01' },
    { id: 'usr-3', name: 'David Miller', email: 'david@ecommerce.io', plan: 'free', credits: 4, status: 'active', joined: '2026-09-10' },
    { id: 'usr-4', name: 'Elena Rostova', email: 'elena@design.co', plan: 'pro', credits: 180, status: 'active', joined: '2026-09-12' },
  ];

  const mockSubscriptions = [
    { id: 'sub-901', user: 'sarah@studioart.com', plan: 'Business Annual', amount: 17988, status: 'paid', razorpayId: 'pay_sub_8831' },
    { id: 'sub-902', user: 'alex.creator@clippix.ai', plan: 'Pro Monthly', amount: 499, status: 'paid', razorpayId: 'pay_sub_8832' },
    { id: 'sub-903', user: 'elena@design.co', plan: 'Pro Monthly', amount: 499, status: 'paid', razorpayId: 'pay_sub_8833' },
  ];

  const handleRetryJob = (jobId: string) => {
    showToast('Job Requeued', `Image job ${jobId} sent for AI reprocessing.`, 'info');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10 pb-20">
      {/* Admin Header */}
      <div className="border-b border-[#27272A] pb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-500/40 text-xs font-bold text-amber-300 mb-2">
            <ShieldAlert className="w-3.5 h-3.5" />
            Platform Control Console
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-white">Admin Dashboard</h1>
        </div>

        <span className="text-xs text-[#A1A1AA] bg-[#18181B] px-3 py-1.5 rounded-xl border border-[#27272A]">
          Signed in as Administrator
        </span>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        <div className="p-6 rounded-3xl bg-[#18181B] border border-[#27272A] space-y-2">
          <div className="flex justify-between items-center text-[#A1A1AA]">
            <span className="text-xs font-bold uppercase">Total Users</span>
            <Users className="w-4 h-4 text-[#A78BFA]" />
          </div>
          <p className="text-3xl font-extrabold text-white">1,482</p>
          <span className="text-[10px] text-emerald-400 font-semibold">+12% this week</span>
        </div>

        <div className="p-6 rounded-3xl bg-[#18181B] border border-[#27272A] space-y-2">
          <div className="flex justify-between items-center text-[#A1A1AA]">
            <span className="text-xs font-bold uppercase">Active Subs</span>
            <CreditCard className="w-4 h-4 text-[#3B82F6]" />
          </div>
          <p className="text-3xl font-extrabold text-white">418</p>
          <span className="text-[10px] text-emerald-400 font-semibold">Pro & Business Tiers</span>
        </div>

        <div className="p-6 rounded-3xl bg-[#18181B] border border-[#27272A] space-y-2">
          <div className="flex justify-between items-center text-[#A1A1AA]">
            <span className="text-xs font-bold uppercase">Monthly Revenue</span>
            <span className="text-xs text-emerald-400 font-extrabold">₹</span>
          </div>
          <p className="text-3xl font-extrabold text-white">₹2,48,900</p>
          <span className="text-[10px] text-[#22D3EE] font-semibold">Processed via Razorpay</span>
        </div>

        <div className="p-6 rounded-3xl bg-[#18181B] border border-[#27272A] space-y-2">
          <div className="flex justify-between items-center text-[#A1A1AA]">
            <span className="text-xs font-bold uppercase">Total Jobs</span>
            <ImageIcon className="w-4 h-4 text-[#22D3EE]" />
          </div>
          <p className="text-3xl font-extrabold text-white">38,910</p>
          <span className="text-[10px] text-[#A78BFA] font-semibold">99.8% Success Rate</span>
        </div>
      </div>

      {/* Admin Tabs & Search */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 bg-[#18181B] p-1.5 rounded-2xl border border-[#27272A]">
          <button
            onClick={() => setActiveTab('users')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'users' ? 'bg-[#7C3AED] text-white shadow-md' : 'text-[#A1A1AA] hover:text-white'
            }`}
          >
            Users Management
          </button>
          <button
            onClick={() => setActiveTab('jobs')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'jobs' ? 'bg-[#7C3AED] text-white shadow-md' : 'text-[#A1A1AA] hover:text-white'
            }`}
          >
            Image Jobs ({jobs.length})
          </button>
          <button
            onClick={() => setActiveTab('subscriptions')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'subscriptions' ? 'bg-[#7C3AED] text-white shadow-md' : 'text-[#A1A1AA] hover:text-white'
            }`}
          >
            Razorpay Revenue
          </button>
        </div>

        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-[#71717A] absolute left-3.5 top-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search records..."
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-[#18181B] border border-[#27272A] text-white text-xs focus:border-[#7C3AED]"
          />
        </div>
      </div>

      {/* Tab 1: Users */}
      {activeTab === 'users' && (
        <div className="rounded-3xl bg-[#18181B] border border-[#27272A] p-6 space-y-4">
          <h3 className="text-base font-bold text-white">Registered Platform Users</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-[#27272A] text-[#A1A1AA]">
                  <th className="py-3 px-4 font-bold uppercase">Name</th>
                  <th className="py-3 px-4 font-bold uppercase">Email</th>
                  <th className="py-3 px-4 font-bold uppercase">Plan</th>
                  <th className="py-3 px-4 font-bold uppercase">Credits</th>
                  <th className="py-3 px-4 font-bold uppercase">Joined Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#27272A] text-[#F4F4F5]">
                {mockUsers.map((u) => (
                  <tr key={u.id}>
                    <td className="py-3.5 px-4 font-bold">{u.name}</td>
                    <td className="py-3.5 px-4 text-[#A1A1AA]">{u.email}</td>
                    <td className="py-3.5 px-4">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-[#7C3AED]/20 text-[#A78BFA]">
                        {u.plan}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 font-semibold text-emerald-400">{u.credits}</td>
                    <td className="py-3.5 px-4 text-[#71717A]">{u.joined}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 2: Image Jobs */}
      {activeTab === 'jobs' && (
        <div className="rounded-3xl bg-[#18181B] border border-[#27272A] p-6 space-y-4">
          <h3 className="text-base font-bold text-white">All Processing Image Jobs</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-[#27272A] text-[#A1A1AA]">
                  <th className="py-3 px-4 font-bold uppercase">Job ID</th>
                  <th className="py-3 px-4 font-bold uppercase">File Name</th>
                  <th className="py-3 px-4 font-bold uppercase">Status</th>
                  <th className="py-3 px-4 font-bold uppercase">Processing Time</th>
                  <th className="py-3 px-4 font-bold uppercase text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#27272A] text-[#F4F4F5]">
                {jobs.map((j) => (
                  <tr key={j.id}>
                    <td className="py-3.5 px-4 text-[#71717A] font-mono">{j.id}</td>
                    <td className="py-3.5 px-4 font-bold">{j.fileName}</td>
                    <td className="py-3.5 px-4">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-emerald-500/20 text-emerald-400">
                        {j.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-[#A1A1AA]">{j.processingTimeMs || 1200} ms</td>
                    <td className="py-3.5 px-4 text-right">
                      <button
                        onClick={() => handleRetryJob(j.id)}
                        className="px-2.5 py-1 rounded bg-[#27272A] text-xs font-semibold text-[#A78BFA] hover:text-white flex items-center gap-1 ml-auto"
                      >
                        <RefreshCw className="w-3 h-3" /> Re-run
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 3: Subscriptions */}
      {activeTab === 'subscriptions' && (
        <div className="rounded-3xl bg-[#18181B] border border-[#27272A] p-6 space-y-4">
          <h3 className="text-base font-bold text-white">Razorpay Subscription Log</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-[#27272A] text-[#A1A1AA]">
                  <th className="py-3 px-4 font-bold uppercase">Payment ID</th>
                  <th className="py-3 px-4 font-bold uppercase">User</th>
                  <th className="py-3 px-4 font-bold uppercase">Plan</th>
                  <th className="py-3 px-4 font-bold uppercase">Amount</th>
                  <th className="py-3 px-4 font-bold uppercase">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#27272A] text-[#F4F4F5]">
                {mockSubscriptions.map((s) => (
                  <tr key={s.id}>
                    <td className="py-3.5 px-4 text-[#A78BFA] font-mono">{s.razorpayId}</td>
                    <td className="py-3.5 px-4 font-semibold">{s.user}</td>
                    <td className="py-3.5 px-4 text-[#22D3EE] font-bold">{s.plan}</td>
                    <td className="py-3.5 px-4 font-extrabold text-white">{formatCurrency(s.amount)}</td>
                    <td className="py-3.5 px-4">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-emerald-500/20 text-emerald-400">
                        {s.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
