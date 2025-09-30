import React from 'react';
import './styles/Overview.css';

const Overview = ({ onSectionChange }) => {
  const handleNavigation = (section) => {
    if (onSectionChange) {
      onSectionChange(section);
    }
  };

  return (
    <div className="overview-container">
      <div className="quick-actions">
        <h2>Quick Actions</h2>
        <div className="action-cards">
          <div className="action-card">
            <i className="fas fa-search"></i>
            <h3>Item Lookup</h3>
            <p>Find disposal methods for specific items</p>
            <button 
              className="action-btn"
              onClick={() => handleNavigation('disposal-guide')}
            >
              Search Now
            </button>
          </div>
          
          <div className="action-card">
            <i className="fas fa-calendar"></i>
            <h3>Schedule Pickup</h3>
            <p>Book a waste collection pickup</p>
            <button 
              className="action-btn"
              onClick={() => handleNavigation('pickup-schedule')}
            >
              Schedule
            </button>
          </div>
          
          <div className="action-card">
            <i className="fas fa-map-marker-alt"></i>
            <h3>Find Centers</h3>
            <p>Locate nearby recycling centers</p>
            <button 
              className="action-btn"
              onClick={() => handleNavigation('dropoff-centers')}
            >
              Find Centers
            </button>
          </div>
          
          <div className="action-card">
            <i className="fas fa-lightbulb"></i>
            <h3>Upcycling Ideas</h3>
            <p>Creative ways to reuse items</p>
            <button 
              className="action-btn"
              onClick={() => handleNavigation('upcycling-ideas')}
            >
              Explore
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;
