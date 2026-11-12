
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  translations,
  Language,
  TranslationKey,
} from './translations';

interface LanguageContextType {
  language: Language;
  changeLanguage: (lang: Language) => Promise<void>;
  t: (key: TranslationKey) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

export const LanguageProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [language, setLanguage] = useState<Language>('ru');

  useEffect(() => {
    const loadLanguage = async () => {
      try {
        const savedLanguage = await AsyncStorage.getItem('appLanguage');

        if (
          savedLanguage === 'ru' ||
          savedLanguage === 'kk' ||
          savedLanguage === 'en'
        ) {
          setLanguage(savedLanguage);
        }
      } catch (error) {
        console.log('Language loading error:', error);
      }
    };

    loadLanguage();
  }, []);

  const changeLanguage = async (lang: Language) => {
    setLanguage(lang);

    try {
      await AsyncStorage.setItem('appLanguage', lang);
    } catch (error) {
      console.log('Language saving error:', error);
    }
  };

  const t = (key: TranslationKey) => translations[language][key];

  return (
    <LanguageContext.Provider value={{ language, changeLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);

  if (!context) {
    throw new Error('useLanguage must be used inside LanguageProvider');
  }

  return context;
};
