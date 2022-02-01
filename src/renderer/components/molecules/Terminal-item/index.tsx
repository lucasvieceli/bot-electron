import React, { FC } from 'react';
import Account from '../../../../main/database/models/account.model';
import { Container, TextMessage, TextSeparator, TextSystem } from './styles';

interface TerminalItemProps {
    text: string;
    account?: Account | number;
}

const TerminalItem: FC<TerminalItemProps> = ({ text, account }) => {
    const getAccount = () => {
        if (!account || typeof account == 'number') return 'sistema';

        const label = account.name ? account.name : account.metamaskId;

        return label;
    };
    return (
        <Container>
            <TextSystem>{getAccount()}</TextSystem>
            <TextSeparator>:~$</TextSeparator>
            <TextMessage>{text}</TextMessage>
        </Container>
    );
};

export default TerminalItem;
