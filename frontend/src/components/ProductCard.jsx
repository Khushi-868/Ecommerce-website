import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/cartSlice';
import '../styles/product.css';

const ProductCard = ({ product, badge }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [addedMessage, setAddedMessage] = useState(false);
  // Defensive checks if these fields don't exist in backend
  const rating = product.rating || 4.5;
  const originalPrice = product.originalPrice || Math.round(product.price * 1.3);
  const discount = product.discount || Math.round(((originalPrice - product.price) / originalPrice) * 100);

  return (
    <div className="product-card">
      <div className="product-image-container">
        {badge && <span className="product-badge">{badge}</span>}
        {discount > 0 && !badge && <span className="product-badge sale-badge">-{discount}%</span>}
        <button className="wishlist-btn" aria-label="Add to Wishlist">
           <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
        </button>
        <Link to={`/product/${product._id}`}>
          <img src={product.imageUrl || 'https://via.placeholder.com/300x400'} alt={product.name} className="product-image" />
        </Link>
        <button 
          className={`add-to-cart-quick btn ${addedMessage ? 'btn-success' : ''}`}
          onClick={() => {
            if (product.stock <= 0) return;
            
            if ((product.sizes && product.sizes.length > 0) || (product.colors && product.colors.length > 0)) {
              navigate(`/product/${product._id}`);
            } else {
              dispatch(addToCart({
                productId: product._id,
                name: product.name,
                price: product.price,
                imageUrl: product.imageUrl,
                qty: 1,
                stock: product.stock
              }));
              setAddedMessage(true);
              setTimeout(() => setAddedMessage(false), 2000);
            }
          }}
          disabled={product.stock <= 0}
        >
          {product.stock <= 0 ? 'Out of Stock' : addedMessage ? 'Added ✓' : 'Add to Cart'}
        </button>
      </div>
      
      <div className="product-info">
        <Link to={`/product/${product._id}`} className="product-name">
          {product.name}
        </Link>
        <div className="product-rating">
          <span className="stars">{'★'.repeat(Math.floor(rating))}</span>
          <span className="rating-value">{rating}</span>
        </div>
        <div className="product-pricing">
          <span className="price">₹{product.price}</span>
          {originalPrice > product.price && (
            <span className="original-price">₹{originalPrice}</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
