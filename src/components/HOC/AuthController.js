import React from 'react';
import { element } from 'prop-types';
import {connect} from 'react-redux';

const AuthController = ({
                            authenticated,
                            component,
                            placeholder
                        }) => (
    authenticated ? component: placeholder
);

AuthController.propTypes = {
    component: element.isRequired,
    placeholder: element
};



const mapStateToProps = ({auth: {authenticated}}) => ({
    authenticated
});

export default connect(mapStateToProps)(AuthController);
