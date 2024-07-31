import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MajorForm = () => {
  const [majorName, setMajorName] = useState('');
  const [departmentId, setDepartmentId] = useState('');
  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/department');
        setDepartments(response.data);
      } catch (error) {
        console.error('Error fetching departments:', error);
      }
    };

    fetchDepartments();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/api/major', {
        major_name: majorName,
        department_id: departmentId,
      });
      console.log(response.data); // Log response for testing
      alert('Major added successfully!');
      setMajorName('');
      setDepartmentId('');
    } catch (error) {
      console.error('Error adding major:', error);
      alert('Failed to add major');
    }
  };

  return (
    <div>
      <h2>Add Major</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Major Name:
          <input
            type="text"
            value={majorName}
            onChange={(e) => setMajorName(e.target.value)}
            required
          />
        </label>
        <label>
          Department:
          <select
            value={departmentId}
            onChange={(e) => setDepartmentId(e.target.value)}
            required
          >
            <option value="" disabled>Select Department</option>
            {departments.length > 0 ? (
              departments.map((department) => (
                <option key={department.department_id} value={department.department_id}>
                  {department.department_name}
                </option>
              ))
            ) : (
              <option value="" disabled>Loading departments...</option>
            )}
          </select>
        </label>
        <button type="submit">Add Major</button>
      </form>
    </div>
  );
};

export default MajorForm;
