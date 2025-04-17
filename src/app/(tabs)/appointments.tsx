import { useInfiniteQuery } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import { FlatList, RefreshControl, Text, View } from "react-native";
import { TouchableRipple, useTheme } from "react-native-paper";
import AppointmentCard from "../../components/appointment/appointment-card";
import ImpactAssistButton from "../../components/custom/button";
import { CustomTheme } from "../../theme/theme";
import { fetchAppointments } from "../../utils/fetch-appointments";

export default function AppointmentsPage() {
  const theme: CustomTheme = useTheme();
  const { data, isFetching, hasNextPage, fetchNextPage, refetch } =
    useInfiniteQuery({
      queryKey: ["appointments"],
      queryFn: fetchAppointments,
      getNextPageParam: (lastPage) => lastPage.nextPage,
      initialPageParam: 1,
    });
  const router = useRouter();

  const allAppointments =
    data?.pages.flatMap((page) => page.appointments) ?? [];

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: theme.colors.background,
        padding: 20,
        gap: 6,
      }}
    >
      <ImpactAssistButton
        onPress={() => {
          router.navigate("/appointment");
        }}
        label="Make an appointment"
      />
      <View>
        <Text style={{ color: theme.colors.text, marginTop: 8 }}>
          Items: {allAppointments.length} of {data?.pages[0].total ?? 0}
        </Text>
      </View>
      <FlatList
        data={allAppointments}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableRipple
            style={{ flex: 1 }}
            onPress={() => {
              router.navigate(`/appointment/${item.id}`);
            }}
          >
            <AppointmentCard appointment={item} />
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
