import i18n from 'i18next';
import ptbr from './languages/pt-br';
import en from './languages/en';
import { initReactI18next } from 'react-i18next';

export type LanguagesType = 'pt-BR' | 'en' | string;
export type LanguagesCurrency = 'brl' | 'usd' | string;

export const resources: Record<LanguagesType, any> = {
    'pt-BR': ptbr,
    en: en,
} as const;

export const languagesCurrency: Record<LanguagesType, LanguagesCurrency> = {
    'pt-BR': 'brl',
    en: 'usd',
};
i18n.use(initReactI18next).init({
    lng: 'pt-BR',
    interpolation: {
        escapeValue: false, // not needed for react as it escapes by default
    },
    resources,
});
