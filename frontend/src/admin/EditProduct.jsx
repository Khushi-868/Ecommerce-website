import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useParams, useNavigate, Link } from 'react-router-dom';
import '../styles/admin.css';

const EditProduct = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({ name: '', description: '', price: '', category: '', stock: '' });
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`/api/products/${id}`);
        const data = await res.json();
        setFormData({ name: data.name, description: data.description, price: data.price, category: data.category, stock: data.stock });
      } catch (error) {
        console.error("Failed to fetch product", error);
      } finally {
        setFetching(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const data = new FormData();
    data.append('name', formData.name);
    data.append('description', formData.description);
    data.append('price', formData.price);
    data.append('category', formData.category);
    data.append('stock', formData.stock);
    if (image) data.append('image', image);

    try {
      const res = await fetch(`/api/products/${id}`, {
        method: 'PUT',
        headers: { Authorization: `Bearer ${user.token}` },
        body: data
      });
      if (res.ok) {
        alert('Product updated successfully!');
        navigate('/admin/products');
      } else {
        alert('Failed to update product');
      }
    } catch (error) {
       console.error("Update failed", error);
    } finally {
      setLoading(false);
    }
  };

  if (fetching) return <div className="admin-page container"><div className="admin-loading">Loading product data...</div></div>;

  return (
    <div className="admin-page container">
      
      <div className="admin-header">
        <div>
          <h1>Edit Product</h1>
          <p>Update product information.</p>
        </div>
        <Link to="/admin/products" className="btn btn-secondary">Back to Products</Link>
      </div>

      <div className="admin-form-container">
        <h2>Product Details</h2>
        
        <form onSubmit={handleSubmit} className="admin-form">
          <div className="admin-input-group">
            <label>Product Name</label>
            <input 
              type="text" 
              className="admin-input" 
              required 
              value={formData.name} 
              onChange={(e) => setFormData({...formData, name: e.target.value})} 
            />
          </div>
          
          <div className="admin-input-group">
            <label>Description</label>
            <textarea 
              className="admin-input admin-textarea" 
              required 
              value={formData.description} 
              onChange={(e) => setFormData({...formData, description: e.target.value})} 
            />
          </div>
          
          <div className="admin-input-group">
            <label>Price (₹)</label>
            <input 
              type="number" 
              className="admin-input" 
              required 
              value={formData.price} 
              onChange={(e) => setFormData({...formData, price: e.target.value})} 
            />
          </div>
          
          <div className="admin-input-group">
            <label>Category</label>
            <input 
              type="text" 
              className="admin-input" 
              required 
              value={formData.category} 
              onChange={(e) => setFormData({...formData, category: e.target.value})} 
            />
          </div>
          
          <div className="admin-input-group">
            <label>Stock Quantity</label>
            <input 
              type="number" 
              className="admin-input" 
              required 
              value={formData.stock} 
              onChange={(e) => setFormData({...formData, stock: e.target.value})} 
            />
          </div>
          
          <div className="admin-file-upload">
            <label>Replace Image (Optional)</label>
            <input 
              type="file" 
              accept="image/*" 
              onChange={(e) => setImage(e.target.files[0])} 
            />
          </div>

          <button type="submit" disabled={loading} className="btn admin-submit-btn">
            {loading ? 'UPDATING...' : 'UPDATE PRODUCT'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditProduct;
