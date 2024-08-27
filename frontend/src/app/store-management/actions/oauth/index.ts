import { User } from "firebase/auth";
import { AuthenticationConstants } from "../../../core/constants/authentication-contants";
import { Jwt } from "../../../core/security/jwt";
import { getStorage } from "../../../core/storage/storage";

export interface StoreShape {

    pending: boolean;
    value: AuthenticateUserSuccessPayload;
    Errors: string[];
    subscriptionKey: string;
}

export const initialState: StoreShape = { value: {

    token: "",
    message: "",
    userMustChangePassword: true,
    userCanChangePassword: true,
    isTwoFactorAuthenticationEnabled: false,
    tenantId: "",
    userName: ""
} as AuthenticateUserSuccessPayload, pending: false, Errors: [], subscriptionKey: ""}

export const initializeState = () : StoreShape => {
    
    initialState.value.tenantId = getStorage<string>("tenantId");
    initialState.value.token = getStorage<string>(AuthenticationConstants.ACCESS_TOKEN);
    
  const name = Jwt.getClaim(initialState.value.token, "name");

  initialState.value.userName = name;

    return initialState;
}

export interface ModelShape {

    command: AuthenticateUserCommand;
}

export interface AuthenticateUserFailurePayload {
    errors: string[];
}

export interface AuthenticateUserRequest {
    type: string;
    payload: AuthenticateUserCommand;
}

export interface AuthenticateUserSuccess {

    type: string;
    payload: AuthenticateUserSuccessPayload;
}

export interface AuthenticateUserFailure {
    type: string;
    payload: AuthenticateUserFailurePayload;
}

export interface AuthenticateUserPayload {
    command: AuthenticateUserCommand;
    user: AuthenticateUserSuccessPayload;
    errors: AuthenticateUserFailurePayload;
}

export interface AuthenticateUserAction {
    type: string;
    payload: AuthenticateUserPayload;
}

export interface VerifyPinCodeStoreShape {

    pending: boolean;
    value: VerifyIdentitySuccessPayload;
    Errors: string[];
}

export const initialStatePinCode: VerifyPinCodeStoreShape = { value: {

    isVerified: false,
    message: ""
} as VerifyIdentitySuccessPayload, pending: false, Errors: []}

export interface VerifyPinCodeModelShape {
    command: VerifyIdentityCommand;
}

export interface VerifyPinCodeFailurePayload {
    errors: string[];
}

export interface VerifyPinCodeRequest {
    type: string;
    payload: VerifyIdentityCommand;
}

export interface VerifyPinCodeSuccess {

    type: string;
    payload: VerifyIdentitySuccessPayload;
}

export interface VerifyPinCodeFailure {
    type: string;
    payload: VerifyPinCodeFailurePayload;
}

export interface VerifyPinCodePayload {
    command: VerifyIdentityCommand;
    user: VerifyIdentitySuccessPayload;
    errors: VerifyPinCodeFailurePayload;
}

export interface VerifyPinCodeAction {
    type: string;
    payload: VerifyPinCodePayload;
}

export interface SignOutStoreShape {

    pending: boolean;
    value: SignOutSuccessPayload;
    Errors: string[];
}

export const initialStateSignOut: SignOutStoreShape = { value: {

    isUserLoggedOut: false,
    refreshToken: ""
} as SignOutSuccessPayload, pending: false, Errors: []}

export interface SignOutModelShape {
}

export interface SignOutFailurePayload {
    errors: string[];
}

export interface SignOutRequest {
    type: string;
}

export interface SignOutSuccess {

    type: string;
    payload: SignOutSuccessPayload;
}

export interface SignOutFailure {
    type: string;
    payload: SignOutFailurePayload;
}

export interface SignOutPayload {
    user: SignOutSuccessPayload;
    errors: SignOutFailurePayload;
}

export interface SignOutAction {
    type: string;
    payload: SignOutPayload;
}








export interface RegisterStoreShape {

  pending: boolean;
  value: User;
  Errors: string[];
}

export const initialStateRegister: RegisterStoreShape = { value: {

  emailVerified: false,
  metadata: {},
  providerData: {}
} as User, pending: false, Errors: []}

export interface RegisterModelShape {
}

export interface RegisterFailurePayload {
  errors: string[];
}

export interface RegisterRequest {
  type: string;
}

export interface RegisterSuccess {

  type: string;
  payload: User;
}

export interface RegisterFailure {
  type: string;
  payload: RegisterFailurePayload;
}

export interface RegisterPayload {
  command: RegisterCommand;
  user: User;
  errors: RegisterFailurePayload;
}

export interface RegisterAction {
  type: string;
  payload: RegisterPayload;
}

