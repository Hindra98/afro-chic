import { logger } from './logger';

type Level = 'fatal' | 'error' | 'warn' | 'info' | 'debug' | 'trace';

interface LogFn {
    /**
     * Creates a log entry.
     * @param message The message of the log
     * @param args
     */
    (message: string, ...args: any[]): void;

    /**
     * Creates a log entry.
     * @param payload The payload of the log
     * @param message The message of the log
     * @param args
     */
    (payload: object, message?: string, ...args: any[]): void;
}

/**
 * Curried logger abstraction
 * @param level The level of the log to be pushed
 */
const logAs = (level: Level) =>
    (payload: object, message?: string, ...args: any[]) =>
        (logger[level] as any)(payload, message, ...args)

export const log = {
    trace: logAs('trace') as LogFn,
    debug: logAs('debug') as LogFn,
    info: logAs('info') as LogFn,
    warn: logAs('warn') as LogFn,
    error: logAs('error') as LogFn,
    fatal: logAs('fatal') as LogFn
}
