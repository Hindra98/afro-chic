
interface GetTenants {
  tenants: Tenant[]
  isSuperAdministrator: boolean
}

interface GetTenant {
  vendor: Tenant
  regionalFormats: RegionalFormats[];
  languages: Languages[]
  timeZones: TimeZones[]
  idDocumentTypes: IdDocumentTypes[]
}

interface Tenant {
  key: string;
  name: string;
  subscriptionID: string;
  language: string;
  regionalFormatId: string;
  timeZoneId: string;
  databaseName: string;
  description: string;
  isEnable: boolean;
  isDeletable: boolean;
  statusWording: string;
  logoUrl: string;
  detail: string;
  status: string;
  defaultAdministrator: DefaultAdministrator
}
interface TenantCommand {
  SearchCriteria: string;
}

interface DefaultAdministrator {
  id: string;
  userName: string;
  password: string;
  firstName: string;
  lastName: string;
  middleName: string;
  emailAddress: string;
  phoneNumber: string;
  idCardNumber: string;
  isUserConsentEmailNotification: boolean;
  isUserConsentSmsNotification: boolean;
  preferedCommunicationChannel: number;
  identityDocumentType: number;
}

interface RegionalFormats {
  id: string;
  displayName: string;
}

interface Languages {
  id: string;
  displayName: string;
  threeLetterISOLanguageName: string;
  twoLetterISOLanguageName: string;
}

interface TimeZones {
  id: string;
  displayName: string;
  daylightName: string;
}

interface IdDocumentTypes {
  id: number;
  displayName: string;
  nativeName: string;
}

interface Branches {
  key: string;
  name: string;
  description: string;
  isHeadQuarter: true
}

interface AddTenant {
  hasSucceeded: boolean;
  errorMessages: ErrorMessageItem[];
}
interface UpdateTenant {
  hasSucceeded: boolean;
  errorMessages: ErrorMessageItem[];
}
interface DeleteTenantCommand {
  key: string;
}

interface DeleteTenant {
  hasSucceeded: boolean;
  errorMessages: ErrorMessageItem[];
}
