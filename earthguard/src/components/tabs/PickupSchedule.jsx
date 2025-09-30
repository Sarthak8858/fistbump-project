import React, { useState } from 'react';
import './styles/PickupSchedule.css';

const PickupSchedule = () => {
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [wasteTypes, setWasteTypes] = useState([]);
  const [address, setAddress] = useState('');
  const [specialInstructions, setSpecialInstructions] = useState('');
  const [scheduledPickups, setScheduledPickups] = useState([
    {
      id: 1,
      date: '2025-10-02',
      time: '09:00',
      types: ['Recyclables', 'Organic'],
      status: 'Scheduled',
      address: '123 Green Street, Nashik'
    },
    {
      id: 2,
      date: '2025-09-25',
      time: '14:30',
      types: ['Electronics'],
      status: 'Completed',
      address: '123 Green Street, Nashik'
    }
  ]);

  const availableWasteTypes = [
    { id: 'recyclables', name: 'Recyclables', icon: '♻️', description: 'Paper, plastic, glass, metal' },
    { id: 'organic', name: 'Organic Waste', icon: '🍎', description: 'Food scraps, garden waste' },
    { id: 'electronics', name: 'Electronics', icon: '📱', description: 'Phones, computers, appliances' },
    { id: 'hazardous', name: 'Hazardous', icon: '⚠️', description: 'Batteries, chemicals, paint' },
    { id: 'furniture', name: 'Furniture', icon: '🪑', description: 'Large items, mattresses' },
    { id: 'textiles', name: 'Textiles', icon: '👕', description: 'Clothes, shoes, fabrics' }
  ];

  const timeSlots = [
    '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00'
  ];

  const handleWasteTypeToggle = (typeId) => {
    setWasteTypes(prev => 
      prev.includes(typeId)
        ? prev.filter(id => id !== typeId)
        : [...prev, typeId]
    );
  };

  const handleSchedulePickup = (e) => {
    e.preventDefault();
    if (!selectedDate || !selectedTime || wasteTypes.length === 0 || !address) {
      alert('Please fill in all required fields');
      return;
    }

    const newPickup = {
      id: Date.now(),
      date: selectedDate,
      time: selectedTime,
      types: wasteTypes.map(id => availableWasteTypes.find(type => type.id === id)?.name),
      status: 'Scheduled',
      address: address,
      specialInstructions: specialInstructions
    };

    setScheduledPickups(prev => [newPickup, ...prev]);
    
    // Reset form
    setSelectedDate('');
    setSelectedTime('');
    setWasteTypes([]);
    setAddress('');
    setSpecialInstructions('');
    
    alert('Pickup scheduled successfully!');
  };

  const handleCancelPickup = (id) => {
    if (window.confirm('Are you sure you want to cancel this pickup?')) {
      setScheduledPickups(prev => prev.filter(pickup => pickup.id !== id));
    }
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'Scheduled': return '#2196F3';
      case 'Completed': return '#4CAF50';
      case 'Cancelled': return '#f44336';
      default: return '#757575';
    }
  };

  const getMinDate = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  };

  return (
    <div className="pickup-container">
      <div className="header-section">
        <h1>🚛 Schedule Waste Pickup</h1>
        <p>Book convenient pickup slots for different types of waste from your location</p>
      </div>

      <div className="content-grid">
        <div className="schedule-form-container">
          <div className="form-card">
            <h2>Schedule New Pickup</h2>
            <form onSubmit={handleSchedulePickup} className="pickup-form">
              <div className="form-group">
                <label htmlFor="address">
                  <span className="label-icon">📍</span>
                  Pickup Address *
                </label>
                <textarea
                  id="address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Enter your complete address..."
                  required
                  rows="3"
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="date">
                    <span className="label-icon">📅</span>
                    Pickup Date *
                  </label>
                  <input
                    type="date"
                    id="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    min={getMinDate()}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="time">
                    <span className="label-icon">⏰</span>
                    Time Slot *
                  </label>
                  <select
                    id="time"
                    value={selectedTime}
                    onChange={(e) => setSelectedTime(e.target.value)}
                    required
                  >
                    <option value="">Select time...</option>
                    {timeSlots.map(time => (
                      <option key={time} value={time}>{time}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label>
                  <span className="label-icon">🗂️</span>
                  Waste Types * (Select all that apply)
                </label>
                <div className="waste-types-grid">
                  {availableWasteTypes.map(type => (
                    <div
                      key={type.id}
                      className={`waste-type-option ${wasteTypes.includes(type.id) ? 'selected' : ''}`}
                      onClick={() => handleWasteTypeToggle(type.id)}
                    >
                      <div className="waste-type-icon">{type.icon}</div>
                      <div className="waste-type-info">
                        <h4>{type.name}</h4>
                        <p>{type.description}</p>
                      </div>
                      <div className="selection-indicator">
                        {wasteTypes.includes(type.id) && '✓'}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="instructions">
                  <span className="label-icon">📝</span>
                  Special Instructions (Optional)
                </label>
                <textarea
                  id="instructions"
                  value={specialInstructions}
                  onChange={(e) => setSpecialInstructions(e.target.value)}
                  placeholder="Any specific instructions for the pickup team..."
                  rows="3"
                />
              </div>

              <button type="submit" className="schedule-btn">
                <span className="btn-icon">📅</span>
                Schedule Pickup
              </button>
            </form>
          </div>
        </div>

        <div className="scheduled-pickups-container">
          <div className="pickups-card">
            <h2>Your Scheduled Pickups</h2>
            
            {scheduledPickups.length === 0 ? (
              <div className="no-pickups">
                <div className="no-pickups-icon">📭</div>
                <p>No pickups scheduled yet</p>
                <p>Schedule your first pickup using the form!</p>
              </div>
            ) : (
              <div className="pickups-list">
                {scheduledPickups.map(pickup => (
                  <div key={pickup.id} className="pickup-item">
                    <div className="pickup-header">
                      <div className="pickup-date-time">
                        <span className="pickup-date">{new Date(pickup.date).toLocaleDateString()}</span>
                        <span className="pickup-time">{pickup.time}</span>
                      </div>
                      <div 
                        className="pickup-status"
                        style={{ color: getStatusColor(pickup.status) }}
                      >
                        {pickup.status}
                      </div>
                    </div>
                    
                    <div className="pickup-details">
                      <div className="pickup-address">
                        <span className="detail-icon">📍</span>
                        {pickup.address}
                      </div>
                      
                      <div className="pickup-types">
                        <span className="detail-icon">🗂️</span>
                        <div className="types-list">
                          {pickup.types.map((type, index) => (
                            <span key={index} className="type-tag">{type}</span>
                          ))}
                        </div>
                      </div>
                      
                      {pickup.specialInstructions && (
                        <div className="pickup-instructions">
                          <span className="detail-icon">📝</span>
                          {pickup.specialInstructions}
                        </div>
                      )}
                    </div>
                    
                    {pickup.status === 'Scheduled' && (
                      <div className="pickup-actions">
                        <button 
                          className="cancel-btn"
                          onClick={() => handleCancelPickup(pickup.id)}
                        >
                          Cancel Pickup
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="pickup-info-card">
            <h3>📋 Pickup Guidelines</h3>
            <ul className="guidelines-list">
              <li>Ensure all items are properly sorted before pickup</li>
              <li>Place waste outside your door 30 minutes before scheduled time</li>
              <li>Hazardous waste requires special handling - extra charges may apply</li>
              <li>Large furniture items need advance notice for equipment</li>
              <li>You'll receive SMS confirmations for all scheduled pickups</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PickupSchedule;
