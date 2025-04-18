import { useContext } from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { useTheme } from "react-native-paper";
import { CustomTheme } from "../../../theme/theme";
import ImpactAssistTextInput from "../../custom/new-text-input";
import { ClaimContext } from "../_context/claim-context";

interface ClaimVehicleDetailsProps {}

const { width } = Dimensions.get("window");

export default function ClaimVehicleDetails({}: ClaimVehicleDetailsProps) {
  const { setValue, watch } = useContext(ClaimContext);
  const theme: CustomTheme = useTheme();

  return (
    <ScrollView
      keyboardShouldPersistTaps="handled"
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <ImpactAssistTextInput
        label={"Car Model"}
        value={watch("carModel")}
        onChangeText={(text) => {
          setValue("carModel", text);
        }}
      />
      <View style={{ marginVertical: 8 }} />
      <ImpactAssistTextInput
        label={"Vehicle Registration Number"}
        value={watch("vehicleRegistrationNumber")}
        onChangeText={(text) => {
          setValue("vehicleRegistrationNumber", text);
        }}
      />
      <View style={{ marginVertical: 8 }} />
      <ImpactAssistTextInput
        label={"Vehicle Identification Number"}
        value={watch("vehicleIdentificationNumber")}
        onChangeText={(text) => {
          setValue("vehicleIdentificationNumber", text);
        }}
      />
      <View style={{ marginVertical: 8 }} />
      <ImpactAssistTextInput
        label={"Odometer Mileage"}
        value={watch("odometerMileage")}
        onChangeText={(text) => {
          setValue("odometerMileage", text);
        }}
      />
      <View style={{ marginVertical: 8 }} />
      <View style={{ marginBottom: 60 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    width,
    height: "100%",
    left: 0,
    padding: 8,
    flexDirection: "column",
    gap: 8,
  },
});
