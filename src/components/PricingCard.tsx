import React from 'react';
import { Check, Sparkles, Zap } from 'lucide-react';
import { PricingPlan } from '../config/constants';
import { formatCurrency } from '../utils/formatters';

interface PricingCardProps {
  plan: PricingPlan;
  isAnnual: boolean;
  onSelectPlan: (planId: string) => void;
  isCurrentPlan?: boolean;
}

export const PricingCard: React.FC<PricingCardProps> = ({
  plan,
  isAnnual,
  onSelectPlan,
  isCurrentPlan = false,
}) => {
  const price = isAnnual ? plan.priceAnnual : plan.priceMonthly;

  return (
    <div
      className={`relative rounded-3xl p-8 flex flex-col justify-between transition-all duration-300 ${
        plan.popular
          ? 'bg-[#18181B] border-2 border-[#7C3AED] shadow-[0_0_40px_rgba(124,58,237,0.25)] scale-[1.03] z-10'
          : 'bg-[#111113] border border-[#27272A] hover:border-[#3B82F6]/50'
      }`}
    >
      {/* Popular Badge */}
      {plan.popular && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-[#7C3AED] to-[#3B82F6] text-white text-xs font-bold uppercase tracking-wider shadow-lg flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5" />
          Most Popular
        </div>
      )}

      <div>
        {/* Header */}
        <div className="mb-6">
          <h3 className="text-xl font-bold text-white mb-2">{plan.name}</h3>
          <p className="text-xs text-[#A1A1AA] min-h-[36px]">{plan.description}</p>
        </div>

        {/* Pricing */}
        <div className="mb-8 flex items-baseline gap-1">
          <span className="text-4xl sm:text-5xl font-extrabold text-white">
            {price === 0 ? 'Free' : formatCurrency(price)}
          </span>
          {price > 0 && (
            <span className="text-xs font-medium text-[#71717A]">
              / month {isAnnual ? '(billed annually)' : ''}
            </span>
          )}
        </div>

        {/* Credits Highlight Pill */}
        <div className="mb-8 p-3 rounded-2xl bg-[#09090B] border border-[#27272A] flex items-center justify-between">
          <span className="text-xs text-[#A1A1AA]">Monthly Credits</span>
          <span className="text-sm font-bold text-[#A78BFA] flex items-center gap-1">
            <Zap className="w-4 h-4 text-[#22D3EE]" />
            {plan.creditsMonthly} Credits
          </span>
        </div>

        {/* Features list */}
        <div className="space-y-3 mb-8">
          <p className="text-xs font-bold uppercase tracking-wider text-[#71717A]">Includes:</p>
          {plan.features.map((feature, i) => (
            <div key={i} className="flex items-start gap-3">
              <div className="mt-0.5 w-4 h-4 rounded-full bg-[#7C3AED]/20 border border-[#7C3AED]/50 flex items-center justify-center flex-shrink-0">
                <Check className="w-2.5 h-2.5 text-[#A78BFA]" />
              </div>
              <span className="text-xs text-[#F4F4F5]">{feature}</span>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Button */}
      <button
        onClick={() => onSelectPlan(plan.id)}
        disabled={isCurrentPlan}
        className={`w-full py-3.5 rounded-xl font-bold text-xs transition-all duration-300 ${
          isCurrentPlan
            ? 'bg-[#27272A] text-[#A1A1AA] cursor-default'
            : plan.popular
            ? 'bg-gradient-to-r from-[#7C3AED] to-[#3B82F6] hover:from-[#6D28D9] hover:to-[#2563EB] text-white shadow-[0_0_20px_rgba(124,58,237,0.4)] transform hover:scale-[1.02]'
            : 'bg-[#18181B] border border-[#27272A] hover:border-[#7C3AED] text-white hover:bg-[#27272A]'
        }`}
      >
        {isCurrentPlan ? 'Current Active Plan' : plan.cta}
      </button>
    </div>
  );
};
