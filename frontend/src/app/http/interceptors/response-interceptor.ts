import { AxiosResponse } from 'axios';
import { navigateHeaderKey } from './response-navigate-directive-interceptor';


/**
 * Intercepts http responses to handle loading state.
 * @param response The axios current configuration.
 */
export const responseInterceptor = (response: AxiosResponse<unknown>) => {

    if(response === undefined)
      return response;
      
    if (response.headers[navigateHeaderKey]) return response;

    if(response.statusText === "OK")
    {
      console.log("OK")
    }
    else{
        if(response.statusText === "Unauthorized"){
            console.log("Unauthorized - responseInterceptor");
        }
    }

    return response;
};
