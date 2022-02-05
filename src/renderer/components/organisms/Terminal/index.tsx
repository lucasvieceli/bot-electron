import { ipcRenderer, IpcRendererEvent } from 'electron';
// import { IpcRendererEvent } from 'electron/renderer';
import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useMutation, useQuery } from 'react-query';
import { LOG_LAST } from '../../../utils/react-query';
import Log from '../../../../main/database/models/log.model';
import { TerminalItem } from '../../molecules';
import { Container, Content } from './styles';
import { LogService } from '../../../services';

export const Terminal = () => {
    const [messages, setMessages] = useState<Log[]>([]);
    const refMessageEnd = useRef(null);

    const { data: lastLogs, mutate } = useMutation(() => LogService.getLastLogs());

    const scrollToBottom = () => {
        if (!refMessageEnd.current) return;

        refMessageEnd.current.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        mutate();
        const onLog: any = (e: IpcRendererEvent, log: Log) => {
            setMessages((old) => [...old, log]);
            scrollToBottom();
        };
        ipcRenderer.on('log', onLog);
        return () => {
            ipcRenderer.removeListener('log', onLog);
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
