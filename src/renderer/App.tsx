import { ipcRenderer, IpcRendererEvent } from 'electron';
import { useEffect } from 'react';
import { HashRouter } from 'react-router-dom';
import 'reflect-metadata';
import { MenuSideBar } from './components/organisms';
import './i18n';
import { RoutesApp } from './routes';
import { GlobalStyle } from './styles/GlobalStyle';

// import { IpcRendererEvent } from 'electron/renderer';

export function App() {
    console.log('initttt');
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
