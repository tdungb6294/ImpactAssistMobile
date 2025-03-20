import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "../lang/en.json";
import lt from "../lang/lt.json";

const resources = {
  en: { translation: en },
  lt: { translation: lt },
} as const;

i18n.use(initReactI18next).init({ fallbackLng: "en", debug: true, resources });

export default i18n;
