import React, { ChangeEvent, FC, MutableRefObject, useEffect, useRef, useState } from 'react';
import { Input } from 'reactstrap';
import { Container, EditText } from './styles';

type value = string | number;

interface InputInlineProps {
    value: value;
    onChange: (value: value) => void;
}

const InputInline: FC<InputInlineProps> = ({ children, value, onChange }) => {
    const [editing, setEditing] = useState(false);
    const [newValue, setNewValue] = useState<value>();
    const wrapperRef = useRef(null);

    const handleChange = () => {
        if (!editing) return false;
        setEditing(false);
        if(newValue !== undefined) onChange(newValue);
    };

    const useOutsideAlerter = (ref: MutableRefObject<any>) => {
        useEffect(() => {
            const handleClickOutside = (event: any) => {
                if (ref.current && !ref.current.contains(event.target)) {
                    handleChange();
                }
            };

            document.addEventListener('mousedown', handleClickOutside);
            return () => {
                document.removeEventListener('mousedown', handleClickOutside);
            };
        }, [ref, handleChange]);
    };
    useOutsideAlerter(wrapperRef);

    const handleChangeValue = ({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
        setNewValue(value);
    };
    const clickEdit = () => {
        setEditing((old) => !old);
        setNewValue(value);
    };
    return (
        <Container ref={wrapperRef}>
            {!editing ? (
                <button onClick={clickEdit}>
                    <EditText>{newValue || children}</EditText>
                </button>
            ) : (
                <Input bsSize="sm" onChange={handleChangeValue} value={newValue} />
            )}
        </Container>
    );
};

export default InputInline;
