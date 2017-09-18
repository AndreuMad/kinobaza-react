import React, { Component } from 'react';

import SignInForm from './SignInForm';
import SignUpForm from './SignUpForm';

class LoginPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            formToShow: 'signIn'
        };
    }

    switchForm(formName) {
        this.setState({
            formToShow: formName
        });
    }

    render() {
        return (
            <div className="login-page">
                <div className="container">
                    <nav className="login-switcher">
                    <span
                        className="login-switcher-item"
                        onClick={() => this.switchForm('signIn')}
                    >
                        Sign In
                    </span>
                        <span
                            className="login-switcher-item"
                            onClick={() => this.switchForm('signUp')}
                        >
                        Sign Up
                    </span>
                    </nav>
                    <div>
                        {this.state.formToShow === 'signUp' ?
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
