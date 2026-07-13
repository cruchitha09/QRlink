import { createContext, useContext, useEffect, useState } from 'react';
import { authAPI } from '../services/api.js';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('qrlink_token'));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('qrlink_user');
    if (storedUser) {
      try { setUser(JSON.parse(storedUser)); } catch { /* ignore */ }
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    const { data } = await authAPI.login({ email, password });
    const receivedToken = data.token;
    const receivedUser = data.user || { email };
    localStorage.setItem('qrlink_token', receivedToken);
    localStorage.setItem('qrlink_user', JSON.stringify(receivedUser));
    setToken(receivedToken);
    setUser(receivedUser);
    return data;
  };

  const register = async (payload) => {
    const { data } = await authAPI.register(payload);
    return data;
  };

  const logout = () => {
    localStorage.removeItem('qrlink_token');
    localStorage.removeItem('qrlink_user');
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, isAuthenticated: !!token, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
