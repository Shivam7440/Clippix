import React from 'react';
import { Sparkles, Loader2 } from 'lucide-react';

interface LoadingStateProps {
  message?: string;
  subtext?: string;
  progress?: number;
}

export const LoadingState: React.FC<LoadingStateProps> = ({
  message = 'AI is removing the background...',
  subtext = 'Detecting subject edges and generating transparent alpha mask',
  progress,
}) => {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center bg-[#18181B] border border-[#27272A] rounded-3xl shadow-2xl space-y-6">
      {/* Futuristic Spinner Ring with Glowing Aura */}
      <div className="relative w-20 h-20 flex items-center justify-center">
        {/* Outer glowing blur */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#7C3AED] via-[#3B82F6] to-[#22D3EE] blur-xl opacity-60 animate-pulse" />
        
        {/* Rotating border ring */}
        <div className="w-full h-full rounded-full border-4 border-transparent border-t-[#7C3AED] border-r-[#22D3EE] border-b-[#3B82F6] animate-spin" />
        
        {/* Center Sparkles Icon */}
        <div className="absolute w-10 h-10 rounded-full bg-[#09090B] flex items-center justify-center">
          <Sparkles className="w-5 h-5 text-[#22D3EE] animate-pulse" />
        </div>
      </div>

      <div className="space-y-2 max-w-sm">
        <h3 className="text-lg font-bold text-white tracking-wide flex items-center justify-center gap-2">
          {message}
        </h3>
        <p className="text-xs text-[#A1A1AA] leading-relaxed">{subtext}</p>
      </div>

      {/* Progress Bar indicator if provided */}
      {typeof progress === 'number' && (
        <div className="w-full max-w-xs space-y-1.5">
          <div className="w-full h-2 rounded-full bg-[#09090B] border border-[#27272A] overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#7C3AED] via-[#3B82F6] to-[#22D3EE] transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
          <span className="text-[10px] font-bold text-[#A78BFA]">{progress}%</span>
        </div>
      )}
    </div>
  );
};
