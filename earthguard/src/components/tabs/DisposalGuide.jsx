import React from 'react'
import './styles/DisposalGuide.css'

const DisposalGuide = () => (
  <div className="disposal-guide">
    <div className="section-header">
      <h1>🗑️ Waste Disposal Guide</h1>
      <p>Learn how to properly sort and dispose of different types of waste materials</p>
    </div>

    <div className="guide-grid">
      <div className="waste-category">
        <div className="category-header recyclable">
          <i className="fas fa-recycle"></i>
          <h3>Recyclables</h3>
        </div>
        <div className="category-content">
          <ul className="waste-items">
            <li><i className="fas fa-file-alt"></i> Paper & Cardboard</li>
            <li><i className="fas fa-wine-bottle"></i> Glass Bottles</li>
            <li><i className="fas fa-box"></i> Plastic (Types 1-7)</li>
            <li><i className="fas fa-box-open"></i> Food Containers</li>
          </ul>
          <div className="disposal-tip">
            <i className="fas fa-info-circle"></i>
            <span>Rinse containers and remove labels before recycling</span>
          </div>
        </div>
      </div>

      <div className="waste-category">
        <div className="category-header organic">
          <i className="fas fa-seedling"></i>
          <h3>Organic Waste</h3>
        </div>
        <div className="category-content">
          <ul className="waste-items">
            <li><i className="fas fa-apple-alt"></i> Food Scraps</li>
            <li><i className="fas fa-leaf"></i> Garden Waste</li>
            <li><i className="fas fa-egg"></i> Eggshells</li>
            <li><i className="fas fa-mug-hot"></i> Coffee Grounds</li>
          </ul>
          <div className="disposal-tip">
            <i className="fas fa-info-circle"></i>
            <span>Store in a sealed container to prevent odors</span>
          </div>
        </div>
      </div>

      <div className="waste-category">
        <div className="category-header hazardous">
          <i className="fas fa-exclamation-triangle"></i>
          <h3>Hazardous Waste</h3>
        </div>
        <div className="category-content">
          <ul className="waste-items">
            <li><i className="fas fa-fill-drip"></i> Paint & Solvents</li>
            <li><i className="fas fa-pills"></i> Medications</li>
            <li><i className="fas fa-car-battery"></i> Car Batteries</li>
            <li><i className="fas fa-spray-can"></i> Aerosol Cans</li>
          </ul>
          <div className="disposal-tip">
            <i className="fas fa-info-circle"></i>
            <span>Take to designated collection facilities only</span>
          </div>
        </div>
      </div>

      <div className="waste-category">
        <div className="category-header electronic">
          <i className="fas fa-microchip"></i>
          <h3>E-Waste</h3>
        </div>
        <div className="category-content">
          <ul className="waste-items">
            <li><i className="fas fa-mobile-alt"></i> Phones & Tablets</li>
            <li><i className="fas fa-desktop"></i> Electronics</li>
            <li><i className="fas fa-battery-full"></i> Batteries</li>
            <li><i className="fas fa-plug"></i> Cables & Chargers</li>
          </ul>
          <div className="disposal-tip">
            <i className="fas fa-info-circle"></i>
            <span>Back up and wipe personal data before disposal</span>
          </div>
        </div>
      </div>
    </div>
  </div>
)

export default DisposalGuide
