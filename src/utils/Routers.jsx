import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from '../components/pages/login/Login';
import Layout from '../components/layout/Layout';
import Dashboard from '../components/pages/dashboard/Dashboard';

const Routers = () => {
    return (
        <Router>
            <Routes>
                <Route path='/login' element={<Login />} />
                <Route path='/' element={<Layout />}>
                    <Route index element={<Dashboard />} />
                </Route>
            </Routes>
        </Router>
    );
};

export default Routers;