import { SkPath } from "@shopify/react-native-skia";
import { useEffect, useReducer, useState } from "react";
import { Modal, StyleSheet } from "react-native";
import { LatLng } from "react-native-maps";
import { Portal, Snackbar } from "react-native-paper";
import storage from "../../lib/storage";
import { declarationErrorReducer } from "../../reducer/declaration-error-reducer";
import { declarationReducer } from "../../reducer/declaration-reducer";
import MapContent from "./_components/map-content";
import { convertJsonDataToPath } from "./_components/skia-signature";
import { DeclarationContext } from "./_context/declaration-context";
import { initialDeclaration } from "./_data/initial-declaration";
import { initialDeclarationError } from "./_data/initial-declaration-error";
import { updateDeclarationField } from "./_utils/update-declaration-details/update-declaration-details";
import DeclarationTab from "./declaration-tab";

interface DeclarationProps {
  carCountryPlate: string;
}

export default function Declaration({ carCountryPlate }: DeclarationProps) {
  const [errorState, dispatchError] = useReducer(
    declarationErrorReducer,
    initialDeclarationError
  );
  const [webSocketId, setWebSocketId] = useState<number>(1);
  const [state, dispatch] = useReducer(declarationReducer, initialDeclaration);
  const [error, setError] = useState<boolean>(false);
  const socket = new WebSocket("ws://10.0.2.2:9000");
  const [visible, setVisibile] = useState(false);
  const [firstSignature, setFirstSign] = useState<SkPath[]>([]);
  const [secondSignature, setSecondSign] = useState<SkPath[]>([]);

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
        if (data.data.first)
          setFirstSign(convertJsonDataToPath(data.data.first));
        if (data.data.second)
          setSecondSign(convertJsonDataToPath(data.data.second));
      } else if (data.messageType === "exchangeId") {
        setWebSocketId(data.id);
      }
    };

    socket.onerror = () => {
      setError(true);
    };

    socket.onclose = () => {
      setError(true);
      console.log("WebSocket disconnected");
    };

    return () => {
      socket.close();
    };
  }, []);

  const setLocationSelected = (latLng: LatLng) => {
    updateDeclarationField(
      ["accidentLatLng"],
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
        declarationError: errorState,
        dispatch,
        dispatchError,
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
      <DeclarationTab
        setLocationSelected={setLocationSelected}
        showModal={showModal}
      />
      <Snackbar
        visible={error}
        onDismiss={() => setError(false)}
        action={{
          label: "Understood",
          onPress: () => {
            setError(false);
          },
        }}
      >
        Error connecting to the Server
      </Snackbar>
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
