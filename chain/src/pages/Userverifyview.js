
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Userverifyview = () => {
  const [verificationCode, setVerificationCode] = useState('');
  const [isValid, setIsValid] = useState(null);
  const [studentDetails, setStudentDetails] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [accessDenied, setAccessDenied] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is logged in
    const user = localStorage.getItem('user');
    if (!user) {
      navigate('/login');
    }
  }, [navigate]);

  const handleVerification = async (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    setAccessDenied(false);

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
        const parsedStudentDetails = JSON.parse(data.studentDetails);
        const externalId = sessionStorage.getItem('external_id'); // Assuming external_id is stored in session

        // Check if access is granted
        const accessCheckResponse = await fetch(`http://localhost:8080/api/accesscontrols/check`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            externalId: externalId,
            studentId: parsedStudentDetails.student_id,
          }),
        });

        const accessCheckData = await accessCheckResponse.json();
        if (accessCheckData.accessGranted) {
          setStudentDetails(parsedStudentDetails);
          setIsValid(true);
        } else {
          setAccessDenied(true);
        }
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

  const handleLogout = async () => {
    try {
      await fetch('http://localhost:8080/api/externals/logout', {
        method: 'GET',
        credentials: 'include', // Include credentials to destroy session on server
      });
      localStorage.removeItem('user'); // Remove user session data from local storage
      navigate('/login');
    } catch (error) {
      console.error('Logout error', error);
    }
  };

  return (
    <div>
      <nav className="navbar">
        <div className="logo">CertiChain</div>
        <div className="nav-links">
          <a href="/login" onClick={handleLogout}>Logout</a>
        </div>
      </nav>
      <div className="main-content">
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
          {isSubmitted && accessDenied && (
            <p>Access Denied: The student has not given you access to view the credentials.</p>
          )}
          {isSubmitted && !accessDenied && (isValid === true && studentDetails ? (
            <div className="student-details">
              <p>Credentials are Valid</p>
              <h3>Student Details</h3>
              <p>Student ID: {studentDetails.student_id}</p>
              <p>Recipient Name: {studentDetails.recipient_name}</p>
              <p>Recipient Email: {studentDetails.recipient_email}</p>
              <p>Credential Type: {studentDetails.credential_type}</p>
              <p>Certificate Title: {studentDetails.certificate_title}</p>
              <p>Issue Date: {studentDetails.issue_date}</p>
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

export default Userverifyview;
