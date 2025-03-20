import { SetStateAction, useState } from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import { TextInput } from "react-native-paper";
import { Declaration } from "../../model/declaration";
import { updateFirstCarCarDetails } from "./_utils/first-car-details/update-first-car-car-details";

interface DeclarationFirstCarProps {
  declaration: Declaration;
  setDeclaration: (value: SetStateAction<Declaration>) => void;
  carCountryPlate: string;
  socket: WebSocket;
}

const { width } = Dimensions.get("window");

export default function DeclarationFirstCar({
  declaration,
  setDeclaration,
  carCountryPlate,
  socket,
}: DeclarationFirstCarProps) {
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);

  return (
    <View style={styles.container}>
      <TextInput
        label="Car country plate"
        value={declaration.firstCar.car.carCountryPlate}
        onChangeText={(text) =>
          updateFirstCarCarDetails(
            declaration,
            "carCountryPlate",
            text,
            setDeclaration,
            timeoutId,
            carCountryPlate,
            setTimeoutId,
            socket
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
            setDeclaration,
            timeoutId,
            carCountryPlate,
            setTimeoutId,
            socket
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
            setDeclaration,
            timeoutId,
            carCountryPlate,
            setTimeoutId,
            socket
          )
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width,
    height: 500,
    backgroundColor: "rgb(102, 175, 151)",
  },
});
