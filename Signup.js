// Signup.js

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import './Signup.css';

function Signup() {
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [address, setAddress] = useState('');

  const validateEmail = (email) => {
    // Simple email validation using regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    // Password complexity requirements
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  };

  const submit = async (e) => {
    e.preventDefault();
  
    if (!validateEmail(email)) {
      alert('Please enter a valid email address.');
      return;
    }
  
    if (!validatePassword(password)) {
      alert(
        'Password must contain at least 8 characters, including 1 uppercase letter, 1 special character, and 1 number.'
      );
      return;
    }
  
    try {
      const response = await axios.post('/signup', {
        firstName,
        lastName,
        email,
        password,
        address,
      });
  
      alert(response.data);
  
      if (response.data === 'User already exists. Please login.') {
        // Display a user-friendly message for existing users
        alert('You have already signed up. Please login.');
      } else if (response.data === 'Signup successful. Please login.') {
        navigate('/');
      }
    } catch (error) {
      alert(`Error during signup: ${error.message}`);
      console.error(error);
    }
  };
  
  

  return (
    <div className="signup">
      <h1>Signup</h1>
      <form>
        <div className="name-inputs">
          <input
            type="text"
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="First Name"
          />
          <input
            type="text"
            onChange={(e) => setLastName(e.target.value)}
            placeholder="Last Name"
          />
        </div>
        <input
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email Address"
        />
        <input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <textarea
          rows="4"
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Address"
        />
        <button type="submit" onClick={submit}>
          Signup
        </button>
      </form>
      <br />
      <p>
        Already have an account? <Link to="/">Login</Link>
      </p>
    </div>
  );
}

export default Signup;
