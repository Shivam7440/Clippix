import React from 'react';
import { Logo } from '../../components/Logo';
import { Sparkles, Shield, Zap, Target, Users } from 'lucide-react';

export const About: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
      {/* Header */}
      <div className="text-center space-y-4">
        <Logo size="lg" showTagline={true} clickable={false} />
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white pt-4">
          Empowering Creators with Effortless AI Editing
        </h1>
        <p className="text-sm sm:text-base text-[#A1A1AA] max-w-2xl mx-auto leading-relaxed">
          Clippix was built to solve a simple problem: removing image backgrounds shouldn't require complex graphic design software or expensive subscriptions.
        </p>
      </div>

      {/* Target Audiences Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-2xl bg-[#18181B] border border-[#27272A] space-y-2">
          <div className="w-10 h-10 rounded-xl bg-[#7C3AED]/20 text-[#A78BFA] flex items-center justify-center font-bold">
            01
          </div>
          <h3 className="text-base font-bold text-white">E-Commerce Sellers</h3>
          <p className="text-xs text-[#A1A1AA]">
            Create studio-clean product photography with transparent backgrounds for Amazon, Shopify, and eBay.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-[#18181B] border border-[#27272A] space-y-2">
          <div className="w-10 h-10 rounded-xl bg-[#3B82F6]/20 text-[#3B82F6] flex items-center justify-center font-bold">
            02
          </div>
          <h3 className="text-base font-bold text-white">Graphic Designers</h3>
          <p className="text-xs text-[#A1A1AA]">
            Speed up your editing workflow by letting AI handle tedious edge isolation and background masks.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-[#18181B] border border-[#27272A] space-y-2">
          <div className="w-10 h-10 rounded-xl bg-[#22D3EE]/20 text-[#22D3EE] flex items-center justify-center font-bold">
            03
          </div>
          <h3 className="text-base font-bold text-white">Social Media Creators</h3>
          <p className="text-xs text-[#A1A1AA]">
            Isolate subjects for YouTube thumbnails, Instagram posts, TikTok banners, and marketing collaterals.
          </p>
        </div>
      </div>

      {/* Core Principles */}
      <div className="rounded-3xl bg-[#18181B] border border-[#27272A] p-8 sm:p-12 space-y-6">
        <h2 className="text-2xl font-bold text-white">Our Product Principles</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="flex gap-4">
            <Zap className="w-6 h-6 text-[#22D3EE] shrink-0 mt-1" />
            <div>
              <h4 className="text-sm font-bold text-white">Speed & Simplicity</h4>
              <p className="text-xs text-[#A1A1AA]">
                Single-click workflows without complex settings or hidden tools.
              </p>
            </div>
          </div>
          <div className="flex gap-4">
            <Shield className="w-6 h-6 text-[#A78BFA] shrink-0 mt-1" />
            <div>
              <h4 className="text-sm font-bold text-white">Privacy First</h4>
              <p className="text-xs text-[#A1A1AA]">
                Encrypted uploads and automatic cleanup schedules for user data safety.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
