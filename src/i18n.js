import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import I18nextBrowserLanguageDetector from "i18next-browser-languagedetector";
import Translation_EN from './Locale/en.json';
import Translation_AR from './Locale/ar.json';
const resources = {
    en: {
        translation: Translation_EN
    },
    ar: {
        translation: Translation_AR
    }, detection: {
        order: [],
        caches: [],
    },
};

i18n
    .use(I18nextBrowserLanguageDetector)
    .use(initReactI18next)
    .init({
        resources,
        lng: "en",

        interpolation: {
            escapeValue: false
        },
        react: {
            useSuspense: false
        }
    });

export default i18n;