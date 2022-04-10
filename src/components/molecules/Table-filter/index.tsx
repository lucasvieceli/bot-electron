import { parseISO } from 'date-fns';
import React, { ChangeEvent, FC, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Input } from 'reactstrap';
import { InputType } from 'reactstrap/types/lib/Input';
import { unMaskCurrency } from '../../../utils/currency';

export type TableFilterType = InputType | 'currency';
type Value = string | number;

const formatDate = (value: Value, language: string) => parseISO(value.toString()).toJSON();
const formatCurrency = (value: Value, language: string) => unMaskCurrency(language, value);

interface TableFilterProps {
    name: string;
    value: Value | null;
    title?: string;
    type?: TableFilterType;
    onChange: (name: string, value: Value) => void;
}

const TableFilter: FC<TableFilterProps> = (props) => {
    const { value: valueProps, onChange, name, title, type = 'text' } = props;

    const idTimeout = useRef<NodeJS.Timeout>();
    const [value, setValue] = useState(valueProps || '');
    const {
        t,
        i18n: { language },
    } = useTranslation();

    useEffect(() => {
        setValue(value);
    }, [value, valueProps]);

    const handleChange = ({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
        if (idTimeout.current) {
            clearTimeout(idTimeout.current);
        }
        setValue(value);

        const formatter: any = {
            date: formatDate,
            currency: formatCurrency,
        };

        idTimeout.current = setTimeout(() => {
            if (type in formatter) {
                value = formatter[type](value, language);
            }
            onChange(name, value);
        }, 400);
    };

    let typeInput = type;
    if (typeInput === 'currency') {
        typeInput = 'text';
    }

    return (
        <Input
            type={typeInput}
            title={t(title || '')}
            onChange={handleChange}
            value={value}
            placeholder="Filtro"
            bsSize="sm"
        />
    );
};

export default TableFilter;
