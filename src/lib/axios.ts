import axiosAPI from "axios";
import * as SecureStore from "expo-secure-store";
import { fetchNewAccessToken } from "../utils/fetch-new-access-token";

export const axios = axiosAPI.create({
  baseURL: process.env.EXPO_PUBLIC_API_BASE_URL,
  timeout: 10000,
  withCredentials: true,
});

axios.interceptors.request.use(async (config) => {
  const accessToken = await SecureStore.getItem("accessToken");
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      try {
        // Get refresh token
        const refreshToken = await SecureStore.getItem("refreshToken");
        if (!refreshToken) throw new Error("No refresh token available");

        // Request new access token
        const data = await fetchNewAccessToken(refreshToken ?? "");

        // Save new tokens
        console.log("New token saved!", data);
        await SecureStore.setItemAsync("accessToken", data);
        originalRequest.headers.Authorization = `Bearer ${data}`;
        return axios(originalRequest);
      } catch (err) {
        console.error("Token refresh failed:", err);
      }
    }
    return Promise.reject(error);
  }
);
