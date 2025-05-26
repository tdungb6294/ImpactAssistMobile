import axios from "axios";

export const fetchNewAccessToken = async (
  refreshToken: string
): Promise<string> => {
  try {
    const { data } = await axios.post(
      `${process.env.EXPO_PUBLIC_API_BASE_URL}${process.env.EXPO_PUBLIC_REFRESH_ENDPOINT}`,
      {},
      {
        headers: {
          Cookie: `refreshToken=${refreshToken}`,
        },
      }
    );
    return data;
  } catch (error) {
    console.error("Error fetching refresh token:", error);
    return "";
  }
};
