import __ from "lodash";
import { useEffect, useState } from "react";
import { Modal, StyleSheet, View } from "react-native";
import { LatLng } from "react-native-maps";
import { ActivityIndicator, Portal, Text } from "react-native-paper";
import storage from "../../lib/storage";
import { Declaration as DeclarationModel } from "../../model/declaration";
import { initialDeclaration } from "./_temp-data/initial-declaration";
import { updateDeclarationDetails } from "./_utils/declaration-details/update-declaration-details";
import MapContent from "./_utils/map-content";
import DeclarationTab from "./declaration-tab";

interface DeclarationProps {
  carCountryPlate: string;
}

export default function Declaration({ carCountryPlate }: DeclarationProps) {
  const [declaration, setDeclaration] =
    useState<DeclarationModel>(initialDeclaration);
  const [error, setError] = useState<string | undefined>(undefined);
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);
  const [loading, setLoading] = useState(true);
  const socket = new WebSocket("ws://10.0.2.2:9000");
  const [visible, setVisibile] = useState(false);

  const showModal = () => {
    setVisibile(true);
  };
  const hideModal = () => {
    setVisibile(false);
  };

  useEffect(() => {
    const newDeclaration = declaration;
    newDeclaration.firstCar.car.carCountryPlate = carCountryPlate;
    setDeclaration(declaration);
    socket.onopen = () => {
      setLoading(false);
      socket.send(
        JSON.stringify({
          messageType: "joinRoom",
          data: {
            firstCar: {
              car: {
                carCountryPlate: carCountryPlate,
              },
            },
          },
        })
      );
    };

    socket.onmessage = (event: MessageEvent) => {
      const data = JSON.parse(event.data);
      if (data.messageType === "exchangeData") {
        const updatedDeclaration: DeclarationModel = __.merge(
          {},
          declaration,
          data.data
        );
        storage.save({ key: "declaration", data: updatedDeclaration });
        setDeclaration(updatedDeclaration);
        console.log(JSON.stringify(declaration.firstCar.car));
      }
    };

    socket.onerror = () => {
      setLoading(false);
      setError("Server unavailable");
    };

    socket.onclose = () => {
      console.log("WebSocket disconnected");
    };

    return () => {
      socket.close();
    };
  }, []);

  const setLocationSelected = (latLng: LatLng) => {
    updateDeclarationDetails(
      declaration,
      "accidentLatLng",
      latLng,
      setDeclaration,
      timeoutId,
      carCountryPlate,
      setTimeoutId,
      socket
    );
    hideModal();
  };

  return (
    <>
      <Portal>
        <Modal
          style={styles.modal}
          visible={visible}
          onRequestClose={hideModal}
        >
          <MapContent setLocationSelected={setLocationSelected} />
        </Modal>
      </Portal>
      <View>
        {loading ? (
          <View>
            <Text>Connecting to the server</Text>
            <ActivityIndicator />
          </View>
        ) : (
          error && <Text>{error}</Text>
        )}
      </View>
      <DeclarationTab
        declaration={declaration}
        showModal={showModal}
        setDeclaration={setDeclaration}
        carCountryPlate={carCountryPlate}
        socket={socket}
      />
    </>
  );
}

const styles = StyleSheet.create({
  modal: {
    width: "100%",
    height: 500,
    backgroundColor: "red",
    flex: 1,
    flexDirection: "column",
  },
});
