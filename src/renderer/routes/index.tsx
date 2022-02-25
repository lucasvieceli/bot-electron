import React from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { MenuSideBar } from '../components/organisms';
import { Bombcrypto, Home, Setting } from '../pages';
import { RoutesApplications } from './Applications';

export const RoutesApp = () => {
    const { pathname } = useLocation();
    return (
        <>
            {pathname.indexOf('/bombcrypto/') == -1 && <MenuSideBar />}

            <Routes>
                <Route element={<Home />} path="/" />
                <Route element={<Home />} path="/main_window" />
                <Route element={<RoutesApplications />} path="/applications/*" />
                <Route element={<Setting />} path="/setting" />
                <Route element={<Bombcrypto />} path="/bombcrypto/:account" />
            </Routes>
        </>
    );
};
