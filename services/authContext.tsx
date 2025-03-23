import React, { createContext, useState, useContext } from 'react';
import { clearTokens, storeRefreshToken, storeToken } from './authService';
import { Guid } from 'typescript-guid';
import axios from 'axios';
import { urlPrefix } from './configureUrl';

interface User {
  userId: number;
  email: string;
  bucketName: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const signup = async (email: string, password: string) => {
    const bucketName = Guid.create().toString(); // Generate a unique identifier

    try {
      const response = await axios.post(`${urlPrefix}/api/v1/signup`, {
        email,
        password, // Send raw password (hashed in backend)
        bucketName,
      });

      console.log('Signup successful:', response.data);
      setUser(response.data.user);
      await storeToken(response.data.accessToken);
      await storeRefreshToken(response.data.refreshToken);
    } catch (error: any) {
      console.error('Signup error:', error.response?.data || error.message);
      throw error;
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const response = await axios.post(`${urlPrefix}/api/v1/login`, {
        email,
        password,
      });

      const { user, accessToken, refreshToken } = response.data;

      console.log('Login successful:', user);
      setUser(user);
      await storeToken(accessToken);
      await storeRefreshToken(refreshToken);
    } catch (error: any) {
      console.error('Login error:', error.response?.data || error.message);
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    clearTokens();
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
