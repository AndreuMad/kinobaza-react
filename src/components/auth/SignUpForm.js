import React, { Component } from 'react';
import InputField from 'Components/formComponents/reduxForm/InputField';

import { string, func, object } from 'prop-types';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import { signUpUser } from 'Actions/auth-actions';

import { emailPattern } from 'Constants/validatePatterns';

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
            signUpUser,
            history
        } = this.props;

        signUpUser(
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
                    component={InputField}
                    name="email"
                    className="auth-body-input"
                    errorClassName="field-error"
                    labelClassName="auth-body-field"
                    placeholder="Емеіл"
                    type="email"
                />
                <Field
                    component={InputField}
                    name="name"
                    className="auth-body-input"
                    errorClassName="field-error"
                    labelClassName="auth-body-field"
                    placeholder="Ім'я"
                    type="text"
                />
                <Field
                    component={InputField}
                    name="password"
                    className="auth-body-input"
                    errorClassName="field-error"
                    labelClassName="auth-body-field"
                    placeholder="Пароль"
                    type="password"
                />
                <Field
                    component={InputField}
                    name="passwordConfirm"
                    className="auth-body-input"
                    errorClassName="field-error"
                    labelClassName="auth-body-field"
                    placeholder="Повторіть пароль"
                    type="password"
                />
                {renderAlert()}
                <div className="btn-group auth-body-control">
                    <button className="btn auth-body-button">Sign Up</button>
                </div>
            </form>
        );
    }
}

const validate = ({ email, name, password, passwordConfirm }) => {
    let errors = {};

    if(!email) {
        errors.email = 'Please, enter an email';
    } else if (!emailPattern.test(email)) {
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
    errorMessage: string,
    signUpUser: func.isRequired,
    history: object.isRequired
};

const mapStateToProps = ({ auth: { error } }) => ({
    errorMessage: error
});

const mapDispatchToProps = (dispatch) => ({
    signUpUser: (values, history) => dispatch(signUpUser(values, history))
});

export default connect(mapStateToProps, mapDispatchToProps)
(reduxForm({
    form: 'signUp',
    validate
})(SignUp));
