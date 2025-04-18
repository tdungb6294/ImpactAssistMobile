import { axios } from "../lib/axios";

interface RegisterForm {
  email: string;
  fullName: string;
  password: string;
  phone: string;
}

export const register = async (registerForm: RegisterForm): Promise<number> => {
  try {
    const response = await axios.post(
      "/auth/register",
      { ...registerForm },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data as number;
  } catch (e) {
    return -1;
  }
};
