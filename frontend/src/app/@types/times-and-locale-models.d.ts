
interface GetLanguesResult {

    LanguageUIs: LanguageUI[];
}

interface LanguageUI
{
	id: string;
	displayName: string;
	threeLetterISOLanguageName: string;
	twoLetterISOLanguageName: string;
}

type LanguageList = LanguageUI[];
