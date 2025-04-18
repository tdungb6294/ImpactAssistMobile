import * as Location from "expo-location";
import { useContext, useState } from "react";
import { useTranslation } from "react-i18next";
import { Dimensions, StyleSheet, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";
import { Checkbox, Text, useTheme } from "react-native-paper";
import { DatePickerModal } from "react-native-paper-dates";
import { CompensationMethod } from "../../../model/enum/compensation-method";
import { WeatherCondition } from "../../../model/enum/weather-condition";
import { CustomTheme } from "../../../theme/theme";
import ImpactAssistButton from "../../custom/button";
import ImpactAssistEnumSelector from "../../custom/enum-selector";
import ImpactAssistTextInput from "../../custom/new-text-input";
import { ClaimContext } from "../_context/claim-context";
import { ClaimTabContext } from "../_context/claim-tab-context";

interface ClaimInsuranceAccidentDetailsProps {}

const { width } = Dimensions.get("window");

interface ClaimInsuranceAccidentDetailsProps {
  showModal: () => void;
}

export default function ClaimInsuranceAccidentDetails({
  showModal,
}: ClaimInsuranceAccidentDetailsProps) {
  const [showEnumSelector, setShowEnumSelector] = useState(false);
  const [showEnumSelector2, setShowEnumSelector2] = useState(false);
  const { setValue, watch } = useContext(ClaimContext);
  const theme: CustomTheme = useTheme();
  const [show, setShow] = useState(false);
  const dateFormatter = new Intl.DateTimeFormat("lt-LT", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
  const { handleTapOnInput } = useContext(ClaimTabContext);
  const { t } = useTranslation();

  async function getCurrentLocation() {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      console.log("no permission");
      return;
    }

    let location = await Location.getLastKnownPositionAsync();
    if (location?.coords) {
      console.log(location?.coords.latitude, location?.coords.longitude);
      setValue("locationLatitude", location?.coords.latitude);
      setValue("locationLongitude", location?.coords.longitude);
    }
  }

  return (
    <KeyboardAwareScrollView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <ImpactAssistTextInput
        label={t("Insurance Policy Number")}
        value={watch("insurancePolicyNumber")}
        onChangeText={(text) => {
          setValue("insurancePolicyNumber", text);
        }}
        onPress={handleTapOnInput}
      />
      <View style={{ marginVertical: 8 }} />
      <ImpactAssistTextInput
        label={t("Insurance Company")}
        value={watch("insuranceCompany")}
        onChangeText={(text) => {
          setValue("insuranceCompany", text);
        }}
        onPress={handleTapOnInput}
      />
      <View style={{ marginVertical: 8 }} />
      <ImpactAssistButton
        onPress={() => setShow(true)}
        label={t("Pick Accident Date Time")}
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
      <View style={{ marginVertical: 8 }} />
      <Text variant="titleMedium">
        {t("Accident Datetime")}:{" "}
        {dateFormatter.format(new Date(watch("accidentDatetime")))}
      </Text>
      <View style={{ marginVertical: 8 }} />
      <ImpactAssistButton label={t("Set location")} onPress={showModal} />
      <View style={{ marginVertical: 8 }} />
      <ImpactAssistButton
        label={t("Current location")}
        onPress={() => {
          getCurrentLocation();
        }}
      />
      <View style={{ marginVertical: 8 }} />
      <Text variant="titleMedium">
        {t("Car accident location")}: {watch("locationLongitude")}{" "}
        {watch("locationLatitude")}
      </Text>
      <View style={{ marginVertical: 8 }} />
      <ImpactAssistTextInput
        label={t("Address")}
        value={watch("address")}
        onChangeText={(text) => {
          setValue("address", text);
        }}
        onPress={handleTapOnInput}
      />
      <View style={{ marginVertical: 8 }} />
      <ImpactAssistTextInput
        label={t("Description")}
        value={watch("description")}
        onChangeText={(text) => {
          setValue("description", text);
        }}
        onPress={handleTapOnInput}
      />
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
          {t("Police Involved")}
        </Text>
        <Checkbox
          status={watch("policeInvolved") ? "checked" : "unchecked"}
          onPress={() => setValue("policeInvolved", !watch("policeInvolved"))}
        />
      </View>
      {showEnumSelector && (
        <ImpactAssistEnumSelector
          enumType={WeatherCondition}
          visible={showEnumSelector}
          onDismiss={() => setShowEnumSelector(false)}
          setSelectedValue={(value) => {
            setValue("weatherCondition", t(value) as WeatherCondition);
          }}
        />
      )}
      <ImpactAssistButton
        label={t("Pick Weather Condition On Accident")}
        onPress={() => {
          setShowEnumSelector(true);
        }}
      />
      <Text variant="titleMedium">
        {t("Weather Condition")}: {watch("weatherCondition")}
      </Text>
      {showEnumSelector2 && (
        <ImpactAssistEnumSelector
          enumType={CompensationMethod}
          visible={showEnumSelector2}
          onDismiss={() => setShowEnumSelector2(false)}
          setSelectedValue={(value) => {
            setValue("compensationMethod", value as CompensationMethod);
          }}
        />
      )}
      <ImpactAssistButton
        label={t("Pick Compensation Method")}
        onPress={() => {
          setShowEnumSelector2(true);
        }}
      />
      <Text variant="titleMedium">
        {t("Compensation method")}: {watch("compensationMethod")}
      </Text>
      <View style={{ marginVertical: 8 }} />
      <ImpactAssistTextInput
        label={t("International Bank Account Number")}
        value={watch("internationalBankAccountNumber")}
        onChangeText={(text) => {
          setValue("internationalBankAccountNumber", text);
        }}
        onPress={handleTapOnInput}
      />
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
          {t("Data Management Consent")}
        </Text>
        <Checkbox
          status={watch("dataManagementConsent") ? "checked" : "unchecked"}
          onPress={() =>
            setValue("dataManagementConsent", !watch("dataManagementConsent"))
          }
        />
      </View>
      <View style={{ marginBottom: 60 }} />
    </KeyboardAwareScrollView>
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
