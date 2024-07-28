
interface UpdateUserPreferencesCommand {
  notificationChannel: string;
  language: string;
  timeZone: string;
  datePattern: string;
  timePattern: string;
}

interface UpdateUserPreferencesResult {
  hasSucceeded: boolean;
  errorMessages: ErrorMessageItem[];
}

interface GetUserPreferences {
  payload: GetUserPreferencesResultPayload;
  timeZones: GetUserPreferencesResultTimezone[];
  languages: GetUserPreferencesResultLanguages[];
  datePatterns: GetUserPreferencesResultDatePatterns[];
}

interface GetUserPreferencesResultPayload {
  notificationChannel: string;
  notificationChannelLabel: string;
  language: string;
  timeZone: string;
  datePattern: string;
  timePattern: string;
  userId: string;
  IsPhoneNumberSet: boolean;
  IsEmailAddressSet: boolean;
}
interface GetUserPreferencesResultTimezone {
  id: string;
  displayName: string;
  daylightName: string;
}
interface GetUserPreferencesResultLanguages {
  id: string;
  displayName: string;
  threeLetterISOLanguageName: string;
  twoLetterISOLanguageName: string;
}

interface GetUserPreferencesResultDatePatterns {
  id: string;
  displayName: string;
  description: string;
  template: string;
}
