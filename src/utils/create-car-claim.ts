import { axios } from "../lib/axios";
import { CarClaimFieldErrors } from "../model/car-claim-field-errors";
import { ErrorResponse } from "../model/error-response";

export const createCarClaim = async (
  formData: FormData
): Promise<number | ErrorResponse<CarClaimFieldErrors>> => {
  try {
    const response = await axios.post("/claim/car", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      transformRequest: (data) => data,
    });
    return response.data as number;
  } catch (error: any) {
    return {
      message: error?.response?.data?.message || "Unknown error",
      errors: error?.response?.data?.errors as CarClaimFieldErrors,
    };
  }
};
