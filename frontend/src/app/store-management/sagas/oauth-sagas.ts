import { call, put, takeLatest } from "redux-saga/effects";
import { AuthenticateUserAction, AuthenticateUserFailurePayload, SignOutFailurePayload, VerifyPinCodeAction, VerifyPinCodeFailurePayload } from "../actions/oauth";
import { ActionTypes } from "../actions/constants/action-types";
import { authenticateUserFailure, authenticateUserSuccess, authenticateUserSuccessTemp, signOutFailure, signOutSuccess, verifyPinCodeFailure, verifyPinCodeSuccess } from "../actions/oauth/oauth-actions";
import { getStorage, setStorage } from "../../core/storage/storage";
import { AuthenticationConstants } from "../../core/constants/authentication-contants";
import { Jwt } from "../../core/security/jwt";
import { SharedConstants, WasPinCodeSent } from "../../core/constants/common-constants";
import { ControllerApi } from "../../features/common/identity/oauth/locale/controller-api";


const controllerApi = new ControllerApi();

let store;
export const injectStoreInOauthSaga = _store => { store = _store; }

const callApiToAuthenticateUser = async (command: AuthenticateUserCommand) => controllerApi.authenticateUser(command);

const callApiToVerifyPinCode = async (command: VerifyIdentityCommand) => controllerApi.verifyIdentity(command);

function* authenticateUserSaga(action: AuthenticateUserAction) {
  try {
    const response = yield call(callApiToAuthenticateUser, action.payload.command);
    if (response) {

      if (response.hasSucceeded) {
          setStorage("pin_length", response.payload.pinLength.toString());
        if (response.payload.isTwoFactorAuthenticationEnabled) {
          yield put(authenticateUserSuccessTemp(response.payload as AuthenticateUserSuccessPayload));
        } else {
          const token = response.payload.token;
          setStorage(AuthenticationConstants.ACCESS_TOKEN, token);
          setStorage(AuthenticationConstants.TENANT_ID, Jwt.getClaim(token, "tenantid"));
          setStorage(AuthenticationConstants.USER_LANGUAGE, Jwt.getClaim(token, 'userlanguage'));
          setStorage(SharedConstants.TOGGLE_SIDEBAR, "true");

          const stateAuth = store.getState(state => state.authenticatedUserResult);
          const subscriptionKey: string = stateAuth.authenticatedUser.subscriptionKey
          if (subscriptionKey && subscriptionKey.length > 0) setStorage("subscription_key", subscriptionKey);
          yield put(authenticateUserSuccess(response.payload as AuthenticateUserSuccessPayload));
        }
      } else {
        let messages: string[] = [];
        response.errorMessages.map((item) => {
          return messages.push(item.errorMessage);
        })
        yield put(authenticateUserFailure({ errors: messages } as AuthenticateUserFailurePayload));
      }
    } else {
      let messages: string[] = [];
      messages.push("Erreur lors de la connexion au serveur");
      yield put(authenticateUserFailure({ errors: messages } as AuthenticateUserFailurePayload));
    }
  } catch (e) {
    let messages: string[] = [];
    messages.push(e.message);
    yield put(authenticateUserFailure({ errors: messages } as AuthenticateUserFailurePayload));
  }
}

function* verifyPinCodeSaga(action: VerifyPinCodeAction) {
  try {
    const response = yield call(callApiToVerifyPinCode, action.payload.command);
    const stateAuth = store.getState(state => state.authenticatedUserResult);
    const token = stateAuth.authenticatedUser.value.token || "";
    const auth = action.payload.command.auth;
    const subscriptionKey: string = stateAuth.authenticatedUser.subscriptionKey
    if (response) {
      if (response.hasSucceeded) {
        setStorage(AuthenticationConstants.ACCESS_TOKEN, token);
        setStorage(AuthenticationConstants.TENANT_ID, Jwt.getClaim(token, "tenantid"));
        setStorage(AuthenticationConstants.USER_LANGUAGE, Jwt.getClaim(token, 'userlanguage'));
        setStorage(SharedConstants.TOGGLE_SIDEBAR, "true");

        if (getStorage<string>("subscription_key") && getStorage<string>("subscription_key").length > 0) { setStorage("is_verified", "true"); getStorage<string>(WasPinCodeSent.FOR_PASSWORD_CHANGE, true); }
        if (subscriptionKey && subscriptionKey.length > 0) setStorage("subscription_key", subscriptionKey);

        yield put(verifyPinCodeSuccess(response.payload as VerifyIdentitySuccessPayload));
        yield put(authenticateUserSuccess(auth as AuthenticateUserSuccessPayload));

      } else {
        let messages: string[] = [];
        response.errorMessages.map((item) => {
          return messages.push(item.errorMessage);
        });
        yield put(verifyPinCodeFailure({ errors: messages } as VerifyPinCodeFailurePayload));
      }
    } else {
      let messages: string[] = [];
      messages.push("Erreur lors de la connexion au serveur");
      yield put(authenticateUserFailure({ errors: messages } as AuthenticateUserFailurePayload));
    }

  } catch (e) {
    let messages: string[] = [];
    messages.push(e.message);
    yield put(verifyPinCodeFailure({ errors: messages } as VerifyPinCodeFailurePayload));
  }
}


function* signOutSaga() {
  try {

    getStorage<string>(AuthenticationConstants.TENANT_ID, true);
    getStorage<string>(AuthenticationConstants.ACCESS_TOKEN, true);
    getStorage<string>("subscription_key", true);
    getStorage<string>("is_verified", true);
    getStorage<string>(WasPinCodeSent.FOR_PASSWORD_CHANGE, true);
    getStorage<string>(WasPinCodeSent.FOR_EMAIL_CHANGE, true);
    getStorage<string>(WasPinCodeSent.FOR_PHONE_NUMBER_CHANGE, true);
    getStorage<string>(SharedConstants.TOGGLE_SIDEBAR, true);
    getStorage<string>("pin_length", true);

    yield put(signOutSuccess({ isUserLoggedOut: true, refreshToken: "" } as SignOutSuccessPayload));

  } catch (e) {
    let messages: string[] = [];
    messages.push(e.message);
    yield put(signOutFailure({ errors: messages } as SignOutFailurePayload));
  }
}

//Watcher: Authenticate user
export function* watchAuthenticateUserSaga() {
  yield takeLatest(ActionTypes.AUTHENTICATE_USER_REQUEST, authenticateUserSaga);
  yield takeLatest(ActionTypes.VERIFY_PIN_CODE_REQUEST, verifyPinCodeSaga);
  yield takeLatest(ActionTypes.LOGOUT_USER_REQUEST, signOutSaga);
}