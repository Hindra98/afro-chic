import { useDebounced } from "../../../../core/hooks";
import { HttpClient } from "../../../../http/http-client";


const getLanguages = (http: HttpClient) => async () => {

    const response = await http.get("/v1/timesandlocales/get-languages", {});

    const result: GetLanguagesResult = response.data;

    return response !== undefined ? result as GetLanguagesResult : undefined;
}


export class ControllerApi {

     private readonly http = new HttpClient();

     public readonly getLanguages = Object.assign(getLanguages(this.http), {
         useResponse: (
             handler: (result: GetLanguagesResult) => unknown,
             args: Parameters<ReturnType<typeof getLanguages>>[]) => useDebounced(() => this.getLanguages().then(handler), Object.values(args), 500)});

}