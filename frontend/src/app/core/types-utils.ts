import { Context } from 'react';

/**
 * Extracts the type of the value from the specified React Context type
 *
 * @example
 * const context = createContext<TValue>(undefined);
 *
 * type TValueBis = ContextValueTypeExtractor<typeof context>;
 */
export type ContextValueTypeExtractor<TContext> = TContext extends Context<infer T> ? T : undefined;

/**
 * Extracts the result type from any awaitable element (such as promise).
 *
 * @example
 *
 * type TValue = Await<TPromise>
 */
export type Await<T> = T extends {
    then(onfulfilled?: (value: infer U) => unknown): unknown;
} ? U : T;
