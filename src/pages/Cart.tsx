import { useNavigate } from 'react-router-dom';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Trash2, Plus, Minus, ShoppingBag } from 'lucide-react';

const Cart = () => {
  const { cart, loading, updateQuantity, removeItem } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  if (!user) {
    return (
      <div className="mt-20  bg-cream flex flex-col">
        <Header />
        <div className="flex-1 flex mb-20 items-center justify-center px-4">
          <div className="text-center">
            <ShoppingBag className="w-16 h-16 text-charcoal-light mx-auto mb-4" />
            <h2 className="font-serif text-2xl mb-2">Please Login</h2>
            <p className="text-charcoal-light mb-6">You need to be logged in to view your cart</p>
            <Button onClick={() => navigate('/login')}>Login</Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (loading && !cart) {
    return (
      <div className="min-h-screen bg-cream flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <div className="animate-pulse text-charcoal-light">Loading cart...</div>
        </div>
        <Footer />
      </div>
    );
  }

  const isEmpty = !cart || cart.items.length === 0;

  return (
    <div className="min-h-screen bg-cream flex flex-col">
      <Header />
      
      <div className="flex-1 container mx-auto px-4 py-12">
        <h1 className="font-serif text-4xl font-medium text-charcoal mb-8">Shopping Cart</h1>

        {isEmpty ? (
          <div className="text-center py-16">
            <ShoppingBag className="w-20 h-20 text-charcoal-light mx-auto mb-4" />
            <h2 className="font-serif text-2xl mb-2">Your cart is empty</h2>
            <p className="text-charcoal-light mb-6">Add some products to get started</p>
            <Button onClick={() => navigate('/products')}>Continue Shopping</Button>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {cart.items.map((item) => (
                <div key={item._id} className="bg-white rounded-lg p-6 shadow-sm">
                  <div className="flex gap-6">
                    <div className="w-24 h-24 bg-cream-dark rounded-lg overflow-hidden flex-shrink-0">
                      <img
                        src={item.product.images[0]?.url}
                        alt={item.product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="flex-1">
                      <div className="flex justify-between mb-2">
                        <div>
                          <h3 className="font-medium text-charcoal mb-1">{item.product.name}</h3>
                          <p className="text-sm text-charcoal-light">{item.product.category}</p>
                        </div>
                        <button
                          onClick={() => removeItem(item._id)}
                          className="text-charcoal-light hover:text-red-500 transition-colors"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>

                      <div className="flex items-center justify-between mt-4">
                        <div className="flex items-center border border-charcoal-light rounded-lg">
                          <button
                            onClick={() => updateQuantity(item._id, item.quantity - 1)}
                            className="p-2 hover:bg-cream-dark transition-colors"
                            disabled={item.quantity <= 1}
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="px-6 py-2 border-x border-charcoal-light">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item._id, item.quantity + 1)}
                            className="p-2 hover:bg-cream-dark transition-colors"
                            disabled={item.quantity >= item.product.stock}
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>

                        <div className="text-right">
                          <div className="text-lg font-medium text-forest">₹{item.price * item.quantity}</div>
                          <div className="text-sm text-charcoal-light">₹{item.price} each</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg p-6 shadow-sm sticky top-4">
                <h2 className="font-serif text-xl font-medium mb-4">Order Summary</h2>
                
                <div className="space-y-3 mb-4">
                  <div className="flex justify-between text-charcoal-light">
                    <span>Subtotal ({cart.items.length} items)</span>
                    <span>₹{cart.totalPrice}</span>
                  </div>
                  <div className="flex justify-between text-charcoal-light">
                    <span>Shipping</span>
                    <span className="text-forest">Free</span>
                  </div>
                  <div className="flex justify-between text-charcoal-light">
                    <span>Tax (18% GST)</span>
                    <span>₹{(cart.totalPrice * 0.18).toFixed(2)}</span>
                  </div>
                </div>

                <Separator className="my-4" />

                <div className="flex justify-between text-lg font-medium mb-6">
                  <span>Total</span>
                  <span className="text-forest">₹{(cart.totalPrice * 1.18).toFixed(2)}</span>
                </div>

                <Button className="w-full mb-3" onClick={() => navigate('/checkout')}>
                  Proceed to Checkout
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
