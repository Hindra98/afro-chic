import React from 'react';
import { Command } from './command';

/** The startup component context. */
export const ComponentContext = React.createContext<{
    /** The model provided by razor page. */
    model: unknown,
    /** The command mapping by command handlers (optimized for command dispatcher) */
    commandHandlersMapping: Map<Command, string>,
    /** The runtime name of the component */
    name: string,
    /** Determines whether the component has been mounted from a custom element (alias Web component). */
    customElement?: HTMLElement
}>(undefined);
