import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useOrders } from '@/hooks/useOrders';
import { useNewsletter } from '@/hooks/useNewsletter';
import { Navigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  LayoutDashboard, 
  Users, 
  ShoppingBag, 
  Package, 
  BarChart3,
  TrendingUp,
  Eye,
  Edit,
  Trash2,
  Plus,
  Search,
  Filter,
  Download,
  RefreshCw,
  Mail,
  Calendar,
  MapPin,
  DollarSign
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const AdminDashboard = () => {
  const { user, isAdmin, loading } = useAuth();
  const { orders, loading: ordersLoading, updateOrderStatus } = useOrders();
  const { subscribers, loading: newsletterLoading, getStats } = useNewsletter();
  const [activeTab, setActiveTab] = useState('overview');
  const [searchTerm, setSearchTerm] = useState('');
  const [newsletterStats, setNewsletterStats] = useState({
    total: 0,
    active: 0,
    unsubscribed: 0
  });

  // Load newsletter stats
  useEffect(() => {
    const loadStats = async () => {
      if (isAdmin) {
        const stats = await getStats();
        if (stats) {
          setNewsletterStats(stats);
        }
      }
    };
    loadStats();
  }, [isAdmin, getStats]);

  // Redirect if not admin
  if (!loading && !isAdmin) {
    return <Navigate to="/" replace />;
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <RefreshCw className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  // Calculate real stats from orders data
  const totalRevenue = orders.reduce((sum, order) => sum + order.total_amount, 0);
  const todaysOrders = orders.filter(order => {
    const orderDate = new Date(order.created_at);
    const today = new Date();
    return orderDate.toDateString() === today.toDateString();
  }).length;

  const dashboardStats = [
    { 
      title: 'Vânzări Totale', 
      value: `${totalRevenue.toFixed(2)} RON`, 
      change: '+12.5%', 
      icon: DollarSign, 
      color: 'text-green-600' 
    },
    { 
      title: 'Comenzi Astăzi', 
      value: todaysOrders.toString(), 
      change: '+8%', 
      icon: ShoppingBag, 
      color: 'text-blue-600' 
    },
    { 
      title: 'Total Comenzi', 
      value: orders.length.toString(), 
      change: `+${orders.length}`, 
      icon: Package, 
      color: 'text-purple-600' 
    },
    { 
      title: 'Abonați Newsletter', 
      value: newsletterStats.active.toString(), 
      change: `${newsletterStats.total} total`, 
      icon: Mail, 
      color: 'text-orange-600' 
    }
  ];

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      'pending': { color: 'bg-yellow-100 text-yellow-800', text: 'În așteptare' },
      'completed': { color: 'bg-green-100 text-green-800', text: 'Finalizat' },
      'cancelled': { color: 'bg-red-100 text-red-800', text: 'Anulat' }
    };
    
    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.pending;
    return (
      <Badge className={`${config.color} border-0 text-xs px-2 py-1`}>
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
      <Badge className={`${config.color} border-0 text-xs px-2 py-1`}>
        {config.text}
      </Badge>
    );
  };

  const handleStatusUpdate = async (orderId: string, newStatus: string) => {
    await updateOrderStatus(orderId, newStatus as any);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-6 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="mb-6 sm:mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                Admin Dashboard
              </h1>
              <p className="text-sm sm:text-base text-gray-600 mt-1">
                Bun venit înapoi, {user?.fullName}! Gestionează platforma ErgoCharge.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
              <Button size="sm" className="w-full sm:w-auto">
                <Download className="h-4 w-4 mr-2" />
                Export Data
              </Button>
              <Button variant="outline" size="sm" className="w-full sm:w-auto">
                <RefreshCw className="h-4 w-4 mr-2" />
                Refresh
              </Button>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
          {dashboardStats.map((stat, index) => (
            <Card key={index} className="p-4 sm:p-6">
              <CardContent className="p-0">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs sm:text-sm font-medium text-gray-600">
                      {stat.title}
                    </p>
                    <p className="text-xl sm:text-2xl font-bold text-gray-900 mt-1">
                      {stat.value}
                    </p>
                    <p className={`text-xs sm:text-sm ${stat.color} mt-1`}>
                      {stat.change}
                    </p>
                  </div>
                  <div className={`p-2 sm:p-3 rounded-full bg-gray-100`}>
                    <stat.icon className={`h-5 w-5 sm:h-6 sm:w-6 ${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4 sm:space-y-6">
          <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4 h-auto p-1">
            <TabsTrigger value="overview" className="text-xs sm:text-sm px-2 py-2">
              <LayoutDashboard className="h-4 w-4 mr-1 sm:mr-2" />
              <span className="hidden sm:inline">Overview</span>
              <span className="sm:hidden">Home</span>
            </TabsTrigger>
            <TabsTrigger value="orders" className="text-xs sm:text-sm px-2 py-2">
              <ShoppingBag className="h-4 w-4 mr-1 sm:mr-2" />
              <span className="hidden sm:inline">Orders</span>
              <span className="sm:hidden">Orders</span>
            </TabsTrigger>
            <TabsTrigger value="newsletter" className="text-xs sm:text-sm px-2 py-2">
              <Mail className="h-4 w-4 mr-1 sm:mr-2" />
              <span className="hidden sm:inline">Newsletter</span>
              <span className="sm:hidden">Newsletter</span>
            </TabsTrigger>
            <TabsTrigger value="users" className="text-xs sm:text-sm px-2 py-2">
              <Users className="h-4 w-4 mr-1 sm:mr-2" />
              <span className="hidden sm:inline">Users</span>
              <span className="sm:hidden">Users</span>
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-4 sm:space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
              {/* Recent Orders */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg sm:text-xl">Comenzi Recente</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {ordersLoading ? (
                    <div className="flex justify-center py-4">
                      <RefreshCw className="h-6 w-6 animate-spin" />
                    </div>
                  ) : orders.length === 0 ? (
                    <p className="text-gray-500 text-center py-4">Nu există comenzi încă</p>
                  ) : (
                    orders.slice(0, 5).map((order) => (
                      <div key={order.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate">
                            {order.full_name}
                          </p>
                          <p className="text-xs text-gray-500 truncate">
                            {order.order_number} • {new Date(order.created_at).toLocaleDateString('ro-RO')}
                          </p>
                        </div>
                        <div className="text-right ml-3">
                          <p className="text-sm font-medium text-gray-900">
                            {order.total_amount} RON
                          </p>
                          {getStatusBadge(order.status)}
                        </div>
                      </div>
                    ))
                  )}
                </CardContent>
              </Card>

              {/* Newsletter Stats */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg sm:text-xl">Statistici Newsletter</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {newsletterLoading ? (
                    <div className="flex justify-center py-4">
                      <RefreshCw className="h-6 w-6 animate-spin" />
                    </div>
                  ) : (
                    <>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="text-center p-3 bg-green-50 rounded-lg">
                          <p className="text-2xl font-bold text-green-600">{newsletterStats.active}</p>
                          <p className="text-sm text-gray-600">Abonați Activi</p>
                        </div>
                        <div className="text-center p-3 bg-blue-50 rounded-lg">
                          <p className="text-2xl font-bold text-blue-600">{newsletterStats.total}</p>
                          <p className="text-sm text-gray-600">Total Abonați</p>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="text-center p-3 bg-gray-50 rounded-lg">
                          <p className="text-lg font-bold text-gray-600">{newsletterStats.unsubscribed}</p>
                          <p className="text-xs text-gray-600">Dezabonați</p>
                        </div>
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Orders Tab */}
          <TabsContent value="orders" className="space-y-4 sm:space-y-6">
            <Card>
              <CardHeader>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <CardTitle className="text-lg sm:text-xl">Toate Comenzile</CardTitle>
                  <div className="flex flex-col sm:flex-row gap-2">
                    <div className="relative">
                      <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        placeholder="Caută comenzi..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 w-full sm:w-64"
                      />
                    </div>
                    <Button size="sm" variant="outline">
                      <Filter className="h-4 w-4 mr-2" />
                      Filter
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {ordersLoading ? (
                  <div className="flex justify-center py-8">
                    <RefreshCw className="h-8 w-8 animate-spin" />
                  </div>
                ) : orders.length === 0 ? (
                  <div className="text-center py-8">
                    <ShoppingBag className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500">Nu există comenzi încă</p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left p-3 font-medium text-gray-600">Comandă</th>
                          <th className="text-left p-3 font-medium text-gray-600">Client</th>
                          <th className="text-left p-3 font-medium text-gray-600 hidden sm:table-cell">Email</th>
                          <th className="text-left p-3 font-medium text-gray-600">Sumă</th>
                          <th className="text-left p-3 font-medium text-gray-600">Status</th>
                          <th className="text-left p-3 font-medium text-gray-600 hidden md:table-cell">Plată</th>
                          <th className="text-left p-3 font-medium text-gray-600">Acțiuni</th>
                        </tr>
                      </thead>
                      <tbody>
                        {orders
                          .filter(order => 
                            order.order_number.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            order.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            order.email.toLowerCase().includes(searchTerm.toLowerCase())
                          )
                          .map((order) => (
                            <tr key={order.id} className="border-b hover:bg-gray-50">
                              <td className="p-3">
                                <div>
                                  <p className="font-medium text-sm">{order.order_number}</p>
                                  <p className="text-xs text-gray-500">
                                    {new Date(order.created_at).toLocaleDateString('ro-RO')}
                                  </p>
                                </div>
                              </td>
                              <td className="p-3">
                                <div>
                                  <p className="font-medium text-sm">{order.full_name}</p>
                                  <p className="text-xs text-gray-500 flex items-center">
                                    <MapPin className="h-3 w-3 mr-1" />
                                    {order.address}
                                  </p>
                                </div>
                              </td>
                              <td className="p-3 hidden sm:table-cell">
                                <p className="text-sm text-gray-600">{order.email}</p>
                              </td>
                              <td className="p-3">
                                <p className="font-medium text-sm">{order.total_amount} RON</p>
                              </td>
                              <td className="p-3">
                                <Select 
                                  value={order.status} 
                                  onValueChange={(value) => handleStatusUpdate(order.id, value)}
                                >
                                  <SelectTrigger className="w-32">
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="pending">În așteptare</SelectItem>
                                    <SelectItem value="completed">Finalizat</SelectItem>
                                    <SelectItem value="cancelled">Anulat</SelectItem>
                                  </SelectContent>
                                </Select>
                              </td>
                              <td className="p-3 hidden md:table-cell">
                                {getPaymentStatusBadge(order.payment_status)}
                              </td>
                              <td className="p-3">
                                <div className="flex gap-1">
                                  <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                                    <Eye className="h-4 w-4" />
                                  </Button>
                                  <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                                    <Edit className="h-4 w-4" />
                                  </Button>
                                </div>
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Newsletter Tab */}
          <TabsContent value="newsletter" className="space-y-4 sm:space-y-6">
            <Card>
              <CardHeader>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <CardTitle className="text-lg sm:text-xl">Abonați Newsletter</CardTitle>
                  <div className="flex flex-col sm:flex-row gap-2">
                    <Button size="sm" variant="outline">
                      <Download className="h-4 w-4 mr-2" />
                      Export CSV
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {newsletterLoading ? (
                  <div className="flex justify-center py-8">
                    <RefreshCw className="h-8 w-8 animate-spin" />
                  </div>
                ) : subscribers.length === 0 ? (
                  <div className="text-center py-8">
                    <Mail className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500">Nu există abonați încă</p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left p-3 font-medium text-gray-600">Email</th>
                          <th className="text-left p-3 font-medium text-gray-600 hidden sm:table-cell">Nume</th>
                          <th className="text-left p-3 font-medium text-gray-600">Status</th>
                          <th className="text-left p-3 font-medium text-gray-600 hidden md:table-cell">Sursă</th>
                          <th className="text-left p-3 font-medium text-gray-600">Data Abonării</th>
                        </tr>
                      </thead>
                      <tbody>
                        {subscribers.map((subscriber) => (
                          <tr key={subscriber.id} className="border-b hover:bg-gray-50">
                            <td className="p-3">
                              <p className="font-medium text-sm">{subscriber.email}</p>
                            </td>
                            <td className="p-3 hidden sm:table-cell">
                              <p className="text-sm text-gray-600">{subscriber.full_name || '-'}</p>
                            </td>
                            <td className="p-3">
                              <Badge 
                                className={`${
                                  subscriber.status === 'active' 
                                    ? 'bg-green-100 text-green-800' 
                                    : subscriber.status === 'unsubscribed'
                                    ? 'bg-gray-100 text-gray-800'
                                    : 'bg-red-100 text-red-800'
                                } border-0 text-xs px-2 py-1`}
                              >
                                {subscriber.status === 'active' ? 'Activ' : 
                                 subscriber.status === 'unsubscribed' ? 'Dezabonat' : 'Bounce'}
                              </Badge>
                            </td>
                            <td className="p-3 hidden md:table-cell">
                              <p className="text-sm text-gray-600">website</p>
                            </td>
                            <td className="p-3">
                              <p className="text-sm text-gray-600">
                                {new Date(subscriber.created_at).toLocaleDateString('ro-RO')}
                              </p>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Users Tab */}
          <TabsContent value="users" className="space-y-4 sm:space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg sm:text-xl">Managementul Utilizatorilor</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">Funcționalitatea pentru utilizatori va fi adăugată în curând</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
      
      <Footer />
    </div>
  );
};

export default AdminDashboard; 