import React, { FC } from 'react';
import { Button, Container, ContainerIcon, Icon, TextTitle } from './styles';
import { ApplicationItemProps } from './types';
import { useTranslation } from 'react-i18next';

const ApplicationItem: FC<ApplicationItemProps> = ({ data, onPress }) => {
    const {t} = useTranslation();
    return (
        <Container>
            <ContainerIcon onClick={onPress} backgroundColor={data.backgroundColor}>
                <Icon src={data.image} />
            </ContainerIcon>
            <Button onClick={onPress}>
                <TextTitle title={t(data.name)}>{t(data.name)}</TextTitle>
            </Button>
        </Container>
    );
};

export default ApplicationItem;
