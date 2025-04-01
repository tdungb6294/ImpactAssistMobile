import { Stack } from "expo-router";
import { createContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { PaperProvider } from "react-native-paper";
import { registerTranslation } from "react-native-paper-dates";
import "../lib/i18n";
import storage from "../lib/storage";
import { darkTheme, lightTheme } from "../theme/theme";

const formatDate = (date: Date | string) => {
  // Ensure the date is a Date object
  const dateObj = typeof date === "string" ? new Date(date) : date;

  return new Intl.DateTimeFormat("lt-LT", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(dateObj);
};

registerTranslation("lt", {
  save: "Išsaugoti",
  selectSingle: "Pasirinkite datą",
  selectMultiple: "Pasirinkite datas",
  selectRange: "Pasirinkite laikotarpį",
  notAccordingToDateFormat: (inputFormat) =>
    `Datos formatas turi būti ${inputFormat}`,
  mustBeHigherThan: (date) => `Turi būti vėliau nei ${formatDate(date)}`,
  mustBeLowerThan: (date) => `Turi būti anksčiau nei ${formatDate(date)}`,
  mustBeBetween: (startDate, endDate) =>
    `Turi būti tarp ${formatDate(startDate)} - ${formatDate(endDate)}`,
  dateIsDisabled: "Ši diena negalima",
  previous: "Ankstesnis",
  next: "Kitas",
  typeInDate: "Įveskite datą",
  pickDateFromCalendar: "Pasirinkite datą iš kalendoriaus",
  close: "Uždaryti",
  hour: "",
  minute: "",
});

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
      const savedTheme = await storage.load({ key: "theme" });
      if (savedTheme !== null) {
        setIsDarkMode(savedTheme === "dark");
      }
    };
    const loadLanguage = async () => {
      const savedLanguage = await storage.load({ key: "lang" });
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
