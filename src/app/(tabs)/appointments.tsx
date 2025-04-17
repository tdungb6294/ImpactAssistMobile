import { useQuery } from "@tanstack/react-query";
import { RefreshControl, StyleSheet } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";
import { List, useTheme } from "react-native-paper";
import SkeletonPlaceholder from "../../components/custom/skeleton-placeholder";
import { CustomTheme } from "../../theme/theme";
import { fetchAppointments } from "../../utils/fetch-appointments";

export default function AppointmentsPage() {
  const theme: CustomTheme = useTheme();
  const range = Array.from({ length: 4 }, (_, index) => index + 1);
  const query = useQuery({
    queryKey: ["appointments"],
    queryFn: async () => fetchAppointments(),
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: false,
    staleTime: Infinity,
  });

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
            description="No data available for appointments."
          />
        )}
        {query.isSuccess &&
          !query.isFetching &&
          query.data.map((appointment) => (
            <List.Item
              key={appointment.id}
              title={appointment.title}
              description={`Appointment Date: ${appointment.date}`}
              style={[styles.item, { borderColor: theme.colors.text }]}
              onPress={() => {}}
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
