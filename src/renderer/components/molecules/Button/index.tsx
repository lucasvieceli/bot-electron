import React, { FC } from 'react';
import { Container, TextTitle } from './styles';
import { ButtonProps } from './types';

const Button: FC<ButtonProps> = ({ type, text, onPress }) => {
    return (
        <Container typeButton={type} onClick={onPress}>
            <TextTitle typeButton={type}>{text}</TextTitle>
        </Container>
    );
};

export default Button;
