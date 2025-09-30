import React, { useState } from 'react';
import './styles/Settings.css';

const Settings = () => {
  const [settings, setSettings] = useState({
    // Profile Settings
    name: 'John Doe',
    email: 'john.doe@email.com',
    phone: '+91 98765 43210',
    address: '123 Green Street, Nashik, Maharashtra',
    
    // Notification Settings
    emailNotifications: true,
    smsNotifications: true,
    pushNotifications: false,
    pickupReminders: true,
    weeklyReports: true,
    
    // Preference Settings
    preferredPickupTime: 'morning',
    defaultWasteTypes: ['recyclables', 'organic'],
    language: 'english',
    theme: 'light',
    measurementUnit: 'kg'
  });

  const [activeTab, setActiveTab] = useState('profile');
  const [showSaveMessage, setShowSaveMessage] = useState(false);

  const handleInputChange = (field, value) => {
    setSettings(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleArrayToggle = (field, value) => {
    setSettings(prev => ({
      ...prev,
      [field]: prev[field].includes(value)
        ? prev[field].filter(item => item !== value)
        : [...prev[field], value]
    }));
  };

  const handleSaveSettings = () => {
    // In a real app, this would save to backend
    setShowSaveMessage(true);
    setTimeout(() => setShowSaveMessage(false), 3000);
  };

  const handleExportData = () => {
    const dataStr = JSON.stringify(settings, null, 2);
    const dataBlob = new Blob([dataStr], {type: 'application/json'});
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'earthguard-settings.json';
    link.click();
  };

  const tabs = [
    { id: 'profile', name: 'Profile', icon: '👤' },
    { id: 'notifications', name: 'Notifications', icon: '🔔' },
    { id: 'preferences', name: 'Preferences', icon: '⚙️' },
    { id: 'privacy', name: 'Privacy & Data', icon: '🔒' }
  ];

  const wasteTypeOptions = [
    { id: 'recyclables', name: 'Recyclables', icon: '♻️' },
    { id: 'organic', name: 'Organic Waste', icon: '🍎' },
    { id: 'electronics', name: 'Electronics', icon: '📱' },
    { id: 'hazardous', name: 'Hazardous', icon: '⚠️' },
    { id: 'furniture', name: 'Furniture', icon: '🪑' },
    { id: 'textiles', name: 'Textiles', icon: '👕' }
  ];

  return (
    <div className="settings-container">
      <div className="header-section">
        <h1>⚙️ Settings</h1>
        <p>Customize your EarthGuard experience and manage your account preferences</p>
      </div>

      {showSaveMessage && (
        <div className="save-message">
          <span className="save-icon">✅</span>
          Settings saved successfully!
        </div>
      )}

      <div className="settings-layout">
        <div className="settings-tabs">
          {tabs.map(tab => (
            <button
              key={tab.id}
              className={`tab-button ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              <span className="tab-icon">{tab.icon}</span>
              {tab.name}
            </button>
          ))}
        </div>

        <div className="settings-content">
          {activeTab === 'profile' && (
            <div className="settings-section">
              <h2>👤 Profile Information</h2>
              <div className="form-grid">
                <div className="form-group">
                  <label>Full Name</label>
                  <input
                    type="text"
                    value={settings.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    placeholder="Enter your full name"
                  />
                </div>
                
                <div className="form-group">
                  <label>Email Address</label>
                  <input
                    type="email"
                    value={settings.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    placeholder="Enter your email"
                  />
                </div>
                
                <div className="form-group">
                  <label>Phone Number</label>
                  <input
                    type="tel"
                    value={settings.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    placeholder="Enter your phone number"
                  />
                </div>
                
                <div className="form-group full-width">
                  <label>Address</label>
                  <textarea
                    value={settings.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                    placeholder="Enter your complete address"
                    rows="3"
                  />
                </div>
              </div>
              
              <div className="profile-actions">
                <button className="secondary-btn">Change Password</button>
                <button className="secondary-btn">Upload Profile Picture</button>
              </div>
            </div>
          )}

          {activeTab === 'notifications' && (
            <div className="settings-section">
              <h2>🔔 Notification Preferences</h2>
              <div className="notification-settings">
                <div className="notification-group">
                  <h3>Communication Channels</h3>
                  <div className="toggle-options">
                    <div className="toggle-item">
                      <div className="toggle-info">
                        <span className="toggle-icon">📧</span>
                        <div>
                          <h4>Email Notifications</h4>
                          <p>Receive updates via email</p>
                        </div>
                      </div>
                      <label className="toggle-switch">
                        <input
                          type="checkbox"
                          checked={settings.emailNotifications}
                          onChange={(e) => handleInputChange('emailNotifications', e.target.checked)}
                        />
                        <span className="slider"></span>
                      </label>
                    </div>
                    
                    <div className="toggle-item">
                      <div className="toggle-info">
                        <span className="toggle-icon">📱</span>
                        <div>
                          <h4>SMS Notifications</h4>
                          <p>Receive text messages for important updates</p>
                        </div>
                      </div>
                      <label className="toggle-switch">
                        <input
                          type="checkbox"
                          checked={settings.smsNotifications}
                          onChange={(e) => handleInputChange('smsNotifications', e.target.checked)}
                        />
                        <span className="slider"></span>
                      </label>
                    </div>
                    
                    <div className="toggle-item">
                      <div className="toggle-info">
                        <span className="toggle-icon">🔔</span>
                        <div>
                          <h4>Push Notifications</h4>
                          <p>Browser push notifications</p>
                        </div>
                      </div>
                      <label className="toggle-switch">
                        <input
                          type="checkbox"
                          checked={settings.pushNotifications}
                          onChange={(e) => handleInputChange('pushNotifications', e.target.checked)}
                        />
                        <span className="slider"></span>
                      </label>
                    </div>
                  </div>
                </div>
                
                <div className="notification-group">
                  <h3>Content Preferences</h3>
                  <div className="toggle-options">
                    <div className="toggle-item">
                      <div className="toggle-info">
                        <span className="toggle-icon">🚛</span>
                        <div>
                          <h4>Pickup Reminders</h4>
                          <p>Get reminded before scheduled pickups</p>
                        </div>
                      </div>
                      <label className="toggle-switch">
                        <input
                          type="checkbox"
                          checked={settings.pickupReminders}
                          onChange={(e) => handleInputChange('pickupReminders', e.target.checked)}
                        />
                        <span className="slider"></span>
                      </label>
                    </div>
                    
                    <div className="toggle-item">
                      <div className="toggle-info">
                        <span className="toggle-icon">📊</span>
                        <div>
                          <h4>Weekly Reports</h4>
                          <p>Receive weekly waste analytics</p>
                        </div>
                      </div>
                      <label className="toggle-switch">
                        <input
                          type="checkbox"
                          checked={settings.weeklyReports}
                          onChange={(e) => handleInputChange('weeklyReports', e.target.checked)}
                        />
                        <span className="slider"></span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'preferences' && (
            <div className="settings-section">
              <h2>⚙️ App Preferences</h2>
              <div className="preferences-grid">
                <div className="preference-group">
                  <label>Preferred Pickup Time</label>
                  <select
                    value={settings.preferredPickupTime}
                    onChange={(e) => handleInputChange('preferredPickupTime', e.target.value)}
                  >
                    <option value="morning">Morning (9 AM - 12 PM)</option>
                    <option value="afternoon">Afternoon (12 PM - 5 PM)</option>
                    <option value="evening">Evening (5 PM - 8 PM)</option>
                  </select>
                </div>
                
                <div className="preference-group">
                  <label>Language</label>
                  <select
                    value={settings.language}
                    onChange={(e) => handleInputChange('language', e.target.value)}
                  >
                    <option value="english">English</option>
                    <option value="hindi">हिंदी (Hindi)</option>
                    <option value="marathi">मराठी (Marathi)</option>
                  </select>
                </div>
                
                <div className="preference-group">
                  <label>Theme</label>
                  <select
                    value={settings.theme}
                    onChange={(e) => handleInputChange('theme', e.target.value)}
                  >
                    <option value="light">Light</option>
                    <option value="dark">Dark</option>
                    <option value="auto">Auto (System)</option>
                  </select>
                </div>
                
                <div className="preference-group">
                  <label>Measurement Unit</label>
                  <select
                    value={settings.measurementUnit}
                    onChange={(e) => handleInputChange('measurementUnit', e.target.value)}
                  >
                    <option value="kg">Kilograms (kg)</option>
                    <option value="lbs">Pounds (lbs)</option>
                  </select>
                </div>
              </div>
              
              <div className="preference-group">
                <label>Default Waste Types for Quick Selection</label>
                <div className="waste-types-selection">
                  {wasteTypeOptions.map(type => (
                    <div
                      key={type.id}
                      className={`waste-type-chip ${settings.defaultWasteTypes.includes(type.id) ? 'selected' : ''}`}
                      onClick={() => handleArrayToggle('defaultWasteTypes', type.id)}
                    >
                      <span className="chip-icon">{type.icon}</span>
                      {type.name}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'privacy' && (
            <div className="settings-section">
              <h2>🔒 Privacy & Data Management</h2>
              <div className="privacy-sections">
                <div className="privacy-group">
                  <h3>Data Export & Backup</h3>
                  <p>Download your data or create backups of your information</p>
                  <div className="action-buttons">
                    <button className="secondary-btn" onClick={handleExportData}>
                      📥 Export My Data
                    </button>
                    <button className="secondary-btn">
                      ☁️ Backup to Cloud
                    </button>
                  </div>
                </div>
                
                <div className="privacy-group">
                  <h3>Data Sharing</h3>
                  <div className="toggle-options">
                    <div className="toggle-item">
                      <div className="toggle-info">
                        <div>
                          <h4>Anonymous Analytics</h4>
                          <p>Help improve the app by sharing anonymous usage data</p>
                        </div>
                      </div>
                      <label className="toggle-switch">
                        <input type="checkbox" defaultChecked />
                        <span className="slider"></span>
                      </label>
                    </div>
                    
                    <div className="toggle-item">
                      <div className="toggle-info">
                        <div>
                          <h4>Location Data</h4>
                          <p>Share location for better pickup route optimization</p>
                        </div>
                      </div>
                      <label className="toggle-switch">
                        <input type="checkbox" defaultChecked />
                        <span className="slider"></span>
                      </label>
                    </div>
                  </div>
                </div>
                
                <div className="privacy-group danger-zone">
                  <h3>Account Management</h3>
                  <p>Manage your account data and deletion preferences</p>
                  <div className="action-buttons">
                    <button className="secondary-btn">
                      🗑️ Clear App Data
                    </button>
                    <button className="danger-btn">
                      ⚠️ Delete Account
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="settings-actions">
            <button className="secondary-btn">Reset to Defaults</button>
            <button className="primary-btn" onClick={handleSaveSettings}>
              Save Settings
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
