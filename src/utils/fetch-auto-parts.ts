import { axios } from "../lib/axios";

export interface AutoPart {
  id: number;
  autoPart: string;
}

export interface AutoPartSearch {
  total: number;
  autoParts: AutoPart[];
  currentPage: number;
  totalPages: number | null;
  totalCount: number;
  nextPage: number | null;
}

export const fetchAutoParts = async (
  search?: string,
  language?: string
): Promise<AutoPartSearch> => {
  console.log(
    `/auto-parts?${search ? "search=" + search : ""}${
      language !== "en" ? `lang=${language}` : ""
    }`
  );
  const response = await axios.get(
    `/auto-parts?${search ? "search=" + search : ""}${
      language !== "en" ? `&lang=${language}` : ""
    }`,
    {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    }
  );
  return response.data;
};
