import React from 'react';
import { Link } from 'react-router-dom';
import { IconUserPlus, IconFileCheck, IconFileCertificate, IconTablePlus } from '@tabler/icons-react';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <Link to="/department" className="nav-item">
        <IconTablePlus size={24} style={{ marginRight: '10px' }} />
        <span>Add Department or Major</span>
      </Link>
      <Link to="/issuance" className="nav-item">
        <IconFileCertificate size={24} style={{ marginRight: '10px' }} />
        <span>Issue Credential</span>
      </Link>
      <Link to="/verification" className="nav-item">
        <IconFileCheck size={24} style={{ marginRight: '10px' }} />
        <span>View Credentials</span>
      </Link>
      <Link to="/registerstudent" className="nav-item">
        <IconUserPlus size={24} style={{ marginRight: '10px' }} />
        <span>Register Students</span>
      </Link>
    </div>
  );
}

export default Sidebar;