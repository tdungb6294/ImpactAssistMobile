import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { Dispatch, useContext, useState } from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import { Button, Text, TextInput } from "react-native-paper";
import { DeclarationAction } from "../../reducer/declaration-reducer";
import { DeclarationContext } from "./_context/declaration-context";
import { updateFirstCarCarDetails } from "./_utils/first-car-details/update-first-car-car-details";
import { updateFirstCarDriverDetails } from "./_utils/first-car-details/update-first-car-driver-details";

interface DeclarationFirstCarProps {
  dispatch: Dispatch<DeclarationAction>;
}

const { width } = Dimensions.get("window");

//TODO: add validations and checkboxes

export default function DeclarationFirstCar({
  dispatch,
}: DeclarationFirstCarProps) {
  const { declaration, carCountryPlate, webSocketId, socket } =
    useContext(DeclarationContext);
  const [mode, setMode] = useState<"date" | "time">("date");
  const [show, setShow] = useState(false);

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
    <View style={styles.container}>
      <Text>First vehicle details</Text>
      <TextInput
        label="Car country plate"
        value={declaration.firstCar.car.carCountryPlate}
        onChangeText={(text) =>
          updateFirstCarCarDetails(
            declaration,
            "carCountryPlate",
            text,
            carCountryPlate,
            socket,
            dispatch,
            webSocketId
          )
        }
      />
      <TextInput
        label="Car country registration"
        value={declaration.firstCar.car.carCountryRegistration}
        onChangeText={(text) =>
          updateFirstCarCarDetails(
            declaration,
            "carCountryRegistration",
            text,
            carCountryPlate,
            socket,
            dispatch,
            webSocketId
          )
        }
      />
      <TextInput
        label="Car model"
        value={declaration.firstCar.car.carModel}
        onChangeText={(text) =>
          updateFirstCarCarDetails(
            declaration,
            "carModel",
            text,
            carCountryPlate,
            socket,
            dispatch,
            webSocketId
          )
        }
      />
      <Text>First vehicle driver details</Text>
      <TextInput
        label="First Name"
        value={declaration.firstCar.driver.name}
        onChangeText={(text) =>
          updateFirstCarDriverDetails(
            declaration,
            "name",
            text,
            carCountryPlate,
            socket,
            dispatch,
            webSocketId
          )
        }
      />
      <TextInput
        label="Second Name"
        value={declaration.firstCar.driver.familyName}
        onChangeText={(text) =>
          updateFirstCarDriverDetails(
            declaration,
            "familyName",
            text,
            carCountryPlate,
            socket,
            dispatch,
            webSocketId
          )
        }
      />
      <TextInput
        label="Address"
        value={declaration.firstCar.driver.address}
        onChangeText={(text) =>
          updateFirstCarDriverDetails(
            declaration,
            "address",
            text,
            carCountryPlate,
            socket,
            dispatch,
            webSocketId
          )
        }
      />
      <TextInput
        label="Postal code"
        value={declaration.firstCar.driver.postalCode}
        onChangeText={(text) =>
          updateFirstCarDriverDetails(
            declaration,
            "postalCode",
            text,
            carCountryPlate,
            socket,
            dispatch,
            webSocketId
          )
        }
      />
      <TextInput
        label="Country"
        value={declaration.firstCar.driver.country}
        onChangeText={(text) =>
          updateFirstCarDriverDetails(
            declaration,
            "country",
            text,
            carCountryPlate,
            socket,
            dispatch,
            webSocketId
          )
        }
      />
      <TextInput
        label="Contacts"
        value={declaration.firstCar.driver.contacts}
        onChangeText={(text) =>
          updateFirstCarDriverDetails(
            declaration,
            "contacts",
            text,
            carCountryPlate,
            socket,
            dispatch,
            webSocketId
          )
        }
      />
      <TextInput
        label="Driving Licence Number"
        value={declaration.firstCar.driver.drivingLicenceNumber}
        onChangeText={(text) =>
          updateFirstCarDriverDetails(
            declaration,
            "drivingLicenceNumber",
            text,
            carCountryPlate,
            socket,
            dispatch,
            webSocketId
          )
        }
      />
      <TextInput
        label="Driving Licence Category"
        value={declaration.firstCar.driver.drivingLicenceCategory}
        onChangeText={(text) =>
          updateFirstCarDriverDetails(
            declaration,
            "drivingLicenceCategory",
            text,
            carCountryPlate,
            socket,
            dispatch,
            webSocketId
          )
        }
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width,
    height: 1000,
    backgroundColor: "rgb(102, 175, 151)",
    flex: 1,
    padding: 8,
    flexDirection: "column",
    gap: 8,
  },
});
