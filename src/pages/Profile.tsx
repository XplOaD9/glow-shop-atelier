import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
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
  X
} from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Navigate } from 'react-router-dom';
import { toast } from '@/hooks/use-toast';

const Profile = () => {
  const { user, isAuthenticated } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    fullName: user?.fullName || '',
    phone: user?.phone || ''
  });

  // Redirect if not authenticated
  if (!isAuthenticated || !user) {
    return <Navigate to="/" replace />;
  }

  const handleSave = () => {
    // In a real app, this would update the user data through an API
    toast({
      title: "Profil Actualizat",
      description: "Modificările au fost salvate cu succes",
    });
    setIsEditing(false);
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
                Comenzi
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
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Statistici Cont</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      <div className="text-center p-4 bg-primary/5 rounded-lg">
                        <div className="text-2xl font-bold text-primary">0</div>
                        <div className="text-sm text-muted-foreground">Comenzi Totale</div>
                      </div>
                      <div className="text-center p-4 bg-primary/5 rounded-lg">
                        <div className="text-2xl font-bold text-primary">0 RON</div>
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
                  <CardTitle>Comenzile Mele</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8">
                    <ShoppingBag className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
                    <h3 className="text-lg font-semibold mb-2">Nu ai comenzi încă</h3>
                    <p className="text-muted-foreground mb-4">
                      Explorează produsele noastre și plasează prima ta comandă!
                    </p>
                    <Button asChild>
                      <a href="/shop">Începe Cumpărăturile</a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Wishlist Tab */}
            <TabsContent value="wishlist">
              <Card>
                <CardHeader>
                  <CardTitle>Lista de Dorințe</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8">
                    <Heart className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
                    <h3 className="text-lg font-semibold mb-2">Lista ta de dorințe este goală</h3>
                    <p className="text-muted-foreground mb-4">
                      Salvează produsele care îți plac pentru a le accesa mai târziu!
                    </p>
                    <Button asChild>
                      <a href="/shop">Explorează Produsele</a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Settings Tab */}
            <TabsContent value="settings">
              <Card>
                <CardHeader>
                  <CardTitle>Setări Cont</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Notificări</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium">Oferte Speciale</div>
                          <div className="text-sm text-muted-foreground">
                            Primește notificări despre reduceri și oferte
                          </div>
                        </div>
                        <input type="checkbox" defaultChecked className="toggle" />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium">Actualizări Comandă</div>
                          <div className="text-sm text-muted-foreground">
                            Notificări despre statusul comenzilor tale
                          </div>
                        </div>
                        <input type="checkbox" defaultChecked className="toggle" />
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <h3 className="text-lg font-semibold mb-4">Securitate</h3>
                    <div className="space-y-3">
                      <Button variant="outline">
                        Schimbă Parola
                      </Button>
                      <Button variant="outline">
                        Activează Autentificarea în Doi Pași
                      </Button>
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <h3 className="text-lg font-semibold mb-4 text-red-600">Zona Periculoasă</h3>
                    <div className="space-y-3">
                      <Button variant="destructive" className="w-full">
                        Șterge Contul
                      </Button>
                      <p className="text-xs text-muted-foreground">
                        Această acțiune nu poate fi anulată. Toate datele tale vor fi șterse permanent.
                      </p>
                    </div>
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