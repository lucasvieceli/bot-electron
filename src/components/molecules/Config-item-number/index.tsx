import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Input, Row, TextTitle } from './styles';

interface ConfigItemNumberProps {
    text: string;
    value?: string;
    name: string;
    onChange: (value: string, name: string) => void;
}

const ConfigItemNumber: FC<ConfigItemNumberProps> = ({ text, value, onChange, name }) => {
    const handleChange = (e: any) => {
        onChange(e.nativeEvent.target.value, name);
    };
    const { t } = useTranslation();
    return (
        <Row>
            <TextTitle>{t(text)}</TextTitle>
            <Input value={value} type="number" bsSize="sm" min={1} onChange={handleChange} />
        </Row>
    );
};

export default ConfigItemNumber;
