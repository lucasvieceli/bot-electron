import React, { FC } from 'react';
import { Button, Container, ContainerIcon, Icon, TextTitle } from './styles';

interface ApplicationItemProps {
    name: string;
    image: any;
    onPress: () => void;
}

const ApplicationItem: FC<ApplicationItemProps> = ({ image, name, onPress }) => {
    return (
        <Container>
            <ContainerIcon onClick={onPress}>
                <Icon src={image} />
            </ContainerIcon>
            <Button onClick={onPress}>
                <TextTitle title={name}>{name}</TextTitle>
            </Button>
        </Container>
    );
};

export default ApplicationItem;
