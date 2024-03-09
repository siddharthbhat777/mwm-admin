import React from 'react';
import Sidebar from './sidebar/Sidebar';
import classes from './Layout.module.css';
import Navbar from './navbar/Navbar';
import { Outlet } from 'react-router-dom';
// import AuthContext from '../../context/AuthContext/AuthContext';

const Layout = () => {
    // const authCtx = useContext(AuthContext);
    // const navigate = useNavigate();

    /* useEffect(() => {
        if (!(localStorage.getItem('accessToken') && authCtx.isLoggedIn)) {
            navigate('/login');
        }
    }, [authCtx.isLoggedIn, navigate]); */

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