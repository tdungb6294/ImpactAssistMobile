import { axios } from "../lib/axios";
import { LocalExpertAvailability } from "../model/local-expert-availability";

export const fetchLocalExpertAvailability = async (
  id: number
): Promise<LocalExpertAvailability> => {
  const response = await axios.get(`/local_expert_availability/${id}`, {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });
  return response.data;
};
