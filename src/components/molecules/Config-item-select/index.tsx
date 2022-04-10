import React, { FC } from 'react';
import { Input, Row, TextTitle } from './styles';

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
    const handleChange = (e: any) => {
        onChange(e.nativeEvent.target.value, name);
    };

    return (
        <Row>
            <TextTitle>{text}</TextTitle>
            <Input bsSize="sm" type="select" value={value} style={{ width }} onChange={handleChange}>
                {values.map((v) => (
                    <option key={v.id} value={v.id}>
                        {v.label}
                    </option>
                ))}
            </Input>
        </Row>
    );
};

export default ConfigItemSelect;
