// let _currentLanguage = "";
// let _fallbackLanguage = "";
// let _languages = [];
// let _translations = {};

import getResourceFileEn from "./en";
import getResourceFileFr from "./fr";

// export const getCurrentLanguage = () => {
//   return _currentLanguage;
// };

// export const setCurrentLanguage = currentLanguage => {
//   _currentLanguage = currentLanguage;
// };

// export const getFallbackLanguage = () => {
//   return _fallbackLanguage;
// };

// export const setFallbackLanguage = fallbackLanguage => {
//   _fallbackLanguage = fallbackLanguage;
// };

// export const getLanguages = () => {
//   return _languages;
// };

// // export const setLanguages = languages => {
// //   _languages = languages;

// //   _languages.forEach(language => {
// //     const loadedLanguage = require(`./${language}/${language}.json`);
// //     _translations[language] = loadedLanguage;
// //   });
// // };

// export const setLanguages = (languages, resources) => {
//     _languages = languages;

//     for(let i =0; i<_languages.length; i++ ){
//       for(let y=0; y< resources.length; y++) {
//         const loadedResource = require(`./${_languages[i]}/${resources[i]}.json`);
//         _translations[resources[i]] = loadedResource;
//       }
//   }
// };

// export const getTranslations = () => {
//   return _translations;
// };

// export const setTranslations = translations => {
//   _translations = translations;
// };

// export const translate = label => {
//   return _translations[_currentLanguage] &&
//     _translations[_currentLanguage][label]
//     ? _translations[_currentLanguage][label]
//     : _translations[_fallbackLanguage] &&
//       _translations[_fallbackLanguage][label]
//     ? _translations[_fallbackLanguage][label]
//     : label;
// };

const getResourceFile = (name: string, culture: string): any => {

  switch(culture){
    case "en" :
      return getResourceFileEn(name);

    case "fr" :
      return getResourceFileFr(name);

    default:
      return getResourceFileEn(name);
  }
}

export default getResourceFile;