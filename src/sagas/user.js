import Axios from 'axios';
import 'regenerator-runtime/runtime';
import { call, put, takeLatest } from 'redux-saga/effects';

import {
  apiSignToken,
  apiSignIn,
  apiSignUp
} from 'Api/user';

import {
  authStatus,
  authSuccess,
  authError,
  changeUserData,
  userSignOut
} from 'Actions/auth-actions';

import {
  CALL_AUTH_TOKEN,
  CALL_USER_SIGN_OUT,
  CALL_USER_SIGN_IN,
  CALL_USER_SIGN_UP
} from 'Constants/actions';

function* signWithToken({ token }) {
  try {
    yield put(authStatus(false));
    const user = yield call(apiSignToken, token);
    yield put(authSuccess());
    yield put(changeUserData(user));
    yield put(authStatus(true));
  } catch (error) {
    yield put(authError(error));
    yield put(authStatus(true));
  }
}

function* userSignIn({ email, password, history }) {
  try {
    yield put(authStatus(false));
    const { user, token } = yield call(apiSignIn, { email, password });
    yield put(authSuccess());
    yield put(changeUserData(user));
    yield put(authStatus(true));
    localStorage.setItem('token', token);
    history.push('/feature');
  } catch (error) {
    yield put(authError('Bad Login Info'));
    yield put(authStatus(true));
  }
}

function* userSignUp({ email, name, password }, history) {
  try {
    yield put(authStatus(false));
    const { user, token } = yield call(apiSignUp, { email, name, password });
    yield put(authSuccess());
    yield put(changeUserData(user));
    yield put(authStatus(true));
    localStorage.setItem('token', token);
    history.push('/feature');
  } catch (error) {
    yield put(authError(error));
    yield put(authStatus(true));
  }
}

function* handleUserSignOut() {
  localStorage.removeItem('token');
  yield put(userSignOut());
}

function* watchUser() {
  yield takeLatest(CALL_AUTH_TOKEN, signWithToken);
  yield takeLatest(CALL_USER_SIGN_OUT, handleUserSignOut);
  yield takeLatest(CALL_USER_SIGN_IN, userSignIn);
  yield takeLatest(CALL_USER_SIGN_UP, userSignUp);
}

export default watchUser;
