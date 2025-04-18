import { axios } from "../lib/axios";

export const createCarClaim = async (formData: FormData): Promise<number> => {
  try {
    const response = await axios.post("/claim/car", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      transformRequest: (data) => data,
    });
    return response.data as number;
  } catch (error) {
    console.error("Error fetching claims:", error);
    return -1;
  }
};
