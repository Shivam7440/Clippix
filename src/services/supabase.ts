import { createClient, SupabaseClient } from '@supabase/supabase-js';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || 'https://demo-clippix.supabase.co';
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || 'demo-anon-key-clippix-2026';

export const isSupabaseConfigured = () => {
  return !!import.meta.env.VITE_SUPABASE_URL && !!import.meta.env.VITE_SUPABASE_ANON_KEY;
};

export const supabase: SupabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
});

export interface UserProfile {
  id: string;
  email: string;
  fullName: string;
  avatarUrl?: string;
  plan: 'free' | 'pro' | 'business';
  credits: number;
  createdAt: string;
  role?: 'user' | 'admin';
}

export interface ImageJob {
  id: string;
  userId: string;
  fileName: string;
  originalUrl: string;
  resultUrl?: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  creditsUsed: number;
  processingTimeMs?: number;
  width?: number;
  height?: number;
  createdAt: string;
}

export interface CreditTransaction {
  id: string;
  userId: string;
  amount: number; // positive for addition (+100), negative for deduction (-1)
  type: 'subscription' | 'purchase' | 'background_removal' | 'refund' | 'bonus';
  description: string;
  createdAt: string;
}

// Initial Mock User Session state for smooth demo experience if Supabase key is unset
export const DEFAULT_DEMO_USER: UserProfile = {
  id: 'usr_demo_8821',
  email: 'alex.creator@clippix.ai',
  fullName: 'Alex Morgan',
  avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
  plan: 'pro',
  credits: 24,
  createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
  role: 'user',
};

// Initial Mock Jobs
export const INITIAL_MOCK_JOBS: ImageJob[] = [
  {
    id: 'job-101',
    userId: 'usr_demo_8821',
    fileName: 'nike_air_max_studio.png',
    originalUrl: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80',
    resultUrl: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80',
    status: 'completed',
    creditsUsed: 1,
    processingTimeMs: 1420,
    width: 1920,
    height: 1080,
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'job-102',
    userId: 'usr_demo_8821',
    fileName: 'fashion_model_portrait.jpg',
    originalUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
    resultUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
    status: 'completed',
    creditsUsed: 1,
    processingTimeMs: 1180,
    width: 2400,
    height: 3200,
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'job-103',
    userId: 'usr_demo_8821',
    fileName: 'vintage_chronograph_watch.jpg',
    originalUrl: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80',
    resultUrl: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80',
    status: 'completed',
    creditsUsed: 1,
    processingTimeMs: 950,
    width: 1200,
    height: 1200,
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'job-104',
    userId: 'usr_demo_8821',
    fileName: 'porsche_911_gt3_black.webp',
    originalUrl: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=800&q=80',
    resultUrl: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=800&q=80',
    status: 'completed',
    creditsUsed: 1,
    processingTimeMs: 1840,
    width: 3840,
    height: 2160,
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
  },
];

export const INITIAL_MOCK_TRANSACTIONS: CreditTransaction[] = [
  {
    id: 'tx-201',
    userId: 'usr_demo_8821',
    amount: 250,
    type: 'subscription',
    description: 'Pro Monthly Subscription Allocation',
    createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'tx-202',
    userId: 'usr_demo_8821',
    amount: -1,
    type: 'background_removal',
    description: 'Background removal: nike_air_max_studio.png',
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'tx-203',
    userId: 'usr_demo_8821',
    amount: -1,
    type: 'background_removal',
    description: 'Background removal: fashion_model_portrait.jpg',
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'tx-204',
    userId: 'usr_demo_8821',
    amount: 50,
    type: 'purchase',
    description: 'Credit Pack Top-up (50 Credits)',
    createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
  },
];
