import React from 'react';
import classes from './Sidebar.module.css';
import metLogo from '../../../../assets/MET-logo.png';
import { useLocation, useNavigate } from 'react-router-dom';

const Sidebar = () => {
    const navigate = useNavigate();
    const location = useLocation();

    return (
        <div className={classes.sidebar}>
            <div className={classes.header}>
                <img className={classes.metLogo} src={metLogo} alt='logo' />
            </div>
            <div className={classes.sidebarContent}>
                <div className={classes.topContent}>
                    <div className={`${classes.sidebarTab} ${location.pathname === '/admin' && classes.sidebarTabSelected}`} onClick={() => navigate('/admin')}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-grid-1x2-fill" viewBox="0 0 16 16">
                            <path d="M0 1a1 1 0 0 1 1-1h5a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1V1zm9 0a1 1 0 0 1 1-1h5a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1h-5a1 1 0 0 1-1-1V1zm0 9a1 1 0 0 1 1-1h5a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1h-5a1 1 0 0 1-1-1v-5z" />
                        </svg>
                        <h3 className={`${classes.sidebarTabText}`}>Dashboard</h3>
                    </div>
                    <div className={`${classes.sidebarTab} ${location.pathname === '/admin/users' && classes.sidebarTabSelected}`} onClick={() => navigate('/admin/users')}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-people-fill" viewBox="0 0 16 16">
                            <path d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6m-5.784 6A2.238 2.238 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.325 6.325 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1zM4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5" />
                        </svg>
                        <h3 className={`${classes.sidebarTabText}`}>Users</h3>
                    </div>
                    <div className={`${classes.sidebarTab} ${location.pathname === '/admin/media' && classes.sidebarTabSelected}`} onClick={() => navigate('/admin/media')}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-film" viewBox="0 0 16 16">
                            <path d="M0 1a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1zm4 0v6h8V1zm8 8H4v6h8zM1 1v2h2V1zm2 3H1v2h2zM1 7v2h2V7zm2 3H1v2h2zm-2 3v2h2v-2zM15 1h-2v2h2zm-2 3v2h2V4zm2 3h-2v2h2zm-2 3v2h2v-2zm2 3h-2v2h2z" />
                        </svg>
                        <h3 className={`${classes.sidebarTabText}`}>Media</h3>
                    </div>
                    <div className={`${classes.sidebarTab} ${location.pathname === '/admin/playlist' && classes.sidebarTabSelected}`} onClick={() => navigate('/admin/playlist')}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-collection-play-fill" viewBox="0 0 16 16">
                            <path d="M2.5 3.5a.5.5 0 0 1 0-1h11a.5.5 0 0 1 0 1zm2-2a.5.5 0 0 1 0-1h7a.5.5 0 0 1 0 1zM0 13a1.5 1.5 0 0 0 1.5 1.5h13A1.5 1.5 0 0 0 16 13V6a1.5 1.5 0 0 0-1.5-1.5h-13A1.5 1.5 0 0 0 0 6zm6.258-6.437a.5.5 0 0 1 .507.013l4 2.5a.5.5 0 0 1 0 .848l-4 2.5A.5.5 0 0 1 6 12V7a.5.5 0 0 1 .258-.437" />
                        </svg>
                        <h3 className={`${classes.sidebarTabText}`}>Playlist</h3>
                    </div>
                    <div className={`${classes.sidebarTab} ${location.pathname === '/admin/category' && classes.sidebarTabSelected}`} onClick={() => navigate('/admin/category')}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-music-note-list" viewBox="0 0 16 16">
                            <path d="M12 13c0 1.105-1.12 2-2.5 2S7 14.105 7 13s1.12-2 2.5-2 2.5.895 2.5 2" />
                            <path fillRule="evenodd" d="M12 3v10h-1V3z" />
                            <path d="M11 2.82a1 1 0 0 1 .804-.98l3-.6A1 1 0 0 1 16 2.22V4l-5 1z" />
                            <path fillRule="evenodd" d="M0 11.5a.5.5 0 0 1 .5-.5H4a.5.5 0 0 1 0 1H.5a.5.5 0 0 1-.5-.5m0-4A.5.5 0 0 1 .5 7H8a.5.5 0 0 1 0 1H.5a.5.5 0 0 1-.5-.5m0-4A.5.5 0 0 1 .5 3H8a.5.5 0 0 1 0 1H.5a.5.5 0 0 1-.5-.5" />
                        </svg>
                        <h3 className={`${classes.sidebarTabText}`}>Category</h3>
                    </div>
                    <div className={`${classes.sidebarTab} ${location.pathname === '/admin/artist' && classes.sidebarTabSelected}`} onClick={() => navigate('/admin/artist')}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-person-vcard-fill" viewBox="0 0 16 16">
                            <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm9 1.5a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 0-1h-4a.5.5 0 0 0-.5.5M9 8a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 0-1h-4A.5.5 0 0 0 9 8m1 2.5a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 0-1h-3a.5.5 0 0 0-.5.5m-1 2C9 10.567 7.21 9 5 9c-2.086 0-3.8 1.398-3.984 3.181A1 1 0 0 0 2 13h6.96c.026-.163.04-.33.04-.5M7 6a2 2 0 1 0-4 0 2 2 0 0 0 4 0" />
                        </svg>
                        <h3 className={classes.sidebarTabText}>Artist</h3>
                    </div>
                    <div className={`${classes.sidebarTab} ${location.pathname === '/admin/album' && classes.sidebarTabSelected}`} onClick={() => navigate('/admin/album')}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-disc-fill" viewBox="0 0 16 16">
                            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-6 0a2 2 0 1 0-4 0 2 2 0 0 0 4 0M4 8a4 4 0 0 1 4-4 .5.5 0 0 0 0-1 5 5 0 0 0-5 5 .5.5 0 0 0 1 0m9 0a.5.5 0 1 0-1 0 4 4 0 0 1-4 4 .5.5 0 0 0 0 1 5 5 0 0 0 5-5" />
                        </svg>
                        <h3 className={classes.sidebarTabText}>Album</h3>
                    </div>
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