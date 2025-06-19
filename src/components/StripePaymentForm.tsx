import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CreditCard, Lock, AlertCircle, ExternalLink, ArrowRight, Zap, Settings } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { useCart } from '@/contexts/CartContext';
import OrderSuccessModal from '@/components/OrderSuccessModal';

interface StripePaymentFormProps {
  clientSecret: string;
  customerInfo: {
    email: string;
    name: string;
    address: {
      line1: string;
      city: string;
      state: string;
      postal_code: string;
      country: string;
    };
  };
  quickMode?: boolean; // New prop for quick testing
}

const StripePaymentForm = ({ clientSecret, customerInfo, quickMode = false }: StripePaymentFormProps) => {
  const { clearCart, total } = useCart();
  const [isRedirecting, setIsRedirecting] = useState(false);
  const [redirectTimeout, setRedirectTimeout] = useState(2000); // Configurable timeout
  const [showAdvancedOptions, setShowAdvancedOptions] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [orderDetails, setOrderDetails] = useState({ orderId: '', amount: 0 });

  const shippingCost = total > 100 ? 0 : 10;
  const tax = total * 0.08;
  const finalTotal = total + shippingCost + tax;

  // Check if this is a demo payment
  const isDemoMode = clientSecret.includes('demo');

  // SOLUTION 1: Immediate redirect function
  const handleImmediateRedirect = () => {
    setIsRedirecting(true);
    
    toast({
      title: "Quick Redirect",
      description: "Redirecting immediately to Stripe checkout.",
    });

    if (isDemoMode) {
      const demoStripeUrl = createDemoStripeUrl();
      const stripeWindow = window.open(demoStripeUrl, '_blank', 'width=800,height=600');
      
      // Monitor the demo window
      const checkWindow = setInterval(() => {
        if (stripeWindow?.closed) {
          clearInterval(checkWindow);
          handlePaymentCompletion();
        }
      }, 1000);

      // Auto-close after 10 seconds
      setTimeout(() => {
        if (stripeWindow && !stripeWindow.closed) {
          stripeWindow.close();
          handlePaymentCompletion();
        }
      }, 10000);
    } else {
      window.location.href = 'https://checkout.stripe.com/pay/demo-session';
    }
  };

  // SOLUTION 2: Configurable timeout redirect
  const handleStripeRedirect = async (customTimeout?: number) => {
    setIsRedirecting(true);
    const timeoutMs = customTimeout || redirectTimeout;

    try {
      toast({
        title: "Initializing redirect...",
        description: `Redirecting in ${timeoutMs/1000}s to Stripe for secure payment processing.`,
      });

      // Skip or use configurable timeout
      if (!quickMode && timeoutMs > 0) {
        await new Promise(resolve => setTimeout(resolve, timeoutMs));
      }

      if (isDemoMode) {
        const demoStripeUrl = createDemoStripeUrl();
        
        toast({
          title: "Redirecting to Stripe",
          description: "Opening Stripe payment page in a new window.",
        });

        const stripeWindow = window.open(demoStripeUrl, '_blank', 'width=800,height=600');
        
        const checkWindow = setInterval(() => {
          if (stripeWindow?.closed) {
            clearInterval(checkWindow);
            handlePaymentCompletion();
          }
        }, 1000);

        setTimeout(() => {
          if (stripeWindow && !stripeWindow.closed) {
            stripeWindow.close();
            handlePaymentCompletion();
          }
        }, 10000);

      } else {
        window.location.href = 'https://checkout.stripe.com/pay/demo-session';
      }

    } catch (error) {
      console.error('Redirect error:', error);
      toast({
        title: "Error",
        description: "An error occurred redirecting to Stripe. Please try again.",
        variant: "destructive",
      });
      setIsRedirecting(false);
    }
  };

  const createDemoStripeUrl = () => {
    const params = new URLSearchParams({
      amount: (finalTotal * 100).toString(),
      currency: 'usd',
      customer_email: customerInfo.email,
      customer_name: customerInfo.name,
      success_url: `${window.location.origin}/checkout/success?demo=true`,
      cancel_url: `${window.location.origin}/checkout`
    });
    
    // Use local demo page instead of external URL
    return `${window.location.origin}/stripe-demo.html?${params.toString()}`;
  };

  const handlePaymentCompletion = () => {
    setIsRedirecting(false);
    
    // Generate random order ID
    const orderId = `ORD-${Math.random().toString(36).substr(2, 8).toUpperCase()}`;
    
    // Clear cart
    clearCart();
    
    // Set order details and show modal
    setOrderDetails({ orderId, amount: finalTotal });
    setShowSuccessModal(true);
  };

  const handleModalClose = () => {
    setShowSuccessModal(false);
    // Redirect to home page
    window.location.href = '/';
  };

  return (
    <>
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <CreditCard className="w-5 h-5" />
            <span>Complete Payment</span>
          </div>
          {/* Advanced Options Toggle */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowAdvancedOptions(!showAdvancedOptions)}
            className="text-xs"
          >
            <Settings className="w-4 h-4 mr-1" />
            Options
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {isDemoMode && (
            <div className="flex items-center space-x-2 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <AlertCircle className="w-5 h-5 text-blue-600" />
              <div>
                <p className="text-sm font-medium text-blue-800">Stripe Demo</p>
                <p className="text-xs text-blue-700">
                  You will be redirected to a demo Stripe page to see the complete process.
                </p>
              </div>
            </div>
          )}

          {/* SOLUTION 3: Advanced Options Panel */}
          {showAdvancedOptions && (
            <div className="border border-dashed border-gray-300 rounded-lg p-4 bg-gray-50 space-y-4">
              <h4 className="font-medium text-sm text-gray-700">Developer Options</h4>
              
              {/* Timeout Configuration */}
              <div className="space-y-2">
                <label className="text-xs font-medium text-gray-600">Redirect Timeout (ms):</label>
                <div className="flex items-center space-x-2">
                  <input
                    type="number"
                    value={redirectTimeout}
                    onChange={(e) => setRedirectTimeout(Number(e.target.value))}
                    className="w-20 px-2 py-1 text-xs border rounded"
                    min="0"
                    max="5000"
                    step="500"
                  />
                  <span className="text-xs text-gray-500">0 = instant</span>
                </div>
              </div>

              {/* Quick Test Buttons */}
              <div className="flex flex-wrap gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleStripeRedirect(0)}
                  disabled={isRedirecting}
                  className="text-xs"
                >
                  <Zap className="w-3 h-3 mr-1" />
                  Instant (0ms)
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleStripeRedirect(500)}
                  disabled={isRedirecting}
                  className="text-xs"
                >
                  Fast (0.5s)
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleStripeRedirect(1000)}
                  disabled={isRedirecting}
                  className="text-xs"
                >
                  Normal (1s)
                </Button>
              </div>
            </div>
          )}

          {/* Payment Method Selection */}
          <div className="space-y-4">
            <h4 className="font-medium">Payment Method</h4>
            <div className="border border-primary bg-primary/5 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded flex items-center justify-center">
                    <span className="text-white text-xs font-bold">STRIPE</span>
                  </div>
                  <div>
                    <p className="font-medium">Stripe Checkout</p>
                    <p className="text-sm text-muted-foreground">
                      Secure payment with credit/debit card
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-muted-foreground">Secure</p>
                  <div className="flex items-center text-xs text-green-600">
                    <Lock className="w-3 h-3 mr-1" />
                    SSL
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Accepted Payment Methods */}
          <div className="space-y-3">
            <h4 className="font-medium text-sm">Accepted Payment Methods</h4>
            <div className="flex items-center space-x-3 text-sm text-muted-foreground">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-5 bg-blue-600 rounded text-white text-xs flex items-center justify-center font-bold">
                  VISA
                </div>
                <div className="w-8 h-5 bg-red-600 rounded text-white text-xs flex items-center justify-center font-bold">
                  MC
                </div>
                <div className="w-8 h-5 bg-blue-500 rounded text-white text-xs flex items-center justify-center font-bold">
                  AMEX
                </div>
              </div>
              <span>•</span>
              <span>Google Pay</span>
              <span>•</span>
              <span>Apple Pay</span>
            </div>
          </div>

          <div className="flex items-center space-x-2 text-sm text-muted-foreground bg-secondary/50 p-3 rounded-lg">
            <Lock className="w-4 h-4" />
            <span>Payment will be processed securely through Stripe. We don't store your card information.</span>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Subtotal:</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Shipping:</span>
              <span>{shippingCost === 0 ? 'Free' : `$${shippingCost.toFixed(2)}`}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Tax:</span>
              <span>${tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-semibold border-t pt-2">
              <span>Total Payment:</span>
              <span>${finalTotal.toFixed(2)}</span>
            </div>
          </div>

          {/* SOLUTION 1 & 2: Multiple Payment Buttons */}
          <div className="space-y-3">
            {/* Main Payment Button */}
            <Button 
              onClick={() => handleStripeRedirect()}
              className="w-full" 
              size="lg"
              disabled={isRedirecting}
            >
              {isRedirecting ? (
                <div className="flex items-center space-x-2">
                  <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
                  <span>Redirecting to Stripe...</span>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <span>Continue with Stripe</span>
                  <ExternalLink className="w-4 h-4" />
                  <ArrowRight className="w-4 h-4" />
                </div>
              )}
            </Button>

            {/* Quick Redirect Button (SOLUTION 1) */}
            {isDemoMode && (
              <Button
                onClick={handleImmediateRedirect}
                variant="outline"
                className="w-full"
                disabled={isRedirecting}
              >
                <div className="flex items-center space-x-2">
                  <Zap className="w-4 h-4" />
                  <span>Quick Redirect (No Delay)</span>
                  <ExternalLink className="w-4 h-4" />
                </div>
              </Button>
            )}
          </div>

          {isDemoMode && (
            <div className="text-center space-y-2">
              <p className="text-xs text-muted-foreground">
                This is a demonstration - no actual charges will be made
              </p>
              <p className="text-xs text-muted-foreground">
                A demo Stripe window will open to show the complete experience
              </p>
              {quickMode && (
                <p className="text-xs text-green-600 font-medium">
                  ⚡ Quick Mode: Delays are minimized for faster testing
                </p>
              )}
            </div>
          )}

          {!isDemoMode && (
            <p className="text-xs text-center text-muted-foreground">
              You will be redirected to Stripe's secure payment page
            </p>
          )}
        </div>
      </CardContent>
    </Card>
    
    {/* Success Modal */}
    <OrderSuccessModal
      isOpen={showSuccessModal}
      orderId={orderDetails.orderId}
      amount={orderDetails.amount}
      onClose={handleModalClose}
    />
    </>
  );
};

export default StripePaymentForm; 