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
import SEO from '@/components/SEO';

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
      await addToCart(product._id, quantity, {
        _id: product._id,
        name: product.name,
        price: product.price,
        benefit: product.benefit,
        images: product.images,
        slug: product.slug
      });
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
    <div className="min-h-screen pt-20 sm:pt-28 bg-cream">
      {product && (
        <SEO 
          title={`${product.name} | Gemstone Soap – HerbsEra`}
          description={product.description || `Buy ${product.name}, a luxury gemstone soap handcrafted by HerbsEra with natural botanical extracts.`}
          ogType="product"
          ogImage={product.images?.[0]?.url}
          keywords={`${product.name}, gemstone soap, ${product.category}, natural soap, herbsera product`}
          schema={{
            "@context": "https://schema.org/",
            "@type": "Product",
            "name": product.name,
            "image": product.images?.map((img: any) => img.url),
            "description": product.description,
            "sku": product.sku,
            "brand": {
              "@type": "Brand",
              "name": "HerbsEra"
            },
            "offers": {
              "@type": "Offer",
              "url": `https://herbsera.in/products/${product.slug}`,
              "priceCurrency": "INR",
              "price": product.price,
              "availability": product.stock > 0 ? "https://schema.org/InStock" : "https://schema.org/OutOfStock"
            },
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": product.ratings?.average || 5,
              "reviewCount": product.ratings?.count || 1
            }
          }}
        />
      )}
      <Header />
      
      <div className="container mx-auto px-3 sm:px-4 py-8 sm:py-12">
        <div className="grid sm:grid-cols-2 md:grid-cols-2 gap-8 sm:gap-10 md:gap-12 mb-12 sm:mb-16">
          {/* Product Images */}
          <div className="space-y-3 sm:space-y-4">
            <div className="relative aspect-square sm:aspect-[4/5] bg-white rounded-xl sm:rounded-2xl overflow-hidden border border-cream-dark shadow-sm group">
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
                    className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 w-8 sm:w-10 h-8 sm:h-10 rounded-full bg-white/80 backdrop-blur-sm border border-cream-dark flex items-center justify-center text-forest opacity-0 group-hover:opacity-100 transition-opacity hidden md:flex"
                  >
                    <ChevronLeft size={18} className="sm:w-5 sm:h-5" />
                  </button>
                  <button 
                    onClick={() => emblaApi?.scrollNext()}
                    className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 w-8 sm:w-10 h-8 sm:h-10 rounded-full bg-white/80 backdrop-blur-sm border border-cream-dark flex items-center justify-center text-forest opacity-0 group-hover:opacity-100 transition-opacity hidden md:flex"
                  >
                    <ChevronRight size={18} className="sm:w-5 sm:h-5" />
                  </button>
                </>
              )}

              {/* Mobile Pagination Dots */}
              {product.images.length > 1 && (
                <div className="absolute bottom-3 sm:bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 sm:gap-2 md:hidden z-10">
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
              <div className="flex gap-2 sm:gap-4 overflow-x-auto no-scrollbar pb-2">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => scrollTo(index)}
                    className={`flex-shrink-0 w-14 sm:w-20 h-14 sm:h-20 bg-white rounded-lg sm:rounded-xl overflow-hidden border-2 transition-all ${
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
          <div className="space-y-4 sm:space-y-6">
            <div>
              <Badge variant="secondary" className="mb-2 text-[10px] sm:text-xs">{product.category}</Badge>
              <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl font-medium text-charcoal mb-2">{product.name}</h1>
              <div className="flex items-center gap-2 mb-2 sm:mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${
                        i < Math.floor(averageRating) ? 'fill-forest text-forest' : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-xs sm:text-sm text-charcoal-light">
                  {averageRating.toFixed(1)} ({totalReviews})
                </span>
              </div>
            </div>

            <div className="flex items-baseline gap-2 sm:gap-3">
              <span className="text-2xl sm:text-3xl md:text-4xl font-medium text-forest">₹{product.price}</span>
              {product.comparePrice && (
                <span className="text-base sm:text-xl text-charcoal-light line-through">₹{product.comparePrice}</span>
              )}
            </div>

            <p className="text-sm sm:text-base text-charcoal-light leading-relaxed">{product.description}</p>

            <Separator />

            {/* Quantity Selector */}
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
                <span className="text-sm font-medium">Quantity:</span>
                <div className="flex items-center border border-charcoal-light rounded-lg">
                  <button
                    onClick={decrementQuantity}
                    className="p-2 sm:p-2.5 hover:bg-cream-dark transition-colors"
                    disabled={quantity <= 1}
                  >
                    <Minus className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </button>
                  <span className="px-4 sm:px-6 py-2 border-x border-charcoal-light text-sm sm:text-base">{quantity}</span>
                  <button
                    onClick={incrementQuantity}
                    className="p-2 sm:p-2.5 hover:bg-cream-dark transition-colors"
                    disabled={quantity >= product.stock}
                  >
                    <Plus className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </button>
                </div>
                <span className="text-xs sm:text-sm text-charcoal-light">
                  {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
                </span>
              </div>

              <div className="flex gap-2 sm:gap-4">
                <Button
                  size="lg"
                  className="flex-1 text-sm sm:text-base"
                  onClick={handleAddToCart}
                  disabled={product.stock === 0}
                >
                  <ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5 mr-1.5 sm:mr-2" />
                  Add to Cart
                </Button>
                <Button size="lg" variant="outline" className="px-3 sm:px-4">
                  <Heart className="w-4 h-4 sm:w-5 sm:h-5" />
                </Button>
              </div>
            </div>

            <Separator />

            {/* Features */}
            <div className="grid grid-cols-3 gap-2 sm:gap-4">
              <div className="flex flex-col items-center text-center p-2 sm:p-4 bg-cream-dark rounded-lg">
                <Truck className="w-5 h-5 sm:w-6 sm:h-6 text-forest mb-1.5 sm:mb-2" />
                <span className="text-[10px] sm:text-xs text-charcoal-light">Free Shipping</span>
              </div>
              <div className="flex flex-col items-center text-center p-2 sm:p-4 bg-cream-dark rounded-lg">
                <Shield className="w-5 h-5 sm:w-6 sm:h-6 text-forest mb-1.5 sm:mb-2" />
                <span className="text-[10px] sm:text-xs text-charcoal-light">Secure Payment</span>
              </div>
              <div className="flex flex-col items-center text-center p-2 sm:p-4 bg-cream-dark rounded-lg">
                <Leaf className="w-5 h-5 sm:w-6 sm:h-6 text-forest mb-1.5 sm:mb-2" />
                <span className="text-[10px] sm:text-xs text-charcoal-light">100% Natural</span>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <Tabs defaultValue="description" className="mb-12 sm:mb-16">
          <TabsList className="w-full justify-start border-b overflow-x-auto flex-nowrap">
            <TabsTrigger value="description" className="text-xs sm:text-sm whitespace-nowrap">Description</TabsTrigger>
            <TabsTrigger value="ingredients" className="text-xs sm:text-sm whitespace-nowrap">Ingredients</TabsTrigger>
            <TabsTrigger value="usage" className="text-xs sm:text-sm whitespace-nowrap">How to Use</TabsTrigger>
            <TabsTrigger value="reviews" className="text-xs sm:text-sm whitespace-nowrap">Reviews ({totalReviews})</TabsTrigger>
          </TabsList>

          <TabsContent value="description" className="py-6 sm:py-8">
            <div className="prose max-w-none">
              <p className="text-sm sm:text-base text-charcoal-light leading-relaxed">{product.description}</p>
              {product.benefits && product.benefits.length > 0 && (
                <div className="mt-4 sm:mt-6">
                  <h3 className="font-serif text-lg sm:text-xl mb-3 sm:mb-4">Key Benefits:</h3>
                  <ul className="space-y-2">
                    {product.benefits.map((benefit, index) => (
                      <li key={index} className="flex items-start">
                        <Leaf className="w-4 h-4 sm:w-5 sm:h-5 text-forest mt-0.5 mr-2 flex-shrink-0" />
                        <span className="text-sm sm:text-base text-charcoal-light">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="ingredients" className="py-6 sm:py-8">
            <div className="space-y-3 sm:space-y-4">
              {product.ingredients && product.ingredients.length > 0 ? (
                product.ingredients.map((ingredient, index) => (
                  <div key={index} className="border-b border-cream-dark pb-3 sm:pb-4">
                    <h4 className="font-medium text-sm sm:text-base text-charcoal mb-1">{ingredient.name}</h4>
                    {ingredient.percentage && (
                      <span className="text-xs sm:text-sm text-forest">{ingredient.percentage}%</span>
                    )}
                    {ingredient.benefits && (
                      <p className="text-xs sm:text-sm text-charcoal-light mt-1 sm:mt-2">{ingredient.benefits}</p>
                    )}
                  </div>
                ))
              ) : (
                <p className="text-charcoal-light text-sm sm:text-base">Ingredient information coming soon.</p>
              )}
            </div>
          </TabsContent>

          <TabsContent value="usage" className="py-6 sm:py-8">
            <div className="prose max-w-none">
              <p className="text-sm sm:text-base text-charcoal-light leading-relaxed">
                {product.usage || 'Apply to wet skin, lather, and rinse thoroughly. For best results, use daily.'}
              </p>
            </div>
          </TabsContent>

          <TabsContent value="reviews" className="py-6 sm:py-8">
            <ReviewSection productId={product._id} />
          </TabsContent>
        </Tabs>
      </div>

      <Footer />
    </div>
  );
};

export default ProductDetail;
