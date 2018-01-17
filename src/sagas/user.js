import 'regenerator-runtime/runtime';
import { call, put, takeLatest } from 'redux-saga/effects';

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
    const { email, password, history } = action.payload;
    yield put(authStatus(false));
    const { user, token } = yield call(apiSignIn, { email, password });
    yield put(authSuccess());
    yield put(editUserSuccess(user));
    yield put(authStatus(true));
    localStorage.setItem('token', token);
    history.push('/feature');
  } catch (error) {
    yield put(authError('Bad Login Info'));
    yield put(authStatus(true));
  }
}

function* userSignUp(action) {
  try {
    const { values: { email, name, password }, history } = action.payload;
    yield put(authStatus(false));
    const { user, token } = yield call(apiSignUp, { email, name, password });
    yield put(authSuccess());
    yield put(editUserSuccess(user));
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
  yield takeLatest(CALL_AUTH_TOKEN, signWithToken);
  yield takeLatest(CALL_USER_SIGN_OUT, handleUserSignOut);
  yield takeLatest(CALL_USER_SIGN_IN, userSignIn);
  yield takeLatest(CALL_USER_SIGN_UP, userSignUp);
  yield takeLatest(CALL_EDIT_USER, userEdit);
  yield takeLatest(CALL_LOAD_AVATAR, loadAvatar);
}

export default watchUser;
