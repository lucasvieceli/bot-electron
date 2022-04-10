import React, { FC } from 'react';
import { Container } from './styles';
import { ApplicationsMenu, ContainerMain } from '../../organisms';
import { ApplicationMenuItem } from '../../organisms/Applications-menu/types';
import BcoinImg from '../../../../assets/images/bcoin-menu.png';
import NewMapImg from '../../../../assets/images/new-map.png';
import LogImg from '../../../../assets/images/log.png';
import AccountImg from '../../../../assets/images/account.png';
import { colors } from '../../../layout/colors';

const menus: ApplicationMenuItem[] = [
    {
        name: 'Bcoin',
        image: BcoinImg,
        url: '/applications/bcoin',
    },
    {
        name: 'Mapas',
        image: NewMapImg,
        url: '/applications/map',
    },
    {
        name: 'Logs',
        image: LogImg,
        backgroundColor: colors.lightGray,
        url: '/applications/log',
    },
    {
        name: 'Contas',
        image: AccountImg,
        backgroundColor: colors.lightGray,
        url: '/applications/account',
    },
];

interface ApplicationsProps {
    onPressMenu: (menu: ApplicationMenuItem) => void;
}

const Applications: FC<ApplicationsProps> = ({ onPressMenu }) => {
    return (
        <ContainerMain>
            <Container>
                <ApplicationsMenu menus={menus} onPress={onPressMenu} />
            </Container>
        </ContainerMain>
    );
};

export default Applications;
