import { PaginationItem as PaginationItemRS, PaginationLink as PaginationLinkRS } from 'reactstrap';
import styled from 'styled-components';

export const PaginationItem = styled(PaginationItemRS)`
    margin-left: 5px;
    .page-link {
        color: #fff;
    }
    &.page-item {
        &.active {
            button {
                background-color: #373b3e;
                border-color: #373b3e;
            }
        }
        button {
            border: none;
            &:focus {
                outline: none !important;
                outline-offset: none !important;
            }
        }
    }
`;

export const PaginationLink = styled(PaginationLinkRS)`
    background-color: #212529;
    border-radius: 5px;
    &:hover {
        background-color: #323539;
    }
    &:active {
        background-color: #373b3e;
    }
`;
