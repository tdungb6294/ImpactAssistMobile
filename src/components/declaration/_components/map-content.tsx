import { useState } from "react";
import { View } from "react-native";
import MapView, {
  LatLng,
  MapPressEvent,
  Marker,
  PROVIDER_GOOGLE,
} from "react-native-maps";
import ImpactAssistButton from "../../custom/button";
import { mapContentStyles as styles } from "../_styles/map-content/map-content.style";

interface MapContentProps {
  locationSelected: LatLng;
  setLocationSelected: (latLng: LatLng) => void;
}

// FIXME: fix style

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
      <ImpactAssistButton
        onPress={() =>
          markerCoordinates && setLocationSelected(markerCoordinates)
        }
        label="Set location"
      />
    </View>
  );
}
