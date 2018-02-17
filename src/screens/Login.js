import React, { Component } from 'react';
import { func } from 'prop-types';
import { Switch, Route, NavLink } from 'react-router-dom';
import { callUserSignIn, callUserSignUp } from 'Ducks/auth';

import SignInForm from 'Components/auth/SignInForm';
import SignUpForm from 'Components/auth/SignUpForm';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

class LoginPage extends Component {
  handleSignIn = ({ email, password }) => {
    this.props.userSignInDispatch({ email, password });
  };

  handleSignUp = ({ email, name, password }) => {
    this.props.userSignUpDispatch({ email, name, password });
  };

  render() {
    const {
      handleSignIn,
      handleSignUp,
      props: {
        errorMessage
      }
    } = this;

    return (
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
                <Route
                  path="/login/sign-in"
                  errorMessage={errorMessage}
                  render={() => <SignInForm onSubmit={handleSignIn} />}
                />
                <Route
                  path="/login/sign-up"
                  errorMessage={errorMessage}
                  render={() => <SignUpForm onSubmit={handleSignUp} />}
                />
              </Switch>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

LoginPage.propTypes = {
  userSignInDispatch: func.isRequired,
  userSignUpDispatch: func.isRequired
};

const mapStateToProps = ({ auth: { error } }) => ({
  errorMessage: error
});

const mapDispatchToProps = dispatch => bindActionCreators({
  userSignInDispatch: callUserSignIn,
  userSignUpDispatch: callUserSignUp
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
