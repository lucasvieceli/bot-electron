import i18next from 'i18next';
import { useEffect, useState } from 'react';
import { ConfigService } from '../services';

export default function useCachedResources() {
    const [isLoadingComplete, setLoadingComplete] = useState(false);


    const init = async () => {
        const configLanguage = await ConfigService.getByName('language');
        i18next.changeLanguage(configLanguage.value || 'pt-BR')
      
    };

    useEffect(() => {
        (async () => {
            try {
                await init();

                setLoadingComplete(true);
            } catch (e) {
                setLoadingComplete(true);
                console.log('erro no inicio', JSON.stringify(e), e);
            }
        })();
    }, []);


    return { isLoadingComplete };
}
