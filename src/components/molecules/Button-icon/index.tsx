import React, { FC } from 'react';
import { Container } from './styles';

interface ButtonIconProps {
    onPress: () => void;
}

const ButtonIcon: FC<ButtonIconProps> = ({ children, onPress }) => {
    return <Container onClick={onPress}>{children}</Container>;
};

export default ButtonIcon;
