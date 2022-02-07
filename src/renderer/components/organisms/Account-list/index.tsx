import React, { FC, useCallback, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useMutation, useQuery } from 'react-query';
import { Spinner, Table } from 'reactstrap';
import { PaginationParams } from '../../../../main/service/account.types';
import { TextRegular15 } from '../../../layout/Fonts/regular';
import { AccountService, MapService } from '../../../services';
import { ACCOUNT_LIST, MAP_LIST, MAP_TOTAL } from '../../../utils/react-query';
import { InputInline, InputInlineAccountName, TableFilter } from '../../molecules';
import Pagination from '../Pagination';
import { ContainerPagination, ContainerSpinner, TextTotal } from './styles';

interface AccountListProps {}

const AccountList: FC<AccountListProps> = ({}) => {
    const refTable = useRef(null);
    const [params, setParams] = useState<PaginationParams>({
        page: 1,
        created: null,
        name: null,
        metamaskId: null,
    } as PaginationParams);

    const { data, isLoading } = useQuery([ACCOUNT_LIST, params], () => AccountService.getPagination(params));

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
                        <th>{t('Nome')}</th>
                        <th>{t('Metamask ID')}</th>
                        <th>{t('Data')}</th>
                    </tr>
                    <tr>
                        <td>
                            <TableFilter value={params.name} name="name" onChange={handleChangeFilter} />
                        </td>
                        <td>
                            <TableFilter value={params.metamaskId} name="metamaskId" onChange={handleChangeFilter} />
                        </td>
                        <td>
                            <TableFilter
                                type="date"
                                value={params.created}
                                name="created"
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
                                    <InputInlineAccountName account={item} />
                                </td>
                                <td>
                                    <TextRegular15>{item.metamaskId}</TextRegular15>
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
                </ContainerPagination>
            )}
        </>
    );
};

export default AccountList;
