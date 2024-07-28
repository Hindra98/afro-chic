import { ActionTypes } from "../actions/constants/action-types";
import { produce } from "immer";
import { StoreShape, initialState } from "../actions/server-notifications";

export const setServerNotificationsReducer = (
  state: StoreShape = initialState,
  args: SetServerNotificationAction
): StoreShape => {
  switch (args.type) {
    case ActionTypes.SET_SERVER_NOTIFICATIONS:
      return produce(state, (draftState) => {
        draftState.value.push(args.payload);
      });


    case ActionTypes.REMOVE_SERVER_NOTIFICATION:
      if (!state.value.find((notification) => notification.time === args.payload.time)) return state;

      return produce(state, (draftState) => {
        draftState.value = draftState.value.filter(
          (notification) => notification.time !== (draftState.value.find((notification) => notification.time === args.payload.time) as ServerNotification ).time
        );
      });

    default:
      return state;
  }
};
