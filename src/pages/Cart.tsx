import { useNavigate } from 'react-router-dom';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Trash2, Plus, Minus, ShoppingBag } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Cart = () => {
  const { cart, loading, updateQuantity, removeItem } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const cartItemsCount = cart?.items?.reduce((sum, item) => sum + item.quantity, 0) || 0;
  const isEmpty = !cart || cart.items.length === 0;

  const handleCheckout = () => {
    if (!user) {
      toast({
        title: "Login Required",
        description: "Please login to proceed with your order.",
      });
      navigate('/login', { state: { from: '/checkout' } });
    } else {
      navigate('/checkout');
    }
  };

  if (loading && !cart) {
    return (
      <div className="min-h-screen pt-20 sm:pt-28 bg-cream flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <div className="animate-pulse text-charcoal-light">Loading cart...</div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 sm:pt-28 bg-cream flex flex-col">
      <Header />
      
      <div className="flex-1 container mx-auto px-3 sm:px-4 py-8 sm:py-12">
        <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl font-medium text-charcoal mb-6 sm:mb-8">Shopping Cart</h1>

        {isEmpty ? (
          <div className="text-center py-12 sm:py-16">
            <ShoppingBag className="w-14 h-14 sm:w-20 sm:h-20 text-charcoal-light mx-auto mb-4" />
            <h2 className="font-serif text-xl sm:text-2xl mb-2">Your cart is empty</h2>
            <p className="text-charcoal-light mb-6">Add some products to get started</p>
            <Button onClick={() => navigate('/products')}>Continue Shopping</Button>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-6 sm:gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-3 sm:space-y-4">
              {cart.items.map((item) => (
                <div className="bg-white rounded-lg sm:rounded-xl p-4 sm:p-6 shadow-sm">
                  <div className="flex gap-3 sm:gap-6">
                    <div className="w-20 sm:w-24 h-20 sm:h-24 bg-cream-dark rounded-lg overflow-hidden flex-shrink-0">
                      <img
                        src={item.product?.images?.[0]?.url || '/placeholder.png'}
                        alt={item.product?.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="flex-1">
                      <div className="flex justify-between mb-2">
                        <div>
                          <h3 className="font-medium text-charcoal mb-0.5 sm:mb-1 text-sm sm:text-base">{item.product?.name}</h3>
                          <p className="text-xs sm:text-sm text-charcoal-light">{item.product?.category}</p>
                        </div>
                        <button
                          onClick={() => removeItem(item._id)}
                          className="text-charcoal-light hover:text-red-500 transition-colors"
                        >
                          <Trash2 className="w-4 h-5 sm:h-5" />
                        </button>
                      </div>

                      <div className="flex items-center justify-between mt-3 sm:mt-4">
                        <div className="flex items-center border border-charcoal-light rounded-lg">
                          <button
                            onClick={() => updateQuantity(item._id, item.quantity - 1)}
                            className="p-1.5 sm:p-2 hover:bg-cream-dark transition-colors"
                            disabled={item.quantity <= 1}
                          >
                            <Minus className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                          </button>
                          <span className="px-3 sm:px-6 py-1.5 sm:py-2 border-x border-charcoal-light text-sm">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item._id, item.quantity + 1)}
                            className="p-1.5 sm:p-2 hover:bg-cream-dark transition-colors"
                            disabled={item.quantity >= (item.product?.stock || 99)}
                          >
                            <Plus className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                          </button>
                        </div>

                        <div className="text-right">
                          <div className="text-base sm:text-lg font-medium text-forest">₹{((item.price || 0) * (item.quantity || 1)).toFixed(2)}</div>
                          <div className="text-xs sm:text-sm text-charcoal-light">₹{(item.price || 0).toFixed(2)} each</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg sm:rounded-xl p-4 sm:p-6 shadow-sm sticky top-24">
                <h2 className="font-serif text-lg sm:text-xl font-medium mb-4">Order Summary</h2>
                
                <div className="space-y-2 sm:space-y-3 mb-4">
                  <div className="flex justify-between text-charcoal-light text-sm sm:text-base">
                    <span>Subtotal ({cartItemsCount} {cartItemsCount === 1 ? 'item' : 'items'})</span>
                    <span>₹{(cart.totalPrice || 0).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-charcoal-light text-sm sm:text-base">
                    <span>Shipping</span>
                    <span className="text-forest">Free</span>
                  </div>
                  <div className="flex justify-between text-charcoal-light text-sm sm:text-base">
                    <span>Tax (18% GST)</span>
                    <span>₹{((cart.totalPrice || 0) * 0.18).toFixed(2)}</span>
                  </div>
                </div>

                <Separator className="my-3 sm:my-4" />

                <div className="flex justify-between text-base sm:text-lg font-medium mb-4 sm:mb-6">
                  <span>Total</span>
                  <span className="text-forest">₹{((cart.totalPrice || 0) * 1.18).toFixed(2)}</span>
                </div>

                <Button className="w-full mb-2 sm:mb-3" onClick={handleCheckout}>
                  Proceed to Checkout
                </Button>
                <Button variant="outline" className="w-full" onClick={() => navigate('/products')}>
                  Continue Shopping
                </Button>
                <Button variant="outline" className="w-full" onClick={() => navigate('/products')}>
                  Continue Shopping
                </Button>

                <div className="mt-6 p-4 bg-cream-dark rounded-lg">
                  <p className="text-xs text-charcoal-light text-center">
                    🌿 Free shipping on all orders
                    <br />
                    🛡️ Secure checkout
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Cart;
