import { SkPath } from "@shopify/react-native-skia";
import { useContext, useState } from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import { Checkbox } from "react-native-paper";
import { DeclarationContext } from "../_context/declaration-context";
import SkiaSignature, { convertPathToJsonData } from "./skia-signature";

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
  } = useContext(DeclarationContext);

  const handleOK = (signature: SkPath[]) => {
    isFirst ? setFirstSign(signature) : setSecondSign(signature);
    if (socket.readyState === WebSocket.OPEN) {
      if (isFirst) {
        socket.send(
          JSON.stringify({
            messageType: "exchangeImage",
            data: {
              first: convertPathToJsonData(signature),
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
              second: convertPathToJsonData(signature),
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
        setPaths={isFirst ? setFirstSign : setSecondSign}
        paths={isFirst ? firstSignature : secondSignature}
        onOk={(pathData) => {
          isFirst ? setFirstSign(pathData) : setSecondSign(pathData);
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
