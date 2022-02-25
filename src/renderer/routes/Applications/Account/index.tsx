import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { ApplicationsAccount, ApplicationsAccountCreate, ApplicationsAccountUpdate } from '../../../pages';

export const RoutesAccount = () => {
    return (
        <Routes>
            <Route element={<ApplicationsAccount />} path="/" />
            <Route element={<ApplicationsAccountCreate />} path="/create" />
            <Route element={<ApplicationsAccountUpdate />} path="/update/:id" />
        </Routes>
    );
};
