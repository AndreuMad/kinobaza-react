import React, { Component } from 'react';
import {bool, element} from 'prop-types';
import {connect} from 'react-redux';

function AuthController(Component, Placeholder) {

    class AuthControllerWrap extends Component {

        render() {
            const {
                status,
                authenticated
            } = this.props;

            if (!status) {
                return <span>Зачекайте.</span>
            } else {
                return authenticated ? <Component {...this.props} /> : <Placeholder />;
            }
        }
    }

    const mapStateToProps = ({auth: {status, authenticated}}) => ({
        status,
        authenticated
    });

    AuthControllerWrap.propTypes = {
        status: bool,
        authenticated: bool
    };

    return connect(mapStateToProps)(AuthControllerWrap);
}

export default AuthController;
