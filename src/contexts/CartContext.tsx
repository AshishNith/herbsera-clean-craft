import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { getCart, addToCart as addToCartAPI, updateCartItem, removeFromCart, Cart } from '@/services/cartService';
import { toast } from '@/hooks/use-toast';

interface CartContextType {
  cart: Cart | null;
  loading: boolean;
  addToCart: (productId: string, quantity?: number, productData?: any) => Promise<void>;
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
      setLoading(true);
      const guestCart = JSON.parse(localStorage.getItem('herbsera_guest_cart') || '{"items":[]}');
      
      // Ensure prices are numbers and recalculate total
      guestCart.items = guestCart.items.map((item: any) => ({
        ...item,
        price: Number(item.price || item.product?.price || 0),
        quantity: Number(item.quantity || 1)
      }));
      
      guestCart.totalPrice = guestCart.items.reduce((acc: number, item: any) => 
        acc + (item.price * item.quantity), 0
      );
      
      setCart(guestCart);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const response = await getCart();
      setCart(response.data);
      
      // Check if there's a guest cart to sync
      const guestCart = localStorage.getItem('herbsera_guest_cart');
      if (guestCart) {
        const guestData = JSON.parse(guestCart);
        if (guestData.items && guestData.items.length > 0) {
          // Sync guest items to server
          for (const item of guestData.items) {
            await addToCartAPI(item.product._id, item.quantity);
          }
          localStorage.removeItem('herbsera_guest_cart');
          // Refresh again to get the merged cart
          const mergedResponse = await getCart();
          setCart(mergedResponse.data);
          toast({
            title: 'Cart Synchronized',
            description: 'Your guest items have been added to your account',
          });
        }
      }
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

  const addToCart = async (productId: string, quantity: number = 1, productData?: any) => {
    if (!user) {
      // Handle Guest Cart
      const guestCart = JSON.parse(localStorage.getItem('herbsera_guest_cart') || '{"items":[]}');
      const existingItemIndex = guestCart.items.findIndex((item: any) => item.product._id === productId);

      if (existingItemIndex > -1) {
        guestCart.items[existingItemIndex].quantity += quantity;
      } else {
        // Store full product info for guest view
        guestCart.items.push({
          _id: Math.random().toString(36).substr(2, 9),
          product: productData || { _id: productId }, 
          quantity,
          price: productData?.price || 0
        });
      }

      // Recalculate total for guest cart
      guestCart.totalPrice = guestCart.items.reduce((acc: number, item: any) => acc + (item.price * item.quantity), 0);

      localStorage.setItem('herbsera_guest_cart', JSON.stringify(guestCart));
      toast({
        title: 'Added to Cart',
        description: 'Item has been added to your guest cart',
      });
      refreshCart();
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
