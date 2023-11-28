import React, { useRef } from 'react';
import classes from './Login.module.css';
import { Link } from 'react-router-dom';
import metLogo from '../../../assets/MET-logo.png';

const Login = () => {
    const emailRef = useRef();
    const passwordRef = useRef();

    const handleSubmit = async (e) => {
        e.preventDefault();
        /* const data = {
            email: emailRef.current.value,
            password: passwordRef.current.value
        }
        try {
            const userLogin = await axios.post('http://localhost:8001/api/auth', data);
            localStorage.setItem('accessToken', userLogin.data.token);
            localStorage.setItem('refreshToken', userLogin.data.refreshToken);
            ls.set('email', emailRef.current.value, { encrypt: true });
            authCtx.onLogin(data.email);
            navigate('/');
        } catch (error) {
            console.log(error.message);
        } */
    };

    return (
        <div className={classes.fullScreen}>
            <div className={classes.container}>
                <div className={classes.divideLayout}>
                    <div className={classes.leftLayout} />
                    <div className={classes.rightLayout}>
                        <form className={classes.loginContainer} onSubmit={handleSubmit}>
                            <img className={classes.metLogo} src={metLogo} alt='met-logo' />
                            <input className={classes.userInput} type="email" placeholder='Enter E-Mail address' ref={emailRef} />
                            <input className={classes.userInput} type="password" placeholder='Enter password' ref={passwordRef} />
                            <div className={classes.buttonsLogin}>
                                <span className={classes.rememberMe}><input style={{ cursor: 'pointer' }} type="checkbox" />&nbsp;Remember me</span>
                                <Link className={classes.forgotPasword} to='#'>Forgot password?</Link>
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