/* eslint-disable */
import { AxiosRequestConfig, AxiosResponse } from "axios";
import axiosInstance from "./config";

/**
 * Http client
 */
export class HttpClient {

    /**
     * The constructor.
     * @param config Defines the configuration related to a controller
     */
    constructor(config?: { apiBaseUrl?: string }) {
    }

    /**
     * Performs an http GET request.
     * @param action The name of the action of the controller.
     * @param params The action parameters.
     */
    public get<TResult = unknown>(action: string, params?: object) {
        return axiosInstance.get(action, {params});
    }

    /**
     * Performs an http DELETE request.
     * @param action The name of the action of the controller.
     * @param params The action parameters.
     */
    public delete<TResult = unknown>(action: string, params: object) {

        return axiosInstance.delete(action, {params});
    }

    /**
     * Performs a POST request
     * @param action The name of the action of the controller.
     * @param payload The payload of the action.
     */
    public post<TResult = unknown>(action: string, payload?: object|string, axiosRequestConfig?: AxiosRequestConfig) {

        let response: Promise<AxiosResponse<any,any>>;

        if(typeof payload == undefined && typeof axiosRequestConfig == undefined) {
            response = axiosInstance.post(action);
        } else {
            if(typeof payload == undefined) {
                response = axiosInstance.post(action ,{config: axiosRequestConfig});
            } else {
                if(typeof axiosRequestConfig == undefined) {
                    response = axiosInstance.post(action, {payload: payload});
                } else {
                    response = axiosInstance.post(action, payload, axiosRequestConfig);
                }
            }
        }
        return response;
    }

    /**
     * Performs a PUT request
     * @param action The name of the action of the controller.
     * @param payload The payload of the action.
     */
    public put<TResult = unknown>(action: string, payload: object) {

        return axiosInstance.put(action, payload);
    }
}
