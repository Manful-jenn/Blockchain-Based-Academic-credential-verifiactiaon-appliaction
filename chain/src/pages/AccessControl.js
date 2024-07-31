// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import "../css/accesscontrol.css";

// const AccessControl = () => {
//     const [companies, setCompanies] = useState([]);
//     const [error, setError] = useState('');
//     const [message, setMessage] = useState(''); // State for success message

//     useEffect(() => {
//         // Fetch company names from the backend
//         const fetchCompanies = async () => {
//             try {
//                 const response = await axios.get('http://localhost:8080/api/externals', { withCredentials: true });
//                 setCompanies(response.data);
//             } catch (error) {
//                 console.error('Error fetching company names', error);
//                 setError('Error fetching company names');
//             }
//         };

//         fetchCompanies();
//     }, []);

//     const handleGrantAccess = async (companyId) => {
//         try {
//             const response = await axios.post(
//                 'http://localhost:8080/api/accesscontrols/grant', 
//                 { 
//                     externalId: companyId, 
//                     studentId: sessionStorage.getItem('student_id') 
//                 },
//                 { withCredentials: true }
//             );

//             setMessage('Access granted successfully'); // Set success message
//             console.log('Access granted', response.data);
//         } catch (error) {
//             console.error('Error granting access', error);
//             setError('Error granting access');
//         }
//     };

//     const handleRevokeAccess = async (companyId) => {
//         try {
//             const response = await axios.post(
//                 'http://localhost:8080/api/accesscontrols/revoke', 
//                 { 
//                     externalId: companyId, 
//                     studentId: sessionStorage.getItem('student_id') 
//                 },
//                 { withCredentials: true }
//             );

//             setMessage('Access revoked successfully'); // Set success message
//             console.log('Access revoked', response.data);
//         } catch (error) {
//             console.error('Error revoking access', error);
//             setError('Error revoking access');
//         }
//     };

//     const handleLogout = async () => {
//         try {
//             await axios.get('http://localhost:8080/api/students/logout', { withCredentials: true });
//             sessionStorage.removeItem('student_id');
//             window.location.href = '/studentlogin'; // Redirect to login page
//         } catch (error) {
//             console.error('Logout error', error);
//         }
//     };

//     useEffect(() => {
//         const studentId = sessionStorage.getItem('student_id');
//         if (!studentId) {
//             window.location.href = '/studentlogin';
//         }
//     }, []);

//     return (
//         <>
//             <nav className="navbar">
//                 <div className="logo">CertiChain</div>
//                 <div className="nav-links">
//                     <a href="/studentlogin" onClick={handleLogout}>Logout</a>
//                 </div>
//             </nav>

//             <div className="table-container">
//                 {error && <div className="error">{error}</div>}
//                 {message && <div className="message">{message}</div>} {/* Display success message */}
//                 <table>
//                     <thead>
//                         <tr>
//                             <th>Company Name</th>
//                             <th>Actions</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {companies.map((company) => (
//                             <tr key={company.external_id}>
//                                 <td>{company.organization}</td>
//                                 <td>
//                                     <div className="button-container">
//                                         <button className="grant-button" onClick={() => handleGrantAccess(company.external_id)}>Grant Access</button>
//                                         <button className="revoke-button" onClick={() => handleRevokeAccess(company.external_id)}>Revoke Access</button>
//                                     </div>
//                                 </td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//             </div>
//         </>
//     );
// };

// export default AccessControl;
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "../css/accesscontrol.css";

const AccessControl = () => {
    const [companies, setCompanies] = useState([]);
    const [accessStatus, setAccessStatus] = useState({});
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');

    useEffect(() => {
        const fetchCompanies = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/externals', { withCredentials: true });
                setCompanies(response.data);
            } catch (error) {
                console.error('Error fetching company names', error);
                setError('Error fetching company names');
            }
        };

        const fetchAccessStatus = async () => {
            try {
                const studentId = sessionStorage.getItem('student_id');
                if (!studentId) {
                    throw new Error('Student ID not found');
                }
                const response = await axios.get('http://localhost:8080/api/accesscontrols/status', {
                    params: { studentId },
                    withCredentials: true
                });
                setAccessStatus(response.data || {}); // Handle empty response gracefully
            } catch (error) {
                console.error('Error fetching access status', error);
                setError('Error fetching access status');
            }
        };

        fetchCompanies();
        fetchAccessStatus();
    }, []);

    const handleGrantAccess = async (companyId) => {
        try {
            const response = await axios.post(
                'http://localhost:8080/api/accesscontrols/grant', 
                { 
                    externalId: companyId, 
                    studentId: sessionStorage.getItem('student_id') 
                },
                { withCredentials: true }
            );

            setMessage('Access granted successfully');
            setAccessStatus((prevStatus) => ({ ...prevStatus, [companyId]: true }));
            console.log('Access granted', response.data);
        } catch (error) {
            console.error('Error granting access', error);
            setError('Error granting access');
        }
    };

    const handleRevokeAccess = async (companyId) => {
        try {
            const response = await axios.post(
                'http://localhost:8080/api/accesscontrols/revoke', 
                { 
                    externalId: companyId, 
                    studentId: sessionStorage.getItem('student_id') 
                },
                { withCredentials: true }
            );

            setMessage('Access revoked successfully');
            setAccessStatus((prevStatus) => ({ ...prevStatus, [companyId]: false }));
            console.log('Access revoked', response.data);
        } catch (error) {
            console.error('Error revoking access', error);
            setError('Error revoking access');
        }
    };

    const handleLogout = async () => {
        try {
            await axios.get('http://localhost:8080/api/students/logout', { withCredentials: true });
            sessionStorage.removeItem('student_id');
            window.location.href = '/studentlogin';
        } catch (error) {
            console.error('Logout error', error);
        }
    };

    useEffect(() => {
        const studentId = sessionStorage.getItem('student_id');
        if (!studentId) {
            window.location.href = '/studentlogin';
        }
    }, []);

    return (
        <>
            <nav className="navbar">
                <div className="logo">CertiChain</div>
                <div className="nav-links">
                    <a href="/studentlogin" onClick={handleLogout}>Logout</a>
                </div>
            </nav>

            <div className="table-container">
                {error && <div className="error">{error}</div>}
                {message && <div className="message">{message}</div>}
                <table>
                    <thead>
                        <tr>
                            <th>Company Name</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {companies.map((company) => (
                            <tr key={company.external_id}>
                                <td>{company.organization}</td>
                                <td>
                                    <div className="button-container">
                                        {accessStatus[company.external_id] ? (
                                            <button className="revoke-button" onClick={() => handleRevokeAccess(company.external_id)}>Revoke Access</button>
                                        ) : (
                                            <button className="grant-button" onClick={() => handleGrantAccess(company.external_id)}>Grant Access</button>
                                        )}
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default AccessControl;

