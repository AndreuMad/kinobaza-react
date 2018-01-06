import 'regenerator-runtime/runtime';
import { call, put, select, takeLatest } from 'redux-saga/effects';

import {
  apiFetchTitles,
  apiSetRating,
} from 'Api/titles';

import {
  fetchTitlesStatus,
  fetchTitlesSuccess,
  fetchUpTitlesSuccess,
} from 'Actions/titles-actions'

import {
  CALL_FETCH_TITLES,
} from 'Constants/actions';

function* fetchTitles(action) {
  try {
    const { shouldAppend } = action.payload;
    const query = yield select(({
      auth: { user: { _id: userId } },
      titles: { titles, titlesQuery }
    }) => ({
      ...titlesQuery,
      skip: shouldAppend ? titles.length : 0,
      limit: 3,
      userId
    }));

    yield put(fetchTitlesStatus(false));

    const { count, titles } = yield call(apiFetchTitles, query);

    if (shouldAppend) {
      yield put(fetchUpTitlesSuccess(titles));
    } else {
      fetchTitlesSuccess({ count, titles });
    }

    yield put(fetchTitlesStatus(true));
  } catch (error) {
    console.log(error);
  }
}

function* saga() {
  yield takeLatest(CALL_FETCH_TITLES, fetchTitles);
}

export default saga;
