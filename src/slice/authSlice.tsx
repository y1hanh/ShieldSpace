import React, { createContext, useContext, useState, useEffect } from 'react';
import { getSecureToken } from '../api';

interface AuthContextType {
  secure: boolean;
  token: string | null;
  useSubmit: (username: string, password: string) => Promise<void>;
  logout: () => void;
}
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function authSlice({ children }: { children: React.ReactNode }) {
  const [secure, setSecure] = useState(false);
  const [token, setToken] = useState<string | null>(() => {
    return sessionStorage.getItem('token');
  });

  const useSubmit = async (username: string, password: string) => {
    try {
      const data = await getSecureToken(username, password);
      if (data.access_token) {
        localStorage.setItem('token', data.access_token);
        setSecure(true);
      }
    } catch (error) {
      setSecure(false);
      throw new Error('Wrong username or password');
    }
  };

  const logout = () => {
    setToken(null);
    sessionStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ secure, token, useSubmit, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext<AuthContextType>(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
