import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { useContext, useState } from "react";
import { Dimensions, StyleSheet } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Button, Text, useTheme } from "react-native-paper";
import { CustomTheme } from "../../theme/theme";
import DeclarationTextInput from "./_components/declaration-text-input";
import { DeclarationContext } from "./_context/declaration-context";
import { updateFirstCarDriverDetails } from "./_utils/first-car-details/update-first-car-driver-details";

interface DeclarationFirstCarProps {}

const { width } = Dimensions.get("window");

//TODO: add validations and checkboxes

export default function DeclarationFirstCar({}: DeclarationFirstCarProps) {
  const { declaration, carCountryPlate, webSocketId, socket, dispatch } =
    useContext(DeclarationContext);
  const [mode, setMode] = useState<"date" | "time">("date");
  const [show, setShow] = useState(false);
  const theme: CustomTheme = useTheme();

  const onChange = (
    _event: DateTimePickerEvent,
    selectedDate: Date | undefined
  ) => {
    setShow(false);
    updateFirstCarDriverDetails(
      declaration,
      "drivingLicenceExpirationDate",
      selectedDate as Date,
      carCountryPlate,
      socket,
      dispatch,
      webSocketId
    );
  };

  const showMode = (currentMode: "date" | "time") => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode("date");
  };

  const showTimepicker = () => {
    showMode("time");
  };

  return (
    <ScrollView
      keyboardShouldPersistTaps="handled"
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <Text>First vehicle details</Text>
      <DeclarationTextInput
        label="Car country plate"
        declarationPath={["firstCar", "car", "carCountryPlate"]}
      />
      <DeclarationTextInput
        label="Car country registration"
        declarationPath={["firstCar", "car", "carCountryRegistration"]}
      />
      <DeclarationTextInput
        label="Car model"
        declarationPath={["firstCar", "car", "carModel"]}
      />
      <Text>First vehicle driver details</Text>
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
      <Button onPress={showDatepicker}>Pick date</Button>
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={
            new Date(declaration.firstCar.driver.drivingLicenceExpirationDate)
          }
          mode={mode}
          is24Hour={true}
          onChange={onChange}
        />
      )}
      <Text>
        Driver license expiration date:{" "}
        {new Date(
          declaration.firstCar.driver.drivingLicenceExpirationDate
        ).toLocaleDateString()}
      </Text>
      <Text>First vehicle insurer details</Text>

      <Text>First vehicle insurance details</Text>
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
