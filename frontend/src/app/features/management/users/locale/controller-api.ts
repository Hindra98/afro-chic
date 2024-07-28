import { useDebounced } from "../../../../core/hooks";
import { HttpClient } from "../../../../http/http-client";


const whoIAm = (http: HttpClient) => async () => {
  const response = await http.get("/v1/users/whoiam");

  const result: WhoIAmResult = response.data;

  return response !== undefined ? (result as WhoIAmResult) : undefined;
};

const updateUser = (http: HttpClient) => async (payload: object) => {
  const response = await http.post("/v1/users/save", payload);
  const result: UpdateUserResult = response.data;
  
  return response !== undefined ? (result as UpdateUserResult) : undefined;
};

const addUser = (http: HttpClient) => async (payload: object) => {
  const response = await http.post("/v1/users/save", payload);
  const result: AddUserResult = response.data;
  
  return response !== undefined ? (result as AddUserResult) : undefined;
};

const deleteUser = (http: HttpClient) => async (payload: object) => {
  const response = await http.delete("/v1/users/delete", payload);
  const result: DeleteUser = response.data;
  
  return response !== undefined ? (result as DeleteUser) : undefined;
};

const getUsers = (http: HttpClient) => async () => {
  const response = await http.get("/v1/users/get-all");
  const result: GetUsers = response.data;

  return response !== undefined ? (result as GetUsers) : undefined;
};

const getUser = (http: HttpClient) => async (payload: object) => {
  const response = await http.get("/v1/users/get", payload);
  const result: GetUser = response.data;

  return response !== undefined ? (result as GetUser) : undefined;
};

const lockUser = (http: HttpClient) => async (payload: object) => {
  const response = await http.put("/v1/users/lock-out", payload);
  const result: LockUserResult = response.data;

  return response !== undefined ? (result as LockUserResult) : undefined;
};

const resetPasswordUser = (http: HttpClient) => async (payload: object) => {
  const response = await http.put("/v1/users/reset-password", payload);
  const result: ResetPasswordUserResult = response.data;

  return response !== undefined ? (result as ResetPasswordUserResult) : undefined;
};


export class ControllerApi {
  private readonly http = new HttpClient();
  public readonly whoIAm = Object.assign(whoIAm(this.http), {
    useResponse: (
      handler: (result: WhoIAmResult) => unknown,
      args: Parameters<ReturnType<typeof whoIAm>>
    ) => useDebounced(() => this.whoIAm().then(handler), Object.values(args), 500),
  });
  
  public readonly getUsers = Object.assign(getUsers(this.http), {
    useResponse: (
      handler: (result: GetUsers) => unknown,
      args: Parameters<ReturnType<typeof getUsers>>
    ) => useDebounced(() => this.getUsers().then(handler), Object.values(args), 500),
  });
  
  public readonly getUser = Object.assign(getUser(this.http), {
    useResponse: (
      handler: (result: GetUser) => unknown,
      args: Parameters<ReturnType<typeof getUser>>[0]
    ) => useDebounced(() => this.getUser(args).then(handler), Object.values(args), 500),
  });
  
  public readonly updateUser = Object.assign(updateUser(this.http), {
    useResponse: (
      handler: (result: UpdateUserResult) => unknown,
      args: Parameters<ReturnType<typeof updateUser>>[0]
    ) => useDebounced(() => this.updateUser(args).then(handler), Object.values(args), 500),
  });
  
  
  public readonly addUser = Object.assign(addUser(this.http), {
    useResponse: (
      handler: (result: AddUserResult) => unknown,
      args: Parameters<ReturnType<typeof addUser>>[0]
    ) => useDebounced(() => this.addUser(args).then(handler), Object.values(args), 500),
  });
  
  public readonly deleteUser = Object.assign(deleteUser(this.http), {
    useResponse: (
      handler: (result: DeleteUser) => unknown,
      args: Parameters<ReturnType<typeof deleteUser>>[0]
    ) => useDebounced(() => this.deleteUser(args).then(handler), Object.values(args), 500),
  });
  
  public readonly lockUser = Object.assign(lockUser(this.http), {
    useResponse: (
      handler: (result: LockUserResult) => unknown,
      args: Parameters<ReturnType<typeof lockUser>>[0]
    ) => useDebounced(() => this.lockUser(args).then(handler), Object.values(args), 500),
  });
  
  public readonly resetPasswordUser = Object.assign(resetPasswordUser(this.http), {
    useResponse: (
      handler: (result: ResetPasswordUserResult) => unknown,
      args: Parameters<ReturnType<typeof resetPasswordUser>>[0]
    ) => useDebounced(() => this.resetPasswordUser(args).then(handler), Object.values(args), 500),
  });

}