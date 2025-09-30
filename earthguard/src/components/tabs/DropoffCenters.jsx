import React, { useState, useEffect } from 'react';
import './styles/DropoffCenters.css';

const DropoffCenters = () => {
  const [centers, setCenters] = useState([]);
  const [filteredCenters, setFilteredCenters] = useState([]);
  const [selectedType, setSelectedType] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [userLocation, setUserLocation] = useState(null);
  const [sortBy, setSortBy] = useState('distance');

  // Sample data - in a real app, this would come from an API
  const dropoffCenters = [
    {
      id: 1,
      name: 'Green Valley Recycling Center',
      address: 'Panchavati, Nashik, Maharashtra 422003',
      phone: '+91 98765 12345',
      email: 'info@greenvalley.com',
      website: 'www.greenvalley.com',
      types: ['recyclables', 'electronics', 'hazardous'],
      hours: {
        weekdays: '9:00 AM - 6:00 PM',
        saturday: '10:00 AM - 4:00 PM',
        sunday: 'Closed'
      },
      rating: 4.5,
      reviews: 127,
      distance: 2.3,
      coordinates: { lat: 19.9975, lng: 73.7898 },
      features: ['Free pickup for large items', 'Certified disposal', 'Environmental certificates'],
      acceptedMaterials: ['Paper', 'Plastic bottles', 'Glass', 'Metals', 'E-waste', 'Batteries']
    },
    {
      id: 2,
      name: 'EcoWaste Solutions',
      address: 'Gangapur Road, Nashik, Maharashtra 422005',
      phone: '+91 87654 32109',
      email: 'contact@ecowaste.in',
      website: 'www.ecowaste.in',
      types: ['organic', 'recyclables'],
      hours: {
        weekdays: '8:00 AM - 7:00 PM',
        saturday: '9:00 AM - 5:00 PM',
        sunday: '10:00 AM - 2:00 PM'
      },
      rating: 4.2,
      reviews: 89,
      distance: 3.7,
      coordinates: { lat: 20.0059, lng: 73.7872 },
      features: ['Composting facility', 'Organic waste processing', 'Educational tours'],
      acceptedMaterials: ['Food scraps', 'Garden waste', 'Paper', 'Cardboard', 'Plastic containers']
    },
    {
      id: 3,
      name: 'Nashik Municipal Collection Point',
      address: 'Mumbai Naka, Nashik, Maharashtra 422001',
      phone: '+91 76543 21098',
      email: 'waste@nashikcorp.gov.in',
      website: 'www.nashikcorporation.in',
      types: ['recyclables', 'furniture', 'textiles'],
      hours: {
        weekdays: '7:00 AM - 5:00 PM',
        saturday: '8:00 AM - 3:00 PM',
        sunday: 'Closed'
      },
      rating: 3.8,
      reviews: 234,
      distance: 1.9,
      coordinates: { lat: 19.9974, lng: 73.7898 },
      features: ['Government facility', 'Free service', 'Bulk collection available'],
      acceptedMaterials: ['Furniture', 'Textiles', 'Large appliances', 'Construction waste']
    },
    {
      id: 4,
      name: 'TechRecycle Hub',
      address: 'MIDC, Ambad, Nashik, Maharashtra 422010',
      phone: '+91 65432 10987',
      email: 'support@techrecycle.com',
      website: 'www.techrecycle.com',
      types: ['electronics', 'hazardous'],
      hours: {
        weekdays: '10:00 AM - 6:00 PM',
        saturday: '11:00 AM - 4:00 PM',
        sunday: 'Closed'
      },
      rating: 4.7,
      reviews: 156,
      distance: 5.2,
      coordinates: { lat: 19.9925, lng: 73.7567 },
      features: ['Data destruction', 'Certified e-waste handling', 'Component refurbishing'],
      acceptedMaterials: ['Computers', 'Phones', 'Tablets', 'TVs', 'Batteries', 'Cables']
    },
    {
      id: 5,
      name: 'Community Green Center',
      address: 'College Road, Nashik, Maharashtra 422004',
      phone: '+91 54321 09876',
      email: 'hello@communitygreen.org',
      website: 'www.communitygreen.org',
      types: ['textiles', 'furniture', 'organic'],
      hours: {
        weekdays: '9:00 AM - 5:00 PM',
        saturday: '10:00 AM - 3:00 PM',
        sunday: '11:00 AM - 2:00 PM'
      },
      rating: 4.1,
      reviews: 92,
      distance: 4.1,
      coordinates: { lat: 20.0023, lng: 73.7821 },
      features: ['Community workshops', 'Upcycling programs', 'Volunteer opportunities'],
      acceptedMaterials: ['Clothes', 'Shoes', 'Books', 'Toys', 'Small furniture', 'Garden waste']
    }
  ];

  useEffect(() => {
    setCenters(dropoffCenters);
    setFilteredCenters(dropoffCenters);
    
    // Get user location (in a real app)
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        (error) => {
          console.log('Location access denied');
        }
      );
    }
  }, []);

  useEffect(() => {
    let filtered = centers;

    // Filter by type
    if (selectedType !== 'all') {
      filtered = filtered.filter(center => center.types.includes(selectedType));
    }

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(center =>
        center.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        center.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
        center.acceptedMaterials.some(material => 
          material.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    }

    // Sort centers
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'distance':
          return a.distance - b.distance;
        case 'rating':
          return b.rating - a.rating;
        case 'name':
          return a.name.localeCompare(b.name);
        default:
          return 0;
      }
    });

    setFilteredCenters(filtered);
  }, [selectedType, searchQuery, sortBy, centers]);

  const wasteTypes = [
    { id: 'all', name: 'All Centers', icon: '🏢' },
    { id: 'recyclables', name: 'Recyclables', icon: '♻️' },
    { id: 'organic', name: 'Organic', icon: '🍎' },
    { id: 'electronics', name: 'Electronics', icon: '📱' },
    { id: 'hazardous', name: 'Hazardous', icon: '⚠️' },
    { id: 'furniture', name: 'Furniture', icon: '🪑' },
    { id: 'textiles', name: 'Textiles', icon: '👕' }
  ];

  const handleGetDirections = (center) => {
    const destination = encodeURIComponent(center.address);
    const url = `https://www.google.com/maps/dir/?api=1&destination=${destination}`;
    window.open(url, '_blank');
  };

  const handleCallCenter = (phone) => {
    window.open(`tel:${phone}`);
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push('⭐');
    }
    if (hasHalfStar) {
      stars.push('⭐');
    }
    
    return stars.join('');
  };

  return (
    <div className="dropoff-container">
      <div className="header-section">
        <h1>📍 Drop-off Centers</h1>
        <p>Find convenient recycling and disposal centers near you in Nashik</p>
      </div>

      <div className="filters-section">
        <div className="search-bar">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            placeholder="Search by name, location, or material type..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="type-filters">
          {wasteTypes.map(type => (
            <button
              key={type.id}
              className={`filter-btn ${selectedType === type.id ? 'active' : ''}`}
              onClick={() => setSelectedType(type.id)}
            >
              <span className="filter-icon">{type.icon}</span>
              {type.name}
            </button>
          ))}
        </div>

        <div className="sort-options">
          <label htmlFor="sortBy">Sort by:</label>
          <select
            id="sortBy"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="distance">Distance</option>
            <option value="rating">Rating</option>
            <option value="name">Name</option>
          </select>
        </div>
      </div>

      <div className="centers-grid">
        {filteredCenters.map(center => (
          <div key={center.id} className="center-card">
            <div className="center-header">
              <div className="center-info">
                <h3>{center.name}</h3>
                <div className="rating-section">
                  <span className="stars">{renderStars(center.rating)}</span>
                  <span className="rating-text">
                    {center.rating} ({center.reviews} reviews)
                  </span>
                </div>
              </div>
              <div className="distance-badge">
                {center.distance} km
              </div>
            </div>

            <div className="center-details">
              <div className="address-section">
                <span className="detail-icon">📍</span>
                <span>{center.address}</span>
              </div>

              <div className="contact-section">
                <div className="contact-item">
                  <span className="detail-icon">📞</span>
                  <a href={`tel:${center.phone}`}>{center.phone}</a>
                </div>
                <div className="contact-item">
                  <span className="detail-icon">📧</span>
                  <a href={`mailto:${center.email}`}>{center.email}</a>
                </div>
                {center.website && (
                  <div className="contact-item">
                    <span className="detail-icon">🌐</span>
                    <a href={`https://${center.website}`} target="_blank" rel="noopener noreferrer">
                      {center.website}
                    </a>
                  </div>
                )}
              </div>

              <div className="hours-section">
                <h4>⏰ Operating Hours</h4>
                <div className="hours-grid">
                  <div className="hours-item">
                    <span>Mon-Fri:</span>
                    <span>{center.hours.weekdays}</span>
                  </div>
                  <div className="hours-item">
                    <span>Saturday:</span>
                    <span>{center.hours.saturday}</span>
                  </div>
                  <div className="hours-item">
                    <span>Sunday:</span>
                    <span>{center.hours.sunday}</span>
                  </div>
                </div>
              </div>

              <div className="materials-section">
                <h4>📦 Accepted Materials</h4>
                <div className="materials-list">
                  {center.acceptedMaterials.map((material, index) => (
                    <span key={index} className="material-tag">{material}</span>
                  ))}
                </div>
              </div>

              <div className="features-section">
                <h4>✨ Special Features</h4>
                <ul className="features-list">
                  {center.features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="center-actions">
              <button
                className="directions-btn"
                onClick={() => handleGetDirections(center)}
              >
                <span className="btn-icon">🗺️</span>
                Get Directions
              </button>
              <button
                className="call-btn"
                onClick={() => handleCallCenter(center.phone)}
              >
                <span className="btn-icon">📞</span>
                Call Now
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredCenters.length === 0 && (
        <div className="no-results">
          <div className="no-results-icon">🔍</div>
          <h3>No centers found</h3>
          <p>Try adjusting your search criteria or filters to find more options.</p>
        </div>
      )}

      <div className="info-section">
        <div className="info-card">
          <h3>💡 Tips for Drop-off Centers</h3>
          <ul className="tips-list">
            <li>Call ahead to confirm accepted materials and current hours</li>
            <li>Clean containers before dropping off recyclables</li>
            <li>Separate different material types before arrival</li>
            <li>Bring proper identification for hazardous waste disposal</li>
            <li>Some centers offer pickup services for large items</li>
            <li>Check for any fees associated with special materials</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DropoffCenters;
