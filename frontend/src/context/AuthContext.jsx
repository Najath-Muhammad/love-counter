import { createContext, useContext, useState, useEffect } from 'react';
import { adminLogin as loginAPI } from '../services/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => localStorage.getItem('admin_token'));
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const login = async (email, password) => {
    setLoading(true);
    setError('');
    try {
      const res = await loginAPI({ email, password });
      const t = res.data.token;
      localStorage.setItem('admin_token', t);
      setToken(t);
      return true;
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('admin_token');
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ token, isAdmin: !!token, login, logout, loading, error }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
