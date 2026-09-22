export const APP_NAME = 'Clippix';
export const APP_TAGLINE = 'AI-powered background removal and image editing';

export const COLORS = {
  bgMain: '#09090B',
  bgSecondary: '#111113',
  bgCard: '#18181B',
  border: '#27272A',
  primaryPurple: '#7C3AED',
  lightPurple: '#A78BFA',
  electricBlue: '#3B82F6',
  cyan: '#22D3EE',
  textPrimary: '#F4F4F5',
  textSecondary: '#A1A1AA',
  textMuted: '#71717A',
};

export interface PricingPlan {
  id: string;
  name: string;
  priceMonthly: number;
  priceAnnual: number;
  creditsMonthly: number;
  description: string;
  popular?: boolean;
  features: string[];
  cta: string;
  razorpayPlanIdMonthly?: string;
  razorpayPlanIdAnnual?: string;
}

export const PRICING_PLANS: PricingPlan[] = [
  {
    id: 'free',
    name: 'Free',
    priceMonthly: 0,
    priceAnnual: 0,
    creditsMonthly: 10,
    description: 'Perfect for trying out Clippix for personal projects.',
    features: [
      '10 free credits / month',
      'Standard resolution output',
      'PNG transparent downloads',
      '7-day image history retention',
      'Standard processing speed',
    ],
    cta: 'Get Started Free',
  },
  {
    id: 'pro',
    name: 'Pro',
    priceMonthly: 499,
    priceAnnual: 399,
    creditsMonthly: 250,
    popular: true,
    description: 'Ideal for creators, marketers, and e-commerce sellers.',
    features: [
      '250 credits / month',
      'Full HD high-res exports',
      'Instant priority AI processing',
      'No watermarks or quality compression',
      '30-day image history retention',
      'Custom background replacements',
      'Batch processing mode',
    ],
    cta: 'Upgrade to Pro',
    razorpayPlanIdMonthly: 'plan_pro_monthly',
    razorpayPlanIdAnnual: 'plan_pro_annual',
  },
  {
    id: 'business',
    name: 'Business',
    priceMonthly: 1999,
    priceAnnual: 1499,
    creditsMonthly: 1000,
    description: 'Designed for teams, agencies, and high-volume operations.',
    features: [
      '1,000 credits / month',
      'Ultra HD 4K resolution output',
      'Highest priority server queue',
      'Unlimited image history',
      'Developer API access (n8n/REST)',
      'Multi-user team workspace',
      'Dedicated email & chat support',
    ],
    cta: 'Start Business Plan',
    razorpayPlanIdMonthly: 'plan_biz_monthly',
    razorpayPlanIdAnnual: 'plan_biz_annual',
  },
];

export const SAMPLE_IMAGES = [
  {
    id: 'sample-sneaker',
    title: 'E-commerce Sneaker',
    original: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80',
    cutout: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80',
    category: 'E-Commerce'
  },
  {
    id: 'sample-portrait',
    title: 'Model Portrait',
    original: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
    cutout: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
    category: 'Portrait'
  },
  {
    id: 'sample-watch',
    title: 'Luxury Watch',
    original: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80',
    cutout: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80',
    category: 'Product'
  },
  {
    id: 'sample-car',
    title: 'Sports Car',
    original: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=800&q=80',
    cutout: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=800&q=80',
    category: 'Automotive'
  }
];
