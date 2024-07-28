import { call, put, takeLatest } from "redux-saga/effects";
import { ActionTypes } from "../actions/constants/action-types";
import { getLanguagesFailure, getLanguagesSuccess } from "../actions/languages/languages-actions";
import { ControllerApi } from "../../features/common/languages/locale/controller-api";

const controllerApi = new ControllerApi();

const getLanguages = async (query: GetLanguagesQuery) => controllerApi.getLanguages();

function* getLanguagesSaga(action: GetLanguagesAction) {
    try{
        const response = yield call(getLanguages, action.payload.query);

        const result = response;

        if(result){

            let payload: Language[];

            if(result.payload){
                payload = result.payload;
            }
            else{
                payload = [];
            }
            yield put(getLanguagesSuccess({ payload: payload } as GetLanguagesSuccessPayload));
        }
    }
    catch(e){

        let messages: string[] = [];
        messages.push(e.message);
        yield put(getLanguagesFailure({errors: messages } as GetLanguagesFailurePayload));
    }
}

//Getlanguages watcher
export function* watchGetLanguagesSaga(){

    yield takeLatest(ActionTypes.GET_LANGUAGES_REQUEST, getLanguagesSaga);
}