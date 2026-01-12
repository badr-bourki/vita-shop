import { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, SlidersHorizontal, X, ChevronDown, Grid3X3, LayoutGrid } from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { ProductCard } from '@/components/products/ProductCard';
import { ProductGridSkeleton } from '@/components/ui/skeleton-loaders';
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
  const [isLoading, setIsLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);
  const [gridCols, setGridCols] = useState<2 | 3>(3);

  // Get filter values from URL
  const searchQuery = searchParams.get('search') || '';
  const sortBy = searchParams.get('sort') || 'featured';
  const selectedCategory = searchParams.get('category') || '';
  const selectedBrand = searchParams.get('brand') || '';
  const selectedForm = searchParams.get('form') || '';
  const selectedTags = searchParams.getAll('tag');

  // Simulate loading
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(timer);
  }, [searchParams]);

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
  const activeFilterCount = [selectedCategory, selectedBrand, selectedForm, ...selectedTags].filter(Boolean).length;

  return (
    <Layout>
      {/* Page Header */}
      <div className="bg-gradient-to-b from-sage-light to-background py-12">
        <div className="container-custom">
          <h1 className="font-serif text-4xl font-bold text-foreground mb-2 animate-slide-up">Shop All Products</h1>
          <p className="text-muted-foreground animate-slide-up" style={{ animationDelay: '100ms' }}>
            Discover our complete range of health and wellness products
          </p>
        </div>
      </div>

      <div className="container-custom py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar - Desktop */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <div className="sticky top-24 space-y-6 animate-fade-in">
              {/* Search */}
              <div>
                <h3 className="font-semibold mb-3">Search</h3>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => updateFilter('search', e.target.value)}
                    className="w-full h-10 pl-10 pr-4 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary transition-shadow"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => updateFilter('search', '')}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  )}
                </div>
              </div>

              {/* Categories */}
              <div>
                <h3 className="font-semibold mb-3">Category</h3>
                <div className="space-y-1">
                  <button
                    onClick={() => updateFilter('category', '')}
                    className={cn(
                      'block w-full text-left px-3 py-2 rounded-lg text-sm transition-all',
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
                        'block w-full text-left px-3 py-2 rounded-lg text-sm transition-all',
                        selectedCategory === cat.id ? 'bg-primary text-primary-foreground' : 'hover:bg-muted'
                      )}
                    >
                      <span className="mr-2">{cat.icon}</span>
                      {cat.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Brands */}
              <div>
                <h3 className="font-semibold mb-3">Brand</h3>
                <div className="space-y-1">
                  <button
                    onClick={() => updateFilter('brand', '')}
                    className={cn(
                      'block w-full text-left px-3 py-2 rounded-lg text-sm transition-all',
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
                        'block w-full text-left px-3 py-2 rounded-lg text-sm transition-all',
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
                <div className="space-y-1">
                  <button
                    onClick={() => updateFilter('form', '')}
                    className={cn(
                      'block w-full text-left px-3 py-2 rounded-lg text-sm transition-all capitalize',
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
                        'block w-full text-left px-3 py-2 rounded-lg text-sm transition-all capitalize',
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
                        'px-3 py-1.5 rounded-full text-xs font-medium transition-all',
                        selectedTags.includes(tag)
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted hover:bg-muted-foreground/10'
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
                  <X className="h-4 w-4 mr-2" />
                  Clear All Filters
                </Button>
              )}
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-1">
            {/* Toolbar */}
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-6 border-b border-border">
              <div className="flex items-center gap-3">
                <p className="text-muted-foreground">
                  <span className="font-medium text-foreground">{filteredProducts.length}</span> products
                </p>
                {hasActiveFilters && (
                  <button
                    onClick={clearFilters}
                    className="text-sm text-primary hover:underline"
                  >
                    Clear filters
                  </button>
                )}
              </div>

              <div className="flex items-center gap-3">
                {/* Mobile Filter Button */}
                <Button
                  variant="outline"
                  className="lg:hidden"
                  onClick={() => setShowFilters(true)}
                >
                  <SlidersHorizontal className="h-4 w-4 mr-2" />
                  Filters
                  {activeFilterCount > 0 && (
                    <span className="ml-2 px-2 py-0.5 bg-primary text-primary-foreground text-xs rounded-full">
                      {activeFilterCount}
                    </span>
                  )}
                </Button>

                {/* Grid Toggle */}
                <div className="hidden sm:flex items-center gap-1 border border-border rounded-lg p-1">
                  <button
                    onClick={() => setGridCols(2)}
                    className={cn(
                      'p-1.5 rounded transition-colors',
                      gridCols === 2 ? 'bg-muted' : 'hover:bg-muted/50'
                    )}
                  >
                    <Grid3X3 className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => setGridCols(3)}
                    className={cn(
                      'p-1.5 rounded transition-colors',
                      gridCols === 3 ? 'bg-muted' : 'hover:bg-muted/50'
                    )}
                  >
                    <LayoutGrid className="h-4 w-4" />
                  </button>
                </div>

                {/* Sort Dropdown */}
                <div className="relative">
                  <select
                    value={sortBy}
                    onChange={(e) => updateFilter('sort', e.target.value)}
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
            {isLoading ? (
              <ProductGridSkeleton count={6} />
            ) : filteredProducts.length > 0 ? (
              <div className={cn(
                'grid gap-6',
                gridCols === 2 ? 'grid-cols-1 sm:grid-cols-2' : 'grid-cols-1 sm:grid-cols-2 xl:grid-cols-3'
              )}>
                {filteredProducts.map((product, i) => (
                  <div
                    key={product.id}
                    className="animate-fade-in"
                    style={{ animationDelay: `${i * 50}ms` }}
                  >
                    <ProductCard product={product} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16 animate-fade-in">
                <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mx-auto mb-6">
                  <Search className="h-10 w-10 text-muted-foreground/40" />
                </div>
                <h3 className="font-serif text-xl font-semibold mb-2">No products found</h3>
                <p className="text-muted-foreground mb-6">
                  Try adjusting your filters or search terms.
                </p>
                <Button onClick={clearFilters}>Clear All Filters</Button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Filters Drawer */}
      {showFilters && (
        <>
          <div
            className="fixed inset-0 bg-foreground/60 backdrop-blur-sm z-50 lg:hidden animate-fade-in"
            onClick={() => setShowFilters(false)}
          />
          <div className="fixed inset-y-0 left-0 w-80 max-w-full bg-background z-50 lg:hidden overflow-y-auto shadow-2xl animate-slide-in-right">
            <div className="p-4 border-b border-border flex items-center justify-between sticky top-0 bg-background">
              <h2 className="font-semibold text-lg">Filters</h2>
              <button 
                onClick={() => setShowFilters(false)}
                className="w-8 h-8 rounded-full hover:bg-muted flex items-center justify-center"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="p-4 space-y-6">
              {/* Search */}
              <div>
                <h3 className="font-semibold mb-3">Search</h3>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => updateFilter('search', e.target.value)}
                    className="w-full h-10 pl-10 pr-4 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>

              {/* Categories */}
              <div>
                <h3 className="font-semibold mb-3">Category</h3>
                <div className="space-y-1">
                  {categories.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => updateFilter('category', selectedCategory === cat.id ? '' : cat.id)}
                      className={cn(
                        'block w-full text-left px-3 py-2 rounded-lg text-sm transition-all',
                        selectedCategory === cat.id ? 'bg-primary text-primary-foreground' : 'hover:bg-muted'
                      )}
                    >
                      <span className="mr-2">{cat.icon}</span>
                      {cat.name}
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
                        'px-3 py-1.5 rounded-full text-xs font-medium transition-all',
                        selectedTags.includes(tag)
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted hover:bg-muted-foreground/10'
                      )}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="pt-4 space-y-3 border-t border-border">
                {hasActiveFilters && (
                  <Button variant="outline" className="w-full" onClick={clearFilters}>
                    <X className="h-4 w-4 mr-2" />
                    Clear All
                  </Button>
                )}
                <Button className="w-full" onClick={() => setShowFilters(false)}>
                  Show {filteredProducts.length} Products
                </Button>
              </div>
            </div>
          </div>
        </>
      )}
    </Layout>
  );
};

export default Shop;
