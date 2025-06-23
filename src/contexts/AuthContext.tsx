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
      const { data: profile, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) {
        console.error('Error loading profile:', error);
        return null;
      }

      return profile ? profileToUser(profile) : null;
    } catch (error) {
      console.error('Error loading profile:', error);
      return null;
    }
  };

  // Supabase Session Management
  useEffect(() => {
    // Get current session
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      if (session?.user) {
        const profile = await loadUserProfile(session.user.id);
        setUser(profile);
      }
      setLoading(false);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (session?.user) {
          const profile = await loadUserProfile(session.user.id);
          setUser(profile);
        } else {
          setUser(null);
        }
        setLoading(false);
      }
    );

    return () => subscription.unsubscribe();
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
        return { success: false, error: 'Toate câmpurile obligatorii trebuie completate' };
      }

      if (password.length < 6) {
        return { success: false, error: 'Parola trebuie să aibă cel puțin 6 caractere' };
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return { success: false, error: 'Te rog introdu o adresă de email validă' };
      }

      // Supabase Authentication
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

      if (error) {
        if (error.message.includes('already registered')) {
          return { success: false, error: 'Un cont cu acest email există deja' };
        }
        return { success: false, error: error.message };
      }

      if (data.user) {
        toast({
          title: "Verifică-ți emailul!",
          description: "Am trimis un link de confirmare la adresa ta de email",
        });
      }

      return { success: true };
    } catch (error) {
      console.error('SignUp error:', error);
      return { success: false, error: 'A apărut o eroare la înregistrare' };
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

      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        if (error.message.includes('Invalid login credentials')) {
          return { success: false, error: 'Email sau parolă incorectă' };
        }
        return { success: false, error: error.message };
      }

      if (data.user) {
        // Load profile from database
        const profile = await loadUserProfile(data.user.id);
        
        if (profile) {
          setUser(profile);
          
          toast({
            title: "Autentificare reușită!",
            description: `Bun venit${profile.role === 'admin' ? ' înapoi, Admin' : ''}, ${profile.fullName}!`,
          });
        }
      }

      return { success: true };
    } catch (error) {
      console.error('SignIn error:', error);
      return { success: false, error: 'A apărut o eroare la autentificare' };
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    try {
      await supabase.auth.signOut();
      setUser(null);
      
      toast({
        title: "Deconectare reușită",
        description: "Ai fost deconectat din contul tău",
      });
    } catch (error) {
      console.error('SignOut error:', error);
      toast({
        title: "Eroare la deconectare",
        description: "A apărut o problemă la deconectare",
        variant: "destructive",
      });
    }
  };

  const isAuthenticated = !!user;
  const isAdmin = user?.role === 'admin';

  const value: AuthContextType = {
    user,
    signUp,
    signIn,
    signOut,
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