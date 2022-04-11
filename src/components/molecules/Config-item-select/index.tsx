import React, { FC } from 'react';
import { Input, Row, TextTitle } from './styles';
import { useTranslation } from 'react-i18next';
interface ConfigItemSelectProps {
    text: string;
    width: number;
    value?: string;
    onChange: (value: string, name: string) => void;
    name: string;
    values: {
        id: string;
        label: string;
    }[];
}

const ConfigItemSelect: FC<ConfigItemSelectProps> = ({ text, values, width, value, onChange, name }) => {
    const { t } = useTranslation();
    const handleChange = (e: any) => {
        onChange(e.nativeEvent.target.value, name);
    };

    return (
        <Row>
            <TextTitle>{t(text)}</TextTitle>
            <Input bsSize="sm" type="select" value={value} style={{ width }} onChange={handleChange}>
                {values.map((v) => (
                    <option key={v.id} value={v.id}>
                        {t(v.label)}
                    </option>
                ))}
            </Input>
        </Row>
    );
};

export default ConfigItemSelect;
