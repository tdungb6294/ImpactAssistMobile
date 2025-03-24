export interface DeclarationError {
  accidentCountryLocation: string;
  peopleInjuries: string;
  witnesses: string;
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
    };
    driver: {
      familyName: string;
      name: string;
      address: string;
      postalCode: string;
      country: string;
      contacts: string;
      drivingLicenceNumber: string;
      drivingLicenceCategory: string;
    };
    damageDescription: string;
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
    };
    driver: {
      familyName: string;
      name: string;
      address: string;
      postalCode: string;
      country: string;
      contacts: string;
      drivingLicenceNumber: string;
      drivingLicenceCategory: string;
    };
    damageDescription: string;
  };
  culprit: {
    fullName: string;
  };
}
