import { DeclarationError } from "../../../model/declaration-error";

export const initialDeclarationError: DeclarationError = {
  accidentCountryLocation: "",
  peopleInjuries: "",
  witnesses: "",
  firstCar: {
    insurer: {
      familyName: "",
      name: "",
      address: "",
      postalCode: "",
      country: "",
      contacts: "",
    },
    car: {
      carModel: "",
      carCountryPlate: "",
      carCountryRegistration: "",
    },
    insurance: {
      insuranceCompanyName: "",
      insurancePolicyNumber: "",
      insuranceGreenCardNumber: "",
    },
    driver: {
      familyName: "",
      name: "",
      address: "",
      postalCode: "",
      country: "",
      contacts: "",
      drivingLicenceNumber: "",
      drivingLicenceCategory: "",
    },
    damageDescription: "",
  },
  secondCar: {
    insurer: {
      familyName: "",
      name: "",
      address: "",
      postalCode: "",
      country: "",
      contacts: "",
    },
    car: {
      carModel: "",
      carCountryPlate: "",
      carCountryRegistration: "",
    },
    insurance: {
      insuranceCompanyName: "",
      insurancePolicyNumber: "",
      insuranceGreenCardNumber: "",
    },
    driver: {
      familyName: "",
      name: "",
      address: "",
      postalCode: "",
      country: "",
      contacts: "",
      drivingLicenceNumber: "",
      drivingLicenceCategory: "",
    },
    damageDescription: "",
  },
  culprit: {
    fullName: "",
  },
};
