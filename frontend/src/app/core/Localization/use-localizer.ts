import { Localizers } from "./localizers";
import { useMemo } from "react";
import { LocalizationProvider } from './localization-provider';

export const useLocalizer = (localizer: Localizers) => useMemo(() => {

    const resourceName = getResourceToLoad(localizer);
    const localizationProvider = new LocalizationProvider(resourceName);

  // Returns a localization resolver function
  return (key: string) => localizationProvider.get(key);
}, [localizer]);


function getResourceToLoad(localizer: Localizers): string {

    switch (localizer) {

        case 'Shared-ResShared':
            return "resshared";

        case 'Common-ResCommon':
            return "rescommon";

        case 'Domain-ResDomain':
            return "resdomain";

        default:
            return "resdomain";
    }
}