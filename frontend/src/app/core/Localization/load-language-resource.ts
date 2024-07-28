import {  getAppLanguage } from "./base";
import { LocalizationProvider } from "./localization-provider";

const localizers = ["resshared", "rescommon", "resdomain"];

export const loadTranslationResources = async () => {
 await loadLanguageResources(getAppLanguage());
}

const loadLanguageResources = async (language: string) => {
 localizers.map((resource) => ((new LocalizationProvider(resource)).load(language)));
}
