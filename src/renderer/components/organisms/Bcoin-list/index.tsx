import React, { FC, useCallback, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useQuery } from 'react-query';
import { Spinner, Table } from 'reactstrap';
import { TextRegular15 } from '../../../layout/Fonts/regular';
import { AccountService, BcoinService } from '../../../services';
import { PaginationParams } from '../../../services/bcoin.types';
import { BCOIN_LIST, BCOIN_TOTAL } from '../../../utils/react-query';
import { TableFilter } from '../../molecules';
import Pagination from '../Pagination';
import { ContainerPagination, ContainerSpinner, TextTotal } from './styles';

interface BcoinListProps {}

const BcoinList: FC<BcoinListProps> = ({}) => {
    const refTable = useRef(null);
    const [params, setParams] = useState<PaginationParams>({
        page: 1,
        created: null,
        account: null,
        qty: null,
        qtyDay: null,
    } as PaginationParams);

    const { data, isLoading } = useQuery([BCOIN_LIST, params], () => BcoinService.getPagination(params));
    const { data: totalBcoin } = useQuery([BCOIN_TOTAL, params], () => BcoinService.getTotal(params));

    const {
        i18n: { language },
        t,
    } = useTranslation();

    const handleChangePage = (page: number) => {
        setParams((old) => ({
            ...old,
            page,
        }));
        refTable.current.scrollIntoView({ behavior: 'smooth' });
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
                        <th style={{ textAlign: 'right' }}>{t('Valor Registrado')}</th>
                        <th
                            style={{ textAlign: 'right' }}
                            title={t('Valor registrado menos o valor registrado do dia anterior')}
                        >
                            {t('Total Obtido ?')}
                        </th>
                    </tr>
                    <tr>
                        <td>
                            <TableFilter
                                title="Busca pelo id da metamask ou nome da conta"
                                value={params.account}
                                name="account"
                                onChange={handleChangeFilter}
                            />
                        </td>
                        <td>
                            <TableFilter
                                type="date"
                                value={params.created}
                                name="created"
                                onChange={handleChangeFilter}
                            />
                        </td>
                        <td>
                            <TableFilter type="currency" value={params.qty} name="qty" onChange={handleChangeFilter} />
                        </td>
                        <td>
                            <TableFilter
                                type="currency"
                                value={params.qtyDay}
                                name="qtyDay"
                                onChange={handleChangeFilter}
                            />
                        </td>
                    </tr>
                </thead>

                <tbody>
                    {!isLoading &&
                        data.items.map((item) => (
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
                                <td align="right">
                                    <TextRegular15>
                                        {item.qty.toLocaleString(language, { minimumFractionDigits: 2 })}
                                    </TextRegular15>
                                </td>
                                <td align="right">
                                    <TextRegular15>
                                        {item.qtyDay
                                            ? item.qtyDay.toLocaleString(language, { minimumFractionDigits: 2 })
                                            : 0}
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
                    <TextTotal>
                        Total Bcoin:{' '}
                        {totalBcoin
                            ? totalBcoin.toLocaleString(language, {
                                  minimumFractionDigits: 2,
                                  maximumFractionDigits: 2,
                              })
                            : 0}
                    </TextTotal>
                </ContainerPagination>
            )}
        </>
    );
};

export default BcoinList;
