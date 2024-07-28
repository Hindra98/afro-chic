export interface StoreShape {
 
    pending: boolean;
    value: Language[];
    errors: string[];
}

export const initialState: StoreShape = { 
    value: [],
    errors:[],
    pending: true
}


export interface CurrentLanguageState {

    language: string;
}

export const currentLanguageStateInitialState: CurrentLanguageState = {
    language: '',
}
