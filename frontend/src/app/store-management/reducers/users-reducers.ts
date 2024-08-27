import { User } from "firebase/auth";
import { ActionTypes } from "../actions/constants/action-types";
import { createReducer } from "@reduxjs/toolkit";
import { fetchUsersFailure, fetchUsersRequest, fetchUsersSuccess } from "../actions/users/users-actions";
// import { produce } from "immer";
// import { GetUserAction, GetUserStoreShape, initialStateGetUser} from "../actions/users";

interface UserConnectState {
  user: User | null;
}

interface UsersState {
  loading: boolean;
  users: any[];
  error: string | null;
}

const initialStateUserConnect: UserConnectState = {
  user: null
};

const initialStateUsers: UsersState = {
  loading: false,
  users: [],
  error: null,
};

export const usersReducer = createReducer(initialStateUsers, (builder) => {
  builder
    .addCase(fetchUsersRequest, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(fetchUsersSuccess, (state, action) => {
      state.loading = false;
      state.users = action.payload;
    })
    .addCase(fetchUsersFailure, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
});


export const getUserReducer = (state = initialStateUserConnect, action: UserActionTypes): UserConnectState => {
  switch (action.type) {
    case ActionTypes.SET_USER:
      return { ...state, user: action?.payload };
    case ActionTypes.LOGOUT_USER:
      return { ...state, user: null };
    default:
      return state;
  }
};


// export const getUserReducer_old = (state: GetUserStoreShape = initialStateGetUser, args: GetUserAction): GetUserStoreShape => {
//   switch (args.type) {

//     case ActionTypes.USER_REQUEST:
//       return produce(state, (draftState) => {
//         draftState.pending = true;
//         draftState.errors = [];
//       });

//     case ActionTypes.USER_SUCCESS:
//       return produce(state, (draftState) => {
//         draftState.pending = false;
//         draftState.errors = args?.payload?.errors?.errors
//         draftState.value.connected = args?.payload?.value?.connected
//         draftState.value.user.uid = args?.payload?.value?.user?.uid
//         draftState.value.user.displayName = args?.payload?.value?.user?.displayName
//         draftState.value.user.email = args?.payload?.value?.user?.email
//         draftState.value.user.emailVerified = args?.payload?.value?.user?.emailVerified
//         draftState.value.user.isAnonymous = args?.payload?.value?.user?.isAnonymous
//         draftState.value.user.photoURL = args?.payload?.value?.user?.photoURL
//         draftState.value.user.providerData = args?.payload?.value?.user?.providerData
//         draftState.value.user.stsTokenManager = args?.payload?.value?.user?.stsTokenManager
//         draftState.value.user.createdAt = args?.payload?.value?.user?.createdAt
//         draftState.value.user.lastLoginAt = args?.payload?.value?.user?.lastLoginAt
//         draftState.value.user.apiKey = args?.payload?.value?.user?.apiKey
//         draftState.value.user.appName
//       });

//     case ActionTypes.USER_FAILURE:
//       return produce(state, (draftState) => {
//         draftState.errors = args.payload?.errors?.errors
//         draftState.pending = false;
//       });

//     default:
//       return state;
//   }
// };

// export const getUsersReducer = (state: GetUsersStoreShape = initialStateGetUsers, args: GetUsersAction): GetUsersStoreShape => {
//   switch (args.type) {

//     case ActionTypes.USERS_REQUEST:
//       return produce(state, (draftState) => {
//         draftState.pending = true;
//         draftState.errors = []
//       });

//     case ActionTypes.USERS_FAILURE:
//       return produce(state, (draftState) => {
//         draftState.pending = false;
//         draftState.errors = args?.payload?.errors?.errors
//       });

//     case ActionTypes.USERS_SUCCESS:
//       return produce(state, (draftState) => {
//         draftState.errors = []
//         draftState.pending = false;
//         draftState.value.connected = args.payload?.value?.connected
//         draftState.value.branches = args.payload?.value?.branches
//         draftState.value.roles = args.payload?.value?.roles
//         draftState.value.users = args.payload?.value?.users
//       });

//     default:
//       return state;
//   }
// };

