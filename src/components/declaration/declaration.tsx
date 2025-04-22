import { SkPath } from "@shopify/react-native-skia";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Modal, StyleSheet } from "react-native";
import { LatLng } from "react-native-maps";
import { Portal, Snackbar } from "react-native-paper";
import { Declaration as DeclarationModel } from "../../model/declaration";
import MapContent from "./_components/map-content";
import { convertJsonDataToPath } from "./_components/skia-signature";
import { DeclarationContext } from "./_context/declaration-context";
import { initialDeclaration } from "./_data/initial-declaration";
import { updateDeclarationField } from "./_utils/update-declaration-details/update-declaration-details";
import DeclarationTab from "./declaration-tab";

interface DeclarationProps {
  carCountryPlate: string;
}

export default function Declaration({ carCountryPlate }: DeclarationProps) {
  const [webSocketId, setWebSocketId] = useState<number>(1);
  const [error, setError] = useState<boolean>(false);
  const [visible, setVisibile] = useState(false);
  const [firstSignature, setFirstSign] = useState<SkPath[]>([]);
  const [secondSignature, setSecondSign] = useState<SkPath[]>([]);
  const socket = new WebSocket("ws://10.0.2.2:9000");
  const { control, handleSubmit, setValue, formState, watch } =
    useForm<DeclarationModel>({ defaultValues: initialDeclaration });
  const [status, setStatus] = useState("connecting");

  const showModal = () => {
    setVisibile(true);
  };
  const hideModal = () => {
    setVisibile(false);
  };

  const setupWebSocket = () => {
    socket.onopen = () => {
      setStatus("connected");
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
        setValue(data.data.path, data.data.value);
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
      setStatus("disconnected");
      console.log("WebSocket disconnected");
    };
  };

  useEffect(() => {
    setValue("firstCar.car.carCountryPlate", carCountryPlate);

    setupWebSocket();

    return () => {
      socket.close();
    };
  }, []);

  const setLocationSelected = (latLng: LatLng) => {
    updateDeclarationField(
      "accidentLatLng",
      latLng,
      carCountryPlate,
      socket,
      setValue,
      webSocketId
    );
    setValue("accidentLatLng", latLng);
    hideModal();
  };

  return (
    <DeclarationContext.Provider
      value={{
        firstSignature,
        secondSignature,
        setFirstSign,
        setSecondSign,
        socket: socket,
        webSocketId,
        carCountryPlate,
        setValue,
        handleSubmit,
        control,
        formState,
        watch,
      }}
    >
      <Portal>
        <Modal
          style={styles.modal}
          visible={visible}
          onRequestClose={hideModal}
        >
          <MapContent
            locationSelected={watch("accidentLatLng")}
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
