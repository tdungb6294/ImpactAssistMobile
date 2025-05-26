import { axios } from "../lib/axios";
import { ErrorResponse } from "../model/error-response";
import { RegistrationFieldErrors } from "../model/registration-errors";

interface RegisterForm {
  email: string;
  fullName: string;
  password: string;
  phone: string;
}

export const register = async (
  registerForm: RegisterForm
): Promise<number | ErrorResponse<RegistrationFieldErrors>> => {
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
    return {
      message: (e as any)?.response?.data?.message || "Unknown error",
      errors: (e as any)?.response?.data?.errors as RegistrationFieldErrors,
    };
  }
};
