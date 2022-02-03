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
                <ApplicationItem key={i.toString()} name={menu.name} onPress={() => onPress(menu)} image={menu.image} />
            ))}
        </Container>
    );
};

export default ApplicationsMenu;
