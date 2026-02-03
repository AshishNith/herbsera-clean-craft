import api from '@/lib/api';
import { Product } from './productService';
import { Address } from './userService';

export interface OrderItem {
  product: string | Product;
  name: string;
  image: string;
  quantity: number;
  price: number;
}

export interface Order {
  _id: string;
  user: string;
  orderNumber: string;
  items: OrderItem[];
  shippingAddress: Address;
  paymentMethod: 'razorpay' | 'stripe' | 'cod';
  paymentInfo?: {
    id?: string;
    status?: string;
    paidAt?: string;
  };
  pricing: {
    subtotal: number;
    tax: number;
    shippingCost: number;
    discount: number;
    total: number;
  };
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled' | 'refunded';
  trackingNumber?: string;
  notes?: string;
  deliveredAt?: string;
  cancelledAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateOrderData {
  items: Array<{
    product: string;
    quantity: number;
    price?: number;
  }>;
  shippingAddress: Address;
  paymentMethod: string;
  paymentStatus?: string;
  paymentInfo?: {
    id?: string;
    status?: string;
  };
}

/**
 * Create new order
 */
export const createOrder = async (orderData: CreateOrderData): Promise<{ success: boolean; data: Order }> => {
  const response = await api.post('/orders', orderData);
  return response.data;
};

/**
 * Get user's orders
 */
export const getMyOrders = async (page: number = 1, limit: number = 10): Promise<{ success: boolean; data: Order[]; pagination: any }> => {
  const response = await api.get('/orders/my-orders', { params: { page, limit } });
  return response.data;
};

/**
 * Get single order details
 */
export const getOrderDetails = async (orderId: string): Promise<{ success: boolean; data: Order }> => {
  const response = await api.get(`/orders/${orderId}`);
  return response.data;
};

/**
 * Cancel order
 */
export const cancelOrder = async (orderId: string): Promise<{ success: boolean; data: Order }> => {
  const response = await api.put(`/orders/${orderId}/cancel`);
  return response.data;
};
