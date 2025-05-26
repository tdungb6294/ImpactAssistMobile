import { axios } from "../lib/axios";

export const createObjectClaim = async (
  formData: FormData
): Promise<number> => {
  try {
    const response = await axios.post("/claim/object", formData, {
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
