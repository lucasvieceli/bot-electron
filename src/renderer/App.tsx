import 'reflect-metadata';

import { HashRouter } from 'react-router-dom';
import { MenuSideBar } from './components/organisms';
import { RoutesApp } from './routes';
import { Container, Content } from './styles';
import { GlobalStyle } from './styles/GlobalStyle';
import './i18n';
import { useEffect } from 'react';
import { ipcRenderer, IpcRendererEvent } from 'electron';
// import { IpcRendererEvent } from 'electron/renderer';

export function App() {
    useEffect(() => {
        const onLog: any = (e: IpcRendererEvent, log: string) => {
            alert(log);
        };
        ipcRenderer.on('debug', onLog);
        return () => {
            ipcRenderer.removeListener('debug', onLog);
        };
    }, []);

    return (
        <HashRouter>
            <GlobalStyle />
            {/* <Container> */}
            <MenuSideBar />
            {/* <Content> */}
            <RoutesApp />
            {/* </Content> */}
            {/* </Container> */}
        </HashRouter>
    );
}
