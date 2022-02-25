import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Button } from '../../molecules';
import { ButtonType } from '../../molecules/Button/types';
import { AccountList as AccountListOrg, ContainerMain } from '../../organisms';
import { Container, ContainerTitle, TextSubTitle, TextTitle } from './styles';

interface AccountListProps {
    onPressCreate: () => void;
    onPressEdit: (id: number) => void;
}

const AccountList: FC<AccountListProps> = ({ onPressCreate, onPressEdit }) => {
    const { t } = useTranslation();

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
                    <BreadcrumbItem active>{t('Contas')}</BreadcrumbItem>
                </Breadcrumb>

                <ContainerTitle>
                    <TextTitle>Contas</TextTitle>

                    <Button text={t('Cadastrar')} onPress={onPressCreate} type={ButtonType.SUCCESS} />
                </ContainerTitle>
                <TextSubTitle>{t('Lista de contas cadastradas automáticamente')}</TextSubTitle>
                <AccountListOrg onPressEdit={onPressEdit} />
            </Container>
        </ContainerMain>
    );
};

export default AccountList;
