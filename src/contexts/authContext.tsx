'use client';

import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { api, User } from '../services/api';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  error: string | null; 
  login: (email: string, password: string) => Promise<void>;
  register: (username: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  clearError: () => void; 
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null); 
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
    setError(null); 
    try {
      const { token } = await api.login(email, password);
      localStorage.setItem('auth_token', token);
      api.setToken(token);

      const userData = await api.getMe();
      setUser(userData);

      router.push('/');
      } catch (err: unknown) {
        let errorMessage = 'Login failed. Please try again.';
        
        if (err instanceof Error) {
          if (err.message.includes('Invalid password')) {
            errorMessage = 'Invalid email or password. Please check your credentials.';
          } else if (err.message.includes('User not found')) {
            errorMessage = 'No account found with this email address.';
          } else if (err.message.includes('network') || err.message.includes('fetch')) {
            errorMessage = 'Network error. Please check your connection.';
          } else {
            errorMessage = err.message;
          }
        }
        
        setError(errorMessage);

    } finally {
      setLoading(false);
    }
  };

  const register = async (username: string, email: string, password: string) => {
    setLoading(true);
    setError(null); 
    
    try {
      await api.register({ username, email, password });
      await login(email, password);
    } catch (err: unknown) {
      console.error('Registration failed:', err);
      
      // ✅ Set proper error message
      let errorMessage = 'Registration failed. Please try again.';
      
      if (err instanceof Error) {
        if (err.message.includes('409') || err.message.includes('already exists')) {
          errorMessage = 'An account with this email already exists.';
        } else if (err.message.includes('validation') || err.message.includes('invalid')) {
          errorMessage = 'Please check your input and try again.';
        } else if (err.message.includes('network') || err.message.includes('fetch')) {
          errorMessage = 'Network error. Please check your connection.';
        } else {
          errorMessage = err.message;
        }
      }
      
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('auth_token');
    setUser(null);
    setError(null); 
    router.push('/');
  };

  const clearError = () => {
    setError(null); 
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        error, 
        login,
        register,
        logout,
        clearError, 
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);