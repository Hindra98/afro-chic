import i18next from "i18next";
import { initReactI18next } from "react-i18next";

import resCommonEnglish from "./Translations/en/rescommon.json";
import resSharedEnglish from "./Translations/en/resshared.json";
//import resDomainEn from "./Translations/en/resdomain.json;"

import resCommonFrench from "./Translations/fr/rescommon.json";
import resSharedFrench from "./Translations/fr/resshared.json";
//import resDomainFr from "./Translations/fr/resdomain.json;"

const resources = {
    en: {
        resCommonEn: resCommonEnglish,
        resSharedEn: resSharedEnglish
    },
    fr: {
        resCommonFr: resCommonFrench,
        resSharedFr: resSharedFrench
    }
}

i18next
.use(initReactI18next)
.init({
    resources,
    lng: "en", //default language
});

export default i18next;