import { axios } from "../lib/axios";

export interface CarClaimDetail {
  id: number;
  carModel: string;
  vehicleRegistrationNumber: string;
  vehicleIdentificationNumber: string;
  odometerMileage: string;
  insurancePolicyNumber: string;
  insuranceCompany: string;
  accidentDatetime: string; // Use ISO 8601 string, or `Date` if you're parsing
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

export interface PartialClaimDocument {
  documentType: string;
  url: string;
}

export const fetchCarClaimDetails = async (
  id: number
): Promise<CarClaimDetail> => {
  const response = await axios.get(`/claim/car/${id}`, {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });
  return response.data;
};
