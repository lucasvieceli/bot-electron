import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Container } from './styles';

interface ButtonLanguageProps {
    image: any;
    language: string;
}

const ButtonLanguage: FC<ButtonLanguageProps> = ({ image, language }) => {
    const {
        i18n: { changeLanguage },
    } = useTranslation();
    return (
        <Button onClick={() => changeLanguage(language)}>
            <Container src={image}></Container>
        </Button>
    );
};

export default ButtonLanguage;
