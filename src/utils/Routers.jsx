import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginAdmin from '../components/admin/pages/login/Login';
import LayoutAdmin from '../components/admin/layout/Layout';
import DashboardAdmin from '../components/admin/pages/dashboard/Dashboard';
import LoginUser from '../components/user/pages/login/Login';
import LayoutUser from '../components/user/layout/Layout';
import DashboardUser from '../components/user/pages/dashboard/Dashboard';
import Users from '../components/admin/pages/users/Users';
import Media from '../components/admin/pages/media/Media';
import Playlist from '../components/admin/pages/playlist/Playlist';
import Category from '../components/admin/pages/category/Category';
import Artist from '../components/admin/pages/artist/Artist';
import Album from '../components/admin/pages/album/Album';

const Routers = () => {
    return (
        <Router>
            <Routes>
                <Route path='admin/login' element={<LoginAdmin />} />
                <Route path='admin' element={<LayoutAdmin />}>
                    <Route index element={<DashboardAdmin />} />
                    <Route path='users' element={<Users />} />
                    <Route path='media' element={<Media />} />
                    <Route path='playlist' element={<Playlist />} />
                    <Route path='category' element={<Category />} />
                    <Route path='artist' element={<Artist />} />
                    <Route path='album' element={<Album />} />
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