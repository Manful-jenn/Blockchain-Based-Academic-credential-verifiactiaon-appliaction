import React, { useState } from 'react';
import axios from 'axios';
import '../css/Registerpagestyle.css';
import { Link } from "react-router-dom";

function Registerpage() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    organization: '',
    email: '',
    phoneNumber: '',
    password: '',
    confirmPassword: ''
  });

  const [error, setError] = useState('');

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = /^^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/; // At least 8 characters, one letter and one number

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (!emailRegex.test(formData.email)) {
      setError('Invalid email format');
      return;
    }

    if (!passwordRegex.test(formData.password)) {
      setError('Password must be at least 8 characters long and contain at least one letter and one number');
      return;
    }

    try {
      const { confirmPassword, ...submitData } = formData;

      console.log('Submitting form with data:', submitData);
      const response = await axios.post('http://localhost:8080/api/externals', submitData);
      console.log('Form submitted', response.data);

      // Optionally reset the form
      setFormData({ firstName: '', lastName: '', organization: '', email: '', phoneNumber: '', password: '', confirmPassword: '' });
      setError(''); // Clear any previous error
    } catch (error) {
      console.error('Error submitting form', error);
      setError('Error submitting form');
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
    <div className='container bg-gradient'>
      <div className='header'>
        <div className='text'>Register</div>
        <div className='underline'></div>
      </div>
      <form onSubmit={handleSubmit}>
        <div className='inputs'>
          <div className='input'>
            <input type='text' name='firstName' placeholder='First Name' value={formData.firstName} onChange={handleChange} />
          </div>
          <div className='input'>
            <input type='text' name='lastName' placeholder='Last Name' value={formData.lastName} onChange={handleChange} />
          </div>
          <div className='input'>
            <input type='text' name='organization' placeholder='Organization' value={formData.organization} onChange={handleChange} />
          </div>
          <div className='input'>
            <input type='email' name='email' placeholder='Email' value={formData.email} onChange={handleChange} />
          </div>
          <div className='input'>
            <input type='text' name='phoneNumber' placeholder='Phone Number' value={formData.phoneNumber} onChange={handleChange} />
          </div>
          <div className='input'>
            <input type='password' name='password' placeholder='Password' value={formData.password} onChange={handleChange} />
          </div>
          <div className='input'>
            <input type='password' name='confirmPassword' placeholder='Confirm Password' value={formData.confirmPassword} onChange={handleChange} />
          </div>
        </div>
        {error && <div className='error'>{error}</div>}
        <div className='submit-container'>
          <button type='submit' className='submit'>Register</button>
        </div>
      </form>
      <div className='text2'>Have an Account? <span><Link to="/login">Login</Link></span></div>
    </div>
    </>
  );
}

export default Registerpage;
