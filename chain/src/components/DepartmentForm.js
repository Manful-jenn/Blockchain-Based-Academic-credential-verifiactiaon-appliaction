import React, { useState } from 'react';
import axios from 'axios';

const DepartmentForm = () => {
  const [departmentName, setDepartmentName] = useState('');
  const [departmentCode, setDepartmentCode] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Assuming your backend endpoint for creating departments is '/api/departments'
      const response = await axios.post('http://localhost:8080/api/department', {
        department_name: departmentName,
        department_id: departmentCode,
      });
      console.log(response.data); // Log response for testing
      alert('Department added successfully!');
      setDepartmentName(''); // Reset form field
      setDepartmentCode(''); // Reset form field
    } catch (error) {
      console.error('Error adding department:', error);
      alert('Failed to add department');
    }
  };

  return (
    <div>
      <h2>Add Department</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Department Code:
          <input
            type="text"
            value={departmentCode}
            onChange={(e) => setDepartmentCode(e.target.value)}
            required
          />
        </label>
        <label>
          Department Name:
          <input
            type="text"
            value={departmentName}
            onChange={(e) => setDepartmentName(e.target.value)}
            required
          />
        </label>
        <button type="submit">Add Department</button>
      </form>
    </div>
  );
};

export default DepartmentForm;
