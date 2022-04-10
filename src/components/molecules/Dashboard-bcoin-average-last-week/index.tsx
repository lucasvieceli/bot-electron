import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useQuery } from 'react-query';
import { Spinner } from 'reactstrap';
import MapImg from '../../../../assets/images/bcoin-menu.png';
import { BcoinService } from '../../../services';
import { BCOIN_AVERAGE_LAST_WEEK } from '../../../utils/react-query';
import DashboardTotals from '../Dashboard-totals';
import { ContainerSpinner, Image } from './styles';

interface DashboardBcoinAverageLastWeekProps {}

const DashboardBcoinAverageLastWeek: FC<DashboardBcoinAverageLastWeekProps> = ({}) => {
    const { data, isLoading } = useQuery(BCOIN_AVERAGE_LAST_WEEK, () => BcoinService.getAverageBcoinLastWeek());
    const {
        i18n: { language },
        t,
    } = useTranslation();
    const total = data
        ? data.toLocaleString(language, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
          })
        : '0';

    if (isLoading) {
        return (
            <ContainerSpinner>
                <Spinner />
            </ContainerSpinner>
        );
    }
    return (
        <DashboardTotals
            text={t('Média de bcoin por dia na última semana')}
            total={total}
            icon={<Image src={MapImg} />}
        />
    );
};

export default DashboardBcoinAverageLastWeek;
