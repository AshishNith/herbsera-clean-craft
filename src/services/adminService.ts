import api from '../lib/api';

export interface DashboardStats {
  totalUsers: number;
  totalProducts: number;
  totalOrders: number;
  totalRevenue: number;
  pendingOrders: number;
  recentOrders: any[];
}

export interface AdminUser {
  _id: string;
  email: string;
  displayName: string;
  role: 'user' | 'admin';
  isActive: boolean;
  createdAt: string;
  phoneNumber?: string;
}

export interface AdminProduct {
  _id: string;
  name: string;
  description: string;
  benefit?: string;
  price: number;
  originalPrice?: number;
  comparePrice?: number;
  stock: number;
  category: string;
  images: Array<{ url: string; alt?: string } | string>;
  isActive: boolean;
  weight?: {
    value: number;
    unit: string;
  };
  createdAt: string;
}

export interface AdminOrder {
  _id: string;
  orderNumber: string;
  user: {
    _id: string;
    displayName: string;
    email: string;
    phoneNumber?: string;
  };
  items: any[];
  pricing: {
    subtotal: number;
    tax: number;
    shippingCost: number;
    discount: number;
    total: number;
  };
  status: string;
  paymentMethod: string;
  shippingAddress: any;
  trackingNumber?: string;
  createdAt: string;
}

export interface AdminReview {
  _id: string;
  user: {
    _id: string;
    displayName: string;
    email: string;
  };
  product: {
    _id: string;
    name: string;
    images: string[];
  };
  rating: number;
  comment: string;
  title?: string;
  isVerifiedPurchase?: boolean;
  createdAt: string;
}

export interface PaginationResponse<T> {
  success: boolean;
  data: {
    users?: T[];
    products?: T[];
    orders?: T[];
    reviews?: T[];
    pagination: {
      page: number;
      limit: number;
      total: number;
      pages: number;
    };
  };
}

class AdminService {
  // Dashboard
  async getDashboardStats(): Promise<DashboardStats> {
    const response = await api.get('/admin/dashboard/stats');
    return response.data.data;
  }

  // User Management
  async getAllUsers(page: number = 1, limit: number = 10, search: string = ''): Promise<PaginationResponse<AdminUser>> {
    const response = await api.get('/admin/users', {
      params: { page, limit, search },
    });
    return response.data;
  }

  async updateUserRole(userId: string, role: 'user' | 'admin'): Promise<{ success: boolean; data: AdminUser }> {
    const response = await api.patch(`/admin/users/${userId}/role`, { role });
    return response.data;
  }

  async toggleUserStatus(userId: string): Promise<{ success: boolean; data: AdminUser }> {
    const response = await api.patch(`/admin/users/${userId}/toggle-status`);
    return response.data;
  }

  // Product Management
  async getAllProducts(page: number = 1, limit: number = 10, search: string = ''): Promise<PaginationResponse<AdminProduct>> {
    const response = await api.get('/admin/products', {
      params: { page, limit, search },
    });
    return response.data;
  }

  async updateProduct(productId: string, data: Partial<AdminProduct>): Promise<{ success: boolean; data: AdminProduct }> {
    const response = await api.put(`/admin/products/${productId}`, data);
    return response.data;
  }

  async deleteProduct(productId: string): Promise<{ success: boolean }> {
    const response = await api.delete(`/admin/products/${productId}`);
    return response.data;
  }

  // Order Management
  async getAllOrders(
    page: number = 1,
    limit: number = 10,
    status?: string,
    search: string = ''
  ): Promise<PaginationResponse<AdminOrder>> {
    const response = await api.get('/admin/orders', {
      params: { page, limit, status, search },
    });
    return response.data;
  }

  async getOrderDetails(orderId: string): Promise<{ success: boolean; data: AdminOrder }> {
    const response = await api.get(`/admin/orders/${orderId}`);
    return response.data;
  }

  async updateOrderStatus(
    orderId: string,
    status: string,
    trackingId?: string
  ): Promise<{ success: boolean; data: AdminOrder }> {
    const response = await api.patch(`/admin/orders/${orderId}/status`, {
      status,
      trackingId,
    });
    return response.data;
  }

  // Review Management
  async getAllReviews(page: number = 1, limit: number = 10): Promise<PaginationResponse<AdminReview>> {
    const response = await api.get('/admin/reviews', {
      params: { page, limit },
    });
    return response.data;
  }

  async deleteReview(reviewId: string): Promise<{ success: boolean }> {
    const response = await api.delete(`/admin/reviews/${reviewId}`);
    return response.data;
  }

  // Analytics
  async getAnalytics(): Promise<{ success: boolean; data: any }> {
    const response = await api.get('/admin/analytics');
    return response.data;
  }
}

export default new AdminService();
