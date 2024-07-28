
import { ActionTypes } from "../constants/action-types";
import { AddUserAction, AddUserFailurePayload, DeleteUserAction, DeleteUserFailurePayload, DeleteUserSuccessPayload, GetUserAction, GetUserFailurePayload, GetUsersAction, GetUsersFailurePayload, LockUserAction, LockUserFailurePayload, LockUserSuccessPayload, ResetPasswordUserAction, ResetPasswordUserFailurePayload, UpdateUserAction, UpdateUserFailurePayload, WhoIAmAction } from '.';

export const whoIAmSuccess = (payload: WhoIAmResult): WhoIAmAction => { 
    return {
        type: ActionTypes.WHO_I_AM_SUCCESS,
        payload : payload
    } as WhoIAmAction
};
export const whoIAm = (): WhoIAmAction => { 
    return {
        type: ActionTypes.WHO_I_AM_REQUEST,
        payload : null
    } as WhoIAmAction
};



export const getUsers = (): GetUsersAction => {
    return {
        type: ActionTypes.USERS_REQUEST,
        payload : {
            command: null as string,
            value: null as GetUsers,
            errors: null as GetUsersFailurePayload
        }
    } as GetUsersAction
};
export const getUsersFailure = (payload: GetUsersFailurePayload): GetUsersAction => {
    return {
        type: ActionTypes.USERS_FAILURE,
        payload : {
            command: null as string,
            value: null as GetUsers,
            errors: payload
        }
    } as GetUsersAction
};
export const getUsersSuccess = (payload: GetUsers): GetUsersAction => {
    return {
        type: ActionTypes.USERS_SUCCESS,
        payload : {
            command: null as string,
            value: payload,
            errors: null as GetUsersFailurePayload
        }
    } as GetUsersAction
};


export const getUser = (command: UserCommand): GetUserAction => {
    return {
        type: ActionTypes.USER_REQUEST,
        payload : {
            command: command,
            value: null as GetUser,
            errors: null as GetUserFailurePayload
        }
    } as GetUserAction
};
export const getUserFailure = (payload: GetUserFailurePayload): GetUserAction => {
    return {
        type: ActionTypes.USER_FAILURE,
        payload : {
            command: null,
            value: null,
            errors: payload
        }
    } as GetUserAction
};
export const getUserSuccess = (payload: GetUser): GetUserAction => {
    return {
        type: ActionTypes.USER_SUCCESS,
        payload : {
            command: null,
            value: payload,
            errors: null
        }
    } as GetUserAction
};


export const updateUser = (command: UpdateUserCommand): UpdateUserAction => {
    return {
        type: ActionTypes.UPDATE_USER_REQUEST,
        payload : {
            command: command,
            value: null,
            errors: null
        }
    } as UpdateUserAction
};
export const updateUserFailure = (payload: UpdateUserFailurePayload): UpdateUserAction => {
    return {
        type: ActionTypes.UPDATE_USER_FAILURE,
        payload : {
            command: null,
            value: null,
            errors: payload
        }
    } as UpdateUserAction
};
export const updateUserSuccess = (payload: UpdateUserSuccessPayload): UpdateUserAction => {
    return {
        type: ActionTypes.UPDATE_USER_SUCCESS,
        payload : {
            command: null,
            value: payload,
            errors: null
        }
    } as UpdateUserAction
};


export const deleteUser = (command: DeleteUserCommand): DeleteUserAction => {
    return {
        type: ActionTypes.DELETE_USER_REQUEST,
        payload : {
            command: command,
            value: null,
            errors: null
        }
    } as DeleteUserAction
};
export const deleteUserFailure = (payload: DeleteUserFailurePayload): DeleteUserAction => {
    return {
        type: ActionTypes.DELETE_USER_FAILURE,
        payload : {
            command: null,
            value: null,
            errors: payload
        }
    } as DeleteUserAction
};
export const deleteUserSuccess = (payload: DeleteUserSuccessPayload): DeleteUserAction => {
    return {
        type: ActionTypes.DELETE_USER_SUCCESS,
        payload : {
            command: null,
            value: payload,
            errors: null
        }
    } as DeleteUserAction
};


export const addUser = (command: AddUserCommand): AddUserAction => {
    return {
        type: ActionTypes.ADD_USER_REQUEST,
        payload : {
            command: command,
            value: null,
            errors: null
        }
    } as AddUserAction
};
export const addUserFailure = (payload: AddUserFailurePayload): AddUserAction => {
    return {
        type: ActionTypes.ADD_USER_FAILURE,
        payload : {
            command: null,
            value: null,
            errors: payload
        }
    } as AddUserAction
};
export const addUserSuccess = (payload: AddUserSuccessPayload): AddUserAction => {
    return {
        type: ActionTypes.ADD_USER_SUCCESS,
        payload : {
            command: null,
            value: payload,
            errors: null
        }
    } as AddUserAction
};


export const lockUser = (command: LockUserCommand): LockUserAction => {
    return {
        type: ActionTypes.LOCK_USER_REQUEST,
        payload : {
            command: command,
            value: null,
            errors: null
        }
    } as LockUserAction
};
export const lockUserFailure = (payload: LockUserFailurePayload): LockUserAction => {
    return {
        type: ActionTypes.LOCK_USER_FAILURE,
        payload : {
            command: null,
            value: null,
            errors: payload
        }
    } as LockUserAction
};
export const lockUserSuccess = (payload: LockUserSuccessPayload): LockUserAction => {
    return {
        type: ActionTypes.LOCK_USER_SUCCESS,
        payload : {
            command: null,
            value: payload,
            errors: null
        }
    } as LockUserAction
};


export const resetPasswordUser = (command: ResetPasswordUserCommand): ResetPasswordUserAction => {
    return {
        type: ActionTypes.RESET_PASSWORD_USER_REQUEST,
        payload : {
            command: command,
            value: null,
            errors: null
        }
    } as ResetPasswordUserAction
};
export const resetPasswordUserFailure = (payload: ResetPasswordUserFailurePayload): ResetPasswordUserAction => {
    return {
        type: ActionTypes.RESET_PASSWORD_USER_FAILURE,
        payload : {
            command: null,
            value: null,
            errors: payload
        }
    } as ResetPasswordUserAction
};
export const resetPasswordUserSuccess = (payload: ResetPasswordUserSuccessPayload): ResetPasswordUserAction => {
    return {
        type: ActionTypes.RESET_PASSWORD_USER_SUCCESS,
        payload : {
            command: null,
            value: payload,
            errors: null
        }
    } as ResetPasswordUserAction
};
