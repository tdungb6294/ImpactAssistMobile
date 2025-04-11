import { useState } from "react";
import { useForm } from "react-hook-form";
import { Modal, StyleSheet } from "react-native";
import { LatLng } from "react-native-maps";
import { Portal } from "react-native-paper";
import { Claim as ClaimModel } from "../../model/claim";
import MapContent from "../declaration/_components/map-content";
import { ClaimContext } from "./_context/claim-context";
import ClaimTab from "./claim-tab";

export default function Claim() {
  const [visible, setVisibile] = useState(false);
  const { control, handleSubmit, setValue, formState, watch } =
    useForm<ClaimModel>({
      defaultValues: {
        accidentDatetime: new Date(),
      } as ClaimModel,
    });

  const showModal = () => {
    setVisibile(true);
  };
  const hideModal = () => {
    setVisibile(false);
  };

  const setLocationSelected = (location: LatLng) => {};

  return (
    <ClaimContext.Provider
      value={{
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
            locationSelected={{ latitude: 0, longitude: 0 }}
            setLocationSelected={setLocationSelected}
          />
        </Modal>
      </Portal>
      <ClaimTab
        setLocationSelected={setLocationSelected}
        showModal={showModal}
      />
    </ClaimContext.Provider>
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
