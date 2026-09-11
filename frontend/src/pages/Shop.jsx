import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import '../styles/shop.css';

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  
  // UI states
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [sortOption, setSortOption] = useState('featured');
  
  // Filters
  const [selectedCategories, setSelectedCategories] = useState([]);
  
  const location = useLocation();

  useEffect(() => {
    // Parse query params (e.g. ?category=round-neck)
    const params = new URLSearchParams(location.search);
    const categoryParam = params.get('category');
    if (categoryParam) {
      setSelectedCategories([categoryParam]);
    }
    
    const fetchProducts = async () => {
      try {
        const res = await fetch('/api/products');
        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [location]);

  // Derived state
  let filteredProducts = products.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));
  
  if (selectedCategories.length > 0) {
    // Basic filter logic assuming product.category exists (if not, it just won't filter out things perfectly, but we degrade gracefully)
    filteredProducts = filteredProducts.filter(p => {
      if (!p.category) return true; // If backend doesn't have category, show all to avoid empty states
      return selectedCategories.includes(p.category.toLowerCase().replace(' ', '-'));
    });
  }

  // Sort logic
  if (sortOption === 'price-low-high') {
    filteredProducts.sort((a, b) => a.price - b.price);
  } else if (sortOption === 'price-high-low') {
    filteredProducts.sort((a, b) => b.price - a.price);
  } else if (sortOption === 'newest') {
    // Mock sort for newest if createdAt isn't reliable
    filteredProducts.sort((a, b) => (b.createdAt > a.createdAt ? 1 : -1));
  }

  const handleCategoryToggle = (category) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter(c => c !== category));
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  const categories = [
    { id: 'round-neck', label: 'Round Neck' },
    { id: 'oversized', label: 'Oversized' },
    { id: 'polo', label: 'Polo' },
    { id: 'acid-wash', label: 'Acid Wash' },
    { id: 'boxy-vest', label: 'Boxy Vest' },
    { id: 'hoodies', label: 'Hoodies' }
  ];

  return (
    <div className="shop-page container">
      
      {/* Breadcrumb & Header */}
      <div className="shop-header">
        <div className="breadcrumb">
          <span>Home</span> / <span className="active">Shop</span>
        </div>
        <h1>SHOP ALL</h1>
        <p>Explore our latest collection.</p>
      </div>

      <div className="shop-layout">
        
        {/* Mobile Filter Toggle */}
        <div className="mobile-shop-controls">
          <button className="btn btn-secondary filter-toggle-btn" onClick={() => setIsMobileFilterOpen(true)}>
            Filters
          </button>
          <div className="mobile-sort">
             <select value={sortOption} onChange={(e) => setSortOption(e.target.value)}>
                <option value="featured">Featured</option>
                <option value="newest">Newest</option>
                <option value="price-low-high">Price: Low to High</option>
                <option value="price-high-low">Price: High to Low</option>
             </select>
          </div>
        </div>

        {/* Sidebar Filters */}
        <aside className={`shop-sidebar ${isMobileFilterOpen ? 'open' : ''}`}>
          <div className="sidebar-header mobile-only">
            <h3>Filters</h3>
            <button className="close-filter-btn" onClick={() => setIsMobileFilterOpen(false)}>✕</button>
          </div>

          <div className="filter-group">
            <input 
              type="text" 
              placeholder="Search..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="search-filter"
            />
          </div>

          <div className="filter-group">
            <h3>Category</h3>
            <ul className="filter-list">
              {categories.map(cat => (
                <li key={cat.id}>
                  <label className="checkbox-label">
                    <input 
                      type="checkbox" 
                      checked={selectedCategories.includes(cat.id)}
                      onChange={() => handleCategoryToggle(cat.id)}
                    />
                    <span>{cat.label}</span>
                  </label>
                </li>
              ))}
            </ul>
          </div>

          <div className="filter-group">
            <h3>Size</h3>
            <ul className="filter-list">
              <li><label className="checkbox-label"><input type="checkbox" /> <span>S</span></label></li>
              <li><label className="checkbox-label"><input type="checkbox" /> <span>M</span></label></li>
              <li><label className="checkbox-label"><input type="checkbox" /> <span>L</span></label></li>
              <li><label className="checkbox-label"><input type="checkbox" /> <span>XL</span></label></li>
              <li><label className="checkbox-label"><input type="checkbox" /> <span>XXL</span></label></li>
            </ul>
          </div>

          <div className="filter-group">
            <h3>Color</h3>
            <div className="color-options">
              <span className="color-circle" style={{ backgroundColor: '#000' }} title="Black"></span>
              <span className="color-circle" style={{ backgroundColor: '#fff', border: '1px solid #ccc' }} title="White"></span>
              <span className="color-circle" style={{ backgroundColor: '#808080' }} title="Grey"></span>
              <span className="color-circle" style={{ backgroundColor: '#1e3a8a' }} title="Navy"></span>
              <span className="color-circle" style={{ backgroundColor: '#065f46' }} title="Green"></span>
            </div>
          </div>
          
          <div className="filter-group">
            <h3>Price</h3>
            <ul className="filter-list">
              <li><label className="checkbox-label"><input type="checkbox" /> <span>Under ₹500</span></label></li>
              <li><label className="checkbox-label"><input type="checkbox" /> <span>₹500 - ₹1000</span></label></li>
              <li><label className="checkbox-label"><input type="checkbox" /> <span>Over ₹1000</span></label></li>
            </ul>
          </div>

          <div className="filter-group">
            <h3>Availability</h3>
            <ul className="filter-list">
              <li><label className="checkbox-label"><input type="checkbox" /> <span>In Stock</span></label></li>
              <li><label className="checkbox-label"><input type="checkbox" /> <span>Out of Stock</span></label></li>
            </ul>
          </div>
          
          {isMobileFilterOpen && (
            <div className="mobile-filter-footer">
              <button className="btn" onClick={() => setIsMobileFilterOpen(false)}>Apply Filters</button>
            </div>
          )}
        </aside>

        {/* Main Content */}
        <main className="shop-main">
          <div className="shop-main-header desktop-only">
            <span className="product-count">{filteredProducts.length} Products</span>
            <div className="sort-dropdown">
              <label>Sort by:</label>
              <select value={sortOption} onChange={(e) => setSortOption(e.target.value)}>
                <option value="featured">Featured</option>
                <option value="newest">Newest</option>
                <option value="price-low-high">Price: Low to High</option>
                <option value="price-high-low">Price: High to Low</option>
              </select>
            </div>
          </div>

          {loading ? (
            <div className="loading-state">Loading products...</div>
          ) : filteredProducts.length === 0 ? (
            <div className="empty-state">
              <h3>No products found</h3>
              <p>Try adjusting your filters or search criteria.</p>
              <button className="btn" onClick={() => { setSearch(''); setSelectedCategories([]); }}>Clear Filters</button>
            </div>
          ) : (
            <div className="product-grid">
              {filteredProducts.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          )}
        </main>

      </div>
    </div>
  );
};

export default Shop;
