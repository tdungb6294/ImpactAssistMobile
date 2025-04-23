import { useQuery } from "@tanstack/react-query";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useTranslation } from "react-i18next";
import { FlatList, RefreshControl, StyleSheet, Text, View } from "react-native";
import { TouchableRipple, useTheme } from "react-native-paper";
import { CustomTheme } from "../../../../theme/theme";
import { fetchDamageReportList } from "../../../../utils/fetch-damage-report-list";

export default function DamageReportList() {
  const theme: CustomTheme = useTheme();
  const { t } = useTranslation();

  const { id } = useLocalSearchParams();

  const { data, isFetching, refetch } = useQuery({
    queryKey: ["damage-report", id],
    queryFn: async () => fetchDamageReportList(parseInt(id as string)),
  });
  const router = useRouter();

  return (
    <View
      style={{ flex: 1, padding: 20, backgroundColor: theme.colors.background }}
    >
      <FlatList
        data={data}
        keyExtractor={(item) => item.reportId.toString()}
        renderItem={({ item }) => (
          <TouchableRipple
            style={{ flex: 1 }}
            onPress={() => {
              router.navigate(
                `claim/damage-report/${id}/report/${item.reportId.toString()}`
              );
            }}
          >
            <View
              style={[
                styles.container,
                {
                  borderColor: theme.colors.text,
                },
              ]}
            >
              <View>
                <Text
                  style={{
                    fontWeight: "bold",
                    color: theme.colors.text,
                  }}
                >
                  {t("Damage report ID")}: {item.reportId}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                }}
              >
                <Text style={{ fontWeight: "bold", color: theme.colors.text }}>
                  {t("Damage report was created by")}{" "}
                </Text>
                <Text style={{ color: theme.colors.text }}>
                  {item.fullName}
                </Text>
              </View>
            </View>
          </TouchableRipple>
        )}
        refreshing={isFetching}
        onRefresh={() => {
          refetch();
        }}
        style={{
          marginTop: 8,
          marginBottom: 80,
        }}
        contentContainerStyle={{
          gap: 16,
        }}
        refreshControl={
          <RefreshControl refreshing={isFetching} onRefresh={() => refetch()} />
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderRadius: 6,
    padding: 8,
    gap: 8,
    flexDirection: "column",
  },
  secondaryContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 4,
  },
});
