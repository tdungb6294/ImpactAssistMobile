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
    height: "100%",
    position: "absolute",
    left: width * 2,
    backgroundColor: "rgb(223, 152, 173)",
  },
});
