import { ControllerApi } from "src/app/features/common/identity/oauth/locale/controller-api";
import { setStorage } from "../storage/storage";
import { AuthenticationConstants } from "../constants/authentication-contants";

export const refreshAccessToken = async () => {
    
    const controllerApi = new ControllerApi();
    const refreshTokenResponse = await controllerApi.refreshToken();

    if(refreshTokenResponse !== undefined && refreshTokenResponse)
    {
        setStorage(AuthenticationConstants.ACCESS_TOKEN, refreshTokenResponse.token);
    }
}