import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Applications, ApplicationsAccount, ApplicationsBcoin, ApplicationsLog, ApplicationsMap } from '../../pages';

export const RoutesApplications = () => {
    return (
        <Routes>
            <Route element={<Applications />} path="/" />
            <Route element={<ApplicationsBcoin />} path="/bcoin" />
            <Route element={<ApplicationsMap />} path="/map" />
            <Route element={<ApplicationsLog />} path="/log" />
            <Route element={<ApplicationsAccount />} path="/account" />
        </Routes>
    );
};
