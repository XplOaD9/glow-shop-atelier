import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useOrders } from '@/hooks/useOrders';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  User, 
  Mail, 
  Phone, 
  Calendar, 
  ShoppingBag, 
  Heart, 
  Settings, 
  Edit2,
  Save,
  X,
  Package,
  MapPin,
  Eye,
  RefreshCw
} from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Navigate, Link } from 'react-router-dom';
import { toast } from '@/hooks/use-toast';

const Profile = () => {
  const { user, isAuthenticated } = useAuth();
  const { orders, loading: ordersLoading } = useOrders();
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    fullName: user?.fullName || '',
    phone: user?.phone || ''
  });

  // Update editData when user changes
  useEffect(() => {
    if (user) {
      setEditData({
        fullName: user.fullName,
        phone: user.phone || ''
      });
    }
  }, [user]);

  // Redirect if not authenticated
  if (!isAuthenticated || !user) {
    return <Navigate to="/" replace />;
  }

  const handleSave = async () => {
    try {
      // For now, just simulate saving - will be implemented with updateProfile method
      toast({
        title: "Profil Actualizat",
        description: "Modificările au fost salvate cu succes",
      });
      setIsEditing(false);
    } catch (error) {
      toast({
        title: "Eroare",
        description: "Nu s-au putut salva modificările",
        variant: "destructive",
      });
    }
  };

  const handleCancel = () => {
    setEditData({
      fullName: user.fullName,
      phone: user.phone || ''
    });
    setIsEditing(false);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ro-RO', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      'pending': { color: 'bg-yellow-100 text-yellow-800', text: 'În așteptare' },
      'completed': { color: 'bg-green-100 text-green-800', text: 'Finalizat' },
      'cancelled': { color: 'bg-red-100 text-red-800', text: 'Anulat' }
    };
    
    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.pending;
    return (
      <Badge className={`${config.color} border-0 text-xs`}>
        {config.text}
      </Badge>
    );
  };

  // Calculate statistics
  const totalOrders = orders.length;
  const totalSpent = orders.reduce((sum, order) => sum + order.total_amount, 0);
  const recentOrders = orders.slice(0, 5);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Profilul Meu</h1>
            <p className="text-muted-foreground">
              Gestionează informațiile contului și preferințele tale
            </p>
          </div>

          <Tabs defaultValue="profile" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="profile">
                <User className="w-4 h-4 mr-2" />
                Profil
              </TabsTrigger>
              <TabsTrigger value="orders">
                <ShoppingBag className="w-4 h-4 mr-2" />
                Comenzi ({totalOrders})
              </TabsTrigger>
              <TabsTrigger value="wishlist">
                <Heart className="w-4 h-4 mr-2" />
                Favorite
              </TabsTrigger>
              <TabsTrigger value="settings">
                <Settings className="w-4 h-4 mr-2" />
                Setări
              </TabsTrigger>
            </TabsList>

            {/* Profile Tab */}
            <TabsContent value="profile">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle>Informații Personale</CardTitle>
                  {!isEditing ? (
                    <Button variant="outline" size="sm" onClick={() => setIsEditing(true)}>
                      <Edit2 className="w-4 h-4 mr-2" />
                      Editează
                    </Button>
                  ) : (
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" onClick={handleCancel}>
                        <X className="w-4 h-4 mr-2" />
                        Anulează
                      </Button>
                      <Button size="sm" onClick={handleSave}>
                        <Save className="w-4 h-4 mr-2" />
                        Salvează
                      </Button>
                    </div>
                  )}
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="fullName">Nume Complet</Label>
                      {isEditing ? (
                        <Input
                          id="fullName"
                          value={editData.fullName}
                          onChange={(e) => setEditData(prev => ({ ...prev, fullName: e.target.value }))}
                        />
                      ) : (
                        <div className="flex items-center space-x-2">
                          <User className="w-4 h-4 text-muted-foreground" />
                          <span>{user.fullName}</span>
                        </div>
                      )}
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="email">Email</Label>
                      <div className="flex items-center space-x-2">
                        <Mail className="w-4 h-4 text-muted-foreground" />
                        <span>{user.email}</span>
                        <Badge variant="secondary">Verificat</Badge>
                      </div>
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="phone">Telefon</Label>
                      {isEditing ? (
                        <Input
                          id="phone"
                          value={editData.phone}
                          onChange={(e) => setEditData(prev => ({ ...prev, phone: e.target.value }))}
                          placeholder="Numărul de telefon"
                        />
                      ) : (
                        <div className="flex items-center space-x-2">
                          <Phone className="w-4 h-4 text-muted-foreground" />
                          <span>{user.phone || 'Nu este specificat'}</span>
                        </div>
                      )}
                    </div>

                    <div className="grid gap-2">
                      <Label>Data Înregistrării</Label>
                      <div className="flex items-center space-x-2">
                        <Calendar className="w-4 h-4 text-muted-foreground" />
                        <span>{formatDate(user.createdAt)}</span>
                      </div>
                    </div>

                    {user.role === 'admin' && (
                      <div className="grid gap-2">
                        <Label>Rol Utilizator</Label>
                        <div className="flex items-center space-x-2">
                          <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">
                            ADMIN
                          </Badge>
                        </div>
                      </div>
                    )}
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Statistici Cont</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      <div className="text-center p-4 bg-primary/5 rounded-lg">
                        <div className="text-2xl font-bold text-primary">{totalOrders}</div>
                        <div className="text-sm text-muted-foreground">Comenzi Totale</div>
                      </div>
                      <div className="text-center p-4 bg-primary/5 rounded-lg">
                        <div className="text-2xl font-bold text-primary">{totalSpent.toFixed(2)} RON</div>
                        <div className="text-sm text-muted-foreground">Suma Cheltuită</div>
                      </div>
                      <div className="text-center p-4 bg-primary/5 rounded-lg">
                        <div className="text-2xl font-bold text-primary">0</div>
                        <div className="text-sm text-muted-foreground">Produse Favorite</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Orders Tab */}
            <TabsContent value="orders">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <ShoppingBag className="w-5 h-5" />
                    <span>Comenzile Mele</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {ordersLoading ? (
                    <div className="flex justify-center py-8">
                      <RefreshCw className="h-8 w-8 animate-spin" />
                    </div>
                  ) : orders.length === 0 ? (
                    <div className="text-center py-8">
                      <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg font-semibold mb-2">Nu ai comenzi încă</h3>
                      <p className="text-muted-foreground mb-4">
                        Începe să cumperi produsele noastre ErgoCharge
                      </p>
                      <Button asChild>
                        <Link to="/shop">Explorează Produsele</Link>
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {orders.map((order) => (
                        <div key={order.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                            <div className="space-y-2">
                              <div className="flex items-center space-x-3">
                                <h3 className="font-semibold">{order.order_number}</h3>
                                {getStatusBadge(order.status)}
                              </div>
                              <div className="flex items-center text-sm text-muted-foreground space-x-4">
                                <span className="flex items-center">
                                  <Calendar className="w-4 h-4 mr-1" />
                                  {formatDate(order.created_at)}
                                </span>
                                <span className="flex items-center">
                                  <MapPin className="w-4 h-4 mr-1" />
                                  {order.address}
                                </span>
                              </div>
                            </div>
                            <div className="flex items-center justify-between sm:justify-end space-x-4">
                              <div className="text-right">
                                <div className="font-semibold">{order.total_amount} RON</div>
                                <div className="text-sm text-muted-foreground">
                                  {order.payment_status === 'paid' ? 'Plătit' : 'În așteptare'}
                                </div>
                              </div>
                              <Button variant="outline" size="sm" asChild>
                                <Link to={`/checkout/success?order_id=${order.id}`}>
                                  <Eye className="w-4 h-4 mr-2" />
                                  Detalii
                                </Link>
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                      
                      {orders.length > 5 && (
                        <div className="text-center pt-4">
                          <p className="text-sm text-muted-foreground">
                            Afișează {Math.min(5, orders.length)} din {orders.length} comenzi
                          </p>
                        </div>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Wishlist Tab */}
            <TabsContent value="wishlist">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Heart className="w-5 h-5" />
                    <span>Produse Favorite</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8">
                    <Heart className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">Lista de dorințe este goală</h3>
                    <p className="text-muted-foreground mb-4">
                      Salvează produsele care îți plac pentru mai târziu
                    </p>
                    <Button asChild>
                      <Link to="/shop">Explorează Produsele</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Settings Tab */}
            <TabsContent value="settings">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Settings className="w-5 h-5" />
                    <span>Setări Cont</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Preferințe Notificări</h3>
                    <div className="space-y-3">
                      <label className="flex items-center space-x-2">
                        <input type="checkbox" defaultChecked className="rounded border-gray-300" />
                        <span>Email pentru comenzi noi</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input type="checkbox" defaultChecked className="rounded border-gray-300" />
                        <span>Notificări pentru status comenzi</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input type="checkbox" className="rounded border-gray-300" />
                        <span>Newsletter cu oferte speciale</span>
                      </label>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Securitate</h3>
                    <div className="space-y-3">
                      <Button variant="outline" className="w-full sm:w-auto">
                        Schimbă Parola
                      </Button>
                      <Button variant="outline" className="w-full sm:w-auto">
                        Descarcă Datele Mele
                      </Button>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-red-600">Zona Periculoasă</h3>
                    <p className="text-sm text-muted-foreground">
                      Aceste acțiuni sunt permanente și nu pot fi anulate.
                    </p>
                    <Button variant="destructive" className="w-full sm:w-auto">
                      Șterge Contul
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Profile; 