import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useMutation } from 'react-query';
import Log from '../../../../electron/database/models/log.model';
import { EventBroadcastParam } from '../../../../electron/service/events.types';
import { LogService } from '../../../services';
import { TerminalItem } from '../../molecules';
import { Container } from './styles';

export const Terminal = () => {
    const [messages, setMessages] = useState<Log[]>([]);
    const refMessageEnd = useRef<HTMLDivElement>(null);

    const { data: lastLogs, mutate } = useMutation(() => LogService.getLastLogs());

    const scrollToBottom = () => {
        if (!refMessageEnd.current) return;

        refMessageEnd.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        mutate();
        const onLog = ({detail:{data}}: EventBroadcastParam<Log>) => {
            setMessages((old) => [...old, data]);
            scrollToBottom();
        };
        window.$electron.on('log', onLog);
        return () => {
            // ipcRenderer.removeListener('log', onLog);
        };
    }, []);

    const { t } = useTranslation();

    return (
        <Container>
            {/* <Content> */}
            {}
            {lastLogs &&
                lastLogs.items.map((item) => (
                    <TerminalItem
                        key={item.id.toString()}
                        date={item.created}
                        account={item.account}
                        text={t(item.message, item.params)}
                    />
                ))}
            {lastLogs && <TerminalItem text={t('Logs executados anteriormente /\\')} date={new Date()} />}
            {messages.map((item) => (
                <TerminalItem
                    key={item.id.toString()}
                    date={item.created}
                    account={item.account}
                    text={t(item.message, item.params)}
                />
            ))}
            <div ref={refMessageEnd}></div>
            {/* </Content> */}
        </Container>
    );
};
