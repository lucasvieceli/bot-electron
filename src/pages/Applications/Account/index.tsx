import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { AccountList } from '../../../components/templates';

interface AccountProps {}

const Account: FC<AccountProps> = ({}) => {
    const navigate = useNavigate();
    const handlePressCreate = () => {
        navigate('/applications/account/create');
    };
    const handlePressEdit = (id: number) => {
        navigate('/applications/account/update/' + id);
    };

    return <AccountList onPressCreate={handlePressCreate} onPressEdit={handlePressEdit} />;
};

export default Account;
