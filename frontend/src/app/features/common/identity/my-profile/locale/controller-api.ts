import { useDebounced } from "../../../../../core/hooks";
import { HttpClient } from "../../../../../http/http-client";

const myProfile = (http: HttpClient) => async (payload: object) => {
  const response = await http.put("/v1/myprofile/save", payload);
  const result: UpdateMyProfileResult = response.data;
  
  return response !== undefined ? (result as UpdateMyProfileResult) : undefined;
};

const myProfileGetData = (http: HttpClient) => async (payload: string) => {
  const response = await http.get("/v1/myprofile/get");
  const result: GetMyProfile = response.data;

  return response !== undefined ? (result as GetMyProfile) : undefined;
};

export class ControllerApi {
  private readonly http = new HttpClient();
  public readonly myProfile = Object.assign(myProfile(this.http), {
    useResponse: (
      handler: (result: UpdateMyProfileResult) => unknown,
      args: Parameters<ReturnType<typeof myProfile>>[0]
    ) => useDebounced(() => this.myProfile(args).then(handler), Object.values(args), 500),
  });
  
  public readonly myProfileGetData = Object.assign(myProfileGetData(this.http), {
    useResponse: (
      handler: (result: GetMyProfile) => unknown,
      args: Parameters<ReturnType<typeof myProfileGetData>>[0]
    ) => useDebounced(() => this.myProfileGetData(args).then(handler), Object.values(args), 500),
  });

}