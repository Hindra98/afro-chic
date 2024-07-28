
import { ActionTypes } from "../constants/action-types";
import { UpdateMyProfileAction, UpdateMyProfileFailurePayload, GetMyProfileAction, GetMyProfileFailurePayload, UpdateMyProfileSuccessPayload } from '.';

export const updateMyProfile = (command: FormData): UpdateMyProfileAction => {

    return {
        type: ActionTypes.UPDATE_MY_PROFILE_REQUEST,
        payload: {
            command: command,
            value: {value: false},
            errors: null
        }
    } as UpdateMyProfileAction
  };
  
  export const updateMyProfileSuccess = (payload: UpdateMyProfileSuccessPayload): UpdateMyProfileAction => {

    return {
        type: ActionTypes.UPDATE_MY_PROFILE_SUCCESS,
        payload: {
            command: null,
            value: payload,
            errors: null
        }
    } as UpdateMyProfileAction;
  };
  
  export const updateMyProfileFailure = (payload: UpdateMyProfileFailurePayload): UpdateMyProfileAction => {

    return {
        type: ActionTypes.UPDATE_MY_PROFILE_FAILURE,
        payload: {
            command: null,
            value: {value: false},
            errors: payload
        }
    } as UpdateMyProfileAction;
  };

  export const getMyProfile = (command: ""): GetMyProfileAction => {
  
      return {
          type: ActionTypes.GET_MY_PROFILE_REQUEST,
          payload: {
              command: command,
              user: null,
              errors: null
          }
      } as GetMyProfileAction
    };
    
    export const getMyProfileFailure = (payload: GetMyProfileFailurePayload): GetMyProfileAction => {
  
      return {
          type: ActionTypes.GET_MY_PROFILE_FAILURE,
          payload: {
              command: null,
              user: null,
              errors: payload
          }
      } as GetMyProfileAction;
    };
    
    export const getMyProfileSuccess = (payload: GetMyProfile): GetMyProfileAction => {
  
      return {
          type: ActionTypes.GET_MY_PROFILE_SUCCESS,
          payload: {
              command: null,
              user: payload,
              errors: null
          }
      } as GetMyProfileAction;
    };