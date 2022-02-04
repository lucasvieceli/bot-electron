import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useQuery } from 'react-query';
import { languagesCurrency } from '../../../i18n';
import { TextRegular12 } from '../../../layout/Fonts/regular';
import { CoingeckoService } from '../../../services';
import { BCOIN_PRICE } from '../../../utils/react-query';
interface BcoinPriceProps {}

const BcoinPrice: FC<BcoinPriceProps> = ({}) => {
    const {
        i18n: { language },
        t,
    } = useTranslation();

    const { data } = useQuery(BCOIN_PRICE, () => CoingeckoService.getValues());

    if (!data) return null;

    const getValueFromLanguage = () => {
        if (language == 'en') return null;

        const price = data.market_data.current_price[languagesCurrency[language]].toLocaleString(language, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
            style: 'currency',
            currency: languagesCurrency[language],
        });
        const percentage = data.market_data.price_change_percentage_24h_in_currency[
            languagesCurrency[language]
        ].toLocaleString(language, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        });

        return (
            <TextRegular12
                title={t('Porcentagem de alteração nas últimas 24 horas: {{valor}}%', { valor: percentage })}
            >
                {price}
            </TextRegular12>
        );
    };

    const price = data.market_data.current_price[languagesCurrency.en].toLocaleString(language, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
        style: 'currency',
        currency: languagesCurrency.en,
    });
    const percentage = data.market_data.price_change_percentage_24h_in_currency[languagesCurrency.en].toLocaleString(
        language,
        {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        },
    );
    return (
        <>
            {getValueFromLanguage()}
            <TextRegular12
                title={t('Porcentagem de alteração nas últimas 24 horas: {{valor}}%', { valor: percentage })}
            >
                {price}
            </TextRegular12>
        </>
    );
};

export default BcoinPrice;
