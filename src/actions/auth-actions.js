import Axios from 'axios';

import {
  CALL_AUTH_TOKEN,
  AUTH_USER,
  UNAUTH_USER,
  AUTH_STATUS,
  AUTH_ERROR,
  CHANGE_USER_DATA,
  CALL_USER_SIGN_IN,
  CALL_USER_SIGN_OUT
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

export const changeUserData = data => ({
  type: CHANGE_USER_DATA,
  data
});

export const callUserSignIn = ({ email, password, history }) => ({
  type: CALL_USER_SIGN_IN,
  email,
  password,
  history
});

export const callUserSignOut = () => ({
  type: CALL_USER_SIGN_OUT
});

export const userSignOut = () => ({
  type: UNAUTH_USER
});


