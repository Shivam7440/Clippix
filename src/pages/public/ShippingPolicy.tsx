import React from 'react';
import { Link } from 'react-router-dom';
import { Package, Zap, CheckCircle2, FileText, Globe } from 'lucide-react';

export const ShippingPolicy: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
      <div className="border-b border-[#27272A] pb-6 space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#22D3EE]/10 border border-[#22D3EE]/30 text-xs font-bold text-[#22D3EE]">
          <Package className="w-3.5 h-3.5" />
          <span>SaaS Service Delivery Policy</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white">Shipping & Delivery Policy</h1>
        <p className="text-xs text-[#A1A1AA]">
          Last Updated: September 23, 2026 | Trade Name: <strong className="text-white">Clippix AI Technologies</strong>
        </p>
      </div>

      <div className="space-y-8 text-xs sm:text-sm text-[#A1A1AA] leading-relaxed">
        <section className="space-y-3 bg-[#18181B] p-6 rounded-2xl border border-[#27272A]">
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <Globe className="w-4 h-4 text-[#A78BFA]" />
            1. Digital SaaS Product Delivery
          </h2>
          <p>
            Clippix is a 100% cloud-based AI image editing software service (SaaS). <strong className="text-white">We do not ship physical goods or tangible items to any physical address.</strong>
          </p>
          <p>
            All subscriptions, plan upgrades, and credit top-up packages purchased through our website at <a href="https://clippix.ai" className="text-[#22D3EE] underline">https://clippix.ai</a> are delivered digitally over the internet directly to your user account.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <Zap className="w-4 h-4 text-[#22D3EE]" />
            2. Instant Delivery Timeline
          </h2>
          <p>
            Upon successful payment processing via <strong className="text-white">Razorpay</strong>:
          </p>
          <div className="p-4 rounded-xl bg-[#09090B] border border-[#27272A] space-y-2 text-xs">
            <div className="flex justify-between">
              <span>Delivery Time</span>
              <span className="text-emerald-400 font-bold">Instant (Within seconds of payment)</span>
            </div>
            <div className="flex justify-between">
              <span>Access Method</span>
              <span className="text-white font-semibold">User Dashboard & Background Removal Workspace</span>
            </div>
            <div className="flex justify-between">
              <span>Credit Allocation</span>
              <span className="text-[#A78BFA] font-bold">Reflected immediately in credit balance</span>
            </div>
          </div>
        </section>

        <section className="space-y-3">
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <FileText className="w-4 h-4 text-[#3B82F6]" />
            3. Order Confirmation & Invoicing
          </h2>
          <p>
            After completing your purchase:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>An automated electronic transaction receipt and invoice will be emailed to your registered account email.</li>
            <li>Your credit transaction history is permanently logged and accessible under <Link to="/billing" className="text-[#A78BFA] underline">Billing & Subscription</Link>.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            4. Service Delivery Support
          </h2>
          <p>
            If your credits do not appear in your account immediately after payment confirmation, please contact our delivery support team at <a href="mailto:support@clippix.ai" className="text-[#22D3EE] font-bold underline">support@clippix.ai</a> or call <strong className="text-white">+91 98765 43210</strong> with your Razorpay Payment ID.
          </p>
        </section>
      </div>
    </div>
  );
};
