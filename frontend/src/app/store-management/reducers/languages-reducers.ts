import { ActionTypes } from "../actions/constants/action-types";
import { produce } from "immer";
import { StoreShape, initialState, CurrentLanguageState, currentLanguageStateInitialState } from "../actions/languages";

export const setLanguagesReducer = (state: StoreShape = initialState , args: GetLanguagesAction ) : StoreShape => {

    switch(args.type){

        case ActionTypes.GET_LANGUAGES_REQUEST:

            return produce(state, draftState => {
                    draftState.pending = true ;
                });

        case ActionTypes.GET_LANGUAGES_SUCCESS:
            return produce(state, draftState => {
                draftState.pending = false ;
                draftState.value = args.payload.languages.payload

            });

        case ActionTypes.GET_LANGUAGES_FAILURE:
            return produce(state, draftState => {
                draftState.pending = false;
                draftState.errors = args.payload.errors.errors;
            });
            
        default:
            return state;
    }
};

export const changeLanguageReducer = (state: CurrentLanguageState = currentLanguageStateInitialState, args: ChangeLanguageAction): CurrentLanguageState =>{
    switch(args.type){
        case ActionTypes.CHANGE_LANGUAGE:
            return produce(state, draftState => {
                draftState.language = args.payload;
            })

        default:
            return state;
    }
}
