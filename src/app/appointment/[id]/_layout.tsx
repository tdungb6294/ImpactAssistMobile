import { Stack } from "expo-router";
import { useTheme } from "react-native-paper";
import { CustomTheme } from "../../../theme/theme";

export default function AppointmentPageLayout() {
  const theme: CustomTheme = useTheme();

  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: theme.colors.interactiveComponentsTertiary,
        },
        headerTitleStyle: {
          color: theme.colors.text,
        },
        headerTitle: "Appointment Details",
      }}
    >
      <Stack.Screen name="index" options={{ headerShown: true }} />
    </Stack>
  );
}
