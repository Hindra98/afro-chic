import { createLogger } from 'browser-bunyan';
// @ts-ignore
import { ServerStream } from '@browser-bunyan/server-stream';
import { onErrorFromLoggerHandler } from './on-error-from-logger';
import { apiBaseUrl } from '../constants/http-constants';

/*
ServerStream options:
---------------------

                    default                                 description
-------------------------------------------------------------------------------------------------
url	                /log	                                Endpoint to send log record batches to (as JSON)
method	            PUT	                                    HTTP method to send record payload with
withCredentials	    false	                                withCredentials property of the underlying XMLHttpRequest object
throttleInterval	3000	                                How often to send log record batches (ms)
writeCondition	    ServerLogStream.defaultWriteCondition	A function which must return a boolean. true if the log record can be written. i.e. included in the next batch to send.
onError	            -	                                    A handler function to invoke if the send request fails
flushOnClose	    false	                                Experimental Send unsent log records if the browser window is closed
 */

/** The core logger (browser-bunyan) */
export const logger = createLogger({
    name: 'OctopusFX.Client.Web',
    streams: [
        { 
            level: 'info', 
            stream: new ServerStream( 
            {  
                url: `${apiBaseUrl}/v1/logging/log`, 
                method: "PUT", 
                withCredentials: false,
                onError: onErrorFromLoggerHandler,
                headers: {
                    "Allow-Anonymous": "1",
                    "Content-Type": "application/json"
                }
            }), 
        }
    ]
});
