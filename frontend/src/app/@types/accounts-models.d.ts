interface SendPinCodeCommand {
  userName: string;
  verificationType: number;
  contactMedia: string;
  dialingCode?: string;
}

interface SendPinCodeResult {
  payload: SendPinCodeSuccessPayload;
  hasSucceeded: boolean;
  errorMessages: ErrorMessageItem[];
}

interface SendPinCodeSuccessPayload {
  message: string;
  contactMedia: string;
  dialingCode?: string;
}

interface SetSendPinCodeAction {
  type: any;
}

interface ForgotPasswordCommand {
  email: string;
  origin: string;
}

interface ForgotPasswordResult {
  payload: ForgotPasswordSuccessPayload;
  hasSucceeded: boolean;
  errorMessages: ErrorMessageItem[];
}

interface ForgotPasswordSuccessPayload {
  message: string;
}

interface SetForgotPasswordAction {
  type: any;
}

interface ResetPasswordCommand {
  token: string;
  tenantId: string;
  password: string;
  passwordConfirmation: string;
}
interface ResetPasswordResult {
  payload: ResetPasswordSuccessPayload;
  hasSucceeded: boolean;
  errorMessages: ErrorMessageItem[];
}
interface ResetPasswordSuccessPayload {
  message: string;
}
interface SetResetPasswordAction {
  type: any;
}

interface ChangePasswordCommand {
  key: string;
  currentPassword: string;
  newPassword: string;
  newPasswordConfirmation: string;
}
interface ChangePasswordResult {
  payload: ChangePasswordSuccessPayload;
  hasSucceeded: boolean;
  errorMessages: ErrorMessageItem[];
}
interface ChangePasswordSuccessPayload {
  message: string;
  token: string;
  refreshToken: string;
  expiration: string;
}
interface SetChangePasswordAction {
  type: any;
}



interface VerifyNewContactMediaCommand {
  NewContactMedia: string;
  contactMediaKey: string;
  pin: string;
  verificationType: number;
}
interface VerifyNewContactMediaResult {
  payload: VerifyIdentitySuccessPayload;
  hasSucceeded: boolean;
  errorMessages: ErrorMessageItem[];
}
interface SetVerifyNewContactMediaAction {
  type: any;
}

interface ChangePhoneNumberCommand {
  userName: string;
  newPhoneNumber: string;
  sourceIpAddress: string;
}
interface ChangePhoneNumberResult {
  payload: ChangePhoneNumberSuccessPayload;
  hasSucceeded: boolean;
  errorMessages: ErrorMessageItem[];
}
interface ChangePhoneNumberSuccessPayload {
  message: string;
}
interface SetChangePhoneNumberAction {
  type: any;
}

interface ChangeEmailCommand {
  userName: string;
  newEmail: string;
  sourceIpAddress: string;
}
interface ChangeEmailResult {
  payload: ChangeEmailSuccessPayload;
  hasSucceeded: boolean;
  errorMessages: ErrorMessageItem[];
}
interface ChangeEmailSuccessPayload {
  message: string;
}
interface SetChangeEmailAction {
  type: any;
}