import { useContext } from "react";
import { Dimensions, Image, StyleSheet, View } from "react-native";
import { Button } from "react-native-paper";
import { DeclarationContext } from "./_context/declaration-context";

interface DeclarationReviewProps {
  showSignatureModal: () => void;
}

const { width } = Dimensions.get("window");

// TODO: Add text inputs here and validations

export default function DeclarationReview({
  showSignatureModal,
}: DeclarationReviewProps) {
  const { firstSignature, secondSignature } = useContext(DeclarationContext);
  return (
    <View style={styles.container}>
      <View style={{ flex: 1, flexDirection: "column" }}>
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
      <Button onPress={showSignatureModal}>Show signature</Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width,
    height: 1000,
    backgroundColor: "rgb(175, 133, 204)",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignContent: "flex-start",
  },
  preview: {
    width: 100,
    height: 100,
    backgroundColor: "#F8F8F8",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 15,
  },
});
