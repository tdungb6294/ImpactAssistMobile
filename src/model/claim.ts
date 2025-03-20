export interface Claim {
  carModel: string;
  vehicleRegistrationNumber: string;
  vehicleIdentificationNumber: string;
  odometerMileage: string;
  insurancePolicyNumber: string;
  insuranceCompany: string;
  accidentDatetime: Date;
  locationLongitude: number;
  locationLatitude: number;
  address: string;
  description: string;
  policeInvolved: boolean;
  weatherCondition: "Sunny" | "Rainy" | "Snowy";
  compensationMethod: "Bank account" | "Repair at local expert";
  dataManagementConsent: boolean;
  internationalBankAccountNumber: string;
  documentTypes: string[];
}
