import {
  CALL_AUTH_TOKEN,
  AUTH_USER,
  UNAUTH_USER,
  AUTH_STATUS,
  AUTH_ERROR,
  CHANGE_USER_DATA,
  CALL_USER_SIGN_IN,
  CALL_USER_SIGN_OUT,
  CALL_USER_SIGN_UP
} from 'Constants/actions';

import { apiUrl } from 'Constants/urls';

export function authTokenRequest(token) {
  return {
    type: CALL_AUTH_TOKEN,
    token
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
    status
  };
}

export function authError(error) {
  return {
    type: AUTH_ERROR,
    error
  };
}

export function changeUserData(user) {
  return {
    type: CHANGE_USER_DATA,
    user
  };
}

export function callUserSignIn({ email, password, history }) {
  return {
    type: CALL_USER_SIGN_IN,
    email,
    password,
    history
  };
}

export function callUserSignUp(values, history) {
  return {
    type: CALL_USER_SIGN_UP,
    values,
    history
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
