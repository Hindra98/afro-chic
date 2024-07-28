import { ActionTypes } from "../actions/constants/action-types";
import { produce } from "immer";
import { MyProfileStoreShape, initialStateMyProfile, UpdateMyProfileAction, GetMyProfileStoreShape, getMyProfileInitialState, GetMyProfileAction } from "../actions/myprofile";


export const myProfileReducer = (state: MyProfileStoreShape = initialStateMyProfile, args: UpdateMyProfileAction): MyProfileStoreShape => {

  switch (args.type) {

    case ActionTypes.UPDATE_MY_PROFILE_REQUEST:
      return produce(state, (draftState) => {
        draftState.value = false;
        draftState.pending = true;
        draftState.Errors = [];
      });

      case ActionTypes.UPDATE_MY_PROFILE_FAILURE:
        return produce(state, (draftState) => {
          draftState.Errors = args.payload?.errors.errors;
          draftState.value = false;
          draftState.pending = false;
        });

        case ActionTypes.UPDATE_MY_PROFILE_SUCCESS:
          return produce(state, (draftState) => {
            draftState.Errors = [];
            draftState.value = true;
            draftState.pending = false;
          });

    default:
      return state;
  }
};

export const myProfileGetDataReducer = (state: GetMyProfileStoreShape = getMyProfileInitialState, args: GetMyProfileAction): GetMyProfileStoreShape => {

    switch (args.type) {

      case ActionTypes.GET_MY_PROFILE_REQUEST:
        return produce(state, (draftState) => {
          draftState.pending = true;
          draftState.Errors = [];
        });
  
        case ActionTypes.GET_MY_PROFILE_FAILURE:
          return produce(state, (draftState) => {
            draftState.Errors = args.payload?.errors?.errors;
            draftState.pending = false;
          });
  
          case ActionTypes.GET_MY_PROFILE_SUCCESS:
            return produce(state, (draftState) => {
              draftState.Errors = [];
              draftState.value.payload.firstName = args.payload?.user?.payload.firstName
              draftState.value.payload.lastName = args.payload?.user?.payload.lastName
              draftState.value.payload.middleName = args.payload?.user?.payload.middleName
              draftState.value.payload.userName = args.payload?.user?.payload.userName
              draftState.value.payload.email = args.payload?.user?.payload.email
              draftState.value.payload.pictureUrl = args.payload?.user?.payload.pictureUrl
              draftState.value.payload.phoneNumber = args.payload?.user?.payload.phoneNumber
              draftState.value.payload.branchName = args.payload?.user?.payload.branchName
              draftState.value.payload.isWorkingAgencyDisplayable = args.payload?.user?.payload.isWorkingAgencyDisplayable
              draftState.value.payload.isUserNameDisplayable = args.payload?.user?.payload.isUserNameDisplayable
              draftState.value.payload.isUserConsentEmailNotification = args.payload?.user?.payload.isUserConsentEmailNotification
              draftState.value.payload.isUserConsentSmsNotification = args.payload?.user?.payload.isUserConsentSmsNotification
              draftState.value.payload.canUserSetTwoFactorAuthentication = args.payload?.user?.payload.canUserSetTwoFactorAuthentication
              draftState.value.payload.isTwoFactorAuthenticationEnabled = args.payload?.user?.payload.isTwoFactorAuthenticationEnabled
              
              draftState.value.country.id = args.payload?.user?.country.id
              draftState.value.country.countryEnum = args.payload?.user?.country.countryEnum
              draftState.value.country.name = args.payload?.user?.country.name
              draftState.value.country.dialingCode = args.payload?.user?.country.dialingCode
              draftState.value.country.flagUrl = args.payload?.user?.country.flagUrl

              draftState.pending = false;
            });
  
      default:
        return state;
    }
  };