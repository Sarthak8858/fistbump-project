import React from 'react'
import './Menu.css'

const Menu = ({ activeSection, onSectionChange }) => {
  const menuItems = [
    { id: 'overview', icon: 'fas fa-home', label: 'Overview' },
    { id: 'disposal-guide', icon: 'fas fa-book', label: 'Disposal Guide' },
    { id: 'upcycling-ideas', icon: 'fas fa-lightbulb', label: 'Upcycling Ideas' },
    { id: 'pickup-schedule', icon: 'fas fa-calendar', label: 'Pickup Schedule' },
    { id: 'dropoff-centers', icon: 'fas fa-map-marker-alt', label: 'Drop-off Centers' }
  ]

  return (
    <aside className="sidebar">
      <nav className="sidebar-nav">
        {menuItems.map(item => (
          <button
            key={item.id}
            className={`nav-item ${activeSection === item.id ? 'active' : ''}`}
            onClick={() => onSectionChange(item.id)}
          >
            <i className={item.icon}></i>
            <span>{item.label}</span>
          </button>
        ))}
      </nav>
    </aside>
  )
}

export default Menu
