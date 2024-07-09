import { getBrowserLanguage } from './browser-language';
import { IsLanguageTranslationAvailable, getAppLanguage } from './base';
import getResourceFile from './Translations';
import { UILocalizerFactory } from './ui-localizer';

export class LocalizationProvider {

  public static readonly culture = getAppLanguage();
  public static readonly parentCulture = document.documentElement.lang.substring(0,2);
  private static loadedResources = new Map<string, { [name: string]: string } | Promise<any>>()
  
  constructor(private readonly name: string) {
  }

  public load(culture: string = undefined): Promise<void> {

    if(LocalizationProvider.parentCulture === culture && 
       !IsLanguageTranslationAvailable(culture))
      return Promise.resolve();

    let fileName: string = this.name;
    let fileKey: string;

    if(culture!==undefined){
      fileKey = `${fileName}.${culture}`;
    }
    else{
      fileKey = `${fileName}.${getBrowserLanguage()}`;
    }

    if (LocalizationProvider.loadedResources.has(fileKey)) {
      if (LocalizationProvider.loadedResources.get(fileKey) instanceof Promise) {
        return LocalizationProvider.loadedResources.get(fileKey) as Promise<void>;
      }

      return Promise.resolve();
    }

    const loadPromise = new Promise<void>(async (resolve) => {

      const resouceFile = getResourceFile(this.name, LocalizationProvider.culture)
      LocalizationProvider.loadedResources.set(fileKey, resouceFile);

      resolve();
    });

    const resouceFile = getResourceFile(this.name, LocalizationProvider.culture)
    LocalizationProvider.loadedResources.set(fileKey, resouceFile);

    return loadPromise;
  }

  
  public get loaded() {

    return LocalizationProvider.loadedResources.has(`${this.name}.${LocalizationProvider.culture}`)
      && !(LocalizationProvider.loadedResources.get(`${this.name}.${LocalizationProvider.culture}`) instanceof Promise);
  }

  /**
   * Gets the localized value.
   * @param key The key of the value.
   */
  public get(key: string) {
    if (!this.loaded) {
      throw new Error(`The resources "${this.name}" are not loaded yet`);
    }

    let foundValue = (LocalizationProvider.loadedResources.get(`${this.name}.${LocalizationProvider.culture}`) as { [key: string]: string })[key];

    if (foundValue === undefined && IsLanguageTranslationAvailable(LocalizationProvider.parentCulture)) {
      foundValue = (LocalizationProvider.loadedResources.get(`${this.name}.${LocalizationProvider.culture}`) as { [key: string]: string })[key];
    }

    if (foundValue === undefined) {
      foundValue = (LocalizationProvider.loadedResources.get(`${this.name}.${LocalizationProvider.culture}`) as { [key: string]: string })[key];
    }

    return foundValue;
  }

  /** UI component for localization */
  public readonly UI = UILocalizerFactory(this);
}
