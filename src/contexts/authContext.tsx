'use client';

import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { api, User } from '../services/api';


interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (username: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Cek apakah user sudah login berdasarkan token
  useEffect(() => {
    const checkAuthStatus = async () => {
      const token = localStorage.getItem('auth_token');
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        // set token ke header kalau perlu
        api.setToken(token);

        const userData = await api.getMe();
        setUser(userData);
      } catch (err) {
        console.error('Auth check failed:', err);
        localStorage.removeItem('auth_token');
      } finally {
        setLoading(false);
      }
    };

    checkAuthStatus();
  }, []);

  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      const { token } = await api.login(email, password);
      localStorage.setItem('auth_token', token);
      api.setToken(token);

      const userData = await api.getMe();
      setUser(userData);

      router.push('/profile');
    } catch (err: unknown) {
      console.error('Login failed:', err);
      const errorMessage = err instanceof Error ? err.message : 'Login failed, please check your email/password';
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const register = async (username: string, email: string, password: string) => {
    setLoading(true);
    try {
      await api.register({ username, email, password });
      await login(username, password);
    } catch (err: unknown) {
      console.error('Registration failed:', err);
      const errorMessage = err instanceof Error ? err.message : 'Registration failed';
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('auth_token');
    setUser(null);
    router.push('/');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        register,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
