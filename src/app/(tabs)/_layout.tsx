import { Tabs } from "expo-router";
import { useTranslation } from "react-i18next";
import { Icon, useTheme } from "react-native-paper";

export default function TabLayout() {
  const { colors } = useTheme();
  const { t } = useTranslation();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.tertiary,
        tabBarStyle: {
          height: 64,
        },
        tabBarLabelStyle: {
          fontSize: 14,
          color: colors.tertiary,
        },
        tabBarIconStyle: {
          height: 36,
          width: 36,
          color: colors.tertiary,
        },
        tabBarActiveBackgroundColor: colors.onTertiaryContainer,
        tabBarInactiveBackgroundColor: colors.background,
        headerStyle: {
          backgroundColor: colors.background,
        },
        headerTitleStyle: {
          color: colors.tertiary,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: t("Home"),
          tabBarIcon: ({ color }) => (
            <Icon source="home" size={36} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="claims"
        options={{
          title: t("Claims"),
          tabBarIcon: ({ color }) => (
            <Icon source="file-document-outline" size={36} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="appointments"
        options={{
          title: t("Appointments"),
          tabBarIcon: ({ color }) => (
            <Icon source="calendar" size={36} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: t("Settings"),
          tabBarIcon: ({ color }) => (
            <Icon source="cog" size={36} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
