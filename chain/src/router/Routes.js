import * as React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from '../App'; // Correct path to App component
import Registerpage from "../pages/Registerpage"; 
import Loginpage from "../pages/Loginpage";
import Homepage from "../pages/Homepage";
import Registerstudent from "../adminpages/Registerstudent";
import Credentialissuance from "../adminpages/Credentialissuance";
import Departmentpage from "../adminpages/Departmentpage";
import Majorpage from "../adminpages/Majorpage";
import Credentialverification from "../pages/Certificateverificationpage"
import Studentlogin from "../pages/Studentlogin";
import AccessControl from "../pages/AccessControl";
import Userverifyview from "../pages/Userverifyview";
import Adminlogin from "../adminpages/Adminlogin";
// import Root, { rootLoader } from "./routes/root"; // Ensure these paths are correct
// import Team, { teamLoader } from "./routes/team"; 

const router = createBrowserRouter([
  {
    path: "/",
    element: <Homepage />,
  },
  {
    path: "/register",
    element: <Registerpage />,
  },
  {
    path: "/login",
    element: <Loginpage />,
  },
  {
    path: "/registerstudent",
    element: <Registerstudent />,
  },
  {
    path: "/issuance",
    element: <Credentialissuance />,
  },
  {
    path: "/department",
    element: <Departmentpage />,
  },
  {
    path: "/major",
    element: <Majorpage />,
  },
  {
    path: "/verification",
    element: <Credentialverification />,
  },
  {
    path: "/studentlogin",
    element: <Studentlogin />,
  },
  {
    path: "/accesscontrol",
    element: <AccessControl />,
  },
  {
    path: "/verifyview",
    element: <Userverifyview />,
  },
  {
    path: "/adminlogin",
    element: <Adminlogin />,
  }


]);

export default router;