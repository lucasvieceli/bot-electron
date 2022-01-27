import { ipcRenderer, remote } from 'electron';
import { IpcRendererEvent } from 'electron/renderer';
// import { IpcRendererEvent } from 'electron/renderer';
import React, { useEffect, useRef, useState } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import Database from '../../../../main/database/Database';
import Log from '../../../../main/database/models/log';
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
        console.log('asdasdsa');
        const database: Database = remote.getGlobal('database');
        const repo = database.getRepository<Log>('Log');
        const create = {
            message: 'teste mensagem com parametro e translate parametro: {{parametro}}',
            params: { parametro: 'valor parameltro' },
        };

        const log = repo.create(create);
        console.log(await repo.save(log), log);
    };
    console.log(messages);
    return (
        <>
            <button onClick={teste} style={{ height: 150, background: 'red' }}>
                {t('teste', { name: 'xD' })} aaa
            </button>
            <Container>
                <Content>
                    <TerminalItem text="Aguardando mensagem..." />
                    {messages.map(({ id, message, params }, i) => (
                        <TerminalItem key={id.toString()} text={t(message, params) + ' ' + id} />
                    ))}
                    <div style={{ float: 'left', clear: 'both' }} ref={refMessageEnd}></div>
                </Content>
            </Container>
        </>
    );
};
