import React from 'react';
import {bool, element} from 'prop-types';
import {connect} from 'react-redux';

const mapStateToProps = ({auth: {status, authenticated, user}}) => ({
    status,
    authenticated,
    user
});

const hoc = (Component, Loader, Placeholder = Component) => connect(mapStateToProps)(props => {
    const {
        status,
        authenticated
    } = props;

    if (!status) {
        return <Loader />;
    } else {
        return authenticated ? <Component {...props} /> : <Placeholder {...props} />;
    }
});


export default hoc;
