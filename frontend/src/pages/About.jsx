import React from 'react';
import '../styles/static.css';

const About = () => {
  return (
    <div className="static-page container">
      <div className="static-container">
        <div className="about-author">
          <img
            src="/dp.jpg"
            alt="@theshivanshvasu"
          />
          <h2>Shivansh Vasu</h2>
          <p>@theshivanshvasu</p>
        </div>

        <div className="static-content" style={{ textAlign: 'center' }}>
          <p style={{ fontSize: '18px', maxWidth: '600px', margin: '0 auto 30px auto', color: 'var(--text-primary)' }}>
            <strong>Join the community and grow together!</strong> Welcome to my platform where we build, deploy, and scale highly engineered systems.
          </p>

          <div className="social-grid">
            <a href="https://theshivanshvasu.com" target="_blank" rel="noreferrer" className="social-btn">🌐 Website</a>
            <a href="https://youtube.com/@shivanshvasu" target="_blank" rel="noreferrer" className="social-btn" style={{color: '#ef4444', borderColor: '#ef4444'}}>📺 YouTube</a>
            <a href="https://instagram.com/theshivanshvasuofficial" target="_blank" rel="noreferrer" className="social-btn" style={{color: '#ec4899', borderColor: '#ec4899'}}>📸 Instagram</a>
            <a href="https://www.linkedin.com/in/theshivanshvasu" target="_blank" rel="noreferrer" className="social-btn" style={{color: '#3b82f6', borderColor: '#3b82f6'}}>💼 LinkedIn</a>
            <a href="https://x.com/theshivanshvasu" target="_blank" rel="noreferrer" className="social-btn">✖️ X (Twitter)</a>
            <a href="https://whatsapp.com/channel/0029VbAWGE5ICVfcjjKTAS0B" target="_blank" rel="noreferrer" className="social-btn" style={{color: '#10b981', borderColor: '#10b981'}}>💬 WhatsApp</a>
            <a href="https://linktr.ee/shivanshvasu" target="_blank" rel="noreferrer" className="social-btn">🔗 Linktree</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
