import React, { Component } from 'react';
import InputField from 'Components/formComponents/reduxForm/InputField';

import { string, func, object } from 'prop-types';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';

import { callUserSignIn } from 'Actions/auth-actions'

import { emailPattern } from 'Constants/validatePatterns';

class SignIn extends Component {
  handleFormSubmit = ({ email, password }) => {
    const {
      callUserSignIn,
      history
    } = this.props;

    callUserSignIn({ email, password, history });
  }

  render() {
    const {
      handleFormSubmit,
      props: {
        errorMessage,
        handleSubmit
      }
    } = this;

    return (
      <form
        className="login-form"
        onSubmit={handleSubmit(handleFormSubmit)}
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
        {errorMessage ?
          <div className="alert alert-danger">
            <strong>Oops! </strong>{errorMessage}
          </div> : null}
        <div className="btn-group auth-body-control">
          <button className="btn auth-body-button">Sign in</button>
        </div>
      </form>
    );
  }
}

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
  errorMessage: string,
  callUserSignIn: func.isRequired,
  history: object.isRequired
};

SignIn.defaultProps = {
  errorMessage: ''
};

const mapStateToProps = ({ auth: { error } }) => ({
  errorMessage: error
});

const mapDispatchToProps = dispatch => ({
  callUserSignIn: ({ email, password, history }) => dispatch(callUserSignIn({ email, password, history }))
});

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({ form: 'signIn', validate })(SignIn));
