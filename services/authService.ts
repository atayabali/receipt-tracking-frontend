import * as SecureStore from 'expo-secure-store';
import { urlPrefix } from './configureUrl';
import axios from 'axios';

const API_URL = urlPrefix;

export const getStoredToken = async (): Promise<string | null> => {
  try {
    return await SecureStore.getItemAsync('accessToken');
  } catch (error) {
    console.error('Failed to get stored token:', error);
    return null;
  }
};

export const storeToken = async (token: string): Promise<void> => {
  try {
    await SecureStore.setItemAsync('accessToken', token);
  } catch (error) {
    console.error('Failed to store token:', error);
  }
};

export const storeRefreshToken = async (token: string): Promise<void> => {
  try {
    await SecureStore.setItemAsync('refreshToken', token);
  } catch (error) {
    console.error('Failed to store refresh token:', error);
  }
};

export const clearTokens = async (): Promise<void> => {
  try {
    await SecureStore.deleteItemAsync('accessToken');
    await SecureStore.deleteItemAsync('refreshToken');
  } catch (error) {
    console.error('Failed to clear tokens:', error);
  }
};

export const refreshAccessToken = async (): Promise<string | null> => {
  try {
    const refreshToken = await SecureStore.getItemAsync('refreshToken');
    if (!refreshToken) {
      throw new Error('No refresh token available');
    }

    const response = await axios.post<{ accessToken: string }>(`${API_URL}/auth/refresh-token`, {
      refreshToken,
    });

    if (!response.data.accessToken) {
      throw new Error('Failed to refresh token');
    }

    await storeToken(response.data.accessToken);
    return response.data.accessToken;
  } catch (error) {
    console.log('Failed to refresh token:', error);
    return null;
  }
};

export const apiCall = async <T>(endpoint: string, method: 'GET' | 'POST' | 'PUT' | 'DELETE' = 'GET', body: unknown = null): Promise<T> => {
  try {
    let token = await getStoredToken();
    let headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    };

    const config: RequestInit = {
      method,
      headers,
      body: body ? JSON.stringify(body) : undefined,
    };

    let response = await fetch(`${API_URL}/api/v1/${endpoint}`, config);

    if (response.status === 401) { 
      token = await refreshAccessToken();
      if (!token) {
        throw new Error('Session expired');
      }

      headers.Authorization = `Bearer ${token}`;
      response = await fetch(`${API_URL}/api/v1/${endpoint}`, config);
    }

    if (!response.ok) {
      throw new Error('Request failed');
    }

    return await response.json();
  } catch (error) {
    console.error('API call failed:', error);
    throw error;
  }
};
