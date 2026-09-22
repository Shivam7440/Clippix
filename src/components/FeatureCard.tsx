import React from 'react';
import { LucideIcon } from 'lucide-react';

interface FeatureCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  iconColor?: string;
}

export const FeatureCard: React.FC<FeatureCardProps> = ({
  title,
  description,
  icon: Icon,
  iconColor = 'text-[#A78BFA]',
}) => {
  return (
    <div className="group rounded-3xl p-6 sm:p-8 bg-[#18181B] border border-[#27272A] hover:border-[#7C3AED]/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(124,58,237,0.15)] flex flex-col justify-between">
      <div>
        <div className={`w-12 h-12 rounded-2xl bg-[#09090B] border border-[#27272A] flex items-center justify-center mb-6 group-hover:scale-110 group-hover:border-[#7C3AED] transition-all`}>
          <Icon className={`w-6 h-6 ${iconColor}`} />
        </div>
        <h3 className="text-lg font-bold text-white mb-2">{title}</h3>
        <p className="text-xs sm:text-sm text-[#A1A1AA] leading-relaxed">{description}</p>
      </div>
    </div>
  );
};
