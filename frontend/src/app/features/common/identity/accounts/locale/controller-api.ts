import { useDebounced } from "../../../../../core/hooks";
import { HttpClient } from "../../../../../http/http-client";

const sendPinCode = (http: HttpClient) => async (payload: object) => {
  const response = await http.post("/v1/accounts/send-pin-code", payload);

  const result: SendPinCodeResult = response.data;

  return response !== undefined ? (result as SendPinCodeResult) : undefined;
};

const forgotPassword = (http: HttpClient) => async (payload: object) => {
  const response = await http.post("/v1/accounts/forgot-password", payload);

  const result: SendPinCodeResult = response.data;

  return response !== undefined ? (result as SendPinCodeResult) : undefined;
};

const resetPassword = (http: HttpClient) => async (payload: object) => {
  const response = await http.post("/v1/accounts/reset-password", payload);

  const result: SendPinCodeResult = response.data;

  return response !== undefined ? (result as SendPinCodeResult) : undefined;
};

const changePassword = (http: HttpClient) => async (payload: object) => {
  const response = await http.put("/v1/accounts/change-password", payload);

  const result: ChangePasswordResult = response.data;

  return response !== undefined ? (result as ChangePasswordResult) : undefined;
};

const verifyNewContactMedia = (http: HttpClient) => async (payload: object) => {
  const response = await http.post("/v1/oauth/verify-identity", payload);

  const result: VerifyNewContactMediaResult = response.data;

  return response !== undefined ? (result as VerifyNewContactMediaResult) : undefined;
};

const changeEmail = (http: HttpClient) => async (payload: object) => {
  const response = await http.post("/v1/accounts/change-email", payload);
  const result: ChangeEmailResult = response.data;
  return response !== undefined ? (result as ChangeEmailResult) : undefined;
};

const changePhoneNumber = (http: HttpClient) => async (payload: object) => {
  const response = await http.post("/v1/accounts/change-phone-number", payload);
  const result: ChangePhoneNumberResult = response.data;
  return response !== undefined ? (result as ChangePhoneNumberResult) : undefined;
};

export class ControllerApi {
  private readonly http = new HttpClient();
  public readonly sendPinCode = Object.assign(sendPinCode(this.http), {
    useResponse: (
      handler: (result: SendPinCodeResult) => unknown,
      args: Parameters<ReturnType<typeof sendPinCode>>[0]
    ) => useDebounced(() => this.sendPinCode(args).then(handler), Object.values(args), 500),
  });

  public readonly forgotPassword = Object.assign(forgotPassword(this.http), {
    useResponse: (
      handler: (result: SendPinCodeResult) => unknown,
      args: Parameters<ReturnType<typeof forgotPassword>>[0]
    ) => useDebounced(() => this.forgotPassword(args).then(handler), Object.values(args), 500),
  });

  public readonly resetPassword = Object.assign(resetPassword(this.http), {
    useResponse: (
      handler: (result: SendPinCodeResult) => unknown,
      args: Parameters<ReturnType<typeof resetPassword>>[0]
    ) => useDebounced(() => this.resetPassword(args).then(handler), Object.values(args), 500),
  });
  
  public readonly changePassword = Object.assign(changePassword(this.http), {
    useResponse: (
      handler: (result: ChangePasswordResult) => unknown,
      args: Parameters<ReturnType<typeof changePassword>>[0]
    ) => useDebounced(() => this.changePassword(args).then(handler), Object.values(args), 500),
  });
  
  public readonly verifyNewContactMedia = Object.assign(verifyNewContactMedia(this.http), {
    useResponse: (
      handler: (result: VerifyNewContactMediaResult) => unknown,
      args: Parameters<ReturnType<typeof verifyNewContactMedia>>[0]
    ) => useDebounced(() => this.verifyNewContactMedia(args).then(handler), Object.values(args), 500),
  });
  
  public readonly changeEmail = Object.assign(changeEmail(this.http), {
    useResponse: (
      handler: (result: ChangeEmailResult) => unknown,
      args: Parameters<ReturnType<typeof changeEmail>>[0]
    ) => useDebounced(() => this.changeEmail(args).then(handler), Object.values(args), 500),
  });
  
  public readonly changePhoneNumber = Object.assign(changePhoneNumber(this.http), {
    useResponse: (
      handler: (result: ChangePhoneNumberResult) => unknown,
      args: Parameters<ReturnType<typeof changePhoneNumber>>[0]
    ) => useDebounced(() => this.changePhoneNumber(args).then(handler), Object.values(args), 500),
  });
  
}
