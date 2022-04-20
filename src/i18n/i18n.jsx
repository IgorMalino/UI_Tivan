import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import { en } from "./translation/en";
import { ru } from "./translation/ru";

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    ru: { translation: ru },
  },
  lng: "en",
  fallbackLng: "en",
  interpolation: { escapeValue: false },
});

export default i18n;
