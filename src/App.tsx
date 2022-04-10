import { QueryClientProvider } from 'react-query';
import { HashRouter } from 'react-router-dom';
import 'reflect-metadata';
import './i18n';
import { RoutesApp } from './routes';
import { GlobalStyle } from './styles/GlobalStyle';
import { queryClient } from './utils/react-query';

export function App() {
console.log('aaaaa')
    return (
        <QueryClientProvider client={queryClient}>
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
