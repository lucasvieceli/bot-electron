import 'reflect-metadata';

import { HashRouter } from 'react-router-dom';
import { MenuSideBar } from './components/organisms';
import { RoutesApp } from './routes';
import { Container, Content } from './styles';
import { GlobalStyle } from './styles/GlobalStyle';
import './i18n';
export function App() {
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
