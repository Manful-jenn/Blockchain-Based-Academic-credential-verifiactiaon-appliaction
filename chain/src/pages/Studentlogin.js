import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import axios from 'axios';
import '../css/Registerpagestyle.css';

const Studentlogin = () => {
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
            const response = await axios.post('http://localhost:8080/api/students/login', formData);
            console.log('Login successful', response.data);
    
            // Store student_id in session storage
            sessionStorage.setItem('student_id', response.data.student_id);
    
            // Navigate to another page after successful login
            navigate('/accesscontrol'); 
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
                    <div className='text'>Student Login</div>
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
            </div>
        </>
    );
}

export default Studentlogin;
