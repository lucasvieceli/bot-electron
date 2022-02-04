import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { BcoinList as BcoinListOrg, ContainerMain } from '../../organisms';
import { Container, TextSubTitle, TextTitle } from './styles';

interface BcoinListProps {}

const BcoinList: FC<BcoinListProps> = ({}) => {
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
                    <BreadcrumbItem active>Bcoin</BreadcrumbItem>
                </Breadcrumb>

                <TextTitle>Bcoin</TextTitle>
                <TextSubTitle>{t('Lista dos bcoin registrada por dia')}</TextSubTitle>
                <BcoinListOrg />
            </Container>
        </ContainerMain>
    );
};

export default BcoinList;
