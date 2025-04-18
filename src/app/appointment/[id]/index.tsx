import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import { useLocalSearchParams } from "expo-router";
import { useTranslation } from "react-i18next";
import {
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { useTheme } from "react-native-paper";
import { CustomTheme } from "../../../theme/theme";
import { fetchAppointment } from "../../../utils/fetch-appointment";

export default function LocalExpertPage() {
  const theme: CustomTheme = useTheme();
  const { id } = useLocalSearchParams();
  const { isFetching, data, refetch } = useQuery({
    queryKey: ["appointment", id],
    queryFn: async () => fetchAppointment(parseInt(id as string)),
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: false,
    staleTime: Infinity,
  });
  const now = dayjs(data?.date);
  const formatted = now.format("YYYY-MM-DD");
  const formattedStartTime = dayjs("2025-01-01T" + data?.startTime).format(
    "HH:mm"
  );
  const formattedEndTime = dayjs("2025-01-01T" + data?.endTime).format("HH:mm");
  const { t } = useTranslation();

  return (
    <View
      style={[
        styles.container,
        {
          flex: 1,
          backgroundColor: theme.colors.background,
        },
      ]}
    >
      <ScrollView
        style={{
          flex: 1,
          backgroundColor: theme.colors.background,
        }}
        refreshControl={
          <RefreshControl
            refreshing={isFetching}
            onRefresh={() => {
              refetch();
            }}
          />
        }
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
          style={[
            styles.secondaryContainer,
            { borderColor: theme.colors.text },
          ]}
        >
          <View>
            <Text
              numberOfLines={1}
              style={{ fontWeight: "bold", color: theme.colors.text }}
            >
              {t("Title")}
            </Text>
            <Text style={{ color: theme.colors.text }}>{data?.title}</Text>
          </View>
          <View>
            <Text style={{ fontWeight: "bold", color: theme.colors.text }}>
              {t("Status")}
            </Text>
            <Text style={{ color: theme.colors.text }}>
              {data?.appointmentStatus}
            </Text>
          </View>
          <View>
            <Text style={{ fontWeight: "bold", color: theme.colors.text }}>
              {t("Date")}
            </Text>
            <Text style={{ color: theme.colors.text }}>{formatted}</Text>
          </View>
          <View>
            <Text style={{ fontWeight: "bold", color: theme.colors.text }}>
              {t("Time")}
            </Text>
            <Text style={{ color: theme.colors.text }}>
              {formattedStartTime} - {formattedEndTime}
            </Text>
          </View>
          <View>
            <Text style={{ fontWeight: "bold", color: theme.colors.text }}>
              {t("Day of Week")}
            </Text>
            <Text style={{ color: theme.colors.text }}>
              {t(data?.dayOfWeek || "Not provided")}
            </Text>
          </View>
          <View>
            <Text style={{ fontWeight: "bold", color: theme.colors.text }}>
              {t("Repair Shop")}
            </Text>
            <Text style={{ color: theme.colors.text }}>{data?.fullName}</Text>
          </View>
          <View>
            <Text style={{ fontWeight: "bold", color: theme.colors.text }}>
              {t("Description")}
            </Text>
            <Text numberOfLines={1} style={{ color: theme.colors.text }}>
              {data?.description}
            </Text>
          </View>
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
            {t("Map")}
          </Text>
        </View>
      </ScrollView>
      <View style={[styles.secondaryContainer]}>
        <MapView
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          region={{
            latitude: data?.latitude || 0,
            longitude: data?.longitude || 0,
            latitudeDelta: 0.04,
            longitudeDelta: 0.04,
          }}
          zoomEnabled={true}
          rotateEnabled={false}
        >
          <Marker
            coordinate={{
              latitude: data?.latitude || 0,
              longitude: data?.longitude || 0,
            }}
            title={data?.fullName}
            description={t("Repair shop is right here!")}
          />
        </MapView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  secondaryContainer: {
    borderWidth: 1,
    borderRadius: 6,
    padding: 8,
    gap: 8,
  },
  map: {
    width: "100%",
    height: 300,
  },
});
