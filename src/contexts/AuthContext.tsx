import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { toast } from "@/hooks/use-toast";

interface User {
  id: string;
  email: string;
  fullName: string;
  phone?: string;
  createdAt: string;
}

interface AuthContextType {
  user: User | null;
  signUp: (email: string, password: string, userData: { fullName: string; phone?: string }) => Promise<{ success: boolean; error?: string }>;
  signIn: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  signOut: () => void;
  loading: boolean;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Helper functions for localStorage
const AUTH_STORAGE_KEY = 'ergocharge_auth';
const USERS_STORAGE_KEY = 'ergocharge_users';

const loadUsersFromStorage = (): User[] => {
  try {
    if (typeof window === 'undefined') return [];
    const savedUsers = localStorage.getItem(USERS_STORAGE_KEY);
    return savedUsers ? JSON.parse(savedUsers) : [];
  } catch (error) {
    console.warn('Error loading users from localStorage:', error);
    return [];
  }
};

const saveUsersToStorage = (users: User[]) => {
  try {
    if (typeof window === 'undefined') return;
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
  } catch (error) {
    console.warn('Error saving users to localStorage:', error);
  }
};

const loadCurrentUserFromStorage = (): User | null => {
  try {
    if (typeof window === 'undefined') return null;
    const savedAuth = localStorage.getItem(AUTH_STORAGE_KEY);
    return savedAuth ? JSON.parse(savedAuth) : null;
  } catch (error) {
    console.warn('Error loading auth from localStorage:', error);
    return null;
  }
};

const saveCurrentUserToStorage = (user: User | null) => {
  try {
    if (typeof window === 'undefined') return;
    if (user) {
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(AUTH_STORAGE_KEY);
    }
  } catch (error) {
    console.warn('Error saving auth to localStorage:', error);
  }
};

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

  // Load user from localStorage on mount
  useEffect(() => {
    const savedUser = loadCurrentUserFromStorage();
    setUser(savedUser);
    setLoading(false);
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

      // Check if user already exists
      const existingUsers = loadUsersFromStorage();
      const userExists = existingUsers.find(u => u.email.toLowerCase() === email.toLowerCase());
      
      if (userExists) {
        return { success: false, error: 'An account with this email already exists' };
      }

      // Create new user
      const newUser: User = {
        id: `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        email: email.toLowerCase(),
        fullName: userData.fullName,
        phone: userData.phone,
        createdAt: new Date().toISOString()
      };

      // Save to users list
      const updatedUsers = [...existingUsers, newUser];
      saveUsersToStorage(updatedUsers);

      // Set as current user
      setUser(newUser);
      saveCurrentUserToStorage(newUser);

      toast({
        title: "Account Created Successfully!",
        description: `Welcome, ${userData.fullName}!`,
      });

      return { success: true };
    } catch (error) {
      console.error('SignUp error:', error);
      return { success: false, error: 'An error occurred while creating the account' };
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
        return { success: false, error: 'Email and password are required' };
      }

      // Find user
      const existingUsers = loadUsersFromStorage();
      const user = existingUsers.find(u => u.email.toLowerCase() === email.toLowerCase());

      if (!user) {
        return { success: false, error: 'Invalid email or password' };
      }

      // For demo purposes, we'll accept any password for existing users
      // In production with Supabase, this will be handled properly
      
      setUser(user);
      saveCurrentUserToStorage(user);

      toast({
        title: "Sign In Successful!",
        description: `Welcome back, ${user.fullName}!`,
      });

      return { success: true };
    } catch (error) {
      console.error('SignIn error:', error);
      return { success: false, error: 'An error occurred during sign in' };
    } finally {
      setLoading(false);
    }
  };

  const signOut = () => {
    setUser(null);
    saveCurrentUserToStorage(null);
    
    toast({
      title: "Signed Out Successfully",
      description: "You have been signed out of your account",
    });
  };

  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider value={{
      user,
      signUp,
      signIn,
      signOut,
      loading,
      isAuthenticated
    }}>
      {children}
    </AuthContext.Provider>
  );
}; 