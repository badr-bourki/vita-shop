import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Check, Truck, Shield, CreditCard } from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { useCart } from '@/hooks/useCart';
import { useToast } from '@/hooks/use-toast';

const Checkout = () => {
  const { items, subtotal, clearCart } = useCart();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);

  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'United States',
    phone: '',
  });

  const shipping = subtotal >= 50 ? 0 : 5.99;
  const total = subtotal + shipping;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    // Simulate order processing
    await new Promise((resolve) => setTimeout(resolve, 2000));

    clearCart();
    toast({
      title: 'Order Placed Successfully! 🎉',
      description: 'Thank you for your order. You will receive a confirmation email shortly.',
    });
    navigate('/');
    setIsProcessing(false);
  };

  if (items.length === 0) {
    return (
      <Layout>
        <div className="container-custom py-16 text-center">
          <h1 className="font-serif text-3xl font-bold mb-4">Your Cart is Empty</h1>
          <p className="text-muted-foreground mb-8">Add some products before checking out.</p>
          <Button asChild>
            <Link to="/shop">Continue Shopping</Link>
          </Button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container-custom py-8">
        {/* Back Link */}
        <Link
          to="/cart"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Cart
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Checkout Form */}
          <div>
            <h1 className="font-serif text-3xl font-bold mb-8">Checkout</h1>

            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Contact Information */}
              <div>
                <h2 className="font-semibold text-lg mb-4">Contact Information</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1.5">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full h-11 px-4 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="you@example.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1.5">Phone</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className="w-full h-11 px-4 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="+1 (555) 000-0000"
                    />
                  </div>
                </div>
              </div>

              {/* Shipping Address */}
              <div>
                <h2 className="font-semibold text-lg mb-4">Shipping Address</h2>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1.5">First Name</label>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        required
                        className="w-full h-11 px-4 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1.5">Last Name</label>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        required
                        className="w-full h-11 px-4 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1.5">Address</label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      required
                      className="w-full h-11 px-4 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="123 Main St, Apt 4"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1.5">City</label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        required
                        className="w-full h-11 px-4 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1.5">State</label>
                      <input
                        type="text"
                        name="state"
                        value={formData.state}
                        onChange={handleChange}
                        required
                        className="w-full h-11 px-4 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1.5">ZIP Code</label>
                      <input
                        type="text"
                        name="zipCode"
                        value={formData.zipCode}
                        onChange={handleChange}
                        required
                        className="w-full h-11 px-4 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1.5">Country</label>
                      <select
                        name="country"
                        value={formData.country}
                        onChange={handleChange}
                        className="w-full h-11 px-4 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                      >
                        <option>United States</option>
                        <option>Canada</option>
                        <option>United Kingdom</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              {/* Payment Note */}
              <div className="p-4 bg-sage-light rounded-xl">
                <div className="flex items-center gap-3">
                  <CreditCard className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium">Demo Checkout</p>
                    <p className="text-sm text-muted-foreground">
                      This is a demo. No real payment will be processed.
                    </p>
                  </div>
                </div>
              </div>

              {/* Submit */}
              <Button
                type="submit"
                variant="hero"
                size="lg"
                className="w-full"
                disabled={isProcessing}
              >
                {isProcessing ? (
                  <>
                    <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    Place Order • ${total.toFixed(2)}
                  </>
                )}
              </Button>
            </form>
          </div>

          {/* Order Summary */}
          <div>
            <div className="bg-muted rounded-xl p-6 sticky top-24">
              <h2 className="font-serif text-xl font-semibold mb-6">Order Summary</h2>

              {/* Items */}
              <div className="space-y-4 mb-6">
                {items.map((item) => {
                  const price = item.product.discountPrice || item.product.price;
                  return (
                    <div key={item.product.id} className="flex gap-4">
                      <div className="w-16 h-16 rounded-lg overflow-hidden bg-white flex-shrink-0">
                        <img
                          src={item.product.images[0]}
                          alt={item.product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm line-clamp-2">{item.product.name}</p>
                        <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                      </div>
                      <p className="font-medium">${(price * item.quantity).toFixed(2)}</p>
                    </div>
                  );
                })}
              </div>

              <div className="border-t border-border pt-4 space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Shipping</span>
                  <span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
                </div>
                <div className="flex justify-between font-semibold text-lg pt-3 border-t border-border">
                  <span>Total</span>
                  <span className="font-serif">${total.toFixed(2)}</span>
                </div>
              </div>

              {/* Trust Badges */}
              <div className="mt-6 pt-6 border-t border-border space-y-3">
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <Truck className="h-4 w-4 text-primary" />
                  <span>Free shipping on orders over $50</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <Shield className="h-4 w-4 text-primary" />
                  <span>Secure SSL encrypted checkout</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <Check className="h-4 w-4 text-primary" />
                  <span>30-day money-back guarantee</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Checkout;
