import { ActionTypes } from "../actions/constants/action-types";
import { produce } from "immer";
import { StoreShape, initialState, AuthenticateUserAction, VerifyPinCodeStoreShape, initialStatePinCode, VerifyPinCodeAction, SignOutStoreShape, SignOutAction, initialStateSignOut } from "../actions/oauth";
import { Jwt } from "../../core/security/jwt";

export const authenticatedUserReducer = (state: StoreShape = initialState , args: AuthenticateUserAction ) : StoreShape => {

    switch(args.type){

        case ActionTypes.AUTHENTICATE_USER_SUCCESS:
        
            return produce(state, draftState => {
                 draftState.value.message = args.payload?.user?.message ;
                 draftState.value.tenantId = args.payload?.user?.tenantId;
                 draftState.value.token = args.payload?.user?.token;
                 draftState.value.userCanChangePassword = args.payload?.user?.userCanChangePassword;
                 draftState.value.userMustChangePassword = args.payload?.user?.userMustChangePassword;
                 draftState.value.isTwoFactorAuthenticationEnabled = args.payload?.user?.isTwoFactorAuthenticationEnabled;
                 draftState.value.userName = Jwt.getClaim(args.payload?.user?.token, "name");
                 draftState.Errors = [];
                 draftState.pending = false;
            });

        case ActionTypes.AUTHENTICATE_USER_REQUEST:
            return produce(state, draftState => {
                draftState.pending = true;
                draftState.Errors = [];
                draftState.subscriptionKey = args.payload?.command?.subscriptionKey;
            });

        case ActionTypes.AUTHENTICATE_USER_FAILURE:
            return produce(state, draftState => {
                draftState.Errors = args.payload.errors.errors;
                draftState.value.message = "";
                draftState.pending = false;
            });

        
        case ActionTypes.SET_TEMP_AUTHENTICATED_USER:
          return produce(state, (draftState) => {
            draftState.value.message = args.payload?.user?.message;
            draftState.value.tenantId = args.payload?.user?.tenantId;
            draftState.value.token = args.payload?.user?.token;
            draftState.value.userCanChangePassword = args.payload?.user?.userCanChangePassword;
            draftState.value.pinLength = args.payload?.user?.pinLength;
            draftState.value.unReadNotificationsCount = args.payload?.user?.unReadNotificationsCount;
            draftState.value = args.payload?.user;
          });
          
            
    case ActionTypes.LOGOUT_USER_REQUEST:
      return produce(state, (draftState) => {
        
        draftState.value.message = "User logged out" ;
        draftState.value.tenantId = "";
        draftState.value.token = "";
        draftState.value.userCanChangePassword = true;
        draftState.value.userMustChangePassword = true;
        draftState.value.isTwoFactorAuthenticationEnabled = false;
        draftState.value.userName = "";
        draftState.Errors = [];
        draftState.pending = false;
      });

      case ActionTypes.LOGOUT_USER_SUCCESS:
        return produce(state, (draftState) => {
          
          draftState.value.message = "" ;
          draftState.value.tenantId = "";
          draftState.value.token = "";
          draftState.value.userCanChangePassword = true;
          draftState.value.userMustChangePassword = true;
          draftState.value.isTwoFactorAuthenticationEnabled = false;
          draftState.value.userName = "";
          draftState.Errors = [];
          draftState.pending = false;
        });
            
        default:
            return state;
    }
};


export const verifyPinCodeReducer = (state: VerifyPinCodeStoreShape = initialStatePinCode, args: VerifyPinCodeAction): VerifyPinCodeStoreShape => {

  switch (args.type) {

    case ActionTypes.VERIFY_PIN_CODE_SUCCESS:
      return produce(state, (draftState) => {
        draftState.value.isVerified = true;
        draftState.value.message = args.payload?.user?.message;
        draftState.Errors = [];
        draftState.pending = false;
      });

    case ActionTypes.VERIFY_PIN_CODE_REQUEST:
      return produce(state, (draftState) => {
        draftState.pending = true;
        draftState.Errors = [];
      });

    case ActionTypes.VERIFY_PIN_CODE_FAILURE:
      return produce(state, (draftState) => {
        draftState.Errors = args.payload?.errors.errors;
        draftState.value.message = "";
        draftState.pending = false;
      });

    default:
      return state;
  }
};

export const signOutReducer = (state: SignOutStoreShape = initialStateSignOut, args: SignOutAction): SignOutStoreShape => {

  switch (args.type) {

    case ActionTypes.LOGOUT_USER_SUCCESS:
      return produce(state, (draftState) => {
        draftState.value.isUserLoggedOut = args.payload?.user?.isUserLoggedOut;
        draftState.value.refreshToken = args.payload?.user?.refreshToken;
        draftState.Errors = [];
        draftState.pending = false;
      });

    case ActionTypes.LOGOUT_USER_REQUEST:
      return produce(state, (draftState) => {
        draftState.pending = true;
      });

    case ActionTypes.LOGOUT_USER_FAILURE:
      return produce(state, (draftState) => {
        draftState.Errors = args.payload?.errors.errors;
        draftState.value.refreshToken = "";
        draftState.pending = false;
      });

    default:
      return state;
  }
};