import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

const AuthInfo = ({ Component }) => (
    <Component />
);

const mapStateToProps = ({ auth }) => ({
    auth
});

export default connect(mapStateToProps)(AuthInfo);
