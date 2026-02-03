import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { getCart, addToCart as addToCartAPI, updateCartItem, removeFromCart, Cart } from '@/services/cartService';
import { toast } from '@/hooks/use-toast';

interface CartContextType {
  cart: Cart | null;
  loading: boolean;
  addToCart: (productId: string, quantity?: number) => Promise<void>;
  updateQuantity: (itemId: string, quantity: number) => Promise<void>;
  removeItem: (itemId: string) => Promise<void>;
  refreshCart: () => Promise<void>;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<Cart | null>(null);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  const refreshCart = async () => {
    if (!user) {
      setCart(null);
      return;
    }

    try {
      setLoading(true);
      const response = await getCart();
      setCart(response.data);
    } catch (error: any) {
      if (error.response?.status !== 404) {
        console.error('Error fetching cart:', error);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshCart();
  }, [user]);

  const addToCart = async (productId: string, quantity: number = 1) => {
    if (!user) {
      toast({
        title: 'Authentication Required',
        description: 'Please login to add items to cart',
        variant: 'destructive',
      });
      return;
    }

    try {
      setLoading(true);
      const response = await addToCartAPI(productId, quantity);
      setCart(response.data);
      toast({
        title: 'Added to Cart',
        description: 'Item has been added to your cart',
      });
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.response?.data?.message || 'Failed to add item to cart',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const updateQuantity = async (itemId: string, quantity: number) => {
    try {
      setLoading(true);
      const response = await updateCartItem(itemId, quantity);
      setCart(response.data);
      toast({
        title: 'Cart Updated',
        description: 'Item quantity has been updated',
      });
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.response?.data?.message || 'Failed to update cart',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const removeItem = async (itemId: string) => {
    try {
      setLoading(true);
      const response = await removeFromCart(itemId);
      setCart(response.data);
      toast({
        title: 'Item Removed',
        description: 'Item has been removed from your cart',
      });
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.response?.data?.message || 'Failed to remove item',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const clearCart = () => {
    setCart(null);
  };

  const value: CartContextType = {
    cart,
    loading,
    addToCart,
    updateQuantity,
    removeItem,
    refreshCart,
    clearCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
