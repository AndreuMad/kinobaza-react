import { all } from 'redux-saga/effects';

import posts from 'Sagas/posts';
import user from 'Sagas/user';
import actors from 'Sagas/actors';

export default function* rootSaga() {
  yield all([
    posts(),
    user(),
    actors()
  ]);
}
