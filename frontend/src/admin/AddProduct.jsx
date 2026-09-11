import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import '../styles/admin.css';

const AddProduct = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    name: '', description: '', price: '', category: '', stock: ''
  });
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  if (!user || user.role !== 'admin') {
    navigate('/');
    return null;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!image) return alert('Please select an image');
    
    setLoading(true);
    const data = new FormData();
    data.append('name', formData.name);
    data.append('description', formData.description);
    data.append('price', formData.price);
    data.append('category', formData.category);
    data.append('stock', formData.stock);
    data.append('image', image);

    try {
      const res = await fetch('/api/products', {
        method: 'POST',
        headers: { Authorization: `Bearer ${user.token}` },
        body: data
      });
      const responseData = await res.json();
      
      if (res.ok) {
        alert('Product created successfully with Cloudinary Image URL!');
        navigate('/admin/products');
      } else {
        alert(responseData.message || 'Error creating product');
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-page container">
      
      <div className="admin-header">
        <div>
          <h1>Add Product</h1>
          <p>Create a new product listing in the store.</p>
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
              placeholder="E.g., Essential Classic T-Shirt" 
              required 
              onChange={(e) => setFormData({...formData, name: e.target.value})} 
            />
          </div>
          
          <div className="admin-input-group">
            <label>Description</label>
            <textarea 
              className="admin-input admin-textarea" 
              placeholder="Product description and details..." 
              required 
              onChange={(e) => setFormData({...formData, description: e.target.value})} 
            />
          </div>
          
          <div className="admin-input-group">
            <label>Price (₹)</label>
            <input 
              type="number" 
              className="admin-input" 
              placeholder="0.00" 
              required 
              onChange={(e) => setFormData({...formData, price: e.target.value})} 
            />
          </div>
          
          <div className="admin-input-group">
            <label>Category</label>
            <input 
              type="text" 
              className="admin-input" 
              placeholder="E.g., t-shirts, hoodies" 
              required 
              onChange={(e) => setFormData({...formData, category: e.target.value})} 
            />
          </div>
          
          <div className="admin-input-group">
            <label>Stock Quantity</label>
            <input 
              type="number" 
              className="admin-input" 
              placeholder="Initial stock" 
              required 
              onChange={(e) => setFormData({...formData, stock: e.target.value})} 
            />
          </div>
          
          <div className="admin-file-upload">
            <label>Upload Product Image</label>
            <input 
              type="file" 
              accept="image/*" 
              required 
              onChange={(e) => setImage(e.target.files[0])} 
            />
          </div>

          <button type="submit" disabled={loading} className="btn admin-submit-btn">
            {loading ? 'PUBLISHING...' : 'PUBLISH PRODUCT'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
