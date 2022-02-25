import React, { ChangeEvent, FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useMutation } from 'react-query';
import { Link } from 'react-router-dom';
import { Breadcrumb, BreadcrumbItem, Form } from 'reactstrap';
import { AccountService } from '../../../services';
import { Button } from '../../molecules';
import { ButtonType } from '../../molecules/Button/types';
import { AccountForm, ContainerMain, FormErrors } from '../../organisms';
import { Container, ContainerMsg, TextTitle } from './styles';

interface AccountCreateProps {
    onSuccess: () => void;
}

const AccountCreate: FC<AccountCreateProps> = ({ onSuccess }) => {
    const [value, setValue] = useState({
        metamaskId: '',
        name: '',
        user: '',
        password: '',
    });

    const { t } = useTranslation();

    const {
        mutateAsync: handlePressSubmit,
        isLoading,
        isError,
        error,
    } = useMutation(() => AccountService.create(value), {
        onSuccess: (e) => onSuccess(),
    });

    const handleChangeInput = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;

        setValue((old) => ({
            ...old,
            [name]: value,
        }));
    };

    return (
        <ContainerMain>
            <Container>
                <Breadcrumb>
                    <BreadcrumbItem>
                        <Link to="/">{t('Página Inicial')}</Link>
                    </BreadcrumbItem>
                    <BreadcrumbItem>
                        <Link to="/applications">{t('Menus')}</Link>
                    </BreadcrumbItem>
                    <BreadcrumbItem>
                        <Link to="/applications/account">{t('Contas')}</Link>
                    </BreadcrumbItem>
                    <BreadcrumbItem active>{t('Cadastrar Conta')}</BreadcrumbItem>
                </Breadcrumb>

                <TextTitle>{t('Cadastrar Conta')}</TextTitle>
                <Form>
                    <AccountForm value={value} onChangeInput={handleChangeInput} />
                    <Button
                        text={t('Cadastrar')}
                        isLoading={isLoading}
                        type={ButtonType.SUCCESS}
                        onPress={handlePressSubmit}
                    />
                    {isError && Array.isArray(error) && (
                        <ContainerMsg>
                            <FormErrors errors={error} />
                        </ContainerMsg>
                    )}
                    {isError && !Array.isArray(error) && <span>Ocorreu algum erro interno</span>}
                </Form>
            </Container>
        </ContainerMain>
    );
};

export default AccountCreate;
