import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { AccountCreate as AccountCreateTemplate } from '../../../../components/templates';
interface AccountCreateProps {}

const AccountCreate: FC<AccountCreateProps> = ({}) => {
    const navigate = useNavigate();
    const handleSuccess = () => navigate('/applications/account');
    return <AccountCreateTemplate onSuccess={handleSuccess} />;
};

export default AccountCreate;
