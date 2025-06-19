import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { toast } from "@/hooks/use-toast";

interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  color?: string;
  material?: string;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (item: Omit<CartItem, 'quantity'>) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  total: number;
  itemCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

// Helper functions for localStorage
const CART_STORAGE_KEY = 'ergocharge_cart';

const loadCartFromStorage = (): CartItem[] => {
  try {
    if (typeof window === 'undefined') return [];
    const savedCart = localStorage.getItem(CART_STORAGE_KEY);
    return savedCart ? JSON.parse(savedCart) : [];
  } catch (error) {
    console.warn('Error loading cart from localStorage:', error);
    return [];
  }
};

const saveCartToStorage = (items: CartItem[]) => {
  try {
    if (typeof window === 'undefined') return;
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
  } catch (error) {
    console.warn('Error saving cart to localStorage:', error);
  }
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load data from localStorage on component mount
  useEffect(() => {
    const savedItems = loadCartFromStorage();
    setItems(savedItems);
    setIsLoaded(true);
  }, []);

  // Save to localStorage whenever items change
  useEffect(() => {
    if (isLoaded) {
      saveCartToStorage(items);
    }
  }, [items, isLoaded]);

  const addToCart = (newItem: Omit<CartItem, 'quantity'>) => {
    setItems(currentItems => {
      const existingItem = currentItems.find(item => 
        item.id === newItem.id && 
        item.color === newItem.color && 
        item.material === newItem.material
      );
      
      if (existingItem) {
        toast({
          title: "Cart Updated",
          description: `Increased quantity of ${newItem.name}`,
        });
        return currentItems.map(item =>
          item.id === existingItem.id && 
          item.color === existingItem.color && 
          item.material === existingItem.material ? 
          { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        toast({
          title: "Added to Cart",
          description: `${newItem.name} has been added to your cart`,
        });
        return [...currentItems, { ...newItem, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (id: string) => {
    setItems(currentItems => {
      const itemToRemove = currentItems.find(item => item.id === id);
      if (itemToRemove) {
        toast({
          title: "Removed from Cart",
          description: `${itemToRemove.name} has been removed from your cart`,
        });
      }
      return currentItems.filter(item => item.id !== id);
    });
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }
    setItems(currentItems =>
      currentItems.map(item =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
    toast({
      title: "Cart Cleared",
      description: "All items have been removed from your cart",
    });
  };

  const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider value={{
      items,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      total,
      itemCount
    }}>
      {children}
    </CartContext.Provider>
  );
};
