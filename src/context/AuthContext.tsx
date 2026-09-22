import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { UserProfile, DEFAULT_DEMO_USER } from '../services/supabase';
import { useToast } from './ToastContext';

interface AuthContextType {
  user: UserProfile | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  isLoading: boolean;
  login: (email: string, pass: string) => Promise<boolean>;
  signup: (name: string, email: string, pass: string) => Promise<boolean>;
  logout: () => void;
  forgotPassword: (email: string) => Promise<boolean>;
  updateProfile: (data: Partial<UserProfile>) => void;
  setUserPlan: (plan: 'free' | 'pro' | 'business') => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(() => {
    const saved = localStorage.getItem('clippix_auth_user');
    return saved ? JSON.parse(saved) : DEFAULT_DEMO_USER;
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { showToast } = useToast();

  useEffect(() => {
    if (user) {
      localStorage.setItem('clippix_auth_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('clippix_auth_user');
    }
  }, [user]);

  const login = async (email: string, _pass: string): Promise<boolean> => {
    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 600)); // Simulate auth network latency

    const isAdminUser = email.toLowerCase().includes('admin');
    const loggedInUser: UserProfile = {
      ...DEFAULT_DEMO_USER,
      email,
      fullName: email.split('@')[0].replace('.', ' '),
      role: isAdminUser ? 'admin' : 'user',
    };

    setUser(loggedInUser);
    setIsLoading(false);
    showToast('Welcome back!', `Signed in as ${loggedInUser.email}`, 'success');
    return true;
  };

  const signup = async (name: string, email: string, _pass: string): Promise<boolean> => {
    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 700));

    const newUser: UserProfile = {
      id: `usr_${Date.now()}`,
      email,
      fullName: name,
      plan: 'free',
      credits: 10,
      createdAt: new Date().toISOString(),
      role: 'user',
    };

    setUser(newUser);
    setIsLoading(false);
    showToast('Account Created!', 'Welcome to Clippix. 10 Free credits added.', 'success');
    return true;
  };

  const logout = () => {
    setUser(null);
    showToast('Signed out', 'You have been logged out securely.', 'info');
  };

  const forgotPassword = async (email: string): Promise<boolean> => {
    await new Promise((r) => setTimeout(r, 500));
    showToast('Password Reset Sent', `Reset link emailed to ${email}`, 'info');
    return true;
  };

  const updateProfile = (data: Partial<UserProfile>) => {
    if (!user) return;
    const updated = { ...user, ...data };
    setUser(updated);
    showToast('Profile Updated', 'Your profile details have been saved.', 'success');
  };

  const setUserPlan = (plan: 'free' | 'pro' | 'business') => {
    if (!user) return;
    const creditsMap = { free: 10, pro: 250, business: 1000 };
    const updated = { ...user, plan, credits: user.credits + creditsMap[plan] };
    setUser(updated);
  };

  const isAuthenticated = !!user;
  const isAdmin = user?.role === 'admin' || user?.email.includes('admin') || false;

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        isAdmin,
        isLoading,
        login,
        signup,
        logout,
        forgotPassword,
        updateProfile,
        setUserPlan,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
