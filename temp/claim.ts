import { Claim } from "../model/claim";

const exampleData: Claim = {
  carModel: "Toyota Yaris",
  vehicleRegistrationNumber: "LD72 WQR",
  vehicleIdentificationNumber: "JTDKBRFU4E3546711",
  odometerMileage: "57482km",
  insurancePolicyNumber: "IP1234567890",
  insuranceCompany: "ERGO Vienna",
  accidentDatetime: new Date("2025-01-01T21:23:25.809"),
  locationLongitude: 0.102669,
  locationLatitude: 51.36385,
  address: "123 Baker Street, London, NW1 6XE, United Kingdom",
  description: "Toyota Yaris crashed into a bush.",
  policeInvolved: false,
  weatherCondition: "Sunny",
  compensationMethod: "Bank account",
  dataManagementConsent: true,
  internationalBankAccountNumber: "GB29NWBK60161331926819",
  documentTypes: ["eismo ivykio deklaracija"],
};
