import { AuthenticationConstants } from "../constants/authentication-contants";
import { getStorage } from "../storage/storage";
import { getBrowserLanguage } from "./browser-language";

export const fallBackLanguage = 'en';

const culturesWithBase : string[] = ['en','fr'];

export const IsLanguageTranslationAvailable = (languge : string) => {

    var index = culturesWithBase.findIndex(l => l === languge);
    if(index > -1){
        return true;
    }
    return false;
}

export const getAppLanguage = () : string => {
    const userLanguage: string = getStorage<string>(AuthenticationConstants.USER_LANGUAGE);
    return userLanguage ? userLanguage : IsLanguageTranslationAvailable(getBrowserLanguage()) ? getBrowserLanguage() : fallBackLanguage;
}