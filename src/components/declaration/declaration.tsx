import { useEffect, useReducer, useState } from "react";
import { Modal, StyleSheet, View } from "react-native";
import { LatLng } from "react-native-maps";
import { ActivityIndicator, Portal, Text } from "react-native-paper";
import storage from "../../lib/storage";
import { declarationReducer } from "../../reducer/declaration-reducer";
import { initialDeclaration } from "./_temp-data/initial-declaration";
import { updateDeclarationDetails } from "./_utils/declaration-details/update-declaration-details";
import MapContent from "./_utils/map-content";
import DeclarationTab from "./declaration-tab";

interface DeclarationProps {
  carCountryPlate: string;
}

export default function Declaration({ carCountryPlate }: DeclarationProps) {
  const [webSocketId, setWebSocketId] = useState(1);
  const [state, dispatch] = useReducer(declarationReducer, initialDeclaration);
  const [error, setError] = useState<string | undefined>(undefined);
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
    dispatch({
      type: "SET_FIELD",
      fieldUpdate: { firstCar: { car: { carCountryPlate } } },
    });
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
        dispatch({
          type: "SET_FIELD",
          fieldUpdate: data.data,
        });
        storage.save({ key: "declaration", data: state });
      } else if (data.messageType === "exchangeId") {
        setWebSocketId(data.id);
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
      state,
      "accidentLatLng",
      latLng,
      carCountryPlate,
      socket,
      dispatch,
      webSocketId
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
          <MapContent
            locationSelected={state.accidentLatLng}
            setLocationSelected={setLocationSelected}
          />
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
        setLocationSelected={setLocationSelected}
        declaration={state}
        showModal={showModal}
        dispatch={dispatch}
        carCountryPlate={carCountryPlate}
        webSocketId={webSocketId}
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
