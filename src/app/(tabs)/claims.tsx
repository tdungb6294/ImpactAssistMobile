import { useInfiniteQuery } from "@tanstack/react-query";
import { Link, useRouter } from "expo-router";
import { Text, View } from "react-native";
import { FlatList, RefreshControl } from "react-native-gesture-handler";
import { TouchableRipple, useTheme } from "react-native-paper";
import ClaimCard from "../../components/claim/claim-card";
import ImpactAssistButton from "../../components/custom/button";
import { CustomTheme } from "../../theme/theme";
import { fetchCarClaims, PartialClaimPage } from "../../utils/fetch-claims";

export default function ClaimsPage() {
  const theme: CustomTheme = useTheme();
  const router = useRouter();

  const { data, isFetching, hasNextPage, fetchNextPage, refetch } =
    useInfiniteQuery<PartialClaimPage>({
      queryKey: ["claims"],
      queryFn: fetchCarClaims,
      getNextPageParam: (lastPage) => lastPage.nextPage,
      initialPageParam: 1,
    });

  const allClaims = data?.pages.flatMap((page) => page.claims) ?? [];

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: theme.colors.background,
        padding: 20,
        gap: 6,
      }}
    >
      <Link href={"/claim"} asChild>
        <ImpactAssistButton onPress={() => {}} label="Create New Claim" />
      </Link>
      <View>
        <Text style={{ color: theme.colors.text, marginTop: 8 }}>
          Items: {allClaims.length} of {data?.pages[0].total ?? 0}
        </Text>
      </View>
      <FlatList
        data={allClaims}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableRipple
            style={{ flex: 1 }}
            onPress={() => {
              router.navigate(`/claim/${item.id}`);
            }}
          >
            <ClaimCard claim={item} />
          </TouchableRipple>
        )}
        onEndReached={() => {
          if (hasNextPage) {
            fetchNextPage();
          }
        }}
        onEndReachedThreshold={0.5}
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
