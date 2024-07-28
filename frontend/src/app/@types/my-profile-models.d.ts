
interface UpdateMyProfileResult {
  hasSucceeded: boolean;
  errorMessages: ErrorMessageItem[];
}

interface Country {
  id: string;
  countryEnum: string;
  name: string;
  dialingCode: string;
  flagUrl: string;
}
interface GetMyProfileResultPayload {
  id: string;
  userName: string;
  firstName: string;
  middleName: string;
  lastName: string;
  email: string;
  pictureUrl: string;
  phoneNumber: string;
  branchName: string;
  isUserNameDisplayable: boolean;
  isUserConsentEmailNotification: boolean;
  isUserConsentSmsNotification: boolean;
  canUserSetTwoFactorAuthentication: boolean;
  isWorkingAgencyDisplayable: boolean;
  isTwoFactorAuthenticationEnabled: boolean;
}

interface GetMyProfile {
  payload: GetMyProfileResultPayload;
  country: Country;
}