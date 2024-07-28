const browserLanguage = navigator.language;

const getTwoLettersIso = () : string => {
      if(browserLanguage.length === 2) return browserLanguage;
      else return browserLanguage.slice(0, 2);
}

export const getBrowserLanguage = (): string => {
    return getTwoLettersIso().toLowerCase();
}