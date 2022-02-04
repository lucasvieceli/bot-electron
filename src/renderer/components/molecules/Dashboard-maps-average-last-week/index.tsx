import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useQuery } from 'react-query';
import { MapService } from '../../../services';
import { MAP_AVERAGE_LAST_WEEK } from '../../../utils/react-query';
import { IconRobot } from '../../atoms';
import DashboardTotals from '../Dashboard-totals';
import MapImg from '../../../../../assets/images/new-map.png';
import { ContainerSpinner, Image } from './styles';
import { Spinner } from 'reactstrap';

interface DashboardMapsAverageLastWeekProps {}

const DashboardMapsAverageLastWeek: FC<DashboardMapsAverageLastWeekProps> = ({}) => {
    const { data, isLoading } = useQuery(MAP_AVERAGE_LAST_WEEK, () => MapService.getAverageMapsLastWeek());
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
            text={t('Média de mapas por dia na última semana')}
            total={total}
            icon={<Image src={MapImg} />}
        />
    );
};

export default DashboardMapsAverageLastWeek;
