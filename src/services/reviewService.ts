import api from '@/lib/api';

export interface Review {
  _id: string;
  product: string;
  user: {
    _id: string;
    displayName: string;
    photoURL?: string;
  };
  rating: number;
  title?: string;
  comment: string;
  images?: Array<{
    url: string;
    publicId?: string;
  }>;
  isVerifiedPurchase: boolean;
  helpfulCount: number;
  isApproved: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateReviewData {
  product: string;
  rating: number;
  title?: string;
  comment: string;
}

/**
 * Get product reviews
 */
export const getProductReviews = async (
  productId: string,
  page: number = 1,
  limit: number = 10
): Promise<{ success: boolean; data: Review[]; pagination: any }> => {
  const response = await api.get(`/reviews/product/${productId}`, {
    params: { page, limit },
  });
  return response.data;
};

/**
 * Create product review
 */
export const createReview = async (reviewData: CreateReviewData): Promise<{ success: boolean; data: Review }> => {
  const response = await api.post('/reviews', reviewData);
  return response.data;
};

/**
 * Update review
 */
export const updateReview = async (reviewId: string, reviewData: Partial<CreateReviewData>): Promise<{ success: boolean; data: Review }> => {
  const response = await api.put(`/reviews/${reviewId}`, reviewData);
  return response.data;
};

/**
 * Delete review
 */
export const deleteReview = async (reviewId: string): Promise<{ success: boolean; message: string }> => {
  const response = await api.delete(`/reviews/${reviewId}`);
  return response.data;
};

/**
 * Mark review as helpful
 */
export const markReviewHelpful = async (reviewId: string): Promise<{ success: boolean; data: Review }> => {
  const response = await api.post(`/reviews/${reviewId}/helpful`);
  return response.data;
};
