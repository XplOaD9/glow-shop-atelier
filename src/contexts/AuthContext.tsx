import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import type { Tables } from "@/integrations/supabase/types";

type Profile = Tables<'profiles'>;

interface User {
  id: string;
  email: string;
  fullName: string;
  phone?: string;
  role: 'user' | 'admin';
  createdAt: string;
}

interface AuthContextType {
  user: User | null;
  signUp: (email: string, password: string, userData: { fullName: string; phone?: string }) => Promise<{ success: boolean; error?: string }>;
  signIn: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  signOut: () => void;
  clearSession: () => void;
  loading: boolean;
  isAuthenticated: boolean;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Admin email configuration
const ADMIN_EMAILS = ['alhakim_sami@yahoo.ro'];

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Function to convert Profile to User
  const profileToUser = (profile: Profile): User => ({
    id: profile.id,
    email: profile.email,
    fullName: profile.full_name,
    phone: profile.phone || undefined,
    role: profile.role,
    createdAt: profile.created_at,
  });

  // Function to load user profile from Supabase
  const loadUserProfile = async (userId: string): Promise<User | null> => {
    try {
      console.log('🔍 Loading profile for user:', userId);
      
      // Add timeout to the query itself
      const queryPromise = supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();
      
      console.log('⏱️ Starting profile query...');
      
      const { data: profile, error } = await Promise.race([
        queryPromise,
        new Promise<{ data: null, error: { message: string } }>((_, reject) =>
          setTimeout(() => reject({ data: null, error: { message: 'Query timeout after 5 seconds' } }), 5000)
        )
      ]);

      console.log('📊 Profile query result:', { 
        hasProfile: !!profile, 
        hasError: !!error,
        errorMessage: error?.message,
        profileData: profile ? { id: profile.id, email: profile.email } : null
      });

      if (error) {
        console.error('❌ Error loading profile:', error);
        
        if ('code' in error && error.code === 'PGRST116') {
          console.log('🚨 Profile not found - this may cause logout');
        }
        
        return null;
      }

      const user = profile ? profileToUser(profile) : null;
      console.log('✅ Profile converted to user:', user?.email);
      return user;
    } catch (error) {
      console.error('💥 Exception loading profile:', error);
      return null;
    }
  };

  // Supabase Session Management
  useEffect(() => {
    console.log('🔄 AuthContext: Setting up session management...');
    
    // Get current session
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      console.log('📊 Initial session check:', { 
        hasSession: !!session, 
        hasUser: !!session?.user,
        userEmail: session?.user?.email 
      });
      
      if (session?.user) {
        console.log('✅ Found existing session, loading profile...');
        const profile = await loadUserProfile(session.user.id);
        if (profile) {
          setUser(profile);
          console.log('✅ Profile loaded for existing session:', profile.email);
        } else {
          console.log('⚠️ No profile found for existing session');
        }
      } else {
        console.log('ℹ️ No existing session found');
      }
      setLoading(false);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('🔔 Auth state changed:', { 
          event, 
          hasSession: !!session,
          hasUser: !!session?.user,
          userEmail: session?.user?.email 
        });
        
        if (session?.user) {
          console.log('✅ User authenticated, loading profile...');
          const profile = await loadUserProfile(session.user.id);
          if (profile) {
            setUser(profile);
            console.log('✅ Profile set for user:', profile.email);
          } else {
            console.log('⚠️ No profile found, creating basic user for session');
            
            // Create a basic user object to allow functionality even without profile
            const basicUser: User = {
              id: session.user.id,
              email: session.user.email || '',
              fullName: session.user.user_metadata?.full_name || 'User',
              role: 'user',
              createdAt: session.user.created_at || new Date().toISOString()
            };
            
            setUser(basicUser);
            console.log('✅ Basic user created for session:', basicUser.email);
          }
        } else {
          console.log('❌ No session, clearing user');
          setUser(null);
        }
        setLoading(false);
      }
    );

    return () => {
      console.log('🔄 AuthContext: Cleaning up subscription');
      subscription.unsubscribe();
    };
  }, []);

  const signUp = async (
    email: string, 
    password: string, 
    userData: { fullName: string; phone?: string }
  ): Promise<{ success: boolean; error?: string }> => {
    try {
      setLoading(true);

      // Validate input
      if (!email || !password || !userData.fullName) {
        return { success: false, error: 'All required fields must be completed' };
      }

      if (password.length < 6) {
        return { success: false, error: 'Password must be at least 6 characters' };
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return { success: false, error: 'Please enter a valid email address' };
      }

      console.log('🔄 Starting signup process...');

      // Test if profiles table is accessible first
      console.log('🔍 Checking profiles table...');
      const { error: profilesTestError } = await supabase
        .from('profiles')
        .select('id')
        .limit(1);

      if (profilesTestError) {
        console.error('❌ Profiles table not accessible:', profilesTestError);
        if (profilesTestError.message.includes('relation "public.profiles" does not exist')) {
          return { success: false, error: 'Database error saving new user - Missing profiles table' };
        }
      }

      // Supabase Authentication
      console.log('📝 Creating user account...');
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: userData.fullName,
            phone: userData.phone,
          }
        }
      });

      console.log('📊 Signup result:', { 
        success: !!data.user, 
        error: error?.message,
        needsConfirmation: !!data.user && !data.session 
      });

      if (error) {
        console.error('❌ Signup error:', error);
        
        if (error.message.includes('already registered')) {
          return { success: false, error: 'An account with this email already exists' };
        }
        if (error.message.includes('Database error')) {
          return { success: false, error: 'Database error saving new user' };
        }
        if (error.message.includes('trigger')) {
          return { success: false, error: 'Database error saving new user' };
        }
        return { success: false, error: error.message };
      }

      if (data.user) {
        console.log('✅ User created successfully, creating profile...');
        
        // Create profile directly (simple approach like newsletter)
        const profileData = {
          id: data.user.id,
          email: data.user.email!,
          full_name: userData.fullName,
          phone: userData.phone || null,
          role: (email === 'alhakim_sami@yahoo.ro' ? 'admin' : 'user') as 'admin' | 'user'
        };
        
        console.log('📝 Creating profile with data:', profileData);
        
        const { error: profileCreateError } = await supabase
          .from('profiles')
          .insert(profileData);
        
        if (profileCreateError) {
          console.error('❌ Profile creation failed:', profileCreateError);
          
          // Check if it's because table doesn't exist
          if (profileCreateError.message.includes('does not exist') || 
              profileCreateError.message.includes('relation')) {
            return { success: false, error: 'Database nu este configurat! Rulează SQL din CREATE_PROFILES_TABLE.sql' };
          }
          
          // For other errors, show generic message but allow signup
          if (data.session) {
            toast({
              title: "Cont creat cu succes!",
              description: "Bun venit! Contul poate avea funcționalitate limitată.",
            });
          } else {
            toast({
              title: "Verifică email-ul!",
              description: "Am trimis un link de confirmare la adresa ta de email",
            });
          }
          
          return { success: true };
        } else {
          console.log('✅ Profile created successfully');
        }
        
        if (data.session) {
          // User is immediately signed in (email confirmation disabled)
          console.log('✅ User created and signed in immediately');
          toast({
            title: "Cont creat cu succes!",
            description: "Bun venit! Contul tău a fost creat.",
          });
        } else {
          // Email confirmation required
          console.log('📧 User created, email confirmation required');
          toast({
            title: "Verifică email-ul!",
            description: "Am trimis un link de confirmare la adresa ta de email",
          });
        }
      }

      return { success: true };
    } catch (error) {
      console.error('💥 SignUp error:', error);
      const errorMessage = error instanceof Error ? error.message : 'An error occurred during registration';
      
      // Check for specific database errors
      if (errorMessage.includes('profiles') || errorMessage.includes('trigger') || errorMessage.includes('function')) {
        return { success: false, error: 'Database error saving new user - Please run database setup' };
      }
      
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  const signIn = async (
    email: string, 
    password: string
  ): Promise<{ success: boolean; error?: string }> => {
    try {
      setLoading(true);

      // Validate input
      if (!email || !password) {
        return { success: false, error: 'Email și parola sunt obligatorii' };
      }

      console.log('🔄 Starting sign in process...');

      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      console.log('📊 Sign in response:', { data: !!data.user, error: error?.message });

      if (error) {
        console.error('❌ Sign in error:', error);
        
        if (error.message.includes('Invalid login credentials')) {
          return { success: false, error: 'Email sau parolă incorectă' };
        }
        if (error.message.includes('Email not confirmed')) {
          return { success: false, error: 'Te rog confirmă email-ul înainte să te conectezi' };
        }
        return { success: false, error: error.message };
      }

      if (data.user) {
        console.log('✅ User authenticated:', data.user.email);
        
        // Don't wait for profile loading in signIn - let onAuthStateChange handle it
        // This prevents the modal from getting stuck
        toast({
          title: "Autentificare reușită!",
          description: "Bun venit! Se încarcă profilul...",
        });
        
        console.log('✅ Login successful, profile will be loaded by auth state change');
      }

      return { success: true };
    } catch (error) {
      console.error('💥 SignIn error:', error);
      return { success: false, error: 'A apărut o eroare la autentificare' };
    } finally {
      setLoading(false);
      console.log('🔄 Sign in process completed');
    }
  };

  const signOut = async () => {
    try {
      console.log('🔄 Starting sign out process...');
      
      // Clear Supabase session
      await supabase.auth.signOut();
      
      // Clear local state
      setUser(null);
      
      // Clear any cached data
      localStorage.removeItem('supabase.auth.token');
      sessionStorage.clear();
      
      console.log('✅ Sign out completed');
      
      toast({
        title: "Deconectare reușită",
        description: "Ai fost deconectat din contul tău",
      });
      
    } catch (error) {
      console.error('❌ SignOut error:', error);
      
      // Force clear even if Supabase fails
      setUser(null);
      localStorage.clear();
      sessionStorage.clear();
      
              toast({
          title: "Session cleared",
          description: "Toate datele de sesiune au fost șterse",
        });
    }
  };

  // Add function to force clear session (for debugging)
  const clearSession = () => {
    console.log('🗑️ Force clearing all session data...');
    setUser(null);
    setLoading(false);
    localStorage.clear();
    sessionStorage.clear();
    
    // Clear Supabase session without waiting
    supabase.auth.signOut().catch(console.error);
    
          toast({
        title: "Session force cleared",
        description: "Toate datele au fost șterse",
      });
  };

  const isAuthenticated = !!user;
  const isAdmin = user?.role === 'admin';

  const value: AuthContextType = {
    user,
    signUp,
    signIn,
    signOut,
    clearSession,
    loading,
    isAuthenticated,
    isAdmin,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}; 