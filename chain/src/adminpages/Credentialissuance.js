import React, { useState } from 'react';
import axios from 'axios';
import '../css/issuancestyle.css'; 
import Sidebar from '../components/sidebar';
import Topbar from '../components/topbar';
import certificateIssuerArtifact from '../contracts/CertificateIssuer.json'; // Adjust this path if necessary
import Web3 from 'web3';

const CredentialIssuance = () => {
  const [credentialType, setCredentialType] = useState('Certificate');
  const [formValues, setFormValues] = useState({
    student_id: '',
    fullName: '',
    email: '',
    certificateTitle: '',
    dateOfIssuance: '',
    course: '',
    grade: '',
    courses: [{ courseName: '', grade: '', semester: '' }],
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleCourseChange = (index, e) => {
    const { name, value } = e.target;
    const newCourses = [...formValues.courses];
    newCourses[index][name] = value;
    setFormValues({ ...formValues, courses: newCourses });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form values:', formValues);

    let payload = {
      student_id: formValues.student_id,
      recipient_name: formValues.fullName,
      recipient_email: formValues.email,
      credential_type: credentialType
    };

    if (credentialType === 'Certificate') {
      payload = {
        ...payload,
        certificate_title: formValues.certificateTitle,
        issue_date: formValues.dateOfIssuance,
      };
    } else if (credentialType === 'Transcript') {
      payload = {
        ...payload,
        issue_date: formValues.dateOfIssuance,
        grade: formValues.grade,
        courses: formValues.courses,
      };
    }

    try {
      // Send payload to first backend API (http://localhost:8080/api/credentials)
      const response = await fetch('http://localhost:8080/api/credentials', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const responseData = await response.json();
      console.log('Response:', responseData);

      // Send payload to second backend API (http://localhost:5000/api/certificates)
      const secondResponse = await fetch('http://localhost:5000/api/certificates/issueCertificate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          recipient: payload.recipient_email,
          data: JSON.stringify(payload),
        }),
      });

      if (!secondResponse.ok) {
        throw new Error('Second network response was not ok');
      }

      const secondResponseData = await secondResponse.json();
      console.log('Second Response:', secondResponseData);

      alert('Credential issued successfully!');
    } catch (error) {
      console.error('Error issuing credential:', error);
      alert('An error occurred while issuing the credential.');
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
        <div className="issuance-form-container">
          <h1>Issue Academic Credential</h1>
          <h3>Securely issue certificates and transcripts using blockchain technology</h3>
          <form onSubmit={handleSubmit}>
            <label>
              Select Credential Type:
              <select
                name="credentialType"
                value={credentialType}
                onChange={(e) => setCredentialType(e.target.value)}
              >
                <option value="Certificate">Certificate</option>
                <option value="Transcript">Transcript</option>
              </select>
            </label>
            <label>
              Student ID:
              <input
                type="text"
                name="student_id"
                value={formValues.student_id}
                onChange={handleInputChange}
                required
              />
            </label>
            <label>
              Full Name:
              <input
                type="text"
                name="fullName"
                value={formValues.fullName}
                onChange={handleInputChange}
                required
              />
            </label>
            <label>
              Email Address:
              <input
                type="email"
                name="email"
                value={formValues.email}
                onChange={handleInputChange}
                required
              />
            </label>
            {credentialType === 'Certificate' ? (
              <>
                <label>
                  Certificate Title:
                  <input
                    type="text"
                    name="certificateTitle"
                    value={formValues.certificateTitle}
                    onChange={handleInputChange}
                    required
                  />
                </label>
                <label>
                  Date of Issuance:
                  <input
                    type="date"
                    name="dateOfIssuance"
                    value={formValues.dateOfIssuance}
                    onChange={handleInputChange}
                    required
                  />
                </label>
                <label>
                  Major:
                  <input
                    type="text"
                    name="course"
                    value={formValues.course}
                    onChange={handleInputChange}
                    required
                  />
                </label>
              </>
            ) : (
              <>
                {formValues.courses.map((course, index) => (
                  <div key={index}>
                    <label>
                      Course Name:
                      <input
                        type="text"
                        name="courseName"
                        value={course.courseName}
                        onChange={(e) => handleCourseChange(index, e)}
                        required
                      />
                    </label>
                    <label>
                      Grade:
                      <input
                        type="text"
                        name="grade"
                        value={course.grade}
                        onChange={(e) => handleCourseChange(index, e)}
                        required
                      />
                    </label>
                    <label>
                      Semester:
                      <input
                        type="text"
                        name="semester"
                        value={course.semester}
                        onChange={(e) => handleCourseChange(index, e)}
                        required
                      />
                    </label>
                  </div>
                ))}
                
                <label>
                  Date of Issuance:
                  <input
                    type="date"
                    name="dateOfIssuance"
                    value={formValues.dateOfIssuance}
                    onChange={handleInputChange}
                    required
                  />
                </label>
              </>
            )}
            <button type="submit">Issue Credential</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CredentialIssuance;
