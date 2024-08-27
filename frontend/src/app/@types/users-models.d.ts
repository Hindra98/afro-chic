
// interface GetUser {
//   connected: boolean;
//   user:      User;
// }

// interface User {
//   uid:             string;
//   email:           string;
//   emailVerified:   boolean;
//   displayName:     string;
//   isAnonymous:     boolean;
//   photoURL:        string;
//   providerData:    ProviderDatum[];
//   stsTokenManager: StsTokenManager;
//   createdAt:       string;
//   lastLoginAt:     string;
//   apiKey:          string;
//   appName:         string;
// }

interface ProviderDatum {
  providerId:  string;
  uid:         string;
  displayName: string;
  email:       string;
  phoneNumber: number;
  photoURL:    string;
}

interface StsTokenManager {
  refreshToken:   string;
  accessToken:    string;
  expirationTime: number;
}




interface SetUserAction {
  type: string;
  payload: User;
}

interface LogoutUserAction {
  type: string;
  payload: null;
}

type UserActionTypes = SetUserAction | LogoutUserAction;