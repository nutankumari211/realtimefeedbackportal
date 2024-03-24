import React, { useState, useEffect, useCallback, useRef } from 'react';
import axios from 'axios';
import { io } from 'socket.io-client';

import './FeedbackChat.css'; 

const socket = io('http://localhost:5000');

const FeedbackChat = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [feedback, setFeedback] = useState('');
  const [showNewMessage, setShowNewMessage] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const userId = localStorage.getItem('userId');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

const handleAdminMessage = useCallback((adminMessage) => {
  console.log('Received new admin message:', adminMessage);

  if (!feedbacks.some(fb => fb._id === adminMessage._id)) {
      setFeedbacks(prevFeedbacks => [adminMessage, ...prevFeedbacks]);
      setShowNewMessage(true);
  }
}, [feedbacks]);

useEffect(() => {
  socket.on('adminMessage', handleAdminMessage);

  return () => {
      socket.off('adminMessage', handleAdminMessage);
  };
}, [handleAdminMessage]);


  const handleNewFeedback = useCallback((newFeedback) => {
    console.log('Received new feedback:', newFeedback);

    if (!feedbacks.some(fb => fb._id === newFeedback._id)) {
      setFeedbacks(prevFeedbacks => [newFeedback, ...prevFeedbacks]);
      setShowNewMessage(true);
    }
  }, [feedbacks]);

  useEffect(() => {
    const fetchFeedbacks = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('No token found');
        return;
      }

      try {
        const response = await axios.get(`http://localhost:5000/api/feedback/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        setFeedbacks(response.data);
      } catch (error) {
        console.error('Error fetching feedbacks:', error);
      }
    };

    fetchFeedbacks();

    socket.on('newFeedback', handleNewFeedback);

    return () => {
      socket.off('newFeedback', handleNewFeedback);
    };
  }, [userId, handleNewFeedback]);

  useEffect(() => {
    if (showNewMessage) {
      scrollToBottom();
      const timer = setTimeout(() => {
        setShowNewMessage(false);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [showNewMessage]);

  const handleTyping = () => {
    setIsTyping(true);
    const timer = setTimeout(() => {
      setIsTyping(false);
    }, 2000);

    return () => clearTimeout(timer);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('No token found');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/feedback/submit', { message: feedback }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (response.status === 201) {
        setFeedback('');
        setShowNewMessage(true);
      }
    } catch (error) {
      console.error('Feedback submission failed:', error);
    }
  };


  return (
    <div className="container1">
      <h2 className="chat-title">Feedback Portal</h2>
      <div className="chat-container">
        {feedbacks.map((feedback, index) => (
          <div key={index} className={`message ${feedback.userId === userId ? 'sent' : 'received'} ${showNewMessage && 'new-message'}`}>
            <span className="message-content">{feedback.message}</span>
            <span className="message-timestamp">{new Date(feedback.createdAt).toLocaleTimeString()}</span>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      {isTyping && <div className="typing-indicator">Typing...</div>}
      <form onSubmit={handleSubmit} className="input-form">
        <textarea
          rows={3}
          className="input-field"
          placeholder="Type your feedback here..."
          value={feedback}
          onChange={(e) => { setFeedback(e.target.value); handleTyping(); }}
        ></textarea>
        <button type="submit" className="send-button">
          Send
        </button>
      </form>
      
    </div>
  );
};

export default FeedbackChat;
