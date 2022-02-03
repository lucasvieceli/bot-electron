import React, { FC } from 'react';
import { Container } from './styles';
import { ApplicationsMenu, ContainerMain } from '../../organisms';
import { ApplicationMenuItem } from '../../organisms/Applications-menu/types';
import BcoinImg from '../../../../../assets/images/bcoin.png';
import NewMapImg from '../../../../../assets/images/new-map.png';

const menus: ApplicationMenuItem[] = [
    {
        name: 'Bcoin',
        image: BcoinImg,
        url: '/applications/bcoin',
    },
    {
        name: 'Novos Mapas',
        image: NewMapImg,
        url: '/applications/bcoin',
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
