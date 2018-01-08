import { all } from 'redux-saga/effects';

import posts from 'Sagas/posts';
import user from 'Sagas/user';
import actors from 'Sagas/actors';
import titles from 'Sagas/titles';
import reviews from 'Sagas/reviews';

export default function* rootSaga() {
  yield all([
    posts(),
    user(),
    actors(),
    titles(),
    reviews()
  ]);
}
