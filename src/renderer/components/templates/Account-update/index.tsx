import React, { ChangeEvent, FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useMutation, useQuery } from 'react-query';
import { Link, useParams } from 'react-router-dom';
import { Breadcrumb, BreadcrumbItem, Form, Spinner } from 'reactstrap';
import { AccountUpdate as AccountUpdateDTO } from '../../../../main/dto/Account-update';
import { AccountService } from '../../../services';
import { ACCOUNT_INFO } from '../../../utils/react-query';
import { Button } from '../../molecules';
import { ButtonType } from '../../molecules/Button/types';
import { AccountForm, ContainerMain, FormErrors } from '../../organisms';
import { Container, ContainerMsg, TextTitle } from './styles';

interface AccountUpdateProps {
    onSuccess: () => void;
}

const AccountUpdate: FC<AccountUpdateProps> = ({ onSuccess }) => {
    const [value, setValue] = useState<AccountUpdateDTO>({
        metamaskId: '',
        name: '',
        user: '',
        password: '',
        enable: 0,
    });

    const { t } = useTranslation();
    const { id } = useParams();

    const {
        mutate: handlePressSubmit,
        isLoading,
        isError,
        error,
    } = useMutation(() => AccountService.change({ value, id }), { onSuccess: () => onSuccess() });

    const { isLoading: isLoadingQuery } = useQuery(ACCOUNT_INFO, () => AccountService.getById(parseInt(id)), {
        onSuccess: (data) => setValue(data),
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
                    <BreadcrumbItem active>{t('Alterar Conta')}</BreadcrumbItem>
                </Breadcrumb>

                <TextTitle>{t('Alterar Conta')}</TextTitle>
                <Form>
                    {isLoadingQuery ? (
                        <Spinner />
                    ) : (
                        <>
                            <AccountForm value={value} onChangeInput={handleChangeInput} />
                            <Button
                                text={t('Salvar')}
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
                        </>
                    )}
                </Form>
            </Container>
        </ContainerMain>
    );
};

export default AccountUpdate;
