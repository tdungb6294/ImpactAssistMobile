import { axios } from "../lib/axios";

export const createAiDamageReport = async (
  claimId: number
): Promise<number> => {
  try {
    const response = await axios.get(`/damage-report/ai/${claimId}`);
    return response.data as number;
  } catch (e) {
    console.error("Error creating damage report:", e);
    return -1;
  }
};
