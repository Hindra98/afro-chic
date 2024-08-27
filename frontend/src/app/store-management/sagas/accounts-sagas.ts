import { call, put, takeLatest } from "redux-saga/effects";
import { ActionTypes } from "../actions/constants/action-types";
import { ChangeEmailAction, ChangeEmailFailurePayload, ChangePasswordAction, ChangePasswordFailurePayload, ChangePhoneNumberAction, ChangePhoneNumberFailurePayload, ForgotPasswordAction, ForgotPasswordFailurePayload, SendPinCodeAction, SendPinCodeFailurePayload, ResetPasswordAction, ResetPasswordFailurePayload, VerifyNewContactMediaAction, VerifyNewContactMediaFailurePayload } from "../actions/accounts";
import { changeEmail, changeEmailFailure, changeEmailSuccess, changePasswordFailure, changePasswordSuccess, changePhoneNumber, changePhoneNumberFailure, changePhoneNumberSuccess, forgotPasswordFailure, forgotPasswordSuccess, sendPinCodeFailure, sendPinCodeSuccess, resetPasswordFailure, resetPasswordSuccess, verifyNewContactMediaFailure, verifyNewContactMediaSuccess } from "../actions/accounts/accounts-actions";
import { ControllerApi } from "../../features/common/identity/accounts/locale/controller-api";
import { getStorage, setStorage } from "../../core/storage/storage";
import { WasPinCodeSent } from "../../core/constants/common-constants";
import { VerificationTypeEnum } from "../../core/enums/enums-core";
import { AuthenticationConstants } from "../../core/constants/authentication-contants";
import { Jwt } from "../../core/security/jwt";

const controllerApi = new ControllerApi();

const callApiToSendPinCode = async (command: SendPinCodeCommand) => controllerApi.sendPinCode(command);
const callApiToForgotPassword = async (command: ForgotPasswordCommand) => controllerApi.forgotPassword(command);
const callApiToResetPassword = async (command: ResetPasswordCommand) => controllerApi.resetPassword(command);
const callApiToChangePassword = async (command: ChangePasswordCommand) => controllerApi.changePassword(command);
const callApiToVerifyNewContactMedia = async (command: VerifyNewContactMediaCommand) => controllerApi.verifyNewContactMedia(command);
const callApiToChangeEmail = async (command: ChangeEmailCommand) => controllerApi.changeEmail(command);
const callApiToChangePhoneNumber = async (command: ChangePhoneNumberCommand) => controllerApi.changePhoneNumber(command);

function* sendPinCodeSaga(action: SendPinCodeAction) {
  try {
    const command: SendPinCodeCommand = {
      userName: action.payload.command.userName,
      verificationType: action.payload.command.verificationType,
      contactMedia: action.payload.command?.contactMedia?.includes("@")
        ? action.payload.command.contactMedia
        : action?.payload?.command?.dialingCode +
        action.payload.command.contactMedia,
    };
    const response = yield call(callApiToSendPinCode, command);

    if (response) {
      if (response.hasSucceeded) {
        yield put(sendPinCodeSuccess(response.payload as SendPinCodeSuccessPayload));

        if (getStorage<string>("subscription_key") && getStorage<string>("subscription_key").length > 0) {
          if (action.payload.command.verificationType === VerificationTypeEnum.FOR_IDENTITY_VERIFICATION)
            setStorage(WasPinCodeSent.FOR_PASSWORD_CHANGE, "true");
          if (action.payload.command.verificationType === VerificationTypeEnum.FOR_INSTANT_VERIFICATION) {
            if (action.payload.command?.contactMedia?.includes('@')) setStorage(WasPinCodeSent.FOR_EMAIL_CHANGE, "true");
            else setStorage(WasPinCodeSent.FOR_PHONE_NUMBER_CHANGE, "true");
          }
        }
      } else {
        let messages: string[] = [];
        response.errorMessages.map((item) => { return messages.push(item.errorMessage) });
        yield put(sendPinCodeFailure({ errors: messages } as SendPinCodeFailurePayload));
      }
    } else {
      let messages: string[] = [];
      messages.push("Erreur lors de la connexion au serveur");
      yield put(sendPinCodeFailure({ errors: messages } as SendPinCodeFailurePayload));
    }
  } catch (e) {
    let messages: string[] = [];
    messages.push(e.message);
    yield put(sendPinCodeFailure({ errors: messages } as SendPinCodeFailurePayload));
  }
}

function* forgotPasswordSaga(action: ForgotPasswordAction) {
  try {

    const response = yield call(callApiToForgotPassword, action.payload.command);

    if (response) {
      if (response.hasSucceeded) {
        yield put(forgotPasswordSuccess(response.payload as ForgotPasswordSuccessPayload));

      } else {
        let messages: string[] = [];
        response.errorMessages.map((item) => {
          return messages.push(item.errorMessage);
        });
        yield put(forgotPasswordFailure({ errors: messages } as ForgotPasswordFailurePayload));
      }
    } else {
      let messages: string[] = [];
      messages.push("Erreur lors de la connexion au serveur");
      yield put(forgotPasswordFailure({ errors: messages } as ForgotPasswordFailurePayload));
    }
  } catch (e) {
    let messages: string[] = [];
    messages.push(e.message);
    yield put(forgotPasswordFailure({ errors: messages } as ForgotPasswordFailurePayload));
  }
}

function* resetPasswordSaga(action: ResetPasswordAction) {
  try {

    const response = yield call(callApiToResetPassword, action.payload.command);

    if (response) {
      if (response.hasSucceeded) {
        yield put(resetPasswordSuccess(response.payload as ResetPasswordSuccessPayload));

      } else {
        let messages: string[] = [];
        response.errorMessages.map((item) => {
          return messages.push(item.errorMessage);
        });
        yield put(resetPasswordFailure({ errors: messages } as ResetPasswordFailurePayload));
      }
    } else {
      let messages: string[] = [];
      messages.push("Erreur lors de la connexion au serveur");
      yield put(resetPasswordFailure({ errors: messages } as ResetPasswordFailurePayload));
    }
  } catch (e) {
    let messages: string[] = [];
    messages.push(e.message);
    yield put(resetPasswordFailure({ errors: messages } as ResetPasswordFailurePayload));
  }
}

function* changePasswordSaga(action: ChangePasswordAction) {
  try {

    const response = yield call(callApiToChangePassword, action.payload.command);
    if (response) {
      if (response.hasSucceeded) {
        const token = response.payload.token;
        setStorage(AuthenticationConstants.ACCESS_TOKEN, token);
        setStorage(AuthenticationConstants.TENANT_ID, Jwt.getClaim(token, "tenantid"));
        setStorage(AuthenticationConstants.USER_LANGUAGE, Jwt.getClaim(token, 'userlanguage'));

        yield put(changePasswordSuccess(response.payload as ChangePasswordSuccessPayload));

      } else {
        let messages: string[] = [];
        response.errorMessages.map((item) => {
          return messages.push(item.errorMessage);
        });
        yield put(changePasswordFailure({ errors: messages } as ChangePasswordFailurePayload));
      }
    } else {
      let messages: string[] = [];
      messages.push("Erreur lors de la connexion au serveur");
      yield put(changePasswordFailure({ errors: messages } as ChangePasswordFailurePayload));
    }
  } catch (e) {
    let messages: string[] = [];
    messages.push(e.message);
    yield put(changePasswordFailure({ errors: messages } as ChangePasswordFailurePayload));
  }
}

function* verifyNewContactMediaSaga(action: VerifyNewContactMediaAction) {
  try {
    const response = yield call(callApiToVerifyNewContactMedia, action.payload.command);
    const token = getStorage<string>(AuthenticationConstants.ACCESS_TOKEN)
    const userName = Jwt.getClaim(token, "name");
    if (response) {
      if (response.hasSucceeded) {
        yield put(verifyNewContactMediaSuccess(response.payload as VerifyIdentitySuccessPayload));
        action.payload.command.contactMediaKey === "email" ?
          yield put(changeEmail({ userName: userName, newEmail: action.payload.command.NewContactMedia, sourceIpAddress: "" } as ChangeEmailCommand))
          : yield put(changePhoneNumber({ userName: userName, newPhoneNumber: action.payload.command.NewContactMedia, sourceIpAddress: "" } as ChangePhoneNumberCommand));
      } else {
        let messages: string[] = [];
        response.errorMessages.map((item) => {
          return messages.push(item.errorMessage);
        });
        yield put(verifyNewContactMediaFailure({ errors: messages } as VerifyNewContactMediaFailurePayload));
      }
    } else {
      let messages: string[] = [];
      messages.push("Erreur lors de la connexion au serveur");
      yield put(verifyNewContactMediaFailure({ errors: messages } as VerifyNewContactMediaFailurePayload));
    }
  } catch (e) {
    let messages: string[] = [];
    messages.push(e.message);
    yield put(verifyNewContactMediaFailure({ errors: messages } as VerifyNewContactMediaFailurePayload));
  }
}

function* changeEmailSaga(action: ChangeEmailAction) {
  try {
    const response = yield call(callApiToChangeEmail, action.payload.command);
    if (response) {
      if (response.hasSucceeded) {
        yield put(changeEmailSuccess(response.payload as ChangeEmailSuccessPayload));
      } else {
        let messages: string[] = [];
        response.errorMessages.map((item) => {
          return messages.push(item.errorMessage);
        });
        yield put(changeEmailFailure({ errors: messages } as ChangeEmailFailurePayload));
      }
    } else {
      let messages: string[] = [];
      messages.push("Erreur lors de la connexion au serveur");
      yield put(changeEmailFailure({ errors: messages } as ChangeEmailFailurePayload));
    }
  } catch (e) {
    let messages: string[] = [];
    messages.push(e.message);
    yield put(changeEmailFailure({ errors: messages } as ChangeEmailFailurePayload));
  }
}

function* changePhoneNumberSaga(action: ChangePhoneNumberAction) {
  try {
    const response = yield call(callApiToChangePhoneNumber, action.payload.command);
    if (response) {
      if (response.hasSucceeded) {
        yield put(changePhoneNumberSuccess(response.payload as ChangePhoneNumberSuccessPayload));
      } else {
        let messages: string[] = [];
        response.errorMessages.map((item) => {
          return messages.push(item.errorMessage);
        });
        yield put(changePhoneNumberFailure({ errors: messages } as ChangePhoneNumberFailurePayload));
      }
    } else {
      let messages: string[] = [];
      messages.push("Erreur lors de la connexion au serveur");
      yield put(changePhoneNumberFailure({ errors: messages } as ChangePhoneNumberFailurePayload));
    }
  } catch (e) {
    let messages: string[] = [];
    messages.push(e.message);
    yield put(changePhoneNumberFailure({ errors: messages } as ChangePhoneNumberFailurePayload));
  }
}

export function* watchAccountUserSaga() {

  yield takeLatest(ActionTypes.RESEND_PIN_CODE_REQUEST, sendPinCodeSaga);
  yield takeLatest(ActionTypes.FORGOT_PASSWORD_REQUEST, forgotPasswordSaga);
  yield takeLatest(ActionTypes.RESET_PASSWORD_REQUEST, resetPasswordSaga);
  yield takeLatest(ActionTypes.CHANGE_PASSWORD_REQUEST, changePasswordSaga);
  yield takeLatest(ActionTypes.VERIFY_NEW_CONTACT_MEDIA_REQUEST, verifyNewContactMediaSaga);
  yield takeLatest(ActionTypes.CHANGE_EMAIL_REQUEST, changeEmailSaga);
  yield takeLatest(ActionTypes.CHANGE_PHONE_NUMBER_REQUEST, changePhoneNumberSaga);

}