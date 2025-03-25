import { Dimensions, StyleSheet, View } from "react-native";
import { useTheme } from "react-native-paper";
import { CustomTheme } from "../../theme/theme";

const { width } = Dimensions.get("window");

// TODO: Add text inputs here and validations

export default function DeclarationSecondCar() {
  const theme: CustomTheme = useTheme();

  return (
    <View
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
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
