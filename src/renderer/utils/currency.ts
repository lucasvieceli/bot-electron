import { LanguagesType, resources } from '../i18n';

type UnMaskCurrency = (value: any) => string | number;

const unMaskCurrencyBrl: UnMaskCurrency = (value: any) => {
    if (typeof value != 'number' && typeof value != 'string') {
        return 0;
    }
    if (typeof value == 'number') {
        value = value.toString();
    }

    return Number(
        value
            .toString()
            .replace(/[^0-9\,-]+/g, '')
            .replace(/\,/, '.'),
    );
};
const unMaskCurrencyEn: UnMaskCurrency = (value?: any) => {
    return parseFloat(value);
};

export const unMaskCurrency = (language: LanguagesType | string, value: string | number): string | number => {
    const languages: Record<LanguagesType | string, UnMaskCurrency> = {
        'pt-BR': unMaskCurrencyBrl,
        en: unMaskCurrencyEn,
    };

    if (language in languages) {
        return languages[language](value);
    }

    return unMaskCurrencyEn(value);
};
