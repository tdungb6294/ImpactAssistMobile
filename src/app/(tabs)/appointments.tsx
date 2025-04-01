import { View } from "react-native";
import { Text, useTheme } from "react-native-paper";

export default function AppointmentsPage() {
  const theme = useTheme();

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: theme.colors.background,
        padding: 20,
        gap: 6,
      }}
    >
      <Text>Appointments</Text>
    </View>
  );
}
