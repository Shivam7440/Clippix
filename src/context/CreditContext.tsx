import React, { createContext, useContext, useState, ReactNode } from 'react';
import { CreditTransaction, INITIAL_MOCK_TRANSACTIONS } from '../services/supabase';
import { useAuth } from './AuthContext';
import { useToast } from './ToastContext';

interface CreditContextType {
  creditsRemaining: number;
  creditsUsedTotal: number;
  transactions: CreditTransaction[];
  deductCredit: (jobName: string) => boolean;
  addCredits: (amount: number, type: CreditTransaction['type'], description: string) => void;
  hasEnoughCredits: boolean;
}

const CreditContext = createContext<CreditContextType | undefined>(undefined);

export const CreditProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { user, updateProfile } = useAuth();
  const { showToast } = useToast();
  const [transactions, setTransactions] = useState<CreditTransaction[]>(INITIAL_MOCK_TRANSACTIONS);

  const creditsRemaining = user?.credits ?? 0;

  const creditsUsedTotal = transactions
    .filter((tx) => tx.amount < 0)
    .reduce((acc, curr) => acc + Math.abs(curr.amount), 0);

  const deductCredit = (jobName: string): boolean => {
    if (creditsRemaining <= 0) {
      showToast(
        'Insufficient Credits',
        'You have run out of background removal credits. Please upgrade your plan.',
        'warning'
      );
      return false;
    }

    const newCreditBalance = creditsRemaining - 1;
    if (user) {
      updateProfile({ credits: newCreditBalance });
    }

    const newTx: CreditTransaction = {
      id: `tx_${Date.now()}`,
      userId: user?.id || 'usr_demo',
      amount: -1,
      type: 'background_removal',
      description: `Background removal: ${jobName}`,
      createdAt: new Date().toISOString(),
    };

    setTransactions((prev) => [newTx, ...prev]);
    showToast('Credit Deducted', '1 credit used for background removal', 'info');
    return true;
  };

  const addCredits = (amount: number, type: CreditTransaction['type'], description: string) => {
    const newCreditBalance = creditsRemaining + amount;
    if (user) {
      updateProfile({ credits: newCreditBalance });
    }

    const newTx: CreditTransaction = {
      id: `tx_${Date.now()}`,
      userId: user?.id || 'usr_demo',
      amount,
      type,
      description,
      createdAt: new Date().toISOString(),
    };

    setTransactions((prev) => [newTx, ...prev]);
    showToast('Credits Added!', `Successfully added +${amount} credits to your balance.`, 'success');
  };

  const hasEnoughCredits = creditsRemaining > 0;

  return (
    <CreditContext.Provider
      value={{
        creditsRemaining,
        creditsUsedTotal,
        transactions,
        deductCredit,
        addCredits,
        hasEnoughCredits,
      }}
    >
      {children}
    </CreditContext.Provider>
  );
};

export const useCredits = () => {
  const context = useContext(CreditContext);
  if (!context) throw new Error('useCredits must be used within CreditProvider');
  return context;
};
