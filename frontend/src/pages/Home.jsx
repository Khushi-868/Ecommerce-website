import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import '../styles/home.css';

const Home = () => {
  const [newArrivals, setNewArrivals] = useState([]);
  const [bestSellers, setBestSellers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch('/api/products');
        const data = await res.json();
        
        // Simulating different lists for demonstration
        setNewArrivals(data.slice(0, 4)); 
        setBestSellers(data.slice(4, 8).length > 0 ? data.slice(4, 8) : data.slice(0, 4));
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const categories = [
    { name: 'Round Neck', path: '/shop?category=round-neck', image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=500&q=80' },
    { name: 'Oversized', path: '/shop?category=oversized', image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=500&q=80' },
    { name: 'Polo', path: '/shop?category=polo', image: 'https://images.unsplash.com/photo-1622445272461-c6580cab8755?auto=format&fit=crop&w=500&q=80' },
    { name: 'Acid Wash', path: '/shop?category=acid-wash', image: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=500&q=80' },
    { name: 'Boxy Vest', path: '/shop?category=boxy-vest', image: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=500&q=80' },
    { name: 'Hoodies', path: '/shop?category=hoodies', image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=500&q=80' }
  ];

  return (
    <div className="home-container">
      
      {/* 1. HERO SECTION */}
      <section className="hero-section">
        <div className="hero-content">
          <h1>EVERYDAY STYLE.<br/>MADE BETTER.</h1>
          <p>Premium T-shirts and everyday essentials designed for your style.</p>
          <div className="hero-buttons">
            <Link to="/shop" className="btn">SHOP T-SHIRTS</Link>
            <Link to="/shop?collection=all" className="btn btn-secondary" style={{ backgroundColor: 'white', color: 'black' }}>EXPLORE COLLECTION</Link>
          </div>
        </div>
        <div className="hero-image-container">
           {/* Placeholder for hero image, could be an actual image from Cloudinary */}
           <div className="hero-image-overlay"></div>
        </div>
      </section>

      {/* 2. SHOP BY CATEGORY */}
      <section className="section container category-section">
        <div className="section-header">
          <h2>Shop by Category</h2>
        </div>
        <div className="category-grid">
          {categories.map((cat, idx) => (
            <Link to={cat.path} key={idx} className="category-card">
              <div className="category-image">
                <img src={cat.image} alt={cat.name} />
              </div>
              <div className="category-name">{cat.name}</div>
            </Link>
          ))}
        </div>
      </section>

      {/* 3. NEW ARRIVALS */}
      <section className="section container">
        <div className="section-header">
          <h2>New Arrivals</h2>
          <Link to="/shop?collection=new-arrivals" className="view-all-link">View All</Link>
        </div>
        {loading ? (
          <div className="loading-spinner">Loading...</div>
        ) : (
          <div className="product-grid">
            {newArrivals.map((product) => (
              <ProductCard key={product._id} product={product} badge="New" />
            ))}
          </div>
        )}
      </section>

      {/* 5. PROMOTIONAL SECTION */}
      <section className="promo-section">
        <div className="promo-content">
          <h2>UP TO 40% OFF</h2>
          <p>Refresh your everyday wardrobe.</p>
          <Link to="/shop?sale=true" className="btn">SHOP SALE</Link>
        </div>
      </section>

      {/* 4. BEST SELLERS */}
      <section className="section container">
        <div className="section-header">
          <h2>Best Sellers</h2>
          <Link to="/shop?collection=best-sellers" className="view-all-link">View All</Link>
        </div>
        {loading ? (
          <div className="loading-spinner">Loading...</div>
        ) : (
          <div className="product-grid">
            {bestSellers.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </section>

      {/* 6. TRENDING COLLECTIONS */}
      <section className="section container trending-section">
        <div className="section-header">
          <h2>Trending Collections</h2>
        </div>
        <div className="trending-grid">
          <Link to="/shop?collection=oversized" className="trending-card oversized">
            <h3>Oversized Collection</h3>
            <span>Explore</span>
          </Link>
          <Link to="/shop?collection=streetwear" className="trending-card streetwear">
            <h3>Streetwear</h3>
            <span>Explore</span>
          </Link>
          <Link to="/shop?collection=essentials" className="trending-card essentials">
            <h3>Everyday Essentials</h3>
            <span>Explore</span>
          </Link>
        </div>
      </section>

      {/* 7. WHY SHOP WITH US */}
      <section className="section container trust-section">
        <div className="trust-grid">
          <div className="trust-card">
            <div className="trust-icon">★</div>
            <h4>Premium Quality</h4>
            <p>Crafted from the finest materials.</p>
          </div>
          <div className="trust-card">
            <div className="trust-icon">↺</div>
            <h4>Easy Returns</h4>
            <p>30-day hassle-free return policy.</p>
          </div>
          <div className="trust-card">
            <div className="trust-icon">🔒</div>
            <h4>Secure Payments</h4>
            <p>100% secure payment gateways.</p>
          </div>
          <div className="trust-card">
            <div className="trust-icon">⚡</div>
            <h4>Fast Delivery</h4>
            <p>Express shipping available.</p>
          </div>
        </div>
      </section>

      {/* 8. NEWSLETTER */}
      <section className="newsletter-section">
        <div className="newsletter-content">
          <h2>Stay in the loop.</h2>
          <p>Get updates on new drops, exclusive offers and more.</p>
          <form className="newsletter-form" onSubmit={(e) => e.preventDefault()}>
            <input type="email" placeholder="Enter your email address" required />
            <button type="submit" className="btn">Subscribe</button>
          </form>
        </div>
      </section>

    </div>
  );
};

export default Home;
