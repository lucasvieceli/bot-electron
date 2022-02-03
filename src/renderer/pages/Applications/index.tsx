import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { ApplicationMenuItem } from '../../components/organisms/Applications-menu/types';
import { Applications as ApplicationsTemplate } from '../../components/templates';

interface ApplicationsProps {}

const Applications: FC<ApplicationsProps> = ({}) => {
    const navigate = useNavigate();
    const handlePresMenu = (menu: ApplicationMenuItem) => {
        navigate('/applications/bcoin');
    };

    return <ApplicationsTemplate onPressMenu={handlePresMenu} />;
};

export default Applications;
