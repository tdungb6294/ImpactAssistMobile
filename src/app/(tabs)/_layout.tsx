import { Tabs } from "expo-router";
import { useTranslation } from "react-i18next";
import { View } from "react-native";
import { Icon, Text, useTheme } from "react-native-paper";
import { CustomTheme } from "../../theme/theme";

export default function TabLayout() {
  const theme: CustomTheme = useTheme();
  const { t } = useTranslation();

  return (
    <Tabs
      screenOptions={{
        tabBarLabel: "",
        tabBarStyle: {
          height: 80,
          position: "absolute",
          borderTopLeftRadius: 16,
          borderTopRightRadius: 16,
          overflow: "hidden",
          backgroundColor: theme.colors.interactiveComponentsTertiary,
          borderColor: theme.colors.interactiveComponentsTertiary,
        },
        tabBarIconStyle: {
          position: "absolute",
          height: 80,
          width: "110%",
          color: theme.colors.text,
        },
        headerStyle: {
          backgroundColor: theme.colors.interactiveComponentsTertiary,
          borderBottomColor: theme.colors.interactiveComponentsTertiary,
          borderBottomWidth: 2,
        },
        headerTitleStyle: {
          color: theme.colors.text,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: t("Home"),
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                backgroundColor: focused
                  ? theme.colors.backgroundSolidSecondary
                  : theme.colors.interactiveComponentsTertiary,

                position: "absolute",
                width: "100%",
                height: "100%",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Icon
                source="home"
                size={36}
                color={
                  focused
                    ? theme.colors.textSecondary
                    : theme.colors.backgroundSolid
                }
              />
              <Text
                style={{
                  color: focused
                    ? theme.colors.textSecondary
                    : theme.colors.backgroundSolid,
                  fontSize: 12,
                }}
              >
                {t("Home")}
              </Text>
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="claims"
        options={{
          title: t("Claims"),
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                backgroundColor: focused
                  ? theme.colors.backgroundSolidSecondary
                  : theme.colors.interactiveComponentsTertiary,
                position: "absolute",
                width: "100%",
                height: "100%",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Icon
                source="file-document-outline"
                size={36}
                color={
                  focused
                    ? theme.colors.textSecondary
                    : theme.colors.backgroundSolid
                }
              />
              <Text
                style={{
                  color: focused
                    ? theme.colors.textSecondary
                    : theme.colors.backgroundSolid,
                  fontSize: 12,
                }}
              >
                {t("Claims")}
              </Text>
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="appointments"
        options={{
          title: t("Appointments"),
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                backgroundColor: focused
                  ? theme.colors.backgroundSolidSecondary
                  : theme.colors.interactiveComponentsTertiary,
                position: "absolute",
                width: "100%",
                height: "100%",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Icon
                source="calendar"
                size={36}
                color={
                  focused
                    ? theme.colors.textSecondary
                    : theme.colors.backgroundSolid
                }
              />
              <Text
                style={{
                  color: focused
                    ? theme.colors.textSecondary
                    : theme.colors.backgroundSolid,
                  fontSize: 12,
                }}
              >
                {t("Appointments")}
              </Text>
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: t("Settings"),
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                backgroundColor: focused
                  ? theme.colors.backgroundSolidSecondary
                  : theme.colors.interactiveComponentsTertiary,
                position: "absolute",
                width: "100%",
                height: "100%",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Icon
                source="cog"
                size={36}
                color={
                  focused
                    ? theme.colors.textSecondary
                    : theme.colors.backgroundSolid
                }
              />
              <Text
                style={{
                  color: focused
                    ? theme.colors.textSecondary
                    : theme.colors.backgroundSolid,
                  fontSize: 12,
                }}
              >
                {t("Settings")}
              </Text>
            </View>
          ),
        }}
      />
    </Tabs>
  );
}
