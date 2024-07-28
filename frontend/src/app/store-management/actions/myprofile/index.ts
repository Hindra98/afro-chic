export interface MyProfileStoreShape {
  pending: boolean;
  Errors: string[];
  value: boolean;
}
export const initialStateMyProfile: MyProfileStoreShape = {
  value: false,
  pending: false,
  Errors: [],
};

export interface MyProfileModelShape {
  command: FormData;
}
export interface UpdateMyProfileFailurePayload {
  errors: string[];
}
export interface UpdateMyProfileSuccessPayload {
  value: boolean;
}
export interface UpdateMyProfileRequest {
  type: string;
  payload: FormData;
}
export interface UpdateMyProfileFailure {
  type: string;
  payload: UpdateMyProfileFailurePayload;
}
export interface UpdateMyProfileSuccess {
  type: string;
  payload: UpdateMyProfileSuccessPayload;
}
export interface UpdateMyProfilePayload {
  command: FormData;
  value: UpdateMyProfileSuccessPayload;
  errors: UpdateMyProfileFailurePayload;
}
export interface UpdateMyProfileAction {
  type: string;
  payload: UpdateMyProfilePayload;
}

export interface GetMyProfileStoreShape {
  pending: boolean;
  Errors: string[];
  value: GetMyProfile;
}
export const getMyProfileInitialState: GetMyProfileStoreShape = {
  value: {
    payload: {
      id: "",
      userName: "",
      firstName: "",
      middleName: "",
      lastName: "",
      email: "",
      pictureUrl: "",
      phoneNumber: "",
      branchName: "",
      isUserNameDisplayable: false,
      isUserConsentEmailNotification: false,
      isUserConsentSmsNotification: false,
      canUserSetTwoFactorAuthentication: false,
      isWorkingAgencyDisplayable: false,
      isTwoFactorAuthenticationEnabled: true,
    } as GetMyProfileResultPayload,
    country: {
      id: "",
      countryEnum: "",
      name: "",
      dialingCode: "",
      flagUrl: "",
    } as Country,
  } as GetMyProfile,
  pending: false,
  Errors: [],
};

export interface GetMyProfileModelShape {
  command: string;
}
export interface GetMyProfileFailurePayload {
  errors: string[];
}
export interface GetMyProfileRequest {
  type: string;
  payload: string;
}
export interface GetMyProfileSuccess {
  type: string;
  payload: GetMyProfile;
}
export interface GetMyProfileFailure {
  type: string;
  payload: GetMyProfileFailurePayload;
}
export interface GetMyProfilePayload {
  command: string;
  user: GetMyProfile;
  errors: GetMyProfileFailurePayload;
}
export interface GetMyProfileAction {
  type: string;
  payload: GetMyProfilePayload;
}
