import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import '../styles/admin.css';

const AdminProducts = () => {
  const { user } = useContext(AuthContext);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch('/api/products');
        const data = await res.json();
        setProducts(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Failed to fetch products", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this product? This action cannot be undone.')) {
      try {
        const res = await fetch(`/api/products/${id}`, {
          method: 'DELETE',
          headers: { Authorization: `Bearer ${user.token}` }
        });
        if (res.ok) {
          setProducts(products.filter(p => p._id !== id));
        } else {
          alert('Failed to delete product.');
        }
      } catch (error) {
        console.error("Delete failed", error);
      }
    }
  };

  return (
    <div className="admin-page container">
      <div className="admin-header">
        <div>
          <h1>Manage Products</h1>
          <p>View, edit, and delete products from your catalog.</p>
        </div>
        <div style={{ display: 'flex', gap: '15px' }}>
          <Link to="/admin" className="btn btn-secondary">Dashboard</Link>
          <Link to="/admin/add-product" className="btn">+ Add Product</Link>
        </div>
      </div>

      {loading ? (
        <div className="admin-loading">Loading products...</div>
      ) : (
        <div className="admin-table-container">
          <table className="admin-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Price</th>
                <th>Category</th>
                <th>Stock</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map(product => (
                <tr key={product._id}>
                  <td>{product._id.substring(0, 8)}...</td>
                  <td style={{ fontWeight: 500 }}>{product.name}</td>
                  <td>₹{product.price.toFixed(2)}</td>
                  <td>{product.category}</td>
                  <td>{product.stock}</td>
                  <td>
                    <div className="admin-actions">
                      <Link to={`/admin/edit-product/${product._id}`} className="btn-edit">Edit</Link>
                      <button onClick={() => handleDelete(product._id)} className="btn-delete">Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
              {products.length === 0 && (
                <tr>
                  <td colSpan="6" style={{ textAlign: 'center', padding: '40px' }}>No products found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminProducts;
