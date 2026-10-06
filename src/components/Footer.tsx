import React from 'react';
import { Link } from 'react-router-dom';
import { Logo } from './Logo';
import { Github, Twitter, Linkedin, Instagram, ShieldCheck } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#09090B] border-t border-[#27272A] text-[#A1A1AA] pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Col 1: Brand Info */}
          <div className="md:col-span-1 space-y-4">
            <Logo size="md" showTagline={true} />
            <p className="text-xs text-[#71717A] leading-relaxed max-w-sm">
              Clippix is an AI-powered image editing SaaS platform engineered for 1-click automatic background removal with professional studio quality.
            </p>
            <div className="text-[11px] text-[#A1A1AA]">
              <p><strong className="text-white">Trade Name:</strong> Clippix AI Technologies</p>
            </div>
            <div className="flex items-center space-x-3 pt-2">
              <a
                href="#github"
                aria-label="GitHub"
                className="w-8 h-8 rounded-lg bg-[#18181B] border border-[#27272A] flex items-center justify-center text-[#A1A1AA] hover:text-[#A78BFA] hover:border-[#7C3AED]/40 transition-colors"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href="#twitter"
                aria-label="Twitter"
                className="w-8 h-8 rounded-lg bg-[#18181B] border border-[#27272A] flex items-center justify-center text-[#A1A1AA] hover:text-[#3B82F6] hover:border-[#3B82F6]/40 transition-colors"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href="#linkedin"
                aria-label="LinkedIn"
                className="w-8 h-8 rounded-lg bg-[#18181B] border border-[#27272A] flex items-center justify-center text-[#A1A1AA] hover:text-[#22D3EE] hover:border-[#22D3EE]/40 transition-colors"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="#instagram"
                aria-label="Instagram"
                className="w-8 h-8 rounded-lg bg-[#18181B] border border-[#27272A] flex items-center justify-center text-[#A1A1AA] hover:text-[#A78BFA] hover:border-[#7C3AED]/40 transition-colors"
              >
                <Instagram className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Product */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">Product</h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link to="/remove-background" className="hover:text-white transition-colors">
                  Background Remover
                </Link>
              </li>
              <li>
                <Link to="/features" className="hover:text-white transition-colors">
                  Core AI Features
                </Link>
              </li>
              <li>
                <Link to="/pricing" className="hover:text-white transition-colors">
                  Plans & Pricing
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="hover:text-white transition-colors">
                  User Workspace
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Company & Contact */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">Company</h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link to="/about" className="hover:text-white transition-colors">
                  About Clippix
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-white transition-colors font-semibold text-[#22D3EE]">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/shipping-policy" className="hover:text-white transition-colors">
                  Shipping & Delivery
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Razorpay Compliance Legal */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">Legal & Compliance</h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link to="/privacy-policy" className="hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/refund-policy" className="hover:text-white transition-colors">
                  Refund & Cancellation
                </Link>
              </li>
              <li>
                <Link to="/terms-and-conditions" className="hover:text-white transition-colors">
                  Terms and Conditions
                </Link>
              </li>
              <li>
                <Link to="/shipping-policy" className="hover:text-white transition-colors">
                  Digital Delivery Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-[#18181B] flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[#71717A]">
          <p>© 2026 Clippix AI Technologies. All rights reserved.</p>
          <div className="flex items-center space-x-6">
            <span className="flex items-center gap-2 text-[11px] text-[#A1A1AA]">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              Verified Razorpay Merchant
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
