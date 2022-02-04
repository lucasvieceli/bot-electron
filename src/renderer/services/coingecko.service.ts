import axios from 'axios';
import { languagesCurrency, LanguagesType } from '../i18n';
import { CoingeckoResponse } from './coingecko.types';

const getValues = async () => {
    const { data } = await axios.get<CoingeckoResponse>('https://api.coingecko.com/api/v3/coins/bomber-coin');
    return data;
};

const getCurrentPrice = (language: LanguagesType, result: CoingeckoResponse) => {
    const type = languagesCurrency[language];
    return result.market_data.current_price[type];
};
const getCurrentPercentage = (language: LanguagesType, result: CoingeckoResponse) => {
    const type = languagesCurrency[language];
    return result.market_data.price_change_percentage_24h_in_currency[type];
};

export default { getValues, getCurrentPercentage, getCurrentPrice };
