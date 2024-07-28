import { AxiosResponse  } from 'axios';
import { navigateHeaderKey } from './response-navigate-directive-interceptor';

/**
 * Intercepts http responses to handle loading state.
 * @param response The axios current configuration.
 */
export const responseInterceptor = (response: AxiosResponse<unknown>) => {

    if (response.headers[navigateHeaderKey]) return response;

    

    // Returning the unchanged config
    return response;
};