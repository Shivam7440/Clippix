import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Sparkles,
  Zap,
  ShieldCheck,
  Image as ImageIcon,
  CheckCircle2,
  ArrowRight,
  MousePointerClick,
  Download,
  Lock,
  Clock,
  Layers,
  Wand2,
} from 'lucide-react';
import { UploadBox } from '../../components/UploadBox';
import { BeforeAfterSlider } from '../../components/BeforeAfterSlider';
import { FeatureCard } from '../../components/FeatureCard';
import { SAMPLE_IMAGES } from '../../config/constants';
import { useImageJobs } from '../../context/ImageJobContext';
import { executeBackgroundRemoval } from '../../services/imageProcessing';
import { useAuth } from '../../context/AuthContext';
import { useCredits } from '../../context/CreditContext';
import { useToast } from '../../context/ToastContext';

export const Home: React.FC = () => {
  const navigate = useNavigate();
  const { createJob, updateJob } = useImageJobs();
  const { isAuthenticated } = useAuth();
  const { deductCredit } = useCredits();
  const { showToast } = useToast();

  const [activeSampleIndex, setActiveSampleIndex] = useState<number>(0);

  const handleHeroUpload = async (fileOrUrl: File | string, title?: string) => {
    if (!isAuthenticated) {
      showToast('Account Required', 'Creating demo job...', 'info');
    }

    const fileName = typeof fileOrUrl === 'string' ? title || 'sample.png' : fileOrUrl.name;
    const newJob = createJob(fileName, typeof fileOrUrl === 'string' ? fileOrUrl : '');

    // Redirect straight to background removal workspace!
    navigate('/remove-background', { state: { selectedFile: fileOrUrl, fileName, jobId: newJob.id } });
  };

  const sample = SAMPLE_IMAGES[activeSampleIndex];

  return (
    <div className="space-y-24 pb-20">
      {/* HERO SECTION */}
      <section className="relative pt-12 lg:pt-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Glow backdrop blur effects */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-gradient-to-r from-[#7C3AED]/20 via-[#3B82F6]/15 to-[#22D3EE]/20 blur-3xl pointer-events-none rounded-full" />

        <div className="relative z-10 text-center max-w-4xl mx-auto space-y-6">
          {/* Top Pill Tag */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#18181B] border border-[#7C3AED]/40 text-xs font-semibold text-[#A78BFA] shadow-[0_0_20px_rgba(124,58,237,0.25)]">
            <Sparkles className="w-3.5 h-3.5 text-[#22D3EE]" />
            <span>Next-Gen AI Background Removal Engine</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.1]">
            Remove Backgrounds.{' '}
            <span className="gradient-text">Keep What Matters.</span>
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-xl text-[#A1A1AA] max-w-2xl mx-auto leading-relaxed">
            Clippix uses advanced AI to remove image backgrounds in seconds. Create clean, professional images without complicated editing software.
          </p>

          {/* Hero CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <Link
              to="/remove-background"
              className="w-full sm:w-auto px-8 py-4 rounded-2xl text-sm font-bold text-white bg-gradient-to-r from-[#7C3AED] to-[#3B82F6] hover:from-[#6D28D9] hover:to-[#2563EB] shadow-[0_0_30px_rgba(124,58,237,0.4)] transition-all transform hover:scale-105 flex items-center justify-center gap-2"
            >
              <Wand2 className="w-4 h-4" />
              Remove Background Now
            </Link>
            <a
              href="#how-it-works"
              className="w-full sm:w-auto px-8 py-4 rounded-2xl text-sm font-semibold text-[#F4F4F5] bg-[#18181B] border border-[#27272A] hover:bg-[#27272A] transition-all flex items-center justify-center gap-2"
            >
              See How It Works
              <ArrowRight className="w-4 h-4 text-[#A78BFA]" />
            </a>
          </div>
        </div>

        {/* HERO UPLOAD CONTAINER */}
        <div className="mt-12 max-w-4xl mx-auto">
          <UploadBox onImageSelected={handleHeroUpload} />
        </div>
      </section>

      {/* BEFORE / AFTER INTERACTIVE DEMONSTRATION SECTION */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <div className="text-center mb-10 space-y-3">
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white">
            See the Studio-Quality Precision
          </h2>
          <p className="text-xs sm:text-sm text-[#A1A1AA] max-w-xl mx-auto">
            Drag the slider to compare original photos with transparent Clippix cutouts. Hair details, soft edges, and fine subjects are preserved cleanly.
          </p>

          {/* Sample selector tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
            {SAMPLE_IMAGES.map((s, idx) => (
              <button
                key={s.id}
                onClick={() => setActiveSampleIndex(idx)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                  activeSampleIndex === idx
                    ? 'bg-[#7C3AED] text-white shadow-[0_0_15px_rgba(124,58,237,0.4)]'
                    : 'bg-[#18181B] border border-[#27272A] text-[#A1A1AA] hover:text-white'
                }`}
              >
                {s.title}
              </button>
            ))}
          </div>
        </div>

        {/* Draggable Slider */}
        <BeforeAfterSlider originalImage={sample.original} resultImage={sample.cutout} />
      </section>

      {/* HOW IT WORKS SECTION */}
      <section id="how-it-works" className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-16 space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-[#A78BFA]">Simple Process</span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white">How Clippix Works</h2>
          <p className="text-xs sm:text-sm text-[#A1A1AA]">Three steps to perfectly isolated subjects.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Step 01 */}
          <div className="relative rounded-3xl p-8 bg-[#18181B] border border-[#27272A] space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#7C3AED] to-[#3B82F6] flex items-center justify-center text-white font-extrabold text-lg shadow-lg">
              01
            </div>
            <h3 className="text-xl font-bold text-white">Upload Your Image</h3>
            <p className="text-xs sm:text-sm text-[#A1A1AA] leading-relaxed">
              Drag and drop any PNG, JPG, JPEG, or WEBP photo up to 25MB directly into the workspace.
            </p>
          </div>

          {/* Step 02 */}
          <div className="relative rounded-3xl p-8 bg-[#18181B] border border-[#27272A] space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#3B82F6] to-[#22D3EE] flex items-center justify-center text-white font-extrabold text-lg shadow-lg">
              02
            </div>
            <h3 className="text-xl font-bold text-white">AI Processing</h3>
            <p className="text-xs sm:text-sm text-[#A1A1AA] leading-relaxed">
              Clippix detects subjects automatically and separates them from their background with high accuracy.
            </p>
          </div>

          {/* Step 03 */}
          <div className="relative rounded-3xl p-8 bg-[#18181B] border border-[#27272A] space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#22D3EE] to-[#A78BFA] flex items-center justify-center text-white font-extrabold text-lg shadow-lg">
              03
            </div>
            <h3 className="text-xl font-bold text-white">Download Clean PNG</h3>
            <p className="text-xs sm:text-sm text-[#A1A1AA] leading-relaxed">
              Download your transparent PNG result instantly or add solid/studio gradient backgrounds.
            </p>
          </div>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-16 space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-[#22D3EE]">Engine Features</span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white">Built for Speed and Quality</h2>
          <p className="text-xs sm:text-sm text-[#A1A1AA] max-w-xl mx-auto">
            Everything you need for e-commerce, graphics, social content, and marketing workflows.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <FeatureCard
            title="One-Click Removal"
            description="Remove backgrounds automatically with a single click — no manual tracing needed."
            icon={MousePointerClick}
            iconColor="text-[#A78BFA]"
          />
          <FeatureCard
            title="AI-Powered Precision"
            description="Advanced computer vision detects subjects and separates complex edges cleanly."
            icon={Wand2}
            iconColor="text-[#22D3EE]"
          />
          <FeatureCard
            title="High-Quality Output"
            description="Preserve crisp edges, fine details, hair strands, and delicate transparent elements."
            icon={Layers}
            iconColor="text-[#3B82F6]"
          />
          <FeatureCard
            title="Fast Processing"
            description="Get studio-grade background removals delivered within seconds."
            icon={Clock}
            iconColor="text-[#A78BFA]"
          />
          <FeatureCard
            title="Transparent PNG"
            description="Download pristine alpha-transparent PNGs ready for design software."
            icon={Download}
            iconColor="text-[#22D3EE]"
          />
          <FeatureCard
            title="Multiple Formats"
            description="Support common image formats including PNG, JPG, JPEG, and WEBP."
            icon={ImageIcon}
            iconColor="text-[#3B82F6]"
          />
          <FeatureCard
            title="Secure Processing"
            description="Your uploaded images are processed securely using strict privacy standards."
            icon={Lock}
            iconColor="text-[#A78BFA]"
          />
          <FeatureCard
            title="Simple Interface"
            description="No steep learning curves or complicated tools required."
            icon={Zap}
            iconColor="text-[#22D3EE]"
          />
        </div>
      </section>

      {/* PRIVACY & SECURITY SECTION */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        <div className="rounded-3xl p-8 sm:p-12 bg-[#18181B] border border-[#27272A] relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#7C3AED]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#09090B] border border-[#27272A] text-xs font-bold text-[#22D3EE]">
                <ShieldCheck className="w-3.5 h-3.5" />
                Data Privacy Guarantee
              </div>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-white">
                Your Images. Your Privacy.
              </h2>
              <p className="text-xs sm:text-sm text-[#A1A1AA] leading-relaxed">
                Clippix is designed with secure image handling at its core. Your uploaded files are processed strictly for background removal and are stored temporarily for your download convenience.
              </p>
              <div className="space-y-2 pt-2">
                <div className="flex items-center gap-2 text-xs text-[#F4F4F5]">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Secure SSL encrypted processing pipelines</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-[#F4F4F5]">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Automatic image cleanup policy according to your plan</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-[#F4F4F5]">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>No unauthorized third-party sharing of user photos</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 flex justify-center">
              <div className="p-6 rounded-2xl bg-[#09090B] border border-[#27272A] space-y-4 w-full max-w-xs shadow-2xl">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#7C3AED]/20 border border-[#7C3AED]/40 flex items-center justify-center text-[#A78BFA]">
                    <Lock className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white">Protected Assets</h4>
                    <p className="text-[10px] text-[#71717A]">Encrypted cloud storage</p>
                  </div>
                </div>
                <div className="h-px bg-[#27272A]" />
                <div className="text-[11px] text-[#A1A1AA] space-y-1.5">
                  <div className="flex justify-between">
                    <span>TLS Encryption</span>
                    <span className="text-emerald-400 font-semibold">Enabled</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Auto Cleanup</span>
                    <span className="text-[#A78BFA] font-semibold">Active</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Data Privacy</span>
                    <span className="text-[#22D3EE] font-semibold">Protected</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BOTTOM BANNER CTA */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <div className="rounded-3xl p-10 sm:p-16 bg-gradient-to-r from-[#18181B] via-[#111113] to-[#18181B] border border-[#7C3AED]/40 text-center space-y-6 relative overflow-hidden shadow-2xl">
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Ready to isolate image subjects instantly?
          </h2>
          <p className="text-xs sm:text-base text-[#A1A1AA] max-w-xl mx-auto">
            Join thousands of e-commerce sellers, designers, and creators using Clippix every day.
          </p>
          <div>
            <Link
              to="/remove-background"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl text-sm font-bold text-white bg-gradient-to-r from-[#7C3AED] to-[#3B82F6] hover:from-[#6D28D9] hover:to-[#2563EB] shadow-[0_0_30px_rgba(124,58,237,0.4)] transition-all transform hover:scale-105"
            >
              <Sparkles className="w-4 h-4" />
              Remove Background Free
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
