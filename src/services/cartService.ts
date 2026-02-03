import api from '@/lib/api';
import { Product } from './productService';

export interface CartItem {
  _id: string;
  product: Product;
  quantity: number;
  price: number;
}

export interface Cart {
  _id: string;
  user: string;
  items: CartItem[];
  totalPrice: number;
  createdAt: string;
  updatedAt: string;
}

/**
 * Get user's cart
 */
export const getCart = async (): Promise<{ success: boolean; data: Cart }> => {
  const response = await api.get('/cart');
  return response.data;
};

/**
 * Add item to cart
 */
export const addToCart = async (productId: string, quantity: number = 1): Promise<{ success: boolean; data: Cart }> => {
  const response = await api.post('/cart', { productId, quantity });
  return response.data;
};

/**
 * Update cart item quantity
 */
export const updateCartItem = async (itemId: string, quantity: number): Promise<{ success: boolean; data: Cart }> => {
  const response = await api.put(`/cart/${itemId}`, { quantity });
  return response.data;
};

/**
 * Remove item from cart
 */
export const removeFromCart = async (itemId: string): Promise<{ success: boolean; data: Cart }> => {
  const response = await api.delete(`/cart/${itemId}`);
  return response.data;
};

/**
 * Clear cart
 */
export const clearCart = async (): Promise<{ success: boolean; data: Cart }> => {
  const response = await api.delete('/cart');
  return response.data;
};
