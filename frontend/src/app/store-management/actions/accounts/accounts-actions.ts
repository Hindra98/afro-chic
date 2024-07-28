import { ActionTypes } from "../constants/action-types";
import { ChangeEmailAction, ChangeEmailFailurePayload, ChangePasswordAction, ChangePasswordFailurePayload, ChangePhoneNumberAction, ChangePhoneNumberFailurePayload, ForgotPasswordAction, ForgotPasswordFailurePayload, SendPinCodeAction, SendPinCodeFailurePayload, ResetPasswordAction, ResetPasswordFailurePayload, VerifyNewContactMediaAction, VerifyNewContactMediaFailurePayload } from ".";
import { getStorage } from "../../../core/storage/storage";
import { WasPinCodeSent } from "../../../core/constants/common-constants";


export const sendPinCode = (payload: SendPinCodeCommand): SendPinCodeAction => { 
    return {
        type: ActionTypes.RESEND_PIN_CODE_REQUEST,
        payload: {
            command: payload,
            user: null,
            errors: null
        }
    } as SendPinCodeAction
};
export const sendPinCodeSuccess = (payload: SendPinCodeSuccessPayload): SendPinCodeAction => {
   return {
        type: ActionTypes.RESEND_PIN_CODE_SUCCESS,
        payload: {
            command: null,
            user: payload,
            errors: null
        }
    } as SendPinCodeAction;
};
export const sendPinCodeFailure = (payload: SendPinCodeFailurePayload): SendPinCodeAction => {
    return {
        type: ActionTypes.RESEND_PIN_CODE_FAILURE,
        payload: {
            command: null,
            user: null,
            errors: payload
        }
    } as SendPinCodeAction;
};

export const forgotPassword = (payload: ForgotPasswordCommand): ForgotPasswordAction => { 
    return {
        type: ActionTypes.FORGOT_PASSWORD_REQUEST,
        payload: {
            command: payload,
            user: null,
            errors: null
        }
    } as ForgotPasswordAction
};
export const forgotPasswordSuccess = (payload: ForgotPasswordSuccessPayload): ForgotPasswordAction => {
   return {
        type: ActionTypes.FORGOT_PASSWORD_SUCCESS,
        payload: {
            command: null,
            user: payload,
            errors: null
        }
    } as ForgotPasswordAction;
};
export const forgotPasswordFailure = (payload: ForgotPasswordFailurePayload): ForgotPasswordAction => {
    return {
        type: ActionTypes.FORGOT_PASSWORD_FAILURE,
        payload: {
            command: null,
            user: null,
            errors: payload
        }
    } as ForgotPasswordAction;
};

export const resetPassword = (payload: ResetPasswordCommand): ResetPasswordAction => { 
    return {
        type: ActionTypes.RESET_PASSWORD_REQUEST,
        payload: {
            command: payload,
            user: null,
            errors: null
        }
    } as ResetPasswordAction
};
export const resetPasswordSuccess = (payload: ResetPasswordSuccessPayload): ResetPasswordAction => {
   return {
        type: ActionTypes.RESET_PASSWORD_SUCCESS,
        payload: {
            command: null,
            user: payload,
            errors: null
        }
    } as ResetPasswordAction;
};
export const resetPasswordFailure = (payload: ResetPasswordFailurePayload): ResetPasswordAction => {
    return {
        type: ActionTypes.RESET_PASSWORD_FAILURE,
        payload: {
            command: null,
            user: null,
            errors: payload
        }
    } as ResetPasswordAction;
};

export const changePassword = (payload: ChangePasswordCommand): ChangePasswordAction => {
  return {
      type: ActionTypes.CHANGE_PASSWORD_REQUEST,
      payload: {
          command: payload,
          user: null,
          errors: null
      }
  } as ChangePasswordAction
};
export const changePasswordSuccess = (payload: ChangePasswordSuccessPayload): ChangePasswordAction => {
    getStorage<string>("is_verified", true);
    getStorage<string>(WasPinCodeSent.FOR_PASSWORD_CHANGE, true);
 return {
      type: ActionTypes.CHANGE_PASSWORD_SUCCESS,
      payload: {
          command: null,
          user: payload,
          errors: null
      }
  } as ChangePasswordAction;
};
export const changePasswordFailure = (payload: ChangePasswordFailurePayload): ChangePasswordAction => {
  return {
      type: ActionTypes.CHANGE_PASSWORD_FAILURE,
      payload: {
          command: null,
          user: null,
          errors: payload
      }
  } as ChangePasswordAction;
};

export const verifyNewContactMedia = (payload: VerifyNewContactMediaCommand): VerifyNewContactMediaAction => {
  return {
      type: ActionTypes.VERIFY_NEW_CONTACT_MEDIA_REQUEST,
      payload: {
          command: payload,
          user: null,
          errors: null
      }
  } as VerifyNewContactMediaAction
};
export const verifyNewContactMediaSuccess = (payload: VerifyIdentitySuccessPayload): VerifyNewContactMediaAction => {
    getStorage<string>("is_verified", true);
    getStorage<string>(WasPinCodeSent.FOR_PASSWORD_CHANGE, true);
 return {
      type: ActionTypes.VERIFY_NEW_CONTACT_MEDIA_SUCCESS,
      payload: {
          command: null,
          user: payload,
          errors: null
      }
  } as VerifyNewContactMediaAction;
};
export const verifyNewContactMediaFailure = (payload: VerifyNewContactMediaFailurePayload): VerifyNewContactMediaAction => {
  return {
      type: ActionTypes.VERIFY_NEW_CONTACT_MEDIA_FAILURE,
      payload: {
          command: null,
          user: null,
          errors: payload
      }
  } as VerifyNewContactMediaAction;
};

export const changeEmail = (payload: ChangeEmailCommand): ChangeEmailAction => {
  return {
      type: ActionTypes.CHANGE_EMAIL_REQUEST,
      payload: {
          command: payload,
          user: null,
          errors: null
      }
  } as ChangeEmailAction
};
export const changeEmailSuccess = (payload: ChangeEmailSuccessPayload): ChangeEmailAction => {
    getStorage<string>(WasPinCodeSent.FOR_PHONE_NUMBER_CHANGE, true);
 return {
      type: ActionTypes.CHANGE_EMAIL_SUCCESS,
      payload: {
          command: null,
          user: payload,
          errors: null
      }
  } as ChangeEmailAction;
};
export const changeEmailFailure = (payload: ChangeEmailFailurePayload): ChangeEmailAction => {
  return {
      type: ActionTypes.CHANGE_EMAIL_FAILURE,
      payload: {
          command: null,
          user: null,
          errors: payload
      }
  } as ChangeEmailAction;
};


export const changePhoneNumber = (payload: ChangePhoneNumberCommand): ChangePhoneNumberAction => {
    return {
        type: ActionTypes.CHANGE_PHONE_NUMBER_REQUEST,
        payload: {
            command: payload,
            user: null,
            errors: null
        }
    } as ChangePhoneNumberAction
  };
  export const changePhoneNumberSuccess = (payload: ChangePhoneNumberSuccessPayload): ChangePhoneNumberAction => {
      getStorage<string>(WasPinCodeSent.FOR_EMAIL_CHANGE, true);
   return {
        type: ActionTypes.CHANGE_PHONE_NUMBER_SUCCESS,
        payload: {
            command: null,
            user: payload,
            errors: null
        }
    } as ChangePhoneNumberAction;
  };
  export const changePhoneNumberFailure = (payload: ChangePhoneNumberFailurePayload): ChangePhoneNumberAction => {
    return {
        type: ActionTypes.CHANGE_PHONE_NUMBER_FAILURE,
        payload: {
            command: null,
            user: null,
            errors: payload
        }
    } as ChangePhoneNumberAction;
  };