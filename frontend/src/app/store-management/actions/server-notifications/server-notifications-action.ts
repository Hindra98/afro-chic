import { ModelShape } from ".";
import {ActionTypes} from "../constants/action-types";

export const setServerNotification = (model: ModelShape) => {

    return {
        
        type: ActionTypes.SET_SERVER_NOTIFICATIONS,
        payload: model.command
    } as SetServerNotificationAction;
}

export const removeNotification = (model: ModelShape) => {

    return {
        
        type: ActionTypes.REMOVE_SERVER_NOTIFICATION,
        payload: model.command
    } as SetServerNotificationAction;

}