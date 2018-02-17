import React, { Component } from 'react';
import { string, func, object } from 'prop-types';
import { reduxForm, Field } from 'redux-form';

import InputField from 'Components/formComponents/reduxForm/InputField';
import { emailPattern } from 'Constants/validatePatterns';

const SignIn = (props) => {
  const {
    errorMessage,
    handleSubmit
  } = props;

  return (
    <form
      className="login-form"
      onSubmit={handleSubmit}
    >
      <Field
        component={InputField}
        name="email"
        className="auth-body-input"
        errorClassName="field-error"
        labelClassName="auth-body-field"
        placeholder="Логін"
        type="email"
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
      {
        errorMessage && (
          <div className="alert alert-danger">
            <strong>Oops! </strong>{errorMessage}
          </div>
        )
      }
      <div className="btn-group auth-body-control">
        <button className="btn auth-body-button">Sign in</button>
      </div>
    </form>
  );
};

const validate = ({ email, password }) => {
  const errors = {};

  if (!email) {
    errors.email = 'Please, enter an email';
  } else if (!emailPattern.test(email)) {
    errors.email = 'Please, enter a valid email';
  }

  if (!password) {
    errors.password = 'Please, enter password';
  }

  return errors;
};

SignIn.propTypes = {
  handleSubmit: func.isRequired,
  errorMessage: string
};

SignIn.defaultProps = {
  errorMessage: ''
};

export default reduxForm({ form: 'signIn', validate })(SignIn);
