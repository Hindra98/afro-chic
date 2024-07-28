import { AxiosError } from 'axios';

/**
 * 
 * @param error 
 * @returns 
 */
export const onRequestError = (error: AxiosError): Promise<AxiosError> => {

    
    
    return Promise.reject(error);
}


/**
 * 
 * @param error 
 * @returns 
 */
export const onResponseError = async (error: AxiosError): Promise<any> => {

    if(error.code === "ERR_NETWORK"){
      return Promise.resolve();
    }

    return Promise.reject(error);
}

