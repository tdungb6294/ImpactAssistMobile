import * as Location from "expo-location";
import { Dimensions, StyleSheet, View } from "react-native";
import { LatLng } from "react-native-maps";
import { Button, Text } from "react-native-paper";
import { Declaration } from "../../model/declaration";

interface DeclarationDetailsProps {
  declaration: Declaration;
  showModal: () => void;
  setLocationSelected: (latLng: LatLng) => void;
}

const { width } = Dimensions.get("window");

//FIXME: fix the style

export default function DeclarationDetails({
  declaration,
  showModal,
  setLocationSelected,
}: DeclarationDetailsProps) {
  async function getCurrentLocation() {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      console.log("no permission");
      return;
    }

    let location = await Location.getLastKnownPositionAsync();
    if (location?.coords)
      setLocationSelected({
        latitude: location?.coords.latitude,
        longitude: location?.coords.longitude,
      });
  }

  return (
    <View style={styles.container}>
      <View style={styles.mapContainer}>
        <Button onPress={showModal}>Set location</Button>
        <Text>
          Car accident location: {declaration.accidentLatLng.latitude}{" "}
          {declaration.accidentLatLng.longitude}
        </Text>
        <Button onPress={() => getCurrentLocation()}>Current location</Button>
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
    height: 1000,
    backgroundColor: "rgb(163, 221, 221)",
  },
  mapContainer: {
    ...StyleSheet.absoluteFillObject,
  },
});
