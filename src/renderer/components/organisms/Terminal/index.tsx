import { ipcRenderer, remote } from 'electron';
import { IpcRendererEvent } from 'electron';
// import { IpcRendererEvent } from 'electron/renderer';
import React, { useEffect, useRef, useState } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import Database from '../../../../main/database/Database';
import Log from '../../../../main/database/models/log.model';
import { TerminalItem } from '../../molecules';
import { Container, Content } from './styles';

export const Terminal = () => {
    const [messages, setMessages] = useState<Log[]>([]);
    const refMessageEnd = useRef(null);

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
    const teste = async () => {
        const database: Database = remote.getGlobal('database');
        const repo = database.getRepository<Log>('Log');
        const create = {
            message: 'teste mensagem com parametro e translate parametro: {{parametro}}',
            params: { parametro: 'valor parameltro' },
            account: 1,
        };
        const log = repo.create(create);
    };
    return (
        <>
            <button onClick={teste} style={{ height: 150, background: 'red' }}>
                {t('teste', { name: 'xD' })} aaa
            </button>
            <Container>
                <Content>
                    <TerminalItem text="Aguardando mensagem..." />
                    {messages.map((item) => (
                        <TerminalItem
                            key={item.id.toString()}
                            account={item.account}
                            text={t(item.message, item.params)}
                        />
                    ))}
                    <div style={{ float: 'left', clear: 'both' }} ref={refMessageEnd}></div>
                </Content>
            </Container>
        </>
    );
};
