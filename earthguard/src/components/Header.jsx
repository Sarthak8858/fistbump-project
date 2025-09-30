import React from 'react'
import './Header.css'

const Header = ({ onLogout }) => {
  return (
    <header className="header">
      <div className="logo">
        <i className="fas fa-leaf"></i>
        <span>EarthGuard</span>
      </div>
      
      <div className="user-actions">
        <div className="user-profile">
          <i className="fas fa-user-circle"></i>
          <button onClick={onLogout} className="logout-btn">
            <i className="fas fa-sign-out-alt"></i>
          </button>
        </div>
      </div>
    </header>
  )
}

export default Header
