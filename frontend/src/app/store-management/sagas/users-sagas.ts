import { call, put, takeLatest } from "redux-saga/effects";
import { ActionTypes } from "../actions/constants/action-types";
import { addUserFailure, addUserSuccess, deleteUserFailure, deleteUserSuccess, getUserFailure, getUsersFailure, getUsersSuccess, getUserSuccess, lockUserFailure, lockUserSuccess, resetPasswordUserFailure, resetPasswordUserSuccess, updateUserFailure, updateUserSuccess, whoIAmSuccess } from '../actions/users/users-actions';
import { AddUserAction, AddUserFailurePayload, DeleteUserAction, DeleteUserFailurePayload, DeleteUserSuccessPayload, GetUserAction, GetUserFailurePayload, GetUsersFailurePayload, LockUserAction, LockUserFailurePayload, LockUserSuccessPayload, ResetPasswordUserAction, ResetPasswordUserFailurePayload, UpdateUserAction, UpdateUserFailurePayload } from "../actions/users";
import { ControllerApi } from "../../features/management/users/locale/controller-api";

const controllerApi = new ControllerApi();

const callApiToWhoIAm = async () => controllerApi.whoIAm();

const callApiToUpdateUsers = async (command: UpdateUserCommand) => controllerApi.updateUser(command);
const callApiToAddUsers = async (command: AddUserCommand) => controllerApi.addUser(command);
const callApiToDeleteUser = async (command: DeleteUserCommand) => controllerApi.deleteUser(command);
const callApiToGetUsers = async () => controllerApi.getUsers();
const callApiToGetUser = async (command: UserCommand) => controllerApi.getUser(command);
const callApiToLockUser = async (command: LockUserCommand) => controllerApi.lockUser(command);
const callApiToResetPasswordUser = async (command: ResetPasswordUserCommand) => controllerApi.resetPasswordUser(command);

function* whoIAmSaga () {
  try {
    const response = (yield call(callApiToWhoIAm)) as WhoIAmResult;

    yield put(whoIAmSuccess(response as WhoIAmResult));
 
  } catch (e) {
      const messages: string[] = [];
      messages.push(e.message);
  }
}

function* addUserSaga(action: AddUserAction) {
  try {
    const response = yield call(callApiToAddUsers, action.payload.command);
    if (response) {
      if (response?.hasSucceeded) {
        yield put(addUserSuccess(response?.payload as AddUserSuccessPayload));
        const responseGetUser = yield call(callApiToGetUsers);
        if (responseGetUser) {
          yield put(getUsersSuccess(responseGetUser as GetUsers));
        } else {
          let messages: string[] = [];
          responseGetUser?.errorMessages.map((item) => {
            return messages.push(item.errorMessage);
          });
          yield put(getUsersFailure({ errors: messages } as GetUsersFailurePayload));
        }
      } else {
        let messages: string[] = [];
        response.errorMessages.map((item) => {
          return messages.push(item.errorMessage);
        });
        yield put(addUserFailure({ errors: messages } as AddUserFailurePayload));
      }
    } else {
      let messages: string[] = [];
      messages.push("Erreur lors de la connexion au serveur");
      yield put(addUserFailure({ errors: messages } as AddUserFailurePayload));
    }
  } catch (e) {
    let messages: string[] = [];
    messages.push(e.message);
    yield put(addUserFailure({ errors: messages } as AddUserFailurePayload));
  }
}

function* updateUserSaga(action: UpdateUserAction) {
  try {
    const response = yield call(callApiToUpdateUsers, action.payload.command);
    if (response) {
      if (response?.hasSucceeded) {
        yield put(updateUserSuccess(response?.payload as UpdateUserSuccessPayload));
        const responseGetUser = yield call(callApiToGetUsers);
        if (responseGetUser) {
          yield put(getUsersSuccess(responseGetUser as GetUsers));
        } else {
          let messages: string[] = [];
          responseGetUser?.errorMessages.map((item) => {
            return messages.push(item.errorMessage);
          });
          yield put(getUsersFailure({ errors: messages } as GetUsersFailurePayload));
        }
      } else {
        let messages: string[] = [];
        response.errorMessages.map((item) => {
          return messages.push(item.errorMessage);
        });
        yield put(updateUserFailure({ errors: messages } as UpdateUserFailurePayload));
      }
    } else {
      let messages: string[] = [];
      messages.push("Erreur lors de la connexion au serveur");
      yield put(updateUserFailure({ errors: messages } as UpdateUserFailurePayload));
    }
  } catch (e) {
    let messages: string[] = [];
    messages.push(e.message);
    yield put(updateUserFailure({ errors: messages } as UpdateUserFailurePayload));
  }
}

function* deleteUserSaga(action: DeleteUserAction) {
  try {
    const response = yield call(callApiToDeleteUser, action.payload.command);
    if (response) {
      if (response?.hasSucceeded) {
        yield put(deleteUserSuccess({ value: true } as DeleteUserSuccessPayload));
        const responseGetUser = yield call(callApiToGetUsers);
        if (responseGetUser) {
          yield put(getUsersSuccess(responseGetUser as GetUsers));
        } else {
          let messages: string[] = [];
          responseGetUser?.errorMessages.map((item) => {
            return messages.push(item.errorMessage);
          });
          yield put(getUsersFailure({ errors: messages } as GetUsersFailurePayload));
        }
      } else {
        let messages: string[] = [];
        response.errorMessages.map((item) => {
          return messages.push(item.errorMessage);
        });
        yield put(deleteUserFailure({ errors: messages } as DeleteUserFailurePayload));
      }
    } else {
      let messages: string[] = [];
      messages.push("Erreur lors de la connexion au serveur");
      yield put(deleteUserFailure({ errors: messages } as DeleteUserFailurePayload));
    }
  } catch (e) {
    let messages: string[] = [];
    messages.push(e.message);
    yield put(deleteUserFailure({ errors: messages } as DeleteUserFailurePayload));
  }
}

function* getUsersSaga() {
  try {
    const response = yield call(callApiToGetUsers);
    if (response) {
      yield put(getUsersSuccess(response as GetUsers));
    } else {
      let messages: string[] = [];
      response?.errorMessages.map((item) => {
        return messages.push(item.errorMessage);
      });
      yield put(getUsersFailure({ errors: messages } as GetUsersFailurePayload));
    }

  } catch (e) {
    let messages: string[] = [];
    messages.push(e.message);
    yield put(getUsersFailure({ errors: messages } as GetUsersFailurePayload));
  }
}

function* getUserSaga(action: GetUserAction) {
  try {
    const response = yield call(callApiToGetUser, action.payload.command);
    if (response) {
      yield put(getUserSuccess(response as GetUser));
    } else {
      let messages: string[] = [];
      response?.errorMessages.map((item) => {
        return messages.push(item.errorMessage);
      });
      yield put(getUserFailure({ errors: messages } as GetUserFailurePayload));
    }

  } catch (e) {
    let messages: string[] = [];
    messages.push(e.message);
    yield put(getUserFailure({ errors: messages } as GetUserFailurePayload));
  }
}

function* lockUserSaga(action: LockUserAction) {
  try {
    const response = yield call(callApiToLockUser, action.payload.command);
    if (response) {
      if (response?.hasSucceeded) {
        yield put(lockUserSuccess({ value: true } as LockUserSuccessPayload));
        const responseGetUser = yield call(callApiToGetUsers);
        if (responseGetUser) {
          yield put(getUsersSuccess(responseGetUser as GetUsers));
        } else {
          let messages: string[] = [];
          responseGetUser?.errorMessages.map((item) => {
            return messages.push(item.errorMessage);
          });
          yield put(getUsersFailure({ errors: messages } as GetUsersFailurePayload));
        }
      } else {
        let messages: string[] = [];
        response.errorMessages.map((item) => {
          return messages.push(item.errorMessage);
        });
        yield put(lockUserFailure({ errors: messages } as LockUserFailurePayload));
      }
    } else {
      let messages: string[] = [];
      messages.push("Erreur lors de la connexion au serveur");
      yield put(lockUserFailure({ errors: messages } as LockUserFailurePayload));
    }
  } catch (e) {
    let messages: string[] = [];
    messages.push(e.message);
    yield put(lockUserFailure({ errors: messages } as LockUserFailurePayload));
  }
}

function* resetPasswordUserSaga(action: ResetPasswordUserAction) {
  try {
    const response = yield call(callApiToResetPasswordUser, action.payload.command);
    if (response) {
      if (response?.hasSucceeded) {
        yield put(resetPasswordUserSuccess(response?.payload as ResetPasswordUserSuccessPayload));
        const responseGetUser = yield call(callApiToGetUsers);
        if (responseGetUser) {
          yield put(getUsersSuccess(responseGetUser as GetUsers));
        } else {
          let messages: string[] = [];
          responseGetUser?.errorMessages.map((item) => {
            return messages.push(item.errorMessage);
          });
          yield put(getUsersFailure({ errors: messages } as GetUsersFailurePayload));
        }
      } else {
        let messages: string[] = [];
        response.errorMessages.map((item) => {
          return messages.push(item.errorMessage);
        });
        yield put(resetPasswordUserFailure({ errors: messages } as ResetPasswordUserFailurePayload));
      }
    } else {
      let messages: string[] = [];
      messages.push("Erreur lors de la connexion au serveur");
      yield put(resetPasswordUserFailure({ errors: messages } as ResetPasswordUserFailurePayload));
    }
  } catch (e) {
    let messages: string[] = [];
    messages.push(e.message);
    yield put(resetPasswordUserFailure({ errors: messages } as ResetPasswordUserFailurePayload));
  }
}

export function* watchUsersSaga(){
  yield takeLatest(ActionTypes.WHO_I_AM_REQUEST, whoIAmSaga);
  yield takeLatest(ActionTypes.USERS_REQUEST, getUsersSaga);
  yield takeLatest(ActionTypes.USER_REQUEST, getUserSaga);
  yield takeLatest(ActionTypes.UPDATE_USER_REQUEST, updateUserSaga);
  yield takeLatest(ActionTypes.ADD_USER_REQUEST, addUserSaga);
  yield takeLatest(ActionTypes.DELETE_USER_REQUEST, deleteUserSaga);
  yield takeLatest(ActionTypes.LOCK_USER_REQUEST, lockUserSaga);
  yield takeLatest(ActionTypes.RESET_PASSWORD_USER_REQUEST, resetPasswordUserSaga);
}