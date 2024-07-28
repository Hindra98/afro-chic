import { DependencyList, useEffect } from 'react';

/**
 * Hook for debouncing a handler (same behavior as useEffect with a debounced handler invocation).
 * > Warning: dependencies are not verified by eslint. Deps rules should be same as useEffect
 *
 * @param handler Imperative function that can return a cleanup function
 * @param deps If present, effect will only activate if the values in the list change.
 * @param ms The debounce time in milliseconds
 */
export const useDebounced = (handler: () => unknown, deps: DependencyList, ms: number) => {

    // Checking changes with useEffect hook
    useEffect(() => {
        // Defers the handler invocation
        const token = setTimeout(() => handler(), ms);

        // If the timeout has not completed before the next one, the session is reset
        return () => clearTimeout(token);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [...deps, ms]);
};
