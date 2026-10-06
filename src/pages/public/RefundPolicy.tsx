import React from 'react';
import { Link } from 'react-router-dom';
import { RefreshCw, ShieldAlert, CheckCircle2, Clock, Mail } from 'lucide-react';

export const RefundPolicy: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
      <div className="border-b border-[#27272A] pb-6 space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#3B82F6]/10 border border-[#3B82F6]/30 text-xs font-bold text-[#22D3EE]">
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Razorpay Merchant Compliance</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white">Refund and Cancellation Policy</h1>
        <p className="text-xs text-[#A1A1AA]">
          Last Updated: September 23, 2026 | Trade Name: <strong className="text-white">Clippix AI Technologies</strong>
        </p>
      </div>

      <div className="space-y-8 text-xs sm:text-sm text-[#A1A1AA] leading-relaxed">
        <section className="space-y-3 bg-[#18181B] p-6 rounded-2xl border border-[#27272A]">
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            1. Subscription Cancellation Policy
          </h2>
          <p>
            Users may cancel their Clippix Pro or Business subscription plan at any time directly through the <Link to="/billing" className="text-[#A78BFA] underline">Billing & Subscription</Link> section in their dashboard or by emailing <a href="mailto:support@clippix.ai" className="text-[#22D3EE] underline">support@clippix.ai</a>.
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Cancellation takes effect at the end of your current monthly/annual billing cycle.</li>
            <li>You will retain full access to your remaining credit balance and workspace features until the end of the paid billing period.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 text-amber-400" />
            2. Refund Eligibility & 7-Day Money-Back Guarantee
          </h2>
          <p>
            We offer a <strong className="text-white">7-Day Money-Back Guarantee</strong> for all new paid subscription plans under the following conditions:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong className="text-white">First-Time Purchases:</strong> If you are unsatisfied with Clippix Pro or Business within 7 days of initial subscription purchase, you are eligible for a 100% full refund provided you have consumed fewer than 20 credits.
            </li>
            <li>
              <strong className="text-white">Service Downtime / Technical Failures:</strong> If a payment was processed via Razorpay but credits were not allocated or AI processing failed due to server errors, a full refund or credit compensation will be issued.
            </li>
            <li>
              <strong className="text-white">Non-Refundable Items:</strong> Standalone top-up credit packs where credits have already been consumed are non-refundable.
            </li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <Clock className="w-4 h-4 text-[#3B82F6]" />
            3. Refund Processing Timeline
          </h2>
          <p>
            Once a refund request is approved by our billing team:
          </p>
          <div className="p-4 rounded-xl bg-[#09090B] border border-[#27272A] space-y-2 text-xs">
            <div className="flex justify-between">
              <span>Approval Time</span>
              <span className="text-white font-semibold">24 to 48 hours</span>
            </div>
            <div className="flex justify-between">
              <span>Razorpay Processing Window</span>
              <span className="text-emerald-400 font-bold">5 to 7 Business Days</span>
            </div>
            <div className="flex justify-between">
              <span>Refund Source</span>
              <span className="text-white font-semibold">Original Payment Method (UPI, Card, NetBanking)</span>
            </div>
          </div>
        </section>

        <section className="space-y-3">
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <Mail className="w-4 h-4 text-[#A78BFA]" />
            4. How to Request a Refund
          </h2>
          <p>
            To request a cancellation or refund, send an email to <a href="mailto:support@clippix.ai" className="text-[#22D3EE] font-bold underline">support@clippix.ai</a> with:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Your registered account email address</li>
            <li>Razorpay Payment ID (e.g., <code className="bg-[#09090B] px-1.5 py-0.5 rounded text-[#A78BFA]">pay_sub_xxxxxx</code>)</li>
            <li>Reason for the refund request</li>
          </ul>
        </section>
      </div>
    </div>
  );
};
