import React, { createContext, useContext, ReactNode } from 'react';
import { Elements } from '@stripe/react-stripe-js';
import stripePromise from '@/lib/stripe';

interface StripeProviderProps {
  children: ReactNode;
  amount?: number;
}

const StripeContext = createContext({});

export const useStripeContext = () => {
  return useContext(StripeContext);
};

export const StripeProvider = ({ children, amount = 1000 }: StripeProviderProps) => {
  const options = {
    mode: 'payment' as const,
    amount,
    currency: 'usd',
    appearance: {
      theme: 'stripe' as const,
      variables: {
        colorPrimary: 'hsl(var(--primary))',
        colorBackground: 'hsl(var(--background))',
        colorText: 'hsl(var(--foreground))',
        colorDanger: 'hsl(var(--destructive))',
        fontFamily: 'Inter, system-ui, sans-serif',
        spacingUnit: '4px',
        borderRadius: '6px',
      },
    },
  };

  return (
    <StripeContext.Provider value={{}}>
      <Elements stripe={stripePromise} options={options}>
        {children}
      </Elements>
    </StripeContext.Provider>
  );
}; 