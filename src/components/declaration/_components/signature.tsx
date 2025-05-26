import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { Image, StyleSheet, View } from "react-native";
import { Checkbox, Text } from "react-native-paper";
import SignatureScreen, {
  SignatureViewRef,
} from "react-native-signature-canvas";
interface SignatureProps {
  text: string;
  firstSignature: string | null;
  secondSignature: string | null;
  setFirstSign: Dispatch<SetStateAction<string | null>>;
  setSecondSign: Dispatch<SetStateAction<string | null>>;
  webSocketId: number;
  carCountryPlate: string;
  socket: WebSocket;
}

export default function Signature({
  text,
  firstSignature,
  secondSignature,
  setFirstSign,
  setSecondSign,
  webSocketId,
  carCountryPlate,
  socket,
}: SignatureProps) {
  const [isFirst, setIsFirst] = useState<boolean>(true);
  const ref = useRef<SignatureViewRef>(null);

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

  const handleEmpty = () => {
    console.log("Empty");
  };

  useEffect(() => {
    console.log("first signature has been updated!");
  }, [firstSignature]);

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 1, flexDirection: "row", gap: 8 }}>
        <View style={styles.preview}>
          {firstSignature ? (
            <Image
              resizeMode={"contain"}
              style={{ width: 100, height: 100 }}
              source={{ uri: firstSignature }}
            />
          ) : null}
        </View>
        <View style={styles.preview}>
          {secondSignature ? (
            <Image
              resizeMode={"contain"}
              style={{ width: 100, height: 100 }}
              source={{ uri: secondSignature }}
            />
          ) : null}
        </View>
      </View>
      <SignatureScreen
        ref={ref}
        onOK={handleOK}
        onEmpty={handleEmpty}
        descriptionText={text}
        clearText="Clear"
        confirmText="Save"
        autoClear={false}
      />
      <Text>First</Text>
      <Checkbox
        status={isFirst ? "checked" : "unchecked"}
        onPress={() => setIsFirst(!isFirst)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  preview: {
    width: 100,
    height: 100,
    backgroundColor: "#F8F8F8",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 15,
  },
  previewText: {
    color: "#FFF",
    fontSize: 14,
    height: 40,
    lineHeight: 40,
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: "#69B2FF",
    width: 120,
    textAlign: "center",
    marginTop: 10,
  },
});
