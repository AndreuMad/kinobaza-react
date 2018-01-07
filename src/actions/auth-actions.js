import {
  CALL_AUTH_TOKEN,
  AUTH_USER,
  UNAUTH_USER,
  AUTH_STATUS,
  AUTH_ERROR,
  CALL_USER_SIGN_IN,
  CALL_USER_SIGN_OUT,
  CALL_USER_SIGN_UP
} from 'Constants/actions';

import { apiUrl } from 'Constants/urls';

export function authTokenRequest(token) {
  return {
    type: CALL_AUTH_TOKEN,
    payload: {
      token
    }
  };
}
export function authSuccess() {
  return {
    type: AUTH_USER
  };
}

export function authStatus(status) {
  return {
    type: AUTH_STATUS,
    payload: {
      status
    }
  };
}

export function authError(error) {
  return {
    type: AUTH_ERROR,
    payload: {
      error
    }
  };
}

export function callUserSignIn({ email, password, history }) {
  return {
    type: CALL_USER_SIGN_IN,
    payload: {
      email,
      password,
      history
    }
  };
}

export function callUserSignUp(values, history) {
  return {
    type: CALL_USER_SIGN_UP,
    payload: {
      values,
      history
    }
  };
}

export function callUserSignOut() {
  return {
    type: CALL_USER_SIGN_OUT
  };
}

export function userSignOut() {
  return {
    type: UNAUTH_USER
  };
}
