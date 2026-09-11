import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { removeFromCart, addToCart } from '../redux/cartSlice';
import '../styles/cart.css';

const Cart = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // In real apps, productId might not be unique if same product added with different sizes/colors, 
  // but we'll stick to the existing Redux slice's logic using productId.
  const handleRemove = (cartItemId) => {
    dispatch(removeFromCart(cartItemId));
  };

  const handleUpdateQty = (item, qty) => {
    if (qty < 1) return; // Don't let it go below 1; use Remove button instead
    const safeQty = Math.min(qty, item.stock || 9999);
    dispatch(addToCart({ ...item, qty: safeQty, absoluteQty: true }));
  };

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);
  const discount = subtotal > 2000 ? subtotal * 0.1 : 0; // Mock discount logic: 10% off over 2000
  const shipping = subtotal > 1000 || subtotal === 0 ? 0 : 150; // Mock shipping logic: Free over 1000
  const total = subtotal - discount + shipping;

  return (
    <div className="cart-page container">
      <div className="cart-header">
        <h1>Your Cart</h1>
        <p>{cartItems.length} {cartItems.length === 1 ? 'item' : 'items'}</p>
      </div>

      {cartItems.length === 0 ? (
        <div className="cart-empty">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>
          <h2>Your cart is currently empty.</h2>
          <p>Before proceed to checkout you must add some products to your shopping cart.</p>
          <Link to="/shop" className="btn">Return to Shop</Link>
        </div>
      ) : (
        <div className="cart-layout">
          <div className="cart-items-section">
            <div className="cart-items-header desktop-only">
              <span className="col-product">Product</span>
              <span className="col-qty">Quantity</span>
              <span className="col-total">Total</span>
            </div>
            
            <div className="cart-items-list">
              {cartItems.map((item, index) => (
                <div key={item.cartItemId || index} className="cart-item-row">
                  
                  <div className="cart-item-product">
                    <Link to={`/product/${item.productId}`} className="cart-item-image-link">
                      <img src={item.imageUrl} alt={item.name} className="cart-item-image" />
                    </Link>
                    <div className="cart-item-info">
                      <Link to={`/product/${item.productId}`} className="cart-item-name">{item.name}</Link>
                      <div className="cart-item-variants">
                        {item.color && <span>Color: {item.color}</span>}
                        {item.size && <span>Size: {item.size}</span>}
                      </div>
                      <p className="cart-item-price-mobile mobile-only">₹{item.price.toFixed(2)}</p>
                      <button onClick={() => handleRemove(item.cartItemId)} className="btn-remove">Remove</button>
                    </div>
                  </div>

                  <div className="cart-item-qty">
                    <div className="quantity-selector">
                      <button 
                        onClick={() => handleUpdateQty(item, item.qty - 1)}
                        disabled={item.qty <= 1}
                      >-</button>
                      <input type="number" value={item.qty} readOnly />
                      <button 
                        onClick={() => handleUpdateQty(item, item.qty + 1)}
                        disabled={item.stock && item.qty >= item.stock}
                      >+</button>
                    </div>
                  </div>

                  <div className="cart-item-total desktop-only">
                    ₹{(item.price * item.qty).toFixed(2)}
                  </div>
                </div>
              ))}
            </div>

            <div className="cart-actions desktop-only">
              <Link to="/shop" className="btn btn-secondary">Continue Shopping</Link>
            </div>
          </div>

          <div className="cart-summary-section">
            <div className="cart-summary-card">
              <h3>Order Summary</h3>
              
              <div className="summary-row">
                <span>Subtotal</span>
                <span>₹{subtotal.toFixed(2)}</span>
              </div>
              
              {discount > 0 && (
                <div className="summary-row discount-row">
                  <span>Discount (10% Off)</span>
                  <span>-₹{discount.toFixed(2)}</span>
                </div>
              )}
              
              <div className="summary-row">
                <span>Shipping</span>
                <span>{shipping === 0 ? 'Free' : `₹${shipping.toFixed(2)}`}</span>
              </div>
              
              <div className="summary-divider"></div>
              
              <div className="summary-row total-row">
                <span>Total</span>
                <span>₹{total.toFixed(2)}</span>
              </div>
              
              <button onClick={() => navigate('/checkout')} className="btn btn-checkout">Proceed to Checkout</button>
              
              <div className="summary-footer">
                <p>Secure Checkout</p>
                <div className="payment-icons">
                  <span className="payment-icon">VISA</span>
                  <span className="payment-icon">MC</span>
                  <span className="payment-icon">UPI</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
