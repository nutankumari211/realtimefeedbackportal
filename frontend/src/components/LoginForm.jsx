import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './LoginForm.css';
import { FaUser, FaLock } from 'react-icons/fa';

const LoginForm = ({ setIsAuthenticated }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate(); 

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', {
          username,
          password,
      });

      if (response.data.token && response.data.userId) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('username', response.data.username);
        localStorage.setItem('userId', response.data.userId);
        
        setIsAuthenticated(true);
        navigate('/feedback-chat');
      }
      
    } catch (error) {
      setError('Login failed: ' + error.response.data.message);
    }
  };

  return (
    <div className="container">
     <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label><FaUser /> Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label><FaLock /> Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Login</button>
      </form>
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default LoginForm;
