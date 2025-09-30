import React, { useState } from 'react';
import './styles/UpcyclingIdeas.css';

const UpcyclingIdeas = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [favorites, setFavorites] = useState([]);

  const upcyclingProjects = [
    {
      id: 1,
      title: "Plastic Bottle Planters",
      category: "plastic",
      difficulty: "Easy",
      time: "30 mins",
      materials: ["Plastic bottles", "Scissors", "Paint", "Soil", "Seeds"],
      instructions: [
        "Clean plastic bottles thoroughly",
        "Cut bottle in half, keep bottom part",
        "Paint with eco-friendly paint",
        "Add drainage holes",
        "Fill with soil and plant seeds"
      ],
      image: "🪴",
      impact: "Reduces plastic waste by 1 bottle per planter"
    },
    {
      id: 2,
      title: "Cardboard Storage Boxes",
      category: "cardboard",
      difficulty: "Medium",
      time: "45 mins",
      materials: ["Cardboard boxes", "Fabric", "Glue", "Scissors", "Ruler"],
      instructions: [
        "Reinforce cardboard box corners",
        "Measure and cut fabric to size",
        "Apply fabric with eco-friendly glue",
        "Add decorative elements",
        "Create labels for organization"
      ],
      image: "📦",
      impact: "Saves cardboard from landfill and creates storage solution"
    },
    {
      id: 3,
      title: "Glass Jar Lighting",
      category: "glass",
      difficulty: "Medium",
      time: "1 hour",
      materials: ["Glass jars", "LED string lights", "Wire", "Drill", "Paint"],
      instructions: [
        "Clean glass jars completely",
        "Drill small hole in jar lid",
        "Thread LED lights through hole",
        "Paint jar if desired",
        "Hang or place as ambient lighting"
      ],
      image: "💡",
      impact: "Repurposes glass jars and reduces electronic waste"
    },
    {
      id: 4,
      title: "Tire Garden Furniture",
      category: "rubber",
      difficulty: "Hard",
      time: "2 hours",
      materials: ["Old tires", "Rope", "Cushions", "Paint", "Drill"],
      instructions: [
        "Clean tires thoroughly",
        "Paint with weather-resistant paint",
        "Wrap with rope for texture",
        "Add cushions for seating",
        "Secure all components safely"
      ],
      image: "🪑",
      impact: "Prevents tire waste and creates durable furniture"
    }
  ];

  const categories = [
    { id: 'all', name: 'All Projects', icon: '🔄' },
    { id: 'plastic', name: 'Plastic', icon: '🥤' },
    { id: 'cardboard', name: 'Cardboard', icon: '📦' },
    { id: 'glass', name: 'Glass', icon: '🫙' },
    { id: 'rubber', name: 'Rubber', icon: '🛞' }
  ];

  const filteredProjects = selectedCategory === 'all' 
    ? upcyclingProjects 
    : upcyclingProjects.filter(project => project.category === selectedCategory);

  const toggleFavorite = (id) => {
    setFavorites(prev => 
      prev.includes(id) 
        ? prev.filter(fav => fav !== id)
        : [...prev, id]
    );
  };

  const getDifficultyColor = (difficulty) => {
    switch(difficulty) {
      case 'Easy': return '#4CAF50';
      case 'Medium': return '#FF9800';
      case 'Hard': return '#F44336';
      default: return '#757575';
    }
  };

  return (
    <div className="upcycling-container">
      <div className="header-section">
        <h1>♻️ Creative Upcycling Ideas</h1>
        <p>Transform waste into wonderful creations and reduce your environmental footprint</p>
      </div>

      <div className="category-filter">
        {categories.map(category => (
          <button
            key={category.id}
            className={`filter-btn ${selectedCategory === category.id ? 'active' : ''}`}
            onClick={() => setSelectedCategory(category.id)}
          >
            <span className="category-icon">{category.icon}</span>
            {category.name}
          </button>
        ))}
      </div>

      <div className="projects-grid">
        {filteredProjects.map(project => (
          <div key={project.id} className="project-card">
            <div className="project-header">
              <div className="project-emoji">{project.image}</div>
              <button
                className={`favorite-btn ${favorites.includes(project.id) ? 'active' : ''}`}
                onClick={() => toggleFavorite(project.id)}
              >
                ❤️
              </button>
            </div>
            
            <h3>{project.title}</h3>
            
            <div className="project-meta">
              <span 
                className="difficulty"
                style={{ color: getDifficultyColor(project.difficulty) }}
              >
                {project.difficulty}
              </span>
              <span className="time">⏱️ {project.time}</span>
            </div>

            <div className="materials-section">
              <h4>Materials Needed:</h4>
              <ul className="materials-list">
                {project.materials.map((material, index) => (
                  <li key={index}>{material}</li>
                ))}
              </ul>
            </div>

            <div className="instructions-section">
              <h4>Instructions:</h4>
              <ol className="instructions-list">
                {project.instructions.map((step, index) => (
                  <li key={index}>{step}</li>
                ))}
              </ol>
            </div>

            <div className="impact-section">
              <div className="impact-badge">
                <span className="impact-icon">🌱</span>
                <span className="impact-text">{project.impact}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredProjects.length === 0 && (
        <div className="no-results">
          <p>No projects found for this category. Try selecting a different category!</p>
        </div>
      )}
    </div>
  );
};

export default UpcyclingIdeas;
