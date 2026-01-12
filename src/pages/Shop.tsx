import { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, SlidersHorizontal, X, ChevronDown } from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { ProductCard } from '@/components/products/ProductCard';
import { Button } from '@/components/ui/button';
import { products, categories, brands, forms, tags } from '@/lib/products-data';
import { cn } from '@/lib/utils';

const sortOptions = [
  { value: 'featured', label: 'Featured' },
  { value: 'newest', label: 'Newest' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'rating', label: 'Best Rated' },
];

const Shop = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState('featured');

  const selectedCategory = searchParams.get('category') || '';
  const selectedBrand = searchParams.get('brand') || '';
  const selectedForm = searchParams.get('form') || '';
  const selectedTags = searchParams.getAll('tag');

  const updateFilter = (key: string, value: string) => {
    const newParams = new URLSearchParams(searchParams);
    if (value) {
      newParams.set(key, value);
    } else {
      newParams.delete(key);
    }
    setSearchParams(newParams);
  };

  const toggleTag = (tag: string) => {
    const newParams = new URLSearchParams(searchParams);
    const currentTags = newParams.getAll('tag');
    newParams.delete('tag');
    
    if (currentTags.includes(tag)) {
      currentTags.filter(t => t !== tag).forEach(t => newParams.append('tag', t));
    } else {
      [...currentTags, tag].forEach(t => newParams.append('tag', t));
    }
    setSearchParams(newParams);
  };

  const clearFilters = () => {
    setSearchParams({});
    setSearchQuery('');
  };

  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Search
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        p => p.name.toLowerCase().includes(query) || 
             p.description.toLowerCase().includes(query) ||
             p.brand.toLowerCase().includes(query)
      );
    }

    // Category
    if (selectedCategory) {
      result = result.filter(p => p.category === selectedCategory);
    }

    // Brand
    if (selectedBrand) {
      result = result.filter(p => p.brand === selectedBrand);
    }

    // Form
    if (selectedForm) {
      result = result.filter(p => p.form === selectedForm);
    }

    // Tags
    if (selectedTags.length > 0) {
      result = result.filter(p => selectedTags.some(tag => p.tags.includes(tag)));
    }

    // Sort
    switch (sortBy) {
      case 'newest':
        result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
      case 'price-asc':
        result.sort((a, b) => (a.discountPrice || a.price) - (b.discountPrice || b.price));
        break;
      case 'price-desc':
        result.sort((a, b) => (b.discountPrice || b.price) - (a.discountPrice || a.price));
        break;
      case 'rating':
        result.sort((a, b) => b.ratingAvg - a.ratingAvg);
        break;
      default:
        result.sort((a, b) => (b.isBestseller ? 1 : 0) - (a.isBestseller ? 1 : 0));
    }

    return result;
  }, [searchQuery, selectedCategory, selectedBrand, selectedForm, selectedTags, sortBy]);

  const hasActiveFilters = selectedCategory || selectedBrand || selectedForm || selectedTags.length > 0 || searchQuery;

  return (
    <Layout>
      {/* Page Header */}
      <div className="bg-sage-light py-12">
        <div className="container-custom">
          <h1 className="font-serif text-4xl font-bold text-foreground mb-2">Shop All Products</h1>
          <p className="text-muted-foreground">Discover our complete range of health and wellness products</p>
        </div>
      </div>

      <div className="container-custom py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar - Desktop */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <div className="sticky top-24 space-y-6">
              {/* Search */}
              <div>
                <h3 className="font-semibold mb-3">Search</h3>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full h-10 pl-10 pr-4 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>

              {/* Categories */}
              <div>
                <h3 className="font-semibold mb-3">Category</h3>
                <div className="space-y-2">
                  <button
                    onClick={() => updateFilter('category', '')}
                    className={cn(
                      'block w-full text-left px-3 py-2 rounded-lg text-sm transition-colors',
                      !selectedCategory ? 'bg-primary text-primary-foreground' : 'hover:bg-muted'
                    )}
                  >
                    All Categories
                  </button>
                  {categories.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => updateFilter('category', cat.id)}
                      className={cn(
                        'block w-full text-left px-3 py-2 rounded-lg text-sm transition-colors',
                        selectedCategory === cat.id ? 'bg-primary text-primary-foreground' : 'hover:bg-muted'
                      )}
                    >
                      {cat.icon} {cat.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Brands */}
              <div>
                <h3 className="font-semibold mb-3">Brand</h3>
                <div className="space-y-2">
                  <button
                    onClick={() => updateFilter('brand', '')}
                    className={cn(
                      'block w-full text-left px-3 py-2 rounded-lg text-sm transition-colors',
                      !selectedBrand ? 'bg-primary text-primary-foreground' : 'hover:bg-muted'
                    )}
                  >
                    All Brands
                  </button>
                  {brands.map((brand) => (
                    <button
                      key={brand}
                      onClick={() => updateFilter('brand', brand)}
                      className={cn(
                        'block w-full text-left px-3 py-2 rounded-lg text-sm transition-colors',
                        selectedBrand === brand ? 'bg-primary text-primary-foreground' : 'hover:bg-muted'
                      )}
                    >
                      {brand}
                    </button>
                  ))}
                </div>
              </div>

              {/* Product Form */}
              <div>
                <h3 className="font-semibold mb-3">Product Form</h3>
                <div className="space-y-2">
                  <button
                    onClick={() => updateFilter('form', '')}
                    className={cn(
                      'block w-full text-left px-3 py-2 rounded-lg text-sm transition-colors capitalize',
                      !selectedForm ? 'bg-primary text-primary-foreground' : 'hover:bg-muted'
                    )}
                  >
                    All Forms
                  </button>
                  {forms.map((form) => (
                    <button
                      key={form}
                      onClick={() => updateFilter('form', form)}
                      className={cn(
                        'block w-full text-left px-3 py-2 rounded-lg text-sm transition-colors capitalize',
                        selectedForm === form ? 'bg-primary text-primary-foreground' : 'hover:bg-muted'
                      )}
                    >
                      {form}
                    </button>
                  ))}
                </div>
              </div>

              {/* Tags */}
              <div>
                <h3 className="font-semibold mb-3">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag) => (
                    <button
                      key={tag}
                      onClick={() => toggleTag(tag)}
                      className={cn(
                        'px-3 py-1.5 rounded-full text-xs font-medium transition-colors',
                        selectedTags.includes(tag)
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted hover:bg-muted/80'
                      )}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>

              {/* Clear Filters */}
              {hasActiveFilters && (
                <Button variant="outline" className="w-full" onClick={clearFilters}>
                  <X className="h-4 w-4" />
                  Clear All Filters
                </Button>
              )}
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-1">
            {/* Toolbar */}
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
              <p className="text-muted-foreground">
                Showing <span className="font-medium text-foreground">{filteredProducts.length}</span> products
              </p>

              <div className="flex items-center gap-3">
                {/* Mobile Filter Button */}
                <Button
                  variant="outline"
                  className="lg:hidden"
                  onClick={() => setShowFilters(true)}
                >
                  <SlidersHorizontal className="h-4 w-4" />
                  Filters
                </Button>

                {/* Sort Dropdown */}
                <div className="relative">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="appearance-none h-10 pl-4 pr-10 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary cursor-pointer"
                  >
                    {sortOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Products Grid */}
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <p className="text-lg text-muted-foreground mb-4">No products found matching your criteria.</p>
                <Button onClick={clearFilters}>Clear Filters</Button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Filters Drawer */}
      {showFilters && (
        <>
          <div
            className="fixed inset-0 bg-foreground/50 z-50 lg:hidden"
            onClick={() => setShowFilters(false)}
          />
          <div className="fixed inset-y-0 left-0 w-80 max-w-full bg-background z-50 lg:hidden overflow-y-auto">
            <div className="p-4 border-b border-border flex items-center justify-between">
              <h2 className="font-semibold">Filters</h2>
              <button onClick={() => setShowFilters(false)}>
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="p-4 space-y-6">
              {/* Mobile filters content - same as desktop */}
              <div>
                <h3 className="font-semibold mb-3">Search</h3>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full h-10 pl-10 pr-4 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-3">Category</h3>
                <div className="space-y-2">
                  {categories.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => {
                        updateFilter('category', selectedCategory === cat.id ? '' : cat.id);
                      }}
                      className={cn(
                        'block w-full text-left px-3 py-2 rounded-lg text-sm transition-colors',
                        selectedCategory === cat.id ? 'bg-primary text-primary-foreground' : 'hover:bg-muted'
                      )}
                    >
                      {cat.icon} {cat.name}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-3">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag) => (
                    <button
                      key={tag}
                      onClick={() => toggleTag(tag)}
                      className={cn(
                        'px-3 py-1.5 rounded-full text-xs font-medium transition-colors',
                        selectedTags.includes(tag)
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted hover:bg-muted/80'
                      )}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>

              {hasActiveFilters && (
                <Button variant="outline" className="w-full" onClick={clearFilters}>
                  <X className="h-4 w-4" />
                  Clear All
                </Button>
              )}

              <Button className="w-full" onClick={() => setShowFilters(false)}>
                Show {filteredProducts.length} Products
              </Button>
            </div>
          </div>
        </>
      )}
    </Layout>
  );
};

export default Shop;
