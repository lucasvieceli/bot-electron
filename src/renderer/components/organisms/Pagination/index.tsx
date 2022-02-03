import React, { FC } from 'react';
import { Pagination as PaginationRS } from 'reactstrap';
import { PaginationItem, PaginationLink } from './styles';

interface PaginationProps {
    totalPages: number;
    page: number;
    onChangePage: (page: number) => void;
}

const Pagination: FC<PaginationProps> = ({ onChangePage, page, totalPages }) => {
    if (!page) {
        return null;
    }

    const getFirstPage = () => {
        if (page - 3 > 0) {
            return (
                <PaginationItem>
                    <PaginationLink previous onClick={() => onChangePage(1)} />
                </PaginationItem>
            );
        }
        return null;
    };

    const getPagesPrevious = () => {
        const result = [];
        for (let start = page - 3; start < page; start++) {
            if (start > 0 && start != page) {
                result.push(
                    <PaginationItem className={'paginationItemStyle'} key={start.toString()}>
                        <PaginationLink onClick={() => onChangePage(start)} className={'paginationLinkStyle'}>
                            {start}
                        </PaginationLink>
                    </PaginationItem>,
                );
            }
        }
        return result;
    };

    const getPagesNext = () => {
        if (page >= totalPages) return [];

        const result = [];
        for (let start = page + 1; start <= page + 2 && start <= totalPages; start++) {
            result.push(
                <PaginationItem className={'paginationItemStyle'} key={start.toString()}>
                    <PaginationLink onClick={() => onChangePage(start)} className={'paginationLinkStyle'}>
                        {start}
                    </PaginationLink>
                </PaginationItem>,
            );
        }
        return result;
    };

    const getLastPage = () => {
        if (page >= totalPages || page + 2 >= totalPages) return null;

        return (
            <PaginationItem>
                <PaginationLink next onClick={() => onChangePage(totalPages)} />
            </PaginationItem>
        );
    };

    return (
        <PaginationRS>
            {getFirstPage()}
            {getPagesPrevious().map((Item, i) => Item)}
            <PaginationItem className={'paginationItemStyle'} active>
                <PaginationLink className={'paginationLinkStyle'}>{page}</PaginationLink>
            </PaginationItem>
            {getPagesNext().map((Item, i) => Item)}
            {getLastPage()}
        </PaginationRS>
    );
};

export default Pagination;
