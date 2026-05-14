import React, { createContext, useState, useCallback, useEffect, useContext } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = sessionStorage.getItem('hofc_session');
    return saved ? JSON.parse(saved) : null;
  });
  const [isAdmin, setIsAdmin] = useState(() => {
    return sessionStorage.getItem('hofc_admin_mode') === 'true';
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // --- ENSURE DATA INTEGRITY ---
  useEffect(() => {
    const seedData = () => {
      const saved = localStorage.getItem('hofc_users');
      const defaultUsers = [
        { id: 1, userId: 'hdocuser', password: 'HOFC@123', name: 'RAHUL KUMAR', balance: 254892.50, status: 'ACTIVE', acc: '50100451278964' },
        { id: 2, userId: 'admin', password: 'Admin@HOFC', name: 'Super Admin', status: 'ACTIVE', role: 'admin', acc: 'ADMIN-001' }
      ];

      if (!saved) {
        localStorage.setItem('hofc_users', JSON.stringify(defaultUsers));
      } else {
        // Validation: If data is corrupted, reset it
        try {
          const parsed = JSON.parse(saved);
          if (!Array.isArray(parsed) || parsed.length === 0) {
            localStorage.setItem('hofc_users', JSON.stringify(defaultUsers));
          }
        } catch (e) {
          localStorage.setItem('hofc_users', JSON.stringify(defaultUsers));
        }
      }
    };
    seedData();
  }, []);

  const login = useCallback(async (userId, password) => {
    setLoading(true);
    setError(null);
    try {
      const users = JSON.parse(localStorage.getItem('hofc_users') || '[]');
      const found = users.find(u => u.userId === userId && u.password === password);

      if (found) {
        setUser(found);
        setIsAdmin(found.role === 'admin');
        sessionStorage.setItem('hofc_session', JSON.stringify(found));
        sessionStorage.setItem('hofc_admin_mode', found.role === 'admin' ? 'true' : 'false');
        localStorage.setItem('token', 'active_session'); // For ProtectedRoute
        if (found.role === 'admin') localStorage.setItem('admin_token', 'active_admin');
        return true;
      } else {
        setError('Invalid User ID or Password');
        return false;
      }
    } catch (err) {
      setError('System Error. Please try again.');
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  const adminLogin = useCallback(async (adminId, password) => {
    // Standardizing Admin Login to use the same user pool
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
