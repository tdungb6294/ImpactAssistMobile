import { useEffect } from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import { Declaration } from "../model/declaration";

interface DeclarationFirstCarProps {
  declaration: Declaration;
}

const { width } = Dimensions.get("window");

export default function DeclarationFirstCar({
  declaration,
}: DeclarationFirstCarProps) {
  useEffect(() => {
    console.log("declaration first is here");
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
    backgroundColor: "rgb(102, 175, 151)",
  },
});
