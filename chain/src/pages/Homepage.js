import React from 'react'
import '../css/Homepagestyle.css'; 
import { Link } from "react-router-dom";


const Homepage = () => {
  return (
    <div>
      <nav className="navbar">
        <div className="logo">CertiChain</div>
        <div className="nav-links">
          <Link to="/login">Login</Link>
          <Link to="/studentlogin">Student Login </Link>
          <Link to="/register">Register</Link>
        </div>
      </nav>
      <div className="content">
        <div className="header">
          <h1>Landing template for startups</h1>
          <p>Our landing page template works on all devices, so you only have to set it up once, and get beautiful results forever.</p>
        </div>
      </div>
    </div>
  );
};

export default Homepage