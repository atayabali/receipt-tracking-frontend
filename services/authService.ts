import * as SecureStore from "expo-secure-store";
import { urlPrefix } from "./configureUrl";
const API_URL = urlPrefix;

export const getStoredToken = async (): Promise<string | null> => {
  try {
    return await SecureStore.getItemAsync("accessToken");
  } catch (error) {
    console.error("Failed to get stored token:", error);
    return null;
  }
};

export const storeToken = async (token: string): Promise<void> => {
  try {
    await SecureStore.setItemAsync("accessToken", token);
  } catch (error) {
    console.error("Failed to store token:", error);
  }
};

export const clearTokens = async (): Promise<void> => {
  try {
    await SecureStore.deleteItemAsync("accessToken");
  } catch (error) {
    console.error("Failed to clear tokens:", error);
  }
};
