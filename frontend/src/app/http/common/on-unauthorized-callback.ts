import { AxiosError, AxiosRequestConfig } from 'axios';


let store;
export const injectStoreInOnUnAuthorizedResponseCallBack = _store => {
    store = _store;
}

export const onUnAuthorizedResponseCallBack = async (retryCount: number, error: AxiosError, requestConfig: AxiosRequestConfig) => {
/*
    const controllerApi = new ControllerApi();
    const status = error.response ? error.response.status : null;
    const originalRequest: AxiosRequestConfig = requestConfig;

    if (status === 401) {
    console.log("Erreur 401")
    }
    else {
            const code = error.code ? error.code : null;

            if (code.includes("ERR_NETWORK")) { // Erreur de connexion au reseau
                const msg = "Avertissement: Erreur de connexion au serveur - Reconnexion. Nombre de tentatives: " + retryCount;
                console.log(msg); // Mettre a la place un systeme de gestion d'erreur
            }
    }
    */
 }

