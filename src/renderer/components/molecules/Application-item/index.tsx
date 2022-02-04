import React, { FC } from 'react';
import { Button, Container, ContainerIcon, Icon, TextTitle } from './styles';
import { ApplicationItemProps } from './types';

const ApplicationItem: FC<ApplicationItemProps> = ({ data, onPress }) => {
    return (
        <Container>
            <ContainerIcon onClick={onPress} backgroundColor={data.backgroundColor}>
                <Icon src={data.image} />
            </ContainerIcon>
            <Button onClick={onPress}>
                <TextTitle title={data.name}>{data.name}</TextTitle>
            </Button>
        </Container>
    );
};

export default ApplicationItem;
