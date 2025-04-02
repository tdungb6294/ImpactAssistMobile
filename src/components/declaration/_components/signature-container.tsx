import { SkPath } from "@shopify/react-native-skia";
import { useContext, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Switch, Text } from "react-native-paper";
import { DeclarationContext } from "../_context/declaration-context";
import SkiaSignature, { convertPathToJsonData } from "./skia-signature";

export default function SignatureContainer() {
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
      <View
        style={{
          position: "absolute",
          alignItems: "center",
          width: "100%",
          flexDirection: "row",
          justifyContent: "space-between",
          bottom: 140,
        }}
      >
        <Text variant="titleSmall">
          Toggle Signature{" [Focused Signature: "}
          {isFirst ? "First]" : "Second]"}
        </Text>
        <Switch value={isFirst} onValueChange={() => setIsFirst(!isFirst)} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  signatureContainer: {
    flex: 1,
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "space-between",
  },
});
