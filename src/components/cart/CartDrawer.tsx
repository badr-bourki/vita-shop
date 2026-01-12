import { Link } from 'react-router-dom';
import { X, Plus, Minus, ShoppingBag, Trash2, ArrowRight } from 'lucide-react';
import { useCart } from '@/hooks/useCart';
import { Button } from '@/components/ui/button';
import { CartItemSkeleton } from '@/components/ui/skeleton-loaders';
import { cn } from '@/lib/utils';

export const CartDrawer = () => {
  const { items, isOpen, closeCart, updateQuantity, removeItem, subtotal, totalItems } = useCart();

  const shipping = subtotal >= 50 ? 0 : 5.99;

  return (
    <>
      {/* Backdrop with blur */}
      <div
        className={cn(
          'fixed inset-0 bg-foreground/60 backdrop-blur-sm z-50 transition-all duration-300',
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        )}
        onClick={closeCart}
      />

      {/* Drawer with slide animation */}
      <div
        className={cn(
          'fixed right-0 top-0 h-full w-full max-w-md bg-background z-50 shadow-2xl flex flex-col',
          'transition-transform duration-300 ease-out',
          isOpen ? 'translate-x-0' : 'translate-x-full'
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border bg-sage-light/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
              <ShoppingBag className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h2 className="font-serif text-lg font-semibold">Your Cart</h2>
              <p className="text-sm text-muted-foreground">{totalItems} items</p>
            </div>
          </div>
          <button
            onClick={closeCart}
            className="w-10 h-10 rounded-full hover:bg-muted flex items-center justify-center transition-colors"
            aria-label="Close cart"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Free Shipping Progress */}
        {items.length > 0 && subtotal < 50 && (
          <div className="px-4 py-3 bg-accent/10 border-b border-border">
            <div className="flex items-center justify-between text-sm mb-2">
              <span className="text-muted-foreground">Free shipping progress</span>
              <span className="font-medium">${(50 - subtotal).toFixed(2)} away</span>
            </div>
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <div
                className="h-full bg-accent rounded-full transition-all duration-500"
                style={{ width: `${Math.min((subtotal / 50) * 100, 100)}%` }}
              />
            </div>
          </div>
        )}

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center animate-fade-in">
              <div className="w-24 h-24 rounded-full bg-muted flex items-center justify-center mb-6">
                <ShoppingBag className="h-12 w-12 text-muted-foreground/40" />
              </div>
              <h3 className="font-serif text-xl font-semibold mb-2">Your cart is empty</h3>
              <p className="text-muted-foreground mb-6 max-w-[250px]">
                Discover our wellness products and start your health journey today.
              </p>
              <Button variant="hero" onClick={closeCart} asChild>
                <Link to="/shop">
                  Explore Products
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Link>
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item, index) => {
                const price = item.product.discountPrice || item.product.price;
                const originalPrice = item.product.price;
                const hasDiscount = !!item.product.discountPrice;

                return (
                  <div
                    key={item.product.id}
                    className="flex gap-4 p-3 bg-card rounded-xl shadow-soft animate-slide-up"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    {/* Product Image */}
                    <Link
                      to={`/product/${item.product.slug}`}
                      onClick={closeCart}
                      className="w-20 h-20 rounded-lg overflow-hidden bg-secondary flex-shrink-0 hover:opacity-90 transition-opacity"
                    >
                      <img
                        src={item.product.images[0]}
                        alt={item.product.name}
                        className="w-full h-full object-cover"
                      />
                    </Link>

                    {/* Product Info */}
                    <div className="flex-1 min-w-0">
                      <Link
                        to={`/product/${item.product.slug}`}
                        onClick={closeCart}
                        className="font-medium text-sm hover:text-primary transition-colors line-clamp-2"
                      >
                        {item.product.name}
                      </Link>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="font-semibold text-sm">${price.toFixed(2)}</span>
                        {hasDiscount && (
                          <span className="text-xs text-muted-foreground line-through">
                            ${originalPrice.toFixed(2)}
                          </span>
                        )}
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex items-center justify-between mt-3">
                        <div className="flex items-center bg-muted rounded-lg">
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                            className="p-2 hover:bg-muted-foreground/10 rounded-l-lg transition-colors"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="h-3 w-3" />
                          </button>
                          <span className="px-3 text-sm font-medium min-w-[2rem] text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                            className="p-2 hover:bg-muted-foreground/10 rounded-r-lg transition-colors"
                            aria-label="Increase quantity"
                          >
                            <Plus className="h-3 w-3" />
                          </button>
                        </div>
                        <button
                          onClick={() => removeItem(item.product.id)}
                          className="p-2 text-destructive hover:bg-destructive/10 rounded-lg transition-colors"
                          aria-label="Remove item"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-border p-4 space-y-4 bg-card">
            {/* Totals */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="font-medium">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Shipping</span>
                <span className={cn('font-medium', shipping === 0 && 'text-primary')}>
                  {shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}
                </span>
              </div>
              <div className="flex items-center justify-between pt-2 border-t border-border">
                <span className="font-semibold">Total</span>
                <span className="font-serif text-xl font-bold">${(subtotal + shipping).toFixed(2)}</span>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-2">
              <Button variant="hero" className="w-full" size="lg" onClick={closeCart} asChild>
                <Link to="/checkout">
                  Checkout
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Link>
              </Button>
              <Button variant="ghost" className="w-full" onClick={closeCart} asChild>
                <Link to="/cart">View Full Cart</Link>
              </Button>
            </div>

            {/* Security Badge */}
            <p className="text-xs text-muted-foreground text-center flex items-center justify-center gap-1">
              <span>🔒</span> Secure checkout with SSL encryption
            </p>
          </div>
        )}
      </div>
    </>
  );
};
