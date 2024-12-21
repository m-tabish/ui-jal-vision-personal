import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';
import enLang from "./en/en.json"
import hiLang from "./hi/hi.json"

i18n.use(LanguageDetector)
    .use(initReactI18next)
    .init({
        debug: true,
        fallbackLng: 'en',
        lng: "en",
        interpolation: {
            escapeValue: false,
        },
        resources: {
            en: {
                translation: enLang

            },
            hi: {
                translation: hiLang

            }
        }
    });

export default i18n; 