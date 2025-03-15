export interface Declaration {
  datetime: Date;
  accidentCountryLocation: string;
  peopleInjuries: string;
  damageToCars: boolean;
  damageToObjects: boolean;
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
    circumstances: {
      standing: boolean;
      stopping: boolean;
      openingTheDoor: boolean;
      braking: boolean;
      leavingParkingSpace: boolean;
      leavingPrivatePlot: boolean;
      leavingRoadside: boolean;
      enteringParkingSpace: boolean;
      enteringPrivatePlot: boolean;
      enteringRoadside: boolean;
      enteringRoundabout: boolean;
      drivingRoundabout: boolean;
      hittingRearWhenDrivingInSameDirection: boolean;
      drivingInTheSameDirectionButDifferentLane: boolean;
      changingLanes: boolean;
      overtaking: boolean;
      turningRight: boolean;
      turningLeft: boolean;
      reversing: boolean;
      enteringOncomingLane: boolean;
      hittingAtAnIntersectionFromTheRight: boolean;
      notGivingWayWhenRedTrafficLight: boolean;
    };
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
    circumstances: {
      standing: boolean;
      stopping: boolean;
      openingTheDoor: boolean;
      braking: boolean;
      leavingParkingSpace: boolean;
      leavingPrivatePlot: boolean;
      leavingRoadside: boolean;
      enteringParkingSpace: boolean;
      enteringPrivatePlot: boolean;
      enteringRoadside: boolean;
      enteringRoundabout: boolean;
      drivingRoundabout: boolean;
      hittingRearWhenDrivingInSameDirection: boolean;
      drivingInTheSameDirectionButDifferentLane: boolean;
      changingLanes: boolean;
      overtaking: boolean;
      turningRight: boolean;
      turningLeft: boolean;
      reversing: boolean;
      enteringOncomingLane: boolean;
      hittingAtAnIntersectionFromTheRight: boolean;
      notGivingWayWhenRedTrafficLight: boolean;
    };
  };
  culprit: {
    fullName: string;
  };
}
