import { axios } from "../lib/axios";
import { PartialClaimDocument } from "./fetch-car-claim-details";

export interface ObjectClaimDetail {
  id: number;
  objectType: string;
  objectMaterial: string;
  objectOwnership: string;
  damageToObjectDescription: string;
  insurancePolicyNumber: string;
  insuranceCompany: string;
  accidentDatetime: string;
  locationLongitude: number;
  locationLatitude: number;
  address: string;
  description: string;
  policeInvolved: boolean;
  policeReportNumber: string;
  weatherCondition: string;
  claimAccidentImageUrls: string[];
  claimAccidentDocuments: PartialClaimDocument[];
  compensationMethod: string;
  additionalNotes: string;
  dataManagementConsent: boolean;
  internationalBankAccountNumber: string;
  claimStatus: string;
}

export const fetchObjectClaimDetails = async (
  id: number
): Promise<ObjectClaimDetail> => {
  const response = await axios.get(`/claim/object/${id}`, {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });
  return response.data;
};
