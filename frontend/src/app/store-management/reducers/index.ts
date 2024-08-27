import { combineReducers } from "@reduxjs/toolkit";
import { changeLanguageReducer, setLanguagesReducer } from "./languages-reducers";
import { authenticatedUserReducer, registerReducer, signOutReducer, verifyPinCodeReducer } from "./oauth-reducers";
import { setServerNotificationsReducer } from "./server-notifications-reducer";
import { changeEmailReducer, changePasswordReducer, changePhoneNumberReducer, forgotPasswordReducer, sendPinCodeReducer, resetPasswordReducer, verifyNewContactMediaReducer } from "./accounts-reducers";
import { getUserReducer, usersReducer } from "./users-reducers";

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
    getUser: getUserReducer,
    getUsers: usersReducer,
    registerUser: registerReducer,

    serverNotifications: setServerNotificationsReducer,
    appLanguages: setLanguagesReducer,
    currentLanguage: changeLanguageReducer,
});

export default rootReducer;