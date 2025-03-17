import { Stack } from "expo-router";
import { createContext, useEffect, useState } from "react";
import storage from "../lib/storage";
import { useTranslation } from "react-i18next";
import "../lib/i18n";
import { PaperProvider } from "react-native-paper";
import { darkTheme, lightTheme } from "../theme/theme";
import { GestureHandlerRootView } from "react-native-gesture-handler";

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
      const savedTheme = await storage.load({ key: "lang" });
      if (savedTheme !== null) {
        setIsDarkMode(savedTheme === "dark");
      }
    };
    const loadLanguage = async () => {
      const savedLanguage = await storage.load({ key: "theme" });
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
    await storage.save({ key: "theme", data: newTheme ? "dark" : "light" });
  };

  const changeLanguage = async (language: string) => {
    setLanguage(language);
    i18n.changeLanguage(language);
    await storage.save({ key: "lang", data: language });
  };

  return (
    <GestureHandlerRootView>
      <LanguageContext.Provider value={{ language, changeLanguage }}>
        <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
          <PaperProvider theme={isDarkMode ? darkTheme : lightTheme}>
            <Stack>
              <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
              <Stack.Screen name="+not-found" />
            </Stack>
          </PaperProvider>
        </ThemeContext.Provider>
      </LanguageContext.Provider>
    </GestureHandlerRootView>
  );
}
