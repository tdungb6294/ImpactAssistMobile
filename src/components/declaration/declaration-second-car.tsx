import { Dimensions, StyleSheet, View } from "react-native";

const { width } = Dimensions.get("window");

// TODO: Add text inputs here and validations

export default function DeclarationSecondCar() {
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
