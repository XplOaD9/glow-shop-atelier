import { useState, useEffect } from 'react';
import { useCart } from '@/contexts/CartContext';

interface PaymentIntentData {
  clientSecret: string | null;
  error: string | null;
  loading: boolean;
}

interface CustomerInfo {
  email: string;
  name: string;
  address: {
    line1: string;
    city: string;
    state: string;
    postal_code: string;
    country: string;
  };
}

interface PaymentIntentOptions {
  quickMode?: boolean; // New option to skip artificial delays
  delayMs?: number;    // Configurable delay (default 1500ms)
}

export const usePaymentIntent = (
  customerInfo?: CustomerInfo, 
  options: PaymentIntentOptions = {}
): PaymentIntentData => {
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { items, total } = useCart();

  const { quickMode = false, delayMs = 1500 } = options;

  useEffect(() => {
    if (!customerInfo || items.length === 0) {
      return;
    }

    const createPaymentIntent = async () => {
      setLoading(true);
      setError(null);

      try {
        // Calculate total amount including shipping and taxes
        const shippingCost = total > 100 ? 0 : 10;
        const tax = total * 0.08;
        const finalTotal = total + shippingCost + tax;
        const amount = Math.round(finalTotal * 100); // Convert to cents for Stripe
        
        // For demo purposes, we'll create a mock PaymentIntent
        // In production, this should be a call to your backend API
        const mockPaymentIntent = {
          client_secret: `pi_demo_${Date.now()}_secret_${Math.random().toString(36).substr(2, 9)}`,
          amount,
          currency: 'usd',
          status: 'requires_payment_method'
        };

        // Simulate API call delay - configurable or skippable in quick mode
        if (!quickMode) {
          await new Promise(resolve => setTimeout(resolve, delayMs));
        }
        
        setClientSecret(mockPaymentIntent.client_secret);
        
        console.log('PaymentIntent created:', {
          amount: amount / 100,
          currency: 'USD',
          customer: customerInfo.name,
          items: items.length,
          quickMode: quickMode ? 'enabled' : 'disabled'
        });

      } catch (err) {
        console.error('Error creating PaymentIntent:', err);
        setError('Failed to initialize payment. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    createPaymentIntent();
  }, [customerInfo, items, total, quickMode, delayMs]);

  return { clientSecret, error, loading };
}; 