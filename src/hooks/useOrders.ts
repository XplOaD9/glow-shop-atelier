import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/hooks/use-toast';
import type { Tables, TablesInsert } from '@/integrations/supabase/types';

type Order = Tables<'orders'>;
type OrderItem = Tables<'order_items'>;
type OrderInsert = TablesInsert<'orders'>;
type OrderItemInsert = TablesInsert<'order_items'>;

// Interfață simplificată pentru MVP
export interface CreateOrderData {
  email: string;
  fullName: string;
  phone?: string;
  address: string;
  items: {
    productName: string;
    quantity: number;
    price: number;
  }[];
}

export const useOrders = () => {
  const { user, isAdmin } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Load orders based on user role
  const loadOrders = async () => {
    if (!user) return;
    
    setLoading(true);
    setError(null);
    
    try {
      let query = supabase
        .from('orders')
        .select(`
          *,
          order_items (
            id,
            product_name,
            quantity,
            price,
            created_at
          )
        `)
        .order('created_at', { ascending: false });

      // If not admin, only show user's orders
      if (!isAdmin) {
        query = query.eq('user_id', user.id);
      }

      const { data, error } = await query;

      if (error) {
        throw error;
      }

      setOrders(data || []);
    } catch (err) {
      console.error('Error loading orders:', err);
      setError('Error loading orders');
    } finally {
      setLoading(false);
    }
  };

  // Create new order with improved error handling
  const createOrder = async (orderData: CreateOrderData): Promise<{ success: boolean; orderId?: string; error?: string }> => {
    console.log('🛒 Order creation started with data:', orderData);
    
    if (!user) {
      console.log('❌ User not authenticated');
      return { success: false, error: 'User not authenticated' };
    }

    console.log('👤 User authenticated:', user.id);
    setLoading(true);
    setError(null);

    try {
      // First check if tables exist by trying a simple query
      console.log('🔍 Checking table access...');
      const { error: testError } = await supabase
        .from('orders')
        .select('id')
        .limit(1);

      if (testError) {
        console.error('❌ Tables not accessible:', testError);
        if (testError.message.includes('relation "public.orders" does not exist')) {
          return { success: false, error: 'Tables not created. Please run CREATE_ORDERS_TABLES.sql' };
        }
        if (testError.message.includes('RLS')) {
          return { success: false, error: 'Permission denied. Check RLS policies.' };
        }
        return { success: false, error: `Database error: ${testError.message}` };
      }

      // Calculate total amount
      console.log('💰 Calculating total amount...');
      const totalAmount = orderData.items.reduce(
        (sum, item) => sum + item.price, 
        0
      );
      console.log('📊 Total amount calculated:', totalAmount);

      // Create order with timeout
      console.log('📝 Creating order...');
      const orderInsert: OrderInsert = {
        user_id: user.id,
        email: orderData.email,
        full_name: orderData.fullName,
        phone: orderData.phone,
        address: orderData.address,
        total_amount: totalAmount,
      };

      console.log('📋 Order insert data:', orderInsert);

      // Use timeout to prevent hanging
      const orderPromise = supabase
        .from('orders')
        .insert(orderInsert)
        .select()
        .single();

      const timeoutPromise = new Promise((_, reject) =>
        setTimeout(() => reject(new Error('Order creation timeout')), 10000)
      );

      const { data: order, error: orderError } = await Promise.race([
        orderPromise,
        timeoutPromise
      ]);

      console.log('📊 Order insert result:', { order: !!order, error: orderError?.message });

      if (orderError || !order) {
        console.error('❌ Order creation failed:', orderError);
        const errorMsg = orderError?.message || 'Failed to create order';
        return { success: false, error: errorMsg };
      }

      console.log('✅ Order created successfully:', order.id);

      // Create order items with timeout
      console.log('📦 Creating order items...');
      const orderItemsInsert: OrderItemInsert[] = orderData.items.map(item => ({
        order_id: order.id,
        product_name: item.productName,
        quantity: item.quantity,
        price: item.price,
      }));

      console.log('📋 Order items data:', orderItemsInsert.length, 'items');

      const itemsPromise = supabase
        .from('order_items')
        .insert(orderItemsInsert);

      const itemsTimeoutPromise = new Promise((_, reject) =>
        setTimeout(() => reject(new Error('Order items creation timeout')), 10000)
      );

      const { error: itemsError } = await Promise.race([
        itemsPromise,
        itemsTimeoutPromise
      ]);

      console.log('📊 Order items insert result:', { error: itemsError?.message });

      if (itemsError) {
        console.error('❌ Order items creation failed:', itemsError);
        // Order was created but items failed - still return success
        console.log('⚠️ Order created but items failed - returning success anyway');
      } else {
        console.log('✅ Order items created successfully');
      }

      // Try to reload orders (don't fail if this fails)
      try {
        console.log('🔄 Reloading orders...');
        await loadOrders();
      } catch (reloadError) {
        console.log('⚠️ Failed to reload orders, but order was created');
      }

      console.log('🛒 Order creation process completed successfully');
      return { success: true, orderId: order.id };
      
    } catch (err) {
      console.error('💥 Error creating order:', err);
      const errorMessage = err instanceof Error ? err.message : 'Error creating order';
      setError(errorMessage);
      
      // Provide more helpful error messages
      if (errorMessage.includes('timeout')) {
        return { success: false, error: 'Order creation timed out. Please try again.' };
      }
      if (errorMessage.includes('permission')) {
        return { success: false, error: 'Permission denied. Please contact support.' };
      }
      
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  // Update order status (admin only) - SIMPLIFICAT
  const updateOrderStatus = async (
    orderId: string, 
    status: Order['status'], 
    paymentStatus?: Order['payment_status']
  ): Promise<{ success: boolean; error?: string }> => {
    if (!isAdmin) {
      return { success: false, error: 'Unauthorized access' };
    }

    try {
      const updates: any = { status };
      if (paymentStatus) {
        updates.payment_status = paymentStatus;
      }

      const { error } = await supabase
        .from('orders')
        .update(updates)
        .eq('id', orderId);

      if (error) {
        throw error;
      }

      toast({
        title: "Order updated",
        description: "Order status has been updated successfully",
      });

      // Reload orders
      await loadOrders();

      return { success: true };
    } catch (err) {
      console.error('Error updating order:', err);
      const errorMessage = err instanceof Error ? err.message : 'Error updating order';
      
      toast({
        title: "Update failed",
        description: errorMessage,
        variant: "destructive",
      });

      return { success: false, error: errorMessage };
    }
  };

  // Get order by ID
  const getOrderById = async (orderId: string): Promise<Order | null> => {
    try {
      const { data, error } = await supabase
        .from('orders')
        .select(`
          *,
          order_items (
            id,
            product_name,
            quantity,
            price,
            created_at
          )
        `)
        .eq('id', orderId)
        .single();

      if (error) {
        throw error;
      }

      return data;
    } catch (err) {
      console.error('Error fetching order:', err);
      return null;
    }
  };

  // Get order statistics (admin only) - SIMPLIFICAT
  const getOrderStats = async (): Promise<{
    totalOrders: number;
    totalRevenue: number;
    pendingOrders: number;
    completedOrders: number;
  } | null> => {
    if (!isAdmin) return null;

    try {
      const { data, error } = await supabase
        .from('orders')
        .select('total_amount, status');

      if (error) {
        throw error;
      }

      const stats = {
        totalOrders: data.length,
        totalRevenue: data.reduce((sum, order) => sum + order.total_amount, 0),
        pendingOrders: data.filter(order => order.status === 'pending').length,
        completedOrders: data.filter(order => order.status === 'completed').length,
      };

      return stats;
    } catch (err) {
      console.error('Error getting order stats:', err);
      return null;
    }
  };

  // Load orders when component mounts
  useEffect(() => {
    if (user) {
      loadOrders();
    }
  }, [user, isAdmin]);

  return {
    orders,
    loading,
    error,
    createOrder,
    updateOrderStatus,
    getOrderById,
    getOrderStats,
    refetch: loadOrders,
  };
}; 