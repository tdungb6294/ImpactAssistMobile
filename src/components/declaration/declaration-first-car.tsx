import { useContext, useState } from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Text, useTheme } from "react-native-paper";
import { DatePickerModal } from "react-native-paper-dates";
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
  const { declaration, carCountryPlate, webSocketId, socket, dispatch } =
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
        declarationPath={["firstCar", "car", "carCountryPlate"]}
      />
      <DeclarationTextInput
        label="Vehicle country registration"
        declarationPath={["firstCar", "car", "carCountryRegistration"]}
      />
      <DeclarationTextInput
        label="Vehicle model"
        declarationPath={["firstCar", "car", "carModel"]}
      />
      <ImpactAssistButton label="DRIVER DETAILS" onPress={() => {}} />
      <View style={{ marginVertical: 8 }} />
      <DeclarationTextInput
        label="First Name"
        declarationPath={["firstCar", "driver", "name"]}
      />
      <DeclarationTextInput
        label="Second Name"
        declarationPath={["firstCar", "driver", "familyName"]}
      />
      <DeclarationTextInput
        label="Address"
        declarationPath={["firstCar", "driver", "address"]}
      />
      <DeclarationTextInput
        label="Postal code"
        declarationPath={["firstCar", "driver", "postalCode"]}
      />
      <DeclarationTextInput
        label="Country"
        declarationPath={["firstCar", "driver", "country"]}
      />
      <DeclarationTextInput
        label="Contacts"
        declarationPath={["firstCar", "driver", "contacts"]}
      />
      <DeclarationTextInput
        label="Driving Licence Number"
        declarationPath={["firstCar", "driver", "drivingLicenceNumber"]}
      />
      <DeclarationTextInput
        label="Driving Licence Category"
        declarationPath={["firstCar", "driver", "drivingLicenceCategory"]}
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
        date={
          new Date(declaration.firstCar.driver.drivingLicenceExpirationDate)
        }
        startWeekOnMonday={true}
        onConfirm={(params) => {
          setShow(false);
          updateDeclarationField(
            ["firstCar", "driver", "drivingLicenceExpirationDate"],
            params.date,
            carCountryPlate,
            socket,
            dispatch,
            webSocketId
          );
        }}
      />
      <View style={{ marginVertical: 8 }} />
      <Text variant="titleMedium">
        Driver license expiration date:{" "}
        {dateFormatter.format(
          new Date(declaration.firstCar.driver.drivingLicenceExpirationDate)
        )}
      </Text>
      <View style={{ marginVertical: 8 }} />
      <ImpactAssistButton label="INSURER DETAILS" onPress={() => {}} />
      <View style={{ marginVertical: 8 }} />
      <DeclarationTextInput
        label="Family Name"
        declarationPath={["firstCar", "insurer", "familyName"]}
      />
      <DeclarationTextInput
        label="Name"
        declarationPath={["firstCar", "insurer", "name"]}
      />
      <DeclarationTextInput
        label="Address"
        declarationPath={["firstCar", "insurer", "address"]}
      />
      <DeclarationTextInput
        label="Postal Code"
        declarationPath={["firstCar", "insurer", "postalCode"]}
      />
      <DeclarationTextInput
        label="Country"
        declarationPath={["firstCar", "insurer", "country"]}
      />
      <DeclarationTextInput
        label="Contacts"
        declarationPath={["firstCar", "insurer", "contacts"]}
      />
      <ImpactAssistButton label="INSURANCE DETAILS" onPress={() => {}} />
      <View style={{ marginVertical: 8 }} />
      <DeclarationTextInput
        label="Insurance Company Name"
        declarationPath={["firstCar", "insurance", "insuranceCompanyName"]}
      />
      <DeclarationTextInput
        label="Insurance Policy Number"
        declarationPath={["firstCar", "insurance", "insurancePolicyNumber"]}
      />
      <DeclarationTextInput
        label="Insurance Green Card Number"
        declarationPath={["firstCar", "insurance", "insuranceGreenCardNumber"]}
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
        startDate={new Date(declaration.firstCar.insurance.insuranceValidFrom)}
        endDate={new Date(declaration.firstCar.insurance.insuranceValidTo)}
        startWeekOnMonday={true}
        onConfirm={({ startDate, endDate }) => {
          setShow2(false);
          updateDeclarationField(
            ["firstCar", "insurance", "insuranceValidFrom"],
            startDate,
            carCountryPlate,
            socket,
            dispatch,
            webSocketId
          );
          updateDeclarationField(
            ["firstCar", "insurance", "insuranceValidTo"],
            endDate,
            carCountryPlate,
            socket,
            dispatch,
            webSocketId
          );
        }}
      />
      <Text variant="titleMedium">
        Insurance valid:{" "}
        {dateFormatter.format(
          new Date(declaration.firstCar.insurance.insuranceValidFrom)
        )}
        {" – "}
        {dateFormatter.format(
          new Date(declaration.firstCar.insurance.insuranceValidTo)
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
        {camelToTitleCase(declaration.firstCar.circumstance)}
      </Text>
      <View style={{ marginVertical: 8 }} />
      {showEnumSelector && (
        <ImpactAssistEnumSelector
          enumType={Circumstance}
          visible={showEnumSelector}
          onDismiss={() => setShowEnumSelector(false)}
          setSelectedValue={(value) => {
            updateDeclarationField(
              ["firstCar", "circumstance"],
              value,
              carCountryPlate,
              socket,
              dispatch,
              webSocketId
            );
          }}
        />
      )}
      <DeclarationTextInput
        label="Damage Description"
        declarationPath={["firstCar", "damageDescription"]}
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
    left: width,
    padding: 8,
    flexDirection: "column",
    gap: 8,
  },
});
