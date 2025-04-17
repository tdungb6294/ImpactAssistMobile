import * as DocumentPicker from "expo-document-picker";
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
        locationLatitude: 0,
        locationLongitude: 0,
        accidentDatetime: new Date(),
      } as ClaimModel,
    });
  const [documents, setDocuments] =
    useState<DocumentPicker.DocumentPickerResult | null>(null);
  const [images, setImages] =
    useState<DocumentPicker.DocumentPickerResult | null>(null);

  const showModal = () => {
    setVisibile(true);
  };
  const hideModal = () => {
    setVisibile(false);
  };

  const setLocationSelected = (location: LatLng) => {
    setValue("locationLatitude", location.latitude);
    setValue("locationLongitude", location.longitude);
    hideModal();
  };

  return (
    <ClaimContext.Provider
      value={{
        setValue,
        handleSubmit,
        control,
        formState,
        watch,
        setDocuments,
        setImages,
        documents,
        images,
      }}
    >
      <Portal>
        <Modal
          style={styles.modal}
          visible={visible}
          onRequestClose={hideModal}
        >
          <MapContent
            locationSelected={{
              latitude: watch("locationLatitude"),
              longitude: watch("locationLongitude"),
            }}
            setLocationSelected={setLocationSelected}
          />
        </Modal>
      </Portal>
      <ClaimTab showModal={showModal} />
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
