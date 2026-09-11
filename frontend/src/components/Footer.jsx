import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container container">
        
        <div className="footer-top">
          <div className="footer-brand-col">
            <Link to="/" className="footer-brand">ShopNest</Link>
            <p>Everyday style, made better. Premium casual wear for your daily rotation.</p>
            <div className="social-links">
              <a href="#" aria-label="Instagram">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
              </a>
              <a href="#" aria-label="Twitter">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path></svg>
              </a>
              <a href="#" aria-label="Facebook">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
              </a>
            </div>
          </div>
          
          <div className="footer-links-col">
            <h4>SHOP</h4>
            <ul>
              <li><Link to="/shop">All Products</Link></li>
              <li><Link to="/shop?collection=new-arrivals">New Arrivals</Link></li>
              <li><Link to="/shop?collection=best-sellers">Best Sellers</Link></li>
              <li><Link to="/shop?category=t-shirts">T-Shirts</Link></li>
              <li><Link to="/shop?category=hoodies">Hoodies</Link></li>
              <li><Link to="/shop?category=bottom-wear">Bottom Wear</Link></li>
            </ul>
          </div>
          
          <div className="footer-links-col">
            <h4>CUSTOMER CARE</h4>
            <ul>
              <li><Link to="/contact">Contact Us</Link></li>
              <li><Link to="/shipping">Shipping</Link></li>
              <li><Link to="/return">Returns</Link></li>
              <li><Link to="/faq">FAQ</Link></li>
            </ul>
          </div>
          
          <div className="footer-links-col">
            <h4>ABOUT</h4>
            <ul>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/privacy">Privacy Policy</Link></li>
              <li><Link to="/terms">Terms</Link></li>
              <li><Link to="/disclaimer">Disclaimer</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="footer-bottom">
          <div className="copyright">
            &copy; {new Date().getFullYear()} ShopNest. All rights reserved.
          </div>
          <div className="payment-methods">
            <span>Visa</span>
            <span>Mastercard</span>
            <span>Amex</span>
            <span>PayPal</span>
          </div>
        </div>
        
      </div>
    </footer>
  );
};

export default Footer;
