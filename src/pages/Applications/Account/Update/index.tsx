import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { AccountUpdate as AccountUpdateTemplate } from '../../../../components/templates';
interface AccountUpdateProps {}

const AccountUpdate: FC<AccountUpdateProps> = ({}) => {
    const navigate = useNavigate();
    const handleSuccess = () => navigate('/applications/account');
    return <AccountUpdateTemplate onSuccess={handleSuccess} />;
};

export default AccountUpdate;
