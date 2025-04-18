import dayjs from "dayjs";
import { useTranslation } from "react-i18next";
import { StyleSheet, Text, View } from "react-native";
import { useTheme } from "react-native-paper";
import { Appointment } from "../../model/appointment";
import { CustomTheme } from "../../theme/theme";

interface AppointmentCardProps {
  appointment: Appointment;
}

export default function AppointmentCard({ appointment }: AppointmentCardProps) {
  const theme: CustomTheme = useTheme();
  const { t } = useTranslation();
  const now = dayjs(appointment.date);
  const formatted = now.format("YYYY-MM-DD");
  const formattedStartTime = dayjs(
    "2025-01-01T" + appointment.startTime
  ).format("HH:mm");
  const formattedEndTime = dayjs("2025-01-01T" + appointment.endTime).format(
    "HH:mm"
  );

  return (
    <View
      style={[
        styles.container,
        {
          borderColor: theme.colors.text,
        },
      ]}
    >
      <View style={[styles.secondaryContainer]}>
        <View>
          <Text style={{ fontWeight: "bold", color: theme.colors.text }}>
            {t("Title")}
          </Text>
          <Text style={{ color: theme.colors.text }}>{appointment.title}</Text>
          <Text style={{ fontWeight: "bold", color: theme.colors.text }}>
            {t("Status")}
          </Text>
          <Text numberOfLines={1} style={{ color: theme.colors.text }}>
            {appointment.appointmentStatus}
          </Text>
        </View>
        <View style={{ alignItems: "flex-end" }}>
          <Text style={{ color: theme.colors.text, fontWeight: "bold" }}>
            {formatted}
          </Text>
          <Text style={{ color: theme.colors.text, fontWeight: "bold" }}>
            {formattedStartTime} - {formattedEndTime}
          </Text>
          <Text style={{ color: theme.colors.text, fontWeight: "bold" }}>
            {appointment.dayOfWeek}
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderRadius: 6,
    padding: 8,
    gap: 8,
  },
  secondaryContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 4,
  },
});
