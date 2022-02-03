import React from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { Applications, ApplicationsBcoin } from '../../pages';

export const RoutesApplications = () => {
    return (
        <Routes>
            <Route element={<Applications />} path="/" />
            <Route element={<ApplicationsBcoin />} path="/bcoin" />
        </Routes>
    );
};
