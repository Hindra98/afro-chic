interface AuthenticateUserCommand {
    
    subscriptionKey: string;
    userName: string;
    password: string;
}

interface AuthenticateUserResult {

    payload: AuthenticateUserSuccessPayload;
    hasSucceeded: boolean;
    errorMessages: ErrorMessageItem[];
}

interface AuthenticateUserSuccessPayload {

    token: string;
    message: string;
    userMustChangePassword: boolean;
    userCanChangePassword: boolean;
    isTwoFactorAuthenticationEnabled: boolean;
    tenantId: string;
    userName: string;
    tExpires: number;
    rExpires: number;
    pinLength: number;
    unReadNotificationsCount: number;
}

interface DecodedToken {

    sub: string;
    iat: string;
    jti: string;
    nameidentifier: string;
    name: string;
    emailAddresse: string;
    tenantId: string;
    userLanguage: string;
    role: string;
    exp: string;
    iss: string;
    aud: string;
}

interface refreshTokenCommand {

    refreshToken: string;
}

interface refreshTokenResult {
    
    firstName: string;
    lastName: string;
    username: string;
    token: string;
    refreshToken: string;
}

interface registerCommand {

    key: string;
    userName: string;
    password: passwordItem;
    email: emailItem;
    isTwoFactorAuthenticationEnabled: boolean;
    phoneNumber: string;
    isUserConsentEmailNotification: boolean;
    isUserConsentSmsNotification: boolean;
    choosenNotificationChannel: 2|4|6;
    agency: string;
    roles: roleEnumItem[];
}

interface passwordItem {

    password: string;
    passwordConfirmation: string;
}

interface emailItem {
    
    email: string;
    emailConfirmation: string;
}

interface roleEnumItem {
    id: string;
    name: string;
}

interface registerResult {

}

interface revokeTokenCommand {

}

interface revokeTokenResult {

}

interface setAuthenticatedUserAction {
    type: any
}

interface VerifyIdentityCommand {
    
    pin: string;
    auth: AuthenticateUserSuccessPayload;
    verificationType: number;
}

interface VerifyIdentityResult {
    
    payload: VerifyIdentitySuccessPayload;
    hasSucceeded: boolean;
    errorMessages: ErrorMessageItem[];
}

interface VerifyIdentitySuccessPayload {
    
    isVerified: boolean;
    message: string;
}

interface SetVerifyIdentityAction {
    type: any
}

interface SignOutResult {
    
    payload: SignOutSuccessPayload;
    hasSucceeded: boolean;
    errorMessages: ErrorMessageItem[];
}

interface SignOutSuccessPayload {
    
    isUserLoggedOut: boolean;
    refreshToken: string;
}

interface SetSignOutAction {
    type: any
}
