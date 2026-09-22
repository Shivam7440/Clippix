import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Sparkles,
  History,
  CreditCard,
  User,
  ShieldAlert,
  LogOut,
  SlidersHorizontal,
} from 'lucide-react';
import { Logo } from './Logo';
import { CreditBadge } from './CreditBadge';
import { useAuth } from '../context/AuthContext';

export const Sidebar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, isAdmin, logout } = useAuth();

  const navItems = [
    { label: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { label: 'Remove Background', path: '/remove-background', icon: Sparkles, badge: 'AI' },
    { label: 'History', path: '/history', icon: History },
    { label: 'Billing & Plans', path: '/billing', icon: CreditCard },
    { label: 'Profile', path: '/profile', icon: User },
  ];

  if (isAdmin) {
    navItems.push({ label: 'Admin Dashboard', path: '/admin', icon: ShieldAlert, badge: 'Admin' });
  }

  return (
    <aside className="w-64 bg-[#111113] border-r border-[#27272A] flex flex-col justify-between h-screen sticky top-0 z-30 shrink-0 hidden md:flex">
      {/* Top Header */}
      <div className="p-6">
        <Logo size="sm" />

        {/* Sidebar Nav Links */}
        <nav className="mt-8 space-y-1.5">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = location.pathname === item.path;

            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all duration-200 ${
                  active
                    ? 'bg-gradient-to-r from-[#7C3AED]/20 to-[#3B82F6]/10 text-white border border-[#7C3AED]/40 shadow-sm'
                    : 'text-[#A1A1AA] hover:text-white hover:bg-[#18181B]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon
                    className={`w-4 h-4 ${
                      active ? 'text-[#A78BFA]' : 'text-[#71717A] group-hover:text-white'
                    }`}
                  />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span
                    className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                      item.badge === 'Admin'
                        ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                        : 'bg-[#7C3AED]/20 text-[#A78BFA]'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Bottom Profile Widget & Credits */}
      <div className="p-4 border-t border-[#27272A] bg-[#09090B]/60 space-y-3">
        {/* Credits Status */}
        <div className="p-3 rounded-xl bg-[#18181B] border border-[#27272A] flex items-center justify-between">
          <div>
            <p className="text-[10px] text-[#A1A1AA] uppercase tracking-wider font-medium">Credits</p>
            <p className="text-xs font-bold text-white mt-0.5">{user?.credits} remaining</p>
          </div>
          <CreditBadge />
        </div>

        {/* User Mini Profile */}
        <div className="flex items-center justify-between pt-1">
          <div className="flex items-center gap-2.5 min-w-0">
            <img
              src={user?.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80'}
              alt={user?.fullName}
              className="w-8 h-8 rounded-full object-cover ring-2 ring-[#7C3AED]/30"
            />
            <div className="min-w-0 flex-1">
              <p className="text-xs font-bold text-white truncate">{user?.fullName}</p>
              <p className="text-[10px] text-[#71717A] truncate capitalize">{user?.plan} User</p>
            </div>
          </div>
          <button
            onClick={() => {
              logout();
              navigate('/');
            }}
            title="Log out"
            className="p-1.5 text-[#71717A] hover:text-rose-400 hover:bg-rose-500/10 rounded-lg transition-colors"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </aside>
  );
};
