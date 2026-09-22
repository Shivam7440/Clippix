import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, LayoutDashboard, User, LogOut, ShieldAlert, Sparkles, ChevronDown } from 'lucide-react';
import { Logo } from './Logo';
import { CreditBadge } from './CreditBadge';
import { useAuth } from '../context/AuthContext';

export const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const { user, isAuthenticated, isAdmin, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeMobileMenu = () => setMobileMenuOpen(false);

  const isActive = (path: string) => location.pathname === path;

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-all duration-300 ${
        scrolled
          ? 'bg-[#09090B]/80 backdrop-blur-md border-b border-[#27272A]/80 shadow-lg shadow-black/40'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Left: Logo */}
        <Logo size="md" />

        {/* Center: Navigation Links */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link
            to="/features"
            className={`text-sm font-medium transition-colors hover:text-[#A78BFA] ${
              isActive('/features') ? 'text-[#A78BFA] font-semibold' : 'text-[#A1A1AA]'
            }`}
          >
            Features
          </Link>
          <Link
            to="/pricing"
            className={`text-sm font-medium transition-colors hover:text-[#A78BFA] ${
              isActive('/pricing') ? 'text-[#A78BFA] font-semibold' : 'text-[#A1A1AA]'
            }`}
          >
            Pricing
          </Link>
          <Link
            to="/about"
            className={`text-sm font-medium transition-colors hover:text-[#A78BFA] ${
              isActive('/about') ? 'text-[#A78BFA] font-semibold' : 'text-[#A1A1AA]'
            }`}
          >
            About
          </Link>
          {isAdmin && (
            <Link
              to="/admin"
              className="text-xs font-semibold px-2.5 py-1 rounded-md bg-[#7C3AED]/20 text-[#A78BFA] border border-[#7C3AED]/40 hover:bg-[#7C3AED]/30 transition-colors flex items-center gap-1.5"
            >
              <ShieldAlert className="w-3.5 h-3.5" />
              Admin
            </Link>
          )}
        </nav>

        {/* Right: User Actions */}
        <div className="hidden md:flex items-center gap-4">
          {isAuthenticated ? (
            <div className="flex items-center gap-4">
              <CreditBadge />

              <Link
                to="/remove-background"
                className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-[#7C3AED] to-[#3B82F6] hover:from-[#6D28D9] hover:to-[#2563EB] shadow-[0_0_15px_rgba(124,58,237,0.3)] transition-all transform hover:scale-105 flex items-center gap-2"
              >
                <Sparkles className="w-3.5 h-3.5" />
                Workspace
              </Link>

              {/* User Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-2.5 p-1.5 rounded-full hover:bg-[#18181B] border border-transparent hover:border-[#27272A] transition-all focus:outline-none"
                >
                  <img
                    src={user?.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80'}
                    alt={user?.fullName}
                    className="w-8 h-8 rounded-full object-cover ring-2 ring-[#7C3AED]/40"
                  />
                  <span className="text-xs font-medium text-white max-w-[100px] truncate">
                    {user?.fullName.split(' ')[0]}
                  </span>
                  <ChevronDown className="w-3.5 h-3.5 text-[#A1A1AA]" />
                </button>

                {userDropdownOpen && (
                  <div
                    className="absolute right-0 mt-2 w-56 bg-[#18181B] border border-[#27272A] rounded-2xl shadow-2xl py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200"
                    onMouseLeave={() => setUserDropdownOpen(false)}
                  >
                    <div className="px-4 py-2.5 border-b border-[#27272A]">
                      <p className="text-xs font-semibold text-white truncate">{user?.fullName}</p>
                      <p className="text-[11px] text-[#A1A1AA] truncate">{user?.email}</p>
                      <span className="inline-block mt-1 px-2 py-0.5 rounded text-[10px] font-bold bg-[#7C3AED]/20 text-[#A78BFA] uppercase">
                        {user?.plan} Plan
                      </span>
                    </div>

                    <Link
                      to="/dashboard"
                      onClick={() => setUserDropdownOpen(false)}
                      className="flex items-center gap-2.5 px-4 py-2 text-xs text-[#F4F4F5] hover:bg-[#27272A]/60 transition-colors"
                    >
                      <LayoutDashboard className="w-4 h-4 text-[#A78BFA]" />
                      Dashboard
                    </Link>
                    <Link
                      to="/profile"
                      onClick={() => setUserDropdownOpen(false)}
                      className="flex items-center gap-2.5 px-4 py-2 text-xs text-[#F4F4F5] hover:bg-[#27272A]/60 transition-colors"
                    >
                      <User className="w-4 h-4 text-[#3B82F6]" />
                      Profile & Account
                    </Link>
                    {isAdmin && (
                      <Link
                        to="/admin"
                        onClick={() => setUserDropdownOpen(false)}
                        className="flex items-center gap-2.5 px-4 py-2 text-xs text-[#A78BFA] hover:bg-[#27272A]/60 transition-colors"
                      >
                        <ShieldAlert className="w-4 h-4 text-[#A78BFA]" />
                        Admin Dashboard
                      </Link>
                    )}

                    <div className="border-t border-[#27272A] mt-1 pt-1">
                      <button
                        onClick={() => {
                          setUserDropdownOpen(false);
                          logout();
                          navigate('/');
                        }}
                        className="w-full flex items-center gap-2.5 px-4 py-2 text-xs text-rose-400 hover:bg-rose-500/10 transition-colors text-left"
                      >
                        <LogOut className="w-4 h-4" />
                        Log out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link
                to="/login"
                className="px-4 py-2 rounded-xl text-xs font-semibold text-[#F4F4F5] hover:text-white transition-colors hover:bg-[#18181B]"
              >
                Log in
              </Link>
              <Link
                to="/signup"
                className="px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-[#7C3AED] to-[#3B82F6] hover:from-[#6D28D9] hover:to-[#2563EB] shadow-[0_0_20px_rgba(124,58,237,0.35)] transition-all transform hover:scale-105"
              >
                Get Started
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex md:hidden items-center gap-3">
          {isAuthenticated && <CreditBadge />}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg text-[#A1A1AA] hover:text-white hover:bg-[#18181B] transition-colors focus:outline-none"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#09090B]/95 backdrop-blur-xl border-b border-[#27272A] px-4 pt-4 pb-6 space-y-4 animate-in fade-in slide-in-from-top-4 duration-300">
          <div className="flex flex-col space-y-3">
            <Link
              to="/features"
              onClick={closeMobileMenu}
              className="text-sm font-medium text-[#F4F4F5] hover:text-[#A78BFA] py-2 border-b border-[#18181B]"
            >
              Features
            </Link>
            <Link
              to="/pricing"
              onClick={closeMobileMenu}
              className="text-sm font-medium text-[#F4F4F5] hover:text-[#A78BFA] py-2 border-b border-[#18181B]"
            >
              Pricing
            </Link>
            <Link
              to="/about"
              onClick={closeMobileMenu}
              className="text-sm font-medium text-[#F4F4F5] hover:text-[#A78BFA] py-2 border-b border-[#18181B]"
            >
              About
            </Link>

            {isAuthenticated ? (
              <>
                <Link
                  to="/dashboard"
                  onClick={closeMobileMenu}
                  className="text-sm font-medium text-[#A78BFA] py-2 border-b border-[#18181B] flex items-center gap-2"
                >
                  <LayoutDashboard className="w-4 h-4" />
                  Dashboard
                </Link>
                <Link
                  to="/remove-background"
                  onClick={closeMobileMenu}
                  className="text-sm font-medium text-[#22D3EE] py-2 border-b border-[#18181B] flex items-center gap-2"
                >
                  <Sparkles className="w-4 h-4" />
                  Remove Background
                </Link>
                <Link
                  to="/profile"
                  onClick={closeMobileMenu}
                  className="text-sm font-medium text-[#F4F4F5] py-2 border-b border-[#18181B] flex items-center gap-2"
                >
                  <User className="w-4 h-4" />
                  Profile
                </Link>

                {isAdmin && (
                  <Link
                    to="/admin"
                    onClick={closeMobileMenu}
                    className="text-sm font-medium text-amber-400 py-2 border-b border-[#18181B] flex items-center gap-2"
                  >
                    <ShieldAlert className="w-4 h-4" />
                    Admin Panel
                  </Link>
                )}

                <button
                  onClick={() => {
                    closeMobileMenu();
                    logout();
                    navigate('/');
                  }}
                  className="w-full text-left text-sm font-medium text-rose-400 py-2 flex items-center gap-2"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              </>
            ) : (
              <div className="pt-2 flex flex-col gap-3">
                <Link
                  to="/login"
                  onClick={closeMobileMenu}
                  className="w-full text-center py-2.5 rounded-xl border border-[#27272A] text-sm font-semibold text-white bg-[#18181B]"
                >
                  Log in
                </Link>
                <Link
                  to="/signup"
                  onClick={closeMobileMenu}
                  className="w-full text-center py-2.5 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-[#7C3AED] to-[#3B82F6]"
                >
                  Get Started Free
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
