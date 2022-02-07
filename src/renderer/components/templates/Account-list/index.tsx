import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { AccountList as AccountListOrg, ContainerMain } from '../../organisms';
import { Container, TextSubTitle, TextTitle } from './styles';

interface AccountListProps {}

const AccountList: FC<AccountListProps> = ({}) => {
    const { t } = useTranslation();

    return (
        <ContainerMain>
            <Container>
                <Breadcrumb>
                    <BreadcrumbItem>
                        <Link to="/">{t('Página Inicial')}</Link>
                    </BreadcrumbItem>
                    <BreadcrumbItem>
                        <Link to="/applications">Menus</Link>
                    </BreadcrumbItem>
                    <BreadcrumbItem active>Contas</BreadcrumbItem>
                </Breadcrumb>

                <TextTitle>Contas</TextTitle>
                <TextSubTitle>{t('Lista de contas cadastradas automáticamente')}</TextSubTitle>
                <AccountListOrg />
            </Container>
        </ContainerMain>
    );
};

export default AccountList;
