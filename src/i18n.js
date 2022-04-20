import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { enLanguage } from "../src/language/en";
import { ruLanguage } from "../src/language/ru";

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources: {
      en: { translation: enLanguage },
      ru: { translation: ruLanguage },
    },
    lng: "en",
    fallbackLng: "en",
    interpolation: { escapeValue: false },
  });

export default i18n;
