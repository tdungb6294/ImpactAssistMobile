import { Dimensions, StyleSheet } from "react-native";

const { width, height } = Dimensions.get("screen");

export const mapContentStyles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    height: height,
    width: width,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
    height: height,
    width: width,
  },
});
