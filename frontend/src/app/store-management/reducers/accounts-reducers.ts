import { ActionTypes } from "../actions/constants/action-types";
import { produce } from "immer";
import { ChangeEmailAction, ChangeEmailStoreShape, ChangePasswordAction, ChangePasswordStoreShape, ChangePhoneNumberAction, ChangePhoneNumberStoreShape, ForgotPasswordAction, ForgotPasswordStoreShape, initialStateChangeEmail, initialStateChangePassword, initialStateChangePhoneNumber, initialStateForgotPassword, initialStateSendPinCode, initialStateResetPassword, initialStateVerifyNewContactMedia, SendPinCodeAction, SendPinCodeStoreShape, ResetPasswordAction, ResetPasswordStoreShape, VerifyNewContactMediaAction, VerifyNewContactMediaStoreShape } from "../actions/accounts";


export const sendPinCodeReducer = (state: SendPinCodeStoreShape = initialStateSendPinCode, args: SendPinCodeAction): SendPinCodeStoreShape => {

  switch (args.type) {

    case ActionTypes.RESEND_PIN_CODE_SUCCESS:
      return produce(state, (draftState) => {
        draftState.value.message = args.payload?.user?.message;
        draftState.Errors = [];
        draftState.pending = false;
      });

    case ActionTypes.RESEND_PIN_CODE_REQUEST:
      return produce(state, (draftState) => {
        draftState.value.contactMedia = args.payload?.command?.contactMedia;
        draftState.value.dialingCode = args.payload?.command?.dialingCode;
        draftState.pending = true;
        draftState.Errors = [];
      });

    case ActionTypes.RESEND_PIN_CODE_FAILURE:
      return produce(state, (draftState) => {
        draftState.Errors = args.payload?.errors?.errors;
        draftState.value.message = "";
        draftState.pending = false;
      });

    default:
      return state;
  }
};

export const forgotPasswordReducer = (state: ForgotPasswordStoreShape = initialStateForgotPassword, args: ForgotPasswordAction): ForgotPasswordStoreShape => {

  switch (args.type) {

    case ActionTypes.FORGOT_PASSWORD_SUCCESS:
      return produce(state, (draftState) => {
        draftState.value.message = args.payload?.user?.message;
        draftState.Errors = [];
        draftState.pending = false;
      });

    case ActionTypes.FORGOT_PASSWORD_REQUEST:
      return produce(state, (draftState) => {
        draftState.pending = true;
        draftState.Errors = [];
      });

    case ActionTypes.FORGOT_PASSWORD_FAILURE:
      return produce(state, (draftState) => {
        draftState.Errors = args.payload?.errors.errors;
        draftState.value.message = "";
        draftState.pending = false;
      });

    default:
      return state;
  }
};

export const resetPasswordReducer = (state: ResetPasswordStoreShape = initialStateResetPassword, args: ResetPasswordAction): ResetPasswordStoreShape => {

  switch (args.type) {

    case ActionTypes.RESET_PASSWORD_SUCCESS:
      return produce(state, (draftState) => {
        draftState.value.message = args.payload?.user?.message;
        draftState.Errors = [];
        draftState.pending = false;
      });

    case ActionTypes.RESET_PASSWORD_REQUEST:
      return produce(state, (draftState) => {
        draftState.pending = true;
        draftState.Errors = [];
      });

    case ActionTypes.RESET_PASSWORD_FAILURE:
      return produce(state, (draftState) => {
        draftState.Errors = args.payload?.errors.errors;
        draftState.value.message = "";
        draftState.pending = false;
      });

    default:
      return state;
  }
};

export const changePasswordReducer = (state: ChangePasswordStoreShape = initialStateChangePassword, args: ChangePasswordAction): ChangePasswordStoreShape => {

  switch (args.type) {

    case ActionTypes.CHANGE_PASSWORD_SUCCESS:
      return produce(state, (draftState) => {
        draftState.value.message = args.payload?.user?.message;
        draftState.value.token = args.payload?.user?.token;
        draftState.value.refreshToken = args.payload?.user?.refreshToken;
        draftState.value.expiration = args.payload?.user?.expiration;
        draftState.Errors = [];
        draftState.pending = false;
      });

    case ActionTypes.CHANGE_PASSWORD_REQUEST:
      return produce(state, (draftState) => {
        draftState.pending = true;
        draftState.Errors = [];
      });

    case ActionTypes.CHANGE_PASSWORD_FAILURE:
      return produce(state, (draftState) => {
        draftState.Errors = args.payload?.errors.errors;
        draftState.value.message = "";
        draftState.pending = false;
      });

    default:
      return state;
  }
};

export const verifyNewContactMediaReducer = (state: VerifyNewContactMediaStoreShape = initialStateVerifyNewContactMedia, args: VerifyNewContactMediaAction): VerifyNewContactMediaStoreShape => {

  switch (args.type) {
    case ActionTypes.VERIFY_NEW_CONTACT_MEDIA_SUCCESS:
      return produce(state, (draftState) => {
        draftState.value.message = args.payload?.user?.message;
        draftState.value.isVerified = args.payload?.user?.isVerified;
        draftState.Errors = [];
        draftState.pending = false;
      });

    case ActionTypes.VERIFY_NEW_CONTACT_MEDIA_REQUEST:
      return produce(state, (draftState) => {
        draftState.pending = true;
        draftState.Errors = [];
      });

    case ActionTypes.VERIFY_NEW_CONTACT_MEDIA_FAILURE:
      return produce(state, (draftState) => {
        draftState.Errors = args.payload?.errors.errors;
        draftState.value.message = "";
        draftState.pending = false;
        draftState.value.isVerified = false;
      });
    default:
      return state;
  }
};

export const changeEmailReducer = (state: ChangeEmailStoreShape = initialStateChangeEmail, args: ChangeEmailAction): ChangeEmailStoreShape => {

  switch (args.type) {
    case ActionTypes.CHANGE_EMAIL_SUCCESS:
      return produce(state, (draftState) => {
        draftState.value.message = args.payload?.user?.message;
        draftState.Errors = [];
        draftState.pending = false;
      });

    case ActionTypes.CHANGE_EMAIL_REQUEST:
      return produce(state, (draftState) => {
        draftState.pending = true;
        draftState.Errors = [];
      });

    case ActionTypes.CHANGE_EMAIL_FAILURE:
      return produce(state, (draftState) => {
        draftState.Errors = args.payload?.errors.errors;
        draftState.value.message = "";
        draftState.pending = false;
      });
    default:
      return state;
  }
};

export const changePhoneNumberReducer = (state: ChangePhoneNumberStoreShape = initialStateChangePhoneNumber, args: ChangePhoneNumberAction): ChangePhoneNumberStoreShape => {

  switch (args.type) {
    case ActionTypes.CHANGE_PHONE_NUMBER_SUCCESS:
      return produce(state, (draftState) => {
        draftState.value.message = args.payload?.user?.message;
        draftState.Errors = [];
        draftState.pending = false;
      });

    case ActionTypes.CHANGE_PHONE_NUMBER_REQUEST:
      return produce(state, (draftState) => {
        draftState.pending = true;
        draftState.Errors = [];
      });

    case ActionTypes.CHANGE_PHONE_NUMBER_FAILURE:
      return produce(state, (draftState) => {
        draftState.Errors = args.payload?.errors.errors;
        draftState.value.message = "";
        draftState.pending = false;
      });
    default:
      return state;
  }
};

