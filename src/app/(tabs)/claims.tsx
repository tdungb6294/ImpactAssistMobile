import { View } from "react-native";
import { Text, useTheme } from "react-native-paper";

export default function ClaimsPage() {
  const theme = useTheme();

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <Text>Claims</Text>
    </View>
  );
}
