import { call, put, takeLatest } from "redux-saga/effects";
import { ActionTypes } from "../actions/constants/action-types";
import { fetchUsersFailure, fetchUsersSuccess, setUser } from "../actions/users/users-actions";
import { getAuth } from "firebase/auth";
import { app_firebase, db_firebase } from "../../http/firebase/config";
import { collection, getDocs } from "firebase/firestore";


function* fetchUsers() {
  try {
    const usersCollection = collection(db_firebase, 'users');
    const usersSnapshot = yield call(getDocs, usersCollection);
    const usersList = usersSnapshot.docs.map(doc => doc.data());
    yield put(fetchUsersSuccess(usersList));
  } catch (error: any) {
    yield put(fetchUsersFailure(error.message));
  }
}


function* fetchUser() {
  try {
    const auth = getAuth(app_firebase);
const user = auth.currentUser;
    if (user) {
      yield put(setUser(user));
    }
  } catch (error) {
    console.error('Failed to fetch user:', error);
  }
}

function* signOutSaga() {

}

//Watcher: Authenticate user
export function* watchFetchUserSaga() {
  yield takeLatest(ActionTypes.AUTHENTICATE_USER_REQUEST, fetchUser);
  yield takeLatest(ActionTypes.LOGOUT_USER_REQUEST, signOutSaga);
  yield takeLatest(ActionTypes.USERS_REQUEST, fetchUsers);
}