import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useQuery } from 'react-query';
import { Spinner } from 'reactstrap';
import MapImg from '../../../../../assets/images/bcoin-menu.png';
import { BcoinService } from '../../../services';
import { BCOIN_TOTAL_YESTERDAY } from '../../../utils/react-query';
import DashboardTotals from '../Dashboard-totals';
import { ContainerSpinner, Image } from './styles';

interface DashboardBcoinYesterdayProps {}

const DashboardBcoinYesterday: FC<DashboardBcoinYesterdayProps> = ({}) => {
    const { data, isLoading } = useQuery(BCOIN_TOTAL_YESTERDAY, () => BcoinService.getTotalYesterday());
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
    return <DashboardTotals text={t('Total de bcoin ontem')} total={total} icon={<Image src={MapImg} />} />;
};

export default DashboardBcoinYesterday;
