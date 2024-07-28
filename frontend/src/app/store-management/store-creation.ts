import { configureStore } from "@reduxjs/toolkit";
import { getStorage } from "../core/storage/storage";
import rootReducer from "./reducers/index";
import createSagaMiddleware from "redux-saga";
import rootSaga from "./sagas";
import { Jwt } from "../core/security/jwt";
import { AuthenticationConstants } from "../core/constants/authentication-contants";

const loadAuthenticatedUser = (): AuthenticateUserSuccessPayload => {
  const tenantId = getStorage<string>(AuthenticationConstants.TENANT_ID);
  const token = getStorage<string>(AuthenticationConstants.ACCESS_TOKEN);
  
  const name = token ? Jwt.getClaim(token, "name") : "";
  const authenticateUser: AuthenticateUserSuccessPayload = {
    tenantId: tenantId,
    token: token,
    message: "",
    userMustChangePassword: false,
    userCanChangePassword: false,
    isTwoFactorAuthenticationEnabled: false,
    userName: name,
    tExpires: 0,
    rExpires: 0,
    pinLength: 0,
    unReadNotificationsCount: 0,
  };
  return authenticateUser;
};
      
    const partialState: Partial<any> = {
        authenticatedUser: {
          value: loadAuthenticatedUser(),
        }
    };

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: rootReducer,
  preloadedState: partialState,

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
