import api from '@/lib/api';

export interface FilterItem {
  _id: string;
  name: string;
  searchQuery: string;
  isActive: boolean;
  sortOrder: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface FiltersResponse {
  success: boolean;
  data: FilterItem[];
}

/**
 * Get active filters (Public)
 */
export const getActiveFilters = async (): Promise<FiltersResponse> => {
  const response = await api.get('/filters');
  return response.data;
};

/**
 * Get all filters (Admin only)
 */
export const getAllFiltersAdmin = async (): Promise<FiltersResponse> => {
  const response = await api.get('/filters/admin');
  return response.data;
};

/**
 * Create a new filter (Admin only)
 */
export const createFilter = async (data: Omit<FilterItem, '_id'>): Promise<{ success: boolean; data: FilterItem }> => {
  const response = await api.post('/filters', data);
  return response.data;
};

/**
 * Update an existing filter (Admin only)
 */
export const updateFilter = async (id: string, data: Partial<FilterItem>): Promise<{ success: boolean; data: FilterItem }> => {
  const response = await api.put(`/filters/${id}`, data);
  return response.data;
};

/**
 * Delete a filter (Admin only)
 */
export const deleteFilter = async (id: string): Promise<{ success: boolean; message: string }> => {
  const response = await api.delete(`/filters/${id}`);
  return response.data;
};
