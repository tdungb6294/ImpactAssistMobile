import { axios } from "../lib/axios";

interface DamageReportElement {
  reportId: number;
  fullName: string;
}

export const fetchDamageReportList = async (
  id: number
): Promise<DamageReportElement[]> => {
  const response = await axios.get(`/damage-report/claim/${id}`, {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });
  return response.data;
};
