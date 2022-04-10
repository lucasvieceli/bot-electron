import React, { FC, useCallback, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useQuery } from 'react-query';
import { Spinner, Table } from 'reactstrap';
import { PaginationParams } from '../../../../electron/service/map.types';
import { TextRegular15 } from '../../../layout/Fonts/regular';
import { AccountService, MapService } from '../../../services';
import { MAP_LIST, MAP_TOTAL } from '../../../utils/react-query';
import { TableFilter } from '../../molecules';
import Pagination from '../Pagination';
import { ContainerPagination, ContainerSpinner, TextTotal } from './styles';

interface MapListProps {}

const MapList: FC<MapListProps> = ({}) => {
    const refTable = useRef<HTMLDivElement>(null);
    const [params, setParams] = useState<PaginationParams>({
        page: 1,
        created: undefined,
        account: undefined,
    } as PaginationParams);

    const { data, isLoading } = useQuery([MAP_LIST, params], () => MapService.getPagination(params));
    const { data: totalMaps } = useQuery([MAP_TOTAL, params], () => MapService.getTotal(params));

    const {
        i18n: { language },
        t,
    } = useTranslation();

    const handleChangePage = (page: number) => {
        setParams((old) => ({
            ...old,
            page,
        }));
        refTable.current?.scrollIntoView({ behavior: 'smooth' });
    };

    const handleChangeFilter = useCallback((name: string, value: string | number) => {
        setParams((old) => ({
            ...old,
            [name]: value,
            page: 1,
        }));
    }, []);

    return (
        <>
            <div ref={refTable} />
            <Table borderless dark hover responsive striped>
                <thead>
                    <tr>
                        <th>{t('Conta')}</th>
                        <th>{t('Data')}</th>
                    </tr>
                    <tr>
                        <td>
                            <TableFilter
                                title="Busca pelo id da metamask ou nome da conta"
                                value={params.account || null}
                                name="account"
                                onChange={handleChangeFilter}
                            />
                        </td>
                        <td>
                            <TableFilter
                                type="date"
                                value={params.account || null}
                                name="created"
                                onChange={handleChangeFilter}
                            />
                        </td>
                    </tr>
                </thead>

                <tbody>
                    {!isLoading &&
                        data?.items.map((item) => (
                            <tr key={item.id.toString()}>
                                <td>
                                    <TextRegular15>{AccountService.getName(item.account)}</TextRegular15>
                                </td>
                                <td>
                                    <TextRegular15>
                                        {item.created.toLocaleDateString(language, {
                                            year: 'numeric',
                                            month: 'numeric',
                                            day: 'numeric',
                                            hour: 'numeric',
                                            minute: 'numeric',
                                        })}
                                    </TextRegular15>
                                </td>
                            </tr>
                        ))}
                </tbody>
            </Table>

            {isLoading && (
                <ContainerSpinner>
                    <Spinner />
                </ContainerSpinner>
            )}
            {data && (
                <ContainerPagination>
                    <Pagination totalPages={data.totalPages} onChangePage={handleChangePage} page={data.page} />
                    <TextTotal>Total Mapas: {totalMaps ? totalMaps : 0}</TextTotal>
                </ContainerPagination>
            )}
        </>
    );
};

export default MapList;
