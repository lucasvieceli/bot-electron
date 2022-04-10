import { LanguagesCurrency } from '../i18n';

export interface CoingeckoResponse {
    market_data: {
        current_price: Record<LanguagesCurrency, number>;
        price_change_percentage_24h_in_currency: Record<LanguagesCurrency, number>;
    };
}
