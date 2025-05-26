import { Stack } from "expo-router";
import { useTranslation } from "react-i18next";
import { useTheme } from "react-native-paper";
import { CustomTheme } from "../../theme/theme";

export default function AppointmentLayout() {
  const theme: CustomTheme = useTheme();
  const { t } = useTranslation();

  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: theme.colors.interactiveComponentsTertiary,
        },
        headerTitleStyle: {
          color: theme.colors.text,
        },
      }}
    >
      <Stack.Screen
        name="[id]/index"
        options={{ headerShown: true, headerTitle: t("Appointment Details") }}
      />
      <Stack.Screen
        name="index"
        options={{ headerShown: true, headerTitle: t("Local Experts") }}
      />
      <Stack.Screen
        name="local-expert/[id]/index"
        options={{ headerShown: true, headerTitle: t("Register Appointment") }}
      />
    </Stack>
  );
}
