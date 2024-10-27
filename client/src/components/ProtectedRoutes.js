// src/components/ProtectedRoutes.js
import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('accessToken'); // Change this if you use a different key
  return token ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
