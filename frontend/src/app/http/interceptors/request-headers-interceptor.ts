import { InternalAxiosRequestConfig } from "axios";
import { v4 as uuidv4 } from "uuid";
import { getStorage } from "../../core/storage/storage";
import { AuthenticationConstants } from "../../core/constants/authentication-contants";

let store;
export const injectStoreInRequestHeaderInterceptor = (_store) => {
  store = _store;
};

/**
 * Intercepts http requests to aad headers.
 * @param config The axios current configuration.
 */
export const requestHeadersInterceptor = (
  config: InternalAxiosRequestConfig
): InternalAxiosRequestConfig => {
  if (
    (config.url as string).includes("/test") ||
    (config.url as string).includes("/authenticate") ||
    (config.url as string).includes("/get-languages") ||
    (config.url as string).includes("/forgot-password") ||
    (config.url as string).includes("/accounts/reset-password") ||
    (config.url as string).includes("/refresh-token") ||
    (config.url as string).includes("/send-pin-code") ||
    (config.url as string).includes("/verify-identity")
  ) {
    config.headers["Allow-Anonymous"] = "1";

    if ((config.url as string).includes("/authenticate") || (config.url as string).includes("/forgot-password")) {
      const authViewModel = config.data;
      config.headers["Subscription-Key"] = authViewModel.subscriptionKey;
    }

    if ((config.url as string).includes("/accounts/reset-password")) {
      const authViewModel = config.data;
      config.headers["Tenant-Id"] = authViewModel.tenantId;
    }

    if ((config.url as string).includes("/send-pin-code") || (config.url as string).includes("/verify-identity")) {
      if (getStorage<string>(AuthenticationConstants.TENANT_ID) && getStorage<string>(AuthenticationConstants.ACCESS_TOKEN)) {
        config.headers["Tenant-Id"] = getStorage<string>(AuthenticationConstants.TENANT_ID);
        config.headers["Authorization"] = `Bearer ${getStorage<string>(AuthenticationConstants.ACCESS_TOKEN)}`;
      } else {
        const stateAuth = store?.getState((state) => state.authenticatedUserResult);
        const subscriptionKey = stateAuth.authenticatedUser.subscriptionKey;
        config.headers["Subscription-Key"] = getStorage<string>("subscription_key") || subscriptionKey;
      }
    }

    if ((config.url as string).includes("/refresh-token")) {
      config.headers["Tenant-Id"] = getStorage<string>(AuthenticationConstants.TENANT_ID);
    }
  } else {
    config.headers["Tenant-Id"] = getStorage<string>(AuthenticationConstants.TENANT_ID);
    config.headers["Authorization"] = `Bearer ${getStorage<string>(AuthenticationConstants.ACCESS_TOKEN)}`;
  }

  config.headers["X-Correlation-Id"] = uuidv4();
  config.headers["X-Api-Key"] = "68357cfc-5eaa-43ec-b7de-ca3e87588271.b881daf6-e22a-4d2f-abbe-5e18ddf32e2c";
  config.headers["Accept-Language"] = getStorage<string>(AuthenticationConstants.USER_LANGUAGE);

  if (
    (config.url as string).includes("/authenticate") ||
    (config.url as string).includes("/refresh-token") ||
    (config.url as string).includes("/change-password") ||
    (config.url as string).includes("/log-out")
  ) {
    config.withCredentials = true;
  }


  return config;
};
