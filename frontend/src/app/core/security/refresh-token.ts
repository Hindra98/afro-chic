
import { setStorage } from "../storage/storage";
import { AuthenticationConstants } from "../constants/authentication-contants";
import { ControllerApi } from "../../features/common/identity/oauth/locale/controller-api";

export const refreshAccessToken = async () => {
    
    const controllerApi = new ControllerApi();
    const refreshTokenResponse = await controllerApi.refreshToken();

    if(refreshTokenResponse !== undefined && refreshTokenResponse)
    {
        setStorage(AuthenticationConstants.ACCESS_TOKEN, refreshTokenResponse.token);
    }
}