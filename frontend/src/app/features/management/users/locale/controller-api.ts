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

  public readonly getUser = Object.assign(getUser(this.http), {
    useResponse: (
      handler: (result: GetUser) => unknown,
      args: Parameters<ReturnType<typeof getUser>>[0]
    ) => useDebounced(() => this.getUser(args).then(handler), Object.values(args), 500),
  });
}