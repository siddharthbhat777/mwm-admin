import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginAdmin from '../components/pages/login/Login';
import LayoutAdmin from '../components/layout/Layout';
import DashboardAdmin from '../components/pages/dashboard/Dashboard';
import Users from '../components/pages/users/Users';
import Media from '../components/pages/media/Media';
import Category from '../components/pages/category/Category';
import Artist from '../components/pages/artist/Artist';

const Routers = () => {
    return (
        <Router>
            <Routes>
                <Route path='login' element={<LoginAdmin />} />
                <Route path='/' element={<LayoutAdmin />}>
                    <Route index element={<DashboardAdmin />} />
                    <Route path='users' element={<Users />} />
                    <Route path='media' element={<Media />} />
                    <Route path='category' element={<Category />} />
                    <Route path='artist' element={<Artist />} />
                </Route>
            </Routes>
        </Router>
    );
};

export default Routers;