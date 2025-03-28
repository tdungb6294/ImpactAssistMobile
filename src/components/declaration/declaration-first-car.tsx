import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { useContext, useMemo, useState } from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Checkbox, Text, useTheme } from "react-native-paper";
import { CustomTheme } from "../../theme/theme";
import { camelToTitleCase } from "../../utils/camel-to-title-case";
import ImpactAssistButton from "../custom/button";
import DeclarationTextInput from "./_components/declaration-text-input";
import { DeclarationContext } from "./_context/declaration-context";
import { updateDeclarationField } from "./_utils/update-declaration-details/update-declaration-details";

interface DeclarationFirstCarProps {}

const { width } = Dimensions.get("window");

//TODO: add validations and checkboxes

export default function DeclarationFirstCar({}: DeclarationFirstCarProps) {
  const { declaration, carCountryPlate, webSocketId, socket, dispatch } =
    useContext(DeclarationContext);
  const [mode, setMode] = useState<"date" | "time">("date");
  const [show, setShow] = useState(false);
  const [show2, setShow2] = useState(false);
  const [show3, setShow3] = useState(false);
  const theme: CustomTheme = useTheme();
  const [selectedBoolean, setSelectedBoolean] = useState(1);
  const keysArray = useMemo(
    () => Object.keys(declaration.firstCar.circumstances),
    []
  );

  const onChange = (
    _event: DateTimePickerEvent,
    path: string[],
    selectedDate: Date | undefined,
    index: number
  ) => {
    switch (index) {
      case 1:
        setShow(false);
        break;
      case 2:
        setShow2(false);
        break;
      case 3:
        setShow3(false);
        break;
    }
    console.log(path, selectedDate, index);
    updateDeclarationField(
      path,
      selectedDate,
      carCountryPlate,
      socket,
      dispatch,
      webSocketId
    );
  };

  const showMode = (currentMode: "date" | "time", index: number) => {
    switch (index) {
      case 1:
        setShow(true);
        break;
      case 2:
        setShow2(true);
        break;
      case 3:
        setShow3(true);
        break;
    }
    setMode(currentMode);
  };

  const showDatepicker = (index: number) => {
    showMode("date", index);
  };

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
        onPress={() => showDatepicker(1)}
        label="Pick Driver Licence Expiration Date"
      />
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={
            new Date(declaration.firstCar.driver.drivingLicenceExpirationDate)
          }
          mode={mode}
          is24Hour={true}
          onChange={(e, selectedDate) =>
            onChange(
              e,
              ["firstCar", "driver", "drivingLicenceExpirationDate"],
              selectedDate,
              1
            )
          }
        />
      )}
      <View style={{ marginVertical: 8 }} />
      <Text variant="titleMedium">
        Driver license expiration date:{" "}
        {new Date(
          declaration.firstCar.driver.drivingLicenceExpirationDate
        ).toLocaleDateString()}
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
      <View
        style={{
          flexDirection: "row",
          width: "100%",
          justifyContent: "space-between",
        }}
      >
        <ImpactAssistButton
          onPress={() => showDatepicker(2)}
          label="Valid From Date"
        />
        <ImpactAssistButton
          onPress={() => showDatepicker(3)}
          label="Valid To Date"
        />
      </View>
      {show2 && (
        <DateTimePicker
          testID="dateTimePicker"
          value={new Date(declaration.firstCar.insurance.insuranceValidFrom)}
          mode={mode}
          is24Hour={true}
          onChange={(e, selectedDate) =>
            onChange(
              e,
              ["firstCar", "insurance", "insuranceValidFrom"],
              selectedDate,
              2
            )
          }
        />
      )}
      <View style={{ marginVertical: 8 }} />
      {show3 && (
        <DateTimePicker
          testID="dateTimePicker"
          value={new Date(declaration.firstCar.insurance.insuranceValidTo)}
          mode={mode}
          is24Hour={true}
          onChange={(e, selectedDate) =>
            onChange(
              e,
              ["firstCar", "insurance", "insuranceValidTo"],
              selectedDate,
              3
            )
          }
        />
      )}
      <View style={{ marginVertical: 8 }} />
      <Text variant="titleMedium">
        Insurance valid:{" "}
        {new Date(
          declaration.firstCar.insurance.insuranceValidFrom
        ).toLocaleDateString()}
        {" – "}
        {new Date(
          declaration.firstCar.insurance.insuranceValidTo
        ).toLocaleDateString()}
      </Text>
      <View style={{ marginVertical: 8 }} />
      <ImpactAssistButton
        label="DAMAGE CIRCUMSTANCES (pick one)"
        onPress={() => {}}
      />
      <View style={{ marginVertical: 8 }} />
      {keysArray.map((key, index) => (
        <View
          key={key}
          style={{
            flexDirection: "row",
            gap: 8,
            justifyContent: "space-between",
          }}
        >
          <Text variant="titleMedium">{camelToTitleCase(key)}</Text>
          <Checkbox
            status={index === selectedBoolean ? "checked" : "unchecked"}
            color={theme.colors.text}
            uncheckedColor={theme.colors.text}
            onPress={() => {
              setSelectedBoolean(index);
            }}
          />
        </View>
      ))}
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
