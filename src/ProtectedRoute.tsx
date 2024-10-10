import React from 'react';
import { Navigate } from 'react-router-dom';

// Protected Route Component
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const token = localStorage.getItem('authToken');

  // If the token doesn't exist, redirect to the login page
  if (!token) {
    return <Navigate to="/login" />;
  }

  // If authenticated, render the child components (e.g., the dashboard)
  return <>{children}</>;
};

export default ProtectedRoute;
