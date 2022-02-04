import React, { FC } from 'react';
import { IconRobot } from '../../atoms';
import {
    DashboardTotals,
    DashboardMapsAverageLastWeek,
    DashboardBcoinYesterday,
    DashboardBcoinAverageLastWeek,
} from '../../molecules';
import { Container, Gap, TextTitle } from './styles';

interface DashboardSideBarRightProps {}

const DashboardSideBarRight: FC<DashboardSideBarRightProps> = ({}) => {
    return (
        <Container>
            <TextTitle>Dashboard</TextTitle>
            <DashboardBcoinAverageLastWeek />
            <Gap />
            <DashboardBcoinYesterday />
            <Gap />
            <DashboardMapsAverageLastWeek />
        </Container>
    );
};

export default DashboardSideBarRight;
