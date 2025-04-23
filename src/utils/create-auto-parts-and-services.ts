import { axios } from "../lib/axios";

export interface RegisterReportDamage {
  claimId: number;
  autoPartsAndServices: number[];
}

export const createAutoPartsAndServices = async (
  data: RegisterReportDamage
): Promise<number> => {
  try {
    const response = await axios.post("/damage-report", data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data as number;
  } catch (e) {
    console.error("Error creating appointment:", e);
    return -1;
  }
};
