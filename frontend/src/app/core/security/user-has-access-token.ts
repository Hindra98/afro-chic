import { AuthenticationConstants } from "../constants/authentication-contants";
import { getStorage } from "../storage/storage";
import { isEmpty } from "../text/is-empty";

export const userHasAccessToken = () : boolean => {
    const accessToken: string = getStorage<string>(AuthenticationConstants.ACCESS_TOKEN);
    return !isEmpty(accessToken)
}