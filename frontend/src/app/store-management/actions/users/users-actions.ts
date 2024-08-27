
import { createAction } from '@reduxjs/toolkit';
import { GetUserAction, GetUserFailurePayload } from ".";
import { ActionTypes } from "../constants/action-types";


export const setUser = (user): UserActionTypes => ({
  type: ActionTypes.SET_USER,
  payload: user
});

export const logoutUser = (): UserActionTypes => ({
  type: ActionTypes.LOGOUT_USER,
  payload: null
});

export const fetchUsersRequest = createAction(ActionTypes.USERS_REQUEST);
export const fetchUsersSuccess = createAction<any[]>(ActionTypes.USERS_SUCCESS);
export const fetchUsersFailure = createAction<string>(ActionTypes.USERS_FAILURE);





// export const getUsers = (): GetUsersAction => {
//     return {
//         type: ActionTypes.USERS_REQUEST,
//         payload : {
//             command: null as string,
//             value: null as GetUsers,
//             errors: null as GetUsersFailurePayload
//         }
//     } as GetUsersAction
// };
// export const getUsersFailure = (payload: GetUsersFailurePayload): GetUsersAction => {
//     return {
//         type: ActionTypes.USERS_FAILURE,
//         payload : {
//             command: null as string,
//             value: null as GetUsers,
//             errors: payload
//         }
//     } as GetUsersAction
// };
// export const getUsersSuccess = (payload: GetUsers): GetUsersAction => {
//     return {
//         type: ActionTypes.USERS_SUCCESS,
//         payload : {
//             command: null as string,
//             value: payload,
//             errors: null as GetUsersFailurePayload
//         }
//     } as GetUsersAction
// };


export const getUser = (command: ""): GetUserAction => {
    return {
        type: ActionTypes.USER_REQUEST,
        payload : {
            command: command,
            value: null as unknown,
            errors: null as unknown
        }
    } as GetUserAction
};
export const getUserFailure = (payload: GetUserFailurePayload): GetUserAction => {
    return {
        type: ActionTypes.USER_FAILURE,
        payload : {
            command: null as unknown,
            value: null as unknown,
            errors: payload
        }
    } as GetUserAction
};
export const getUserSuccess = (payload: GetUser): GetUserAction => {
    return {
        type: ActionTypes.USER_SUCCESS,
        payload : {
            command: null as unknown,
            value: payload,
            errors: null as unknown
        }
    } as GetUserAction
};