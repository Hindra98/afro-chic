import { ActionTypes } from "../constants/action-types";
import { AuthenticateUserAction, AuthenticateUserFailurePayload, RegisterAction, RegisterFailurePayload, SignOutAction, SignOutFailurePayload, VerifyPinCodeAction, VerifyPinCodeFailurePayload } from ".";
import { User } from "firebase/auth";

export const authenticateUser = (payload: AuthenticateUserCommand): AuthenticateUserAction => { 
    return {
        type: ActionTypes.AUTHENTICATE_USER_REQUEST,
        payload: {
            command: payload,
            user: null,
            errors: null
        }
    } as AuthenticateUserAction
};

export const authenticateUserSuccess = (payload: AuthenticateUserSuccessPayload): AuthenticateUserAction => {
   return {

        type: ActionTypes.AUTHENTICATE_USER_SUCCESS,
        payload: {
            command: null,
            user: payload,
            errors: null
        }
    } as AuthenticateUserAction;
};

export const authenticateUserFailure = (payload: AuthenticateUserFailurePayload): AuthenticateUserAction => {

    return {
        type: ActionTypes.AUTHENTICATE_USER_FAILURE,
        payload: {
            command: null,
            user: null,
            errors: payload
        }
    } as AuthenticateUserAction;
};

export const authenticateUserSuccessTemp = (payload: AuthenticateUserSuccessPayload): AuthenticateUserAction => {
   return {

        type: ActionTypes.SET_TEMP_AUTHENTICATED_USER,
        payload: {
            command: null,
            user: payload,
            errors: null
        }
    } as AuthenticateUserAction;
};
  
export const verifyPinCode = (payload: VerifyIdentityCommand): VerifyPinCodeAction => {
    return {
        type: ActionTypes.VERIFY_PIN_CODE_REQUEST,
        payload: {
            command: payload,
            user: null,
            errors: null
        }
    } as VerifyPinCodeAction
};

export const verifyPinCodeSuccess = (payload: VerifyIdentitySuccessPayload): VerifyPinCodeAction => {
   return {

        type: ActionTypes.VERIFY_PIN_CODE_SUCCESS,
        payload: {
            command: null,
            user: payload,
            errors: null
        }
    } as VerifyPinCodeAction;
};

export const verifyPinCodeFailure = (payload: VerifyPinCodeFailurePayload): VerifyPinCodeAction => {

    return {
        type: ActionTypes.VERIFY_PIN_CODE_FAILURE,
        payload: {
            command: null,
            user: null,
            errors: payload
        }
    } as VerifyPinCodeAction;
};


export const signOut = () => {
    
    return {
        type: ActionTypes.LOGOUT_USER_REQUEST,
        payload: {
            user: null,
            errors: null
        }
    }

}

export const signOutFailure = (error: SignOutFailurePayload): SignOutAction => {
    
    return {
        type: ActionTypes.LOGOUT_USER_FAILURE,
        payload: {
            user: null,
            errors: error
        }
    } as SignOutAction;
}

export const signOutSuccess = (user: SignOutSuccessPayload): SignOutAction => {
    
    return {
        type: ActionTypes.LOGOUT_USER_SUCCESS,
        payload: {
            user: user,
            errors: null
        }
    } as SignOutAction;
}





export const register = (command: RegisterCommand) => {
    
  return {
      type: ActionTypes.REGISTER_USER_REQUEST,
      payload: {
        command: command,
          user: null,
          errors: null
      }
  }

}

export const registerFailure = (error: RegisterFailurePayload): RegisterAction => {
  
  return {
      type: ActionTypes.REGISTER_USER_FAILURE,
      payload: {
        command: {},
          user: {
            emailVerified: false,
            metadata: {},
            providerData: {}},
          errors: error
      }
  } as RegisterAction;
}

export const registerSuccess = (user: User): RegisterAction => {
  
  return {
      type: ActionTypes.REGISTER_USER_SUCCESS,
      payload: {
        command: {},
          user: user,
          errors: {}
      }
  } as RegisterAction;
}

