import React from 'react';
import {bool, element} from 'prop-types';
import {connect} from 'react-redux';

const hoc = ({ status, authenticated }) => (Component, Placeholder) => {
    if (!status) {
        return <span>Зачекайте.</span>
    } else {
        return authenticated ? Component : Placeholder;
    }
};

const AuthController = ({status, authenticated, component: Component, placeholder: Placeholder}) => {
    if (!status) {
        return <span>Зачекайте.</span>
    } else {
        return authenticated ? Component : Placeholder;
    }
};

const mapStateToProps = ({auth: {status, authenticated}}) => ({
    status,
    authenticated
});

AuthController.propTypes = {
    status: bool,
    authenticated: bool,
    component: element.isRequired,
    placeholder: element
};

export default connect(mapStateToProps)(hoc);


authcontroller(ProfileForm, (<span></span>))