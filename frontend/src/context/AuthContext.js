import React, { createContext, useState, useCallback, useEffect, useContext } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = sessionStorage.getItem('hdoc_session');
    return saved ? JSON.parse(saved) : null;
  });
  const [isAdmin, setIsAdmin] = useState(() => {
    return sessionStorage.getItem('hdoc_admin_mode') === 'true';
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // --- ENSURE DATA INTEGRITY (Local Fallback) ---
  const seedUsers = () => {
    const existingUsers = localStorage.getItem('hdoc_users');
    const defaultUsers = [
      { id: '1', userId: 'hdocuser', password: 'HDOC@123', name: 'SUPER ADMIN', balance: 254892.50, acc: 'ADMIN-001', role: 'user' },
      { id: '2', userId: 'admin', password: 'Admin@HDOC', name: 'System Administrator', role: 'admin' }
    ];
    
    if (!existingUsers) {
      localStorage.setItem('hdoc_users', JSON.stringify(defaultUsers));
    } else {
      // Emergency sync: Ensure default users exist even if storage is dirty
      const current = JSON.parse(existingUsers);
      const hasUser = current.find(u => u.userId === 'hdocuser');
      if (!hasUser) {
        localStorage.setItem('hdoc_users', JSON.stringify([...current, ...defaultUsers]));
      }
    }
  };

  useEffect(() => {
    seedUsers();
    const token = localStorage.getItem('hdoc_token');
    const savedUser = localStorage.getItem('hdoc_current_user');
    if (token && savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const login = useCallback(async (userId, password) => {
    setLoading(true);
    setError(null);
    try {
      // 1. Try Backend First
      try {
        const response = await fetch('http://localhost:8000/api/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userId, password })
        });
        
        if (response.ok) {
          const data = await response.json();
          localStorage.setItem('token', data.access_token);
          // Get profile
          const profileRes = await fetch(`http://localhost:8000/api/user/profile?token=${data.access_token}`);
          const profile = await profileRes.json();
          
          setUser(profile);
          setIsAdmin(profile.role === 'admin');
          sessionStorage.setItem('hdoc_session', JSON.stringify(profile));
          sessionStorage.setItem('hdoc_admin_mode', profile.role === 'admin' ? 'true' : 'false');
          return true;
        }
      } catch (e) {
        console.log("Backend not responding, switching to Local Mock Mode...");
      }

      // 2. Local Fallback
      const users = JSON.parse(localStorage.getItem('hdoc_users') || '[]');
      const found = users.find(u => u.userId === userId && u.password === password);

      if (found) {
        setUser(found);
        setIsAdmin(found.role === 'admin');
        sessionStorage.setItem('hdoc_session', JSON.stringify(found));
        sessionStorage.setItem('hdoc_admin_mode', found.role === 'admin' ? 'true' : 'false');
        localStorage.setItem('token', 'mock_token');
        if (found.role === 'admin') localStorage.setItem('admin_token', 'mock_admin_token');
        return true;
      } else {
        setError('Invalid Identity or Protocol Key');
        return false;
      }
    } catch (err) {
      setError('System Access Failed');
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  const adminLogin = useCallback(async (adminId, password) => {
    return login(adminId, password);
  }, [login]);

  const logout = useCallback(() => {
    setUser(null);
    setIsAdmin(false);
    sessionStorage.clear();
    localStorage.removeItem('token');
    localStorage.removeItem('admin_token');
  }, []);

  return (
    <AuthContext.Provider value={{ user, isAdmin, loading, error, login, adminLogin, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
