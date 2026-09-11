import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { useSelector } from 'react-redux';
import '../styles/navbar.css';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const cartItems = useSelector((state) => state.cart.cartItems);
  const totalCartItems = cartItems.reduce((acc, item) => acc + item.qty, 0);
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isShopDropdownOpen, setIsShopDropdownOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
    setIsMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container container">
        
        {/* Mobile Hamburger */}
        <button className="mobile-menu-btn" onClick={toggleMobileMenu}>
          <span className={`hamburger ${isMobileMenuOpen ? 'open' : ''}`}></span>
        </button>

        {/* LEFT: Logo */}
        <div className="navbar-brand">
          <Link to="/">
            ShopNest
          </Link>
        </div>

        {/* CENTER: Navigation Links */}
        <div className={`navbar-center ${isMobileMenuOpen ? 'open' : ''}`}>
          <ul className="navbar-links">
            <li><Link to="/" onClick={() => setIsMobileMenuOpen(false)}>Home</Link></li>
            
            <li 
              className="shop-dropdown-container"
              onMouseEnter={() => setIsShopDropdownOpen(true)}
              onMouseLeave={() => setIsShopDropdownOpen(false)}
            >
              <Link to="/shop" onClick={() => setIsMobileMenuOpen(false)}>Shop</Link>
              
              {/* Mega Menu */}
              <div className={`shop-mega-menu ${isShopDropdownOpen ? 'show' : ''}`}>
                <div className="mega-menu-grid">
                  <div className="mega-menu-column">
                    <h4>T-SHIRTS</h4>
                    <Link to="/shop?category=round-neck">Round Neck T-Shirts</Link>
                    <Link to="/shop?category=oversized">Oversized T-Shirts</Link>
                    <Link to="/shop?category=polo">Polo T-Shirts</Link>
                    <Link to="/shop?category=acid-wash">Acid Wash T-Shirts</Link>
                    <Link to="/shop?category=boxy-vest">Boxy Vest T-Shirts</Link>
                  </div>
                  <div className="mega-menu-column">
                    <h4>OTHER</h4>
                    <Link to="/shop?category=hoodies">Hoodies</Link>
                    <Link to="/shop?category=women">Women</Link>
                    <Link to="/shop?category=kids">Kids</Link>
                    <Link to="/shop?category=bottom-wear">Bottom Wear</Link>
                  </div>
                  <div className="mega-menu-column">
                    <h4>COLLECTIONS</h4>
                    <Link to="/shop?collection=new-arrivals">New Arrivals</Link>
                    <Link to="/shop?collection=best-sellers">Best Sellers</Link>
                  </div>
                </div>
              </div>
            </li>
            
            <li><Link to="/shop?collection=new-arrivals" onClick={() => setIsMobileMenuOpen(false)}>New Arrivals</Link></li>
            <li><Link to="/shop?collection=best-sellers" onClick={() => setIsMobileMenuOpen(false)}>Best Sellers</Link></li>
          </ul>

          {/* Mobile Only Extras */}
          {isMobileMenuOpen && (
             <div className="mobile-auth-links">
               {user ? (
                 <>
                   <Link to="/profile" onClick={() => setIsMobileMenuOpen(false)}>Profile</Link>
                   {user.role === 'admin' && <Link to="/admin" onClick={() => setIsMobileMenuOpen(false)}>Admin</Link>}
                   <button onClick={handleLogout} className="btn-logout">Logout</button>
                 </>
               ) : (
                 <Link to="/login" onClick={() => setIsMobileMenuOpen(false)}>Login</Link>
               )}
             </div>
          )}
        </div>

        {/* RIGHT: Icons */}
        <div className="navbar-right">
          <button className="icon-btn search-btn" aria-label="Search">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
          </button>
          <Link to="/wishlist" className="icon-btn hide-mobile" aria-label="Wishlist">
             <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
          </Link>
          <div className="account-dropdown-container hide-mobile">
            <Link to={user ? "/profile" : "/login"} className="icon-btn" aria-label="Account">
               <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
            </Link>
            {/* Account Dropdown */}
            <div className="account-dropdown">
              {user ? (
                <>
                  <div className="account-header">
                    <p>Hi, {user.name}</p>
                  </div>
                  <Link to="/profile">Profile</Link>
                  {user.role === 'admin' && <Link to="/admin">Admin</Link>}
                  <button onClick={handleLogout} className="dropdown-logout">Logout</button>
                </>
              ) : (
                <>
                  <Link to="/login" className="btn btn-login-dropdown">Login</Link>
                  <Link to="/register" className="register-link">Create Account</Link>
                </>
              )}
            </div>
          </div>
          <Link to="/cart" className="icon-btn cart-btn" aria-label="Cart">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>
            {totalCartItems > 0 && <span className="cart-count">{totalCartItems}</span>}
          </Link>
        </div>

      </div>
    </nav>
  );
};

export default Navbar;
