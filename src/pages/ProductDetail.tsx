import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronLeft, Star, Heart, Minus, Plus, ShoppingBag, Check, Truck, Shield, RefreshCcw } from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { ProductCard } from '@/components/products/ProductCard';
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
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const product = products.find((p) => p.slug === slug);

  if (!product) {
    return (
      <Layout>
        <div className="container-custom py-16 text-center">
          <h1 className="font-serif text-2xl font-bold mb-4">Product Not Found</h1>
          <p className="text-muted-foreground mb-6">The product you're looking for doesn't exist.</p>
          <Button asChild>
            <Link to="/shop">Back to Shop</Link>
          </Button>
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
      title: 'Added to cart',
      description: `${quantity}x ${product.name} added to your cart.`,
    });
    openCart();
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
        <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
          <Link to="/" className="hover:text-foreground">Home</Link>
          <span>/</span>
          <Link to="/shop" className="hover:text-foreground">Shop</Link>
          <span>/</span>
          <span className="text-foreground">{product.name}</span>
        </nav>

        {/* Product Main Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Image Gallery */}
          <div className="space-y-4">
            <div className="aspect-square rounded-2xl overflow-hidden bg-secondary">
              <img
                src={product.images[selectedImageIndex]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            {product.images.length > 1 && (
              <div className="flex gap-3">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImageIndex(index)}
                    className={cn(
                      'w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors',
                      selectedImageIndex === index ? 'border-primary' : 'border-transparent'
                    )}
                  >
                    <img src={image} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div>
            {/* Badges */}
            <div className="flex flex-wrap gap-2 mb-4">
              {product.isNew && (
                <span className="px-3 py-1 bg-accent text-accent-foreground text-xs font-semibold rounded-full">
                  New Arrival
                </span>
              )}
              {product.isBestseller && (
                <span className="px-3 py-1 bg-gold text-white text-xs font-semibold rounded-full">
                  Bestseller
                </span>
              )}
              {hasDiscount && (
                <span className="px-3 py-1 bg-rose text-white text-xs font-semibold rounded-full">
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
                      'h-5 w-5',
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
            <p className="text-muted-foreground mb-6">{product.description}</p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-8">
              {product.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-sage-light text-primary text-sm rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Stock Status */}
            <div className="flex items-center gap-2 mb-6">
              {product.stock > 0 ? (
                <>
                  <Check className="h-5 w-5 text-primary" />
                  <span className="text-primary font-medium">In Stock</span>
                  <span className="text-muted-foreground">({product.stock} available)</span>
                </>
              ) : (
                <span className="text-destructive font-medium">Out of Stock</span>
              )}
            </div>

            {/* Quantity & Add to Cart */}
            <div className="flex flex-wrap items-center gap-4 mb-8">
              <div className="flex items-center border border-border rounded-lg">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-3 hover:bg-muted transition-colors"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="px-6 font-medium">{quantity}</span>
                <button
                  onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                  className="p-3 hover:bg-muted transition-colors"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>

              <Button
                variant="hero"
                size="lg"
                className="flex-1"
                onClick={handleAddToCart}
                disabled={product.stock === 0}
              >
                <ShoppingBag className="h-5 w-5" />
                Add to Cart
              </Button>

              <Button variant="outline" size="icon" className="h-12 w-12">
                <Heart className="h-5 w-5" />
              </Button>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-4 p-4 bg-muted rounded-xl">
              <div className="text-center">
                <Truck className="h-5 w-5 mx-auto text-primary mb-1" />
                <p className="text-xs text-muted-foreground">Free Shipping</p>
              </div>
              <div className="text-center">
                <Shield className="h-5 w-5 mx-auto text-primary mb-1" />
                <p className="text-xs text-muted-foreground">Secure Payment</p>
              </div>
              <div className="text-center">
                <RefreshCcw className="h-5 w-5 mx-auto text-primary mb-1" />
                <p className="text-xs text-muted-foreground">30-Day Returns</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs Section */}
        <div className="mb-16">
          <div className="border-b border-border">
            <div className="flex overflow-x-auto gap-8">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={cn(
                    'py-4 text-sm font-medium whitespace-nowrap border-b-2 transition-colors',
                    activeTab === tab.id
                      ? 'border-primary text-primary'
                      : 'border-transparent text-muted-foreground hover:text-foreground'
                  )}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          <div className="py-8">
            {activeTab === 'description' && (
              <div className="prose max-w-none">
                <p className="text-muted-foreground leading-relaxed">{product.description}</p>
                {product.warnings.length > 0 && (
                  <div className="mt-6 p-4 bg-destructive/10 rounded-lg">
                    <h4 className="font-semibold text-destructive mb-2">Warnings</h4>
                    <ul className="list-disc list-inside text-sm text-muted-foreground">
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
                <h3 className="font-semibold mb-4">Key Ingredients</h3>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {product.ingredients.map((ingredient, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-primary flex-shrink-0" />
                      <span className="text-muted-foreground">{ingredient}</span>
                    </li>
                  ))}
                </ul>
                {product.allergens.length > 0 && (
                  <div className="mt-6 p-4 bg-gold/10 rounded-lg">
                    <h4 className="font-semibold mb-2">Allergen Information</h4>
                    <p className="text-sm text-muted-foreground">
                      Contains: {product.allergens.join(', ')}
                    </p>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'benefits' && (
              <div>
                <h3 className="font-semibold mb-4">Product Benefits</h3>
                <ul className="space-y-3">
                  {product.benefits.map((benefit, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check className="h-3 w-3 text-primary" />
                      </div>
                      <span className="text-muted-foreground">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {activeTab === 'dosage' && (
              <div>
                <h3 className="font-semibold mb-4">How to Use</h3>
                <p className="text-muted-foreground">{product.dosage}</p>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-serif text-4xl font-bold">{product.ratingAvg}</span>
                      <div>
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={cn(
                                'h-4 w-4',
                                i < Math.floor(product.ratingAvg)
                                  ? 'fill-gold text-gold'
                                  : 'fill-muted text-muted'
                              )}
                            />
                          ))}
                        </div>
                        <p className="text-sm text-muted-foreground">{product.ratingCount} reviews</p>
                      </div>
                    </div>
                  </div>
                  <Button>Write a Review</Button>
                </div>
                <p className="text-muted-foreground">Reviews will be displayed here once users are authenticated.</p>
              </div>
            )}
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div>
            <h2 className="font-serif text-2xl font-bold mb-8">You May Also Like</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default ProductDetail;
