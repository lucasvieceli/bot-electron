import { ipcRenderer, IpcRendererEvent } from 'electron';
import { useEffect } from 'react';
import { QueryClientProvider } from 'react-query';
import { HashRouter, useLocation } from 'react-router-dom';
import 'reflect-metadata';
import { MenuSideBar } from './components/organisms';
import './i18n';
import { RoutesApp } from './routes';
import { GlobalStyle } from './styles/GlobalStyle';
import { queryClient } from './utils/react-query';

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
        <QueryClientProvider client={queryClient}>
            {/* <ReactQueryDevtools initialIsOpen={false} /> */}
            <HashRouter>
                <GlobalStyle />
                {/* <Container> */}
                {/* <Content> */}
                <RoutesApp />
                {/* </Content> */}
                {/* </Container> */}
            </HashRouter>
        </QueryClientProvider>
    );
}
