import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom'; // Import useNavigate and Link
import axios from 'axios';
import '../css/Registerpagestyle.css';

const Loginpage = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Initialize useNavigate

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/api/externals/login', formData, { withCredentials: true });
      console.log('Login successful', response.data);

      // Save user session data (optional, if you need to save it in the client side)
      localStorage.setItem('user', JSON.stringify(response.data));

      // Navigate to another page after successful login
      navigate('/verifyview'); // Change '/verifyview' to your desired route
    } catch (error) {
      console.error('Login error', error);
      setError('Invalid email or password');
    }
  };

  return (
    <>
      <nav className="navbar">
        <div className="logo">CertiChain</div>
        <div className="nav-links">
          <a href="/login">Login</a>
          <a href="/studentlogin">Student Login</a>
          <a href="/register">Register</a>
        </div>
      </nav>
      <div className='container'>
        <div className='header'>
          <div className='text'>Login</div>
          <div className='underline'></div>
        </div>
        <form onSubmit={handleSubmit}>
          <div className='inputs'>
            <div className='input'>
              <input type='email' name='email' placeholder='Email' value={formData.email} onChange={handleChange} />
            </div>
            <div className='input'>
              <input type='password' name='password' placeholder='Password' value={formData.password} onChange={handleChange} />
            </div>
          </div>
          {error && <div className='error'>{error}</div>}
          <div className='submit-container'>
            <button type='submit' className='submit'>Login</button>
          </div>
        </form>
        <div className='text2'>Don't have an Account? <span><Link to="/register">Register</Link></span></div>
      </div>
    </>
  );
}

export default Loginpage;
