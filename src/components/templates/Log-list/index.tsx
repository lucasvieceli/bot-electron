import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { LogList as LogListOrg, ContainerMain } from '../../organisms';
import { Container, TextSubTitle, TextTitle } from './styles';

interface LogListProps {}

const LogList: FC<LogListProps> = ({}) => {
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
                    <BreadcrumbItem active>{t('Logs')}</BreadcrumbItem>
                </Breadcrumb>

                <TextTitle>{t('Logs')}</TextTitle>
                <TextSubTitle>{t('Lista das ações executadas pelo bot')}</TextSubTitle>
                <LogListOrg />
            </Container>
        </ContainerMain>
    );
};

export default LogList;
