import React from 'react';
import '../styles/static.css';

const ReturnPolicy = () => {
  return (
    <div className="static-page container">
      <div className="static-container">
        <div className="static-header">
          <h1>Return & Refund Policy</h1>
          <p>Everything you need to know about returns.</p>
        </div>
        
        <div className="static-content">
          <p>
            At ShopNest, we proudly stand behind the quality of our merchandise. If for any reason you are completely dissatisfied with your purchase, you may securely initiate a return within 30 days of receiving your order.
          </p>

          <h3>1. Eligibility for Returns</h3>
          <p>
            To be eligible for a return, the item must be completely unused, housed in the same absolute condition that it was received, and maintained within its original factory packaging. Receipts or proof of purchase mappings are strictly required.
          </p>

          <h3>2. Refund Processing</h3>
          <p>
            Once your return is physically received and internally inspected, an immediate email protocol will fire notifying you of the approval status. Approved refunds will cleanly propagate to your original designated Razorpay gateway endpoint within 5-7 business working days naturally.
          </p>

          <h3>3. Exempted Output Goods</h3>
          <p>
            Certain explicit categories such as perishable items, custom software, digital media, or physically tampered items are heavily restricted and do not qualify for any standard refund sequence.
          </p>

          <h3>4. Shipping Transit Costs</h3>
          <p>
            You will actively remain strictly responsible for covering your own outbound logistical shipping rates associated with returning the item. Restocking fees may conditionally apply.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ReturnPolicy;
