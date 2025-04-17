import { axios } from "../lib/axios";

export type PartialClaim = {
  id: number;
  carModel: string;
  accidentDatetime: Date;
  address: string;
};

export const fetchCarClaims = async (): Promise<PartialClaim[]> => {
  try {
    const response = await axios.get("/claim/car", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    return response.data as PartialClaim[];
  } catch (error) {
    console.error("Error fetching claims:", error);
    return [];
  }
};
