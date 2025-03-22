import { useContext } from "react";
import { Dimensions, Image, StyleSheet, View } from "react-native";
import SignatureContainer from "./_components/signature-container";
import { DeclarationContext } from "./_context/declaration-context";

interface DeclarationReviewProps {}

const { width } = Dimensions.get("window");

// TODO: Add text inputs here and validations

export default function DeclarationReview({}: DeclarationReviewProps) {
  const { firstSignatureImg, secondSignatureImg } =
    useContext(DeclarationContext);
  return (
    <View style={styles.container}>
      <View style={{ flex: 1, flexDirection: "column" }}>
        <View style={styles.preview}>
          {firstSignatureImg ? (
            <Image
              resizeMode={"contain"}
              style={{ width: 100, height: 100 }}
              source={{ uri: firstSignatureImg }}
            />
          ) : null}
        </View>
        <View style={styles.preview}>
          {secondSignatureImg ? (
            <Image
              resizeMode={"contain"}
              style={{ width: 100, height: 100 }}
              source={{ uri: secondSignatureImg }}
            />
          ) : null}
        </View>
        <SignatureContainer />
      </View>
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
