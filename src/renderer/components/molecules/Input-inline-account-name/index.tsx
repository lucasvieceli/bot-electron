import React, { FC, useState } from 'react';
import { useMutation } from 'react-query';
import InputInline from '../Input-inline';
import Account from '../../../../main/database/models/account.model';
import { AccountService } from '../../../services';
import { TextRegular15 } from '../../../layout/Fonts/regular';
import { useTranslation } from 'react-i18next';
import { Spinner } from 'reactstrap';

interface InputInlineAccountNameProps {
    account: Account;
}

const InputInlineAccountName: FC<InputInlineAccountNameProps> = ({ account }) => {
    const [name, setName] = useState(account.name);
    const { mutate, isLoading: isLoadingChangeName } = useMutation(
        (name: string | number) => AccountService.changeName(account.id, name as string),
        {
            onError: alert,
            onSuccess: (data) => {
                setName(data.name);
            },
        },
    );
    const { t } = useTranslation();

    if (isLoadingChangeName) {
        return <Spinner />;
    }

    return (
        <InputInline value={account.name} onChange={mutate}>
            <TextRegular15>{name || t('Sem Nome, clique aqui para editar')}</TextRegular15>
        </InputInline>
    );
};

export default InputInlineAccountName;
