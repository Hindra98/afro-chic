import { serializeDate } from '../core/text/date-format';

const isoDateTimeExtractionRegex = /(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z?))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z?))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z?))/;

/**
 * Parse a json fragment.
 * @param key The property key
 * @param value The value to parse
 */
export function jsonReviver(key: unknown, value: unknown): Date | unknown {

    // String type case
    if (typeof value === 'string') {

        // Date case handling (serialized within a string)
        const regexExtraction: string[] = value.match(isoDateTimeExtractionRegex) as string[];
        if (regexExtraction) {
            const dateContent = regexExtraction[0] || regexExtraction[1];
            if (dateContent) {
                return new Date(dateContent);
            }
        }
    }

    // The value doesn't need any transformation
    return value;
}


/**
 * Handles object serialization
 * @param key The property key
 * @param value The value
 */
export function jsonSerializer(key: unknown, value: unknown): unknown {

    // Date type serialization
    if(value instanceof Date) {
        return serializeDate(value)
    }

    // serialized date re-serialization without time offset
    if(typeof value === 'string' && value.match(isoDateTimeExtractionRegex)) {
        return serializeDate(new Date(value))
    }

    // No transformation here
    return value;
}
