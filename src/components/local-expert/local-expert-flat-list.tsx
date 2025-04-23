import { useQuery } from "@tanstack/react-query";
import _ from "lodash";
import { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import { Alert, FlatList, RefreshControl, View } from "react-native";
import {
  ActivityIndicator,
  TouchableRipple,
  useTheme,
} from "react-native-paper";
import { CustomTheme } from "../../theme/theme";
import { fetchLocalExperts } from "../../utils/fetch-local-experts";
import { shareClaimWithLocalExpert } from "../../utils/share-claim-with-local-expert";
import ImpactAssistTextInput from "../custom/new-text-input";
import LocalExpertCard from "./local-expert-card";

interface LocalExpertFlatListProps {
  claimId: number;
  hideModal: () => void;
}

export default function LocalExpertFlatList({
  claimId,
  hideModal,
}: LocalExpertFlatListProps) {
  const [search, setSearch] = useState("");
  const theme: CustomTheme = useTheme();
  const [isLoading, setIsLoading] = useState(false);
  const { t } = useTranslation();
  const { isFetching, refetch, data } = useQuery({
    queryKey: ["local_experts"],
    queryFn: async () => fetchLocalExperts(search),
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: false,
    staleTime: Infinity,
  });

  const debouncedSearch = useCallback(
    _.debounce(() => refetch(), 500),
    []
  );

  const allLocalExperts = data ?? [];

  return (
    <View
      style={{
        height: 460,
        backgroundColor: theme.colors.background,
        borderRadius: 6,
        margin: 20,
        padding: 20,
        gap: 16,
        borderWidth: 2,
        borderColor: theme.colors.borderSeparatorTertiary,
      }}
    >
      <ImpactAssistTextInput
        label={t("Search")}
        value={search}
        onChangeText={(text) => {
          setSearch(text);
          debouncedSearch();
        }}
      />
      <FlatList
        style={{
          gap: 16,
          height: 400,
          backgroundColor: theme.colors.background,
          flexDirection: "column",
        }}
        data={allLocalExperts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableRipple
            style={{ flex: 1 }}
            onPress={async () => {
              setIsLoading(true);
              const response = await shareClaimWithLocalExpert(
                claimId,
                item.id
              );
              if (response === -1) {
                Alert.alert(
                  "Error",
                  t("Error sharing claim with local expert")
                );
              } else {
                Alert.alert("Success", t("Claim shared with local expert"));
              }
              setIsLoading(false);
            }}
          >
            {isLoading ? (
              <View
                style={{
                  borderColor: theme.colors.text,
                  backgroundColor: theme.colors.background,
                  borderWidth: 1,
                  borderRadius: 6,
                  padding: 8,
                  gap: 8,
                }}
              >
                <ActivityIndicator />
              </View>
            ) : (
              <LocalExpertCard localExpert={item} />
            )}
          </TouchableRipple>
        )}
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
