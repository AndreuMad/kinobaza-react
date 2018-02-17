import React from 'react';
import { string, func, object } from 'prop-types';
import { reduxForm, Field } from 'redux-form';

import InputField from 'Components/formComponents/reduxForm/InputField';

import { emailPattern } from 'Constants/validatePatterns';

const SignUp = (props) => {
  const {
    errorMessage,
    handleSubmit
  } = props;

  return (
    <form onSubmit={handleSubmit}>
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
      {
        errorMessage && (
          <div className="alert alert-danger">
            <b>Ooops!</b>
            {errorMessage}
          </div>
        )
      }
      <div className="btn-group auth-body-control">
        <button className="btn auth-body-button">Sign Up</button>
      </div>
    </form>
  );
};

const validate = ({
  email,
  name,
  password,
  passwordConfirm
}) => {
  const errors = {};

  if (!email) {
    errors.email = 'Please, enter an email';
  } else if (!emailPattern.test(email)) {
    errors.email = 'Please, enter a valid email';
  }

  if (!name) {
    errors.name = 'Please, enter your name';
  }

  if (!password) {
    errors.password = 'Please, enter password';
  } else if (password !== passwordConfirm) {
    errors.password = 'Passwords do not match';
  }

  if (!passwordConfirm) {
    errors.passwordConfirm = 'Please, enter password';
  }

  return errors;
};

SignUp.propTypes = {
  errorMessage: string,
  handleSubmit: func.isRequired
};

SignUp.defaultProps = {
  errorMessage: ''
};

export default reduxForm({ form: 'signUp', validate })(SignUp);
