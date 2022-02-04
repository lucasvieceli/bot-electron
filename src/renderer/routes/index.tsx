import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Home, Setting } from '../pages';
import { RoutesApplications } from './Applications';

export const RoutesApp = () => {
    return (
        <Routes>
            <Route element={<Home />} path="/" />
            <Route element={<Home />} path="/main_window" />
            <Route element={<RoutesApplications />} path="/applications/*" />
            <Route element={<Setting />} path="/setting" />
        </Routes>
    );
};
