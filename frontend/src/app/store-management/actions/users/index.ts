
export interface WhoIAmStoreShape {

    value: WhoIAmResult,
}

export const initialStateWhoIAm: WhoIAmStoreShape = {
    value: {

        userId: "",
        fullName: "",
        userName: "",
        contactMedia: ""
    } as WhoIAmResult
}

export interface WhoIAmAction {
    type: any,
    payload: WhoIAmResult,
}



export interface AddUserStoreShape {
    value: AddUserSuccessPayload,
    pending: boolean,
    errors: string[],
}
export const initialStateAddUser: AddUserStoreShape = {
    value: {
        message: "",
    } as AddUserSuccessPayload,
    pending: false,
    errors: []
}
export interface AddUserModelShape {
    command: AddUserCommand,
}
export interface AddUserFailurePayload {
    errors: string[],
}
export interface AddUserFailure {
    type: string,
    payload: AddUserFailurePayload,
}
export interface AddUserSuccess {
    type: string,
    payload: AddUserSuccessPayload,
}
export interface AddUserPayload {
    command: AddUserCommand,
    value: AddUserSuccessPayload,
    errors: AddUserFailurePayload,
}
export interface AddUserAction {
    type: string,
    payload: AddUserPayload,
}








export interface UpdateUserStoreShape {
    value: UpdateUserSuccessPayload,
    pending: boolean,
    errors: string[],
}
export const initialStateUpdateUser: UpdateUserStoreShape = {
    value: {
        message: "",
    } as UpdateUserSuccessPayload,
    pending: false,
    errors: []
}
export interface UpdateUserModelShape {
    command: UpdateUserCommand,
}
export interface UpdateUserFailurePayload {
    errors: string[],
}
export interface UpdateUserFailure {
    type: string,
    payload: UpdateUserFailurePayload,
}
export interface UpdateUserSuccess {
    type: string,
    payload: UpdateUserSuccessPayload,
}
export interface UpdateUserPayload {
    command: UpdateUserCommand,
    value: UpdateUserSuccessPayload,
    errors: UpdateUserFailurePayload,
}
export interface UpdateUserAction {
    type: string,
    payload: UpdateUserPayload,
}


export interface DeleteUserStoreShape {
    value: boolean,
    pending: boolean,
    errors: string[],
}
export const initialStateDeleteUser: DeleteUserStoreShape = {
    value: false,
    pending: false,
    errors: []
}
export interface DeleteUserModelShape {
    command: DeleteUserCommand,
}
export interface DeleteUserFailurePayload {
    errors: string[],
}
export interface DeleteUserSuccessPayload {
    value: boolean,
}
export interface DeleteUserFailure {
    type: string,
    payload: DeleteUserFailurePayload,
}
export interface DeleteUserSuccess {
    type: string,
    payload: DeleteUserSuccessPayload,
}
export interface DeleteUserPayload {
    command: DeleteUserCommand,
    value: DeleteUserSuccessPayload,
    errors: DeleteUserFailurePayload,
}
export interface DeleteUserAction {
    type: string,
    payload: DeleteUserPayload,
}


export interface GetUsersStoreShape {
    value: GetUsers,
    pending: boolean,
    errors: string[],
}
export const initialStateGetUsers: GetUsersStoreShape = {
    value: {
        isAdministrator: false,
        users: [],
        branches: [],
        roles: [],
    } as GetUsers,
    pending: false,
    errors: []
}
export interface GetUsersModelShape {
    command: GetUsers,
}
export interface GetUsersFailurePayload {
    errors: string[],
}
export interface GetUsersFailure {
    type: string,
    payload: GetUsersFailurePayload,
}
export interface GetUsersSuccess {
    type: string,
    payload: GetUsers,
}
export interface GetUsersPayload {
    command: string,
    value: GetUsers,
    errors: GetUsersFailurePayload,
}
export interface GetUsersAction {
    type: string,
    payload: GetUsersPayload,
}


export interface GetUserStoreShape {
    value: GetUser,
    pending: boolean,
    errors: string[],
}
export const initialStateGetUser: GetUserStoreShape = {
    value: {
        isAdministrator: false,
        user: {
            key: "",
            userName: "",
            email: "",
            firstName: "",
            middleName: "",
            lastName: "",
            verified: "",
            isVerified: false,
            isUserConsentEmailNotification: true,
            isUserConsentSmsNotification: false,
            tenantId: "",
            verificationPIN: "",
            verificationPINExpires: "",
            acceptTerms: false,
            passwordReset: "",
            resetTokenExpires: "",
            created: "",
            updated: "",
            isDefaultUser: false,
            status: false,
            identityDocumentType: 0,
            idCardNumber: "",
            phoneNumber: "",
            preferedCommunicationChannel: "SMS",
            roles: [],
        } as User,
        idDocumentTypes: [],
        branches: [],
        roles: [],
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
    command: UserCommand,
    value: GetUser,
    errors: GetUserFailurePayload,
}
export interface GetUserAction {
    type: string,
    payload: GetUserPayload,
}


export interface LockUserStoreShape {
    value: boolean,
    pending: boolean,
    errors: string[],
}
export const initialStateLockUser: LockUserStoreShape = {
    value: false,
    pending: false,
    errors: []
}
export interface LockUserModelShape {
    command: LockUserCommand,
}
export interface LockUserFailurePayload {
    errors: string[],
}
export interface LockUserSuccessPayload {
    value: boolean,
}
export interface LockUserFailure {
    type: string,
    payload: LockUserFailurePayload,
}
export interface LockUserSuccess {
    type: string,
    payload: LockUserSuccessPayload,
}
export interface LockUserPayload {
    command: LockUserCommand,
    value: LockUserSuccessPayload,
    errors: LockUserFailurePayload,
}
export interface LockUserAction {
    type: string,
    payload: LockUserPayload,
}


export interface ResetPasswordUserStoreShape {
    value: ResetPasswordUserSuccessPayload,
    pending: boolean,
    errors: string[],
}
export const initialStateResetPasswordUser: ResetPasswordUserStoreShape = {
    value: {message: ""},
    pending: false,
    errors: []
}
export interface ResetPasswordUserModelShape {
    command: ResetPasswordUserCommand,
}
export interface ResetPasswordUserFailurePayload {
    errors: string[],
}
export interface ResetPasswordUserFailure {
    type: string,
    payload: ResetPasswordUserFailurePayload,
}
export interface ResetPasswordUserSuccess {
    type: string,
    payload: ResetPasswordUserSuccessPayload,
}
export interface ResetPasswordUserPayload {
    command: ResetPasswordUserCommand,
    value: ResetPasswordUserSuccessPayload,
    errors: ResetPasswordUserFailurePayload,
}
export interface ResetPasswordUserAction {
    type: string,
    payload: ResetPasswordUserPayload,
}
