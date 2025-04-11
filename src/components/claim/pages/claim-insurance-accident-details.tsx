import { useContext, useState } from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Checkbox, Text, useTheme } from "react-native-paper";
import { DatePickerModal } from "react-native-paper-dates";
import { CustomTheme } from "../../../theme/theme";
import ImpactAssistButton from "../../custom/button";
import ImpactAssistTextInput from "../../custom/new-text-input";
import { ClaimContext } from "../_context/claim-context";
import { ClaimTabContext } from "../_context/claim-tab-context";

interface ClaimInsuranceAccidentDetailsProps {}

const { width } = Dimensions.get("window");

export default function ClaimInsuranceAccidentDetails({}: ClaimInsuranceAccidentDetailsProps) {
  const { setValue, watch } = useContext(ClaimContext);
  const theme: CustomTheme = useTheme();
  const [show, setShow] = useState(false);
  const dateFormatter = new Intl.DateTimeFormat("lt-LT", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
  const { handleTapOnInput } = useContext(ClaimTabContext);

  return (
    <ScrollView
      keyboardShouldPersistTaps="handled"
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <ImpactAssistTextInput
        label={"Insurance Policy Number"}
        value={watch("insurancePolicyNumber")}
        onChangeText={(text) => {
          setValue("insurancePolicyNumber", text);
        }}
        onPress={handleTapOnInput}
      />
      <View style={{ marginVertical: 8 }} />
      <ImpactAssistButton
        onPress={() => setShow(true)}
        label="Pick Accident Date Time"
      />
      <DatePickerModal
        locale="lt"
        mode="single"
        visible={show}
        onDismiss={() => setShow(false)}
        date={new Date(watch("accidentDatetime"))}
        startWeekOnMonday={true}
        onConfirm={(params) => {
          setShow(false);
          setValue("accidentDatetime", params.date as Date);
        }}
      />
      <Text variant="titleMedium">
        Driver license expiration date:{" "}
        {dateFormatter.format(new Date(watch("accidentDatetime")))}
      </Text>
      <View style={{ marginVertical: 8 }} />
      <ImpactAssistTextInput
        label={"Insurance Company"}
        value={watch("insuranceCompany")}
        onChangeText={(text) => {
          setValue("insuranceCompany", text);
        }}
        onPress={handleTapOnInput}
      />
      <View style={{ marginVertical: 8 }} />
      <ImpactAssistTextInput
        label={"Address"}
        value={watch("address")}
        onChangeText={(text) => {
          setValue("address", text);
        }}
        onPress={handleTapOnInput}
      />
      <View style={{ marginVertical: 8 }} />
      <ImpactAssistTextInput
        label={"Description"}
        value={watch("description")}
        onChangeText={(text) => {
          setValue("description", text);
        }}
        onPress={handleTapOnInput}
      />
      <View style={{ marginVertical: 8 }} />
      <View
        style={{
          flexDirection: "row",
          alignContent: "center",
          justifyContent: "space-between",
        }}
      >
        <Text
          variant="titleMedium"
          style={{ height: "100%", textAlignVertical: "center" }}
        >
          Police involved?
        </Text>

        <Checkbox
          status={watch("policeInvolved") ? "checked" : "unchecked"}
          onPress={() => setValue("policeInvolved", !watch("policeInvolved"))}
        />
      </View>
      <View style={{ marginBottom: 60 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    width,
    height: "100%",
    left: width,
    padding: 8,
    flexDirection: "column",
    gap: 8,
  },
});
