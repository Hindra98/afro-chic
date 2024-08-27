

export interface GetUserStoreShape {
    value: GetUser,
    pending: boolean,
    errors: string[],
}
export const initialStateGetUser: GetUserStoreShape = {
    value: {
        connected: false,
        user: {
            uid: "",
            email: "",
            emailVerified: false,
            displayName: "",
            isAnonymous: false,
            photoURL: "",
            providerData: [],
            stsTokenManager: {
                refreshToken: "",
                accessToken: "",
                expirationTime: 0,
            } as StsTokenManager,
            tenantId: "",
            createdAt: "",
            lastLoginAt: "",
            apiKey: "",
            appName: "",
        } as User,
    } as GetUser,
    pending: false,
    errors: []
}
export interface GetUserModelShape {
    command: GetUser,
}
export interface GetUserFailurePayload {
    errors: string[],
}
export interface GetUserFailure {
    type: string,
    payload: GetUserFailurePayload,
}
export interface GetUserSuccess {
    type: string,
    payload: GetUser,
}
export interface GetUserPayload {
    command: string,
    value: GetUser,
    errors: GetUserFailurePayload,
}
export interface GetUserAction {
    type: string,
    payload: GetUserPayload,
}