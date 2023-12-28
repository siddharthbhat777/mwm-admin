import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginAdmin from '../components/admin/pages/login/Login';
import LayoutAdmin from '../components/admin/layout/Layout';
import DashboardAdmin from '../components/admin/pages/dashboard/Dashboard';
import LoginUser from '../components/user/pages/login/Login';
import LayoutUser from '../components/user/layout/Layout';
import DashboardUser from '../components/user/pages/dashboard/Dashboard';

const Routers = () => {
    return (
        <Router>
            <Routes>
                <Route path='admin/login' element={<LoginAdmin />} />
                <Route path='admin' element={<LayoutAdmin />}>
                    <Route index element={<DashboardAdmin />} />
                </Route>
                <Route path='login' element={<LoginUser />} />
                <Route path='/' element={<LayoutUser />}>
                    <Route index element={<DashboardUser />} />
                </Route>
            </Routes>
        </Router>
    );
};

export default Routers;