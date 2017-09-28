import React from 'react';
import { Switch, Route, Link } from 'react-router-dom';

import SignInForm from './SignInForm';
import SignUpForm from './SignUpForm';

const LoginPage = () => (

    <div className="login-page">
        <div className="container">
            <nav className="login-switcher">
            <Link
                to="/login/sign-in"
                className="login-switcher-item"
            >
                Sign In
            </Link>
            <Link
                to="/login/sign-up"
                className="login-switcher-item"
            >
                Sign Up
            </Link>
            </nav>
            <div>
                <Switch>
                    <Route path='/login/sign-in' component={SignInForm} />
                    <Route path='/login/sign-up' component={SignUpForm} />
                </Switch>
            </div>
        </div>
    </div>
);



export default LoginPage;
