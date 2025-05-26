import { axios } from "../lib/axios";

interface LoginForm {
  email: string;
  password: string;
}

interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  role: string;
}

export const login = async (loginForm: LoginForm): Promise<LoginResponse> => {
  try {
    const response = await axios.post(
      "/auth/login",
      { ...loginForm },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data as LoginResponse;
  } catch (e) {
    return {
      accessToken: "",
      refreshToken: "",
      role: "",
    };
  }
};
