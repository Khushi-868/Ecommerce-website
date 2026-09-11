import React from 'react';
import '../styles/static.css';

const Disclaimer = () => {
  return (
    <div className="static-page container">
      <div className="static-container">
        <div className="static-header">
          <h1>Legal & Site Disclaimer</h1>
          <p>Please read our legal information.</p>
        </div>
        
        <div className="static-content">
          <p>
            The data, interfaces, and graphical components represented across the ShopNest domain strictly act uniquely as an educational development platform. This codebase models rigorous application structures and architectures for purely demonstrative, portfolio-oriented engineering usage.
          </p>

          <h3>1. Accuracy of Materials</h3>
          <p>
            The materials spanning the ShopNest interface may heavily include dynamic technical, typographical, or dummy photographic elements. Product matrices mapped in the DB pipeline do absolutely not correlate to strictly real physical outputs and are safely populated via generic Unsplash imagery protocols.
          </p>

          <h3>2. Payment Processing Restrictions</h3>
          <p>
            No authentic financial variables are handled natively within this environment. All payment endpoints forcefully bind exclusively to external testing-based networks (Sandbox Razorpay environments). No exact deductibles exist.
          </p>

          <h3>3. External Binding Links</h3>
          <p>
            ShopNest operates completely independent domains and takes strictly zero absolute parameter responsibility over the specific contents or behaviors populated via external routing anchors generated implicitly by third-party configurations. 
          </p>

          <p style={{ marginTop: '30px', fontStyle: 'italic' }}>
            By interacting natively within this codebase, you unconditionally signal acceptance bounded by these parameters efficiently.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Disclaimer;
