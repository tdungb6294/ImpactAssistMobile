import { useQuery } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import { RefreshControl, StyleSheet } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";
import { List, useTheme } from "react-native-paper";
import { CustomTheme } from "../../theme/theme";
import { fetchLocalExperts } from "../../utils/fetch-local-experts";
import SkeletonPlaceholder from "../custom/skeleton-placeholder";

export default function AppointmentPage() {
  const range = Array.from({ length: 4 }, (_, index) => index + 1);
  const query = useQuery({
    queryKey: ["local_experts"],
    queryFn: async () => fetchLocalExperts(),
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: false,
    staleTime: Infinity,
  });
  const router = useRouter();

  const theme: CustomTheme = useTheme();

  return (
    <KeyboardAwareScrollView
      style={{
        flex: 1,
        backgroundColor: theme.colors.background,
        padding: 20,
        gap: 6,
      }}
      refreshControl={
        <RefreshControl
          refreshing={query.isFetching}
          onRefresh={() => query.refetch()}
        />
      }
    >
      <List.Section>
        {query.isFetching && (
          <>
            {range.map((_, index) => (
              <SkeletonPlaceholder
                key={index}
                style={[styles.box, { borderColor: theme.colors.text }]}
              />
            ))}
          </>
        )}
        {query.data?.length === 0 && (
          <List.Item
            title="No data"
            description="No data available for local experts."
          />
        )}
        {query.isSuccess &&
          !query.isFetching &&
          query.data.map((localExpert) => (
            <List.Item
              key={localExpert.id}
              title={localExpert.fullName}
              description={`Description: ${localExpert.description}`}
              style={[styles.item, { borderColor: theme.colors.text }]}
              onPress={() => {
                router.navigate(`/appointment?id=${localExpert.id}`);
              }}
            />
          ))}
      </List.Section>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  box: {
    width: "100%",
    height: 70,
    borderRadius: 6,
    overflow: "hidden",
    borderWidth: 1,
    marginVertical: 8,
  },
  item: {
    borderRadius: 6,
    overflow: "hidden",
    borderWidth: 1,
    marginVertical: 8,
  },
});
