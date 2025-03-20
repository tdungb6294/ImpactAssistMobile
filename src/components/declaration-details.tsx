import { useEffect } from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import { Button } from "react-native-paper";
import { Declaration } from "../model/declaration";

interface DeclarationDetailsProps {
  declaration: Declaration;
  showModal: () => void;
}

const { width } = Dimensions.get("window");

export default function DeclarationDetails({
  declaration,
  showModal,
}: DeclarationDetailsProps) {
  useEffect(() => {
    console.log("declaration details is here");
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.mapContainer}>
        <Button onPress={showModal}>Set location</Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  modal: {
    backgroundColor: "red",
  },
  container: {
    width,
    height: 500,
    backgroundColor: "rgb(163, 221, 221)",
  },
  mapContainer: {
    ...StyleSheet.absoluteFillObject,
  },
});
