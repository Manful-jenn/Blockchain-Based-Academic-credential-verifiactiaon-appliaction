import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from '../components/sidebar';
import Topbar from '../components/topbar';
import '../css/adminregisterstyle.css'; 
import Password from 'antd/es/input/Password';

const Registerstudent = () => {
  const [majors, setMajors] = useState([]);
  const [formValues, setFormValues] = useState({
    student_id: '',
    first_name: '',
    last_name: '',
    date_of_birth: '',
    email: '',
    phone_number: '',
    address: '',
    enrollment_date: '',
    graduation_year: '',
    major: '',
    password:'Chicken'
  });

  useEffect(() => {
    const fetchMajors = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/major');
        setMajors(response.data);
      } catch (error) {
        console.error('Error fetching majors:', error);
      }
    };

    fetchMajors();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form values:', formValues);

    // Make the API call to register the student
    try {
      const response = await axios.post('http://localhost:8080/api/students', formValues);
      console.log('Response:', response.data);
      alert('Student registered successfully!');
    } catch (error) {
      console.error('Error registering student:', error);
      alert('An error occurred while registering the student.');
    }

    // Reset form values after submission
    setFormValues({
      student_id: '',
      first_name: '',
      last_name: '',
      date_of_birth: '',
      email: '',
      phone_number: '',
      address: '',
      enrollment_date: '',
      graduation_year: '',
      major: ''
    });
  };

  return (
    <div>
       <nav className="navbar">
        <div className="logo">CertiChain</div>
        <div className="nav-links">
          <a href="/login">logout</a>
        </div>
      </nav>
       <div className="main-content">
         <Sidebar />
         <div className="content-container">
           <div className='header'>
             <div className='text'>Register Students</div>
             <div className='underline'></div>
           </div>
           <div className="registration-form-container">
             <form onSubmit={handleSubmit} className="registration-form">
               <div className="form-group">
                 <label htmlFor="student_id">Student ID</label>
                 <input type="text" name="student_id" id="student_id" value={formValues.student_id} onChange={handleInputChange} required />
               </div>
               <div className="form-group">
                 <label htmlFor="first_name">First Name</label>
                 <input type="text" name="first_name" id="first_name" value={formValues.first_name} onChange={handleInputChange} required />
               </div>
               <div className="form-group">
                 <label htmlFor="last_name">Last Name</label>
                 <input type="text" name="last_name" id="last_name" value={formValues.last_name} onChange={handleInputChange} required />
               </div>
               <div className="form-group">
                 <label htmlFor="date_of_birth">Date of Birth</label>
                 <input type="date" name="date_of_birth" id="date_of_birth" value={formValues.date_of_birth} onChange={handleInputChange} required />
               </div>
               <div className="form-group">
                 <label htmlFor="email">Email</label>
                 <input type="email" name="email" id="email" value={formValues.email} onChange={handleInputChange} required />
               </div>
               <div className="form-group">
                 <label htmlFor="phone_number">Phone Number</label>
                 <input type="text" name="phone_number" id="phone_number" value={formValues.phone_number} onChange={handleInputChange} required />
               </div>
               <div className="form-group">
                 <label htmlFor="address">Address</label>
                 <textarea name="address" id="address" value={formValues.address} onChange={handleInputChange} required></textarea>
               </div>
               <div className="form-group">
                 <label htmlFor="enrollment_date">Enrollment Date</label>
                 <input type="date" name="enrollment_date" id="enrollment_date" value={formValues.enrollment_date} onChange={handleInputChange} required />
               </div>
               <div className="form-group">
                 <label htmlFor="graduation_year">Graduation Year</label>
                 <input type="number" name="graduation_year" id="graduation_year" value={formValues.graduation_year} onChange={handleInputChange} required />
               </div>
               <div className="form-group">
                 <label htmlFor="major">Major</label>
                 <select name="major" id="major" value={formValues.major} onChange={handleInputChange} required>
                   <option value="">Select a major</option>
                   {majors.map((major) => (
                     <option key={major.major_id} value={major.major_id}>
                       {major.major_name}
                     </option>
                   ))}
                 </select>
               </div>
               <div className='submit-container'>
                 <button type="submit">Submit</button>
               </div>
             </form>
           </div>
         </div>
       </div>
    </div>
  );
};

export default Registerstudent;
