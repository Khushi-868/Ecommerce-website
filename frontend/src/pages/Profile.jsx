import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import '../styles/profile.css';

const Profile = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    const fetchMyOrders = async () => {
      try {
        const res = await fetch('/api/orders/myorders', {
          headers: { Authorization: `Bearer ${user.token}` }
        });
        const data = await res.json();
        if (res.ok) {
          setOrders(Array.isArray(data) ? data : []);
        } else {
          // Token obsolete or 401: clear and bounce
          if (res.status === 401) {
             logout();
             navigate('/login');
          }
          setOrders([]);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchMyOrders();
  }, [user, navigate, logout]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (!user) return null;

  return (
    <div className="profile-page container">
      
      <div className="profile-layout">
        
        {/* Sidebar / User Info */}
        <aside className="profile-sidebar">
          <div className="profile-card">
            <div className="profile-avatar">
               {user.name.charAt(0).toUpperCase()}
            </div>
            <h2>{user.name}</h2>
            <p className="profile-email">{user.email}</p>
            <span className="role-badge">{user.role}</span>
            
            <div className="profile-nav">
              <button className="profile-nav-link active">Order History</button>
              <button className="profile-nav-link" onClick={() => alert('Edit Profile functionality coming soon.')}>Edit Profile</button>
              {user.role === 'admin' && (
                <button className="profile-nav-link" onClick={() => navigate('/admin')}>Admin Dashboard</button>
              )}
              <button className="profile-nav-link text-danger" onClick={handleLogout}>Log Out</button>
            </div>
          </div>
        </aside>

        {/* Main Content / Orders */}
        <main className="profile-main">
          <div className="profile-main-header">
             <h2>My Orders</h2>
          </div>

          {loading ? (
            <div className="profile-loading">Fetching your orders...</div>
          ) : orders.length === 0 ? (
            <div className="profile-empty">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path><line x1="3" y1="6" x2="21" y2="6"></line><path d="M16 10a4 4 0 0 1-8 0"></path></svg>
              <h3>You haven't placed any orders yet.</h3>
              <p>Discover our latest collection and start shopping.</p>
              <Link to="/shop" className="btn">Start Shopping</Link>
            </div>
          ) : (
            <div className="orders-list">
              {orders.map(order => (
                <div key={order._id} className="order-card">
                  <div className="order-header">
                     <div className="order-info">
                       <span className="order-label">Order Number</span>
                       <span className="order-value">#{order._id.substring(order._id.length - 8).toUpperCase()}</span>
                     </div>
                     <div className="order-info">
                       <span className="order-label">Date Placed</span>
                       <span className="order-value">{new Date(order.createdAt).toLocaleDateString()}</span>
                     </div>
                     <div className="order-info">
                       <span className="order-label">Total Amount</span>
                       <span className="order-value">₹{order.totalAmount.toFixed(2)}</span>
                     </div>
                     <div className="order-status">
                       <span className={`status-badge status-${order.status.toLowerCase()}`}>
                         {order.status}
                       </span>
                     </div>
                  </div>
                  
                  {/* For a real app, we would map through order.items here. 
                      Since the API might not populate it in the same way, we'll show a summary button */}
                  <div className="order-footer">
                     <button className="btn btn-secondary btn-sm" onClick={() => alert('Order details functionality coming soon.')}>View Order Details</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>

      </div>
    </div>
  );
};

export default Profile;
