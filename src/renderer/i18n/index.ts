import i18n from 'i18next';
import ptbr from './languages/pt-br';
import { initReactI18next } from 'react-i18next';

export type LanguagesType = 'pt-BR' | 'en';

export const resources: Record<LanguagesType, any> = {
    'pt-BR': ptbr,
    en: ptbr,
} as const;

i18n.use(initReactI18next).init({
    lng: 'pt-BR',
    interpolation: {
        escapeValue: false, // not needed for react as it escapes by default
    },
    resources,
});
