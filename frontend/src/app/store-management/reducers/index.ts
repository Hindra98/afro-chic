import { combineReducers } from "@reduxjs/toolkit";
import { changeLanguageReducer, setLanguagesReducer } from "./languages-reducers";
import { authenticatedUserReducer, signOutReducer, verifyPinCodeReducer } from "./oauth-reducers";
import { setServerNotificationsReducer } from "./server-notifications-reducer";
import { changeEmailReducer, changePasswordReducer, changePhoneNumberReducer, forgotPasswordReducer, sendPinCodeReducer, resetPasswordReducer, verifyNewContactMediaReducer } from "./accounts-reducers";
import { addUserReducer, deleteUserReducer, getUserReducer, getUsersReducer, lockUserReducer, resetPasswordUserReducer, updateUserReducer, whoIAmReducer } from "./users-reducers";
import { myProfileGetDataReducer, myProfileReducer } from "./my-profile-reducers";

const rootReducer = combineReducers({
    authenticatedUser: authenticatedUserReducer,
    verifyPinCode: verifyPinCodeReducer,
    signOut: signOutReducer,
    sendPinCode: sendPinCodeReducer,
    forgotPassword: forgotPasswordReducer,
    resetPassword: resetPasswordReducer,
    changePassword: changePasswordReducer,
    verifyNewContactMedia: verifyNewContactMediaReducer,
    changeEmail: changeEmailReducer,
    changePhoneNumber: changePhoneNumberReducer,
    myProfile: myProfileReducer,
    myProfileGetData: myProfileGetDataReducer,
    getUsers: getUsersReducer,
    getUser: getUserReducer,
    deleteUser: deleteUserReducer,
    updateUser: updateUserReducer,
    addUser: addUserReducer,
    lockUser: lockUserReducer,
    resetPasswordUser: resetPasswordUserReducer,
    whoIAm: whoIAmReducer,

    serverNotifications: setServerNotificationsReducer,
    appLanguages: setLanguagesReducer,
    currentLanguage: changeLanguageReducer,
});

export default rootReducer;