import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, User, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import { useOrders } from '@/hooks/useOrders';
import StripePaymentForm from '@/components/StripePaymentForm';
import { usePaymentIntent } from '@/hooks/usePaymentIntent';
import { Elements } from '@stripe/react-stripe-js';
import stripePromise from '@/lib/stripe';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { toast } from '@/hooks/use-toast';
import { romanianCities, romanianCounties, getCountyByCity } from '@/data/cities';

const Checkout = () => {
  const { items, total, clearCart } = useCart();
  const { user, isAuthenticated } = useAuth();
  const { createOrder } = useOrders();
  const navigate = useNavigate();
  const [step, setStep] = useState<'shipping' | 'payment'>('shipping');
  const [customerInfo, setCustomerInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'RO',
  });

  // Pre-fill form data for authenticated users
  useEffect(() => {
    if (isAuthenticated && user) {
      const [firstName, ...lastNameParts] = user.fullName.split(' ');
      setCustomerInfo(prev => ({
        ...prev,
        firstName: firstName || '',
        lastName: lastNameParts.join(' ') || '',
        email: user.email,
        phone: user.phone || '',
      }));
    }
  }, [isAuthenticated, user]);

  const shippingCost = total > 100 ? 0 : 10;
  const tax = total * 0.08;
  const finalTotal = total + shippingCost + tax;

  // Create PaymentIntent only when we have complete customer information
  // Enable quick mode for faster testing
  const paymentIntentData = usePaymentIntent(
    step === 'payment' ? {
      email: customerInfo.email,
      name: `${customerInfo.firstName} ${customerInfo.lastName}`,
      address: {
        line1: customerInfo.address,
        city: customerInfo.city,
        state: customerInfo.state,
        postal_code: customerInfo.zipCode,
        country: customerInfo.country,
      },
    } : undefined,
    { 
      quickMode: true,  // Enable quick mode for testing
      delayMs: 500      // Reduce delay to 500ms instead of 1500ms
    }
  );

  const handleShippingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate all required fields are filled
    const requiredFields = ['firstName', 'lastName', 'email', 'phone', 'address', 'city', 'state', 'zipCode'];
    const missingFields = requiredFields.filter(field => !customerInfo[field as keyof typeof customerInfo]);
    
    if (missingFields.length > 0) {
      toast({
        title: "Incomplete Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(customerInfo.email)) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
      return;
    }

    setStep('payment');
  };

  const handleInputChange = (field: string, value: string) => {
    setCustomerInfo(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  // Auto-update county when city is selected
  const handleCityChange = (cityValue: string) => {
    const county = getCountyByCity(cityValue);
    const cityData = romanianCities.find(c => c.value === cityValue);
    
    setCustomerInfo(prev => ({
      ...prev,
      city: cityData?.name || cityValue,
      state: county || prev.state,
    }));
  };

  // Handle successful payment and create order
  const handlePaymentSuccess = async (stripePaymentIntentId: string) => {
    console.log('🔄 Starting order creation process...');
    console.log('📝 Payment Intent ID:', stripePaymentIntentId);
    
    try {
      // Structură pentru comandă
      const orderData = {
        email: customerInfo.email,
        fullName: `${customerInfo.firstName} ${customerInfo.lastName}`,
        phone: customerInfo.phone,
        address: customerInfo.address,
        items: items.map(item => ({
          productName: item.name,
          quantity: item.quantity,
          price: item.price * item.quantity, // preț total pentru item
        })),
      };

      console.log('📦 Order data prepared:', orderData);

      // Pop-up pentru procesare
      toast({
        title: "🔄 Procesare comandă...",
        description: "Se creează comanda ta în sistem",
        duration: 3000,
      });

      const result = await createOrder(orderData);

      console.log('📝 Order creation result:', result);

      if (result.success) {
        // Pop-up de succes
        toast({
          title: "🎉 Comandă plasată cu succes!",
          description: `Comanda ta a fost înregistrată cu ID: ${result.orderId}`,
          duration: 5000,
        });

        console.log('✅ Order created successfully, orderId:', result.orderId);
        
        // Clear cart after successful order
        clearCart();
        
        // Redirect to success page
        setTimeout(() => {
          navigate(`/checkout/success?order_id=${result.orderId}`);
        }, 2000);
      } else {
        console.log('❌ Order creation failed:', result.error);
        
        // Still show success for payment, but mention order issue
        toast({
          title: "🎉 Plată reușită!",
          description: "Plata a fost procesată, dar comanda nu a putut fi salvată. Te contactăm în curând.",
          duration: 7000,
        });
        
        // Clear cart and redirect anyway since payment was successful
        clearCart();
        setTimeout(() => {
          navigate(`/checkout/success?payment_id=${stripePaymentIntentId}`);
        }, 2000);
      }
    } catch (error) {
      console.error('💥 Error creating order:', error);
      
      // Payment was successful, so show positive message
      toast({
        title: "🎉 Plată reușită!",
        description: "Plata a fost procesată cu succes. Te contactăm pentru confirmarea comenzii.",
        duration: 7000,
      });
      
      // Clear cart and redirect since payment succeeded
      clearCart();
      setTimeout(() => {
        navigate(`/checkout/success?payment_id=${stripePaymentIntentId}`);
      }, 2000);
    }
  };

  // Redirect if not authenticated
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-3xl font-bold mb-4">Sign In Required</h1>
          <p className="text-muted-foreground mb-8">
            You need to be signed in to proceed with checkout. Create an account or sign in to continue.
          </p>
          <div className="flex gap-4 justify-center">
            <Button onClick={() => navigate('/')} variant="outline" size="lg">
              Go Home
            </Button>
            <Button onClick={() => navigate('/shop')} size="lg">
              Continue Shopping
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-3xl font-bold mb-4">Your Cart is Empty</h1>
          <p className="text-muted-foreground mb-8">Add some products to your cart to continue with checkout.</p>
                          <Button onClick={() => navigate('/shop')} size="lg">
                  Continue Shopping
                </Button>
        </div>
        <Footer />
      </div>
    );
  }

  const stripeOptions = {
    mode: 'payment' as const,
    amount: Math.round(finalTotal * 100),
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
    <Elements stripe={stripePromise} options={stripeOptions}>
      <div className="min-h-screen bg-background">
        <Header />
        
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Checkout</h1>
            <p className="text-muted-foreground">Complete your order securely</p>
            
            {/* Progress indicator */}
            <div className="flex items-center mt-6 space-x-4">
              <div className={`flex items-center space-x-2 ${
                step === 'shipping' ? 'text-primary' : step === 'payment' ? 'text-green-600' : 'text-muted-foreground'
              }`}>
                <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center ${
                  step === 'shipping' 
                    ? 'border-primary bg-primary text-primary-foreground' 
                    : step === 'payment' 
                    ? 'border-green-600 bg-green-600 text-white' 
                    : 'border-muted-foreground'
                }`}>
                  1
                </div>
                <span>Shipping</span>
              </div>
              <div className="flex-1 h-px bg-border"></div>
              <div className={`flex items-center space-x-2 ${step === 'payment' ? 'text-primary' : 'text-muted-foreground'}`}>
                <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center ${
                  step === 'payment' ? 'border-primary bg-primary text-primary-foreground' : 'border-muted-foreground'
                }`}>
                  2
                </div>
                <span>Payment</span>
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Main Content */}
            <div className="space-y-6">
              {step === 'shipping' && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <MapPin className="w-5 h-5" />
                        <span>Shipping Information</span>
                      </div>
                      {isAuthenticated && (
                        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                          <User className="w-4 h-4" />
                          <span>Auto-filled from profile</span>
                        </div>
                      )}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleShippingSubmit} className="space-y-4">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm font-medium mb-2 block">First Name *</label>
                          <Input 
                            required 
                            placeholder="John" 
                            value={customerInfo.firstName}
                            onChange={(e) => handleInputChange('firstName', e.target.value)}
                          />
                        </div>
                        <div>
                          <label className="text-sm font-medium mb-2 block">Last Name *</label>
                          <Input 
                            required 
                            placeholder="Doe" 
                            value={customerInfo.lastName}
                            onChange={(e) => handleInputChange('lastName', e.target.value)}
                          />
                        </div>
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-2 block">Email *</label>
                        <Input 
                          required 
                          type="email" 
                          placeholder="john@example.com" 
                          value={customerInfo.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-2 block">Phone *</label>
                        <Input 
                          required 
                          type="tel" 
                          placeholder="+40 123 456 789" 
                          value={customerInfo.phone}
                          onChange={(e) => handleInputChange('phone', e.target.value)}
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-2 block">Address *</label>
                        <Input 
                          required 
                          placeholder="Street Address, Building, Apartment" 
                          value={customerInfo.address}
                          onChange={(e) => handleInputChange('address', e.target.value)}
                        />
                      </div>
                      <div className="grid md:grid-cols-3 gap-4">
                        <div>
                          <label className="text-sm font-medium mb-2 block">City *</label>
                          <Select 
                            required 
                            value={romanianCities.find(c => c.name === customerInfo.city)?.value || ''}
                            onValueChange={handleCityChange}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select city" />
                            </SelectTrigger>
                            <SelectContent className="max-h-60">
                              {romanianCities.map((city) => (
                                <SelectItem key={city.value} value={city.value}>
                                  {city.name} ({city.county})
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <label className="text-sm font-medium mb-2 block">County *</label>
                          <Select 
                            required 
                            value={customerInfo.state}
                            onValueChange={(value) => handleInputChange('state', value)}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select county" />
                            </SelectTrigger>
                            <SelectContent className="max-h-60">
                              {romanianCounties.map((county) => (
                                <SelectItem key={county.value} value={county.name}>
                                  {county.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <label className="text-sm font-medium mb-2 block">Postal Code *</label>
                          <Input 
                            required 
                            placeholder="123456" 
                            value={customerInfo.zipCode}
                            onChange={(e) => handleInputChange('zipCode', e.target.value)}
                          />
                        </div>
                      </div>
                      
                      <Button type="submit" className="w-full" size="lg">
                        Continue to Payment
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              )}

              {step === 'payment' && (
                <div className="space-y-6">
                  {/* Customer Info Summary */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <User className="w-5 h-5" />
                        <span>Customer Information</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-sm space-y-1">
                        <p><strong>{customerInfo.firstName} {customerInfo.lastName}</strong></p>
                        <p>{customerInfo.email}</p>
                        <p>{customerInfo.phone}</p>
                        <p>{customerInfo.address}</p>
                        <p>{customerInfo.city}, {customerInfo.state} {customerInfo.zipCode}</p>
                      </div>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="mt-3"
                        onClick={() => setStep('shipping')}
                      >
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Edit
                      </Button>
                    </CardContent>
                  </Card>

                  {/* Stripe Payment Form */}
                  {paymentIntentData.loading ? (
                    <Card>
                      <CardContent className="py-12">
                        <div className="text-center">
                          <div className="animate-spin h-8 w-8 border-2 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
                          <p className="text-muted-foreground">Initializing payment processing...</p>
                        </div>
                      </CardContent>
                    </Card>
                  ) : paymentIntentData.clientSecret ? (
                    <StripePaymentForm 
                      clientSecret={paymentIntentData.clientSecret}
                      customerInfo={{
                        email: customerInfo.email,
                        name: `${customerInfo.firstName} ${customerInfo.lastName}`,
                        address: {
                          line1: customerInfo.address,
                          city: customerInfo.city,
                          state: customerInfo.state,
                          postal_code: customerInfo.zipCode,
                          country: customerInfo.country,
                        },
                      }}
                      onPaymentSuccess={handlePaymentSuccess}
                      quickMode={true} // Enable quick mode for faster testing
                    />
                  ) : (
                    <Card>
                      <CardContent className="py-8">
                        <div className="text-center text-muted-foreground">
                          <p>Error initializing payment. Please try again.</p>
                          <Button 
                            variant="outline" 
                            className="mt-4"
                            onClick={() => window.location.reload()}
                          >
                            Reload
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </div>
              )}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <Card className="sticky top-24">
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Order Items */}
                  <div className="space-y-3">
                    {items.map((item) => (
                      <div key={item.id} className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <img 
                            src={item.image} 
                            alt={item.name}
                            className="w-12 h-12 object-cover rounded bg-secondary"
                          />
                          <div>
                            <p className="font-medium text-sm">{item.name}</p>
                            <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                          </div>
                        </div>
                        <span className="font-medium">${(item.price * item.quantity).toFixed(2)}</span>
                      </div>
                    ))}
                  </div>

                  <Separator />

                  {/* Price Breakdown */}
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span>${total.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Shipping</span>
                      <span>{shippingCost === 0 ? 'Free' : `$${shippingCost.toFixed(2)}`}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Tax</span>
                      <span>${tax.toFixed(2)}</span>
                    </div>
                  </div>

                  <Separator />

                  <div className="flex justify-between text-lg font-semibold">
                    <span>Total</span>
                    <span>${finalTotal.toFixed(2)}</span>
                  </div>

                  <p className="text-xs text-muted-foreground text-center">
                    By placing your order, you agree to our{' '}
                    <a href="/terms" className="text-primary hover:underline">
                      Terms & Conditions
                    </a>{' '}
                    and{' '}
                    <a href="/privacy" className="text-primary hover:underline">
                      Privacy Policy
                    </a>
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </Elements>
  );
};

export default Checkout;
