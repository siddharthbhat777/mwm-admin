import React, { useEffect, useRef, useState } from 'react';
import classes from './Login.module.css';
import { useNavigate } from 'react-router-dom';
import metLogo from '../../../assets/MET-logo.png';
import OKAlert from '../../ui/customAlert/okAlert/OKAlert';
import ls from 'localstorage-slim';

const Login = () => {
    const navigate = useNavigate();
    const usernameRef = useRef();
    const passwordRef = useRef();

    const [showPassword, setShowPassword] = useState(false);
    const [showAlert, setShowAlert] = useState(false);

    const handleCloseAlert = () => {
        setShowAlert(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (usernameRef.current.value === 'mwmadmin' && passwordRef.current.value === 'admin') {
            ls.set('username', usernameRef.current.value, { encrypt: true });
            localStorage.setItem('userType', 'admin');
            navigate('/');
        } else {
            setShowAlert(true);
        }
    };

    useEffect(() => {
        if (ls.get('username', { decrypt: true })) {
            if (localStorage.getItem('userType') === 'admin') {
                navigate('/');
            } else if (localStorage.getItem('userType') === 'others') {
                navigate('/');
            }
        }
    }, [navigate]);

    return (
        <div className={classes.fullScreen}>
            {showAlert && <OKAlert message={{ header: 'Error', submessage: 'Wrong email or password' }} onClose={handleCloseAlert} />}
            <div className={classes.container}>
                <div className={classes.divideLayout}>
                    <div className={classes.leftLayout} />
                    <div className={classes.rightLayout}>
                        <form className={classes.loginContainer} onSubmit={handleSubmit}>
                            <img className={classes.metLogo} src={metLogo} alt='met-logo' />
                            <input className={classes.userInput} type="text" placeholder='Username' ref={usernameRef} />
                            <div className={classes.userPassword}>
                                <input className={classes.userInput} type={showPassword ? 'text' : 'password'} placeholder='Password' ref={passwordRef} />
                                <div className={classes.showPasswordButton} onClick={() => setShowPassword(!showPassword)}>
                                    {
                                        showPassword ?
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-eye-fill" viewBox="0 0 16 16">
                                                <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0" />
                                                <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8m8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7" />
                                            </svg>
                                            :
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-eye-slash-fill" viewBox="0 0 16 16">
                                                <path d="m10.79 12.912-1.614-1.615a3.5 3.5 0 0 1-4.474-4.474l-2.06-2.06C.938 6.278 0 8 0 8s3 5.5 8 5.5a7.029 7.029 0 0 0 2.79-.588M5.21 3.088A7.028 7.028 0 0 1 8 2.5c5 0 8 5.5 8 5.5s-.939 1.721-2.641 3.238l-2.062-2.062a3.5 3.5 0 0 0-4.474-4.474L5.21 3.089z" />
                                                <path d="M5.525 7.646a2.5 2.5 0 0 0 2.829 2.829l-2.83-2.829zm4.95.708-2.829-2.83a2.5 2.5 0 0 1 2.829 2.829zm3.171 6-12-12 .708-.708 12 12z" />
                                            </svg>
                                    }
                                </div>
                            </div>
                            <button className={classes.loginButton} type='submit'>Login</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;