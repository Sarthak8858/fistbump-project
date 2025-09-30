import React, { useState } from 'react'
import './Login.css'

const Login = ({ onLogin }) => {
  const [credentials, setCredentials] = useState({ email: '', password: '' })

  const handleSubmit = (e) => {
    e.preventDefault()
    // Demo login - accept any non-empty credentials
    if (credentials.email && credentials.password) {
      onLogin(true)
    } else {
      alert('Please enter email and password')
    }
  }

  const handleDemoLogin = () => {
    setCredentials({ email: 'demo@earthguard.com', password: 'demo123' })
    onLogin(true)
  }

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <div className="logo">
            <i className="fas fa-leaf"></i>
            <h1>EarthGuard</h1>
          </div>
          <p>Sustainable Waste Management</p>
        </div>
        
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={credentials.email}
              onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
              placeholder="Enter your email"
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={credentials.password}
              onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
              placeholder="Enter your password"
              required
            />
          </div>
          
          <button type="submit" className="login-btn">
            Sign In
          </button>
          
          <button type="button" onClick={handleDemoLogin} className="demo-btn">
            Demo Login
          </button>
        </form>
      </div>
    </div>
  )
}

export default Login
