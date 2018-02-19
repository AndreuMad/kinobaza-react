import 'regenerator-runtime/runtime';
import { call, put, select, all, takeEvery } from 'redux-saga/effects';

import {
  apiFetchActors,
  apiLikeActor
} from 'Api/actors';

import {
  fetchActorsStatus,
  fetchActorsSuccess,
  fetchUpActorsSuccess,
  changeActorsQuery,
  likeActorStatus,
  saveActorLike,
  removeActorLike
} from 'Ducks/actors';

import {
  CALL_FETCH_ACTORS,
  CALL_ACTOR_LIKE,
  CALL_CHANGE_ACTORS_QUERY
} from 'Ducks/actors';

function* fetchActors(action) {
  try {
    const { shouldAppend } = action.payload;
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

function* likeActor(action) {
  try {
    const { actorId } = action.payload;
    const userId = yield select(({ auth: { user: { _id: userId } } }) => userId);

    yield put(likeActorStatus(false));

    const { actionType, actorId: resActorId } = yield call(apiLikeActor, { userId, actorId });

    if (actionType === 'saved') {
      yield put(saveActorLike(resActorId));
    } else if (actionType === 'removed') {
      yield put(removeActorLike(resActorId));
    }

    yield put(likeActorStatus(true));
  } catch (error) {
    console.log(error);
  }
}

function* changeQuery(action) {
  try {
    const { query } = action.payload;
    yield put(changeActorsQuery(query));
    yield fetchActors({ shouldAppend: false });
  } catch (error) {
    console.log(error);
  }
}

function* watchActors() {
  yield all([
    takeEvery(CALL_FETCH_ACTORS, fetchActors),
    takeEvery(CALL_ACTOR_LIKE, likeActor),
    takeEvery(CALL_CHANGE_ACTORS_QUERY, changeQuery)
  ]);
}

export default watchActors;
