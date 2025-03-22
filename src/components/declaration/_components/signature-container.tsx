import { useContext, useState } from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import { Checkbox } from "react-native-paper";
import { DeclarationContext } from "../_context/declaration-context";
import SkiaSignature from "./skia-signature";

interface SignatureContainerProps {}

const { width } = Dimensions.get("screen");

export default function SignatureContainer({}: SignatureContainerProps) {
  const [isFirst, setIsFirst] = useState<boolean>(true);
  const {
    firstSignature,
    secondSignature,
    setFirstSign,
    setSecondSign,
    webSocketId,
    carCountryPlate,
    socket,
    setFirstSignatureImg,
    setSecondSignatureImg,
  } = useContext(DeclarationContext);

  const handleOK = (signature: string) => {
    isFirst ? setFirstSign(signature) : setSecondSign(signature);
    if (socket.readyState === WebSocket.OPEN) {
      if (isFirst) {
        socket.send(
          JSON.stringify({
            messageType: "exchangeImage",
            data: {
              first: signature,
            },
            roomName: carCountryPlate,
            id: webSocketId,
          })
        );
      } else {
        socket.send(
          JSON.stringify({
            messageType: "exchangeImage",
            data: {
              second: signature,
            },
            roomName: carCountryPlate,
            id: webSocketId,
          })
        );
      }
    }
  };

  return (
    <View style={styles.signatureContainer}>
      <SkiaSignature
        initialPathData={firstSignature || ""}
        onOk={(pathData, imageData) => {
          isFirst ? setFirstSign(pathData) : setSecondSign(pathData);
          isFirst
            ? setFirstSignatureImg(imageData)
            : setSecondSignatureImg(imageData);
          handleOK(pathData);
        }}
      />
      <Checkbox
        status={isFirst ? "checked" : "unchecked"}
        onPress={() => setIsFirst(!isFirst)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  modal: {
    width: width,
    height: 1200,
  },
  signatureContainer: {
    flex: 1,
  },
});
