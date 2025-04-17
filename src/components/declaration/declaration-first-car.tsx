import { useContext, useState } from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";
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

interface DeclarationFirstCarProps {}

const { width } = Dimensions.get("window");

//TODO: add validations and checkboxes

export default function DeclarationFirstCar({}: DeclarationFirstCarProps) {
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
    <KeyboardAwareScrollView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
      contentContainerStyle={{ gap: 8 }}
      ScrollViewComponent={ScrollView}
    >
      <ImpactAssistButton label="VEHICLE DETAILS" onPress={() => {}} />
      <DeclarationTextInput
        label="Vehicle country plate"
        declarationPath={"firstCar.car.carCountryPlate"}
      />
      <DeclarationTextInput
        label="Vehicle country registration"
        declarationPath={"firstCar.car.carCountryRegistration"}
      />
      <DeclarationTextInput
        label="Vehicle model"
        declarationPath={"firstCar.car.carModel"}
      />
      <ImpactAssistButton label="DRIVER DETAILS" onPress={() => {}} />
      <View style={{ marginVertical: 8 }} />
      <DeclarationTextInput
        label="First Name"
        declarationPath={"firstCar.driver.name"}
      />
      <DeclarationTextInput
        label="Second Name"
        declarationPath={"firstCar.driver.familyName"}
      />
      <DeclarationTextInput
        label="Address"
        declarationPath={"firstCar.driver.address"}
      />
      <DeclarationTextInput
        label="Postal code"
        declarationPath={"firstCar.driver.postalCode"}
      />
      <DeclarationTextInput
        label="Country"
        declarationPath={"firstCar.driver.country"}
      />
      <DeclarationTextInput
        label="Contacts"
        declarationPath={"firstCar.driver.contacts"}
      />
      <DeclarationTextInput
        label="Driving Licence Number"
        declarationPath={"firstCar.driver.drivingLicenceNumber"}
      />
      <DeclarationTextInput
        label="Driving Licence Category"
        declarationPath={"firstCar.driver.drivingLicenceCategory"}
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
        date={new Date(watch("firstCar.driver.drivingLicenceExpirationDate"))}
        startWeekOnMonday={true}
        onConfirm={(params) => {
          setShow(false);
          updateDeclarationField(
            "firstCar.driver.drivingLicenceExpirationDate" as keyof Declaration,
            params.date as Date,
            carCountryPlate,
            socket,
            setValue,
            webSocketId
          );
        }}
      />
      <Text variant="titleMedium">
        Driver license expiration date:{" "}
        {dateFormatter.format(
          new Date(watch("firstCar.driver.drivingLicenceExpirationDate"))
        )}
      </Text>
      <ImpactAssistButton label="INSURER DETAILS" onPress={() => {}} />
      <DeclarationTextInput
        label="Family Name"
        declarationPath={"firstCar.insurer.familyName"}
      />
      <DeclarationTextInput
        label="Name"
        declarationPath={"firstCar.insurer.name"}
      />
      <DeclarationTextInput
        label="Address"
        declarationPath={"firstCar.insurer.address"}
      />
      <DeclarationTextInput
        label="Postal Code"
        declarationPath={"firstCar.insurer.postalCode"}
      />
      <DeclarationTextInput
        label="Country"
        declarationPath={"firstCar.insurer.country"}
      />
      <DeclarationTextInput
        label="Contacts"
        declarationPath={"firstCar.insurer.contacts"}
      />
      <ImpactAssistButton label="INSURANCE DETAILS" onPress={() => {}} />
      <View style={{ marginVertical: 8 }} />
      <DeclarationTextInput
        label="Insurance Company Name"
        declarationPath={"firstCar.insurance.insuranceCompanyName"}
      />
      <DeclarationTextInput
        label="Insurance Policy Number"
        declarationPath={"firstCar.insurance.insurancePolicyNumber"}
      />
      <DeclarationTextInput
        label="Insurance Green Card Number"
        declarationPath={"firstCar.insurance.insuranceGreenCardNumber"}
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
        startDate={new Date(watch("firstCar.insurance.insuranceValidFrom"))}
        endDate={new Date(watch("firstCar.insurance.insuranceValidTo"))}
        startWeekOnMonday={true}
        onConfirm={({ startDate, endDate }) => {
          setShow2(false);
          updateDeclarationField(
            "firstCar.insurance.insuranceValidFrom" as keyof Declaration,
            startDate as Date,
            carCountryPlate,
            socket,
            setValue,
            webSocketId
          );
          updateDeclarationField(
            "firstCar.insurance.insuranceValidTo" as keyof Declaration,
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
          new Date(watch("firstCar.insurance.insuranceValidFrom"))
        )}
        {" – "}
        {dateFormatter.format(
          new Date(watch("firstCar.insurance.insuranceValidTo"))
        )}
      </Text>
      <ImpactAssistButton label="DAMAGE CIRCUMSTANCES" onPress={() => {}} />
      <ImpactAssistButton
        label="Pick Damage Circumstance"
        onPress={() => {
          setShowEnumSelector(true);
        }}
      />
      <Text variant="titleMedium">
        Damage Circumstance:{" "}
        {camelToTitleCase(watch("firstCar.circumstance") as Circumstance)}
      </Text>
      {showEnumSelector && (
        <ImpactAssistEnumSelector
          enumType={Circumstance}
          visible={showEnumSelector}
          onDismiss={() => setShowEnumSelector(false)}
          setSelectedValue={(value) => {
            updateDeclarationField(
              "firstCar.circumstance" as keyof Declaration,
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
        declarationPath={"firstCar.damageDescription"}
      />
      <View style={{ marginBottom: 20 }} />
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    width,
    height: "100%",
    left: width,
    padding: 8,
    flexDirection: "column",
    gap: 8,
  },
});
