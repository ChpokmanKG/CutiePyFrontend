import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";
import en from './locales/en.json';

const options = {

  resources: {
    en: {
      common: en
    },
  },

  fallbackLng: "en",

  ns: ["common"],

  defaultNS: "common",


};

i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init(options, error => {
      if (error) return console.error(error);
      console.log("It's ok")
    }).then(r => console.log(r))
    .catch(e => console.error(e))

export default i18n;
