import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    // Check if token exists in local storage
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('userData');
    
    if (token && userData) {
      // Set the axios auth header
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      setCurrentUser(JSON.parse(userData));
    }
    
    setLoading(false);
  }, []);

  // Register user
  const register = async (nickname, email, password) => {
    try {
      setError('');
      const response = await axios.post('http://localhost:5000/api/users/register', {
        nickname,
        email,
        password
      });
      
      const { token, user } = response.data;
      
      // Save token and user data to local storage
      localStorage.setItem('token', token);
      localStorage.setItem('userData', JSON.stringify(user));
      
      // Set axios auth header
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      
      setCurrentUser(user);
      return user;
    } catch (error) {
      setError(error.response?.data?.message || 'Registration failed');
      throw error;
    }
  };

  // Login user
  const login = async (email, password) => {
    try {
      setError('');
      const response = await axios.post('http://localhost:5000/api/users/login', {
        email,
        password
      });
      
      const { token, user } = response.data;
      
      // Save token and user data to local storage
      localStorage.setItem('token', token);
      localStorage.setItem('userData', JSON.stringify(user));
      
      // Set axios auth header
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      
      setCurrentUser(user);
      return user;
    } catch (error) {
      setError(error.response?.data?.message || 'Login failed');
      throw error;
    }
  };

  // Logout user
  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userData');
    delete axios.defaults.headers.common['Authorization'];
    setCurrentUser(null);
  };

  // Update user profile
  const updateProfile = async (nickname, currentPassword, newPassword) => {
    try {
      setError('');
      const response = await axios.put('http://localhost:5000/api/users/profile', {
        nickname,
        currentPassword,
        newPassword
      });
      
      const { token, user } = response.data;
      
      // Save updated token and user data to local storage
      localStorage.setItem('token', token);
      localStorage.setItem('userData', JSON.stringify(user));
      
      // Update axios auth header
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      
      setCurrentUser(user);
      return user;
    } catch (error) {
      setError(error.response?.data?.message || 'Profile update failed');
      throw error;
    }
  };

  const value = {
    currentUser,
    loading,
    error,
    register,
    login,
    logout,
    updateProfile
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}; 