import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useCredits } from '../../context/CreditContext';
import { useToast } from '../../context/ToastContext';
import { openRazorpayCheckout } from '../../services/razorpay';
import { PRICING_PLANS } from '../../config/constants';
import { formatDate, formatCurrency } from '../../utils/formatters';
import { Modal } from '../../components/Modal';
import { CreditCard, Sparkles, Zap, ArrowUpRight, History, CheckCircle2 } from 'lucide-react';

export const Billing: React.FC = () => {
  const { user, setUserPlan } = useAuth();
  const { creditsRemaining, addCredits, transactions } = useCredits();
  const { showToast } = useToast();

  const [topUpModalOpen, setTopUpModalOpen] = useState(false);
  const [cancelModalOpen, setCancelModalOpen] = useState(false);

  const handleBuyCreditPack = (packAmount: number, priceInr: number) => {
    openRazorpayCheckout({
      amount: priceInr,
      planName: `${packAmount} Extra Credits Pack`,
      creditsToGain: packAmount,
      userEmail: user?.email || 'user@clippix.ai',
      userName: user?.fullName || 'Clippix User',
      onSuccess: (paymentId) => {
        addCredits(packAmount, 'purchase', `Top-up credit pack (${paymentId})`);
        setTopUpModalOpen(false);
      },
    });
  };

  const currentPlanDetails = PRICING_PLANS.find((p) => p.id === (user?.plan || 'free')) || PRICING_PLANS[0];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10 pb-20">
      {/* Header */}
      <div className="border-b border-[#27272A] pb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#7C3AED]/10 border border-[#7C3AED]/30 text-xs font-bold text-[#A78BFA] mb-2">
            <CreditCard className="w-3.5 h-3.5" />
            Razorpay Subscription Management
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-white">Billing & Subscription</h1>
        </div>

        <button
          onClick={() => setTopUpModalOpen(true)}
          className="px-5 py-2.5 rounded-xl font-bold text-xs text-white bg-gradient-to-r from-[#7C3AED] to-[#3B82F6] hover:scale-105 transition-transform flex items-center gap-2 shadow-lg"
        >
          <Zap className="w-4 h-4 text-[#22D3EE]" />
          Buy Extra Credits
        </button>
      </div>

      {/* Subscription Status Card */}
      <div className="rounded-3xl p-6 sm:p-8 bg-[#18181B] border border-[#7C3AED]/40 relative overflow-hidden shadow-2xl">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          <div className="md:col-span-8 space-y-3">
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 rounded-full bg-[#7C3AED]/20 text-[#A78BFA] border border-[#7C3AED]/40 text-xs font-bold uppercase">
                Active Plan
              </span>
              <span className="text-xs text-emerald-400 font-semibold flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> Auto-Renewing
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white capitalize">
              {currentPlanDetails.name} Subscription
            </h2>
            <p className="text-xs text-[#A1A1AA]">
              Includes {currentPlanDetails.creditsMonthly} background removal credits per month with HD export capabilities.
            </p>
          </div>

          <div className="md:col-span-4 p-5 rounded-2xl bg-[#09090B] border border-[#27272A] space-y-3 text-xs">
            <div className="flex justify-between">
              <span className="text-[#A1A1AA]">Credits Remaining</span>
              <span className="text-white font-bold">{creditsRemaining} Credits</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#A1A1AA]">Billing Cycle</span>
              <span className="text-white font-semibold">Monthly</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#A1A1AA]">Next Renewal</span>
              <span className="text-[#A78BFA] font-semibold">Oct 14, 2026</span>
            </div>
          </div>
        </div>

        {/* Action triggers */}
        <div className="pt-6 mt-6 border-t border-[#27272A] flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <a
              href="/pricing"
              className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-[#7C3AED] to-[#3B82F6] hover:scale-105 transition-transform"
            >
              Upgrade / Change Plan
            </a>
            {user?.plan !== 'free' && (
              <button
                onClick={() => setCancelModalOpen(true)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-rose-400 hover:bg-rose-500/10 transition-colors"
              >
                Cancel Subscription
              </button>
            )}
          </div>

          <span className="text-[11px] text-[#71717A]">
            Secured with Razorpay 256-Bit SSL Encryption
          </span>
        </div>
      </div>

      {/* Credit Transactions History */}
      <div className="rounded-3xl p-6 sm:p-8 bg-[#18181B] border border-[#27272A] space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <History className="w-5 h-5 text-[#22D3EE]" />
            Credit Transaction History
          </h3>
          <span className="text-xs text-[#71717A]">{transactions.length} total entries</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-[#27272A] text-[#A1A1AA]">
                <th className="py-3 px-4 font-bold uppercase">Date</th>
                <th className="py-3 px-4 font-bold uppercase">Description</th>
                <th className="py-3 px-4 font-bold uppercase">Type</th>
                <th className="py-3 px-4 font-bold uppercase text-right">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#27272A] text-[#F4F4F5]">
              {transactions.map((tx) => (
                <tr key={tx.id}>
                  <td className="py-3.5 px-4 text-[#71717A]">{formatDate(tx.createdAt)}</td>
                  <td className="py-3.5 px-4 font-semibold">{tx.description}</td>
                  <td className="py-3.5 px-4">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                        tx.type === 'subscription'
                          ? 'bg-[#7C3AED]/20 text-[#A78BFA]'
                          : tx.type === 'purchase'
                          ? 'bg-[#22D3EE]/20 text-[#22D3EE]'
                          : 'bg-zinc-800 text-[#A1A1AA]'
                      }`}
                    >
                      {tx.type.replace('_', ' ')}
                    </span>
                  </td>
                  <td
                    className={`py-3.5 px-4 text-right font-extrabold ${
                      tx.amount > 0 ? 'text-emerald-400' : 'text-rose-400'
                    }`}
                  >
                    {tx.amount > 0 ? `+${tx.amount}` : tx.amount}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Top-up Credit Pack Modal */}
      <Modal isOpen={topUpModalOpen} onClose={() => setTopUpModalOpen(false)} title="Buy Extra Credits">
        <div className="space-y-4">
          <p className="text-xs text-[#A1A1AA]">
            Select a top-up credit pack to add non-expiring background removal credits to your balance instantly.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div className="p-5 rounded-2xl bg-[#09090B] border border-[#27272A] space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm font-bold text-white">50 Credits</span>
                <span className="text-base font-extrabold text-[#A78BFA]">₹199</span>
              </div>
              <p className="text-[11px] text-[#71717A]">₹3.98 per removal</p>
              <button
                onClick={() => handleBuyCreditPack(50, 199)}
                className="w-full py-2.5 rounded-xl font-bold text-xs text-white bg-[#7C3AED] hover:bg-[#6D28D9] transition-colors"
              >
                Pay ₹199 via Razorpay
              </button>
            </div>

            <div className="p-5 rounded-2xl bg-[#09090B] border border-[#3B82F6]/50 space-y-3 relative">
              <span className="absolute -top-2.5 right-3 px-2 py-0.5 rounded-full bg-[#3B82F6] text-white text-[9px] font-bold uppercase">
                Best Value
              </span>
              <div className="flex justify-between items-center">
                <span className="text-sm font-bold text-white">200 Credits</span>
                <span className="text-base font-extrabold text-[#22D3EE]">₹599</span>
              </div>
              <p className="text-[11px] text-[#71717A]">₹2.99 per removal</p>
              <button
                onClick={() => handleBuyCreditPack(200, 599)}
                className="w-full py-2.5 rounded-xl font-bold text-xs text-white bg-gradient-to-r from-[#7C3AED] to-[#3B82F6] hover:scale-105 transition-transform"
              >
                Pay ₹599 via Razorpay
              </button>
            </div>
          </div>
        </div>
      </Modal>

      {/* Cancel Modal */}
      <Modal isOpen={cancelModalOpen} onClose={() => setCancelModalOpen(false)} title="Cancel Subscription">
        <div className="space-y-4">
          <p className="text-xs text-[#A1A1AA] leading-relaxed">
            Canceling your subscription will downgrade your account to the Free plan at the end of your billing cycle. You will keep remaining credits.
          </p>
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#27272A]">
            <button
              onClick={() => setCancelModalOpen(false)}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-[#A1A1AA]"
            >
              Keep Subscription
            </button>
            <button
              onClick={() => {
                setUserPlan('free');
                setCancelModalOpen(false);
                showToast('Subscription Canceled', 'Downgraded to Free tier.', 'info');
              }}
              className="px-5 py-2 rounded-xl font-bold text-xs text-white bg-rose-600 hover:bg-rose-700"
            >
              Confirm Cancellation
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
