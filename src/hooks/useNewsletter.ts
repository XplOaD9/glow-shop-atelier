import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/hooks/use-toast';
import type { Tables, TablesInsert } from '@/integrations/supabase/types';

type NewsletterSubscriber = Tables<'newsletter_subscribers'>;
type NewsletterSubscriberInsert = TablesInsert<'newsletter_subscribers'>;

export const useNewsletter = () => {
  const { user, isAdmin } = useAuth();
  const [subscribers, setSubscribers] = useState<NewsletterSubscriber[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Load all subscribers (admin only)
  const loadSubscribers = async () => {
    if (!isAdmin) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const { data, error } = await supabase
        .from('newsletter_subscribers')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        throw error;
      }

      setSubscribers(data || []);
    } catch (err) {
      console.error('Error loading subscribers:', err);
      setError('Error loading newsletter subscribers');
    } finally {
      setLoading(false);
    }
  };

  // Subscribe to newsletter (SIMPLIFICAT pentru MVP)
  const subscribe = async (
    email: string, 
    fullName?: string
  ): Promise<{ success: boolean; error?: string }> => {
    console.log('📧 Newsletter subscription started for:', email, 'name:', fullName);
    setLoading(true);
    setError(null);

    try {
      // Validate email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        console.log('❌ Invalid email format:', email);
        setLoading(false);
        return { success: false, error: 'Please enter a valid email address' };
      }

      console.log('✅ Email format valid, checking if already subscribed...');

      // Check if already subscribed
      console.log('🔍 Querying database for existing subscription...');
      const { data: existing, error: selectError } = await supabase
        .from('newsletter_subscribers')
        .select('id, status')
        .eq('email', email.toLowerCase())
        .maybeSingle();

      console.log('📊 Database query result:', { existing, selectError });

      if (selectError) {
        console.error('❌ Database query error:', selectError);
        throw selectError;
      }

      if (existing) {
        console.log('📧 Existing subscription found:', existing);
        if (existing.status === 'active') {
          console.log('⚠️ Email already active, returning error');
          setLoading(false);
          return { success: false, error: 'This email is already subscribed to our newsletter' };
        }
        
        // Reactivate subscription
        const { error: updateError } = await supabase
          .from('newsletter_subscribers')
          .update({ 
            status: 'active',
            full_name: fullName
          })
          .eq('id', existing.id);

        if (updateError) {
          throw updateError;
        }

        // Reload subscribers if admin
        if (isAdmin) {
          await loadSubscribers();
        }

        setLoading(false);
        return { success: true };
      }

      // Create new subscription
      console.log('➕ Creating new subscription...');
      const subscriptionData: NewsletterSubscriberInsert = {
        email: email.toLowerCase(),
        full_name: fullName,
        status: 'active'
      };

      console.log('📝 Subscription data:', subscriptionData);

      const { error: insertError } = await supabase
        .from('newsletter_subscribers')
        .insert(subscriptionData);

      console.log('📊 Insert result:', { insertError });

      if (insertError) {
        console.error('❌ Insert error:', insertError);
        throw insertError;
      }

      console.log('✅ Newsletter subscription successful!');

      // Reload subscribers if admin
      if (isAdmin) {
        console.log('🔄 Reloading subscribers for admin...');
        await loadSubscribers();
      }

      setLoading(false);
      console.log('📧 Newsletter subscription process completed');
      return { success: true };
    } catch (err) {
      console.error('Error subscribing to newsletter:', err);
      const errorMessage = err instanceof Error ? err.message : 'Error subscribing to newsletter';
      setError(errorMessage);
      
      setLoading(false);
      return { success: false, error: errorMessage };
    }
  };

  // Unsubscribe from newsletter (SIMPLIFICAT)
  const unsubscribe = async (email: string): Promise<{ success: boolean; error?: string }> => {
    try {
      const { error } = await supabase
        .from('newsletter_subscribers')
        .update({ status: 'unsubscribed' })
        .eq('email', email.toLowerCase());

      if (error) {
        throw error;
      }

      toast({
        title: "Successfully unsubscribed",
        description: "You've been unsubscribed from our newsletter",
      });

      // Reload subscribers if admin
      if (isAdmin) {
        await loadSubscribers();
      }

      return { success: true };
    } catch (err) {
      console.error('Error unsubscribing:', err);
      const errorMessage = err instanceof Error ? err.message : 'Error unsubscribing';
      
      toast({
        title: "Unsubscribe failed",
        description: errorMessage,
        variant: "destructive",
      });

      return { success: false, error: errorMessage };
    }
  };

  // Get simple newsletter statistics (MVP)
  const getStats = async (): Promise<{
    total: number;
    active: number;
    unsubscribed: number;
  } | null> => {
    if (!isAdmin) return null;

    try {
      const { data, error } = await supabase
        .from('newsletter_subscribers')
        .select('status');

      if (error) {
        throw error;
      }

      const stats = {
        total: data.length,
        active: data.filter(s => s.status === 'active').length,
        unsubscribed: data.filter(s => s.status === 'unsubscribed').length
      };

      return stats;
    } catch (err) {
      console.error('Error getting newsletter stats:', err);
      return null;
    }
  };

  // Load subscribers when component mounts (admin only)
  useEffect(() => {
    if (isAdmin) {
      loadSubscribers();
    }
  }, [isAdmin]);

  return {
    subscribers,
    loading,
    error,
    subscribe,
    unsubscribe,
    getStats,
    refetch: loadSubscribers,
  };
}; 