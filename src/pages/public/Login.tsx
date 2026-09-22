import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Logo } from '../../components/Logo';
import { useAuth } from '../../context/AuthContext';
import { LogIn, Mail, Lock, Sparkles } from 'lucide-react';

export const Login: React.FC = () => {
  const [email, setEmail] = useState('alex.creator@clippix.ai');
  const [password, setPassword] = useState('••••••••••••');
  const [rememberMe, setRememberMe] = useState(true);
  const { login, isLoading } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await login(email, password);
    if (success) {
      navigate('/dashboard');
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md bg-[#18181B] border border-[#27272A] rounded-3xl p-8 shadow-2xl space-y-6">
        <div className="text-center space-y-2">
          <div className="flex justify-center mb-2">
            <Logo size="md" />
          </div>
          <h2 className="text-2xl font-bold text-white">Welcome back</h2>
          <p className="text-xs text-[#A1A1AA]">Sign in to access your workspace and credits</p>
        </div>

        {/* Demo Quick Admin Shortcut Pill */}
        <div className="p-3 rounded-2xl bg-[#09090B] border border-[#7C3AED]/40 flex items-center justify-between text-xs">
          <span className="text-[#A1A1AA]">Demo Quick Login:</span>
          <div className="flex gap-2">
            <button
              onClick={() => {
                setEmail('alex.creator@clippix.ai');
                setPassword('password123');
              }}
              className="px-2.5 py-1 rounded bg-[#7C3AED]/20 text-[#A78BFA] font-bold hover:bg-[#7C3AED]/30"
            >
              User
            </button>
            <button
              onClick={() => {
                setEmail('admin@clippix.ai');
                setPassword('admin123');
              }}
              className="px-2.5 py-1 rounded bg-amber-500/20 text-amber-300 font-bold hover:bg-amber-500/30"
            >
              Admin
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1">
            <label className="text-xs font-semibold text-[#A1A1AA]">Email Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-[#71717A] absolute left-3.5 top-3.5" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@company.com"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#09090B] border border-[#27272A] text-white text-xs focus:outline-none focus:border-[#7C3AED]"
              />
            </div>
          </div>

          <div className="space-y-1">
            <div className="flex justify-between items-center">
              <label className="text-xs font-semibold text-[#A1A1AA]">Password</label>
              <Link to="/forgot-password" className="text-xs text-[#A78BFA] hover:underline">
                Forgot password?
              </Link>
            </div>
            <div className="relative">
              <Lock className="w-4 h-4 text-[#71717A] absolute left-3.5 top-3.5" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#09090B] border border-[#27272A] text-white text-xs focus:outline-none focus:border-[#7C3AED]"
              />
            </div>
          </div>

          <div className="flex items-center justify-between text-xs">
            <label className="flex items-center gap-2 cursor-pointer text-[#A1A1AA]">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="rounded bg-[#09090B] border-[#27272A] text-[#7C3AED] focus:ring-0"
              />
              Remember me for 30 days
            </label>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 rounded-xl font-bold text-xs text-white bg-gradient-to-r from-[#7C3AED] to-[#3B82F6] hover:from-[#6D28D9] hover:to-[#2563EB] shadow-[0_0_20px_rgba(124,58,237,0.35)] transition-all flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <span className="flex items-center gap-2">Signing in...</span>
            ) : (
              <>
                <LogIn className="w-4 h-4" />
                Sign In
              </>
            )}
          </button>
        </form>

        {/* Google SSO Placeholder */}
        <div className="space-y-4">
          <div className="relative flex items-center justify-center">
            <div className="border-t border-[#27272A] w-full" />
            <span className="bg-[#18181B] px-3 text-[10px] text-[#71717A] uppercase font-bold absolute">
              Or continue with
            </span>
          </div>

          <button
            onClick={() => login('google.user@clippix.ai', 'sso')}
            className="w-full py-2.5 rounded-xl border border-[#27272A] bg-[#09090B] hover:bg-[#27272A] text-xs font-semibold text-white flex items-center justify-center gap-2 transition-colors"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path
                fill="#EA4335"
                d="M12 5c1.6 0 3 .6 4.1 1.6l3.1-3.1C17.3 1.7 14.8 1 12 1 7.5 1 3.7 3.6 1.9 7.3l3.7 2.9C6.5 7.3 9 5 12 5z"
              />
              <path
                fill="#4285F4"
                d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.5h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5 3.7-8.8z"
              />
              <path
                fill="#FBBC05"
                d="M5.6 14.8c-.2-.7-.4-1.5-.4-2.3s.2-1.6.4-2.3L1.9 7.3C.7 9.7 0 10.8 0 12.5s.7 2.8 1.9 5.2l3.7-2.9z"
              />
              <path
                fill="#34A853"
                d="M12 24c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3 0-5.5-2.3-6.4-5.2L1.9 17C3.7 20.7 7.5 24 12 24z"
              />
            </svg>
            Continue with Google
          </button>
        </div>

        <p className="text-center text-xs text-[#A1A1AA]">
          Don't have an account?{' '}
          <Link to="/signup" className="text-[#A78BFA] font-bold hover:underline">
            Sign up for free
          </Link>
        </p>
      </div>
    </div>
  );
};
