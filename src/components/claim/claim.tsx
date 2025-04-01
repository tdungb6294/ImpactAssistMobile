import { useReducer, useState } from "react";
import { Modal, StyleSheet } from "react-native";
import { LatLng } from "react-native-maps";
import { Portal } from "react-native-paper";
import { Claim as ClaimModel } from "../../model/claim";
import { ClaimError } from "../../model/claim-error";
import { claimErrorReducer } from "../../reducer/claim-error-reducer";
import { claimReducer } from "../../reducer/claim-reducer";
import MapContent from "../declaration/_components/map-content";
import { ClaimContext } from "./_context/claim-context";
import ClaimTab from "./claim-tab";

export default function Claim() {
  const [errorState, dispatchError] = useReducer(
    claimErrorReducer,
    {} as ClaimError
  );
  const [state, dispatch] = useReducer(claimReducer, {} as ClaimModel);
  const [visible, setVisibile] = useState(false);

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
        claim: state,
        claimError: errorState,
        dispatch: dispatch,
        dispatchError: dispatchError,
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
