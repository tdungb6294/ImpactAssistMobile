import { Stack } from "expo-router";
import { useTranslation } from "react-i18next";
import { useTheme } from "react-native-paper";
import { CustomTheme } from "../../../theme/theme";

export default function DamageReportPageLayout() {
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
        options={{ headerShown: true, headerTitle: t("Damage Report") }}
      />
      <Stack.Screen
        name="create/[id]/index"
        options={{ headerShown: true, headerTitle: t("Create Damage Report") }}
      />
      <Stack.Screen
        name="[id]/report/[reportId]/index"
        options={{ headerShown: true, headerTitle: t("Damage Report Details") }}
      />
    </Stack>
  );
}
