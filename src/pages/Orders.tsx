import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { getMyOrders, cancelOrder, Order } from '@/services/orderService';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { toast } from '@/hooks/use-toast';
import { Loader2, Package, MapPin, CreditCard, X, Eye } from 'lucide-react';

const Orders = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState<Order[]>([]);
  const [pagination, setPagination] = useState({ total: 0, page: 1, pages: 1 });

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    fetchOrders();
  }, [user, navigate]);

  const fetchOrders = async (page: number = 1) => {
    try {
      setLoading(true);
      const response = await getMyOrders(page, 10);
      setOrders(response.data);
      setPagination(response.pagination);
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.response?.data?.message || 'Failed to load orders',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCancelOrder = async (orderId: string) => {
    if (!confirm('Are you sure you want to cancel this order?')) return;

    try {
      setLoading(true);
      await cancelOrder(orderId);
      toast({
        title: 'Order Cancelled',
        description: 'Your order has been cancelled successfully',
      });
      fetchOrders(pagination.page);
    } catch (error: any) {
      toast({
        title: 'Cancellation Failed',
        description: error.response?.data?.message || 'Failed to cancel order',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'processing':
        return 'bg-blue-100 text-blue-800';
      case 'shipped':
        return 'bg-purple-100 text-purple-800';
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      case 'refunded':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  if (!user) return null;

  if (loading && orders.length === 0) {
    return (
      <div className="min-h-screen bg-cream flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-forest" />
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream flex flex-col">
      <Header />
      
      <div className="flex-1 container mx-auto px-4 py-12">
        <h1 className="font-serif text-center mt-10 text-4xl font-medium text-charcoal mb-8">My Orders</h1>

        {orders.length === 0 ? (
          <Card>
            <CardContent className="py-16">
              <div className="text-center">
                <Package className="w-16 h-16 text-charcoal-light mx-auto mb-4" />
                <h2 className="font-serif text-2xl mb-2">No Orders Yet</h2>
                <p className="text-charcoal-light mb-6">Start shopping to see your orders here</p>
                <Button onClick={() => navigate('/products')}>Browse Products</Button>
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <Card key={order._id}>
                <CardHeader>
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                      <CardTitle className="flex items-center gap-3">
                        <span>Order #{order.orderNumber}</span>
                        <Badge className={getStatusColor(order.status)}>
                          {order.status.toUpperCase()}
                        </Badge>
                      </CardTitle>
                      <CardDescription className="mt-2">
                        Placed on {formatDate(order.createdAt)}
                      </CardDescription>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-medium text-forest">
                        ₹{order.pricing.total.toFixed(2)}
                      </div>
                      <div className="text-sm text-charcoal-light">
                        {order.items.length} item{order.items.length > 1 ? 's' : ''}
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Order Items */}
                  <div className="space-y-3">
                    {order.items.map((item, index) => {
                      const product = typeof item.product === 'object' ? item.product : null;
                      return (
                        <div key={index} className="flex gap-4 p-3 bg-cream-dark rounded-lg">
                          <div className="w-16 h-16 bg-cream rounded overflow-hidden flex-shrink-0">
                            {product && product.images && product.images[0] ? (
                              <img
                                src={product.images[0].url}
                                alt={item.name}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center">
                                <Package className="w-6 h-6 text-charcoal-light" />
                              </div>
                            )}
                          </div>
                          <div className="flex-1">
                            <h4 className="font-medium">{item.name}</h4>
                            <p className="text-sm text-charcoal-light">
                              Quantity: {item.quantity} × ₹{item.price}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="font-medium">₹{(item.quantity * item.price).toFixed(2)}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <Separator />

                  {/* Shipping Address */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <div className="flex items-start gap-2 mb-2">
                        <MapPin className="w-4 h-4 text-forest mt-1" />
                        <div>
                          <h4 className="font-medium mb-1">Shipping Address</h4>
                          <p className="text-sm text-charcoal-light">
                            {order.shippingAddress.name}
                            <br />
                            {order.shippingAddress.addressLine1}
                            {order.shippingAddress.addressLine2 && (
                              <>
                                <br />
                                {order.shippingAddress.addressLine2}
                              </>
                            )}
                            <br />
                            {order.shippingAddress.city}, {order.shippingAddress.state} - {order.shippingAddress.pincode}
                            <br />
                            Phone: {order.shippingAddress.phone}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div>
                      <div className="flex items-start gap-2 mb-2">
                        <CreditCard className="w-4 h-4 text-forest mt-1" />
                        <div>
                          <h4 className="font-medium mb-1">Payment Details</h4>
                          <p className="text-sm text-charcoal-light">
                            Method: {order.paymentMethod.toUpperCase()}
                            {order.paymentInfo?.status && (
                              <>
                                <br />
                                Status: {order.paymentInfo.status}
                              </>
                            )}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  {/* Price Breakdown */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-charcoal-light">Subtotal</span>
                      <span>₹{order.pricing.subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-charcoal-light">Shipping</span>
                      <span>₹{order.pricing.shippingCost.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-charcoal-light">Tax (GST)</span>
                      <span>₹{order.pricing.tax.toFixed(2)}</span>
                    </div>
                    {order.pricing.discount > 0 && (
                      <div className="flex justify-between text-sm text-green-600">
                        <span>Discount</span>
                        <span>-₹{order.pricing.discount.toFixed(2)}</span>
                      </div>
                    )}
                    <Separator />
                    <div className="flex justify-between font-medium text-lg">
                      <span>Total</span>
                      <span className="text-forest">₹{order.pricing.total.toFixed(2)}</span>
                    </div>
                  </div>

                  {/* Tracking Info */}
                  {order.trackingNumber && (
                    <>
                      <Separator />
                      <div className="flex items-center gap-2 p-3 bg-blue-50 rounded-lg">
                        <Package className="w-4 h-4 text-blue-600" />
                        <div className="flex-1">
                          <p className="text-sm font-medium">Tracking Number</p>
                          <p className="text-sm text-blue-600">{order.trackingNumber}</p>
                        </div>
                      </div>
                    </>
                  )}

                  {/* Actions */}
                  <div className="flex flex-wrap gap-3">
                    <Button variant="outline" onClick={() => navigate(`/orders/${order._id}`)}>
                      <Eye className="w-4 h-4 mr-2" />
                      View Details
                    </Button>
                    {(order.status === 'pending' || order.status === 'processing') && (
                      <Button
                        variant="outline"
                        onClick={() => handleCancelOrder(order._id)}
                        disabled={loading}
                      >
                        {loading ? (
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        ) : (
                          <X className="w-4 h-4 mr-2" />
                        )}
                        Cancel Order
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}

            {/* Pagination */}
            {pagination.pages > 1 && (
              <div className="flex justify-center gap-2 mt-8">
                <Button
                  variant="outline"
                  onClick={() => fetchOrders(pagination.page - 1)}
                  disabled={pagination.page === 1 || loading}
                >
                  Previous
                </Button>
                <span className="flex items-center px-4">
                  Page {pagination.page} of {pagination.pages}
                </span>
                <Button
                  variant="outline"
                  onClick={() => fetchOrders(pagination.page + 1)}
                  disabled={pagination.page === pagination.pages || loading}
                >
                  Next
                </Button>
              </div>
            )}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Orders;
