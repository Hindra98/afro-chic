import React from 'react';
import { useTranslation } from 'react-i18next';

const LanguageSel: React.FC = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (language: string) => {
    i18n.changeLanguage(language);
  };

  return (
    <div className="language-selector">
      <button onClick={() => changeLanguage('en')} className="px-2 py-1 m-1 bg-primary-blue text-white rounded">EN</button>
      <button onClick={() => changeLanguage('fr')} className="px-2 py-1 m-1 bg-primary-red text-white rounded">FR</button>
    </div>
  );
};

export default LanguageSel;
