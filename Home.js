// Home.js

import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css'
function Home() {
  return (
    <div className="home">
      <h1>Welcome to the Home Page for First React Project</h1>
      <p>
        <Link to="/login">Login</Link>
      </p>
      <p>
        <Link to="/signup">Signup</Link>
      </p>
    </div>
  );
}

export default Home;
