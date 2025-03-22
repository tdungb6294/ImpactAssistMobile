import { Dispatch, SetStateAction } from "react";
import { Modal, StyleSheet, View } from "react-native";
import { Button, Portal } from "react-native-paper";
import Signature from "./signature";

interface SignatureContainerProps {
  signatureVisible: boolean;
  setSignatureVisible: Dispatch<SetStateAction<boolean>>;
  firstSignature: string | null;
  secondSignature: string | null;
  setFirstSign: Dispatch<SetStateAction<string | null>>;
  setSecondSign: Dispatch<SetStateAction<string | null>>;
  webSocketId: number;
  carCountryPlate: string;
  socket: WebSocket;
}

export default function SignatureContainer({
  signatureVisible,
  setSignatureVisible,
  firstSignature,
  secondSignature,
  setFirstSign,
  setSecondSign,
  webSocketId,
  carCountryPlate,
  socket,
}: SignatureContainerProps) {
  return (
    <Portal>
      <Modal
        style={styles.modal}
        visible={signatureVisible}
        onRequestClose={() => setSignatureVisible(false)}
      >
        <View style={styles.signatureContainer}>
          <Signature
            firstSignature={firstSignature}
            secondSignature={secondSignature}
            setFirstSign={setFirstSign}
            setSecondSign={setSecondSign}
            webSocketId={webSocketId}
            carCountryPlate={carCountryPlate}
            socket={socket}
            text="signature"
          />
          <Button onPress={() => setSignatureVisible(false)}>Return</Button>
        </View>
      </Modal>
    </Portal>
  );
}

const styles = StyleSheet.create({
  modal: {
    width: 300,
    height: 300,
  },
  signatureContainer: {
    flex: 1,
  },
});
