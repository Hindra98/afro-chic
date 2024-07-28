
export interface CommandState<TState> {
    current: TState
}

/** Command shape */
export type Command<TState = any> = (state: CommandState<TState>, args?: any) => TState | Promise<TState>;
