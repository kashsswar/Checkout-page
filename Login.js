// Login.js

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import './Login.css'

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function submit(e) {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8000/login', {
        email,
        password,
      });

      if (response.data === 'Login successful. Redirect to checkout.') {
        navigate('/checkout');
      } else {
        alert(response.data);
      }
    } catch (error) {
      alert(`Error during login: ${error.message}`);
      console.error(error);
    }
  }

  return (
    <div className="login">
      <h1>Login</h1>
      <form>
        <input
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
        <input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <button type="submit" onClick={submit}>
          Login
        </button>
      </form>
      <br />
      <p>
        Don't have an account? <Link to="/signup">Signup</Link>
      </p>
    </div>
  );
}

export default Login;
