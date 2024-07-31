import React from 'react';
import DepartmentForm from '../components/DepartmentForm';
import MajorForm from '../components/MajorForm';
import Topbar from "../components/topbar";
import Sidebar from "../components/sidebar"
import "../css/departmentstyle.css";

const DepartmentPage = () => {
  return (
    <div className="department-page-container">
      <nav className="navbar">
        <div className="logo">CertiChain</div>
        <div className="nav-links">
          <a href="/login">logout</a>
        </div>
      </nav>
      <div className="main-content-dm">
        <Sidebar />
        <div className="forms-container">
          <div className="department-form-container">
            <h2>Department Form</h2>
            <DepartmentForm />
          </div>
          <div className="major-form-container">
            <h2>Major Form</h2>
            <MajorForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DepartmentPage;