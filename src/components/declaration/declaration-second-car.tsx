import { Dimensions, StyleSheet, View } from "react-native";
import { Declaration } from "../../model/declaration";

interface DeclarationSecondCarProps {
  declaration: Declaration;
}

const { width } = Dimensions.get("window");

// TODO: Add text inputs here and validations

export default function DeclarationSecondCar({
  declaration,
}: DeclarationSecondCarProps) {
  return (
    <View style={styles.container}>
      <></>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width,
    height: 1000,
    backgroundColor: "rgb(223, 152, 173)",
  },
});
