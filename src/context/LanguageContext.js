import React, { createContext, useContext, useState, useEffect } from 'react';
import { getTranslation, getAvailableLanguages, getLanguageName } from '../translations/translations';

const LanguageContext = createContext();

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export const LanguageProvider = ({ children }) => {
  // Get the user's preferred language from localStorage or browser
  const getInitialLanguage = () => {
    const savedLanguage = localStorage.getItem('selectedLanguage');
    if (savedLanguage && getAvailableLanguages().includes(savedLanguage)) {
      return savedLanguage;
    }
    
    // Try to detect browser language
    const browserLanguage = navigator.language.split('-')[0];
    if (getAvailableLanguages().includes(browserLanguage)) {
      return browserLanguage;
    }
    
    // Default to English
    return 'en';
  };

  const [currentLanguage, setCurrentLanguage] = useState(getInitialLanguage);

  // Save language preference to localStorage
  useEffect(() => {
    localStorage.setItem('selectedLanguage', currentLanguage);
  }, [currentLanguage]);

  // Function to change language
  const changeLanguage = (languageCode) => {
    if (getAvailableLanguages().includes(languageCode)) {
      setCurrentLanguage(languageCode);
    }
  };

  // Function to get translation for current language
  const t = (key, params = {}) => {
    return getTranslation(currentLanguage, key, params);
  };

  // Function to get all available languages with their names
  const getLanguages = () => {
    return getAvailableLanguages().map(code => ({
      code,
      name: getLanguageName(code),
      label: getLanguageName(code),
      region: getLanguageRegion(code)
    }));
  };

  // Helper function to get language region
  const getLanguageRegion = (code) => {
    const regions = {
      en: "Worldwide",
      es: "Spain, Latin America, USA",
      fr: "France, Canada, Africa",
      de: "Germany, Austria, Switzerland",
      zh: "Mainland China",
      ja: "Japan",
      ko: "South Korea",
      ar: "Middle East, North Africa",
      hi: "India",
      ru: "Russia, Central Asia",
      pt: "Portugal, Brazil",
      it: "Italy, Switzerland",
      nl: "Netherlands, Belgium",
      tr: "Turkey",
      fa: "Iran, Afghanistan (Dari)",
      pl: "Poland",
      th: "Thailand",
      ms: "Malaysia",
      id: "Indonesia",
      vi: "Vietnam",
      sw: "East Africa",
      bn: "Bangladesh, India",
      ur: "Pakistan, India",
      ta: "India, Sri Lanka, Singapore",
      te: "India (Andhra Pradesh, Telangana)"
    };
    return regions[code] || "Worldwide";
  };

  const value = {
    currentLanguage,
    changeLanguage,
    t,
    getLanguages,
    getAvailableLanguages: () => getAvailableLanguages(),
    getLanguageName: (code) => getLanguageName(code)
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}; 