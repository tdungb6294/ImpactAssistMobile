import { useQuery } from "@tanstack/react-query";
import { useLocalSearchParams } from "expo-router";
import { useContext } from "react";
import { useTranslation } from "react-i18next";
import {
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useTheme } from "react-native-paper";
import { CustomTheme } from "../../../../../../theme/theme";
import { fetchDamageReport } from "../../../../../../utils/fetch-damage-report";
import { LanguageContext } from "../../../../../_layout";
export default function DamageReportByIdPage() {
  const theme: CustomTheme = useTheme();
  const { t } = useTranslation();

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
