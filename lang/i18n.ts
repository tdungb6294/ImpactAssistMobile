import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./locales/en.json";
import lt from "./locales/lt.json";

const resources = {
  en: { translation: en },
  lt: { translation: lt },
} as const;

i18n.use(initReactI18next).init({
  lng: "en",
  fallbackLng: "en",
  resources,
});
