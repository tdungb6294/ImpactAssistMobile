import * as Location from "expo-location";
import { useContext } from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import { LatLng } from "react-native-maps";
import { Text, useTheme } from "react-native-paper";
import { CustomTheme } from "../../theme/theme";
import ImpactAssistButton from "../custom/button";
import { DeclarationContext } from "./_context/declaration-context";

interface DeclarationDetailsProps {
  showModal: () => void;
  setLocationSelected: (latLng: LatLng) => void;
}

const { width } = Dimensions.get("window");

//FIXME: fix the style

export default function DeclarationDetails({
  showModal,
  setLocationSelected,
}: DeclarationDetailsProps) {
  const { declaration } = useContext(DeclarationContext);
  const theme: CustomTheme = useTheme();

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
    <View
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <View style={styles.mapContainer}>
        <ImpactAssistButton label="Set location" onPress={showModal} />
        <Text>
          Car accident location: {declaration.accidentLatLng.latitude}{" "}
          {declaration.accidentLatLng.longitude}
        </Text>
        <ImpactAssistButton
          label="Current location"
          onPress={() => {
            getCurrentLocation();
          }}
        />
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
    height: "100%",
    backgroundColor: "rgb(163, 221, 221)",
  },
  mapContainer: {
    ...StyleSheet.absoluteFillObject,
  },
});
