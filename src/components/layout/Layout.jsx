import React, { useEffect } from 'react';
import Sidebar from './sidebar/Sidebar';
import classes from './Layout.module.css';
import Navbar from './navbar/Navbar';
import { Outlet, useNavigate } from 'react-router-dom';

const Layout = () => {
    const navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem('username')) {
            if (localStorage.userType === 'others') {
                navigate('/');
            }
        } else {
            navigate('/login');
        }
    }, [navigate]);


    return (
        <div className={classes.mainLayout}>
            <Sidebar />
            <div className={classes.rightLayout}>
                <Navbar />
                <div className={classes.content}>
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default Layout;