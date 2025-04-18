import { useRouter } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { useContext, useState } from "react";
import { useTranslation } from "react-i18next";
import { Pressable, StyleSheet, View } from "react-native";
import Flag from "react-native-country-flag";
import { Divider, Menu, Switch, Text, useTheme } from "react-native-paper";
import ImpactAssistButton from "../../components/custom/button";
import { CustomTheme } from "../../theme/theme";
import { LanguageContext, RoleContext, ThemeContext } from "../_layout";

type Language = {
  label: string;
  value: string;
  isoCode: string;
};

const languages: Language[] = [
  { label: "English", value: "en", isoCode: "gb" },
  { label: "Lietuvių", value: "lt", isoCode: "lt" },
];

export default function SettingsPage() {
  const router = useRouter();
  const { t } = useTranslation();
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);
  const { language, changeLanguage } = useContext(LanguageContext);
  const theme: CustomTheme = useTheme();
  const [selectedValue, setSelectedValue] = useState<Language | undefined>(
    languages.find((v) => language === v.value) || undefined
  );
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleSelectLanguage = (selectedValue: Language) => {
    setSelectedValue(selectedValue);
    changeLanguage(selectedValue.value);
    setIsDropdownOpen(false);
  };

  const { role } = useContext(RoleContext);

  return (
    <View
      style={{
        flex: 1,
        flexDirection: "column",
        backgroundColor: theme.colors.background,
      }}
    >
      <View style={styles.container}>
        <Text style={{ color: theme.colors.text, fontSize: 16 }}>
          {t("Logout")}
        </Text>
        <ImpactAssistButton
          style={{
            width: 100,
          }}
          label={t("Logout")}
          onPress={async () => {
            await SecureStore.deleteItemAsync("accessToken");
            await SecureStore.deleteItemAsync("refreshToken");
            router.dismissTo("/auth");
          }}
        />
      </View>
      <Divider />
      <View style={styles.container}>
        <Text style={{ color: theme.colors.text, fontSize: 16 }}>
          {t("Role")}
        </Text>
        <Text style={{ color: theme.colors.text, fontSize: 16 }}>
          {t(role)}
        </Text>
      </View>
      <Divider />
      <View style={styles.container}>
        <Text style={{ color: theme.colors.text, fontSize: 16 }}>
          {t("Toggle (Dark/Light) theme")}
        </Text>
        <Switch value={isDarkMode ? true : false} onValueChange={toggleTheme} />
      </View>
      <Divider />
      <View style={styles.container}>
        <Text style={{ color: theme.colors.text, fontSize: 16 }}>
          {t("Change language")}
        </Text>
        <Menu
          visible={isDropdownOpen}
          onDismiss={toggleDropdown}
          anchor={
            <Pressable
              style={{
                flex: 1,
                flexDirection: "row",
                gap: 8,
                alignItems: "center",
                justifyContent: "flex-end",
              }}
              onPress={toggleDropdown}
            >
              <Text style={{ color: theme.colors.text, fontSize: 16 }}>
                {selectedValue?.label}
              </Text>
              <Flag
                style={{ backgroundColor: "transparent" }}
                isoCode={selectedValue?.isoCode || "gb"}
                size={20}
              />
            </Pressable>
          }
        >
          {languages.map((language) => (
            <Pressable
              key={language.value}
              onPress={() => {
                handleSelectLanguage(language);
              }}
              style={{
                flexDirection: "row",
                width: 120,
                justifyContent: "space-between",
                padding: 4,
                backgroundColor: theme.colors.background,
                alignItems: "center",
              }}
            >
              <Text style={{ color: theme.colors.text }}>{language.label}</Text>
              <Flag
                style={{ backgroundColor: "transparent" }}
                isoCode={language.isoCode}
                size={32}
              />
            </Pressable>
          ))}
        </Menu>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingLeft: 16,
    paddingTop: 8,
    paddingBottom: 8,
    paddingRight: 16,
    height: 64,
    alignItems: "center",
    width: "100%",
  },
});
