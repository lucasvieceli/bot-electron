import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import Account from '../../../../electron/database/models/account.model';
import { Container, TextMessage, TextSeparator, TextSystem } from './styles';

interface TerminalItemProps {
    text: string;
    account?: Account | number;
    date: Date;
}

const TerminalItem: FC<TerminalItemProps> = ({ text, account, date }) => {
    const getAccount = () => {
        if (!account || typeof account == 'number') return 'sistema';

        const label = account.name ? account.name : account.metamaskId;

        return label;
    };
    const {
        i18n: { language },
    } = useTranslation();
    return (
        <Container>
            <TextSystem>{getAccount()} </TextSystem>
            <TextSeparator>
                :{' '}
                {date.toLocaleTimeString(language, {
                    hour: '2-digit',
                    minute: '2-digit',
                })}
                ~$
            </TextSeparator>
            <TextMessage>{text}</TextMessage>
        </Container>
    );
};

export default TerminalItem;
