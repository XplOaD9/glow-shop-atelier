import { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { CheckCircle, Package, ArrowRight, Download, Mail, MapPin, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useOrders } from '@/hooks/useOrders';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get('order_id');
  const { getOrderById } = useOrders();
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadOrder = async () => {
      if (orderId) {
        const orderData = await getOrderById(orderId);
        setOrder(orderData);
      }
      setLoading(false);
    };

    loadOrder();
  }, [orderId, getOrderById]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-16 text-center">
          <div className="animate-spin h-8 w-8 border-2 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
          <p>Se încarcă detaliile comenzii...</p>
        </div>
        <Footer />
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-3xl font-bold mb-4 text-red-600">Comandă nu a fost găsită</h1>
          <p className="text-muted-foreground mb-8">
            Nu am putut găsi această comandă. Verifică linkul sau contactează-ne pentru asistență.
          </p>
          <div className="flex gap-4 justify-center">
            <Button asChild>
              <Link to="/">Acasă</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link to="/contact">Contact</Link>
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      'pending': { color: 'bg-yellow-100 text-yellow-800', text: 'În așteptare' },
      'completed': { color: 'bg-green-100 text-green-800', text: 'Finalizat' },
      'cancelled': { color: 'bg-red-100 text-red-800', text: 'Anulat' }
    };
    
    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.pending;
    return (
      <Badge className={`${config.color} border-0`}>
        {config.text}
      </Badge>
    );
  };

  const getPaymentStatusBadge = (status: string) => {
    const statusConfig = {
      'pending': { color: 'bg-yellow-100 text-yellow-800', text: 'În așteptare' },
      'paid': { color: 'bg-green-100 text-green-800', text: 'Plătit' },
      'failed': { color: 'bg-red-100 text-red-800', text: 'Eșuat' }
    };
    
    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.pending;
    return (
      <Badge className={`${config.color} border-0`}>
        {config.text}
      </Badge>
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Success Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Comandă Confirmată!
          </h1>
          <p className="text-lg text-muted-foreground">
            Mulțumim pentru comandă! Am primit plata ta și vom procesa comanda în curând.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Order Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Order Info */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Package className="w-5 h-5" />
                  <span>Detalii Comandă</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Numărul comenzii</p>
                    <p className="font-medium">{order.order_number}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Data comenzii</p>
                    <p className="font-medium flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      {new Date(order.created_at).toLocaleDateString('ro-RO', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Status comandă</p>
                    <p className="font-medium">{getStatusBadge(order.status)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Status plată</p>
                    <p className="font-medium">{getPaymentStatusBadge(order.payment_status)}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Shipping Address */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <MapPin className="w-5 h-5" />
                  <span>Adresa de Livrare</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-1">
                  <p className="font-medium">{order.full_name}</p>
                  <p>{order.address}</p>
                  {order.phone && (
                    <p className="text-sm text-muted-foreground">
                      Telefon: {order.phone}
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Order Items */}
            <Card>
              <CardHeader>
                <CardTitle>Produse Comandate</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {order.order_items?.map((item: any) => (
                    <div key={item.id} className="flex items-center justify-between">
                      <div className="flex-1">
                        <h4 className="font-medium">{item.product_name}</h4>
                        <p className="text-sm text-muted-foreground">
                          Cantitate: {item.quantity}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">{item.price} RON</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Next Steps */}
            <Card>
              <CardHeader>
                <CardTitle>Ce urmează?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-blue-600 text-xs font-bold">1</span>
                  </div>
                  <div>
                    <p className="font-medium">Confirmare email</p>
                    <p className="text-sm text-muted-foreground">
                      Vei primi un email de confirmare la {order.email}
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-blue-600 text-xs font-bold">2</span>
                  </div>
                  <div>
                    <p className="font-medium">Procesare comandă</p>
                    <p className="text-sm text-muted-foreground">
                      Comanda ta va fi procesată în 1-2 zile lucrătoare
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-blue-600 text-xs font-bold">3</span>
                  </div>
                  <div>
                    <p className="font-medium">Expediere</p>
                    <p className="text-sm text-muted-foreground">
                      Vei primi un cod de urmărire când comanda va fi expediată
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div className="space-y-6">
            <Card className="sticky top-6">
              <CardHeader>
                <CardTitle>Rezumat Comandă</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>{(order.total_amount - 10).toFixed(2)} RON</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Livrare</span>
                    <span>10.00 RON</span>
                  </div>
                </div>

                <Separator />

                <div className="flex justify-between text-lg font-semibold">
                  <span>Total</span>
                  <span>{order.total_amount} RON</span>
                </div>

                <Separator />

                <div className="space-y-3">
                  <Button className="w-full" asChild>
                    <Link to="/profile">
                      Vizualizează Toate Comenzile
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                  </Button>
                  
                  <Button variant="outline" className="w-full">
                    <Download className="w-4 h-4 mr-2" />
                    Descarcă Factura
                  </Button>
                  
                  <Button variant="outline" className="w-full" asChild>
                    <Link to="/contact">
                      <Mail className="w-4 h-4 mr-2" />
                      Contactează-ne
                    </Link>
                  </Button>
                </div>


              </CardContent>
            </Card>
          </div>
        </div>

        {/* Continue Shopping */}
        <div className="text-center mt-12">
          <h3 className="text-lg font-semibold mb-4">
            Mulțumim pentru încrederea acordată!
          </h3>
          <Button size="lg" asChild>
            <Link to="/shop">
              Continuă Cumpărăturile
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default PaymentSuccess; 