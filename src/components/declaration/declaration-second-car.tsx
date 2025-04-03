import { useContext, useState } from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Text, useTheme } from "react-native-paper";
import { DatePickerModal } from "react-native-paper-dates";
import { Declaration } from "../../model/declaration";
import { Circumstance } from "../../model/enum/circumstance";
import { CustomTheme } from "../../theme/theme";
import { camelToTitleCase } from "../../utils/camel-to-title-case";
import ImpactAssistButton from "../custom/button";
import ImpactAssistEnumSelector from "../custom/enum-selector";
import DeclarationTextInput from "./_components/declaration-text-input";
import { DeclarationContext } from "./_context/declaration-context";
import { updateDeclarationField } from "./_utils/update-declaration-details/update-declaration-details";

interface DeclarationSecondCarProps {}

const { width } = Dimensions.get("window");

//TODO: add validations and checkboxes

export default function DeclarationSecondCar({}: DeclarationSecondCarProps) {
  const { carCountryPlate, webSocketId, socket, setValue, watch } =
    useContext(DeclarationContext);
  const [show, setShow] = useState(false);
  const [show2, setShow2] = useState(false);
  const [showEnumSelector, setShowEnumSelector] = useState(false);
  const theme: CustomTheme = useTheme();
  const dateFormatter = new Intl.DateTimeFormat("lt-LT", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  return (
    <ScrollView
      keyboardShouldPersistTaps="handled"
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <ImpactAssistButton label="VEHICLE DETAILS" onPress={() => {}} />
      <View style={{ marginVertical: 8 }} />
      <DeclarationTextInput
        label="Vehicle country plate"
        declarationPath={"secondCar.car.carCountryPlate"}
      />
      <DeclarationTextInput
        label="Vehicle country registration"
        declarationPath={"secondCar.car.carCountryRegistration"}
      />
      <DeclarationTextInput
        label="Vehicle model"
        declarationPath={"secondCar.car.carModel"}
      />
      <ImpactAssistButton label="DRIVER DETAILS" onPress={() => {}} />
      <View style={{ marginVertical: 8 }} />
      <DeclarationTextInput
        label="First Name"
        declarationPath={"secondCar.driver.name"}
      />
      <DeclarationTextInput
        label="Second Name"
        declarationPath={"secondCar.driver.familyName"}
      />
      <DeclarationTextInput
        label="Address"
        declarationPath={"secondCar.driver.address"}
      />
      <DeclarationTextInput
        label="Postal code"
        declarationPath={"secondCar.driver.postalCode"}
      />
      <DeclarationTextInput
        label="Country"
        declarationPath={"secondCar.driver.country"}
      />
      <DeclarationTextInput
        label="Contacts"
        declarationPath={"secondCar.driver.contacts"}
      />
      <DeclarationTextInput
        label="Driving Licence Number"
        declarationPath={"secondCar.driver.drivingLicenceNumber"}
      />
      <DeclarationTextInput
        label="Driving Licence Category"
        declarationPath={"secondCar.driver.drivingLicenceCategory"}
      />
      <ImpactAssistButton
        onPress={() => setShow(true)}
        label="Pick Driver Licence Expiration Date"
      />
      <DatePickerModal
        locale="lt"
        mode="single"
        visible={show}
        onDismiss={() => setShow(false)}
        date={new Date(watch("secondCar.driver.drivingLicenceExpirationDate"))}
        startWeekOnMonday={true}
        onConfirm={(params) => {
          setShow(false);
          updateDeclarationField(
            "secondCar.driver.drivingLicenceExpirationDate" as keyof Declaration,
            params.date as Date,
            carCountryPlate,
            socket,
            setValue,
            webSocketId
          );
        }}
      />
      <View style={{ marginVertical: 8 }} />
      <Text variant="titleMedium">
        Driver license expiration date:{" "}
        {dateFormatter.format(
          new Date(watch("secondCar.driver.drivingLicenceExpirationDate"))
        )}
      </Text>
      <View style={{ marginVertical: 8 }} />
      <ImpactAssistButton label="INSURER DETAILS" onPress={() => {}} />
      <View style={{ marginVertical: 8 }} />
      <DeclarationTextInput
        label="Family Name"
        declarationPath={"secondCar.insurer.familyName"}
      />
      <DeclarationTextInput
        label="Name"
        declarationPath={"secondCar.insurer.name"}
      />
      <DeclarationTextInput
        label="Address"
        declarationPath={"secondCar.insurer.address"}
      />
      <DeclarationTextInput
        label="Postal Code"
        declarationPath={"secondCar.insurer.postalCode"}
      />
      <DeclarationTextInput
        label="Country"
        declarationPath={"secondCar.insurer.country"}
      />
      <DeclarationTextInput
        label="Contacts"
        declarationPath={"secondCar.insurer.contacts"}
      />
      <ImpactAssistButton label="INSURANCE DETAILS" onPress={() => {}} />
      <View style={{ marginVertical: 8 }} />
      <DeclarationTextInput
        label="Insurance Company Name"
        declarationPath={"secondCar.insurance.insuranceCompanyName"}
      />
      <DeclarationTextInput
        label="Insurance Policy Number"
        declarationPath={"secondCar.insurance.insurancePolicyNumber"}
      />
      <DeclarationTextInput
        label="Insurance Green Card Number"
        declarationPath={"secondCar.insurance.insuranceGreenCardNumber"}
      />
      <ImpactAssistButton
        onPress={() => setShow2(true)}
        label="Pick Insurance Validity Dates"
      />
      <View style={{ marginVertical: 8 }} />
      <DatePickerModal
        locale="lt"
        mode="range"
        visible={show2}
        withDateFormatInLabel={true}
        onDismiss={() => setShow2(false)}
        startDate={new Date(watch("secondCar.insurance.insuranceValidFrom"))}
        endDate={new Date(watch("secondCar.insurance.insuranceValidTo"))}
        startWeekOnMonday={true}
        onConfirm={({ startDate, endDate }) => {
          setShow2(false);
          updateDeclarationField(
            "secondCar.insurance.insuranceValidFrom" as keyof Declaration,
            startDate as Date,
            carCountryPlate,
            socket,
            setValue,
            webSocketId
          );
          updateDeclarationField(
            "secondCar.insurance.insuranceValidTo" as keyof Declaration,
            endDate as Date,
            carCountryPlate,
            socket,
            setValue,
            webSocketId
          );
        }}
      />
      <Text variant="titleMedium">
        Insurance valid:{" "}
        {dateFormatter.format(
          new Date(watch("secondCar.insurance.insuranceValidFrom"))
        )}
        {" – "}
        {dateFormatter.format(
          new Date(watch("secondCar.insurance.insuranceValidTo"))
        )}
      </Text>
      <View style={{ marginVertical: 8 }} />
      <ImpactAssistButton label="DAMAGE CIRCUMSTANCES" onPress={() => {}} />
      <View style={{ marginVertical: 8 }} />
      <ImpactAssistButton
        label="Pick Damage Circumstance"
        onPress={() => {
          setShowEnumSelector(true);
        }}
      />
      <View style={{ marginVertical: 8 }} />
      <Text variant="titleMedium">
        Damage Circumstance:{" "}
        {camelToTitleCase(watch("secondCar.circumstance") as Circumstance)}
      </Text>
      <View style={{ marginVertical: 8 }} />
      {showEnumSelector && (
        <ImpactAssistEnumSelector
          enumType={Circumstance}
          visible={showEnumSelector}
          onDismiss={() => setShowEnumSelector(false)}
          setSelectedValue={(value) => {
            updateDeclarationField(
              "secondCar.circumstance" as keyof Declaration,
              value,
              carCountryPlate,
              socket,
              setValue,
              webSocketId
            );
          }}
        />
      )}
      <DeclarationTextInput
        label="Damage Description"
        declarationPath={"secondCar.damageDescription"}
      />
      <View style={{ marginBottom: 60 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    width,
    height: "100%",
    left: width * 2,
    padding: 8,
    flexDirection: "column",
    gap: 8,
  },
});
