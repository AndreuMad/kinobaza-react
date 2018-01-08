import React from 'react';
import { Switch, Route, NavLink } from 'react-router-dom';

import SignInForm from 'Components/auth/SignInForm';
import SignUpForm from 'Components/auth/SignUpForm';

const LoginPage = () => (
  <div className="login-page">
    <div className="container">
      <div className="auth-form-wrap">
        <nav className="auth-switcher">
          <NavLink
            to="/login/sign-in"
            className="auth-switcher-item"
            activeClassName="current"
          >
            Sign In
          </NavLink>
          <NavLink
            to="/login/sign-up"
            className="auth-switcher-item"
            activeClassName="current"
          >
            Sign Up
          </NavLink>
        </nav>
        <div className="auth-body">
          <Switch>
            <Route path="/login/sign-in" component={SignInForm} />
            <Route path="/login/sign-up" component={SignUpForm} />
          </Switch>
        </div>
      </div>
    </div>
  </div>
);


export default LoginPage;
