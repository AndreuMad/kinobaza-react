import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import { signupUser } from '../../actions/auth-actions';

import { renderInput } from './components/renderInput';

class SignUp extends Component {
    constructor(props) {
        super(props);

        this.handleFormSubmit = this.handleFormSubmit.bind(this);
    }

    renderAlert() {
        if(this.props.errorMessage) {
            return (
                <div className="alert alert-danger">
                    <b>Ooops!</b> {this.props.errorMessage}
                </div>
            )
        }
    }

    handleFormSubmit({ email, name, password }) {
        this.props.signupUser(
            { email, name, password },
            this.props.history
        );
    }

    render() {
        const { handleSubmit } = this.props;

        return (
            <form onSubmit={handleSubmit(this.handleFormSubmit)}>
                <Field
                    name="email"
                    component={renderInput}
                    type="text"
                    label="Email"
                />
                <Field
                    name="name"
                    component={renderInput}
                    type="text"
                    label="Name"
                />
                <Field
                    name="password"
                    component={renderInput}
                    type="password"
                    label="Password"
                />
                <Field
                    name="passwordConfirm"
                    component={renderInput}
                    type="password"
                    label="Confirm Password"
                />
                {this.renderAlert()}
                <button className="btn btn-primary">Sign Up</button>
            </form>
        );
    }
}

const validate = (values) => {
    const errors = {};

    if(!values.email) {
        errors.email = 'Please, enter an email';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Please, enter a valid email';
    }

    if(!values.name) {
        errors.name = 'Please, enter your name';
    }

    if(!values.password) {
        errors.password = 'Please, enter password';
    } else if (values.password !== values.passwordConfirm) {
        errors.password = 'Passwords do not match';
    }

    if(!values.passwordConfirm) {
        errors.passwordConfirm = 'Please, enter password';
    }

    return errors;
};

SignUp.propTypes = {
    errorMessage: PropTypes.string,
    signupUser: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    errorMessage: state.auth.error
});

const mapDispatchToProps = (dispatch) => ({
    signupUser: (values, history) => dispatch(signupUser(values, history))
});

export default connect(mapStateToProps, mapDispatchToProps)
(reduxForm({
    form: 'signUp',
    validate
})(SignUp));
