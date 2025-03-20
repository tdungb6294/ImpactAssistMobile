import __ from "lodash";
import { useEffect, useState } from "react";
import { Modal, StyleSheet, View } from "react-native";
import { LatLng } from "react-native-maps";
import { ActivityIndicator, Portal, Text, TextInput } from "react-native-paper";
import storage from "../lib/storage";
import { Declaration as DeclarationModel } from "../model/declaration";
import { initialDeclaration } from "./initial-declaration";
import DeclarationTab from "./tabs/declaration-tab";
import MapContent from "./util-components/map-content";

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

  const updateFirstCarCarDetails = (
    key: keyof typeof declaration.firstCar.car,
    value: string
  ) => {
    setDeclaration((prevState) => ({
      ...prevState,
      firstCar: {
        ...prevState.firstCar,
        car: {
          ...prevState.firstCar.car,
          [key]: value,
        },
      },
    }));
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    setTimeoutId(
      setTimeout(() => {
        if (socket.readyState === WebSocket.OPEN) {
          socket.send(
            JSON.stringify({
              messageType: "exchangeData",
              data: {
                firstCar: {
                  car: {
                    [key]: value,
                  },
                },
              },
              roomName: carCountryPlate,
            })
          );
        }
      }, 3000)
    );
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
        const updatedDeclaration = __.merge({}, declaration, data.data);
        storage.save({ key: "declaration", data: declaration });
        setDeclaration(updatedDeclaration);
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
    setDeclaration((prevState) => ({
      ...prevState,
      accidentLatLng: latLng,
    }));
    hideModal();
    setTimeoutId(
      setTimeout(() => {
        if (socket.readyState === WebSocket.OPEN) {
          socket.send(
            JSON.stringify({
              messageType: "exchangeData",
              data: {
                accidentLatLng: latLng,
              },
              roomName: carCountryPlate,
            })
          );
        }
      }, 3000)
    );
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
        <TextInput
          label="Car country plate"
          value={declaration.firstCar.car.carCountryPlate}
          onChangeText={(text) =>
            updateFirstCarCarDetails("carCountryPlate", text)
          }
        />
      </View>
      <DeclarationTab declaration={declaration} showModal={showModal} />
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
