import React, { createContext, useState, useContext, useEffect } from "react";
import { clearTokens, getStoredToken, storeToken } from "./authService";
import { Guid } from "typescript-guid";
import axios from "axios";
import { urlPrefix } from "./configureUrl";
import { Platform } from "react-native";

interface User {
  userId: number;
  email: string;
  bucketName: string;
}

interface AuthContextType {
  user: User | null;
  accessToken: string | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  useEffect(() => {
    const fetchToken = async () => {
      try {
        if (Platform.OS === "web") {
          // Check if we already have an access token stored
          // If no access token, request a new one using refresh token
          axios
            .post(`${urlPrefix}/auth/refresh-token`, {}, { withCredentials: true })
            .then((response) => {
              console.log(response);
              setToken(response.data.accessToken); // Store new access token in state
            })
            .catch((error) => {
              console.error("Failed to refresh token:", error);
              // Optionally redirect to login page if refresh fails
            });
        } else {
          var token = await getStoredToken();
          setToken(token);
        }
      } catch (ex) {
        setToken(null);
      }
    };
    fetchToken();
  }, []);

  const signup = async (email: string, password: string) => {
    const bucketName = Guid.create().toString(); // Generate a unique identifier
    try {
      const response = await axios.post(`${urlPrefix}/signup`, {
        email,
        password, // Send raw password (hashed in backend)
        bucketName,
      });

      console.log("Signup successful:", response.data);
      setUser(response.data.user);
      await storeToken(response.data.accessToken);
      setToken(response.data.accessToken);
    } catch (error: any) {
      console.error("Signup error:", error.response?.data || error.message);
      throw error;
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const response = await axios.post(`${urlPrefix}/auth/login`, {
        email,
        password,
      });

      const { user, accessToken } = response.data;

      console.log("Login successful:", user);
      setUser(user);
      await storeToken(accessToken);
      setToken(accessToken);
    } catch (error: any) {
      console.error("Login error:", error.response?.data || error.message);
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    clearTokens();
  };

  return (
    <AuthContext.Provider
      value={{ user, accessToken: token, login, signup, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
