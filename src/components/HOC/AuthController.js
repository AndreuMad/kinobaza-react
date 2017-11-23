import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

const AuthController = ({
                            authenticated,
                            component,
                            placeholder
                        }) => (
    authenticated ? component: placeholder
);

AuthController.propTypes = {
    component: PropTypes.element.isRequired,
    placeholder: PropTypes.element
};

const mapStateToProps = ({auth: {authenticated}}) => ({
    authenticated
});

export default connect(mapStateToProps)(AuthController);
