import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Applications, ApplicationsBcoin, ApplicationsLog, ApplicationsMap } from '../../pages';
import { RoutesAccount } from './Account';

export const RoutesApplications = () => {
    return (
        <Routes>
            <Route element={<Applications />} path="/" />
            <Route element={<ApplicationsBcoin />} path="/bcoin" />
            <Route element={<ApplicationsMap />} path="/map" />
            <Route element={<ApplicationsLog />} path="/log" />
            <Route element={<RoutesAccount />} path="/account/*" />
        </Routes>
    );
};
