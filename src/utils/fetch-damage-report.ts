import { axios } from "../lib/axios";
import { DamageReport } from "../model/damage-report";

export const fetchDamageReport = async (
  id: number,
  language: string
): Promise<DamageReport> => {
  const response = await axios.get(
    `/damage-report/${id}${language !== "en" ? `?lang=${language}` : ""}`,
    {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    }
  );
  return response.data;
};
