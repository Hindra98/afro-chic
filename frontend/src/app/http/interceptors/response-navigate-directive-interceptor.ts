import { AxiosResponse } from 'axios';

/** The header key of the custom navigation directive sent by the server. */
export const navigateHeaderKey = 'x-navigate';

/**
 * Intercepts http responses to handle server navigation directive.
 * @param response The axios current configuration.
 */
export const responseNavigateDirectiveInterceptor = (response: AxiosResponse<unknown>) => {

    if(response === undefined)
    return response;

    // Recovering the navigate header value
    const url = response.headers[navigateHeaderKey];

    //if asked to go to the exact same destination, then reload
    if (url === window.location.href) {
        window.location.reload();
    }

    // Executing the navigation directive
    else if (url) window.location.href = url;

    // Returning the unchanged config.
    return response;
};