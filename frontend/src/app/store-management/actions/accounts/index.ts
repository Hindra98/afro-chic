
export interface SendPinCodeStoreShape {

    pending: boolean;
    value: SendPinCodeSuccessPayload;
    Errors: string[];
}

export const initialStateSendPinCode: SendPinCodeStoreShape = { value: {

    message: "",
    contactMedia: "",
    dialingCode: ""
} as SendPinCodeSuccessPayload, pending: false, Errors: []}

export interface ResendAction {

    command: SetSendPinCodeAction;
}

export interface SendPinCodeModelShape {
    command: SendPinCodeCommand;
}

export interface SendPinCodeFailurePayload {
    errors: string[];
}

export interface SendPinCodeRequest {
    type: string;
    payload: SendPinCodeCommand;
}

export interface SendPinCodeSuccess {

    type: string;
    payload: SendPinCodeSuccessPayload;
}

export interface SendPinCodeFailure {
    type: string;
    payload: SendPinCodeFailurePayload;
}

export interface SendPinCodePayload {
    command: SendPinCodeCommand;
    user: SendPinCodeSuccessPayload;
    errors: SendPinCodeFailurePayload;
}

export interface SendPinCodeAction {
    type: string;
    payload: SendPinCodePayload;
}


export interface ForgotPasswordStoreShape {

    pending: boolean;
    value: ForgotPasswordSuccessPayload;
    Errors: string[];
}

export const initialStateForgotPassword: ForgotPasswordStoreShape = { value: {

    message: ""
} as ForgotPasswordSuccessPayload, pending: false, Errors: []}

export interface ForgotAction {

    command: SetForgotPasswordAction;
}

export interface ForgotPasswordModelShape {
    command: ForgotPasswordCommand;
}

export interface ForgotPasswordFailurePayload {
    errors: string[];
}

export interface ForgotPasswordRequest {
    type: string;
    payload: ForgotPasswordCommand;
}

export interface ForgotPasswordSuccess {

    type: string;
    payload: ForgotPasswordSuccessPayload;
}

export interface ForgotPasswordFailure {
    type: string;
    payload: ForgotPasswordFailurePayload;
}

export interface ForgotPasswordPayload {
    command: ForgotPasswordCommand;
    user: ForgotPasswordSuccessPayload;
    errors: ForgotPasswordFailurePayload;
}

export interface ForgotPasswordAction {
    type: string;
    payload: ForgotPasswordPayload;
}

export interface ResetPasswordStoreShape {
    pending: boolean;
    value: ResetPasswordSuccessPayload;
    Errors: string[];
}
export const initialStateResetPassword: ResetPasswordStoreShape = { value: {
    message: ""
} as ResetPasswordSuccessPayload, pending: false, Errors: []}
export interface ResetAction {
    command: SetResetPasswordAction;
}
export interface ResetPasswordModelShape {
    command: ResetPasswordCommand;
}
export interface ResetPasswordFailurePayload {
    errors: string[];
}
export interface ResetPasswordRequest {
    type: string;
    payload: ResetPasswordCommand;
}
export interface ResetPasswordSuccess {
    type: string;
    payload: ResetPasswordSuccessPayload;
}
export interface ResetPasswordFailure {
    type: string;
    payload: ResetPasswordFailurePayload;
}
export interface ResetPasswordPayload {
    command: ResetPasswordCommand;
    user: ResetPasswordSuccessPayload;
    errors: ResetPasswordFailurePayload;
}
export interface ResetPasswordAction {
    type: string;
    payload: ResetPasswordPayload;
}

export interface ChangePasswordStoreShape {
    pending: boolean;
    value: ChangePasswordSuccessPayload;
    Errors: string[];
}
export const initialStateChangePassword: ChangePasswordStoreShape = { value: {
    message: "",
    token: "",
    refreshToken: "",
    expiration: "",
} as ChangePasswordSuccessPayload, pending: false, Errors: []}

export interface ChangePasswordModelShape {
    command: ChangePasswordCommand;
}
export interface ChangePasswordFailurePayload {
    errors: string[];
}
export interface ChangePasswordRequest {
    type: string;
    payload: ChangePasswordCommand;
}
export interface ChangePasswordSuccess {
    type: string;
    payload: ChangePasswordSuccessPayload;
}
export interface ChangePasswordFailure {
    type: string;
    payload: ChangePasswordFailurePayload;
}
export interface ChangePasswordPayload {
    command: ChangePasswordCommand;
    user: ChangePasswordSuccessPayload;
    errors: ChangePasswordFailurePayload;
}
export interface ChangePasswordAction {
    type: string;
    payload: ChangePasswordPayload;
}

export interface VerifyNewContactMediaStoreShape {
    pending: boolean;
    value: VerifyIdentitySuccessPayload;
    Errors: string[];
}
export const initialStateVerifyNewContactMedia: VerifyNewContactMediaStoreShape = { value: {
    message: "",
    isVerified: false,
} as VerifyIdentitySuccessPayload, pending: false, Errors: []}

export interface VerifyNewContactMediaFailurePayload {
    errors: string[];
}
export interface VerifyNewContactMediaRequest {
    type: string;
    payload: VerifyNewContactMediaCommand;
}
export interface VerifyNewContactMediaSuccess {
    type: string;
    payload: VerifyIdentitySuccessPayload;
}
export interface VerifyNewContactMediaFailure {
    type: string;
    payload: VerifyNewContactMediaFailurePayload;
}
export interface VerifyNewContactMediaPayload {
    command: VerifyNewContactMediaCommand;
    user: VerifyIdentitySuccessPayload;
    errors: VerifyNewContactMediaFailurePayload;
}
export interface VerifyNewContactMediaAction {
    type: string;
    payload: VerifyNewContactMediaPayload;
}

export interface ChangeEmailStoreShape {
    pending: boolean;
    value: ChangeEmailSuccessPayload;
    Errors: string[];
}
export const initialStateChangeEmail: ChangeEmailStoreShape = { value: {
    message: "",
} as ChangeEmailSuccessPayload, pending: false, Errors: []}

export interface ChangeEmailFailurePayload {
    errors: string[];
}
export interface ChangeEmailRequest {
    type: string;
    payload: ChangeEmailCommand;
}
export interface ChangeEmailSuccess {
    type: string;
    payload: ChangeEmailSuccessPayload;
}
export interface ChangeEmailFailure {
    type: string;
    payload: ChangeEmailFailurePayload;
}
export interface ChangeEmailPayload {
    command: ChangeEmailCommand;
    user: ChangeEmailSuccessPayload;
    errors: ChangeEmailFailurePayload;
}
export interface ChangeEmailAction {
    type: string;
    payload: ChangeEmailPayload;
}


export interface ChangePhoneNumberStoreShape {
    pending: boolean;
    value: ChangePhoneNumberSuccessPayload;
    Errors: string[];
}
export const initialStateChangePhoneNumber: ChangePhoneNumberStoreShape = { value: {
    message: "",
} as ChangePhoneNumberSuccessPayload, pending: false, Errors: []}

export interface ChangePhoneNumberModelShape {
    command: ChangePhoneNumberCommand;
}
export interface ChangePhoneNumberFailurePayload {
    errors: string[];
}
export interface ChangePhoneNumberRequest {
    type: string;
    payload: ChangePhoneNumberCommand;
}
export interface ChangePhoneNumberSuccess {
    type: string;
    payload: ChangePhoneNumberSuccessPayload;
}
export interface ChangePhoneNumberFailure {
    type: string;
    payload: ChangePhoneNumberFailurePayload;
}
export interface ChangePhoneNumberPayload {
    command: ChangePhoneNumberCommand;
    user: ChangePhoneNumberSuccessPayload;
    errors: ChangePhoneNumberFailurePayload;
}
export interface ChangePhoneNumberAction {
    type: string;
    payload: ChangePhoneNumberPayload;
}