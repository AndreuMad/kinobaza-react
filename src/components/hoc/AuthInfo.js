import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

const AuthInfoWrap = (Component) => {
    return connect(mapStateToProps)(Component);
};

const mapStateToProps = ({ auth }) => ({
    ...auth
});

export default AuthInfoWrap;
