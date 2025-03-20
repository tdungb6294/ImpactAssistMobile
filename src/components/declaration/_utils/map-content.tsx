import * as Location from "expo-location";
import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import MapView, {
  LatLng,
  MapPressEvent,
  Marker,
  PROVIDER_GOOGLE,
} from "react-native-maps";
import { Button, Text } from "react-native-paper";

interface MapContentProps {
  setLocationSelected: (latLng: LatLng) => void;
}

export default function MapContent({ setLocationSelected }: MapContentProps) {
  const [location, setLocation] = useState<Location.LocationObject | null>(
    null
  );
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [markerCoordinates, setMarkerCoordinates] = useState<LatLng | null>(
    null
  );

  useEffect(() => {
    async function getCurrentLocation() {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getLastKnownPositionAsync();
      setLocation(location);
    }

    getCurrentLocation();
  }, []);

  const handleMapPress = (event: MapPressEvent) => {
    const { coordinate } = event.nativeEvent;
    setMarkerCoordinates(coordinate);
  };

  return (
    <View style={styles.container} onTouchEnd={(e) => e.stopPropagation()}>
      {location !== null && (
        <MapView
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          region={{
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.04,
            longitudeDelta: 0.04,
          }}
          zoomEnabled={true}
          rotateEnabled={true}
          moveOnMarkerPress={true}
          onMapReady={() => console.log("React Native Maps is working!")}
          onPress={handleMapPress}
        >
          <Marker
            coordinate={{
              latitude: markerCoordinates?.latitude || location.coords.latitude,
              longitude:
                markerCoordinates?.longitude || location.coords.longitude,
            }}
            title={"Car accident"}
            description={"car accident happened here"}
          />
        </MapView>
      )}
      {errorMsg && <Text>{errorMsg}</Text>}
      <Button
        onPress={() =>
          markerCoordinates && setLocationSelected(markerCoordinates)
        }
      >
        Return
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    height: 400,
    width: 400,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});
