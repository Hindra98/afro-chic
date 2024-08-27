import { injectStoreInDialogApi } from "./app/components/dialog/notifications-api";
import { injectStoreInOnUnAuthorizedResponseCallBack } from "./app/http/common/on-unauthorized-callback";
import { injectStoreInOauthFirebase } from "./app/http/firebase/users/oauth/oauth";
import { injectStoreInRequestHeaderInterceptor } from "./app/http/interceptors/request-headers-interceptor";
import { injectStoreInOauthSaga } from "./app/store-management/sagas/oauth-sagas";

export const injectStore = (store) => {

    injectStoreInOnUnAuthorizedResponseCallBack(store);
    injectStoreInDialogApi(store);
    injectStoreInOauthSaga(store);
    injectStoreInRequestHeaderInterceptor(store);
    injectStoreInOauthFirebase(store);

}
