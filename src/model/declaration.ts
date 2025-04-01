import { LatLng } from "react-native-maps";
import { Circumstance } from "./enum/circumstance";

export interface Declaration {
  datetime: Date;
  accidentCountryLocation: string;
  peopleInjuries: string;
  damageToCars: boolean;
  damageToObjects: boolean;
  witnesses: string;
  accidentLatLng: LatLng;
  firstCar: {
    insurer: {
      familyName: string;
      name: string;
      address: string;
      postalCode: string;
      country: string;
      contacts: string;
    };
    car: {
      carModel: string;
      carCountryPlate: string;
      carCountryRegistration: string;
    };
    insurance: {
      insuranceCompanyName: string;
      insurancePolicyNumber: string;
      insuranceGreenCardNumber?: string;
      insuranceValidFrom: Date;
      insuranceValidTo: Date;
    };
    insurancePolicyCoverage: boolean;
    driver: {
      familyName: string;
      name: string;
      address: string;
      postalCode: string;
      country: string;
      contacts: string;
      drivingLicenceNumber: string;
      drivingLicenceCategory: string;
      drivingLicenceExpirationDate: Date;
    };
    damageImpactLocation: "N" | "NE" | "E" | "SE" | "S" | "SW" | "W" | "NW";
    damageDescription: string;
    circumstance: Circumstance;
  };
  secondCar: {
    insurer: {
      familyName: string;
      name: string;
      address: string;
      postalCode: string;
      country: string;
      contacts: string;
    };
    car: {
      carModel: string;
      carCountryPlate: string;
      carCountryRegistration: string;
    };
    insurance: {
      insuranceCompanyName: string;
      insurancePolicyNumber: string;
      insuranceGreenCardNumber?: string;
      insuranceValidFrom: Date;
      insuranceValidTo: Date;
    };
    insurancePolicyCoverage: boolean;
    driver: {
      familyName: string;
      name: string;
      address: string;
      postalCode: string;
      country: string;
      contacts: string;
      drivingLicenceNumber: string;
      drivingLicenceCategory: string;
      drivingLicenceExpirationDate: Date;
    };
    damageImpactLocation: "N" | "NE" | "E" | "SE" | "S" | "SW" | "W" | "NW";
    damageDescription: string;
    circumstance: Circumstance;
  };
  culprit: {
    fullName: string;
  };
}
