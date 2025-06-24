import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

const PrivateRoute = ({ element }) => {
  const { currentUser, loading } = useContext(AuthContext);
  
  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }
  
  return currentUser ? element : <Navigate to="/login" />;
};

export default PrivateRoute; 