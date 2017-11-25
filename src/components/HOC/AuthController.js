import React from 'react';
import {bool, element} from 'prop-types';
import {connect} from 'react-redux';

const mapStateToProps = ({auth: {status, authenticated}}) => ({
    status,
    authenticated
});

const AuthController = ({status, authenticated, component: Component, placeholder: Placeholder}) => {
    if (!status) {
        return <span>Зачекайте.</span>
    } else {
        return authenticated ? Component : Placeholder;
    }
};

AuthController.propTypes = {
    status: bool,
    authenticated: bool,
    component: element.isRequired,
    placeholder: element
};

export default connect(mapStateToProps)(AuthController);
