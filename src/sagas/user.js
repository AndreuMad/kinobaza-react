import 'regenerator-runtime/runtime';
import { call, put, all, takeEvery } from 'redux-saga/effects';
import { push } from 'react-router-redux';

import {
  apiSignToken,
  apiSignIn,
  apiSignUp,
  apiEditUser,
  apiEditAvatar
} from 'Api/user';

import {
  authStatus,
  authSuccess,
  authError,
  userSignOut
} from 'Ducks/auth';

import {
  editUserSuccess
} from 'Ducks/auth';

import {
  CALL_AUTH_TOKEN,
  CALL_USER_SIGN_OUT,
  CALL_USER_SIGN_IN,
  CALL_USER_SIGN_UP,
  CALL_EDIT_USER,
  CALL_LOAD_AVATAR
} from 'Ducks/auth';

function* signWithToken(action) {
  try {
    const { token } = action.payload;
    yield put(authStatus(false));
    const user = yield call(apiSignToken, token);
    yield put(authSuccess());
    yield put(editUserSuccess(user));
    yield put(authStatus(true));
  } catch (error) {
    yield put(authError(error));
    yield put(authStatus(true));
  }
}

function* userSignIn(action) {
  try {
    const { email, password } = action.payload;
    yield put(authStatus(false));
    const { user, token } = yield call(apiSignIn, { email, password });
    yield put(authSuccess());
    yield put(editUserSuccess(user));
    yield put(authStatus(true));
    yield localStorage.setItem('token', token);
    yield put(push('/posts'));
  } catch (error) {
    yield put(authError('Bad Login Info'));
    yield put(authStatus(true));
  }
}

function* userSignUp(action) {
  try {
    const { values: { email, name, password } } = action.payload;
    yield put(authStatus(false));
    const { user, token } = yield call(apiSignUp, { email, name, password });
    yield put(authSuccess());
    yield put(editUserSuccess(user));
    yield put(authStatus(true));
    yield localStorage.setItem('token', token);
    yield put(push('/posts'));
  } catch (error) {
    yield put(authError(error));
    yield put(authStatus(true));
  }
}

function* handleUserSignOut() {
  localStorage.removeItem('token');
  yield put(userSignOut());
}

function* userEdit(action) {
  try {
    const { _id, name, dateOfBirth } = action.payload;
    const data = yield call(apiEditUser, { _id, name, dateOfBirth });
    yield put(editUserSuccess(data));
  } catch (error) {
    console.log(error);
  }
}

function* loadAvatar(action) {
  try {
    const { _id, photo } = action.payload;
    yield call(apiEditAvatar, { _id, photo });
    yield console.log('success');
  } catch (error) {
    console.log(error);
  }
}

function* watchUser() {
  yield all([
    takeEvery(CALL_AUTH_TOKEN, signWithToken),
    takeEvery(CALL_USER_SIGN_OUT, handleUserSignOut),
    takeEvery(CALL_USER_SIGN_IN, userSignIn),
    takeEvery(CALL_USER_SIGN_UP, userSignUp),
    takeEvery(CALL_EDIT_USER, userEdit),
    takeEvery(CALL_LOAD_AVATAR, loadAvatar)
  ]);
}

export default watchUser;
