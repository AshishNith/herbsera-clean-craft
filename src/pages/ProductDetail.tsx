import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import useEmblaCarousel from 'embla-carousel-react';
import { getProductBySlug } from '@/services/productService';
import { useCart } from '@/contexts/CartContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ReviewSection from '@/components/ReviewSection';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Star, ShoppingCart, Heart, Truck, Shield, Leaf, Minus, Plus, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState, useCallback, useEffect } from 'react';

const ProductDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedImage(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on('select', onSelect);
  }, [emblaApi, onSelect]);

  const scrollTo = (index: number) => {
    if (emblaApi) emblaApi.scrollTo(index);
    setSelectedImage(index);
  };

  const { data, isLoading, error } = useQuery({
    queryKey: ['product', slug],
    queryFn: () => getProductBySlug(slug || ''),
    enabled: !!slug,
  });

  const product = data?.data;

  const handleAddToCart = async () => {
    if (product) {
      await addToCart(product._id, quantity);
    }
  };

  const incrementQuantity = () => {
    if (product && quantity < product.stock) {
      setQuantity(quantity + 1);
    }
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-cream">
        <Header />
        <div className="container mx-auto px-4 py-20">
          <div className="animate-pulse">
            <div className="grid md:grid-cols-2 gap-12">
              <div className="bg-cream-dark h-96 rounded-lg"></div>
              <div className="space-y-4">
                <div className="h-8 bg-cream-dark rounded w-3/4"></div>
                <div className="h-4 bg-cream-dark rounded w-1/2"></div>
                <div className="h-20 bg-cream-dark rounded"></div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-cream">
        <Header />
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="font-serif text-3xl mb-4">Product Not Found</h1>
          <Button onClick={() => navigate('/products')}>Back to Products</Button>
        </div>
        <Footer />
      </div>
    );
  }

  const averageRating = product.ratings?.average || 0;
  const totalReviews = product.ratings?.count || 0;

  return (
    <div className="min-h-screen pt-28 bg-cream">
      <Header />
      
      <div className="container mx-auto px-4 py-12">
        {/* Breadcrumb */}
        {/* <nav className="text-sm mb-8">
          <ol className="flex items-center space-x-2">
            <li><a href="/" className="text-charcoal-light hover:text-forest">Home</a></li>
            <li className="text-charcoal-light">/</li>
            <li><a href="/products" className="text-charcoal-light hover:text-forest">Products</a></li>
            <li className="text-charcoal-light">/</li>
            <li className="text-charcoal">{product.name}</li>
          </ol>
        </nav> */}

        <div className="grid md:grid-cols-2 gap-12 mb-16">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="relative aspect-square bg-white rounded-2xl overflow-hidden border border-cream-dark shadow-sm group">
              <div className="h-full w-full overflow-hidden" ref={emblaRef}>
                <div className="flex h-full w-full">
                  {product.images.map((image, index) => (
                    <div key={index} className="relative flex-[0_0_100%] h-full w-full">
                      <img
                        src={image.url}
                        alt={`${product.name} ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Navigation Arrows (Visible on Hover/Desktop) */}
              {product.images.length > 1 && (
                <>
                  <button 
                    onClick={() => emblaApi?.scrollPrev()}
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm border border-cream-dark flex items-center justify-center text-forest opacity-0 group-hover:opacity-100 transition-opacity hidden md:flex"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <button 
                    onClick={() => emblaApi?.scrollNext()}
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm border border-cream-dark flex items-center justify-center text-forest opacity-0 group-hover:opacity-100 transition-opacity hidden md:flex"
                  >
                    <ChevronRight size={20} />
                  </button>
                </>
              )}

              {/* Mobile Pagination Dots */}
              {product.images.length > 1 && (
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 md:hidden z-10">
                  {product.images.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => scrollTo(index)}
                      className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                        selectedImage === index ? 'bg-forest w-4' : 'bg-forest/30'
                      }`}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Thumbnails */}
            {product.images.length > 1 && (
              <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => scrollTo(index)}
                    className={`flex-shrink-0 w-20 h-20 bg-white rounded-xl overflow-hidden border-2 transition-all ${
                      selectedImage === index ? 'border-forest ring-2 ring-forest/20' : 'border-transparent'
                    }`}
                  >
                    <img src={image.url} alt={`${product.name} thumbnail ${index + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <Badge variant="secondary" className="mb-2">{product.category}</Badge>
              <h1 className="font-serif text-4xl font-medium text-charcoal mb-2">{product.name}</h1>
              <div className="flex items-center gap-2 mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.floor(averageRating) ? 'fill-forest text-forest' : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-charcoal-light">
                  {averageRating.toFixed(1)} ({totalReviews} reviews)
                </span>
              </div>
            </div>

            <div className="flex items-baseline gap-3">
              <span className="text-4xl font-medium text-forest">₹{product.price}</span>
              {product.comparePrice && (
                <span className="text-xl text-charcoal-light line-through">₹{product.comparePrice}</span>
              )}
            </div>

            <p className="text-charcoal-light leading-relaxed">{product.description}</p>

            <Separator />

            {/* Quantity Selector */}
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <span className="text-sm font-medium">Quantity:</span>
                <div className="flex items-center border border-charcoal-light rounded-lg">
                  <button
                    onClick={decrementQuantity}
                    className="p-2 hover:bg-cream-dark transition-colors"
                    disabled={quantity <= 1}
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="px-6 py-2 border-x border-charcoal-light">{quantity}</span>
                  <button
                    onClick={incrementQuantity}
                    className="p-2 hover:bg-cream-dark transition-colors"
                    disabled={quantity >= product.stock}
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                <span className="text-sm text-charcoal-light">
                  {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
                </span>
              </div>

              <div className="flex gap-4">
                <Button
                  size="lg"
                  className="flex-1"
                  onClick={handleAddToCart}
                  disabled={product.stock === 0}
                >
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  Add to Cart
                </Button>
                <Button size="lg" variant="outline">
                  <Heart className="w-5 h-5" />
                </Button>
              </div>
            </div>

            <Separator />

            {/* Features */}
            <div className="grid grid-cols-3 gap-4">
              <div className="flex flex-col items-center text-center p-4 bg-cream-dark rounded-lg">
                <Truck className="w-6 h-6 text-forest mb-2" />
                <span className="text-xs text-charcoal-light">Free Shipping</span>
              </div>
              <div className="flex flex-col items-center text-center p-4 bg-cream-dark rounded-lg">
                <Shield className="w-6 h-6 text-forest mb-2" />
                <span className="text-xs text-charcoal-light">Secure Payment</span>
              </div>
              <div className="flex flex-col items-center text-center p-4 bg-cream-dark rounded-lg">
                <Leaf className="w-6 h-6 text-forest mb-2" />
                <span className="text-xs text-charcoal-light">100% Natural</span>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <Tabs defaultValue="description" className="mb-16">
          <TabsList className="w-full justify-start border-b">
            <TabsTrigger value="description">Description</TabsTrigger>
            <TabsTrigger value="ingredients">Ingredients</TabsTrigger>
            <TabsTrigger value="usage">How to Use</TabsTrigger>
            <TabsTrigger value="reviews">Reviews ({totalReviews})</TabsTrigger>
          </TabsList>

          <TabsContent value="description" className="py-8">
            <div className="prose max-w-none">
              <p className="text-charcoal-light leading-relaxed">{product.description}</p>
              {product.benefits && product.benefits.length > 0 && (
                <div className="mt-6">
                  <h3 className="font-serif text-xl mb-4">Key Benefits:</h3>
                  <ul className="space-y-2">
                    {product.benefits.map((benefit, index) => (
                      <li key={index} className="flex items-start">
                        <Leaf className="w-5 h-5 text-forest mt-0.5 mr-2 flex-shrink-0" />
                        <span className="text-charcoal-light">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="ingredients" className="py-8">
            <div className="space-y-4">
              {product.ingredients && product.ingredients.length > 0 ? (
                product.ingredients.map((ingredient, index) => (
                  <div key={index} className="border-b border-cream-dark pb-4">
                    <h4 className="font-medium text-charcoal mb-1">{ingredient.name}</h4>
                    {ingredient.percentage && (
                      <span className="text-sm text-forest">{ingredient.percentage}%</span>
                    )}
                    {ingredient.benefits && (
                      <p className="text-sm text-charcoal-light mt-2">{ingredient.benefits}</p>
                    )}
                  </div>
                ))
              ) : (
                <p className="text-charcoal-light">Ingredient information coming soon.</p>
              )}
            </div>
          </TabsContent>

          <TabsContent value="usage" className="py-8">
            <div className="prose max-w-none">
              <p className="text-charcoal-light leading-relaxed">
                {product.usage || 'Apply to wet skin, lather, and rinse thoroughly. For best results, use daily.'}
              </p>
            </div>
          </TabsContent>

          <TabsContent value="reviews" className="py-8">
            <ReviewSection productId={product._id} />
          </TabsContent>
        </Tabs>
      </div>

      <Footer />
    </div>
  );
};

export default ProductDetail;
