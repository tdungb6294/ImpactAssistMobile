import { axios } from "../lib/axios";

export const shareClaimWithLocalExpert = async (
  claimId: number,
  localExpertId: number
): Promise<number> => {
  try {
    const response = await axios.put(
      "/claim/share",
      {
        claimId: claimId,
        localExpertId: localExpertId,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data as number;
  } catch (error) {
    return -1;
  }
};
