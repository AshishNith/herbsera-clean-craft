import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import { createOrder } from '@/services/orderService';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { toast } from '@/hooks/use-toast';
import { Loader2, CreditCard, Wallet } from 'lucide-react';

const Checkout = () => {
  const { cart, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [shippingAddress, setShippingAddress] = useState({
    name: '',
    phone: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    pincode: '',
    country: 'India',
  });

  const [paymentMethod, setPaymentMethod] = useState('cod');

  if (!user) {
    navigate('/login');
    return null;
  }

  if (!cart || cart.items.length === 0) {
    navigate('/cart');
    return null;
  }

  const subtotal = cart.totalPrice;
  const tax = subtotal * 0.18;
  const total = subtotal + tax;

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const orderData = {
        items: cart.items.map(item => ({
          product: item.product._id,
          quantity: item.quantity,
          price: item.price,
        })),
        shippingAddress,
        paymentMethod,
      };

      const response = await createOrder(orderData);
      
      clearCart();
      
      toast({
        title: 'Order Placed Successfully!',
        description: `Order #${response.data.orderNumber} has been placed.`,
      });

      navigate(`/orders/${response.data._id}`);
    } catch (error: any) {
      toast({
        title: 'Order Failed',
        description: error.response?.data?.message || 'Failed to place order',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-cream flex flex-col">
      <Header />
      
      <div className="flex-1 container mx-auto px-4 py-12">
        <h1 className="font-serif text-4xl font-medium text-charcoal mb-8">Checkout</h1>

        <form onSubmit={handlePlaceOrder}>
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Checkout Form */}
            <div className="lg:col-span-2 space-y-6">
              {/* Shipping Address */}
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <h2 className="font-serif text-xl font-medium mb-4">Shipping Address</h2>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      value={shippingAddress.name}
                      onChange={(e) => setShippingAddress({ ...shippingAddress, name: e.target.value })}
                      required
                      placeholder="John Doe"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={shippingAddress.phone}
                      onChange={(e) => setShippingAddress({ ...shippingAddress, phone: e.target.value })}
                      required
                      placeholder="+91 9876543210"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <Label htmlFor="addressLine1">Address Line 1</Label>
                    <Input
                      id="addressLine1"
                      value={shippingAddress.addressLine1}
                      onChange={(e) => setShippingAddress({ ...shippingAddress, addressLine1: e.target.value })}
                      required
                      placeholder="House No, Building Name"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <Label htmlFor="addressLine2">Address Line 2 (Optional)</Label>
                    <Input
                      id="addressLine2"
                      value={shippingAddress.addressLine2}
                      onChange={(e) => setShippingAddress({ ...shippingAddress, addressLine2: e.target.value })}
                      placeholder="Street, Landmark"
                    />
                  </div>

                  <div>
                    <Label htmlFor="city">City</Label>
                    <Input
                      id="city"
                      value={shippingAddress.city}
                      onChange={(e) => setShippingAddress({ ...shippingAddress, city: e.target.value })}
                      required
                      placeholder="Mumbai"
                    />
                  </div>

                  <div>
                    <Label htmlFor="state">State</Label>
                    <Input
                      id="state"
                      value={shippingAddress.state}
                      onChange={(e) => setShippingAddress({ ...shippingAddress, state: e.target.value })}
                      required
                      placeholder="Maharashtra"
                    />
                  </div>

                  <div>
                    <Label htmlFor="pincode">Pincode</Label>
                    <Input
                      id="pincode"
                      value={shippingAddress.pincode}
                      onChange={(e) => setShippingAddress({ ...shippingAddress, pincode: e.target.value })}
                      required
                      placeholder="400001"
                    />
                  </div>
                </div>
              </div>

              {/* Payment Method */}
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <h2 className="font-serif text-xl font-medium mb-4">Payment Method</h2>
                
                <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                  <div className="flex items-center space-x-3 p-4 border rounded-lg mb-3">
                    <RadioGroupItem value="cod" id="cod" />
                    <Label htmlFor="cod" className="flex items-center cursor-pointer flex-1">
                      <Wallet className="w-5 h-5 mr-2 text-forest" />
                      <div>
                        <div className="font-medium">Cash on Delivery</div>
                        <div className="text-sm text-charcoal-light">Pay when you receive</div>
                      </div>
                    </Label>
                  </div>

                  <div className="flex items-center space-x-3 p-4 border rounded-lg mb-3">
                    <RadioGroupItem value="razorpay" id="razorpay" />
                    <Label htmlFor="razorpay" className="flex items-center cursor-pointer flex-1">
                      <CreditCard className="w-5 h-5 mr-2 text-forest" />
                      <div>
                        <div className="font-medium">Online Payment</div>
                        <div className="text-sm text-charcoal-light">UPI, Cards, Net Banking</div>
                      </div>
                    </Label>
                  </div>
                </RadioGroup>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg p-6 shadow-sm sticky top-4">
                <h2 className="font-serif text-xl font-medium mb-4">Order Summary</h2>
                
                <div className="space-y-3 mb-4">
                  {cart.items.map((item) => (
                    <div key={item._id} className="flex justify-between text-sm">
                      <span className="text-charcoal-light">
                        {item.product.name} × {item.quantity}
                      </span>
                      <span>₹{item.price * item.quantity}</span>
                    </div>
                  ))}
                </div>

                <Separator className="my-4" />

                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-charcoal-light">
                    <span>Subtotal</span>
                    <span>₹{subtotal}</span>
                  </div>
                  <div className="flex justify-between text-charcoal-light">
                    <span>Shipping</span>
                    <span className="text-forest">Free</span>
                  </div>
                  <div className="flex justify-between text-charcoal-light">
                    <span>Tax (18% GST)</span>
                    <span>₹{tax.toFixed(2)}</span>
                  </div>
                </div>

                <Separator className="my-4" />

                <div className="flex justify-between text-lg font-medium mb-6">
                  <span>Total</span>
                  <span className="text-forest">₹{total.toFixed(2)}</span>
                </div>

                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Placing Order...
                    </>
                  ) : (
                    'Place Order'
                  )}
                </Button>

                <div className="mt-6 p-4 bg-cream-dark rounded-lg">
                  <p className="text-xs text-charcoal-light text-center">
                    🛡️ Secure checkout
                    <br />
                    🔒 Your payment info is safe
                  </p>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>

      <Footer />
    </div>
  );
};

export default Checkout;
