import React, { useState, useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { clearCart } from '../redux/cartSlice';
import '../styles/checkout.css';

const Checkout = () => {
  const { user } = useContext(AuthContext);
  const cartItems = useSelector((state) => state.cart.cartItems);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [address, setAddress] = useState({
    fullName: '', email: user?.email || '', street: '', city: '', state: '', postalCode: '', country: 'India', phone: ''
  });

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);
  const discount = subtotal > 2000 ? subtotal * 0.1 : 0;
  const shipping = subtotal > 1000 || subtotal === 0 ? 0 : 150;
  const totalPrice = subtotal - discount + shipping;

  const handlePayment = async () => {
    try {
      const orderRes = await fetch('/api/payment/order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: totalPrice })
      });
      const orderData = await orderRes.json();

      if (!orderRes.ok) {
        // Razorpay unconfigured exception handler
        const fallback = window.confirm("Razorpay keys unconfigured on backend. Use Student Bypass Mode to place test order?");
        if (fallback) {
          return bypassPayment();
        } else {
          return alert("Payment failed to initialize");
        }
      }

      const options = {
        key: 'rzp_test_dummykey123', // Student dummy fallback
        amount: orderData.amount,
        currency: orderData.currency,
        name: 'ShopNest',
        description: 'Test Transaction',
        order_id: orderData.id,
        handler: async function (response) {
          const verifyRes = await fetch('/api/payment/verify', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(response)
          });
          if (verifyRes.ok) {
            const saveOrderRes = await fetch('/api/orders', {
              method: 'POST',
              headers: { 
                'Content-Type': 'application/json',
                Authorization: `Bearer ${user.token}`
              },
              body: JSON.stringify({
                items: cartItems,
                totalAmount: totalPrice,
                address,
                paymentId: response.razorpay_payment_id
              })
            });

            if (saveOrderRes.ok) {
              dispatch(clearCart());
              navigate('/ordersuccess');
            } else {
              alert('Order saving failed');
            }
          } else {
            alert('Payment verification failed');
          }
        },
        prefill: {
          name: address.fullName,
          email: address.email,
          contact: address.phone || '9999999999'
        },
        theme: {
          color: '#000000'
        }
      };
      
      const rzp1 = new window.Razorpay(options);
      rzp1.open();
    } catch (error) {
      console.error(error);
    }
  };

  const bypassPayment = async () => {
    const saveOrderRes = await fetch('/api/orders', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user.token}`
      },
      body: JSON.stringify({
        items: cartItems,
        totalAmount: totalPrice,
        address,
        paymentId: 'bypass_txn_' + Date.now()
      })
    });
    if (saveOrderRes.ok) {
      dispatch(clearCart());
      navigate('/ordersuccess');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!user) {
      // Small feedback UI update here instead of alert, but keeping alert per existing logic requirement if we don't build a toast
      alert("Please login to proceed with checkout.");
      navigate('/login');
      return;
    }
    handlePayment();
  };

  return (
    <div className="checkout-page container">
      
      <div className="checkout-layout">
        
        {/* Left Side: Forms */}
        <div className="checkout-forms-section">
           
           <div className="checkout-brand">
             <Link to="/">ShopNest</Link>
           </div>
           
           <div className="checkout-breadcrumb">
             <Link to="/cart">Cart</Link> / <span>Checkout</span>
           </div>

           <form onSubmit={handleSubmit} className="checkout-form">
              
              <section className="form-section">
                 <div className="section-header">
                   <h2>Contact Information</h2>
                   {!user && <p>Already have an account? <Link to="/login">Log in</Link></p>}
                 </div>
                 <div className="form-row">
                   <input 
                     type="email" 
                     placeholder="Email" 
                     required 
                     value={address.email} 
                     onChange={(e) => setAddress({...address, email: e.target.value})} 
                   />
                 </div>
              </section>

              <section className="form-section">
                 <h2>Shipping Address</h2>
                 <div className="form-row">
                   <input 
                     type="text" 
                     placeholder="Full Name" 
                     required 
                     value={address.fullName} 
                     onChange={(e) => setAddress({...address, fullName: e.target.value})} 
                   />
                 </div>
                 <div className="form-row">
                   <input 
                     type="text" 
                     placeholder="Address (Street, Apartment, suite, etc.)" 
                     required 
                     value={address.street} 
                     onChange={(e) => setAddress({...address, street: e.target.value})} 
                   />
                 </div>
                 <div className="form-row multi-col">
                   <input 
                     type="text" 
                     placeholder="City" 
                     required 
                     value={address.city} 
                     onChange={(e) => setAddress({...address, city: e.target.value})} 
                   />
                   <input 
                     type="text" 
                     placeholder="State" 
                     required 
                     value={address.state} 
                     onChange={(e) => setAddress({...address, state: e.target.value})} 
                   />
                   <input 
                     type="text" 
                     placeholder="PIN Code" 
                     required 
                     value={address.postalCode} 
                     onChange={(e) => setAddress({...address, postalCode: e.target.value})} 
                   />
                 </div>
                 <div className="form-row multi-col">
                   <select value={address.country} onChange={(e) => setAddress({...address, country: e.target.value})} required>
                     <option value="India">India</option>
                     <option value="United States">United States</option>
                     <option value="United Kingdom">United Kingdom</option>
                     <option value="Australia">Australia</option>
                     <option value="Canada">Canada</option>
                   </select>
                   <input 
                     type="tel" 
                     placeholder="Phone" 
                     required 
                     value={address.phone} 
                     onChange={(e) => setAddress({...address, phone: e.target.value})} 
                   />
                 </div>
              </section>

              <div className="checkout-footer-actions">
                <Link to="/cart" className="return-link">{'< Return to cart'}</Link>
                <button type="submit" className="btn btn-pay">Continue to Payment</button>
              </div>

           </form>
        </div>

        {/* Right Side: Order Summary */}
        <div className="checkout-summary-section">
           <div className="summary-items-list">
             {cartItems.map((item, index) => (
               <div key={item.productId || index} className="summary-item">
                 <div className="summary-item-image-wrapper">
                   <img src={item.imageUrl} alt={item.name} className="summary-item-image" />
                   <span className="summary-item-qty">{item.qty}</span>
                 </div>
                 <div className="summary-item-info">
                   <span className="summary-item-name">{item.name}</span>
                   {item.size && <span className="summary-item-variant">{item.size} / {item.color}</span>}
                 </div>
                 <div className="summary-item-price">
                   ₹{(item.price * item.qty).toFixed(2)}
                 </div>
               </div>
             ))}
           </div>

           <div className="summary-totals">
              <div className="totals-row">
                <span>Subtotal</span>
                <span>₹{subtotal.toFixed(2)}</span>
              </div>
              {discount > 0 && (
                <div className="totals-row discount">
                  <span>Discount</span>
                  <span>-₹{discount.toFixed(2)}</span>
                </div>
              )}
              <div className="totals-row">
                <span>Shipping</span>
                <span>{shipping === 0 ? 'Free' : `₹${shipping.toFixed(2)}`}</span>
              </div>
              <div className="totals-divider"></div>
              <div className="totals-row grand-total">
                <span>Total</span>
                <span><span className="currency">INR</span> ₹{totalPrice.toFixed(2)}</span>
              </div>
           </div>
        </div>

      </div>
    </div>
  );
};

export default Checkout;
