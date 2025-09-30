import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { generateResponse } from '../services/geminiApi';
import './AskEcoFriend.css';

const SUGGESTED_QUESTIONS = [
  {
    question: "How do I properly recycle electronics?",
    tag: "E-Waste"
  },
  {
    question: "What items can be composted at home?",
    tag: "Composting"
  },
  {
    question: "How to reduce plastic waste in daily life?",
    tag: "Plastic"
  },
  {
    question: "What are the best practices for recycling paper?",
    tag: "Paper"
  },
  {
    question: "How to dispose of hazardous materials safely?",
    tag: "Hazardous"
  }
];

const AskEcoFriend = () => {
  const [question, setQuestion] = useState('');
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const askQuestion = async (questionText) => {
    if (isLoading) return;

    setMessages(prev => [...prev, { type: 'user', content: questionText }]);
    setIsLoading(true);

    try {
      const aiResponse = await generateResponse(questionText);
      if (aiResponse) {
        setMessages(prev => [...prev, { type: 'ai', content: aiResponse }]);
      }
    } catch (error) {
      setMessages(prev => [...prev, {
        type: 'ai',
        content: "I apologize, but I'm having trouble connecting. Please try asking about waste management, recycling, or sustainability topics.",
        error: true
      }]);
    } finally {
      setIsLoading(false);
      setQuestion('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!question.trim()) return;
    await askQuestion(question);
  };

  return (
    <div className="eco-friend-container">
      <div className="chat-header">
        <div className="ai-avatar">🌱</div>
        <div className="ai-info">
          <h1>Ask EcoFriend</h1>
          <p>Your AI assistant for sustainable living</p>
        </div>
      </div>

      <div className="chat-messages">
        {messages.length === 0 && (
          <div className="faq-section">
            <h3>Suggested Questions</h3>
            <div className="faq-grid">
              {SUGGESTED_QUESTIONS.map((faq, index) => (
                <button
                  key={index}
                  className="faq-item"
                  onClick={() => askQuestion(faq.question)}
                >
                  <span className="faq-tag">{faq.tag}</span>
                  <span className="faq-question">{faq.question}</span>
                </button>
              ))}
            </div>
          </div>
        )}
        
        {messages.map((message, index) => (
          <div key={index} className={`message ${message.type} ${message.error ? 'error' : ''}`}>
            <div className="message-avatar">
              {message.type === 'user' ? '👤' : '🌱'}
            </div>
            <div className="message-content">
              {message.type === 'user' ? (
                message.content
              ) : (
                <ReactMarkdown>{message.content}</ReactMarkdown>
              )}
            </div>
          </div>
        ))}
        
        {isLoading && (
          <div className="message ai loading">
            <div className="message-avatar">🌱</div>
            <div className="message-content">
              <div className="typing-indicator">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          </div>
        )}
      </div>

      <form className="chat-input" onSubmit={handleSubmit}>
        <input
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Ask about waste management, recycling tips, or eco-friendly practices..."
          disabled={isLoading}
        />
        <button type="submit" disabled={isLoading}>
          <i className="fas fa-paper-plane"></i>
        </button>
      </form>
    </div>
  );
};

export default AskEcoFriend;
