import { useEffect } from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import { Declaration } from "../model/declaration";

interface DeclarationReviewProps {
  declaration: Declaration;
}

const { width } = Dimensions.get("window");

export default function DeclarationReview({
  declaration,
}: DeclarationReviewProps) {
  useEffect(() => {
    console.log("declaration details is here");
  }, []);

  return (
    <View style={styles.container}>
      <></>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width,
    height: 500,
    backgroundColor: "rgb(250, 243, 255)",
  },
});
