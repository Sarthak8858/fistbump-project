import React, { useState, useRef, useEffect } from 'react'
import Header from '../components/Header'
import Menu from '../components/Menu'
import Footer from '../components/Footer'
import Overview from '../components/tabs/Overview'
import DisposalGuide from '../components/tabs/DisposalGuide'
import UpcyclingIdeas from '../components/tabs/UpcyclingIdeas'
import PickupSchedule from '../components/tabs/PickupSchedule'
import DropoffCenters from '../components/tabs/DropoffCenters'
import AskEcoFriend from '../components/AskEcoFriend'
import './Dashboard.css'


const Dashboard = ({ onLogout }) => {
  const [activeSection, setActiveSection] = useState('overview')
  const [isAiChatOpen, setIsAiChatOpen] = useState(false)
  const [position, setPosition] = useState({ x: 20, y: window.innerHeight - 100 })
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })
  const botRef = useRef(null)

  const handleMouseDown = (e) => {
    setIsDragging(true)
    setDragStart({
      x: e.clientX - position.x,
      y: e.clientY - position.y
    })
  }

  const handleMouseMove = (e) => {
    if (isDragging) {
      setPosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y
      })
    }
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove)
      window.addEventListener('mouseup', handleMouseUp)
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseup', handleMouseUp)
    }
  }, [isDragging, dragStart])

  const renderContent = () => {
    switch (activeSection) {
      case 'overview':
        return <Overview onSectionChange={setActiveSection} />
      case 'disposal-guide':
        return <DisposalGuide />
      case 'upcycling-ideas':
        return <UpcyclingIdeas />
      case 'pickup-schedule':
        return <PickupSchedule />
      case 'dropoff-centers':
        return <DropoffCenters />
      default:
        return <Overview onSectionChange={setActiveSection} />
    }
  }

  return (
    <div className="dashboard-container">
      <Header onLogout={onLogout} />
      <div className="dashboard-content">
        <Menu activeSection={activeSection} onSectionChange={setActiveSection} />
        <main className="main-content">
          {renderContent()}
        </main>
      </div>
      <button 
        ref={botRef}
        className="ai-bot-button"
        onClick={() => !isDragging && setIsAiChatOpen(true)}
        onMouseDown={handleMouseDown}
        style={{
          transform: 'none',
          right: 'auto',
          bottom: 'auto',
          position: 'fixed',
          left: position.x,
          top: position.y
        }}
      >
        <i className="fas fa-robot"></i>
        <span className="ai-bot-label">Ask EcoFrd</span>
      </button>
      {isAiChatOpen && (
        <div className="ai-chat-modal" onClick={() => setIsAiChatOpen(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <button 
              className="close-modal"
              onClick={() => setIsAiChatOpen(false)}
            >
              <i className="fas fa-times"></i>
            </button>
            <AskEcoFriend />
          </div>
        </div>
      )}
      <Footer />
    </div>
  )
}

export default Dashboard
