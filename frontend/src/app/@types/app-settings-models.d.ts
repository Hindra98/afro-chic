interface JwtSettings {
  secret: string;
  issuer: string;
  audience: string;
  subject: string;
  expiration: number;
  refreshTokenTTL: number;
  validateIssuer: boolean;
  validateAudience: boolean;
  validateLifetime: boolean;
  validateIssuerSigningKey: boolean;
  resetTokenTTL: number;
  cookiesTTL: number;
}
interface KeyVaultSettings {
  isEnable: boolean;
  url: string;
  tenantId: string;
  clientId: string;
  clientSecret: string;
}
interface CookiesSettings {
  cookieConsentTimeFrame: number;
  domain: string;
  httpOnly: boolean;
}
interface PasswordPolicySettings {
  isEnable: boolean;
  duration: number;
  minimumLength: number;
  alertUserToChangeFrom: number;
  enforcePasswordHistory: boolean;
  passwordComplexityIsEnable: boolean;
  mustContainsAtLeastOneUppercase: boolean;
  mustContainsAtLeastOneLowercase: boolean;
  mustContainsAtLeastOneSpecialChar: boolean;
  mustContainsAtLeastOneDigit: boolean;
}
interface MultiFactorAuthenticationSettings {
  isEnable: boolean;
  pinLength: number;
  pinTTL: number;
}
interface TimeAndLocaleSettings {
  language: string;
  timeZoneId: string;
  datePattern: string;
  timePattern: string;
}
interface UserSettings {
  preferedNotificationChannel: string;
  preferedLanguage: string;
  twoFactorAuthentication: boolean;
  acceptSMSNotifications: boolean;
  acceptEmailNotifications: boolean;
  vibrateMode: boolean;
}

interface UpdateAppSettingsCommand {
  isAdministrator: boolean;

  userSettings: UserSettings;

  timeAndLocaleSettings: TimeAndLocaleSettings;
  multiFactorAuthenticationSettings: MultiFactorAuthenticationSettings;
  passwordPolicySettings: PasswordPolicySettings;

  cookiesSettings: CookiesSettings;
  keyVaultSettings: KeyVaultSettings;
  jwtSettings: JwtSettings;
}

interface UpdateAppSettingsResult {
  hasSucceeded: boolean;
  errorMessages: ErrorMessageItem[];
}

interface GetAppSettings {
  key: string;
  isAdministrator: boolean;
  isSuperAdmin: boolean;

  userSettings: GetAppSettingsUserSettings;

  timeAndLocaleSettings: TimeAndLocaleSettings;
  multiFactorAuthenticationSettings: MultiFactorAuthenticationSettings;
  passwordPolicySettings: PasswordPolicySettings;

  cookiesSettings: CookiesSettings;
  keyVaultSettings: KeyVaultSettings;
  jwtSettings: JwtSettings;

  timeZones: GetAppSettingsResultTimezone[];
  languages: GetAppSettingsResultLanguages[];
  datePatterns: GetAppSettingsResultDatePatterns[];
}
interface GetAppSettingsUserSettings {
  preferedNotificationChannel: string;
  preferedLanguage: string;
  canUserSetTwoFactorAuthentication: boolean;
  canSetAcceptSMSNotifications: boolean;
  canSetAcceptEMAILNotifications: boolean;
  twoFactorAuthentication: boolean;
  acceptSMSNotifications: boolean;
  acceptEmailNotifications: boolean;
  vibrateMode: boolean;
}

interface GetAppSettingsResultTimezone {
  id: string;
  displayName: string;
  daylightName: string;
}
interface GetAppSettingsResultLanguages {
  id: string;
  displayName: string;
  threeLetterISOLanguageName: string;
  twoLetterISOLanguageName: string;
}

interface GetAppSettingsResultDatePatterns {
  id: string;
  displayName: string;
  description: string;
  template: string;
}
