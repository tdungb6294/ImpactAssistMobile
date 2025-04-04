import axiosAPI from "axios";
import * as SecureStore from "expo-secure-store";

export const axios = axiosAPI.create({
  baseURL: "http://localhost:3000",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
});

axios.defaults.auth = {
  username: process.env.API_USERNAME || "",
  password: process.env.API_PASSWORD || "",
};

axios.interceptors.request.use(
  async (config) => {
    return config;
  },
  async (error) => {
    const originalRequest = error.config;

    // If 401 error and request is not already retried
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Get refresh token
        const refreshToken = await SecureStore.getItem("refreshToken");
        if (!refreshToken) throw new Error("No refresh token available");

        // Request new access token
        const { data } = await axios.post(
          `${process.env.API_BASE_URL}${process.env.REFRESH_ENDPOINT}`,
          {
            refreshToken,
          }
        );

        // Save new tokens
        await SecureStore.setItemAsync("accessToken", data.accessToken);
        await SecureStore.setItemAsync("refreshToken", data.refreshToken);

        // Retry the original request with the new access token
        originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;
        return axios(originalRequest);
      } catch (err) {
        console.error("Token refresh failed:", err);
        await SecureStore.deleteItemAsync("accessToken");
        await SecureStore.deleteItemAsync("refreshToken");
      }
    }

    return Promise.reject(error);
  }
);
