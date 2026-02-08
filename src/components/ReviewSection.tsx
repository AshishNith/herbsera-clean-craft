import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { getProductReviews, createReview, type Review } from '@/services/reviewService';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Star, StarHalf, CheckCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ReviewSectionProps {
  productId: string;
}

export default function ReviewSection({ productId }: ReviewSectionProps) {
  const { user } = useAuth();
  const { toast } = useToast();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Review form state
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [title, setTitle] = useState('');
  const [comment, setComment] = useState('');

  useEffect(() => {
    loadReviews();
  }, [productId, page]);

  const loadReviews = async () => {
    try {
      setLoading(true);
      const response = await getProductReviews(productId, page, 5);
      setReviews(response.data);
      setTotalPages(response.pagination.pages);
    } catch (error) {
      console.error('Error loading reviews:', error);
      toast({
        title: 'Error',
        description: 'Failed to load reviews',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) {
      toast({
        title: 'Login Required',
        description: 'Please login to submit a review',
        variant: 'destructive',
      });
      return;
    }

    if (rating === 0) {
      toast({
        title: 'Rating Required',
        description: 'Please select a rating',
        variant: 'destructive',
      });
      return;
    }

    if (!comment.trim()) {
      toast({
        title: 'Comment Required',
        description: 'Please write a comment',
        variant: 'destructive',
      });
      return;
    }

    try {
      setSubmitting(true);
      await createReview({
        product: productId,
        rating,
        title: title.trim() || undefined,
        comment: comment.trim(),
      });

      toast({
        title: 'Success',
        description: 'Review submitted successfully!',
      });

      // Reset form
      setRating(0);
      setTitle('');
      setComment('');
      setShowReviewForm(false);

      // Reload reviews
      setPage(1);
      loadReviews();
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.response?.data?.message || 'Failed to submit review',
        variant: 'destructive',
      });
    } finally {
      setSubmitting(false);
    }
  };

  const renderStars = (rating: number, size: 'sm' | 'md' | 'lg' = 'md') => {
    const sizeClass = size === 'sm' ? 'w-4 h-4' : size === 'lg' ? 'w-6 h-6' : 'w-5 h-5';
    const stars = [];
    
    for (let i = 1; i <= 5; i++) {
      if (i <= Math.floor(rating)) {
        stars.push(
          <Star key={i} className={`${sizeClass} fill-amber-400 text-amber-400`} />
        );
      } else if (i === Math.ceil(rating) && rating % 1 !== 0) {
        stars.push(
          <StarHalf key={i} className={`${sizeClass} fill-amber-400 text-amber-400`} />
        );
      } else {
        stars.push(
          <Star key={i} className={`${sizeClass} text-gray-300`} />
        );
      }
    }
    
    return <div className="flex gap-1">{stars}</div>;
  };

  const renderInteractiveStars = () => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => setRating(star)}
            onMouseEnter={() => setHoverRating(star)}
            onMouseLeave={() => setHoverRating(0)}
            className="focus:outline-none transition-transform hover:scale-110"
          >
            <Star
              className={`w-8 h-8 ${
                star <= (hoverRating || rating)
                  ? 'fill-amber-400 text-amber-400'
                  : 'text-gray-300'
              }`}
            />
          </button>
        ))}
      </div>
    );
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="space-y-8">
      {/* Write Review Section */}
      <Card>
        <CardHeader>
          <CardTitle>Customer Reviews</CardTitle>
        </CardHeader>
        <CardContent>
          {user ? (
            <>
              {!showReviewForm ? (
                <Button onClick={() => setShowReviewForm(true)}>
                  Write a Review
                </Button>
              ) : (
                <form onSubmit={handleSubmitReview} className="space-y-6">
                  {/* Rating */}
                  <div>
                    <Label className="mb-2 block">Rating *</Label>
                    {renderInteractiveStars()}
                    {rating > 0 && (
                      <p className="text-sm text-gray-600 mt-2">
                        {rating === 1 && 'Poor'}
                        {rating === 2 && 'Fair'}
                        {rating === 3 && 'Good'}
                        {rating === 4 && 'Very Good'}
                        {rating === 5 && 'Excellent'}
                      </p>
                    )}
                  </div>

                  {/* Title */}
                  <div>
                    <Label htmlFor="review-title">Review Title (Optional)</Label>
                    <Input
                      id="review-title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="Sum up your experience"
                      maxLength={100}
                    />
                  </div>

                  {/* Comment */}
                  <div>
                    <Label htmlFor="review-comment">Your Review *</Label>
                    <Textarea
                      id="review-comment"
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      placeholder="Share your thoughts about this product..."
                      rows={5}
                      required
                      maxLength={1000}
                    />
                    <p className="text-sm text-gray-500 mt-1">
                      {comment.length}/1000 characters
                    </p>
                  </div>

                  {/* Buttons */}
                  <div className="flex gap-3">
                    <Button type="submit" disabled={submitting}>
                      {submitting ? 'Submitting...' : 'Submit Review'}
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => {
                        setShowReviewForm(false);
                        setRating(0);
                        setTitle('');
                        setComment('');
                      }}
                    >
                      Cancel
                    </Button>
                  </div>
                </form>
              )}
            </>
          ) : (
            <div className="text-center py-6 text-gray-600">
              <p className="mb-4">Please login to write a review</p>
              <Button onClick={() => window.location.href = '/login'}>
                Login to Review
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Reviews List */}
      <div className="space-y-6">
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          </div>
        ) : reviews.length === 0 ? (
          <Card>
            <CardContent className="text-center py-12 text-gray-500">
              <p>No reviews yet. Be the first to review this product!</p>
            </CardContent>
          </Card>
        ) : (
          <>
            {reviews.map((review) => (
              <Card key={review._id}>
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    {/* Avatar */}
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={review.user.photoURL} alt={review.user.displayName} />
                      <AvatarFallback>
                        {review.user.displayName?.charAt(0).toUpperCase() || 'U'}
                      </AvatarFallback>
                    </Avatar>

                    {/* Review Content */}
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-semibold text-charcoal">
                              {review.user.displayName}
                            </h4>
                            {review.isVerifiedPurchase && (
                              <Badge variant="secondary" className="text-xs">
                                <CheckCircle className="w-3 h-3 mr-1" />
                                Verified Purchase
                              </Badge>
                            )}
                          </div>
                          {renderStars(review.rating, 'sm')}
                        </div>
                        <span className="text-sm text-gray-500">
                          {formatDate(review.createdAt)}
                        </span>
                      </div>

                      {/* Review Title */}
                      {review.title && (
                        <h5 className="font-semibold text-charcoal mb-2">
                          {review.title}
                        </h5>
                      )}

                      {/* Review Comment */}
                      <p className="text-charcoal-light leading-relaxed mb-3">
                        {review.comment}
                      </p>

                      {/* Review Images */}
                      {review.images && review.images.length > 0 && (
                        <div className="flex gap-2 mb-3">
                          {review.images.map((img, idx) => (
                            <img
                              key={idx}
                              src={img.url}
                              alt={`Review ${idx + 1}`}
                              className="w-20 h-20 object-cover rounded-lg border"
                            />
                          ))}
                        </div>
                      )}

                      {/* Helpful Count */}
                      {review.helpfulCount > 0 && (
                        <p className="text-sm text-gray-600">
                          {review.helpfulCount} {review.helpfulCount === 1 ? 'person' : 'people'} found this helpful
                        </p>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center gap-2 mt-8">
                <Button
                  variant="outline"
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                >
                  Previous
                </Button>
                <span className="px-4 py-2 text-sm text-gray-600">
                  Page {page} of {totalPages}
                </span>
                <Button
                  variant="outline"
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                >
                  Next
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
