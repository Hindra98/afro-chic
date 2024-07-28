import { ActionTypes } from "../actions/constants/action-types";
import { produce } from "immer";
import { AddUserAction, AddUserStoreShape, DeleteUserAction, DeleteUserStoreShape, GetUserAction, GetUsersAction, GetUsersStoreShape, GetUserStoreShape, initialStateAddUser, initialStateDeleteUser, initialStateGetUser, initialStateGetUsers, initialStateLockUser, initialStateResetPasswordUser, initialStateUpdateUser, initialStateWhoIAm, LockUserAction, LockUserStoreShape, ResetPasswordUserAction, ResetPasswordUserStoreShape, UpdateUserAction, UpdateUserStoreShape, WhoIAmAction, WhoIAmStoreShape } from "../actions/users";


export const whoIAmReducer = (state: WhoIAmStoreShape = initialStateWhoIAm, args: WhoIAmAction): WhoIAmStoreShape => {
  switch (args.type) {

    case ActionTypes.WHO_I_AM_SUCCESS:
      return produce(state, (draftState) => {
        draftState.value.contactMedia = args.payload?.contactMedia
        draftState.value.fullName = args.payload?.fullName
        draftState.value.userId = args.payload?.userId
        draftState.value.userName = args.payload?.userName
      });

    default:
      return state;
  }
};



export const addUserReducer = (state: AddUserStoreShape = initialStateAddUser, args: AddUserAction): AddUserStoreShape => {
  switch (args.type) {

    case ActionTypes.ADD_USER_REQUEST:
      return produce(state, (draftState) => {
        draftState.pending = true;
        draftState.errors = []
        draftState.value.message = '';
      });

    case ActionTypes.ADD_USER_FAILURE:
      return produce(state, (draftState) => {
        draftState.pending = false;
        draftState.errors = args?.payload?.errors?.errors
        draftState.value.message = '';
      });

    case ActionTypes.ADD_USER_SUCCESS:
      return produce(state, (draftState) => {
        draftState.errors = []
        draftState.pending = false;
        draftState.value.message = args.payload?.value?.message
      });

    default:
      return state;
  }
};

export const updateUserReducer = (state: UpdateUserStoreShape = initialStateUpdateUser, args: UpdateUserAction): UpdateUserStoreShape => {
  switch (args.type) {

    case ActionTypes.UPDATE_USER_REQUEST:
      return produce(state, (draftState) => {
        draftState.pending = true;
        draftState.errors = []
        draftState.value.message = '';
      });

    case ActionTypes.UPDATE_USER_FAILURE:
      return produce(state, (draftState) => {
        draftState.pending = false;
        draftState.errors = args?.payload?.errors?.errors
        draftState.value.message = '';
      });

    case ActionTypes.UPDATE_USER_SUCCESS:
      return produce(state, (draftState) => {
        draftState.errors = []
        draftState.pending = false;
        draftState.value.message = args.payload?.value?.message
      });

    default:
      return state;
  }
};

export const deleteUserReducer = (state: DeleteUserStoreShape = initialStateDeleteUser, args: DeleteUserAction): DeleteUserStoreShape => {
  switch (args.type) {

    case ActionTypes.DELETE_USER_REQUEST:
      return produce(state, (draftState) => {
        draftState.pending = true;
        draftState.errors = []
        draftState.value = false;
      });

    case ActionTypes.DELETE_USER_FAILURE:
      return produce(state, (draftState) => {
        draftState.pending = false;
        draftState.errors = args?.payload?.errors?.errors
        draftState.value = false;
      });

    case ActionTypes.DELETE_USER_SUCCESS:
      return produce(state, (draftState) => {
        draftState.errors = []
        draftState.pending = false;
        draftState.value = true;
      });

    default:
      return state;
  }
};

export const getUserReducer = (state: GetUserStoreShape = initialStateGetUser, args: GetUserAction): GetUserStoreShape => {
  switch (args.type) {

    case ActionTypes.USER_REQUEST:
      return produce(state, (draftState) => {
        draftState.pending = true;
        draftState.errors = [];
      });

    case ActionTypes.USER_SUCCESS:
      return produce(state, (draftState) => {
        draftState.pending = false;
        draftState.errors = args?.payload?.errors?.errors
        draftState.value.isAdministrator = args?.payload?.value?.isAdministrator
        draftState.value.user.key = args?.payload?.value?.user?.key
        draftState.value.user.userName = args?.payload?.value?.user?.userName
        draftState.value.user.email = args?.payload?.value?.user?.email
        draftState.value.user.firstName = args?.payload?.value?.user?.firstName
        draftState.value.user.middleName = args?.payload?.value?.user?.middleName
        draftState.value.user.lastName = args?.payload?.value?.user?.lastName
        draftState.value.user.verified = args?.payload?.value?.user?.verified
        draftState.value.user.isVerified = args?.payload?.value?.user?.isVerified
        draftState.value.user.isUserConsentEmailNotification = args?.payload?.value?.user?.isUserConsentEmailNotification
        draftState.value.user.isUserConsentSmsNotification = args?.payload?.value?.user?.isUserConsentSmsNotification
        draftState.value.user.tenantId = args?.payload?.value?.user?.tenantId
        draftState.value.user.verificationPIN = args?.payload?.value?.user?.verificationPIN
        draftState.value.user.verificationPINExpires = args?.payload?.value?.user?.verificationPINExpires
        draftState.value.user.acceptTerms = args?.payload?.value?.user?.acceptTerms
        draftState.value.user.passwordReset = args?.payload?.value?.user?.passwordReset
        draftState.value.user.resetTokenExpires = args?.payload?.value?.user?.resetTokenExpires
        draftState.value.user.created = args?.payload?.value?.user?.created
        draftState.value.user.updated = args?.payload?.value?.user?.updated
        draftState.value.user.isDefaultUser = args?.payload?.value?.user?.isDefaultUser
        draftState.value.user.status = args?.payload?.value?.user?.status
        draftState.value.user.identityDocumentType = args?.payload?.value?.user?.identityDocumentType
        draftState.value.user.idCardNumber = args?.payload?.value?.user?.idCardNumber
        draftState.value.user.phoneNumber = args?.payload?.value?.user?.phoneNumber
        draftState.value.user.preferedCommunicationChannel = args?.payload?.value?.user?.preferedCommunicationChannel
        draftState.value.user.roles = args?.payload?.value?.user?.roles

        draftState.value.branches = args?.payload?.value?.branches
        draftState.value.roles = args?.payload?.value?.roles
        draftState.value.idDocumentTypes = args?.payload?.value?.idDocumentTypes
      });

    case ActionTypes.USER_FAILURE:
      return produce(state, (draftState) => {
        draftState.errors = args.payload?.errors?.errors
        draftState.pending = false;
      });

    default:
      return state;
  }
};

export const getUsersReducer = (state: GetUsersStoreShape = initialStateGetUsers, args: GetUsersAction): GetUsersStoreShape => {
  switch (args.type) {

    case ActionTypes.USERS_REQUEST:
      return produce(state, (draftState) => {
        draftState.pending = true;
        draftState.errors = []
      });

    case ActionTypes.USERS_FAILURE:
      return produce(state, (draftState) => {
        draftState.pending = false;
        draftState.errors = args?.payload?.errors?.errors
      });

    case ActionTypes.USERS_SUCCESS:
      return produce(state, (draftState) => {
        draftState.errors = []
        draftState.pending = false;
        draftState.value.isAdministrator = args.payload?.value?.isAdministrator
        draftState.value.branches = args.payload?.value?.branches
        draftState.value.roles = args.payload?.value?.roles
        draftState.value.users = args.payload?.value?.users
      });

    default:
      return state;
  }
};


export const lockUserReducer = (state: LockUserStoreShape = initialStateLockUser, args: LockUserAction): LockUserStoreShape => {
  switch (args.type) {

    case ActionTypes.LOCK_USER_REQUEST:
      return produce(state, (draftState) => {
        draftState.pending = true;
        draftState.errors = []
        draftState.value = false;
      });

    case ActionTypes.LOCK_USER_FAILURE:
      return produce(state, (draftState) => {
        draftState.pending = false;
        draftState.errors = args?.payload?.errors?.errors
        draftState.value = false;
      });

    case ActionTypes.LOCK_USER_SUCCESS:
      return produce(state, (draftState) => {
        draftState.errors = []
        draftState.pending = false;
        draftState.value = true;
      });

    default:
      return state;
  }
};


export const resetPasswordUserReducer = (state: ResetPasswordUserStoreShape = initialStateResetPasswordUser, args: ResetPasswordUserAction): ResetPasswordUserStoreShape => {
  switch (args.type) {

    case ActionTypes.RESET_PASSWORD_USER_REQUEST:
      return produce(state, (draftState) => {
        draftState.pending = true;
        draftState.errors = []
        draftState.value.message = "";
      });

    case ActionTypes.RESET_PASSWORD_USER_FAILURE:
      return produce(state, (draftState) => {
        draftState.pending = false;
        draftState.errors = args?.payload?.errors?.errors
        draftState.value.message = "";
      });

    case ActionTypes.RESET_PASSWORD_USER_SUCCESS:
      return produce(state, (draftState) => {
        draftState.errors = []
        draftState.pending = false;
        draftState.value.message = args?.payload?.value?.message
      });

    default:
      return state;
  }
};
