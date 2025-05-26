import { axios } from "../lib/axios";
import { LocalExpert } from "../model/local-expert";

export const fetchLocalExperts = async (
  search?: string
): Promise<LocalExpert[]> => {
  try {
    const response = await axios.get(
      `/local_expert${search ? "?search=" + search : ""}`,
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );
    return response.data as LocalExpert[];
  } catch (error) {
    console.error("Error fetching claims:", error);
    return [];
  }
};
