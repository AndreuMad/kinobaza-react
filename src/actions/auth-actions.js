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

export const authTokenRequest = token => ({
  type: CALL_AUTH_TOKEN,
  token
});

export const authSuccess = () => ({
  type: AUTH_USER
});

export const authStatus = status => ({
  type: AUTH_STATUS,
  status
});

export const authError = error => ({
  type: AUTH_ERROR,
  error
});

export const changeUserData = user => ({
  type: CHANGE_USER_DATA,
  user
});

export const callUserSignIn = ({ email, password, history }) => ({
  type: CALL_USER_SIGN_IN,
  email,
  password,
  history
});

export const callUserSignUp = (values, history) => ({
  type: CALL_USER_SIGN_UP,
  values,
  history
});

export const callUserSignOut = () => ({
  type: CALL_USER_SIGN_OUT
});

export const userSignOut = () => ({
  type: UNAUTH_USER
});
