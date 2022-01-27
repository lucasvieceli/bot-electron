import React, { BaseSyntheticEvent, FC, SyntheticEvent } from 'react';
import { Input, Row, TextTitle } from './styles';

interface ConfigItemNumberProps {
    text: string;
    value?: string;
    name?: string;
    onChange: (value: string, name: string) => void;
}

const ConfigItemNumber: FC<ConfigItemNumberProps> = ({ text, value, onChange, name }) => {
    const handleChange = (e: any) => {
        onChange(e.nativeEvent.target.value, name);
    };
    return (
        <Row>
            <TextTitle>{text}</TextTitle>
            <Input value={value} type="number" min={1} onChange={handleChange} />
        </Row>
    );
};

export default ConfigItemNumber;
