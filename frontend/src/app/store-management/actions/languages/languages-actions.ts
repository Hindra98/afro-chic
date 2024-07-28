import { ActionTypes } from "../constants/action-types";

export const getLanguagesRequest = (payload: GetLanguagesQuery): GetLanguagesAction => { 
    return {
        type: ActionTypes.GET_LANGUAGES_REQUEST,
        payload: {
            query: payload,
            languages: null,
            errors: null
        }
    } as GetLanguagesAction;
};

export const getLanguagesSuccess = (payload: GetLanguagesSuccessPayload): GetLanguagesAction => {
    return {

        type: ActionTypes.GET_LANGUAGES_SUCCESS,
        payload: {
            query: null,
            languages: payload,
            errors: null
        }
    } as GetLanguagesAction;
};

export const getLanguagesFailure = (payload: GetLanguagesFailurePayload): GetLanguagesAction => {

    return {
        type: ActionTypes.GET_LANGUAGES_FAILURE,
        payload: {
            query: null,
            languages: null,
            errors: payload
        }
    } as GetLanguagesAction;
};

export const changeLanguage = (payload: string): ChangeLanguageAction => {

    return {
        type: ActionTypes.CHANGE_LANGUAGE,
        payload: payload
    } as ChangeLanguageAction ;
}
