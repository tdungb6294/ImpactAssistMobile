import { useContext } from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import { Text, useTheme } from "react-native-paper";
import { CustomTheme } from "../../theme/theme";
import ImpactAssistButton from "../custom/button";
import DeclarationTextInput from "./_components/declaration-text-input";
import SignatureContainer from "./_components/signature-container";
import SkiaImageContainer from "./_components/skia-image-container";
import { DeclarationContext } from "./_context/declaration-context";

interface DeclarationReviewProps {}

const { width } = Dimensions.get("window");

// TODO: Add text inputs here and validations

export default function DeclarationReview({}: DeclarationReviewProps) {
  const { firstSignature, secondSignature, handleSubmit } =
    useContext(DeclarationContext);
  const theme: CustomTheme = useTheme();

  return (
    <View
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <View
        style={{
          flex: 1,
          flexDirection: "column",
          paddingTop: 10,
          paddingHorizontal: 20,
          justifyContent: "center",
          alignContent: "center",
        }}
      >
        <DeclarationTextInput
          label={"Culprit"}
          declarationPath={"culprit.fullName"}
        />
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            padding: 10,
          }}
        >
          <View style={{ alignItems: "center" }}>
            <Text variant="titleMedium">First Signature</Text>
            <SkiaImageContainer paths={firstSignature} />
          </View>
          <View style={{ alignItems: "center" }}>
            <Text variant="titleMedium">Second Signature</Text>
            <SkiaImageContainer paths={secondSignature} />
          </View>
        </View>
        <SignatureContainer />
      </View>
      <View
        style={{
          flex: 1,
          position: "absolute",
          bottom: 0,
          marginBottom: 80,
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
        }}
      >
        <ImpactAssistButton
          label="Submit Accident Declaration"
          onPress={handleSubmit(async (data) => {})}
        />
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
