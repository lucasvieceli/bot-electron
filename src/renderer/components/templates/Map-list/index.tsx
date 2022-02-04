import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { MapList as MapListOrg, ContainerMain } from '../../organisms';
import { Container, TextSubTitle, TextTitle } from './styles';

interface MapListProps {}

const MapList: FC<MapListProps> = ({}) => {
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
                    <BreadcrumbItem active>{t('Mapas')}</BreadcrumbItem>
                </Breadcrumb>

                <TextTitle>{t('Mapas')}</TextTitle>
                <TextSubTitle>{t('Lista dos mapas finalizados')}</TextSubTitle>
                <MapListOrg />
            </Container>
        </ContainerMain>
    );
};

export default MapList;
