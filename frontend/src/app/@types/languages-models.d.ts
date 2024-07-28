interface Language {
    id: string;
    displayName: string;
    threeLetterISOLanguageName: string;
    twoLetterISOLanguageName: string;
}

interface SupportedLanguages {
    languages: Language[];
  }

interface GetLanguagesAction {
    type: string;
    payload: GetLanguagesPayload;
  }

interface GetLanguagesResult {

    payload:  Language[];
}

interface GetLanguagesQuery {
    searchCriteria: string;
}

interface GetLanguagesSuccessPayload {
    payload: Language[];
}

interface GetLanguagesFailurePayload {
    errors: string[];
}

interface GetLanguagesRequest {
    type: string;
    payload: GetLanguageQuery;
}

interface GetLanguagesPayload {
    query: GetLanguagesQuery;
    languages: GetLanguagesSuccessPayload;
    errors: GetLanguagesFailurePayload;
}

interface ChangeLanguageAction{
    type: string;
    payload: string;
}
