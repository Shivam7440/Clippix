import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles } from 'lucide-react';
import { useCredits } from '../context/CreditContext';

export const CreditBadge: React.FC = () => {
  const { creditsRemaining } = useCredits();

  return (
    <Link
      to="/billing"
      className="group relative inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#18181B] border border-[#27272A] hover:border-[#7C3AED]/50 transition-all duration-300 shadow-sm"
    >
      <div className="w-5 h-5 rounded-full bg-gradient-to-r from-[#7C3AED] to-[#22D3EE] flex items-center justify-center text-white text-xs shadow-[0_0_10px_rgba(124,58,237,0.4)] group-hover:scale-110 transition-transform">
        <Sparkles className="w-3 h-3 text-white" />
      </div>
      <div className="flex items-baseline gap-1">
        <span className="text-xs font-bold text-white group-hover:text-[#A78BFA] transition-colors">
          {creditsRemaining}
        </span>
        <span className="text-[11px] font-medium text-[#A1A1AA]">Credits</span>
      </div>
    </Link>
  );
};
