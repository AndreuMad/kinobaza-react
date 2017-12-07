import Axios from 'axios';
import 'regenerator-runtime/runtime';
import { call, put, takeLatest } from 'redux-saga/effects';

import {
  apiSignToken
} from 'Api/user';

import {
  authStatus,
  authSuccess,
  authError,
  changeUserData
} from 'Actions/auth-actions';

import {
  CALL_AUTH_TOKEN
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
  }
}

function* watchUserAuth() {
  yield takeLatest(CALL_AUTH_TOKEN, signWithToken);
}

export default watchUserAuth;
