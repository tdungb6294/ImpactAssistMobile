import { useQuery } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import { FlatList, RefreshControl, View } from "react-native";
import { TouchableRipple, useTheme } from "react-native-paper";
import { CustomTheme } from "../../theme/theme";
import { fetchLocalExperts } from "../../utils/fetch-local-experts";
import LocalExpertCard from "../local-expert/local-expert-card";

export default function AppointmentPage() {
  const { isFetching, refetch, data } = useQuery({
    queryKey: ["local_experts"],
    queryFn: async () => fetchLocalExperts(),
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: false,
    staleTime: Infinity,
  });
  const router = useRouter();

  const theme: CustomTheme = useTheme();

  const allLocalExperts = data ?? [];

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: theme.colors.background,
        padding: 20,
        gap: 6,
      }}
    >
      <FlatList
        data={allLocalExperts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableRipple
            style={{ flex: 1 }}
            onPress={() => {
              router.navigate(`/appointment/local-expert/${item.id}`);
            }}
          >
            <LocalExpertCard localExpert={item} />
          </TouchableRipple>
        )}
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
