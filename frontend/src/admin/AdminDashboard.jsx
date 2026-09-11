import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import '../styles/admin.css';

const AdminDashboard = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user || user.role !== 'admin') {
      navigate('/');
      return;
    }

    const fetchStats = async () => {
      try {
        const res = await fetch('/api/analytics', {
          headers: { Authorization: `Bearer ${user.token}` }
        });
        const data = await res.json();
        if (res.ok) {
          setStats(data);
        } else {
          if (res.status === 401) {
            navigate('/login');
          }
          setStats({ totalOrders: 0, totalProducts: 0, totalUsers: 0, totalRevenue: 0 });
        }
      } catch (error) {
        console.error(error);
        setStats({ totalOrders: 0, totalProducts: 0, totalUsers: 0, totalRevenue: 0 });
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, [user, navigate]);

  return (
    <div className="admin-page container">
      
      <div className="admin-header">
        <div className="admin-brand">
          <img src="/ShopNestLogo.png" alt="ShopNest" />
          <div>
            <h1>Admin Dashboard</h1>
            <p>Welcome back, {user?.name}</p>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="admin-loading">Loading metrics...</div>
      ) : (
        <div className="admin-stats-grid">
          <div className="admin-stat-card">
            <h3>Total Revenue</h3>
            <div className="admin-stat-value">₹{stats?.totalRevenue?.toFixed(2) || '0.00'}</div>
          </div>
          <div className="admin-stat-card">
            <h3>Total Orders</h3>
            <div className="admin-stat-value">{stats?.totalOrders || 0}</div>
          </div>
          <div className="admin-stat-card">
            <h3>Total Products</h3>
            <div className="admin-stat-value">{stats?.totalProducts || 0}</div>
          </div>
          <div className="admin-stat-card">
            <h3>Total Users</h3>
            <div className="admin-stat-value">{stats?.totalUsers || 0}</div>
          </div>
        </div>
      )}

      <div className="admin-controls-section">
        <h2>Quick Actions</h2>
        <div className="admin-controls-grid">
          <button className="admin-control-btn" onClick={() => navigate('/admin/add-product')}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
            Add New Product
          </button>
          <button className="admin-control-btn" onClick={() => navigate('/admin/products')}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>
            Manage Products
          </button>
          <button className="admin-control-btn" onClick={() => navigate('/admin/orders')}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>
            Manage Orders
          </button>
          <button className="admin-control-btn" onClick={() => navigate('/admin/users')}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
            User Directory
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
