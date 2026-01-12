import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronRight, Star, Heart, Minus, Plus, ShoppingBag, Check, Truck, Shield, RefreshCcw, Share2 } from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { ProductCard } from '@/components/products/ProductCard';
import { ImageGallery } from '@/components/ui/image-zoom';
import { ProductDetailSkeleton } from '@/components/ui/skeleton-loaders';
import { useCart } from '@/hooks/useCart';
import { useToast } from '@/hooks/use-toast';
import { products } from '@/lib/products-data';
import { cn } from '@/lib/utils';

type Tab = 'description' | 'ingredients' | 'benefits' | 'dosage' | 'reviews';

const ProductDetail = () => {
  const { slug } = useParams();
  const { addItem, openCart } = useCart();
  const { toast } = useToast();
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<Tab>('description');
  const [isWishlisted, setIsWishlisted] = useState(false);

  const product = products.find((p) => p.slug === slug);

  if (!product) {
    return (
      <Layout>
        <div className="container-custom py-16 text-center">
          <div className="max-w-md mx-auto animate-fade-in">
            <div className="w-24 h-24 rounded-full bg-muted flex items-center justify-center mx-auto mb-6">
              <span className="text-4xl">🔍</span>
            </div>
            <h1 className="font-serif text-2xl font-bold mb-4">Product Not Found</h1>
            <p className="text-muted-foreground mb-6">The product you're looking for doesn't exist or has been removed.</p>
            <Button asChild>
              <Link to="/shop">Browse Products</Link>
            </Button>
          </div>
        </div>
      </Layout>
    );
  }

  const price = product.discountPrice || product.price;
  const hasDiscount = !!product.discountPrice;
  const discountPercent = hasDiscount
    ? Math.round((1 - product.discountPrice! / product.price) * 100)
    : 0;

  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const handleAddToCart = () => {
    addItem(product, quantity);
    toast({
      title: '✓ Added to cart',
      description: `${quantity}x ${product.name}`,
    });
    openCart();
  };

  const handleWishlist = () => {
    setIsWishlisted(!isWishlisted);
    toast({
      title: isWishlisted ? 'Removed from wishlist' : '♥ Added to wishlist',
      description: product.name,
    });
  };

  const handleShare = async () => {
    if (navigator.share) {
      await navigator.share({
        title: product.name,
        text: product.description,
        url: window.location.href,
      });
    } else {
      await navigator.clipboard.writeText(window.location.href);
      toast({
        title: 'Link copied!',
        description: 'Product link copied to clipboard.',
      });
    }
  };

  const tabs: { id: Tab; label: string }[] = [
    { id: 'description', label: 'Description' },
    { id: 'ingredients', label: 'Ingredients' },
    { id: 'benefits', label: 'Benefits' },
    { id: 'dosage', label: 'How to Use' },
    { id: 'reviews', label: `Reviews (${product.ratingCount})` },
  ];

  return (
    <Layout>
      <div className="container-custom py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-8 overflow-x-auto">
          <Link to="/" className="hover:text-foreground whitespace-nowrap">Home</Link>
          <ChevronRight className="h-4 w-4 flex-shrink-0" />
          <Link to="/shop" className="hover:text-foreground whitespace-nowrap">Shop</Link>
          <ChevronRight className="h-4 w-4 flex-shrink-0" />
          <span className="text-foreground whitespace-nowrap truncate">{product.name}</span>
        </nav>

        {/* Product Main Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-16">
          {/* Image Gallery with Zoom */}
          <div className="animate-fade-in">
            <ImageGallery images={product.images} alt={product.name} />
          </div>

          {/* Product Info */}
          <div className="animate-slide-up">
            {/* Badges */}
            <div className="flex flex-wrap gap-2 mb-4">
              {product.isNew && (
                <span className="px-3 py-1 bg-accent text-accent-foreground text-xs font-semibold rounded-full animate-scale-in">
                  New Arrival
                </span>
              )}
              {product.isBestseller && (
                <span className="px-3 py-1 bg-gold text-white text-xs font-semibold rounded-full animate-scale-in">
                  Bestseller
                </span>
              )}
              {hasDiscount && (
                <span className="px-3 py-1 bg-rose text-white text-xs font-semibold rounded-full animate-scale-in">
                  Save {discountPercent}%
                </span>
              )}
            </div>

            {/* Brand */}
            <p className="text-sm text-muted-foreground uppercase tracking-wider mb-2">
              {product.brand}
            </p>

            {/* Name */}
            <h1 className="font-serif text-3xl lg:text-4xl font-bold text-foreground mb-4">
              {product.name}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-3 mb-6">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={cn(
                      'h-5 w-5 transition-colors',
                      i < Math.floor(product.ratingAvg)
                        ? 'fill-gold text-gold'
                        : 'fill-muted text-muted'
                    )}
                  />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">
                {product.ratingAvg} ({product.ratingCount} reviews)
              </span>
            </div>

            {/* Price */}
            <div className="flex items-center gap-3 mb-6">
              <span className="font-serif text-3xl font-bold text-foreground">
                ${price.toFixed(2)}
              </span>
              {hasDiscount && (
                <span className="text-xl text-muted-foreground line-through">
                  ${product.price.toFixed(2)}
                </span>
              )}
            </div>

            {/* Description */}
            <p className="text-muted-foreground mb-6 leading-relaxed">{product.description}</p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-8">
              {product.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1.5 bg-sage-light text-primary text-sm rounded-full hover:bg-sage/20 transition-colors cursor-default"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Stock Status */}
            <div className="flex items-center gap-2 mb-6">
              {product.stock > 0 ? (
                <>
                  <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center">
                    <Check className="h-3 w-3 text-primary" />
                  </div>
                  <span className="text-primary font-medium">In Stock</span>
                  <span className="text-muted-foreground">({product.stock} available)</span>
                </>
              ) : (
                <span className="text-destructive font-medium">Out of Stock</span>
              )}
            </div>

            {/* Quantity & Add to Cart */}
            <div className="flex flex-wrap items-center gap-3 mb-8">
              <div className="flex items-center border border-border rounded-lg bg-card">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-3 hover:bg-muted transition-colors rounded-l-lg"
                  aria-label="Decrease quantity"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="px-6 font-medium min-w-[3rem] text-center">{quantity}</span>
                <button
                  onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                  className="p-3 hover:bg-muted transition-colors rounded-r-lg"
                  aria-label="Increase quantity"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>

              <Button
                variant="hero"
                size="lg"
                className="flex-1 min-w-[200px]"
                onClick={handleAddToCart}
                disabled={product.stock === 0}
              >
                <ShoppingBag className="h-5 w-5" />
                Add to Cart
              </Button>

              <Button
                variant="outline"
                size="icon"
                className={cn('h-12 w-12', isWishlisted && 'text-rose border-rose')}
                onClick={handleWishlist}
                aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
              >
                <Heart className={cn('h-5 w-5', isWishlisted && 'fill-rose')} />
              </Button>

              <Button
                variant="ghost"
                size="icon"
                className="h-12 w-12"
                onClick={handleShare}
                aria-label="Share product"
              >
                <Share2 className="h-5 w-5" />
              </Button>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-4 p-4 bg-muted/50 rounded-xl">
              <div className="text-center group">
                <div className="w-10 h-10 mx-auto rounded-full bg-background flex items-center justify-center mb-2 group-hover:bg-primary/10 transition-colors">
                  <Truck className="h-5 w-5 text-primary" />
                </div>
                <p className="text-xs text-muted-foreground">Free Shipping</p>
              </div>
              <div className="text-center group">
                <div className="w-10 h-10 mx-auto rounded-full bg-background flex items-center justify-center mb-2 group-hover:bg-primary/10 transition-colors">
                  <Shield className="h-5 w-5 text-primary" />
                </div>
                <p className="text-xs text-muted-foreground">Secure Payment</p>
              </div>
              <div className="text-center group">
                <div className="w-10 h-10 mx-auto rounded-full bg-background flex items-center justify-center mb-2 group-hover:bg-primary/10 transition-colors">
                  <RefreshCcw className="h-5 w-5 text-primary" />
                </div>
                <p className="text-xs text-muted-foreground">30-Day Returns</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs Section */}
        <div className="mb-16">
          <div className="border-b border-border sticky top-16 bg-background z-10">
            <div className="flex overflow-x-auto gap-1 -mb-px">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={cn(
                    'px-6 py-4 text-sm font-medium whitespace-nowrap border-b-2 transition-all',
                    activeTab === tab.id
                      ? 'border-primary text-primary bg-primary/5'
                      : 'border-transparent text-muted-foreground hover:text-foreground hover:bg-muted/50'
                  )}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          <div className="py-8 animate-fade-in" key={activeTab}>
            {activeTab === 'description' && (
              <div className="prose max-w-none">
                <p className="text-muted-foreground leading-relaxed text-lg">{product.description}</p>
                {product.warnings.length > 0 && (
                  <div className="mt-6 p-4 bg-destructive/5 border border-destructive/20 rounded-xl">
                    <h4 className="font-semibold text-destructive mb-3 flex items-center gap-2">
                      <span>⚠️</span> Warnings
                    </h4>
                    <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                      {product.warnings.map((warning, i) => (
                        <li key={i}>{warning}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'ingredients' && (
              <div>
                <h3 className="font-semibold text-lg mb-6">Key Ingredients</h3>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {product.ingredients.map((ingredient, i) => (
                    <li key={i} className="flex items-center gap-3 p-3 bg-card rounded-lg shadow-soft">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Check className="h-4 w-4 text-primary" />
                      </div>
                      <span className="text-foreground">{ingredient}</span>
                    </li>
                  ))}
                </ul>
                {product.allergens.length > 0 && (
                  <div className="mt-6 p-4 bg-gold/10 border border-gold/20 rounded-xl">
                    <h4 className="font-semibold mb-2 flex items-center gap-2">
                      <span>🥜</span> Allergen Information
                    </h4>
                    <p className="text-muted-foreground">
                      Contains: {product.allergens.join(', ')}
                    </p>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'benefits' && (
              <div>
                <h3 className="font-semibold text-lg mb-6">Product Benefits</h3>
                <ul className="space-y-4">
                  {product.benefits.map((benefit, i) => (
                    <li key={i} className="flex items-start gap-4 p-4 bg-sage-light/50 rounded-xl animate-slide-up" style={{ animationDelay: `${i * 100}ms` }}>
                      <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                        <Check className="h-4 w-4 text-primary-foreground" />
                      </div>
                      <span className="text-foreground pt-1">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {activeTab === 'dosage' && (
              <div className="max-w-2xl">
                <h3 className="font-semibold text-lg mb-4">How to Use</h3>
                <div className="p-6 bg-card rounded-xl shadow-soft border border-border">
                  <p className="text-muted-foreground leading-relaxed">{product.dosage}</p>
                </div>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div>
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
                  <div className="flex items-center gap-4">
                    <span className="font-serif text-5xl font-bold">{product.ratingAvg}</span>
                    <div>
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={cn(
                              'h-5 w-5',
                              i < Math.floor(product.ratingAvg)
                                ? 'fill-gold text-gold'
                                : 'fill-muted text-muted'
                            )}
                          />
                        ))}
                      </div>
                      <p className="text-muted-foreground">{product.ratingCount} reviews</p>
                    </div>
                  </div>
                  <Button size="lg">
                    Write a Review
                  </Button>
                </div>
                <div className="p-8 bg-muted/50 rounded-xl text-center">
                  <p className="text-muted-foreground">
                    Sign in to see reviews and add your own.
                  </p>
                  <Button variant="outline" className="mt-4" asChild>
                    <Link to="/auth/login">Sign In</Link>
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div>
            <h2 className="font-serif text-2xl font-bold mb-8">You May Also Like</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((product, i) => (
                <div key={product.id} className="animate-slide-up" style={{ animationDelay: `${i * 100}ms` }}>
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default ProductDetail;
