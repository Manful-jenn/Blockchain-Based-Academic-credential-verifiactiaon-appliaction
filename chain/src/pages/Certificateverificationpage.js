import React, { useState } from 'react';
import Sidebar from '../components/sidebar';
import axios from 'axios';

const Certificateverificationpage = () => {
  const [verificationCode, setVerificationCode] = useState('');
  const [isValid, setIsValid] = useState(null); // Change initial state to null
  const [studentDetails, setStudentDetails] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false); // New state to track if form is submitted

  const handleVerification = async (e) => {
    e.preventDefault();
    setIsSubmitted(true); // Set form submitted to true
    try {
      const url = `http://localhost:5000/api/certificates/verifyCertificate/${verificationCode}`;

      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();
      if (data.isValid) {
        // Parse the studentDetails JSON string
        const parsedStudentDetails = JSON.parse(data.studentDetails);
        setStudentDetails(parsedStudentDetails);
        setIsValid(true);
      } else {
        setIsValid(false);
        setStudentDetails(null);
      }
    } catch (error) {
      console.error('Error verifying credentials:', error);
      setIsValid(false);
      setStudentDetails(null);
    }
  };

  const handleRevoke = async () => {
    try {
      // Make an API call to your backend to revoke the certificate
      const response = await axios.post(`http://localhost:5000/api/certificates/revokeCertificate/${verificationCode}`);
  
      if (response.status === 200) {
        alert('Certificate revoked successfully');
        console.log('Transaction hash:', response.data.transactionHash);
      } else {
        alert('Failed to revoke certificate');
      }
    } catch (error) {
      console.error('Error revoking certificate:', error.response ? error.response.data : error.message);
      alert('Error revoking certificate');
    }
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
        <div className="verification-form" style={{ paddingLeft: "60px", paddingTop: "20px" }}>
          <h2>Verify Credentials</h2>
          <form onSubmit={handleVerification}>
            <label htmlFor="verificationCode">Enter Verification Code:</label>
            <input
              type="text"
              id="verificationCode"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
              required
            />
            <button type="submit">Verify</button>
          </form>
          {isSubmitted && (isValid === true && studentDetails ? (
            <div className="student-details">
              <p>Credentials are Valid</p>
              <h3>Student Details</h3>
              <p>Student ID: {studentDetails.student_id}</p>
              <p>Recipient Name: {studentDetails.recipient_name}</p>
              <p>Recipient Email: {studentDetails.recipient_email}</p>
              <p>Credential Type: {studentDetails.credential_type}</p>
              <p>Certificate Title: {studentDetails.certificate_title}</p>
              <p>Issue Date: {studentDetails.issue_date}</p>
              <button 
                style={{ float: 'right', width: '200px', marginTop: '10px' }} 
                onClick={handleRevoke}
              >
                Revoke Credentials
              </button>
            </div>
          ) : (
            isValid === false && (
              <p>Credentials are Invalid</p>
              
            )
          ))}
        </div>
      </div>
    </div>
  );
};

export default Certificateverificationpage;
