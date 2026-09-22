import React from 'react';
import { Link } from 'react-router-dom';
import {
  Sparkles,
  Zap,
  Layers,
  Wand2,
  ShieldCheck,
  MousePointerClick,
  Download,
  FileType,
  Cpu,
  Sliders,
  CheckCircle2,
} from 'lucide-react';
import { FeatureCard } from '../../components/FeatureCard';

export const Features: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-20">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#18181B] border border-[#7C3AED]/40 text-xs font-semibold text-[#A78BFA]">
          <Sparkles className="w-3.5 h-3.5 text-[#22D3EE]" />
          <span>Product Capabilities</span>
        </div>
        <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight">
          Designed for Studio-Quality Precision
        </h1>
        <p className="text-sm sm:text-base text-[#A1A1AA] leading-relaxed">
          Clippix combines computer vision algorithms with an intuitive web workspace to remove backgrounds seamlessly for any use case.
        </p>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <FeatureCard
          title="One-Click Automatic Removal"
          description="Drag your image in and let AI handle edge detection, subject isolation, and alpha transparency rendering instantly."
          icon={MousePointerClick}
          iconColor="text-[#A78BFA]"
        />
        <FeatureCard
          title="AI Computer Vision"
          description="Deep learning models distinguish subjects from complex backgrounds, including portraits, products, vehicles, and pets."
          icon={Wand2}
          iconColor="text-[#22D3EE]"
        />
        <FeatureCard
          title="Fine Edge Preservation"
          description="Preserves delicate details like flyaway hair strands, transparent glass, fur, and intricate object borders."
          icon={Layers}
          iconColor="text-[#3B82F6]"
        />
        <FeatureCard
          title="Custom Background Replacements"
          description="Swap out removed backgrounds with solid brand colors, studio gradient lighting, or custom HD blurs."
          icon={Sliders}
          iconColor="text-[#A78BFA]"
        />
        <FeatureCard
          title="High-Speed Server Queue"
          description="Pro and Business users enjoy priority GPU server allocation for sub-second background processing."
          icon={Zap}
          iconColor="text-[#22D3EE]"
        />
        <FeatureCard
          title="Multi-Format Export"
          description="Export isolated subjects as full HD transparent PNGs or compressed JPGs with custom backgrounds."
          icon={Download}
          iconColor="text-[#3B82F6]"
        />
      </div>

      {/* Deep-Dive Architectural Highlights */}
      <div className="rounded-3xl bg-[#18181B] border border-[#27272A] p-8 sm:p-12 space-y-8">
        <div className="max-w-2xl space-y-2">
          <h2 className="text-2xl font-bold text-white">Extensible AI SaaS Architecture</h2>
          <p className="text-xs sm:text-sm text-[#A1A1AA]">
            Built with modular service architecture ready for future tools such as AI upscale, object erase, and background generation.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="p-5 rounded-2xl bg-[#09090B] border border-[#27272A] space-y-2">
            <Cpu className="w-6 h-6 text-[#A78BFA]" />
            <h4 className="text-sm font-bold text-white">n8n Orchestration</h4>
            <p className="text-xs text-[#71717A]">
              Connects API webhooks to automated background removal workflows smoothly.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-[#09090B] border border-[#27272A] space-y-2">
            <FileType className="w-6 h-6 text-[#22D3EE]" />
            <h4 className="text-sm font-bold text-white">Cloudinary CDN</h4>
            <p className="text-xs text-[#71717A]">
              Delivers optimized responsive image URLs and secure asset storage.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-[#09090B] border border-[#27272A] space-y-2">
            <ShieldCheck className="w-6 h-6 text-[#3B82F6]" />
            <h4 className="text-sm font-bold text-white">Supabase Auth & RLS</h4>
            <p className="text-xs text-[#71717A]">
              Protects credit balances, user history, and payment transactions securely.
            </p>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="text-center pt-8">
        <Link
          to="/remove-background"
          className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl font-bold text-sm text-white bg-gradient-to-r from-[#7C3AED] to-[#3B82F6] shadow-[0_0_25px_rgba(124,58,237,0.35)] hover:scale-105 transition-transform"
        >
          Try Clippix Features Free
        </Link>
      </div>
    </div>
  );
};
