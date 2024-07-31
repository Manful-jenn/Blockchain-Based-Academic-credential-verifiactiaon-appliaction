import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

import router from './router/Routes'; // Correct import statement with relative path

import { RouterProvider } from 'react-router-dom'; // Ensure correct import for RouterProvider

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);




