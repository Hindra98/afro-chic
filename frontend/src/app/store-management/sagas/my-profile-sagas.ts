import { call, put, takeLatest } from "redux-saga/effects";
import { ActionTypes } from "../actions/constants/action-types";
import { updateMyProfileFailure, getMyProfileFailure, getMyProfileSuccess, updateMyProfileSuccess } from "../actions/myprofile/my-profil-actions";
import { UpdateMyProfileAction, UpdateMyProfileFailurePayload, GetMyProfileAction, GetMyProfileFailurePayload, UpdateMyProfileSuccessPayload } from "../actions/myprofile";
import { ControllerApi } from "../../features/common/identity/my-profile/locale/controller-api";

const controllerApi = new ControllerApi();

const callApiToMyProfile = async (command: FormData) => controllerApi.myProfile(command);
const callApiToMyProfileGetData = async (command: string) => controllerApi.myProfileGetData(command);


function* myProfileSaga(action: UpdateMyProfileAction) {
  try {
    const response = yield call(callApiToMyProfile, action.payload.command);
    if (response) {
      if (response?.hasSucceeded) {
        yield put(updateMyProfileSuccess({ value: true } as UpdateMyProfileSuccessPayload));
      } else {
        let messages: string[] = [];
        response?.errorMessages.map((item) => {
          return messages.push(item.errorMessage);
        });
        yield put(updateMyProfileFailure({ errors: messages } as UpdateMyProfileFailurePayload));
      }
    } else {
      let messages: string[] = [];
      messages.push("Erreur lors de la connexion au serveur");
      yield put(updateMyProfileFailure({ errors: messages } as UpdateMyProfileFailurePayload));
    }
  } catch (e) {
    let messages: string[] = [];
    messages.push(e.message);
    yield put(updateMyProfileFailure({ errors: messages } as UpdateMyProfileFailurePayload));
  }
}

function* myProfileGetDataSaga(action: GetMyProfileAction) {
  try {
    const response = yield call(callApiToMyProfileGetData, action.payload.command);

    if (response) {
      yield put(getMyProfileSuccess(response as GetMyProfile));

    } else {
      let messages: string[] = [];
      response?.errorMessages.map((item) => {
        return messages.push(item.errorMessage);
      });
      yield put(getMyProfileFailure({ errors: messages } as GetMyProfileFailurePayload));
    }

  } catch (e) {
    let messages: string[] = [];
    messages.push(e.message);
    yield put(getMyProfileFailure({ errors: messages } as GetMyProfileFailurePayload));
  }
}

export function* watchMyProfileSaga() {
  yield takeLatest(ActionTypes.UPDATE_MY_PROFILE_REQUEST, myProfileSaga);
  yield takeLatest(ActionTypes.GET_MY_PROFILE_REQUEST, myProfileGetDataSaga);
}
