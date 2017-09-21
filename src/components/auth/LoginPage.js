import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import SignInForm from './SignInForm';
import SignUpForm from './SignUpForm';

class LoginPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            formToShow: 'signIn'
        };
    }

    render() {
        return (
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
                        {this.props.match.params.sign === 'sign-up' ?
                            <SignUpForm
                                history={this.props.history}
                            /> :
                            <SignInForm
                                history={this.props.history}
                            />
                        }
                    </div>
                </div>
            </div>
        );
    }
}

export default LoginPage;
