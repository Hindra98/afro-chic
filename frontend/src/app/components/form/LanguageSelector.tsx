/* eslint-disable react-hooks/exhaustive-deps */
import { useState } from "react";
import { useGlobalAppContext } from "../../core/hooks/use-app-context";
import { getStorage, setStorage } from "../../core/storage/storage";
import { AuthenticationConstants } from "../../core/constants/authentication-contants";
import { getBrowserLanguage } from "../../core/Localization/browser-language";
import { fallBackLanguage } from "../../core/Localization/base";
import { useTranslation } from "react-i18next";

type Props = {
  className: string;
};

const LanguageSelector = ({ className }: Props) => {
  const { i18n, t } = useTranslation();


  const { languages } = useGlobalAppContext();

  const appLanguages = languages;
  
  const userLanguage = getStorage<string>(AuthenticationConstants.USER_LANGUAGE);

  const getLanguageIndex = (id: string) : number => {
    
      if(id !== undefined){
      const languageIndex = appLanguages?.findIndex(l => l.id === id);

      if(languageIndex > -1)
        return languageIndex;
      else{
        const browserLanguageIndex = appLanguages?.findIndex(l => l.id === getBrowserLanguage());
        if(browserLanguageIndex > -1)
          return browserLanguageIndex;
        else
          return getLanguageIndex(fallBackLanguage);
      }
    }else{
      return getLanguageIndex(fallBackLanguage);
    }
  }

  const userLanguageIndex = getLanguageIndex(userLanguage);

  const [toggleActive, setToggleActive] = useState(false);
  const [currentLanguageIndex, setCurrentLanguageIndex] = useState(userLanguageIndex);
  const [selectedLanguage, setSelectedLanguage] = useState(appLanguages[userLanguageIndex]?.displayName);


  const selectLanguage = (language: Language) => {
    i18n.changeLanguage(language.id);
    
    setSelectedLanguage(language.displayName);
    setCurrentLanguageIndex(getLanguageIndex(language.id));
    setToggleActive(false);

    setStorage(AuthenticationConstants.USER_LANGUAGE, language.id);
  };

  return (
      <div className={className}>
        <div
          className={ toggleActive ? "language-select px-1 active" : "language-select px-1" }
          id="language-select"
        >
          <button
            title={t("MODULES_COMMON_AUTHENTICATION_CHANGE_LANGUAGE")}
            className="select-button"
            type="button"
            id="select-button"
            onClick={() => setToggleActive(!toggleActive)}
            role="combobox"
            aria-labelledby="select button"
            aria-haspopup="listbox"
            aria-expanded="false"
            aria-controls="select-dropdown"
            onBlur={() => setToggleActive(false)}
          >
            <div className="flex flex-row justify-center items-center">
              <span className="selected-value" id="selected-value">
                {selectedLanguage? selectedLanguage : appLanguages[userLanguageIndex].displayName}
              </span>
              <span className="arrow ms-2"></span>
            </div>
            <ul className="select-dropdown z-10" role="listbox" id="select-dropdown">
              {appLanguages.map((language, key) => {
                return (
                  
                  <li className={key === currentLanguageIndex ? "active" : ""} key={key} role="list" onClick={() => selectLanguage(language)}>
                    {language.displayName}
                  </li>
                );
              })}
            </ul>
          </button>
        </div>
      </div>
  );
};

export default LanguageSelector;
