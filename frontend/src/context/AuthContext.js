import React, { createContext, useState, useCallback, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = sessionStorage.getItem('hofc_active_user');
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('hofc_users');
    if (!saved) {
      const defaultUsers = [
        { id: 1, userId: 'hdocuser', password: 'HOFC@123', name: 'RAHUL KUMAR', balance: 254892.50, status: 'ACTIVE' },
        { id: 2, userId: 'admin', password: 'Admin@HOFC', name: 'Super Admin', status: 'ACTIVE', role: 'admin' }
      ];
      localStorage.setItem('hofc_users', JSON.stringify(defaultUsers));
    }
  }, []);

  const login = useCallback(async (userId, password) => {
    setLoading(true);
    setError(null);
    try {
      const saved = localStorage.getItem('hofc_users');
      const users = saved ? JSON.parse(saved) : [];
      
      const foundUser = users.find(u => u.userId === userId && u.password === password);
      
      if (foundUser) {
        setUser(foundUser);
        setIsAdmin(foundUser.role === 'admin');
        sessionStorage.setItem('hofc_active_user', JSON.stringify(foundUser));
        localStorage.setItem('token', 'dummy-token-for-hofc'); // Set token for ProtectedRoute
        return true;
      } else {
        setError('Invalid credentials');
        return false;
      }
    } catch (err) {
      setError('Login failed');
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  const adminLogin = useCallback(async (adminId, password) => {
    setLoading(true);
    setError(null);
    try {
      if (adminId === 'admin' && password === 'Admin@HOFC') {
        const adminObj = { userId: 'admin', name: 'Super Admin', role: 'admin' };
        setUser(adminObj);
        setIsAdmin(true);
        sessionStorage.setItem('hofc_active_user', JSON.stringify(adminObj));
        localStorage.setItem('admin_token', 'dummy-admin-token'); // Set token for ProtectedRoute
        return true;
      } else {
        setError('Invalid Admin Credentials');
        return false;
      }
    } catch (err) {
      setError('Admin Login failed');
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    setIsAdmin(false);
    sessionStorage.removeItem('hofc_active_user');
    localStorage.removeItem('token');
    localStorage.removeItem('admin_token');
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
