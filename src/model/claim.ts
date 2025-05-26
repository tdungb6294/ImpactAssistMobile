import { CompensationMethod } from "./enum/compensation-method";
import { WeatherCondition } from "./enum/weather-condition";

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
  weatherCondition: WeatherCondition;
  compensationMethod: CompensationMethod;
  dataManagementConsent: boolean;
  internationalBankAccountNumber: string;
  documentTypes: string[];
  objectType: string;
  objectMaterial: string;
  objectOwnership: string;
  damageToObjectDescription: string;
}
