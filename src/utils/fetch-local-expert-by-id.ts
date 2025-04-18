import { axios } from "../lib/axios";
import { LocalExpert } from "../model/local-expert";

export const fetchLocalExpertById = async (
  id: number
): Promise<LocalExpert> => {
  const response = await axios.get(`/local_expert/${id}`, {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });
  return response.data as LocalExpert;
};
