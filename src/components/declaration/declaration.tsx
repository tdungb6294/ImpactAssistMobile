import { useEffect, useReducer, useState } from "react";
import { Modal, StyleSheet, View } from "react-native";
import { LatLng } from "react-native-maps";
import { ActivityIndicator, Portal, Text } from "react-native-paper";
import storage from "../../lib/storage";
import { declarationReducer } from "../../reducer/declaration-reducer";
import SignatureContainer from "./_components/signature-container";
import { DeclarationContext } from "./_context/declaration-context";
import { initialDeclaration } from "./_temp-data/initial-declaration";
import { updateDeclarationDetails } from "./_utils/declaration-details/update-declaration-details";
import MapContent from "./_utils/map-content";
import DeclarationTab from "./declaration-tab";

interface DeclarationProps {
  carCountryPlate: string;
}

export default function Declaration({ carCountryPlate }: DeclarationProps) {
  const [webSocketId, setWebSocketId] = useState<number>(1);
  const [state, dispatch] = useReducer(declarationReducer, initialDeclaration);
  const [error, setError] = useState<string | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  const socket = new WebSocket("ws://10.0.2.2:9000");
  const [visible, setVisibile] = useState(false);
  const [signatureVisibile, setSignatureVisible] = useState(false);
  const [firstSignature, setFirstSign] = useState<string | null>(null);
  const [secondSignature, setSecondSign] = useState<string | null>(null);

  const showSignatureModal = () => {
    setSignatureVisible(true);
  };

  const hideSignatureModal = () => {
    setSignatureVisible(false);
  };

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
      } else if (data.messageType === "exchangeImage") {
        if (data.data.first) setFirstSign(data.data.first);
        if (data.data.second) setSecondSign(data.data.second);
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
    <DeclarationContext.Provider
      value={{
        declaration: state,
        firstSignature,
        secondSignature,
        setFirstSign,
        setSecondSign,
        socket,
        webSocketId,
        carCountryPlate,
      }}
    >
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
      <SignatureContainer
        carCountryPlate={carCountryPlate}
        firstSignature={firstSignature}
        secondSignature={secondSignature}
        setFirstSign={setFirstSign}
        setSecondSign={setSecondSign}
        webSocketId={webSocketId}
        signatureVisible={signatureVisibile}
        setSignatureVisible={setSignatureVisible}
        socket={socket}
      />
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
        showModal={showModal}
        showSignatureModal={showSignatureModal}
        dispatch={dispatch}
      />
    </DeclarationContext.Provider>
  );
}

// FIXME: fix declaration container style

const styles = StyleSheet.create({
  modal: {
    width: "100%",
    height: 500,
    backgroundColor: "red",
    flex: 1,
    flexDirection: "column",
  },
});
