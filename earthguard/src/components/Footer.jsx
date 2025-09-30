import React from 'react'
import './Footer.css'

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <div className="logo">
            <i className="fas fa-leaf"></i>
            <span>EarthGuard</span>
          </div>
          <p>Making waste management sustainable and accessible for everyone.</p>
        </div>
        
        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="#disposal">Disposal Guide</a></li>
            <li><a href="#upcycling">Upcycling Ideas</a></li>
            <li><a href="#centers">Drop-off Centers</a></li>
          </ul>
        </div>
        
        <div className="footer-section">
          <h4>Contact</h4>
          <p>support@earthguard.com</p>
          <p>1-800-EARTH-GUARD</p>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>&copy; 2024 EarthGuard. All rights reserved.</p>
      </div>
    </footer>
  )
}

export default Footer
