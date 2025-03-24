import React, { createContext, useState, useContext, useEffect } from "react";
import { clearTokens, getStoredToken, storeToken } from "./authService";
import { Guid } from "typescript-guid";
import axios from "axios";
import { urlPrefix } from "./configureUrl";
import { Platform } from "react-native";

// interface User {
//   userId: number;
//   email: string;
//   bucketName: string;
// }

interface AuthContextType {
  // user: User | null;
  isLoading: boolean;
  accessToken: string | null;
  login: any; //(email: string, password: string) => Promise<void>;
  signup: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    const fetchToken = async () => {
      setLoading(true);
      try {
        if (Platform.OS === "web") {
          // Check if we already have an access token stored
          // If no access token, request a new one using refresh token
          axios
            .post(`${urlPrefix}/auth/refresh-token`, {}, { withCredentials: true })
            .then((response) => {
              // console.log(response);
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
      } finally {
        setLoading(false);
      }
    };
    fetchToken();
  }, []);

  const signup = async (email: string, password: string) => {
    const bucketIdentifier = Guid.create().toString(); // Generate a unique identifier
    try {
      const response = await axios.post(`${urlPrefix}/auth/signup`, {
        email,
        password, // Send raw password (hashed in backend)
        bucketIdentifier,
      }, { withCredentials: true });

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
      }, { withCredentials: true });

      const { accessToken } = response.data;
      await storeToken(accessToken);
      setToken(accessToken);
    } catch (error: any) {
      return {
        status: "error",
        message: typeof error.response?.data?.message === "string" 
        ? error.response.data.message 
        :  error.message || "An unknown error occurred"
      }
    }
  };

  const logout = () => {
    setToken(null);
    clearTokens();
  };

  return (
    <AuthContext.Provider
      value={{ accessToken: token, isLoading, login, signup, logout }}
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
