import { useState } from "react";
import { StyleSheet, View } from "react-native";
import MapView, {
  LatLng,
  MapPressEvent,
  Marker,
  PROVIDER_GOOGLE,
} from "react-native-maps";
import { Button } from "react-native-paper";

interface MapContentProps {
  locationSelected: LatLng;
  setLocationSelected: (latLng: LatLng) => void;
}

export default function MapContent({
  setLocationSelected,
  locationSelected,
}: MapContentProps) {
  const [markerCoordinates, setMarkerCoordinates] = useState<LatLng | null>(
    null
  );

  const handleMapPress = (event: MapPressEvent) => {
    const { coordinate } = event.nativeEvent;
    setMarkerCoordinates(coordinate);
  };

  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        region={{
          latitude: locationSelected.latitude,
          longitude: locationSelected.longitude,
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
            latitude: markerCoordinates?.latitude || locationSelected.latitude,
            longitude:
              markerCoordinates?.longitude || locationSelected.longitude,
          }}
          title={"Car accident"}
          description={"car accident happened here"}
        />
      </MapView>
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
