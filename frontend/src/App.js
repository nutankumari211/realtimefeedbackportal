import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Register from './components/RegisterForm';
import Login from './components/LoginForm';
import FeedbackChat from './components/FeedbackChat';
import Home from './components/Home';


function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  return (
    <Router>
      <Navbar isAuthenticated={isAuthenticated} />
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register setIsAuthenticated={setIsAuthenticated} />} />
          <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
          <Route path="/feedback-chat" element={<FeedbackChat />} />
        
        </Routes>
      </div>
    </Router>
  );
}



export default App;
