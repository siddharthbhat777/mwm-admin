import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from '../components/admin/pages/login/Login';
import Layout from '../components/admin/layout/Layout';
import Dashboard from '../components/admin/pages/dashboard/Dashboard';

const Routers = () => {
    return (
        <Router>
            <Routes>
                <Route path='admin' element={<Layout />}>
                    <Route index element={<Dashboard />} />
                    <Route path='login' element={<Login />} />
                </Route>
                <Route path='/' element={<Layout />}>
                    <Route index element={<Dashboard />} />
                    <Route path='login' element={<Login />} />
                </Route>
            </Routes>
        </Router>
    );
};

export default Routers;