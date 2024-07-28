interface GetAgencies {
  branches: Branch[];
}

interface GetAgency {
  branch: Branch;
  regionalFormats: RegionalFormats[];
  languages: Languages[];
  timeZones: TimeZones[];
}

interface Branch {
  id: string;
  name: string;
  description: string;
  isHeadQuarter: boolean;
  settings: {
    language: string;
    regionalFormat: string;
    timeZone: string;
    currencyPosition: string;
  };
  latitude: number;
  longitude: number;
  radius: number;
  order: number;
  isDeletable: boolean;
}

interface BranchCommand {
  key: string;
  name: string;
  description: string;
  isHeadQuarter: boolean;
  language: string;
  regionalFormat: string;
  timeZone: string;
  currencyPosition: string;
  latitude: number;
  longitude: number;
  radius: number;
  order: number;
}
interface AgencyCommand {
  SearchCriteria: string;
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



interface AddAgency {
  hasSucceeded: boolean;
  errorMessages: ErrorMessageItem[];
}
interface UpdateAgency {
  hasSucceeded: boolean;
  errorMessages: ErrorMessageItem[];
}
interface DeleteAgencyCommand {
  key: string;
}
interface DeleteAgency {
  hasSucceeded: boolean;
  errorMessages: ErrorMessageItem[];
}

