import { jsonReviver } from '../json-conversion';

/**
 * Ensures http response json data conversion.
 * @param data The raw http response.
 */
export const responseJsonConversionTransformer = (data: unknown) => {

    // Transformation only if the data is of type string
    if (typeof data === 'string') {
        try {
            return JSON.parse(data, jsonReviver);
        } catch (e) { /* Ignore */ }
    }

    // No change, forwarding to next transformation
    return data
}
