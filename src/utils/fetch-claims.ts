import { axios } from "../lib/axios";
import { ClaimStatus } from "../model/enum/claim-status";

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
  expert = false,
  claimStatus = [],
}: {
  pageParam: any;
  expert?: boolean;
  claimStatus: ClaimStatus[];
}): Promise<PartialClaimPage> => {
  const response = await axios.get(
    expert
      ? `/claim/local-expert?page=${pageParam}&size=6${getClaimStatusUrl(
          claimStatus
        )}`
      : `/claim?page=${pageParam}&size=6${getClaimStatusUrl(claimStatus)}`,
    {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    }
  );
  return response.data;
};

const getClaimStatusUrl = (claimStatus: ClaimStatus[]) => {
  if (claimStatus.length === 0) return "";
  const claimStatusString = claimStatus
    .map((status) => `status=${status}`)
    .join("&");
  return `&${claimStatusString}`;
};
