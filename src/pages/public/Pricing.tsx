import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PRICING_PLANS } from '../../config/constants';
import { PricingCard } from '../../components/PricingCard';
import { useAuth } from '../../context/AuthContext';
import { useCredits } from '../../context/CreditContext';
import { openRazorpayCheckout } from '../../services/razorpay';
import { useToast } from '../../context/ToastContext';
import { Check, HelpCircle, Sparkles } from 'lucide-react';

export const Pricing: React.FC = () => {
  const [isAnnual, setIsAnnual] = useState<boolean>(true);
  const { user, isAuthenticated, setUserPlan } = useAuth();
  const { addCredits } = useCredits();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const handleSelectPlan = (planId: string) => {
    if (!isAuthenticated) {
      showToast('Account Required', 'Please log in or sign up to select a plan.', 'info');
      navigate('/login');
      return;
    }

    const selectedPlan = PRICING_PLANS.find((p) => p.id === planId);
    if (!selectedPlan) return;

    if (planId === 'free') {
      setUserPlan('free');
      showToast('Free Plan Active', 'Switched to Free Tier.', 'info');
      return;
    }

    const amount = isAnnual ? selectedPlan.priceAnnual * 12 : selectedPlan.priceMonthly;

    // Trigger Razorpay payment flow
    openRazorpayCheckout({
      amount,
      planName: selectedPlan.name,
      creditsToGain: selectedPlan.creditsMonthly,
      userEmail: user?.email || 'user@clippix.ai',
      userName: user?.fullName || 'Clippix User',
      onSuccess: (paymentId) => {
        setUserPlan(selectedPlan.id as any);
        addCredits(selectedPlan.creditsMonthly, 'subscription', `Subscription payment (${paymentId})`);
        showToast('Subscription Active!', `Upgraded to ${selectedPlan.name} Plan via Razorpay.`, 'success');
        navigate('/dashboard');
      },
    });
  };

  const faqs = [
    {
      q: 'How do background removal credits work?',
      a: '1 background removal consumes 1 credit. Free accounts receive 10 credits monthly. Pro plan provides 250 credits per month.',
    },
    {
      q: 'What payment methods does Razorpay support?',
      a: 'Razorpay supports Credit/Debit cards (Visa, Mastercard, Amex), UPI (Google Pay, PhonePe), NetBanking, and Wallets.',
    },
    {
      q: 'Can I cancel or change my plan anytime?',
      a: 'Yes, you can upgrade, downgrade, or cancel your subscription at any time from your Billing page without hidden fees.',
    },
    {
      q: 'Are my uploaded images kept private?',
      a: 'Yes. Images are uploaded over SSL, processed strictly for background removal, and automatically cleared per your account data retention settings.',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-20">
      {/* Page Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#18181B] border border-[#7C3AED]/40 text-xs font-semibold text-[#A78BFA]">
          <Sparkles className="w-3.5 h-3.5 text-[#22D3EE]" />
          <span>Simple, Transparent SaaS Pricing</span>
        </div>
        <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight">
          Choose the Perfect Plan for Your Workflow
        </h1>
        <p className="text-sm sm:text-base text-[#A1A1AA]">
          Start free with 10 monthly credits. Upgrade anytime for HD output and high-volume limits.
        </p>

        {/* Monthly / Annual Billing Toggle */}
        <div className="pt-4 flex items-center justify-center gap-4">
          <span className={`text-xs font-semibold ${!isAnnual ? 'text-white' : 'text-[#71717A]'}`}>
            Monthly Billing
          </span>
          <button
            onClick={() => setIsAnnual(!isAnnual)}
            className="w-14 h-8 rounded-full bg-[#18181B] border border-[#27272A] p-1 relative transition-colors focus:outline-none"
          >
            <div
              className={`w-6 h-6 rounded-full bg-gradient-to-r from-[#7C3AED] to-[#3B82F6] transition-transform ${
                isAnnual ? 'translate-x-6' : 'translate-x-0'
              }`}
            />
          </button>
          <span className={`text-xs font-semibold flex items-center gap-1.5 ${isAnnual ? 'text-white' : 'text-[#71717A]'}`}>
            Annual Billing
            <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[10px] font-bold">
              Save 20%
            </span>
          </span>
        </div>
      </div>

      {/* Pricing Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch pt-4 max-w-6xl mx-auto">
        {PRICING_PLANS.map((plan) => (
          <PricingCard
            key={plan.id}
            plan={plan}
            isAnnual={isAnnual}
            onSelectPlan={handleSelectPlan}
            isCurrentPlan={user?.plan === plan.id}
          />
        ))}
      </div>

      {/* Feature Comparison Matrix */}
      <div className="max-w-5xl mx-auto rounded-3xl bg-[#18181B] border border-[#27272A] p-6 sm:p-10 space-y-8">
        <h3 className="text-xl font-bold text-white text-center sm:text-left">Feature Comparison</h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-[#27272A] text-[#A1A1AA]">
                <th className="py-3 px-4 font-bold uppercase">Features</th>
                <th className="py-3 px-4 font-bold uppercase text-center">Free</th>
                <th className="py-3 px-4 font-bold uppercase text-center text-[#A78BFA]">Pro</th>
                <th className="py-3 px-4 font-bold uppercase text-center text-[#22D3EE]">Business</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#27272A] text-[#F4F4F5]">
              <tr>
                <td className="py-3 px-4 font-medium">Monthly Credits</td>
                <td className="py-3 px-4 text-center">10</td>
                <td className="py-3 px-4 text-center font-bold text-[#A78BFA]">250</td>
                <td className="py-3 px-4 text-center font-bold text-[#22D3EE]">1,000</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-medium">Output Quality</td>
                <td className="py-3 px-4 text-center">Standard</td>
                <td className="py-3 px-4 text-center font-semibold text-emerald-400">Full HD</td>
                <td className="py-3 px-4 text-center font-semibold text-emerald-400">Ultra 4K HD</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-medium">Processing Queue</td>
                <td className="py-3 px-4 text-center">Standard</td>
                <td className="py-3 px-4 text-center">Priority</td>
                <td className="py-3 px-4 text-center">Dedicated GPU</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-medium">Custom Backgrounds</td>
                <td className="py-3 px-4 text-center text-[#71717A]">—</td>
                <td className="py-3 px-4 text-center"><Check className="w-4 h-4 text-emerald-400 inline" /></td>
                <td className="py-3 px-4 text-center"><Check className="w-4 h-4 text-emerald-400 inline" /></td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-medium">Developer API & n8n</td>
                <td className="py-3 px-4 text-center text-[#71717A]">—</td>
                <td className="py-3 px-4 text-center text-[#71717A]">—</td>
                <td className="py-3 px-4 text-center"><Check className="w-4 h-4 text-emerald-400 inline" /></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center space-y-2">
          <h3 className="text-2xl font-bold text-white flex items-center justify-center gap-2">
            <HelpCircle className="w-6 h-6 text-[#A78BFA]" />
            Frequently Asked Questions
          </h3>
          <p className="text-xs text-[#A1A1AA]">Got questions about Clippix pricing? We have answers.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {faqs.map((faq, idx) => (
            <div key={idx} className="p-6 rounded-2xl bg-[#18181B] border border-[#27272A] space-y-2">
              <h4 className="text-sm font-bold text-white">{faq.q}</h4>
              <p className="text-xs text-[#A1A1AA] leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
