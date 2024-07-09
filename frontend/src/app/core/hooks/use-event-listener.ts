import { MutableRefObject, useEffect, useRef } from 'react';

/**
 * Hooks the event listening process for a specified HTML element
 * @param eventName The name of the event
 * @param handler Then handler of the event
 * @param sourceElementRef The element (or array of elements) from which the event is listened
 * @param options The event listener options
 */
export const useEventListener = <TEvent extends Event = Event>(
    eventName: keyof HTMLElementEventMap,
    handler: (e: TEvent) => void,
    sourceElementRef: Node
        | Node[]
        | MutableRefObject<Node>
        | MutableRefObject<Node>[] = document,
    options?: AddEventListenerOptions) => {

    // The event handler (different each iteration) is stored in a stateful instance
    const handlerRef = useRef<typeof handler>();

    // Ensuring having an array of ref elements
    const sourceRefs = Array.isArray(sourceElementRef) ? sourceElementRef : [sourceElementRef];

    // Handler storage
    useEffect(() => { handlerRef.current = handler; }, [handler]);

    // Event listener management
    useEffect(() => {

        // Creates the event handler
        const eventListener = (event: TEvent) => handlerRef.current(event);
        const elements = sourceRefs.map((ref: any) => ref['current'] ? ref.current : ref as Node);

        // Add event listener
        elements.forEach(element => element.addEventListener(eventName, eventListener, options));

        // Removes the event registration
        return () => elements.forEach(element => element.removeEventListener(eventName, eventListener));

        /*
        * In this case, we cannot know how much elements there are + we are sure the order will be the same each time
        * => no risk in this specific case!  */
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [eventName, handlerRef, ...sourceRefs]);
};
