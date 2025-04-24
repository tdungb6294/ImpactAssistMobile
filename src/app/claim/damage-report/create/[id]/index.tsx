import { useQuery } from "@tanstack/react-query";
import { useLocalSearchParams } from "expo-router";
import _ from "lodash";
import { useCallback, useContext, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Alert,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import {
  ActivityIndicator,
  TouchableRipple,
  useTheme,
} from "react-native-paper";
import ImpactAssistButton from "../../../../../components/custom/button";
import ImpactAssistTextInput from "../../../../../components/custom/new-text-input";
import { CustomTheme } from "../../../../../theme/theme";
import { createAutoPartsAndServices } from "../../../../../utils/create-auto-parts-and-services";
import {
  AutoPart,
  fetchAutoParts,
} from "../../../../../utils/fetch-auto-parts";
import { LanguageContext } from "../../../../_layout";

export default function ReportDamage() {
  const [search, setSearch] = useState<string>("");
  const [autoParts, setAutoParts] = useState<AutoPart[]>([]);
  const theme: CustomTheme = useTheme();
  const { t } = useTranslation();
  const { language } = useContext(LanguageContext);
  const [isCreating, setIsCreating] = useState(false);

  const { id } = useLocalSearchParams();

  const { isFetching, refetch, data } = useQuery({
    queryKey: ["local_experts"],
    queryFn: async () => fetchAutoParts(search, language),
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: false,
    staleTime: Infinity,
  });

  const debouncedSearch = useCallback(
    _.debounce(() => refetch(), 500),
    []
  );

  const allLocalExperts = data?.autoParts || [];

  return (
    <View
      style={[
        {
          flex: 1,
          backgroundColor: theme.colors.background,
          padding: 20,
          flexDirection: "column",
          justifyContent: "flex-start",
        },
      ]}
    >
      <ImpactAssistTextInput
        label={t("Search")}
        value={search}
        onChangeText={(text) => {
          setSearch(text);
          debouncedSearch();
        }}
      />
      <View
        style={{
          padding: 8,
          marginTop: 8,
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
          {t("Search Results")}
        </Text>
      </View>
      <View
        style={{
          height: "42%",
        }}
      >
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
          {allLocalExperts.map((item) => (
            <TouchableRipple
              key={item.id}
              onPress={() => {
                if (autoParts.find((i) => i.id === item.id)) {
                  return;
                }
                setAutoParts((prev) => [...prev, item]);
              }}
            >
              <View
                style={[
                  styles.secondaryContainer,
                  {
                    borderColor: theme.colors.text,
                    marginVertical: 4,
                  },
                ]}
              >
                <View>
                  <Text
                    style={{ fontWeight: "bold", color: theme.colors.text }}
                  >
                    {t("Auto Part")}
                  </Text>
                  <Text numberOfLines={1} style={{ color: theme.colors.text }}>
                    {item.autoPart}
                  </Text>
                </View>
              </View>
            </TouchableRipple>
          ))}
        </ScrollView>
      </View>
      <View
        style={{
          padding: 8,
          marginTop: 8,
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
          {t("Added Auto Parts")}
        </Text>
      </View>
      <View
        style={{
          height: 280,
        }}
      >
        <ScrollView>
          {autoParts.map((item) => (
            <TouchableRipple
              key={item.id}
              onPress={() => {
                setAutoParts((prev) =>
                  prev.filter((value) => value.id !== item.id)
                );
              }}
            >
              <View
                style={[
                  styles.secondaryContainer,
                  {
                    borderColor: theme.colors.text,
                    marginVertical: 4,
                  },
                ]}
              >
                <View>
                  <Text
                    style={{ fontWeight: "bold", color: theme.colors.text }}
                  >
                    {t("Auto Part")}
                  </Text>
                  <Text numberOfLines={1} style={{ color: theme.colors.text }}>
                    {item.autoPart}
                  </Text>
                </View>
              </View>
            </TouchableRipple>
          ))}
        </ScrollView>
        <ImpactAssistButton
          style={{ marginTop: 8 }}
          label={isCreating ? <ActivityIndicator /> : t("Create Damage Report")}
          onPress={async () => {
            setIsCreating(true);
            const autoPartsIds = autoParts.map((item) => item.id);
            const response = await createAutoPartsAndServices({
              claimId: parseInt(id as string),
              autoPartsAndServices: autoPartsIds,
            });
            if (response === -1) {
              Alert.alert(t("Error"));
            } else {
              Alert.alert(t("Success"));
            }
            setIsCreating(false);
          }}
        />
      </View>
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
