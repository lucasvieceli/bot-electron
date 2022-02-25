import React, { FC } from 'react';
import { Spinner } from 'reactstrap';
import { Container, TextTitle } from './styles';
import { ButtonProps } from './types';

const Button: FC<ButtonProps> = ({ type, text, onPress, isLoading }) => {
    return (
        <Container typeButton={type} onClick={onPress} type="button">
            {isLoading ? <Spinner size="sm" /> : <TextTitle typeButton={type}>{text}</TextTitle>}
        </Container>
    );
};

export default Button;
