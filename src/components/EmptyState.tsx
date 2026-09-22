import React from 'react';
import { LucideIcon, ImageOff } from 'lucide-react';

interface EmptyStateProps {
  title: string;
  description: string;
  actionText?: string;
  onAction?: () => void;
  icon?: LucideIcon;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  description,
  actionText,
  onAction,
  icon: Icon = ImageOff,
}) => {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center bg-[#18181B]/50 border border-[#27272A] border-dashed rounded-3xl">
      <div className="w-16 h-16 rounded-2xl bg-[#09090B] border border-[#27272A] flex items-center justify-center mb-4 text-[#7C3AED]">
        <Icon className="w-8 h-8" />
      </div>
      <h3 className="text-lg font-bold text-white mb-2">{title}</h3>
      <p className="text-xs sm:text-sm text-[#A1A1AA] max-w-sm mb-6 leading-relaxed">{description}</p>
      {actionText && onAction && (
        <button
          onClick={onAction}
          className="px-6 py-2.5 rounded-xl font-bold text-xs text-white bg-gradient-to-r from-[#7C3AED] to-[#3B82F6] hover:from-[#6D28D9] hover:to-[#2563EB] shadow-[0_0_15px_rgba(124,58,237,0.3)] transition-all transform hover:scale-105"
        >
          {actionText}
        </button>
      )}
    </div>
  );
};
