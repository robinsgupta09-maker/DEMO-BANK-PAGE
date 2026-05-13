import React, { createContext, useState, useCallback } from 'react';
import { authAPI } from '../utils/api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  const login = useCallback(async (userId, password) => {
    setLoading(true);
    setError(null);
    try {
      const response = await authAPI.login(userId, password);
      const { token, user: userData } = response.data;
      localStorage.setItem('token', token);
      setUser(userData);
      return true;
    } catch (err) {
      setError(err.response?.data?.detail || 'Login failed');
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  const adminLogin = useCallback(async (adminId, password) => {
    setLoading(true);
    setError(null);
    try {
      const response = await authAPI.adminLogin?.(adminId, password) || 
        authAPI.login(adminId, password);
      const { token } = response.data;
      localStorage.setItem('token', token);
      localStorage.setItem('admin_token', token);
      setUser({ id: adminId, name: 'Admin' });
      setIsAdmin(true);
      return true;
    } catch (err) {
      setError(err.response?.data?.detail || 'Admin login failed');
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('token');
    localStorage.removeItem('admin_token');
    setUser(null);
    setIsAdmin(false);
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, error, login, logout, adminLogin, isAdmin }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
