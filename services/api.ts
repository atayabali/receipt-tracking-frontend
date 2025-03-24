import axios, { AxiosInstance, AxiosError, InternalAxiosRequestConfig } from 'axios';
import { urlPrefix } from './configureUrl';
import { clearTokens, getAccessToken, getStoredToken, storeToken } from './authService';

// Define the API base URL
const BASE_URL = urlPrefix;

// Store the access token directly
let accessToken: string | null = null;

// Function to update the stored token
export const setAccessToken = (token: string | null) => {
  accessToken = token;
};

// Create an Axios instance
const api: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true, // Ensures cookies (refresh token) are sent automatically
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request Interceptor: Attach Access Token to Requests
api.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {

      if (accessToken) {
        config.headers['Authorization'] = `Bearer ${accessToken}`;
      }
    

    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

// Response Interceptor: Handle Expired Token & Refresh Automatically
api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    if (error.response?.status === 401) {
      console.log("Access token expired, attempting to refresh...");

      try {
        // Call refresh endpoint (cookie will be sent automatically)
        const refreshResponse = await axios.post(`${BASE_URL}/auth/refresh-token`, {}, { withCredentials: true });
        const newAccessToken = refreshResponse.data.accessToken;

        // Store new access token in local storage
        storeToken(newAccessToken);

        // Retry the original request with the new access token
        if (error.config) {
          error.config.headers['Authorization'] = `Bearer ${newAccessToken}`;
          return axios(error.config);
        }
      } catch (refreshError) {
        console.error("Refresh token expired, logging out...");
        clearTokens();
        window.location.href = '/login'; // Redirect to login page
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export default api;
