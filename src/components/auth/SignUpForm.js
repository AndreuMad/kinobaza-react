import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import { signupUser } from 'Actions/auth-actions';

import { renderInput } from 'Components/auth/renderInput';

class SignUp extends Component {
    constructor(props) {
        super(props);

        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.renderAlert = this.renderAlert.bind(this);
    }

    renderAlert() {
        const { errorMessage } = this.props;

        if(errorMessage) {
            return (
                <div className="alert alert-danger">
                    <b>Ooops!</b>
                    {errorMessage}
                </div>
            )
        }
    }

    handleFormSubmit({ email, name, password }) {
        const {
            signupUser,
            history
        } = this.props;

        signupUser(
            { email, name, password },
            history
        );
    }

    render() {
        const {
            handleFormSubmit,
            renderAlert
        } = this;
        const { handleSubmit } = this.props;

        return (
            <form onSubmit={handleSubmit(handleFormSubmit)}>
                <Field
                    name="email"
                    component={renderInput}
                    placeholder="Емеіл"
                    type="text"
                    label="Email"
                />
                <Field
                    name="name"
                    component={renderInput}
                    placeholder="Ім'я"
                    type="text"
                    label="Name"
                />
                <Field
                    name="password"
                    component={renderInput}
                    placeholder="Пароль"
                    type="password"
                    label="Password"
                />
                <Field
                    name="passwordConfirm"
                    component={renderInput}
                    placeholder="Повторіть пароль"
                    type="password"
                    label="Confirm Password"
                />
                {renderAlert()}
                <div className="btn-group auth-body-control">
                    <button className="btn auth-body-button">Sign Up</button>
                </div>
            </form>
        );
    }
}

const validate = (values) => {
    const {
        email,
        name,
        password,
        passwordConfirm
    } = values;
    const errors = {};

    if(!values.email) {
        errors.email = 'Please, enter an email';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
        errors.email = 'Please, enter a valid email';
    }

    if(!name) {
        errors.name = 'Please, enter your name';
    }

    if(!password) {
        errors.password = 'Please, enter password';
    } else if (password !== passwordConfirm) {
        errors.password = 'Passwords do not match';
    }

    if(!passwordConfirm) {
        errors.passwordConfirm = 'Please, enter password';
    }

    return errors;
};

SignUp.propTypes = {
    errorMessage: PropTypes.string,
    signupUser: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired
};

const mapStateToProps = ({ auth: { error } }) => ({
    errorMessage: error
});

const mapDispatchToProps = (dispatch) => ({
    signupUser: (values, history) => dispatch(signupUser(values, history))
});

export default connect(mapStateToProps, mapDispatchToProps)
(reduxForm({
    form: 'signUp',
    validate
})(SignUp));
