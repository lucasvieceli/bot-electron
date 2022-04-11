import { QueryClientProvider } from 'react-query';
import { HashRouter } from 'react-router-dom';
import 'reflect-metadata';
import useCachedResources from './hooks/use-cached-resources';
import './i18n';
import { RoutesApp } from './routes';
import { GlobalStyle } from './styles/GlobalStyle';
import { queryClient } from './utils/react-query';

export function App() {

    const {isLoadingComplete} = useCachedResources()


    if(!isLoadingComplete){
        return null
    }

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
