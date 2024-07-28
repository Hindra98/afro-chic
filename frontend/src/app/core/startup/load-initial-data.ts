import { json } from "react-router-dom";
import { loadTranslationResources } from "../Localization/load-language-resource";

export const loader = async () => {
  await loadTranslationResources();
  return json({ languages: getLanguages() });
};

const getLanguages = () => {
  return [
    {
      id: "fr",
      displayName: "Français",
      threeLetterISOLanguageName: "fra",
      twoLetterISOLanguageName: "fr",
    } as Language,
    {
      id: "en",
      displayName: "English",
      threeLetterISOLanguageName: "eng",
      twoLetterISOLanguageName: "en",
    } as Language,
  ];
};
