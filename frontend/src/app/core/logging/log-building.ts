import { AxiosError, AxiosResponse } from 'axios';

/**
 * Creates a log parcel entry from error
 * @param error error data to log
 */
export function createClientErrorLogParcel(error: unknown) {

    /** The client error log entry */
    let clientError = error?.toString();
    if (error instanceof Error) {

        // Error object case
        clientError = JSON.stringify({
            message: error.message,
            stack: error.stack,
            name: error.name
        })
    } else if(typeof error !== 'string') try {

        // unknown object case
        clientError = JSON.stringify(error);
    } catch {
        // Nothing to do if json serialization didn't work
    }

    // Creating the log parcel
    return {clientError};
}

/**
 * Creates a log parcel entry for http error
 * @param error error data to log
 */
// export function createClientHttpErrorLogParcel(config: AxiosResponse<unknown>) {
//     let clientHttpError = config.data?.toString();
//     if(typeof config.data !== 'string') try {
//         clientHttpError = JSON.stringify(config.data);
//     } catch { }

//     // Creating the log parcel
//     return {clientHttpError, clientHttpStatus: config.status};
// }


export function createClientHttpErrorLogParcel(error: AxiosError) {

    let clientHttpError = error.message?.toString();
    if(typeof error.message !== 'string') try {
        clientHttpError = JSON.stringify(error.message);
    } catch { }

    // Creating the log parcel
    return {clientHttpError, clientHttpStatus: error.status};
}