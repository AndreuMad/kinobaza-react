import 'regenerator-runtime/runtime';
import { call, put, select, takeLatest } from 'redux-saga/effects';

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
  CALL_ACTOR_LIKE,
  CALL_CHANGE_ACTORS_QUERY
} from 'Constants/actions';

function* fetchActors({ shouldAppend }) {
  try {
    const query = yield select(({
      auth: { user: { _id: userId } },
      actors: { actors, actorsQuery }
    }) => ({
      ...actorsQuery,
      skip: shouldAppend ? actors.length : 0,
      limit: 3,
      userId
    }));

    yield put(fetchActorsStatus(false));

    const { total, actors, likes } = yield call(apiFetchActors, query);

    if (shouldAppend) {
      yield put(fetchUpActorsSuccess({ actors, likes }));
    } else {
      yield put(fetchActorsSuccess({ total, actors, likes }));
    }

    yield put(fetchActorsStatus(true));
  } catch (error) {
    console.log(error);
  }
}

function* likeActor({ actorId }) {
  try {
    const userId = yield select(({ auth: { user: { _id: userId } } }) => userId);

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

function* changeQuery({ query }) {
  try {
    yield put(changeActorsQuery(query));
    yield fetchActors({ shouldAppend: false });
  } catch (error) {
    console.log(error);
  }
}

function* watchActors() {
  yield takeLatest(CALL_FETCH_ACTORS, fetchActors);
  yield takeLatest(CALL_ACTOR_LIKE, likeActor);
  yield takeLatest(CALL_CHANGE_ACTORS_QUERY, changeQuery);
}

export default watchActors;
