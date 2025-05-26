import { Stack } from "expo-router";
import { useTheme } from "react-native-paper";
import { CustomTheme } from "../../theme/theme";

export default function AppointmentLayout() {
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
      }}
    >
      <Stack.Screen
        name="[id]/index"
        options={{ headerShown: true, headerTitle: "Appointment Details" }}
      />
      <Stack.Screen
        name="index"
        options={{ headerShown: true, headerTitle: "Local Experts" }}
      />
      <Stack.Screen
        name="local-expert/[id]/index"
        options={{ headerShown: true, headerTitle: "Register Appointment" }}
      />
    </Stack>
  );
}
