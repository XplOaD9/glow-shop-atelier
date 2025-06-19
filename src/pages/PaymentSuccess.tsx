import { useEffect, useState } from 'react';
import { useStripe } from '@stripe/react-stripe-js';
import { CheckCircle, XCircle, Loader2, Package, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const PaymentSuccess = () => {
  const stripe = useStripe();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [paymentIntent, setPaymentIntent] = useState<any>(null);
  const [orderDetails, setOrderDetails] = useState<any>(null);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const isDemo = urlParams.get('demo') === 'true';

    if (isDemo) {
      // Demo mode - show success immediately
      setStatus('success');
      setPaymentIntent({
        id: 'demo_payment_intent_' + Date.now(),
        amount: 0,
        status: 'succeeded'
      });
      setOrderDetails({
        orderNumber: `ORD-${Date.now()}`,
        estimatedDelivery: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toLocaleDateString('ro-RO')
      });
      return;
    }

    if (!stripe) return;

    const clientSecret = urlParams.get('payment_intent_client_secret');

    if (!clientSecret) {
      setStatus('error');
      return;
    }

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      setPaymentIntent(paymentIntent);
      
      switch (paymentIntent.status) {
        case 'succeeded':
          setStatus('success');
          setOrderDetails({
            orderNumber: `ORD-${paymentIntent.id.slice(-8).toUpperCase()}`,
            estimatedDelivery: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toLocaleDateString('ro-RO')
          });
          break;
        case 'processing':
          setStatus('loading');
          // Check again in a few seconds
          setTimeout(() => {
            window.location.reload();
          }, 3000);
          break;
        case 'requires_payment_method':
          setStatus('error');
          break;
        default:
          setStatus('error');
          break;
      }
    }).catch(() => {
      setStatus('error');
    });
  }, [stripe]);

  const renderContent = () => {
    switch (status) {
      case 'loading':
        return (
          <Card className="max-w-md mx-auto">
            <CardContent className="py-12 text-center">
              <Loader2 className="w-16 h-16 animate-spin mx-auto mb-6 text-primary" />
              <h2 className="text-xl font-semibold mb-3">Se verifică plata...</h2>
              <p className="text-muted-foreground">
                Vă rugăm să așteptați câteva momente în timp ce confirmăm plata dvs.
              </p>
            </CardContent>
          </Card>
        );

      case 'success':
        return (
          <div className="max-w-2xl mx-auto space-y-6">
            {/* Success Header */}
            <Card>
              <CardContent className="py-8 text-center">
                <CheckCircle className="w-20 h-20 mx-auto mb-6 text-green-600" />
                <h1 className="text-2xl font-bold mb-3 text-green-700">
                  Plată Procesată cu Succes!
                </h1>
                <p className="text-lg text-muted-foreground mb-4">
                  Comanda dvs. a fost procesată cu succes și va fi livrată în curând.
                </p>
                <Badge variant="secondary" className="text-sm">
                  {paymentIntent?.id.includes('demo') ? 'Comandă Demo' : 'Comandă Confirmată'}
                </Badge>
              </CardContent>
            </Card>

            {/* Order Details */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Package className="w-5 h-5" />
                  <span>Detalii Comandă</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Numărul Comenzii</p>
                    <p className="text-lg font-semibold">{orderDetails?.orderNumber}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Status</p>
                    <Badge className="mt-1">Confirmat</Badge>
                  </div>
                </div>
                
                {paymentIntent && paymentIntent.amount > 0 && (
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Total Plătit</p>
                    <p className="text-lg font-semibold">${(paymentIntent.amount / 100).toFixed(2)}</p>
                  </div>
                )}

                <div>
                  <p className="text-sm font-medium text-muted-foreground">Livrare Estimată</p>
                  <p className="text-lg font-semibold">{orderDetails?.estimatedDelivery}</p>
                </div>

                {paymentIntent && (
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">ID Tranzacție</p>
                    <p className="text-sm font-mono text-muted-foreground">{paymentIntent.id}</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Next Steps */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Mail className="w-5 h-5" />
                  <span>Următorii Pași</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">
                    1
                  </div>
                  <div>
                    <p className="font-medium">Email de Confirmare</p>
                    <p className="text-sm text-muted-foreground">
                      Veți primi un email cu detaliile comenzii și informații despre urmărire.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">
                    2
                  </div>
                  <div>
                    <p className="font-medium">Procesarea Comenzii</p>
                    <p className="text-sm text-muted-foreground">
                      Comanda dvs. va fi procesată și împachetată în 1-2 zile lucrătoare.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">
                    3
                  </div>
                  <div>
                    <p className="font-medium">Livrare</p>
                    <p className="text-sm text-muted-foreground">
                      Produsele vor fi livrate la adresa specificată în 3-5 zile lucrătoare.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Button 
                onClick={() => window.location.href = '/shop'} 
                className="flex-1"
                size="lg"
              >
                Continuă Cumpărăturile
              </Button>
              <Button 
                variant="outline" 
                onClick={() => window.location.href = '/'} 
                className="flex-1"
                size="lg"
              >
                Înapoi la Pagina Principală
              </Button>
            </div>
          </div>
        );

      case 'error':
        return (
          <Card className="max-w-md mx-auto">
            <CardContent className="py-8 text-center">
              <XCircle className="w-16 h-16 mx-auto mb-4 text-red-600" />
              <h2 className="text-xl font-semibold mb-2">Plată Eșuată</h2>
              <p className="text-muted-foreground mb-6">
                A apărut o problemă la procesarea plății. Vă rugăm să încercați din nou.
              </p>
              <div className="space-y-3">
                <Button 
                  onClick={() => window.location.href = '/checkout'} 
                  className="w-full"
                  size="lg"
                >
                  Încearcă Din Nou
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => window.location.href = '/cart'} 
                  className="w-full"
                  size="lg"
                >
                  Înapoi la Coș
                </Button>
              </div>
            </CardContent>
          </Card>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 py-16">
        {renderContent()}
      </div>
      <Footer />
    </div>
  );
};

export default PaymentSuccess; 