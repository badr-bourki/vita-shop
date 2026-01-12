import { Link } from 'react-router-dom';
import { Minus, Plus, Trash2, ShoppingBag, ArrowLeft, ArrowRight } from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { useCart } from '@/hooks/useCart';

const Cart = () => {
  const { items, updateQuantity, removeItem, subtotal, clearCart } = useCart();

  const shipping = subtotal >= 50 ? 0 : 5.99;
  const total = subtotal + shipping;

  if (items.length === 0) {
    return (
      <Layout>
        <div className="container-custom py-16">
          <div className="max-w-md mx-auto text-center">
            <ShoppingBag className="h-20 w-20 text-muted-foreground/30 mx-auto mb-6" />
            <h1 className="font-serif text-3xl font-bold mb-4">Your Cart is Empty</h1>
            <p className="text-muted-foreground mb-8">
              Looks like you haven't added any products yet. Start shopping to fill your cart!
            </p>
            <Button variant="hero" size="lg" asChild>
              <Link to="/shop">
                Start Shopping
                <ArrowRight className="h-5 w-5 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container-custom py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-serif text-3xl font-bold text-foreground">Shopping Cart</h1>
            <p className="text-muted-foreground">{items.length} items in your cart</p>
          </div>
          <Button variant="ghost" onClick={clearCart} className="text-destructive hover:text-destructive">
            <Trash2 className="h-4 w-4 mr-2" />
            Clear Cart
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => {
              const price = item.product.discountPrice || item.product.price;
              const originalPrice = item.product.price;
              const hasDiscount = !!item.product.discountPrice;
              const itemTotal = price * item.quantity;

              return (
                <div
                  key={item.product.id}
                  className="flex gap-4 p-4 bg-card rounded-xl shadow-soft"
                >
                  {/* Image */}
                  <Link
                    to={`/product/${item.product.slug}`}
                    className="w-24 h-24 sm:w-32 sm:h-32 rounded-lg overflow-hidden bg-secondary flex-shrink-0"
                  >
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      className="w-full h-full object-cover hover:scale-105 transition-transform"
                    />
                  </Link>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <Link
                      to={`/product/${item.product.slug}`}
                      className="font-medium hover:text-primary transition-colors line-clamp-2"
                    >
                      {item.product.name}
                    </Link>
                    <p className="text-sm text-muted-foreground mt-1">{item.product.brand}</p>

                    {/* Price */}
                    <div className="flex items-center gap-2 mt-2">
                      <span className="font-semibold">${price.toFixed(2)}</span>
                      {hasDiscount && (
                        <span className="text-sm text-muted-foreground line-through">
                          ${originalPrice.toFixed(2)}
                        </span>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center border border-border rounded-lg">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          className="p-2 hover:bg-muted transition-colors"
                        >
                          <Minus className="h-4 w-4" />
                        </button>
                        <span className="px-4 font-medium">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          className="p-2 hover:bg-muted transition-colors"
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>

                      <div className="flex items-center gap-4">
                        <span className="font-serif font-semibold hidden sm:block">
                          ${itemTotal.toFixed(2)}
                        </span>
                        <button
                          onClick={() => removeItem(item.product.id)}
                          className="p-2 text-destructive hover:bg-destructive/10 rounded-lg transition-colors"
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-card rounded-xl shadow-soft p-6 sticky top-24">
              <h2 className="font-serif text-xl font-semibold mb-6">Order Summary</h2>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="font-medium">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shipping</span>
                  <span className="font-medium">
                    {shipping === 0 ? (
                      <span className="text-primary">Free</span>
                    ) : (
                      `$${shipping.toFixed(2)}`
                    )}
                  </span>
                </div>
                {shipping > 0 && (
                  <p className="text-xs text-muted-foreground">
                    Add ${(50 - subtotal).toFixed(2)} more to get free shipping!
                  </p>
                )}
                <div className="border-t border-border pt-4">
                  <div className="flex justify-between">
                    <span className="font-semibold">Total</span>
                    <span className="font-serif text-2xl font-bold">${total.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <Button variant="hero" className="w-full" size="lg" asChild>
                <Link to="/checkout">
                  Proceed to Checkout
                  <ArrowRight className="h-5 w-5 ml-2" />
                </Link>
              </Button>

              <Link
                to="/shop"
                className="flex items-center justify-center gap-2 mt-4 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <ArrowLeft className="h-4 w-4" />
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Cart;
