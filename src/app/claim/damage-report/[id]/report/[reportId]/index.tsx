import { useQuery } from "@tanstack/react-query";
import * as FileSystem from "expo-file-system";
import { StorageAccessFramework } from "expo-file-system";
import { useLocalSearchParams } from "expo-router";
import { useContext, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Alert,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { ActivityIndicator, Modal, Portal, useTheme } from "react-native-paper";
import { fromByteArray } from "react-native-quick-base64";
import ImpactAssistButton from "../../../../../../components/custom/button";
import ImpactAssistTextInput from "../../../../../../components/custom/new-text-input";
import { CustomTheme } from "../../../../../../theme/theme";
import { createCompensation } from "../../../../../../utils/create-compensation-pdf";
import { fetchDamageReport } from "../../../../../../utils/fetch-damage-report";
import { fetchDamageReportPDF } from "../../../../../../utils/fetch-damage-report-pdf";
import { LanguageContext } from "../../../../../_layout";

export default function DamageReportByIdPage() {
  const theme: CustomTheme = useTheme();
  const { t } = useTranslation();
  const [isCreating, setIsCreating] = useState(false);
  const [visible, setVisibile] = useState(false);
  const showModal = () => setVisibile(true);
  const hideModal = () => setVisibile(false);
  const [compensationAmount, setCompensationAmount] = useState<string>("");

  const { reportId } = useLocalSearchParams();
  const { language } = useContext(LanguageContext);

  const { data, isFetching, refetch } = useQuery({
    queryKey: ["damage-report"],
    queryFn: async () =>
      fetchDamageReport(parseInt(reportId as string), language),
  });

  return (
    <View
      style={[
        {
          flex: 1,
          backgroundColor: theme.colors.background,
          padding: 20,
        },
      ]}
    >
      <Portal>
        <Modal visible={visible} onDismiss={hideModal}>
          <View
            style={{
              borderRadius: 6,
              margin: 20,
              padding: 20,
              gap: 6,
              height: 160,
              backgroundColor: theme.colors.background,
              borderWidth: 2,
              borderColor: theme.colors.borderSeparatorTertiary,
              alignContent: "center",
              justifyContent: "space-between",
              flexDirection: "column",
            }}
          >
            <ImpactAssistTextInput
              keyboardType="numeric"
              label={t("Compensation Amount")}
              value={compensationAmount}
              onChangeText={(text) => {
                const numericRegex = /^\d*(\.\d{0,2})?$/;
                if (numericRegex.test(text)) {
                  setCompensationAmount(text.toUpperCase());
                }
              }}
              onPress={() => {}}
            />
            <ImpactAssistButton
              label={
                isCreating ? <ActivityIndicator /> : t("Create PDF Report")
              }
              onPress={async () => {
                const permissions =
                  await StorageAccessFramework.requestDirectoryPermissionsAsync();
                if (!permissions.granted) {
                  return;
                }
                try {
                  const response = await createCompensation(
                    parseInt(reportId as string),
                    parseFloat(compensationAmount)
                  );
                  const uri = await StorageAccessFramework.createFileAsync(
                    permissions.directoryUri,
                    "compensation.pdf",
                    "application/pdf"
                  );
                  await FileSystem.writeAsStringAsync(
                    uri,
                    fromByteArray(response),
                    {
                      encoding: FileSystem.EncodingType.Base64,
                    }
                  );
                } catch (e) {
                  Alert.alert(t("Error"), t("Failed to create file"), [
                    { text: "OK" },
                  ]);
                  setIsCreating(false);
                  return;
                }
                Alert.alert(
                  t("Success"),
                  t("PDF report created successfully"),
                  [{ text: "OK" }]
                );
              }}
            />
          </View>
        </Modal>
      </Portal>
      <ImpactAssistButton
        style={{
          marginBottom: 8,
        }}
        label={isCreating ? <ActivityIndicator /> : t("Generate PDF Report")}
        onPress={async () => {
          setIsCreating(true);
          const permissions =
            await StorageAccessFramework.requestDirectoryPermissionsAsync();
          if (!permissions.granted) {
            return;
          }
          try {
            const response = await fetchDamageReportPDF(
              parseInt(reportId as string)
            );
            const uri = await StorageAccessFramework.createFileAsync(
              permissions.directoryUri,
              "damage_report.pdf",
              "application/pdf"
            );
            await FileSystem.writeAsStringAsync(uri, fromByteArray(response), {
              encoding: FileSystem.EncodingType.Base64,
            });
          } catch (e) {
            Alert.alert(t("Error"), t("Failed to create file"), [
              { text: "OK" },
            ]);
            setIsCreating(false);
            return;
          }
          Alert.alert(t("Success"), t("PDF report created successfully"), [
            { text: "OK" },
          ]);
          setIsCreating(false);
        }}
      />
      <ImpactAssistButton
        style={{
          marginBottom: 8,
        }}
        label={
          isCreating ? (
            <ActivityIndicator />
          ) : (
            t("Generate PDF Compensation Report")
          )
        }
        onPress={() => showModal()}
      />
      <View
        style={{
          padding: 8,
          marginBottom: 8,
          borderRadius: 6,
          backgroundColor: theme.colors.text,
          alignItems: "center",
        }}
      >
        <Text
          style={{
            fontSize: 20,
            color: theme.colors.background,
            fontWeight: "bold",
          }}
        >
          {t("Details")}
        </Text>
      </View>
      <View
        style={[styles.secondaryContainer, { borderColor: theme.colors.text }]}
      >
        <View>
          <Text style={{ fontWeight: "bold", color: theme.colors.text }}>
            {t("Full Name")}
          </Text>
          <Text numberOfLines={4} style={{ color: theme.colors.text }}>
            {data?.damageReport.fullName}
          </Text>
        </View>
        <View>
          <Text style={{ fontWeight: "bold", color: theme.colors.text }}>
            {t("Estimated Price Without Services")}
          </Text>
          <Text numberOfLines={4} style={{ color: theme.colors.text }}>
            {data?.damageReport.estimatedMinPriceWithoutService} -{" "}
            {data?.damageReport.estimatedMaxPriceWithoutService} $
          </Text>
        </View>
        <View>
          <Text style={{ fontWeight: "bold", color: theme.colors.text }}>
            {t("Estimated Price With Services")}
          </Text>
          <Text numberOfLines={4} style={{ color: theme.colors.text }}>
            {data?.damageReport.estimatedMinPriceWithService} -{" "}
            {data?.damageReport.estimatedMaxPriceWithService} $
          </Text>
        </View>
      </View>
      <View
        style={{
          padding: 8,
          marginTop: 8,
          marginBottom: 4,
          borderRadius: 6,
          backgroundColor: theme.colors.text,
          alignItems: "center",
        }}
      >
        <Text
          style={{
            fontSize: 20,
            color: theme.colors.background,
            fontWeight: "bold",
          }}
        >
          {t("Auto Parts")}
        </Text>
      </View>
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={isFetching}
            onRefresh={() => {
              refetch();
            }}
          />
        }
      >
        {data?.autoPartsAndServices.map((item) => (
          <View
            key={item.id}
            style={[
              styles.secondaryContainer,
              {
                borderColor: theme.colors.text,
                marginVertical: 4,
              },
            ]}
          >
            <View>
              <Text style={{ fontWeight: "bold", color: theme.colors.text }}>
                {t("Auto Part")}
              </Text>
              <Text numberOfLines={1} style={{ color: theme.colors.text }}>
                {item.autoPart}
              </Text>
            </View>
            <View>
              <Text style={{ fontWeight: "bold", color: theme.colors.text }}>
                {t("Category")}
              </Text>
              <Text
                numberOfLines={1}
                style={{ color: theme.colors.text, overflow: "hidden" }}
              >
                {item.categoryName}
              </Text>
            </View>
            <View>
              <Text style={{ fontWeight: "bold", color: theme.colors.text }}>
                {t("Price")}
              </Text>
              <Text numberOfLines={1} style={{ color: theme.colors.text }}>
                {item.minPrice} - {item.maxPrice} $
              </Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  secondaryContainer: {
    borderWidth: 1,
    borderRadius: 6,
    padding: 8,
    gap: 8,
    flexDirection: "column",
  },
});
