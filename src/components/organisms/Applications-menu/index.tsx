import React, { FC } from 'react';
import ApplicationItem from '../../molecules/Application-item';
import { Container } from './styles';
import { ApplicationMenuItem } from './types';

interface ApplicationsMenuProps {
    menus: ApplicationMenuItem[];
    onPress: (menu: ApplicationMenuItem) => void;
}

const ApplicationsMenu: FC<ApplicationsMenuProps> = ({ menus, onPress }) => {
    return (
        <Container>
            {menus.map((menu, i) => (
                <ApplicationItem key={i.toString()} data={menu} onPress={() => onPress(menu)} />
            ))}
        </Container>
    );
};

export default ApplicationsMenu;
