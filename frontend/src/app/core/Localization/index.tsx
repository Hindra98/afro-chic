export {LocalizationProvider} from './localization-provider';
export {useLocalizer} from './use-localizer';

// import React, { createContext, useContext } from "react";
// import { useSelector } from "react-redux";
// import { RootState } from "src/app/store-management/store-creation";
// import { useAppDispatch } from "../hooks/core-hooks";

// import {
//   getCurrentLanguage,
//   setCurrentLanguage,
//   getFallbackLanguage,
//   setFallbackLanguage,
//   getLanguages,
//   setLanguages,
//   getTranslations,
//   setTranslations,
//   translate
// } from "./Translations/index";

// // Configuration
// const { language, fallBacklanguage, languages } = {
//   language: "en",
//   fallBacklanguage: "en",
//   languages: [
//     { id: "en", displayName: "English" },
//     { id: "fr", displayName: "Français" },
//   ]
// };

// // Init language properties
// setCurrentLanguage(language);
// setFallbackLanguage(fallBacklanguage);
// setLanguages(languages);

// // Contexts
// const TranslateContext = createContext(null);
// const TranslateStateContext = createContext(null);
// const TranslateDispatchContext = createContext(null);

// const TranslateProvider = props => {

//   const value = {
//     getCurrentLanguage: props.getCurrentLanguage || getCurrentLanguage,
//     setCurrentLanguage: props.setCurrentLanguage || setCurrentLanguage,
//     getFallbackLanguage: props.getFallbackLanguage || getFallbackLanguage,
//     setFallbackLanguage: props.setFallbackLanguage || setFallbackLanguage,
//     getLanguages: props.getLanguages || getLanguages,
//     setLanguages: props.setLanguages || setLanguages,
//     getTranslations: props.getTranslations || getTranslations,
//     setTranslations: props.setTranslations || setTranslations,
//     t: props.t || translate
//   };

//   const currentLanguage = useSelector((state: RootState) => state.currentLanguage);
//   const dispatch = useAppDispatch();

//   return (
//         <TranslateContext.Provider value ={value}>
//            <TranslateStateContext.Provider value={currentLanguage}>
//              <TranslateDispatchContext.Provider value={dispatch}>
//                {props.children}
//              </TranslateDispatchContext.Provider>
//            </TranslateStateContext.Provider>
//         </TranslateContext.Provider>
//         )
// }

// export default TranslateProvider;

// export const useTranslate = () => {
//   // You can use the function of provider
//   const context = useContext(TranslateContext);
//   if (context === undefined) {
//     throw new Error("useTranslate must be used within a TranslateProvider");
//   }
//   return context;
// };

// export const useTranslateState = () => {
//   const context = useContext(TranslateStateContext);
//   if (context === undefined) {
//     throw new Error("useTranslateState must be used within a TranslateProvider");
//   }
//   return context;
// };

// export const useTranslateDispatch = () => {
//   const context = useContext(TranslateDispatchContext);
//   if (context === undefined) {
//     throw new Error("useTranslateDispatch must be used within a TranslateProvider");
//   }
//   return context;
// };