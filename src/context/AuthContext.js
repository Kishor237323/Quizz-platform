import React, { createContext, useContext, useState, useEffect } from 'react';
import { authAPI } from '../services/api';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Check if user is logged in on app start
  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const token = localStorage.getItem('token');
      if (token) {
        console.log('Found token, checking auth status...');
        const response = await authAPI.getMe();
        setUser(response.data);
        console.log('Auth status checked, user:', response.data);
      }
    } catch (error) {
      console.error('Auth check failed:', error);
      localStorage.removeItem('token');
    } finally {
      setLoading(false);
    }
  };

  const login = async (credentials) => {
    try {
      console.log('AuthContext: Login attempt with:', credentials);
      setError(null);
      const response = await authAPI.login(credentials);
      console.log('AuthContext: Login API response:', response);
      
      // Save token to localStorage
      localStorage.setItem('token', response.token);
      console.log('AuthContext: Token saved to localStorage');
      
      // Set user data
      setUser(response.data);
      console.log('AuthContext: User set in state:', response.data);
      
      return { success: true, data: response.data };
    } catch (error) {
      console.error('AuthContext: Login error:', error);
      setError(error.message);
      return { success: false, error: error.message };
    }
  };

 
  const register = async (userData) => {
    try {
      console.log('AuthContext: Register attempt with:', userData);
      setError(null);
      const response = await authAPI.register(userData);
      console.log('AuthContext: Register API response:', response);
      
      // Save token to localStorage
      localStorage.setItem('token', response.token);
      console.log('AuthContext: Token saved to localStorage');
      
      // Set user data
      setUser(response.data);
      console.log('AuthContext: User set in state:', response.data);
      
      return { success: true, data: response.data };
    } catch (error) {
      console.error('AuthContext: Register error:', error);
      setError(error.message);
      return { success: false, error: error.message };
    }
  };

  const logout = async () => {
    try {
      console.log('AuthContext: Logout attempt');
      await authAPI.logout();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      // Clear token and user data
      localStorage.removeItem('token');
      setUser(null);
      setError(null);
      console.log('AuthContext: Logout completed, user cleared');
    }
  };

  const clearError = () => {
    setError(null);
  };
  const loginWithGoogle = (userData, token) => {
    localStorage.setItem('token', token);
    setUser(userData);
  };
 
  const value = {
    user,
    loading,
    error,
    login,
    register,
    logout,
    clearError,
    isAuthenticated: !!user,
    loginWithGoogle,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}; 