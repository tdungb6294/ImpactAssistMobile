import { useContext } from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import SignatureContainer from "./_components/signature-container";
import SkiaImageContainer from "./_components/skia-image-container";
import { DeclarationContext } from "./_context/declaration-context";

interface DeclarationReviewProps {}

const { width } = Dimensions.get("window");

// TODO: Add text inputs here and validations

export default function DeclarationReview({}: DeclarationReviewProps) {
  const { firstSignature, secondSignature } = useContext(DeclarationContext);

  return (
    <View style={styles.container}>
      <View style={{ flex: 1, flexDirection: "column" }}>
        <SkiaImageContainer paths={firstSignature} />
        <SkiaImageContainer paths={secondSignature} />
        <SignatureContainer />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width,
    left: width * 3,
    height: "100%",
    position: "absolute",
    backgroundColor: "rgb(175, 133, 204)",
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
