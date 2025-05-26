import { get } from "lodash";
import { useContext } from "react";
import { useTranslation } from "react-i18next";
import { Dimensions, StyleSheet, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { HelperText, useTheme } from "react-native-paper";
import { Claim } from "../../../model/claim";
import { CustomTheme } from "../../../theme/theme";
import ImpactAssistTextInput from "../../custom/new-text-input";
import { ClaimContext } from "../_context/claim-context";

interface ClaimVehicleDetailsProps {}

const { width } = Dimensions.get("window");

export default function ClaimVehicleDetails({}: ClaimVehicleDetailsProps) {
  const {
    setValue,
    watch,
    formState: { errors },
  } = useContext(ClaimContext);
  const theme: CustomTheme = useTheme();
  const { t } = useTranslation();
  const getError = (path: keyof Claim) => get(errors, path)?.message;

  return (
    <ScrollView
      keyboardShouldPersistTaps="handled"
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <ImpactAssistTextInput
        label={t("Vehicle Model")}
        value={watch("carModel")}
        onChangeText={(text) => {
          setValue("carModel", text);
        }}
      />
      <HelperText type="error" visible={!!getError("carModel" as keyof Claim)}>
        {getError("carModel" as keyof Claim)}
      </HelperText>
      <View style={{ marginVertical: 8 }} />
      <ImpactAssistTextInput
        label={t("Vehicle Registration Number")}
        value={watch("vehicleRegistrationNumber")}
        onChangeText={(text) => {
          setValue("vehicleRegistrationNumber", text);
        }}
      />
      <HelperText
        type="error"
        visible={!!getError("vehicleRegistrationNumber" as keyof Claim)}
      >
        {getError("vehicleRegistrationNumber" as keyof Claim)}
      </HelperText>
      <View style={{ marginVertical: 8 }} />
      <ImpactAssistTextInput
        label={t("Vehicle Identification Number")}
        value={watch("vehicleIdentificationNumber")}
        onChangeText={(text) => {
          setValue("vehicleIdentificationNumber", text);
        }}
      />
      <HelperText
        type="error"
        visible={!!getError("vehicleIdentificationNumber" as keyof Claim)}
      >
        {getError("vehicleIdentificationNumber" as keyof Claim)}
      </HelperText>
      <View style={{ marginVertical: 8 }} />
      <ImpactAssistTextInput
        label={t("Odometer Mileage")}
        value={watch("odometerMileage")}
        onChangeText={(text) => {
          setValue("odometerMileage", text);
        }}
      />
      <HelperText
        type="error"
        visible={!!getError("odometerMileage" as keyof Claim)}
      >
        {getError("odometerMileage" as keyof Claim)}
      </HelperText>
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
