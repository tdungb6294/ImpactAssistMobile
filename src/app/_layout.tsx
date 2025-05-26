import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import { createContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { KeyboardProvider } from "react-native-keyboard-controller";
import { PaperProvider } from "react-native-paper";
import { registerTranslation } from "react-native-paper-dates";
import { Easing } from "react-native-reanimated";
import { JsStack } from "../components/JsStack";
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

interface RoleContextType {
  role: string;
  changeRole: (language: string) => void;
}

export const RoleContext = createContext<RoleContextType>({
  role: "USER",
  changeRole: () => {},
});

export default function RootLayout() {
  const [role, setRole] = useState<string>("USER");
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

  const queryClient = new QueryClient();

  return (
    <KeyboardProvider>
      <QueryClientProvider client={queryClient}>
        <GestureHandlerRootView>
          <RoleContext.Provider
            value={{ role: role, changeRole: (role: string) => setRole(role) }}
          >
            <LanguageContext.Provider value={{ language, changeLanguage }}>
              <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
                <PaperProvider theme={isDarkMode ? darkTheme : lightTheme}>
                  <View
                    style={{
                      backgroundColor: isDarkMode
                        ? darkTheme.colors.background
                        : lightTheme.colors.background,
                      flex: 1,
                    }}
                  >
                    <JsStack
                      screenOptions={{
                        cardOverlayEnabled: true, // Enable card overlay for transitions
                        gestureEnabled: true, // Enable gesture-based navigation
                        cardStyleInterpolator: ({ current, next, layouts }) => {
                          const INITIAL_TRANSLATE_X_MULTIPLIER = 1;
                          const NEXT_TRANSLATE_X_MULTIPLIER = -0.2;

                          // Calculate translateX for the current screen
                          const translateX = current.progress.interpolate({
                            inputRange: [0, 1],
                            outputRange: [
                              INITIAL_TRANSLATE_X_MULTIPLIER *
                                layouts.screen.width,
                              0,
                            ],
                            extrapolate: "clamp",
                          });

                          const INITIAL_SCALE = 1.8;
                          const FINAL_SCALE = 1;

                          // Calculate scale for zooming effect on the next screen
                          const scale = next
                            ? next.progress.interpolate({
                                inputRange: [0, 1],
                                outputRange: [1, FINAL_SCALE],
                                extrapolate: "clamp",
                              })
                            : current.progress.interpolate({
                                inputRange: [0, 1],
                                outputRange: [INITIAL_SCALE, 1],
                                extrapolate: "clamp",
                              });

                          // Calculate translateX for the next screen (if exists)
                          const nextTranslateX = next
                            ? next.progress.interpolate({
                                inputRange: [0, 1],
                                outputRange: [
                                  0,
                                  NEXT_TRANSLATE_X_MULTIPLIER *
                                    layouts.screen.width,
                                ],
                                extrapolate: "clamp",
                              })
                            : 0;

                          const transform = [
                            { translateX },
                            { translateX: nextTranslateX },
                            { perspective: 1000 },
                            { scale },
                          ];

                          return {
                            cardStyle: { transform },
                          };
                        },
                        transitionSpec: {
                          open: {
                            animation: "timing",
                            config: {
                              duration: 400,
                              easing: Easing.out(Easing.ease),
                            },
                          },
                          close: {
                            animation: "timing",
                            config: {
                              duration: 400,
                              easing: Easing.in(Easing.ease),
                            },
                          },
                        },
                      }}
                    >
                      <Stack.Screen
                        name="(tabs)"
                        options={{ headerShown: false }}
                      />
                      <Stack.Screen
                        name="claim"
                        options={{ headerShown: false }}
                      />
                      <Stack.Screen
                        name="declaration"
                        options={{ headerShown: false }}
                      />
                      <Stack.Screen
                        name="appointment"
                        options={{ headerShown: false }}
                      />
                      <Stack.Screen
                        name="auth"
                        options={{ headerShown: false }}
                      />
                      <Stack.Screen
                        name="index"
                        options={{ headerShown: false }}
                      />
                      <Stack.Screen name="+not-found" />
                    </JsStack>
                  </View>
                </PaperProvider>
              </ThemeContext.Provider>
            </LanguageContext.Provider>
          </RoleContext.Provider>
        </GestureHandlerRootView>
      </QueryClientProvider>
    </KeyboardProvider>
  );
}
