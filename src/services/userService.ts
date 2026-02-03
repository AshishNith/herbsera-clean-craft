import api from '@/lib/api';

export interface User {
  _id: string;
  firebaseUid: string;
  email: string;
  displayName?: string;
  photoURL?: string;
  phoneNumber?: string;
  role: 'user' | 'admin';
  addresses: Address[];
  wishlist: string[];
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Address {
  _id?: string;
  name: string;
  phone: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  pincode: string;
  country?: string;
  isDefault?: boolean;
}

/**
 * Get current user profile
 */
export const getProfile = async (): Promise<{ success: boolean; data: User }> => {
  const response = await api.get('/users/profile');
  return response.data;
};

/**
 * Update user profile
 */
export const updateProfile = async (data: { displayName?: string; phoneNumber?: string }): Promise<{ success: boolean; data: User }> => {
  const response = await api.put('/users/profile', data);
  return response.data;
};

/**
 * Add address
 */
export const addAddress = async (address: Address): Promise<{ success: boolean; data: User }> => {
  const response = await api.post('/users/addresses', address);
  return response.data;
};

/**
 * Update address
 */
export const updateAddress = async (addressId: string, address: Partial<Address>): Promise<{ success: boolean; data: User }> => {
  const response = await api.put(`/users/addresses/${addressId}`, address);
  return response.data;
};

/**
 * Delete address
 */
export const deleteAddress = async (addressId: string): Promise<{ success: boolean; data: User }> => {
  const response = await api.delete(`/users/addresses/${addressId}`);
  return response.data;
};

/**
 * Add product to wishlist
 */
export const addToWishlist = async (productId: string): Promise<{ success: boolean; data: any[] }> => {
  const response = await api.post('/users/wishlist', { productId });
  return response.data;
};

/**
 * Remove product from wishlist
 */
export const removeFromWishlist = async (productId: string): Promise<{ success: boolean; data: any[] }> => {
  const response = await api.delete(`/users/wishlist/${productId}`);
  return response.data;
};
