import { axios } from "../lib/axios";

export const createCarClaim = async (
  formData: FormData
): Promise<number | string> => {
  try {
    const response = await axios.post("/claim/car", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      transformRequest: (data) => data,
    });
    return response.data as number;
  } catch (error: any) {
    console.error(
      "Error fetching claims:",
      JSON.stringify(error?.response?.data)
    );
    return JSON.stringify(error.response?.data) || -1;
  }
};
