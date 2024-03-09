import React, { useEffect, useState } from 'react';
import classes from './Sidebar.module.css';
import metLogo from '../../../../assets/MET-logo.png';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Sidebar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const getCategories = async () => {
            const categories = await axios.get('https://mwm.met.edu/api/categories/all-categories');
            setCategories(categories.data.categories);
        };
        getCategories();
    }, []);

    return (
        <div className={classes.sidebar}>
            <div className={classes.header}>
                <img className={classes.metLogo} src={metLogo} alt='logo' />
            </div>
            <div className={classes.sidebarContent}>
                <div className={classes.topContent}>
                    <div className={`${classes.sidebarTab} ${location.pathname === '/' && classes.sidebarTabSelected}`} onClick={() => navigate('/')}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-grid-1x2-fill" viewBox="0 0 16 16">
                            <path d="M0 1a1 1 0 0 1 1-1h5a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1V1zm9 0a1 1 0 0 1 1-1h5a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1h-5a1 1 0 0 1-1-1V1zm0 9a1 1 0 0 1 1-1h5a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1h-5a1 1 0 0 1-1-1v-5z" />
                        </svg>
                        <h3 className={`${classes.sidebarTabText}`}>Dashboard</h3>
                    </div>
                    {
                        categories.map((category) => (
                            <div className={`${classes.sidebarTab} ${location.pathname === `/${category._id}` && classes.sidebarTabSelected}`} onClick={() => navigate(`/${category._id}`)}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-people-fill" viewBox="0 0 16 16">
                                    <path d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6m-5.784 6A2.238 2.238 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.325 6.325 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1zM4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5" />
                                </svg>
                                <h3 className={`${classes.sidebarTabText}`}>{category.category_name}</h3>
                            </div>
                        ))
                    }
                    <hr className={classes.hrTag} />
                </div>
                <div className={classes.bottomContent}>
                    <span>©Mumbai Educational Trust</span>
                    <span>All rights reserved</span>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;