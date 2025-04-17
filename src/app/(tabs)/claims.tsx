import { useQuery } from "@tanstack/react-query";
import { Link } from "expo-router";
import { RefreshControl, ScrollView, StyleSheet } from "react-native";
import { List, useTheme } from "react-native-paper";
import ImpactAssistButton from "../../components/custom/button";
import SkeletonPlaceholder from "../../components/custom/skeleton-placeholder";
import { CustomTheme } from "../../theme/theme";
import { fetchCarClaims } from "../../utils/fetch-claims";

export default function ClaimsPage() {
  const theme: CustomTheme = useTheme();
  const query = useQuery({
    queryKey: ["claims"],
    queryFn: async () => fetchCarClaims(),
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: false,
    staleTime: Infinity,
  });

  return (
    <ScrollView
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
      <Link href={"/claim"} asChild>
        <ImpactAssistButton onPress={() => {}} label="Create New Claim" />
      </Link>
      <List.Section>
        {query.isFetching && (
          <>
            <SkeletonPlaceholder
              style={[styles.box, { borderColor: theme.colors.text }]}
            />
            <SkeletonPlaceholder
              style={[styles.box, { borderColor: theme.colors.text }]}
            />
            <SkeletonPlaceholder
              style={[styles.box, { borderColor: theme.colors.text }]}
            />
            <SkeletonPlaceholder
              style={[styles.box, { borderColor: theme.colors.text }]}
            />
          </>
        )}
        {query.data?.length === 0 && (
          <List.Item
            title="No data"
            description="No data available for claims."
          />
        )}
        {query.isSuccess &&
          !query.isFetching &&
          query.data.map((claim) => (
            <List.Item
              key={claim.id}
              title={claim.carModel}
              description={`Accident Date: ${claim.accidentDatetime}`}
              style={[styles.item, { borderColor: theme.colors.text }]}
              onPress={() => {}}
            />
          ))}
      </List.Section>
    </ScrollView>
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
