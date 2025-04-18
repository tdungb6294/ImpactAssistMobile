import { axios } from "../lib/axios";

export interface PartialClaim {
  id: number;
  claimType: string;
  carModel: string;
  accidentDatetime: Date;
  address: string;
  claimStatus: string;
  objectType: string;
}

export interface PartialClaimPage {
  total: number;
  claims: PartialClaim[];
  currentPage: number;
  totalPages: number | null;
  totalCount: number;
  nextPage: number | null;
}

export const fetchCarClaims = async ({
  pageParam = 1,
}: {
  pageParam: any;
}): Promise<PartialClaimPage> => {
  const response = await axios.get(`/claim?page=${pageParam}&size=6`, {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });
  return response.data;
};
