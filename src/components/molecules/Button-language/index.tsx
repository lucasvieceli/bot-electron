import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { ConfigService } from '../../../services';
import { Button, Container } from './styles';

interface ButtonLanguageProps {
    image: any;
    language: string;
}

const ButtonLanguage: FC<ButtonLanguageProps> = ({ image, language }) => {
    const {
        i18n: { changeLanguage },
    } = useTranslation();

    const handleChange = () => {
        changeLanguage(language)
        ConfigService.updateColumn('language', language)
    }
    return (
        <Button onClick={handleChange}>
            <Container src={image}></Container>
        </Button>
    );
};

export default ButtonLanguage;
