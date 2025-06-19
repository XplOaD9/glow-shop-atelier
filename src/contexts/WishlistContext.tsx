import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { toast } from "@/hooks/use-toast";

interface WishlistItem {
  id: string;
  name: string;
  price: number;
  image: string;
}

interface WishlistContextType {
  items: WishlistItem[];
  addToWishlist: (item: WishlistItem) => void;
  removeFromWishlist: (id: string) => void;
  isInWishlist: (id: string) => boolean;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

// Helper functions for localStorage
const WISHLIST_STORAGE_KEY = 'ergocharge_wishlist';

const loadWishlistFromStorage = (): WishlistItem[] => {
  try {
    if (typeof window === 'undefined') return [];
    const savedWishlist = localStorage.getItem(WISHLIST_STORAGE_KEY);
    return savedWishlist ? JSON.parse(savedWishlist) : [];
  } catch (error) {
    console.warn('Error loading wishlist from localStorage:', error);
    return [];
  }
};

const saveWishlistToStorage = (items: WishlistItem[]) => {
  try {
    if (typeof window === 'undefined') return;
    localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(items));
  } catch (error) {
    console.warn('Error saving wishlist to localStorage:', error);
  }
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};

export const WishlistProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<WishlistItem[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load data from localStorage on component mount
  useEffect(() => {
    const savedItems = loadWishlistFromStorage();
    setItems(savedItems);
    setIsLoaded(true);
  }, []);

  // Save to localStorage whenever items change
  useEffect(() => {
    if (isLoaded) {
      saveWishlistToStorage(items);
    }
  }, [items, isLoaded]);

  const addToWishlist = (item: WishlistItem) => {
    setItems(currentItems => {
      if (currentItems.find(wishlistItem => wishlistItem.id === item.id)) {
        toast({
          title: "Already in Wishlist",
          description: `${item.name} is already in your wishlist`,
        });
        return currentItems;
      }
      toast({
        title: "Added to Wishlist",
        description: `${item.name} has been added to your wishlist`,
      });
      return [...currentItems, item];
    });
  };

  const removeFromWishlist = (id: string) => {
    setItems(currentItems => {
      const itemToRemove = currentItems.find(item => item.id === id);
      if (itemToRemove) {
        toast({
          title: "Removed from Wishlist",
          description: `${itemToRemove.name} has been removed from your wishlist`,
        });
      }
      return currentItems.filter(item => item.id !== id);
    });
  };

  const isInWishlist = (id: string) => {
    return items.some(item => item.id === id);
  };

  return (
    <WishlistContext.Provider value={{
      items,
      addToWishlist,
      removeFromWishlist,
      isInWishlist
    }}>
      {children}
    </WishlistContext.Provider>
  );
};
