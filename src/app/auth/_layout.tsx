import { Stack } from "expo-router";
import { useTranslation } from "react-i18next";
import { useTheme } from "react-native-paper";
import { CustomTheme } from "../../theme/theme";

export default function AuthPageLayout() {
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
        headerTitle: t("Authentication"),
      }}
    >
      <Stack.Screen name="index" options={{ headerShown: true }} />
    </Stack>
  );
}
