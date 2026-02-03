import api from '@/lib/api';

export interface Product {
  _id: string;
  name: string;
  slug: string;
  description: string;
  benefit?: string;
  price: number;
  comparePrice?: number;
  images: string[];
  category: string;
  ingredients?: Array<{
    name: string;
    percentage?: number;
    benefits?: string;
  }>;
  benefits?: string[];
  weight?: {
    value: number;
    unit: string;
  };
  stock: number;
  sku?: string;
  featured: boolean;
  isActive: boolean;
  ratings: {
    average: number;
    count: number;
  };
  tags?: string[];
  usage?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ProductFilters {
  page?: number;
  limit?: number;
  category?: string;
  featured?: boolean;
  search?: string;
  sort?: string;
  minPrice?: number;
  maxPrice?: number;
}

export interface ProductsResponse {
  success: boolean;
  data: Product[];
  pagination: {
    total: number;
    page: number;
    pages: number;
  };
}

/**
 * Get all products with optional filters
 */
export const getProducts = async (filters?: ProductFilters): Promise<ProductsResponse> => {
  const response = await api.get('/products', { params: filters });
  return response.data;
};

/**
 * Get featured products
 */
export const getFeaturedProducts = async (): Promise<{ success: boolean; data: Product[] }> => {
  const response = await api.get('/products/featured');
  return response.data;
};

/**
 * Get single product by ID or slug
 */
export const getProduct = async (id: string): Promise<{ success: boolean; data: Product }> => {
  const response = await api.get(`/products/${id}`);
  return response.data;
};

/**
 * Get single product by slug
 */
export const getProductBySlug = async (slug: string): Promise<{ success: boolean; data: Product }> => {
  const response = await api.get(`/products/slug/${slug}`);
  return response.data;
};

/**
 * Create new product (Admin only)
 */
export const createProduct = async (productData: Partial<Product>): Promise<{ success: boolean; data: Product }> => {
  const response = await api.post('/products', productData);
  return response.data;
};

/**
 * Update product (Admin only)
 */
export const updateProduct = async (id: string, productData: Partial<Product>): Promise<{ success: boolean; data: Product }> => {
  const response = await api.put(`/products/${id}`, productData);
  return response.data;
};

/**
 * Delete product (Admin only)
 */
export const deleteProduct = async (id: string): Promise<{ success: boolean; message: string }> => {
  const response = await api.delete(`/products/${id}`);
  return response.data;
};
