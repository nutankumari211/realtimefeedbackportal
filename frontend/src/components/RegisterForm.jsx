import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaLock } from 'react-icons/fa';
const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
 
  const navigate = useNavigate(); 
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/auth/register', formData);
      if (response.data.message === 'User registered successfully') {
        navigate('/login');
      }
    } catch (error) {
      console.error('Registration failed:', error);
    }
  };

  return (
    <div className="container">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
        <label><FaUser /> Username:</label>
          <input type="text" name="username" value={formData.username} onChange={handleChange} />
        </div>
        <div className="form-group">
        <label><FaLock /> Password:</label>
          <input type="password" name="password" value={formData.password} onChange={handleChange} />
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
