import * as SplashScreen from "expo-splash-screen";
import { PaperProvider } from "react-native-paper";
import { darkTheme, lightTheme } from "../theme/theme";
import { Stack } from "expo-router";
import { createContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useTranslation } from "react-i18next";
import "../lang/i18n";

SplashScreen.preventAutoHideAsync();

interface ThemeContextType {
  isDarkMode: boolean;
  toggleTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextType>({
  isDarkMode: false,
  toggleTheme: () => {},
});

interface LanguageContextType {
  language: string;
  changeLanguage: (language: string) => void;
}

export const LanguageContext = createContext<LanguageContextType>({
  language: "en",
  changeLanguage: () => {},
});

export default function RootLayout() {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  const [language, setLanguage] = useState<string>("en");
  const { i18n } = useTranslation();

  useEffect(() => {
    const loadTheme = async () => {
      const savedTheme = await AsyncStorage.getItem("theme");
      if (savedTheme !== null) {
        setIsDarkMode(savedTheme === "dark");
      }
    };
    const loadLanguage = async () => {
      const savedLanguage = await AsyncStorage.getItem("lang");
      if (savedLanguage !== null) {
        setLanguage(savedLanguage);
        i18n.changeLanguage(savedLanguage);
      }
    };
    loadTheme();
    loadLanguage();
  }, []);

  const toggleTheme = async () => {
    const newTheme = !isDarkMode;
    setIsDarkMode(newTheme);
    await AsyncStorage.setItem("theme", newTheme ? "dark" : "light");
  };

  const changeLanguage = async (language: string) => {
    setLanguage(language);
    i18n.changeLanguage(language);
    await AsyncStorage.setItem("lang", language);
  };

  return (
    <LanguageContext.Provider value={{ language, changeLanguage }}>
      <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
        <PaperProvider theme={isDarkMode ? lightTheme : darkTheme}>
          <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="+not-found" />
          </Stack>
        </PaperProvider>
      </ThemeContext.Provider>
    </LanguageContext.Provider>
  );
}
