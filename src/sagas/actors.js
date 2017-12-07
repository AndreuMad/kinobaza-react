import 'regenerator-runtime/runtime';
import { call, put, takeLatest } from 'redux-saga/effects';

import {
  apiFetchActors,
  apiLikeActor
} from 'Api/actors';

import {
  fetchActorsStatus,
  fetchActorsSuccess,
  fetchUpActorsSuccess,
  clearActors,
  changeActorsQuery,
  likeActorStatus,
  saveActorLike,
  removeActorLike
} from 'Actions/actors-actions';

import {
  CALL_FETCH_ACTORS,
  CALL_ACTOR_LIKE
} from 'Constants/actions';

function* fetchActors({ params, appendActors }) {
  try {
    yield put(fetchActorsStatus(false));

    const { total, actors, likes } = yield call(apiFetchActors, { params, appendActors });

    if (appendActors) {
      yield put(fetchUpActorsSuccess({ actors, likes }));
    } else {
      yield put(fetchActorsSuccess({ total, actors, likes }));
    }

    yield put(fetchActorsStatus(true));
  } catch (error) {
    console.log(error);
  }
}

function* likeActor({ userId, actorId }) {
  try {
    yield put(likeActorStatus(false));

    const { action, actorId: resActorId } = yield call(apiLikeActor, { userId, actorId });

    if (action === 'saved') {
      yield put(saveActorLike(resActorId));
    } else if (action === 'removed') {
      yield put(removeActorLike(resActorId));
    }

    yield put(likeActorStatus(true));
  } catch (error) {
    console.log(error);
  }
}

function* watchActors() {
  yield takeLatest(CALL_FETCH_ACTORS, fetchActors);
  yield takeLatest(CALL_ACTOR_LIKE, likeActor);
}

export default watchActors;
