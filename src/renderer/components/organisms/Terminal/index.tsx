import { ipcRenderer, IpcRendererEvent } from 'electron';
// import { IpcRendererEvent } from 'electron/renderer';
import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useQuery } from 'react-query';
import { LOG_LAST } from '../../../utils/react-query';
import Log from '../../../../main/database/models/log.model';
import { TerminalItem } from '../../molecules';
import { Container, Content } from './styles';
import { LogService } from '../../../services';

export const Terminal = () => {
    const [messages, setMessages] = useState<Log[]>([]);
    const refMessageEnd = useRef(null);

    useQuery(LOG_LAST, () => LogService.getLastLogs(), {
        onSuccess: (data) => {
            setMessages(data.items);
        },
    });

    const scrollToBottom = () => {
        if (!refMessageEnd.current) return;

        refMessageEnd.current.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
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
            {messages.map((item) => (
                <TerminalItem key={item.id.toString()} account={item.account} text={t(item.message, item.params)} />
            ))}
            <div style={{ float: 'left', clear: 'both' }} ref={refMessageEnd}></div>
            {/* </Content> */}
        </Container>
    );
};
