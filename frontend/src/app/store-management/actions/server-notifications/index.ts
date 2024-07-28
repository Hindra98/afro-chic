export interface StoreShape {
 
    value: ServerNotification[];
}

export const initialState: StoreShape = { value: []}

export interface ModelShape {
    
    command: ServerNotification;
}