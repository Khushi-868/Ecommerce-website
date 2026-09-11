import React, { useEffect, useState, useContext } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/cartSlice';
import { AuthContext } from '../context/AuthContext';
import ProductCard from '../components/ProductCard';
import '../styles/product-detail.css';

// Map color name -> hex for visual swatches
const COLOR_HEX_MAP = {
  Black: '#111111', White: '#f5f5f5', Grey: '#9ca3af', Gray: '#9ca3af',
  Navy: '#1e3a8a', Blue: '#3b82f6', Red: '#ef4444', Green: '#22c55e',
  Yellow: '#eab308', Orange: '#f97316', Pink: '#ec4899', Purple: '#a855f7',
  Brown: '#92400e', Beige: '#d4b896', 'Olive Green': '#808000',
  Maroon: '#7f1d1d', Teal: '#0d9488', Charcoal: '#374151',
};

const StarRating = ({ rating, max = 5 }) => {
  return (
    <span className="stars" aria-label={`${rating} out of ${max} stars`}>
      {Array.from({ length: max }).map((_, i) => (
        <span key={i} style={{ color: i < Math.round(rating) ? '#f59e0b' : '#d1d5db' }}>★</span>
      ))}
    </span>
  );
};

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useContext(AuthContext);

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Variant & purchase state
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [addedMessage, setAddedMessage] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);

  // Tab state
  const [activeTab, setActiveTab] = useState('details');

  // Reviews
  const [reviews, setReviews] = useState([]);
  const [reviewsLoading, setReviewsLoading] = useState(true);
  const [reviewForm, setReviewForm] = useState({ rating: 5, comment: '' });
  const [submitError, setSubmitError] = useState('');
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Related products
  const [relatedProducts, setRelatedProducts] = useState([]);

  // Fetch product
  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`/api/products/${id}`);
        if (!res.ok) {
          const errData = await res.json();
          throw new Error(errData.message || 'Product not found');
        }
        const data = await res.json();
        setProduct(data);
        // Auto-select first size/color
        if (data.sizes && data.sizes.length > 0) setSelectedSize(data.sizes[0]);
        if (data.colors && data.colors.length > 0) setSelectedColor(data.colors[0]);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
    window.scrollTo(0, 0);
  }, [id]);

  // Fetch reviews
  useEffect(() => {
    if (!id) return;
    const fetchReviews = async () => {
      setReviewsLoading(true);
      try {
        const res = await fetch(`/api/reviews/${id}`);
        if (res.ok) {
          const data = await res.json();
          setReviews(data);
        }
      } catch (_) {
        // silently fail — reviews are non-critical
      } finally {
        setReviewsLoading(false);
      }
    };
    fetchReviews();
  }, [id, submitSuccess]);

  // Fetch related products when product loads
  useEffect(() => {
    if (!product) return;
    const fetchRelated = async () => {
      try {
        const res = await fetch(`/api/products?category=${encodeURIComponent(product.category)}`);
        if (res.ok) {
          const data = await res.json();
          // Exclude the current product and limit to 4
          const filtered = (Array.isArray(data) ? data : data.products || [])
            .filter((p) => p._id !== product._id)
            .slice(0, 4);
          setRelatedProducts(filtered);
        }
      } catch (_) {
        // non-critical
      }
    };
    fetchRelated();
  }, [product]);

  // ---------- Handlers ----------

  const handleAddToCart = (andNavigate = false) => {
    if (!product || product.stock <= 0) return;

    if (!selectedSize && product.sizes && product.sizes.length > 0) {
      alert('Please select a size before adding to cart.');
      return;
    }
    if (!selectedColor && product.colors && product.colors.length > 0) {
      alert('Please select a color before adding to cart.');
      return;
    }

    const safeQty = Math.min(quantity, product.stock);

    dispatch(addToCart({
      productId: product._id,
      name: product.name,
      price: product.price,
      imageUrl: product.imageUrl,
      size: selectedSize || '',
      color: selectedColor || '',
      qty: safeQty,
      stock: product.stock,
    }));

    if (andNavigate) {
      navigate('/checkout');
    } else {
      setAddedMessage(true);
      setTimeout(() => setAddedMessage(false), 3000);
    }
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    setSubmitError('');
    if (!user) {
      setSubmitError('Please log in to submit a review.');
      return;
    }
    try {
      const res = await fetch(`/api/reviews/${id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify(reviewForm),
      });
      const data = await res.json();
      if (!res.ok) {
        setSubmitError(data.message || 'Failed to submit review.');
      } else {
        setReviewForm({ rating: 5, comment: '' });
        setSubmitSuccess((prev) => !prev); // toggle to re-fetch
      }
    } catch (_) {
      setSubmitError('Something went wrong. Please try again.');
    }
  };

  // ---------- Loading / Error States ----------

  if (loading) {
    return (
      <div className="detail-loading-state">
        <div className="loading-spinner"></div>
        <p>Loading product...</p>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="detail-error-state">
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
        <h2>Product Not Found</h2>
        <p>{error || 'The product you are looking for does not exist.'}</p>
        <Link to="/shop" className="btn" style={{ marginTop: '20px', display: 'inline-block' }}>Return to Shop</Link>
      </div>
    );
  }

  // ---------- Derived values ----------
  const rating = product.ratings || 0;
  const numReviews = product.numReviews || 0;
  const originalPrice = product.originalPrice || 0;
  const discount = originalPrice > product.price
    ? Math.round(((originalPrice - product.price) / originalPrice) * 100)
    : 0;
  const sizes = product.sizes || [];
  const colors = product.colors || []; // plain strings from backend

  return (
    <div className="product-detail-page container">

      {/* Breadcrumb */}
      <div className="breadcrumb">
        <Link to="/">Home</Link> / <Link to="/shop">Shop</Link> /
        {product.category && (
          <> <Link to={`/shop?category=${encodeURIComponent(product.category)}`}>{product.category}</Link> /</>
        )}
        <span className="active"> {product.name}</span>
      </div>

      {/* Main Grid */}
      <div className="detail-main">

        {/* Left: Gallery */}
        <div className="detail-gallery">
          <div className="thumbnails">
            <div className="thumbnail active">
              <img src={product.imageUrl} alt={product.name} />
            </div>
            <div className="thumbnail">
              <img src={product.imageUrl} alt={product.name} />
            </div>
            <div className="thumbnail">
              <img src={product.imageUrl} alt={product.name} />
            </div>
          </div>
          <div className="main-image">
            {discount > 0 && <span className="detail-badge sale-badge">-{discount}%</span>}
            {product.isNewArrival && !discount && <span className="detail-badge">New</span>}
            <button
              className={`detail-wishlist-btn ${isWishlisted ? 'wishlisted' : ''}`}
              aria-label="Add to Wishlist"
              onClick={() => setIsWishlisted((prev) => !prev)}
            >
              <svg width="24" height="24" viewBox="0 0 24 24"
                fill={isWishlisted ? 'currentColor' : 'none'}
                stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
              </svg>
            </button>
            <img src={product.imageUrl} alt={product.name} />
          </div>
        </div>

        {/* Right: Info */}
        <div className="detail-info">
          <p className="detail-category">{product.category}</p>
          <h1 className="detail-title">{product.name}</h1>

          <div className="detail-rating">
            <StarRating rating={rating} />
            <span className="rating-text">{rating.toFixed(1)} ({numReviews} {numReviews === 1 ? 'review' : 'reviews'})</span>
          </div>

          <div className="detail-pricing">
            <span className="price">₹{product.price.toLocaleString('en-IN')}</span>
            {originalPrice > product.price && (
              <span className="original-price">₹{originalPrice.toLocaleString('en-IN')}</span>
            )}
            {discount > 0 && <span className="discount-badge">{discount}% OFF</span>}
          </div>

          <p className="detail-description">{product.description}</p>

          <div className="detail-options">

            {/* Color Selection */}
            {colors.length > 0 && (
              <div className="option-group">
                <div className="option-header">
                  <label>Color: <strong>{selectedColor}</strong></label>
                </div>
                <div className="color-selector">
                  {colors.map((colorName) => {
                    const hex = COLOR_HEX_MAP[colorName] || '#cccccc';
                    return (
                      <button
                        key={colorName}
                        className={`color-btn ${selectedColor === colorName ? 'selected' : ''}`}
                        style={{ backgroundColor: hex }}
                        onClick={() => setSelectedColor(colorName)}
                        aria-label={colorName}
                        title={colorName}
                      />
                    );
                  })}
                </div>
              </div>
            )}

            {/* Size Selection */}
            {sizes.length > 0 && (
              <div className="option-group">
                <div className="option-header">
                  <label>Size: <strong>{selectedSize}</strong></label>
                  <button className="size-guide-link">Size Guide</button>
                </div>
                <div className="size-selector">
                  {sizes.map((size) => (
                    <button
                      key={size}
                      className={`size-btn ${selectedSize === size ? 'selected' : ''}`}
                      onClick={() => setSelectedSize(size)}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Stock status */}
          <div className="stock-status">
            {product.stock > 0 ? (
              <p className="in-stock">
                <span className="status-dot"></span>
                In Stock ({product.stock} units available)
              </p>
            ) : (
              <p className="out-of-stock">
                <span className="status-dot"></span>
                Out of Stock
              </p>
            )}
          </div>

          {/* Qty + Add to Cart */}
          <div className="detail-actions">
            <div className="quantity-selector">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                disabled={quantity <= 1}
              >−</button>
              <input type="number" value={quantity} readOnly />
              <button
                onClick={() => setQuantity((q) => Math.min(product.stock, q + 1))}
                disabled={product.stock <= 0 || quantity >= product.stock}
              >+</button>
            </div>

            <button
              className={`btn ${addedMessage ? 'btn-success' : ''}`}
              onClick={() => handleAddToCart(false)}
              style={{ flex: 1 }}
              disabled={product.stock <= 0}
            >
              {product.stock <= 0 ? 'Out of Stock' : addedMessage ? 'Added to Cart ✓' : 'Add to Cart'}
            </button>
          </div>

          <button
            className="btn btn-secondary buy-now-btn"
            onClick={() => handleAddToCart(true)}
            disabled={product.stock <= 0}
          >
            Buy it Now
          </button>

        </div>
      </div>

      {/* Tabs */}
      <div className="detail-tabs">
        <div className="tabs-header">
          <button className={activeTab === 'details' ? 'active' : ''} onClick={() => setActiveTab('details')}>
            Product Details
          </button>
          <button className={activeTab === 'material' ? 'active' : ''} onClick={() => setActiveTab('material')}>
            Material &amp; Care
          </button>
          <button className={activeTab === 'shipping' ? 'active' : ''} onClick={() => setActiveTab('shipping')}>
            Shipping &amp; Returns
          </button>
          <button className={activeTab === 'reviews' ? 'active' : ''} onClick={() => setActiveTab('reviews')}>
            Reviews ({numReviews})
          </button>
        </div>
        <div className="tab-content">
          {activeTab === 'details' && (
            <div>
              <p>{product.description}</p>
              <ul className="details-list">
                <li>Premium quality fabric</li>
                <li>Classic fit designed for everyday wear</li>
                <li>Durable stitching for long-lasting use</li>
                {product.category && <li>Category: {product.category}</li>}
              </ul>
            </div>
          )}
          {activeTab === 'material' && (
            <div>
              <ul className="details-list">
                <li>100% Premium Cotton</li>
                <li>Machine wash cold with like colors</li>
                <li>Tumble dry low or hang dry</li>
                <li>Do not iron on print</li>
              </ul>
            </div>
          )}
          {activeTab === 'shipping' && (
            <div>
              <p><strong>Free Standard Shipping</strong> on all orders over ₹1000.</p>
              <p>Delivery typically takes 3–5 business days.</p>
              <p><strong>Returns:</strong> We accept returns within 30 days of purchase. Items must be in original condition with tags attached.</p>
            </div>
          )}
          {activeTab === 'reviews' && (
            <div className="reviews-section">
              {/* Review Summary */}
              {reviews.length > 0 && (
                <div className="reviews-summary">
                  <span className="reviews-avg">{rating.toFixed(1)}</span>
                  <StarRating rating={rating} />
                  <span className="reviews-count">({reviews.length} {reviews.length === 1 ? 'review' : 'reviews'})</span>
                </div>
              )}

              {/* Review List */}
              {reviewsLoading ? (
                <p className="reviews-loading">Loading reviews…</p>
              ) : reviews.length === 0 ? (
                <p className="reviews-empty">No reviews yet. Be the first to review this product!</p>
              ) : (
                <div className="reviews-list">
                  {reviews.map((review) => (
                    <div key={review._id} className="review-card">
                      <div className="review-header">
                        <div className="review-author-avatar">{review.name.charAt(0).toUpperCase()}</div>
                        <div className="review-meta">
                          <strong className="review-author">{review.name}</strong>
                          <span className="review-date">
                            {new Date(review.createdAt).toLocaleDateString('en-IN', {
                              year: 'numeric', month: 'long', day: 'numeric'
                            })}
                          </span>
                        </div>
                        <StarRating rating={review.rating} />
                      </div>
                      <p className="review-comment">{review.comment}</p>
                    </div>
                  ))}
                </div>
              )}

              {/* Write a Review */}
              <div className="review-form-section">
                <h3>Write a Review</h3>
                {!user ? (
                  <p className="review-login-prompt">
                    <Link to="/login">Log in</Link> to write a review.
                  </p>
                ) : (
                  <form onSubmit={handleReviewSubmit} className="review-form">
                    <div className="review-rating-input">
                      <label>Your Rating:</label>
                      <div className="star-input">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            type="button"
                            className={`star-btn ${star <= reviewForm.rating ? 'filled' : ''}`}
                            onClick={() => setReviewForm((f) => ({ ...f, rating: star }))}
                            aria-label={`Rate ${star} stars`}
                          >★</button>
                        ))}
                      </div>
                    </div>
                    <textarea
                      placeholder="Share your experience with this product…"
                      value={reviewForm.comment}
                      onChange={(e) => setReviewForm((f) => ({ ...f, comment: e.target.value }))}
                      required
                      rows={4}
                      className="review-textarea"
                      maxLength={500}
                    />
                    {submitError && <p className="review-error">{submitError}</p>}
                    <button type="submit" className="btn">Submit Review</button>
                  </form>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="related-products-section">
          <h2 className="related-title">You May Also Like</h2>
          <div className="related-products-grid">
            {relatedProducts.map((p) => (
              <ProductCard key={p._id} product={p} />
            ))}
          </div>
        </div>
      )}

    </div>
  );
};

export default ProductDetail;
