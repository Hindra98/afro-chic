import { jwtDecode } from "jwt-decode";
import { getStorage } from "../storage/storage";
import { AuthenticationConstants } from "../constants/authentication-contants";

export const isAccessTokenExpired = (): boolean => {

    let result: boolean = false;
    try{
        const accessToken: string = getStorage<string>(AuthenticationConstants.ACCESS_TOKEN);
        const decodedAccesstoken = jwtDecode(accessToken);
            if(decodedAccesstoken.exp * 1000 < Date.now()){
                result = true;
                console.log("Token expired.");
            }
            else{
            console.log("Token is valid");
            }
    }
    catch(e){
        // getStorage<string>(AuthenticationConstants.ACCESS_TOKEN, true);
        // getStorage<string>("tenant_id", true);
        // getStorage<string>("subscription_key", true);
        // window.location.href = "/";
        console.log("Error while decoding token.");
    }
    return result;
}
